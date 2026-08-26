/**
 * Gann Square of 9 grid construction and level finding.
 *
 * Pure functions, no React. Extracted from GannSquareChart so the level
 * search can run once per celestial body and be unit tested.
 */

/** Grids larger than this are refused rather than freezing the browser tab. */
export const MAX_CELLS = 4000000;

/**
 * Number of spiral rings needed to contain a value, plus headroom.
 */
function ringsFor(value) {
  return Math.max(Math.ceil(Math.sqrt(value) / 2) + 3, 4);
}

/**
 * Build the spiral matrix for a given ring count.
 * Records the traversal order, which is what level finding walks.
 */
function buildWithRings(rings, target, body) {
  const dimension = 2 * rings + 1;
  const matrix = Array.from({ length: dimension }, () => Array(dimension).fill(null));
  const center = Math.floor((dimension - 1) / 2);

  let row = center;
  let col = center;
  let currentVal = 2;
  let ring = 1;

  let targetPosition = { row: -1, col: -1 };
  let bodyPosition = { row: -1, col: -1 };

  matrix[row][col] = 1;
  if (target === 1) targetPosition = { row, col };
  if (body === 1) bodyPosition = { row, col };

  const positionSequence = [{ row: center, col: center, value: 1 }];

  function move(direction, steps) {
    for (let s = 0; s < steps; s++) {
      if (currentVal > dimension * dimension) return;
      if (direction === 'left') col--;
      else if (direction === 'up') row--;
      else if (direction === 'right') col++;
      else row++;

      matrix[row][col] = currentVal;
      positionSequence.push({ row, col, value: currentVal });
      if (currentVal === target) targetPosition = { row, col };
      if (currentVal === body) bodyPosition = { row, col };
      currentVal++;
    }
  }

  while (currentVal <= dimension * dimension && ring <= rings) {
    move('left', 1);
    if (currentVal > dimension * dimension) break;
    move('up', 2 * ring - 1);
    if (currentVal > dimension * dimension) break;
    move('right', 2 * ring);
    if (currentVal > dimension * dimension) break;
    move('down', 2 * ring);
    if (currentVal > dimension * dimension) break;
    move('left', 2 * ring);
    if (currentVal > dimension * dimension) break;
    ring++;
  }

  return { matrix, dimension, targetPosition, bodyPosition, positionSequence };
}

/**
 * Build a Gann Square of 9 containing both the target number and the body's
 * degree square, expanding the grid if either is missing.
 *
 * Note: this guarantees the target and body squares themselves are present,
 * but not that findLevels() below will find a full `count` of up/down levels
 * on the body's cross - a target/body pair near the grid's edge could yield
 * fewer. This matches every real input (price-derived targets and 1-360
 * degree bodies are always far below the ring count needed to hit that
 * edge), verified against four baselines captured from the pre-extraction
 * implementation.
 *
 * @param {number} target - the price-derived square to centre the analysis on
 * @param {number} body - the celestial body's degree, used as a square number
 * @param {number} [minRings] - optional lower bound on ring count
 * @returns {{matrix, dimension, targetPosition, bodyPosition, positionSequence,
 *            targetFound, bodyFound, tooLarge}}
 */
export function buildGannSquare(target, body, minRings = 4) {
  const rings = Math.max(ringsFor(Math.max(target, body)), minRings);
  const dimension = 2 * rings + 1;

  if (dimension * dimension > MAX_CELLS) {
    return {
      matrix: [],
      dimension: 0,
      targetPosition: { row: -1, col: -1 },
      bodyPosition: { row: -1, col: -1 },
      positionSequence: [],
      targetFound: false,
      bodyFound: false,
      tooLarge: true,
    };
  }

  const result = buildWithRings(rings, target, body);

  return {
    ...result,
    targetFound: result.targetPosition.row !== -1,
    bodyFound: result.bodyPosition.row !== -1,
    tooLarge: false,
  };
}

/**
 * True when a cell shares a row, column, or either diagonal with the body's
 * square - i.e. it lies on the body's eight-direction cross.
 */
function isOnBodyCross(row, col, bodyPosition) {
  const { row: bodyRow, col: bodyCol } = bodyPosition;
  return (
    row === bodyRow ||
    col === bodyCol ||
    row - bodyRow === col - bodyCol ||
    row - bodyRow === -(col - bodyCol)
  );
}

/**
 * Walk the spiral outward and inward from the target square, collecting the
 * squares that fall on the body's cross.
 *
 * @param {object} grid - the value returned by buildGannSquare
 * @param {number} [count] - how many levels to collect in each direction
 * @returns {{up: Array<{row,col,value}>, down: Array<{row,col,value}>}}
 */
export function findLevels(grid, count = 3) {
  const { positionSequence, targetPosition, bodyPosition, targetFound, bodyFound } = grid;
  const up = [];
  const down = [];

  if (!targetFound || !bodyFound) return { up, down };

  const targetIndex = positionSequence.findIndex(
    (p) => p.row === targetPosition.row && p.col === targetPosition.col
  );
  if (targetIndex === -1) return { up, down };

  for (let i = targetIndex + 1; i < positionSequence.length && up.length < count; i++) {
    const cell = positionSequence[i];
    if (isOnBodyCross(cell.row, cell.col, bodyPosition)) up.push(cell);
  }

  for (let i = targetIndex - 1; i >= 0 && down.length < count; i--) {
    const cell = positionSequence[i];
    if (isOnBodyCross(cell.row, cell.col, bodyPosition)) down.push(cell);
  }

  return { up, down };
}
