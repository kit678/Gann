import React, { useState } from 'react';
import { POLYGONS } from '../utils/gannzillaFigures';

/** An angle box's number; a cleared or half-typed box counts as 0. */
export const angleOf = (v) => Number(v) || 0;

const AngleInput = ({ id, value, onChange }) => (
  <input type="number" id={id} className="form-control form-control-sm d-inline-block"
         style={{ width: '5rem' }} step="1" value={value}
         onChange={(e) => onChange(e.target.value)} />
);

const Check = ({ id, label, checked, onChange }) => (
  <div className="form-check form-check-inline mb-0">
    <input className="form-check-input" type="checkbox" id={id}
           checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <label className="form-check-label" htmlFor={id}>{label}</label>
  </div>
);

/**
 * Gannzilla's Figures controls: the polygons, Vectors and Locator, plus the
 * global Hide. The state (see defaultFigures) lives in the page so the Square
 * of 9 and the Cosmogram draw the same figures.
 */
const FiguresPanel = ({ figures, onChange }) => {
  const [open, setOpen] = useState(false);
  // The Values box keeps its raw text so commas and spaces can be typed.
  const [valuesText, setValuesText] = useState(figures.vectors.values.join(', '));

  const setPolygon = (sides, patch) => onChange({
    ...figures, polygons: { ...figures.polygons, [sides]: { ...figures.polygons[sides], ...patch } },
  });
  const setVectors = (patch) => onChange({ ...figures, vectors: { ...figures.vectors, ...patch } });
  const setLocator = (patch) => onChange({ ...figures, locator: { ...figures.locator, ...patch } });
  const setVortex = (patch) => onChange({ ...figures, vortex: { ...figures.vortex, ...patch } });

  const onValues = (text) => {
    setValuesText(text);
    const values = text.split(/[,\s]+/).filter(Boolean).map(Number).filter(Number.isFinite);
    setVectors({ values });
  };

  const shown = POLYGONS.filter(({ sides }) => figures.polygons[sides].visible).length
    + (figures.vectors.visible ? 1 : 0) + (figures.locator.visible ? 1 : 0)
    + (figures.vortex.visible ? 1 : 0);

  return (
    <div className="card mt-3">
      <div className="card-body py-2">
        <div className="d-flex align-items-center flex-wrap" style={{ gap: '1rem' }}>
          <strong>Figures</strong>
          <span className="text-muted small">{shown} shown</span>
          <Check id="figHide" label="Hide" checked={figures.hide}
                 onChange={(hide) => onChange({ ...figures, hide })} />
          <button type="button" className="btn btn-sm btn-outline-secondary ms-auto"
                  onClick={() => setOpen((v) => !v)}>{open ? 'Close' : 'Edit'}</button>
        </div>

        {open && (
          <div className="d-flex flex-wrap mt-2 small" style={{ gap: '2rem' }}>
            <table className="table table-sm mb-0" style={{ width: 'auto' }}>
              <thead>
                <tr><th>Polygon</th><th>Visible</th><th>Highlight</th><th>Angle</th></tr>
              </thead>
              <tbody>
                {POLYGONS.map(({ name, sides }) => {
                  const p = figures.polygons[sides];
                  return (
                    <tr key={sides}>
                      <td>{name}</td>
                      <td><Check id={`fig${sides}v`} label="" checked={p.visible}
                                 onChange={(visible) => setPolygon(sides, { visible })} /></td>
                      <td><Check id={`fig${sides}h`} label="" checked={p.highlight}
                                 onChange={(highlight) => setPolygon(sides, { highlight })} /></td>
                      <td><AngleInput id={`fig${sides}a`} value={p.angle}
                                      onChange={(angle) => setPolygon(sides, { angle })} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              <div className="fw-semibold mb-1">Vectors</div>
              <Check id="vecVisible" label="Visible" checked={figures.vectors.visible}
                     onChange={(visible) => setVectors({ visible })} />
              <Check id="vecClockwise" label="Clockwise" checked={figures.vectors.clockwise}
                     onChange={(clockwise) => setVectors({ clockwise })} />
              <div className="mt-1">
                <label htmlFor="vecAngle" className="me-2">Angle</label>
                <AngleInput id="vecAngle" value={figures.vectors.angle}
                            onChange={(angle) => setVectors({ angle })} />
              </div>
              <div className="mt-1">
                <label htmlFor="vecValues" className="me-2">Values</label>
                <input type="text" id="vecValues" className="form-control form-control-sm d-inline-block"
                       style={{ width: '16rem' }} value={valuesText}
                       onChange={(e) => onValues(e.target.value)} />
              </div>

              <div className="fw-semibold mt-3 mb-1">Locator</div>
              <Check id="locVisible" label="Visible" checked={figures.locator.visible}
                     onChange={(visible) => setLocator({ visible })} />
              <label htmlFor="locAngle" className="me-2">Angle</label>
              <AngleInput id="locAngle" value={figures.locator.angle}
                          onChange={(angle) => setLocator({ angle })} />

              <div className="fw-semibold mt-3 mb-1">Vortex</div>
              <Check id="vtxVisible" label="Visible" checked={figures.vortex.visible}
                     onChange={(visible) => setVortex({ visible })} />
              <select className="form-select form-select-sm d-inline-block" style={{ width: 'auto' }}
                      aria-label="Vortex trend" value={figures.vortex.trend}
                      onChange={(e) => setVortex({ trend: e.target.value })}>
                <option>Both</option>
                <option>Bull trend</option>
                <option>Bear trend</option>
              </select>
              <div className="mt-1">
                <label htmlFor="vtxAngle" className="me-2">Angle</label>
                <AngleInput id="vtxAngle" value={figures.vortex.angle}
                            onChange={(angle) => setVortex({ angle })} />
                <label htmlFor="vtxPrice" className="mx-2">Price</label>
                <AngleInput id="vtxPrice" value={figures.vortex.price}
                            onChange={(price) => setVortex({ price })} />
                <label htmlFor="vtxRadius" className="mx-2">Radius</label>
                <AngleInput id="vtxRadius" value={figures.vortex.radius}
                            onChange={(radius) => setVortex({ radius })} />
              </div>
              <div className="text-muted mt-2" style={{ maxWidth: '22rem' }}>
                Angles: 0° at west, growing clockwise. Figures sit on the grid centre (cell 1)
                and on the Cosmogram&apos;s centre; the Vortex sits on the cell holding its Price
                (Square of 9 only).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiguresPanel;
