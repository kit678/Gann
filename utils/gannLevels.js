/**
 * Gann level ladder construction.
 *
 * Pure functions, no React. See
 * docs/superpowers/specs/2026-08-28-gann-level-ladder-design.md
 */

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
  const up = [];
  const down = [];
  const { positionSequence } = grid;

  const targetIndex = positionSequence.findIndex(
    (p) => p.row === targetPosition.row && p.col === targetPosition.col
  );
  if (targetIndex === -1) return { up, down };

  for (let i = targetIndex + 1; i < positionSequence.length && up.length < count; i++) {
    const cell = positionSequence[i];
    if (armDegree(cell, crossCentre) !== null) up.push(cell);
  }

  for (let i = targetIndex - 1; i >= 0 && down.length < count; i--) {
    const cell = positionSequence[i];
    if (armDegree(cell, crossCentre) !== null) down.push(cell);
  }

  return { up, down };
}
