import React, { useMemo, useState } from 'react';
import { cellValue, findCell, nearestCell } from '../utils/gannzillaGrid';
import { layoutPosition, layoutCellCount, LAYOUTS, LAYOUT_LABELS } from '../utils/gannzillaLayouts';

const SIZE = 620;
const MAX_CELLS = 2500; // keeps the SVG light; Gannzilla's own layouts are smaller

/** Whole numbers stay whole; decimals keep at most 4 places. */
const formatCell = (v) => String(Math.round(v * 10000) / 10000);

/**
 * Gannzilla's other layouts (Square of 4, Circles of 12/24/36, Permanent
 * square, Tetragon..Octagon), numbered with the page's Value/Increment.
 * The price's own cell and the Find cell are highlighted, as on the
 * Square of 9.
 */
const LayoutViewer = ({ gridValue = 1, gridIncrement = 1, clockwise = true, price = null, findValue = null }) => {
  const [view, setView] = useState('square4');
  const [rings, setRings] = useState(6);

  const grid = { value: gridValue, increment: gridIncrement };
  const count = Math.min(layoutCellCount(view, rings), MAX_CELLS);
  const priceCell = price == null ? null : nearestCell(price, grid);
  const findIndex = findValue == null ? null : findCell(findValue, grid);

  const cells = useMemo(() => {
    const out = [];
    for (let n = 1; n <= count; n++) {
      out.push({ n, ...layoutPosition(view, n, { size: rings, clockwise }) });
    }
    return out;
  }, [view, rings, clockwise, count]);

  // Scale every layout to fit the square viewport.
  const extent = cells.reduce((m, c) => Math.max(m, Math.abs(c.x), Math.abs(c.y)), 1);
  const isTable = view === 'permanent';
  const unit = isTable ? (SIZE - 40) / rings : (SIZE / 2 - 30) / (extent + 0.5);
  // Rounded to 0.01 px so server and browser render identical attributes.
  const round = (v) => Math.round(v * 100) / 100;
  const toScreen = (c) => (isTable
    ? { x: round(20 + (c.x + 0.5) * unit), y: round(20 + (c.y + 0.5) * unit) }
    : { x: round(SIZE / 2 + c.x * unit), y: round(SIZE / 2 + c.y * unit) });
  const fontSize = Math.round(Math.max(6, Math.min(13, unit * 0.32)) * 100) / 100;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="d-flex align-items-center flex-wrap mb-2" style={{ gap: '1rem' }}>
          <strong>Other layouts</strong>
          <select className="form-select form-select-sm" style={{ width: 'auto' }}
                  aria-label="Layout" value={view} onChange={(e) => setView(e.target.value)}>
            {LAYOUTS.map((v) => <option key={v} value={v}>{LAYOUT_LABELS[v]}</option>)}
          </select>
          <label className="small mb-0" htmlFor="layoutRings">{isTable ? 'Size' : 'Rings'}</label>
          <input type="number" id="layoutRings" className="form-control form-control-sm"
                 style={{ width: '5rem' }} min="1" max="40" value={rings}
                 onChange={(e) => setRings(Math.max(1, Math.min(40, Math.floor(Number(e.target.value)) || 1)))} />
          <span className="text-muted small">
            Uses the Value, Increment, Clockwise and Find settings above.
            {layoutCellCount(view, rings) > MAX_CELLS && ` Showing the first ${MAX_CELLS} cells.`}
          </span>
        </div>

        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img"
             aria-label={`${LAYOUT_LABELS[view]} layout`} style={{ maxWidth: '100%', background: '#fff' }}>
          {!isTable && (
            <g stroke="rgba(211,47,47,0.35)">
              <line x1={0} y1={SIZE / 2} x2={SIZE} y2={SIZE / 2} />
              <line x1={SIZE / 2} y1={0} x2={SIZE / 2} y2={SIZE} />
            </g>
          )}
          {cells.map((c) => {
            const p = toScreen(c);
            const isPrice = c.n === priceCell;
            const isFind = c.n === findIndex;
            return (
              <g key={c.n}>
                {(isPrice || isFind) && (
                  <circle cx={p.x} cy={p.y} r={Math.round(Math.max(6, unit * 0.45) * 100) / 100}
                          fill={isPrice ? 'rgba(255,165,0,0.45)' : 'none'}
                          stroke={isFind ? '#141414' : 'rgba(255,165,0,1)'} strokeWidth={isFind ? 2.5 : 1.5} />
                )}
                <text x={p.x} y={p.y} fontSize={fontSize} textAnchor="middle" dominantBaseline="central"
                      fill={c.n === 1 ? '#2e7d32' : '#333'} fontWeight={c.n === 1 ? 'bold' : 'normal'}>
                  {formatCell(cellValue(c.n, grid))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default LayoutViewer;
