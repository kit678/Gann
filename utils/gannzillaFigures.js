/**
 * Gannzilla's Figures: polygons, Vectors and the Locator, drawn over the
 * layout from its centre (cell 1).
 *
 * Pure functions. Angles are screen angles through wheelPoint: 0 deg at
 * west, growing clockwise (notes/gannzilla_docs_extract.md §0, §1.3).
 * Every rule here was checked against the desktop app on 2026-10-15
 * (notes/gannzilla_blackbox_findings.md, "Figures").
 */

import { wheelPoint } from './gannzillaWheel';

export const POLYGONS = [
  'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Septagon', 'Octagon',
  'Nonagon', 'Decagon', 'Hendecagon', 'Dodecagon',
].map((name, i) => ({ name, sides: i + 3 }));

/**
 * How far figures reach: the circle through the grid's corners, i.e. half
 * the grid's diagonal (black-box: a Square at 0 touches the corner cells).
 */
export const figureRadius = (gridPx) => gridPx / Math.SQRT2;

/** The guide's default Vectors: Fibonacci percentages used directly as degrees. */
export const DEFAULT_VECTORS = [23.6, 38.2, 50, 61.8, 100, 161.8, 261.8];

/**
 * A regular polygon's vertices. Vertex 0 sits at `angle`; vertex k at
 * angle + k*360/sides, labelled "k/sides" (the guide's triangle shows
 * "1/3" and "2/3"). Vertex 0 is labelled with the angle.
 */
export function polygonVertices(sides, angle, r, { cx = 0, cy = 0 } = {}) {
  return Array.from({ length: sides }, (_, k) => {
    const deg = angle + (k * 360) / sides;
    return {
      ...wheelPoint(deg, r, { cx, cy }),
      deg,
      label: k === 0 ? `${angle}°` : `${k}/${sides}`,
    };
  });
}

/**
 * Vectors: one ray per value, measured from the base `angle`. The base is
 * always a clockwise-from-west screen angle; Clockwise off only turns the
 * rays the other way from it (black-box: base 30, ray 23.6 sits 6.4 deg
 * above west). Unlike the Protractor, it is not a left-right mirror.
 */
export function vectorRays(values, angle, r, { clockwise = true, cx = 0, cy = 0 } = {}) {
  return values.map((value) => ({
    value,
    ...wheelPoint(angle + (clockwise ? value : -value), r, { cx, cy }),
  }));
}

/**
 * The Locator's swing line through the centre: the bear end at the angle,
 * the bull end opposite (black-box: angle 30 puts the bear upper-left).
 */
export function locatorLine(angle, r, { cx = 0, cy = 0 } = {}) {
  return {
    bear: wheelPoint(angle, r, { cx, cy }),
    bull: wheelPoint(angle + 180, r, { cx, cy }),
  };
}

const PHI = (1 + Math.sqrt(5)) / 2;

/** At Radius 1 the Vortex's outermost loop reaches about 10 cells (black-box). */
export const VORTEX_OUTER_CELLS = 10;

/**
 * One Vortex spiral: a golden spiral whose radius shrinks by phi every
 * quarter turn, starting from its outermost point at `angle` and winding
 * inward - clockwise for the bull spiral, anticlockwise for the bear.
 * Radius scales it linearly (black-box: Radius 2 doubles both spirals).
 *
 * @param {number} angle - screen angle of the outer end (0 = west)
 * @param {number} radius - Gannzilla's Radius setting
 * @param {number} unit - pixels per cell
 */
export function vortexSpiral(angle, radius, unit, { bull = true, cx = 0, cy = 0, turns = 4, steps = 480 } = {}) {
  const outer = VORTEX_OUTER_CELLS * radius * unit;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 360;
    const r = outer * PHI ** (-t / 90);
    points.push(wheelPoint(angle + (bull ? t : -t), r, { cx, cy }));
  }
  return points;
}

/** The Vortex's eight axes: angle + k*45 deg, out to its outermost loop. */
export function vortexAxes(angle, radius, unit, { cx = 0, cy = 0 } = {}) {
  const outer = VORTEX_OUTER_CELLS * radius * unit;
  return Array.from({ length: 8 }, (_, k) => wheelPoint(angle + k * 45, outer, { cx, cy }));
}

/** Every figure hidden: Gannzilla's starting state. */
export function defaultFigures() {
  return {
    hide: false,
    polygons: Object.fromEntries(POLYGONS.map(({ sides }) => [
      sides, { visible: false, highlight: false, angle: 0 },
    ])),
    vectors: { visible: false, clockwise: true, angle: 0, values: DEFAULT_VECTORS },
    locator: { visible: false, angle: 0 },
    vortex: { visible: false, angle: 0, trend: 'Both', price: 1, radius: 1 },
  };
}
