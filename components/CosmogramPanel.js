import React, { useEffect, useMemo, useState } from 'react';
import { getPlanets } from '../utils/api';
import {
  priceToDegree, longitudeToPrice, summary, average, findAspect,
} from '../utils/gannzillaAstro';
import {
  wheelPoint as exactWheelPoint, CHRONOMETER_ANNUAL_LABELS, chronometerDailyLabel, signOf, SIGNS,
} from '../utils/gannzillaWheel';

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

const SIZE = 560;
const C = SIZE / 2;
const R_CHRONO = 262;
const R_PROTRACTOR = 222;
const R_ZODIAC_OUT = 200;
const R_ZODIAC_IN = 172;
const R_BODIES = 150;
const R_ASPECTS = 128;

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
const CosmogramPanel = ({ datetime = null, price: rawPrice = null, onBodiesChange }) => {
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
  const [bodies, setBodies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getPlanets({ datetime, system })
      .then((data) => { if (!cancelled) setBodies(data.bodies); })
      .catch((err) => {
        if (cancelled) return;
        setBodies(null);
        setError(err.response?.data?.detail || err.message);
      });
    return () => { cancelled = true; };
  }, [datetime, system]);

  const scaleOk = multiplier > 0 && divisor > 0;
  const opts = { clockwise, angle: Number(angle) || 0, cx: C, cy: C };

  // Every point on the wheel: bodies, then Summary, Average and the price.
  const points = useMemo(() => {
    if (!bodies) return [];
    const list = Object.entries(bodies).map(([name, b]) => ({
      name, label: GLYPHS[name] || name, lon: b.longitude, kind: 'body',
    }));
    const lons = list.map((p) => p.lon);
    list.push({ name: 'Summary', label: 'Σ', lon: summary(lons), kind: 'total' });
    list.push({ name: 'Average', label: 'μ', lon: average(lons), kind: 'total' });
    if (price != null && scaleOk) {
      list.push({ name: 'Price', label: '$', lon: priceToDegree(price, { multiplier, divisor }), kind: 'price' });
    }
    return list;
  }, [bodies, price, multiplier, divisor, scaleOk]);

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

        {error && <div className="text-danger small">{error}</div>}
        {!scaleOk && <div className="text-danger small">Price × and ÷ must be greater than 0.</div>}

        <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
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
              const p = wheelPoint(a.lon, R_ASPECTS, opts);
              const q = wheelPoint(b.lon, R_ASPECTS, opts);
              return (
                <line key={`${a.name}-${b.name}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                      stroke={ASPECT_COLOR[aspect.name]} strokeWidth="1.2" opacity="0.8">
                  <title>{`${aspect.name}: ${a.name}–${b.name}`}</title>
                </line>
              );
            })}

            {/* Bodies, totals and price */}
            {points.map((p) => {
              const tick = wheelPoint(p.lon, R_ZODIAC_IN, opts);
              const at = wheelPoint(p.lon, R_BODIES - (p.kind === 'body' ? 0 : 18), opts);
              const color = p.kind === 'price' ? '#2e7d32' : p.kind === 'total' ? '#6a1b9a' : '#333';
              return (
                <g key={p.name}>
                  <line x1={tick.x} y1={tick.y} x2={at.x} y2={at.y} stroke="#bbb" />
                  <circle cx={at.x} cy={at.y} r={10} fill="#fff" stroke={color} />
                  <text x={at.x} y={at.y} fontSize="12" textAnchor="middle"
                        dominantBaseline="central" fill={color}>{p.label}</text>
                  <title>{`${p.name}: ${p.lon.toFixed(2)}°`}</title>
                </g>
              );
            })}
          </svg>

          {bodies && (
            <table className="table table-sm small" style={{ width: 'auto' }}>
              <thead>
                <tr>
                  <th>Body</th><th>Longitude</th><th>Sign</th>
                  {price != null && scaleOk && <th>Market</th>}
                </tr>
              </thead>
              <tbody>
                {points.filter((p) => p.kind !== 'price').map((p) => {
                  const s = signOf(p.lon);
                  const market = price != null && scaleOk
                    ? longitudeToPrice(p.lon, price, { multiplier, divisor }) : null;
                  return (
                    <tr key={p.name}>
                      <td>{p.label} {p.name}</td>
                      <td>{p.lon.toFixed(2)}°</td>
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
      </div>
    </div>
  );
};

export default CosmogramPanel;
