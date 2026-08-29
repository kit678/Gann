import React, { useMemo } from 'react';

const SOURCE_LABELS = {
  center: 'Centre',
  sun: 'Sun',
  moon: 'Moon',
};

const SOURCE_CLASSES = {
  center: 'text-secondary',
  sun: 'text-warning',
  moon: 'text-info',
};

/**
 * Renders one or more level ladders as a single price-ordered table, with the
 * current price shown in its true position.
 */
const LevelLadderTable = ({ ladders = [], price = null }) => {
  const rows = useMemo(() => {
    const merged = ladders.flat().sort((a, b) => b.price - a.price);
    if (price === null) return merged;

    const index = merged.findIndex((level) => level.price <= price);
    const marker = { isPriceMarker: true, price };
    if (index === -1) return [...merged, marker];
    return [...merged.slice(0, index), marker, ...merged.slice(index)];
  }, [ladders, price]);

  if (rows.length === 0) {
    return <div className="text-muted">No levels to show.</div>;
  }

  return (
    <div className="table-responsive" style={{ maxHeight: '420px' }}>
      <table className="table table-sm table-hover mb-0" style={{ fontSize: '0.85rem' }}>
        <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
          <tr>
            <th>Price</th>
            <th>Square</th>
            <th>Cross</th>
            <th>Angle</th>
            <th>Sub</th>
            <th>Ring</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) =>
            row.isPriceMarker ? (
              <tr key="price-marker" className="table-warning fw-bold">
                <td>{row.price.toFixed(4)}</td>
                <td colSpan={5}>← current price</td>
              </tr>
            ) : (
              <tr key={`${row.source}-${row.square}`}>
                <td>{row.price.toFixed(4)}</td>
                <td>{row.square}</td>
                <td className={SOURCE_CLASSES[row.source]}>
                  {SOURCE_LABELS[row.source] || row.source}
                </td>
                <td>{row.degree === null ? '—' : `${row.degree}°`}</td>
                <td>
                  {row.kind === 'major'
                    ? 'major'
                    : `${row.subIndex}/8${row.isHalfway ? ' ½' : ''}`}
                </td>
                <td>{row.ring}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LevelLadderTable;
