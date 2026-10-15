/**
 * Gannzilla-compatible Square of 9 cell maths.
 *
 * Pure functions. Cell n is the 1-based spiral index (Gannzilla's "Show
 * numbers" value); what a cell displays is a separate question, answered by
 * cellValue(). Offsets are in cells from the centre, x to the right and y
 * down, matching screen and matrix order.
 */

/**
 * Where cell n sits relative to the centre.
 *
 * Ring k holds cells (2k-1)^2+1 .. (2k+1)^2. It starts one step left of the
 * previous ring's lower-left corner, climbs to the top-left corner, then runs
 * right, down and left. Anticlockwise is the left-right mirror image.
 *
 * @param {number} n - 1-based spiral index
 * @param {boolean} [clockwise]
 * @returns {{x:number, y:number}}
 */
export function spiralOffset(n, clockwise = true) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`cell index must be a positive integer, got ${n}`);
  }
  if (n === 1) return { x: 0, y: 0 };

  const k = Math.ceil((Math.sqrt(n) - 1) / 2);
  const topLeft = 4 * k * k - 2 * k + 1;
  const topRight = 4 * k * k + 1;
  const bottomRight = 4 * k * k + 2 * k + 1;

  let x;
  let y;
  if (n <= topLeft) {
    x = -k;
    y = -k + (topLeft - n);
  } else if (n <= topRight) {
    x = -k + (n - topLeft);
    y = -k;
  } else if (n <= bottomRight) {
    x = k;
    y = -k + (n - topRight);
  } else {
    x = k - (n - bottomRight);
    y = k;
  }
  // `|| 0` turns -0 into 0 so toEqual comparisons stay clean.
  return { x: (clockwise ? x : -x) || 0, y };
}

/**
 * The number cell n displays. Gannzilla's Value is the centre cell and
 * Increment is the step per cell; Increment may be negative.
 */
export function cellValue(n, { value = 1, increment = 1 } = {}) {
  return value + (n - 1) * increment;
}

/**
 * The cell Gannzilla's Find marks: the one with the largest value that does
 * not exceed `target` (black-box finding [02]: with Value 1, Increment 3,
 * Find 6.99 marks 4, not 7). Null when target is below the centre value.
 *
 * Positive increments only: negative-increment Find is untested.
 */
export function findCell(target, { value = 1, increment = 1 } = {}) {
  if (!(increment > 0)) return null;
  const raw = (target - value) / increment + 1;
  // Snap float noise (0.3 / 0.1 = 2.9999999999999996) before flooring.
  const snapped = Math.abs(raw - Math.round(raw)) < 1e-9 ? Math.round(raw) : raw;
  const n = Math.floor(snapped);
  return n < 1 ? null : n;
}
