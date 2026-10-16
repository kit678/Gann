import React, { useEffect, useState } from 'react';
import { getTimeTools } from '../utils/api';

const RULERS = ['None', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Ceres', 'Jupiter',
  'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Eris'];

const FIGURES = [
  { key: 'tetragram', label: 'Tetragram', parts: 4 },
  { key: 'pentagram', label: 'Pentagram', parts: 5 },
  { key: 'hexagram', label: 'Hexagram', parts: 6 },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM-DD' -> '12 Jan 2027'; null (beyond the ephemeris data) -> '—' */
const formatDate = (iso) => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** 'YYYY-MM-DDTHH:mm' -> '12 Jan 2027 10:49' */
const formatLocal = (iso) => `${formatDate(iso.slice(0, 10))} ${iso.slice(11, 16)}`;

/**
 * Vertex k sits at angle k * 360/parts, starting at the top and running
 * clockwise. Star polygons join every 2nd vertex (pentagram {5/2}); the
 * hexagram is two triangles; the tetragram is a plain square.
 */
function CycleFigure({ vertices, parts, label }) {
  const size = 180;
  const c = size / 2;
  const r = 52;
  const points = vertices.map((v) => {
    const rad = ((v.angle - 90) * Math.PI) / 180;
    return { x: c + Math.cos(rad) * r, y: c + Math.sin(rad) * r, date: v.date };
  });
  const path = (idx) => idx.map((i) => `${points[i].x},${points[i].y}`).join(' ');

  let polygons;
  if (parts === 5) polygons = [path([0, 2, 4, 1, 3])];
  else if (parts === 6) polygons = [path([0, 2, 4]), path([1, 3, 5])];
  else polygons = [path(points.map((_, i) => i))];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label} cycle`}>
      <circle cx={c} cy={c} r={r + 8} fill="none" stroke="#e0e0e0" />
      {polygons.map((pts) => (
        <polygon key={pts} points={pts} fill="none" stroke="#2f6fbf" strokeWidth="1.4" />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3} fill={i === 0 ? '#d32f2f' : '#4d4d4d'} />
          <text
            x={c + (p.x - c) * 1.45}
            y={c + (p.y - c) * 1.45}
            fontSize="9"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#4d4d4d"
          >
            {formatDate(p.date).replace(/ \d{4}$/, '')}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Gannzilla's Cycles and Moon-phase sub-modules: Tetragram / Pentagram /
 * Hexagram dates for a ruler planet, the octant moon phases around the base
 * date, and the next central solar and total lunar eclipse.
 */
const TimeToolsPanel = ({ datetime = null, city = 'New York' }) => {
  const [rulers, setRulers] = useState({ tetragram: 'Sun', pentagram: 'Sun', hexagram: 'Sun' });
  const [reverse, setReverse] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    getTimeTools({ datetime, city, reverse, ...rulers })
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.detail || err.message);
      });
    return () => { cancelled = true; };
  }, [datetime, city, reverse, rulers]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="d-flex align-items-center flex-wrap mb-2" style={{ gap: '1rem' }}>
          <strong>Cycles &amp; Moon</strong>
          <div className="form-check mb-0">
            <input className="form-check-input" type="checkbox" id="cyclesReverse"
                   checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
            <label className="form-check-label" htmlFor="cyclesReverse">Reverse</label>
          </div>
          <span className="text-muted small">
            Dates use {city}&apos;s standard time all year, as Gannzilla does.
          </span>
        </div>

        {error && <div className="text-danger small">{error}</div>}

        <div className="d-flex flex-wrap" style={{ gap: '1.5rem' }}>
          {FIGURES.map(({ key, label, parts }) => {
            const vertices = data?.cycles?.[key];
            return (
              <div key={key} style={{ width: 200 }}>
                <div className="d-flex align-items-center mb-1" style={{ gap: '0.5rem' }}>
                  <span className="fw-semibold small">{label}</span>
                  <select
                    className="form-select form-select-sm"
                    aria-label={`${label} ruler`}
                    value={rulers[key]}
                    onChange={(e) => setRulers((r) => ({ ...r, [key]: e.target.value }))}
                  >
                    {RULERS.map((name) => <option key={name}>{name}</option>)}
                  </select>
                </div>
                {vertices && <CycleFigure vertices={vertices} parts={parts} label={label} />}
                {vertices && (
                  <ol className="small mb-0 ps-3" start={0}>
                    {vertices.map((v) => <li key={v.vertex}>{formatDate(v.date)}</li>)}
                  </ol>
                )}
              </div>
            );
          })}
        </div>

        {data && (
          <div className="mt-3">
            <div className="fw-semibold small mb-1">Moon phases</div>
            <div className="d-flex flex-wrap small" style={{ gap: '1rem' }}>
              {data.moon_phases.map((p) => (
                <span key={p.utc}>
                  <span className="text-muted">{p.name}</span><br />
                  {formatLocal(p.local)}
                </span>
              ))}
              <span>
                <span className="text-muted">Solar eclipse</span><br />
                {formatLocal(data.eclipses.solar.local)}
              </span>
              <span>
                <span className="text-muted">Lunar eclipse (total)</span><br />
                {formatLocal(data.eclipses.lunar.local)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeToolsPanel;
