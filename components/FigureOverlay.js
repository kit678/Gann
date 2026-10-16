import React from 'react';
import {
  POLYGONS, polygonVertices, vectorRays, locatorLine,
} from '../utils/gannzillaFigures';
import { angleOf } from './FiguresPanel';

// Gannzilla keeps figure colours under Colors -> Figures; the guide does not
// list the defaults, so these are our own.
export const FIGURE_COLORS = {
  polygon: '#1565c0',
  highlight: 'rgba(21, 101, 192, 0.2)',
  vector: '#ef6c00',
  bear: '#c62828',
  bull: '#2e7d32',
};

/** Rounded to 0.01 px so the server and browser render identical SVG. */
const round = (p) => ({ ...p, x: Math.round(p.x * 100) / 100, y: Math.round(p.y * 100) / 100 });

const points = (verts) => verts.map((v) => `${v.x},${v.y}`).join(' ');

/** A label just beyond a point, pushed outwards from the centre. */
const outside = (p, cx, cy, by) => {
  const dx = p.x - cx;
  const dy = p.y - cy;
  const len = Math.hypot(dx, dy) || 1;
  return { x: Math.round((p.x + (dx / len) * by) * 100) / 100, y: Math.round((p.y + (dy / len) * by) * 100) / 100 };
};

/**
 * The visible figures as an SVG group, centred on (cx, cy) with radius r.
 * Used by the Cosmogram; the Square of 9 draws the same shapes on its canvas.
 */
const FigureOverlay = ({ figures, r, cx, cy }) => {
  if (!figures || figures.hide) return null;
  const at = { cx, cy };
  const { vectors, locator } = figures;
  return (
    <g aria-label="Figures">
      {POLYGONS.filter(({ sides }) => figures.polygons[sides].visible).map(({ name, sides }) => {
        const p = figures.polygons[sides];
        const verts = polygonVertices(sides, angleOf(p.angle), r, at).map(round);
        return (
          <g key={sides}>
            <polygon points={points(verts)} stroke={FIGURE_COLORS.polygon} strokeWidth="1.5"
                     fill={p.highlight ? FIGURE_COLORS.highlight : 'none'}>
              <title>{`${name} at ${angleOf(p.angle)}°`}</title>
            </polygon>
            {verts.map((v) => {
              const l = outside(v, cx, cy, 9);
              return (
                <text key={v.label} x={l.x} y={l.y} fontSize="9" textAnchor="middle"
                      dominantBaseline="central" fill={FIGURE_COLORS.polygon}>{v.label}</text>
              );
            })}
          </g>
        );
      })}

      {vectors.visible && vectorRays(vectors.values, angleOf(vectors.angle), r,
        { clockwise: vectors.clockwise, ...at }).map(round).map((ray, i) => {
        const l = outside(ray, cx, cy, 10);
        return (
          // Index in the key: the Values box may repeat a number.
          <g key={`${ray.value}-${i}`}>
            <line x1={cx} y1={cy} x2={ray.x} y2={ray.y} stroke={FIGURE_COLORS.vector} strokeWidth="1.2" />
            <text x={l.x} y={l.y} fontSize="9" textAnchor="middle" dominantBaseline="central"
                  fill={FIGURE_COLORS.vector}>{ray.value}</text>
          </g>
        );
      })}

      {locator.visible && (() => {
        const { bear, bull } = locatorLine(angleOf(locator.angle), r, at);
        const b = round(bear);
        const u = round(bull);
        const lb = outside(b, cx, cy, 14);
        const lu = outside(u, cx, cy, 14);
        return (
          <g>
            <line x1={b.x} y1={b.y} x2={u.x} y2={u.y} stroke="#555" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx={b.x} cy={b.y} r="4" fill={FIGURE_COLORS.bear} />
            <circle cx={u.x} cy={u.y} r="4" fill={FIGURE_COLORS.bull} />
            <text x={lb.x} y={lb.y} fontSize="10" textAnchor="middle" dominantBaseline="central"
                  fill={FIGURE_COLORS.bear}>Bear</text>
            <text x={lu.x} y={lu.y} fontSize="10" textAnchor="middle" dominantBaseline="central"
                  fill={FIGURE_COLORS.bull}>Bull</text>
          </g>
        );
      })()}
    </g>
  );
};

export default FigureOverlay;
