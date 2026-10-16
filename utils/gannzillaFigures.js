/**
 * Gannzilla's Figures: polygons, Vectors and the Locator, drawn over the
 * layout from its centre (cell 1).
 *
 * Pure functions. Angles are screen angles through wheelPoint: 0 deg at
 * west, growing clockwise (notes/gannzilla_docs_extract.md §0, §1.3). The
 * rules the guide leaves open (highlight, Vectors Clockwise off, which
 * Locator end is the angle) are stated where they are assumed.
 */

import { wheelPoint } from './gannzillaWheel';

export const POLYGONS = [
  'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Septagon', 'Octagon',
  'Nonagon', 'Decagon', 'Hendecagon', 'Dodecagon',
].map((name, i) => ({ name, sides: i + 3 }));

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
 * Vectors: one ray per value, measured from the base `angle`.
 * Assumption: Clockwise off is the same left-right mirror the black box
 * showed for the Protractor and Chronometer.
 */
export function vectorRays(values, angle, r, { clockwise = true, cx = 0, cy = 0 } = {}) {
  return values.map((value) => ({ value, ...wheelPoint(value, r, { clockwise, angle, cx, cy }) }));
}

/**
 * The Locator's swing line through the centre. Assumption: the bear end is
 * at the angle (the guide's 354 shows the bear end just below west).
 */
export function locatorLine(angle, r, { cx = 0, cy = 0 } = {}) {
  return {
    bear: wheelPoint(angle, r, { cx, cy }),
    bull: wheelPoint(angle + 180, r, { cx, cy }),
  };
}

/** Is `pt` inside (or on the edge of) the convex polygon `verts`? */
export function pointInPolygon(pt, verts) {
  let sign = 0;
  for (let i = 0; i < verts.length; i++) {
    const a = verts[i];
    const b = verts[(i + 1) % verts.length];
    const cross = (b.x - a.x) * (pt.y - a.y) - (b.y - a.y) * (pt.x - a.x);
    if (Math.abs(cross) < 1e-9) continue;
    const s = Math.sign(cross);
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

/**
 * The grid cells a polygon's highlight shades, as "row,col" matrix keys.
 * Assumption: a cell counts when its centre is inside the polygon, and the
 * polygon's radius is half the grid side. With clockwise off the grid is
 * drawn mirrored, so the matrix column is mirrored too.
 */
export function polygonCells(dimension, sides, angle, { clockwise = true } = {}) {
  const middle = (dimension - 1) / 2;
  const verts = polygonVertices(sides, angle, dimension / 2);
  const cells = new Set();
  for (let row = 0; row < dimension; row++) {
    for (let screenCol = 0; screenCol < dimension; screenCol++) {
      if (pointInPolygon({ x: screenCol - middle, y: row - middle }, verts)) {
        const col = clockwise ? screenCol : dimension - 1 - screenCol;
        cells.add(`${row},${col}`);
      }
    }
  }
  return cells;
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
  };
}
