import React, { useEffect, useMemo, useState } from 'react';
import { getPlanets } from '../utils/api';
import {
  priceToDegree, longitudeToPrice, summary, average, findAspect, delta, inspectorTable,
} from '../utils/gannzillaAstro';
import {
  wheelPoint as exactWheelPoint, CHRONOMETER_ANNUAL_LABELS, chronometerDailyLabel, signOf, SIGNS,
} from '../utils/gannzillaWheel';
import FigureOverlay from './FigureOverlay';

/**
 * wheelPoint rounded to 0.01 px: the server and the browser can differ in
 * the last float digit, which React reports as a hydration mismatch.
 */
const wheelPoint = (deg, r, opts) => {
  const p = exactWheelPoint(deg, r, opts);
  return { x: Math.round(p.x * 100) / 100, y: Math.round(p.y * 100) / 100 };
};

const GLYPHS = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂', Ceres: '⚳', Jupiter: '♃',
  Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇', Eris: 'Er',
};
const SIGN_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
// Gannzilla's element tints: Fire, Earth, Air, Water.
const ELEMENT_FILL = ['rgba(211,47,47,0.10)', 'rgba(46,125,50,0.10)',
  'rgba(142,68,173,0.10)', 'rgba(47,111,191,0.10)'];
// Gannzilla's aspect colours: conjunction cornflower; soft aspects lime; hard aspects coral.
const ASPECT_COLOR = {
  Conjunction: '#6495ed', Semisextile: '#7cb342', Sextile: '#7cb342', Trine: '#7cb342',
  Quincunx: '#7cb342', Semisquare: '#ff7f50', Square: '#ff7f50', Sesquisquare: '#ff7f50',
  Opposition: '#ff7f50',
};
const ASPECT_GLYPHS = {
  Conjunction: '☌', Semisextile: '⚺', Semisquare: '∠', Sextile: '⚹', Square: '□',
  Trine: '△', Sesquisquare: '⚼', Quincunx: '⚻', Opposition: '☍',
};

const SIZE = 560;
const C = SIZE / 2;
const R_CHRONO = 262;
const R_PROTRACTOR = 222;
const R_ZODIAC_OUT = 200;
const R_ZODIAC_IN = 172;
const R_BODIES = 150;
const R_ASPECTS = 128;
// With both sides on: radix on an inner ring, aspect lines further in.
const R_RADIX = 110;
const R_ASPECTS_INNER = 72;
const RADIX_COLOR = '#1565c0';

/** The wheel's points for one side: every body, then Summary and Average. */
function bodyPoints(bodies) {
  if (!bodies) return [];
  const list = Object.entries(bodies).map(([name, b]) => ({
    name, label: GLYPHS[name] || name, lon: b.longitude, kind: 'body',
  }));
  const lons = list.map((p) => p.lon);
  list.push({ name: 'Summary', label: 'Σ', lon: summary(lons), kind: 'total' });
  list.push({ name: 'Average', label: 'μ', lon: average(lons), kind: 'total' });
  return list;
}

/** Fetch one side's bodies; `datetime` null means now. */
function usePlanets(datetime, system, enabled) {
  const [bodies, setBodies] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    // Drop the old positions so a new date never shows under the old numbers.
    setBodies(null);
    setError(null);
    getPlanets({ datetime, system })
      .then((data) => { if (!cancelled) setBodies(data.bodies); })
      .catch((err) => {
        if (cancelled) return;
        setBodies(null);
        setError(err.response?.data?.detail || err.message);
      });
    return () => { cancelled = true; };
  }, [datetime, system, enabled]);
  return { bodies: enabled ? bodies : null, error: enabled ? error : null };
}

/** Gannzilla's green (on) / red (off) side button. */
const SideButton = ({ label, on, onClick }) => (
  <button type="button" className={`btn btn-sm ${on ? 'btn-success' : 'btn-danger'}`}
          aria-pressed={on} onClick={onClick}>{label}</button>
);

/** A wedge between two degrees, as an SVG path, honouring the wheel's orientation. */
function wedge(from, to, rOut, rIn, opts) {
  const a = wheelPoint(from, rOut, opts);
  const b = wheelPoint(to, rOut, opts);
  const c = wheelPoint(to, rIn, opts);
  const d = wheelPoint(from, rIn, opts);
  // Clockwise on screen is SVG sweep-flag 1.
  const sweep = opts.clockwise ? 1 : 0;
  return `M${a.x},${a.y} A${rOut},${rOut} 0 0 ${sweep} ${b.x},${b.y} `
    + `L${c.x},${c.y} A${rIn},${rIn} 0 0 ${1 - sweep} ${d.x},${d.y} Z`;
}

/**
 * Gannzilla's Cosmogram: zodiac wheel with Protractor and Chronometer rings,
 * every body, the price point, Summary/Average and aspect lines, plus the
 * planet table with its Market (price-equivalent) column.
 */
const CosmogramPanel = ({
  datetime = null, price: rawPrice = null, onBodiesChange, figures = null,
}) => {
  // A missing or malformed price hides the price point and Market column.
  const price = Number.isFinite(rawPrice) ? rawPrice : null;
  const [system, setSystem] = useState('geocentric');
  const [clockwise, setClockwise] = useState(true);
  const [angle, setAngle] = useState(0);
  const [chronoRange, setChronoRange] = useState('annual');
  const [showAspects, setShowAspects] = useState(true);
  // Raw strings, so a box can be cleared while typing; numbers are derived.
  const [multiplierInput, setMultiplierInput] = useState('1');
  const [divisorInput, setDivisorInput] = useState('1');
  const multiplier = Number(multiplierInput);
  const divisor = Number(divisorInput);
  // Gannzilla's Radix / Transit switch. The page's date is the transit side.
  const [showTransit, setShowTransit] = useState(true);
  const [showRadix, setShowRadix] = useState(false);
  const [radixInput, setRadixInput] = useState('2000-01-01T00:00');
  // The transit side always loads: the grid's projections read it.
  const { bodies, error } = usePlanets(datetime, system, true);
  const radix = usePlanets(radixInput || null, system, showRadix && radixInput !== '');
  const both = Boolean(showTransit && showRadix && radix.bodies && bodies);

  const scaleOk = multiplier > 0 && divisor > 0;
  const opts = { clockwise, angle: Number(angle) || 0, cx: C, cy: C };

  // Every transit point on the wheel: bodies, then Summary, Average and the price.
  const transitPoints = useMemo(() => {
    const list = bodyPoints(bodies);
    if (list.length && price != null && scaleOk) {
      list.push({ name: 'Price', label: '$', lon: priceToDegree(price, { multiplier, divisor }), kind: 'price' });
    }
    return list;
  }, [bodies, price, multiplier, divisor, scaleOk]);
  const radixPoints = useMemo(() => bodyPoints(radix.bodies), [radix.bodies]);
  const radixLon = useMemo(
    () => Object.fromEntries(radixPoints.map((p) => [p.name, p.lon])), [radixPoints]
  );

  // Aspect lines and the table follow the transit side, or the radix side
  // when it is the only one with data.
  const onTransit = showTransit && transitPoints.length > 0;
  const points = onTransit ? transitPoints : (showRadix ? radixPoints : []);
  // The price belongs to the transit side, so the Market column does too.
  const showMarket = onTransit && price != null && scaleOk;

  const inspector = useMemo(() => {
    if (!both) return null;
    const names = Object.keys(bodies).filter((n) => radix.bodies[n]);
    return {
      names,
      cells: inspectorTable(
        names.map((n) => radix.bodies[n].longitude),
        names.map((n) => bodies[n].longitude),
      ),
    };
  }, [both, bodies, radix.bodies]);

  const aspects = useMemo(() => {
    if (!showAspects) return [];
    const out = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const asp = findAspect(points[i].lon, points[j].lon);
        if (asp) out.push({ a: points[i], b: points[j], aspect: asp });
      }
    }
    return out;
  }, [points, showAspects]);

  const sunLon = bodies?.Sun?.longitude;

  // Hand the bodies to the page so the Square of 9 can show their projections.
  useEffect(() => {
    if (!onBodiesChange || !bodies) return;
    onBodiesChange(Object.entries(bodies).map(([name, b]) => ({
      name, glyph: GLYPHS[name] || name, longitude: b.longitude,
    })));
  }, [bodies, onBodiesChange]);

  /** One side's glyphs on the ring `ring`; `color` overrides the body colour. */
  const renderSide = (list, ring, color, side) => list.map((p) => {
    const tick = wheelPoint(p.lon, R_ZODIAC_IN, opts);
    const at = wheelPoint(p.lon, ring - (p.kind === 'body' ? 0 : 18), opts);
    const base = p.kind === 'price' ? '#2e7d32' : p.kind === 'total' ? '#6a1b9a' : '#333';
    const stroke = color && p.kind === 'body' ? color : base;
    return (
      <g key={`${side}-${p.name}`}>
        <line x1={tick.x} y1={tick.y} x2={at.x} y2={at.y} stroke="#bbb" />
        <circle cx={at.x} cy={at.y} r={10} fill="#fff" stroke={stroke} />
        <text x={at.x} y={at.y} fontSize="12" textAnchor="middle"
              dominantBaseline="central" fill={stroke}>{p.label}</text>
        <title>{`${side === 'radix' ? 'Radix' : 'Transit'} ${p.name}: ${p.lon.toFixed(2)}°`}</title>
      </g>
    );
  });

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="d-flex align-items-center flex-wrap mb-2" style={{ gap: '1rem' }}>
          <strong>Cosmogram</strong>
          <select className="form-select form-select-sm" style={{ width: 'auto' }}
                  aria-label="System" value={system} onChange={(e) => setSystem(e.target.value)}>
            <option value="geocentric">Geocentric</option>
            <option value="heliocentric">Heliocentric</option>
          </select>
          <div className="form-check mb-0">
            <input className="form-check-input" type="checkbox" id="cosmoClockwise"
                   checked={clockwise} onChange={(e) => setClockwise(e.target.checked)} />
            <label className="form-check-label" htmlFor="cosmoClockwise">Clockwise</label>
          </div>
          <label className="small mb-0" htmlFor="cosmoAngle">Angle</label>
          <input type="number" id="cosmoAngle" className="form-control form-control-sm"
                 style={{ width: '5rem' }} step="15" value={angle}
                 onChange={(e) => setAngle(e.target.value)} />
          <select className="form-select form-select-sm" style={{ width: 'auto' }}
                  aria-label="Chronometer range" value={chronoRange}
                  onChange={(e) => setChronoRange(e.target.value)}>
            <option value="annual">Chronometer: annual</option>
            <option value="daily">Chronometer: daily</option>
          </select>
          <div className="form-check mb-0">
            <input className="form-check-input" type="checkbox" id="cosmoAspects"
                   checked={showAspects} onChange={(e) => setShowAspects(e.target.checked)} />
            <label className="form-check-label" htmlFor="cosmoAspects">Aspects</label>
          </div>
          <label className="small mb-0" htmlFor="cosmoMult">Price ×</label>
          <input type="number" id="cosmoMult" className="form-control form-control-sm"
                 style={{ width: '4.5rem' }} min="0" step="any" value={multiplierInput}
                 onChange={(e) => setMultiplierInput(e.target.value)} />
          <label className="small mb-0" htmlFor="cosmoDiv">÷</label>
          <input type="number" id="cosmoDiv" className="form-control form-control-sm"
                 style={{ width: '4.5rem' }} min="0" step="any" value={divisorInput}
                 onChange={(e) => setDivisorInput(e.target.value)} />
        </div>

        <div className="d-flex align-items-center flex-wrap mb-2" style={{ gap: '0.75rem' }}>
          <SideButton label="Radix" on={showRadix} onClick={() => setShowRadix((v) => !v)} />
          <label className="small mb-0" htmlFor="cosmoRadixDate">Radix date (New York)</label>
          <input type="datetime-local" id="cosmoRadixDate" className="form-control form-control-sm"
                 style={{ width: 'auto' }} value={radixInput}
                 onChange={(e) => setRadixInput(e.target.value)} />
          <SideButton label="Transit" on={showTransit} onClick={() => setShowTransit((v) => !v)} />
          <span className="small text-muted">
            Transit date: {datetime ? datetime.replace('T', ' ') : 'now'} (the page&apos;s date)
          </span>
        </div>

        {error && <div className="text-danger small">{error}</div>}
        {radix.error && <div className="text-danger small">Radix: {radix.error}</div>}
        {!showTransit && !showRadix && (
          <div className="text-muted small">Both sides are off, so the wheel is hidden.</div>
        )}
        {!scaleOk && <div className="text-danger small">Price × and ÷ must be greater than 0.</div>}

        <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
          {(showTransit || showRadix) && (
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
               role="img" aria-label="Cosmogram wheel" style={{ maxWidth: '100%' }}>
            {/* Zodiac band, tinted by element */}
            {SIGNS.map((sign, i) => {
              const mid = wheelPoint(i * 30 + 15, (R_ZODIAC_OUT + R_ZODIAC_IN) / 2, opts);
              return (
                <g key={sign}>
                  <path d={wedge(i * 30, i * 30 + 30, R_ZODIAC_OUT, R_ZODIAC_IN, opts)}
                        fill={ELEMENT_FILL[i % 4]} stroke="#c9c9c9" />
                  <text x={mid.x} y={mid.y} fontSize="15" textAnchor="middle"
                        dominantBaseline="central" fill="#4d4d4d">{SIGN_GLYPHS[i]}</text>
                </g>
              );
            })}

            {/* Protractor: tick every 5 deg, label every 10 deg */}
            <circle cx={C} cy={C} r={R_PROTRACTOR} fill="none" stroke="rgba(211,47,47,0.5)" />
            {Array.from({ length: 72 }, (_, k) => k * 5).map((deg) => {
              const inner = wheelPoint(deg, R_PROTRACTOR - (deg % 10 === 0 ? 8 : 4), opts);
              const outer = wheelPoint(deg, R_PROTRACTOR, opts);
              const label = wheelPoint(deg, R_PROTRACTOR - 17, opts);
              return (
                <g key={deg}>
                  <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                        stroke="rgba(211,47,47,0.6)" />
                  {deg % 30 === 0 && (
                    <text x={label.x} y={label.y} fontSize="9" textAnchor="middle"
                          dominantBaseline="central" fill="#c62828">{deg}°</text>
                  )}
                </g>
              );
            })}

            {/* Chronometer: Gannzilla's fixed annual labels, or 24 h */}
            <circle cx={C} cy={C} r={R_CHRONO - 14} fill="none" stroke="rgba(46,125,50,0.5)" />
            {CHRONOMETER_ANNUAL_LABELS.map(({ angle: deg, label }) => {
              const p = wheelPoint(deg, R_CHRONO, opts);
              const text = chronoRange === 'annual' ? label : chronometerDailyLabel(deg);
              return (
                <text key={deg} x={p.x} y={p.y} fontSize="9" textAnchor="middle"
                      dominantBaseline="central" fill={deg % 30 === 0 ? '#1b5e20' : '#6a8f6b'}>
                  {text}
                </text>
              );
            })}
            {chronoRange === 'annual' && sunLon != null && (() => {
              // Today's marker sits at the Sun's longitude.
              const tip = wheelPoint(sunLon, R_CHRONO - 14, opts);
              return <circle cx={tip.x} cy={tip.y} r={4} fill="#d32f2f" />;
            })()}

            {/* Aspect lines */}
            {aspects.map(({ a, b, aspect }) => {
              const rAspects = both ? R_ASPECTS_INNER : R_ASPECTS;
              const p = wheelPoint(a.lon, rAspects, opts);
              const q = wheelPoint(b.lon, rAspects, opts);
              return (
                <line key={`${a.name}-${b.name}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                      stroke={ASPECT_COLOR[aspect.name]} strokeWidth="1.2" opacity="0.8">
                  <title>{`${aspect.name}: ${a.name}–${b.name}`}</title>
                </line>
              );
            })}

            <FigureOverlay figures={figures} r={R_ZODIAC_IN} cx={C} cy={C} />

            {/* Bodies, totals and price: transit outside, radix inside when both are on */}
            {showTransit && renderSide(transitPoints, R_BODIES, null, 'transit')}
            {showRadix && renderSide(radixPoints, both ? R_RADIX : R_BODIES, RADIX_COLOR, 'radix')}
          </svg>
          )}

          {points.length > 0 && (
            <table className="table table-sm small" style={{ width: 'auto' }}>
              <thead>
                <tr>
                  <th>Body</th>
                  {both && <th>Radix</th>}
                  <th>{both ? 'Transit' : 'Longitude'}</th>
                  {both && <th title="(radix − transit) mod 360">Δ</th>}
                  <th>Sign</th>
                  {showMarket && <th>Market</th>}
                </tr>
              </thead>
              <tbody>
                {points.filter((p) => p.kind !== 'price').map((p) => {
                  const s = signOf(p.lon);
                  const market = showMarket
                    ? longitudeToPrice(p.lon, price, { multiplier, divisor }) : null;
                  return (
                    <tr key={p.name}>
                      <td>{p.label} {p.name}</td>
                      {both && <td style={{ color: RADIX_COLOR }}>{radixLon[p.name]?.toFixed(2)}°</td>}
                      <td>{p.lon.toFixed(2)}°</td>
                      {both && <td>{delta(radixLon[p.name], p.lon).toFixed(2)}°</td>}
                      <td>{SIGN_GLYPHS[s.index]} {s.degree.toFixed(1)}°</td>
                      {market !== null && (
                        <td className={market > price ? 'text-success' : 'text-danger'}>
                          {market > price ? '▲' : '▼'} {market.toFixed(2)}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {aspects.length > 0 && (
          <div className="small mt-2">
            <span className="fw-semibold me-2">Aspects:</span>
            {aspects.map(({ a, b, aspect }) => (
              <span key={`${a.name}-${b.name}`} className="me-3" style={{ color: ASPECT_COLOR[aspect.name] }}>
                {a.name}–{b.name} {aspect.name}
              </span>
            ))}
          </div>
        )}

        {inspector && (
          <div className="mt-3">
            <div className="fw-semibold small mb-1">
              Inspector: radix {radixInput.replace('T', ' ')} (rows) vs transit{' '}
              {datetime ? datetime.replace('T', ' ') : 'now'} (columns)
            </div>
            <div className="small text-muted mb-1">
              As in Gannzilla: the diagonal is radix vs transit, cells above it are radix vs radix,
              cells below are transit vs transit.
            </div>
            <table className="table table-sm table-bordered small text-center mb-0" style={{ width: 'auto' }}>
              <thead>
                <tr>
                  <th />
                  {inspector.names.map((n) => <th key={n} title={n}>{GLYPHS[n] || n}</th>)}
                </tr>
              </thead>
              <tbody>
                {inspector.cells.map((row, i) => (
                  <tr key={inspector.names[i]}>
                    <th title={inspector.names[i]} style={{ color: RADIX_COLOR }}>
                      {GLYPHS[inspector.names[i]] || inspector.names[i]}
                    </th>
                    {row.map(({ value, aspect }, j) => {
                      const pair = `${inspector.names[i]}-${inspector.names[j]}`;
                      return (
                        <td key={pair}
                            style={{
                              background: i === j ? '#f3f3f3' : undefined,
                              color: aspect ? ASPECT_COLOR[aspect.name] : undefined,
                              fontWeight: aspect ? 600 : undefined,
                            }}
                            title={aspect
                              ? `${aspect.name}: ${aspect.angle}° ${pair} (${value.toFixed(1)}°)`
                              : `${value.toFixed(1)}° ${pair}`}>
                          {aspect ? ASPECT_GLYPHS[aspect.name] : Math.round(value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmogramPanel;
