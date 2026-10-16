/**
 * Where cell n sits in Gannzilla's other layouts (the Square of 9 lives in
 * gannzillaGrid.spiralOffset).
 *
 * Pure functions. Positions are in cell units from the layout's centre,
 * x to the right and y down. Rules come from the desktop black-box run
 * (notes/gannzilla_blackbox_findings.md [14]-[20]).
 */

const CIRCLES = { circle12: 12, circle24: 24, circle36: 36 };
const POLYGONS = { tetragon: 4, pentagon: 5, hexagon: 6, septagon: 7, octagon: 8 };

export const LAYOUTS = ['square4', 'permanent', ...Object.keys(CIRCLES), ...Object.keys(POLYGONS)];

export const LAYOUT_LABELS = {
  square4: 'Square of 4', permanent: 'Permanent square',
  circle12: 'Circle of 12', circle24: 'Circle of 24', circle36: 'Circle of 36',
  tetragon: 'Tetragon', pentagon: 'Pentagon', hexagon: 'Hexagon',
  septagon: 'Heptagon', octagon: 'Octagon',
};

/**
 * Square of 4: a 2x2 core (1 top-left, 2 top-right, 3 bottom-right,
 * 4 bottom-left), then ring k holds (2k-2)^2+1 .. (2k)^2. Each ring starts
 * left of 1, climbs to its top-left corner, runs right, down, left, and
 * climbs back to the row below 1, so the even squares line up there.
 */
function square4(n) {
  const k = Math.ceil(Math.sqrt(n) / 2);
  let j = n - (2 * k - 2) ** 2 - 1; // 0-based step within the ring
  let x = -(k - 1);
  let y = 0;
  const legs = [[0, -1, k - 1], [1, 0, 2 * k - 1], [0, 1, 2 * k - 1], [-1, 0, 2 * k - 1], [0, -1, k - 1]];
  for (const [dx, dy, len] of legs) {
    const step = Math.min(j, len);
    x += dx * step;
    y += dy * step;
    j -= step;
    if (j === 0) break;
  }
  return { x, y };
}

/**
 * Circle of N: ring r holds N(r-1)+1 .. Nr, one cell per slice. Cell 1 sits
 * in the slice just above west and numbering runs clockwise.
 */
function circle(n, slices) {
  const ring = Math.floor((n - 1) / slices) + 1;
  const slice = (n - 1) % slices;
  const maths = (180 - ((slice + 0.5) * 360) / slices) * (Math.PI / 180);
  const r = ring + 0.5;
  return { x: r * Math.cos(maths), y: -r * Math.sin(maths) };
}

/** Number of cells in rings 1..k of an N-gon, plus the centre. */
const polygonCells = (sides, k) => 1 + (sides * k * (k + 1)) / 2;

/**
 * Tetragon .. Octagon: ring k is a regular N-gon of radius k with a vertex
 * at west, holding N*k cells. It starts one step clockwise from the west
 * vertex and ends on it, so the centred polygonal numbers line up to the west.
 */
function polygon(n, sides) {
  if (n === 1) return { x: 0, y: 0 };
  let k = 1;
  while (polygonCells(sides, k) < n) k++;
  const j = n - polygonCells(sides, k - 1); // 1 .. sides*k
  const vertex = (i) => {
    const maths = (180 - (i * 360) / sides) * (Math.PI / 180);
    return { x: k * Math.cos(maths), y: -k * Math.sin(maths) };
  };
  const t = j / k;
  const e = Math.floor(t);
  const f = t - e;
  const a = vertex(e);
  const b = vertex(e + 1);
  return { x: a.x + f * (b.x - a.x), y: a.y + f * (b.y - a.y) };
}

/**
 * Position of cell n in a layout.
 *
 * @param {string} view - one of LAYOUTS
 * @param {number} n - 1-based cell index
 * @param {{size?: number, clockwise?: boolean}} [opts] - size is the
 *   Permanent square's side; anticlockwise mirrors left-right (a Permanent
 *   square is a plain table and is never mirrored)
 */
export function layoutPosition(view, n, { size = 10, clockwise = true } = {}) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`cell index must be a positive integer, got ${n}`);
  }
  let p;
  if (view === 'square4') p = square4(n);
  else if (view === 'permanent') {
    return { x: Math.floor((n - 1) / size), y: (n - 1) % size };
  } else if (CIRCLES[view]) p = circle(n, CIRCLES[view]);
  else if (POLYGONS[view]) p = polygon(n, POLYGONS[view]);
  else throw new RangeError(`unknown layout '${view}'`);
  return clockwise ? p : { x: -p.x, y: p.y };
}

/** How many cells a layout holds with `rings` rings (or side `rings` for the Permanent square). */
export function layoutCellCount(view, rings) {
  if (view === 'square4') return (2 * rings) ** 2;
  if (view === 'permanent') return rings * rings;
  if (CIRCLES[view]) return CIRCLES[view] * rings;
  if (POLYGONS[view]) return polygonCells(POLYGONS[view], rings);
  throw new RangeError(`unknown layout '${view}'`);
}
