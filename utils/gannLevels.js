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
