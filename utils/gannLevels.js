/**
 * Gann level ladder construction.
 *
 * Pure functions, no React. See
 * docs/superpowers/specs/2026-08-28-gann-level-ladder-design.md
 */

import { walkSpiral } from './gannGrid';

/**
 * Arm angle by the sign of the offset from the cross centre.
 *
 * 0 degrees is the down-left diagonal, which is where the odd squares
 * (1, 9, 25, 49 ...) lie. Keys are `${sign(dRow)},${sign(dCol)}`.
 */
const ARM_BY_SIGN = {
  '1,-1': 0,
  '0,-1': 45,
  '-1,-1': 90,
  '-1,0': 135,
  '-1,1': 180,
  '0,1': 225,
  '1,1': 270,
  '1,0': 315,
};

/**
 * Which of a cross's eight arms a cell sits on.
 *
 * Returns null for the cross's own centre (it belongs to every arm at once)
 * and null for any cell not on the cross. That second case makes this usable
 * as the on-cross predicate.
 *
 * Never returns 360: a mark one full lap beyond a 0 mark is itself 0. The
 * angle identifies the arm, not the lap.
 *
 * @param {{row:number, col:number}} cell
 * @param {{row:number, col:number}} crossCentre
 * @returns {number|null} 0, 45, 90, 135, 180, 225, 270, 315, or null
 */
export function armDegree(cell, crossCentre) {
  const dRow = cell.row - crossCentre.row;
  const dCol = cell.col - crossCentre.col;

  if (dRow === 0 && dCol === 0) return null;

  const onCross =
    dRow === 0 || dCol === 0 || Math.abs(dRow) === Math.abs(dCol);
  if (!onCross) return null;

  const key = `${Math.sign(dRow)},${Math.sign(dCol)}`;
  return ARM_BY_SIGN[key] ?? null;
}

/**
 * Split a gap into equal parts, returning the division points.
 *
 * The final element equals `hi`. buildLadder drops it, because it is the next
 * major mark and is already in the ladder under its own entry.
 *
 * @param {number} lo
 * @param {number} hi
 * @param {number} [parts]
 * @returns {number[]} `parts` points, ending at `hi`
 */
export function subdivide(lo, hi, parts = 8) {
  const step = (hi - lo) / parts;
  return Array.from({ length: parts }, (_, i) => lo + step * (i + 1));
}

/**
 * Which value ring a square falls in.
 *
 * Ring k spans (2k-1)^2 .. (2k+1)^2 - 1, a width of 8k. This is a band of
 * values between consecutive odd squares - NOT a cell's distance from the
 * grid centre. Square 361 is nine cells out but opens ring 10.
 *
 * @param {number} square
 * @returns {number} ring index, at least 1
 */
export function ringOf(square) {
  return Math.max(1, Math.floor((Math.sqrt(square) + 1) / 2));
}

/**
 * Collect the squares lying on a cross, walking the spiral out from and back
 * from the price's square.
 *
 * The cross's own centre cell is excluded, since armDegree returns null for
 * it and it therefore has no arm to be labelled with.
 *
 * @param {object} grid - from buildGannSquare
 * @param {{row:number, col:number}} crossCentre
 * @param {{row:number, col:number}} targetPosition - the price's square
 * @param {number} [count] - marks to collect in each direction
 * @returns {{up: object[], down: object[]}} cells in walk order
 */
export function crossMarks(grid, crossCentre, targetPosition, count = 8) {
  return walkSpiral(
    grid.positionSequence,
    targetPosition,
    count,
    (cell) => armDegree(cell, crossCentre) !== null
  );
}

/** Sub-levels emitted per segment. The 8th is the next major mark. */
const SUBS_PER_SEGMENT = 7;

/** The sub-index that lands on the midpoint of a segment. */
const HALFWAY_SUB_INDEX = 4;

/**
 * Build the full labeled level ladder for one cross.
 *
 * Marks are merged into a single ascending list before subdividing, so the
 * segment straddling the price is treated like any other. That segment is the
 * one price is actually trading inside, so it must not be skipped.
 *
 * @param {object} options
 * @param {object} options.grid - from buildGannSquare
 * @param {{row:number, col:number}} options.crossCentre
 * @param {'center'|'sun'|'moon'} options.source
 * @param {number} [options.scale] - price multiplier used to reach the grid
 * @param {number} [options.count] - major marks per direction
 * @param {{row:number, col:number}} [options.targetPosition] - defaults to
 *   the grid's own target
 * @returns {object[]} levels, sorted by square descending
 */
export function buildLadder({
  grid,
  crossCentre,
  source,
  scale = 1,
  count = 8,
  targetPosition = grid.targetPosition,
}) {
  const { up, down } = crossMarks(grid, crossCentre, targetPosition, count);
  if (up.length === 0 && down.length === 0) return [];

  const targetSquare = grid.matrix[targetPosition.row][targetPosition.col];
  const directionOf = (square) => (square > targetSquare ? 'up' : 'down');

  // If the price's own square happens to sit on the cross, it is itself a
  // major mark. crossMarks only walks strictly outward from the target, so
  // it never tests the target's own cell - insert it explicitly here, or the
  // segments on either side of it would be wrongly merged into one.
  const targetCell = { row: targetPosition.row, col: targetPosition.col, value: targetSquare };
  const targetIsMajor = armDegree(targetCell, crossCentre) !== null;

  // Ascending: the inward walk reversed, then the outward walk, with the
  // target's own major (if any) spliced into its natural position between
  // them.
  const ascending = [...down].reverse().concat(targetIsMajor ? [targetCell] : [], up);

  const levels = ascending.map((cell) => ({
    price: cell.value / scale,
    square: cell.value,
    source,
    kind: 'major',
    degree: armDegree(cell, crossCentre),
    segmentStart: null,
    segmentEnd: null,
    subIndex: null,
    isHalfway: false,
    ring: ringOf(cell.value),
    direction: directionOf(cell.value),
  }));

  for (let i = 0; i < ascending.length - 1; i++) {
    const lo = ascending[i];
    const hi = ascending[i + 1];
    const points = subdivide(lo.value, hi.value);
    // The segment's angle and ring come from the mark that opens it, so a
    // sub-level near a ring boundary is not misattributed.
    const segmentDegree = armDegree(lo, crossCentre);
    const segmentRing = ringOf(lo.value);

    for (let s = 0; s < SUBS_PER_SEGMENT; s++) {
      const square = points[s];
      levels.push({
        price: square / scale,
        square,
        source,
        kind: 'sub',
        degree: segmentDegree,
        segmentStart: lo.value,
        segmentEnd: hi.value,
        subIndex: s + 1,
        isHalfway: s + 1 === HALFWAY_SUB_INDEX,
        ring: segmentRing,
        direction: directionOf(square),
      });
    }
  }

  return levels.sort((a, b) => b.square - a.square);
}
