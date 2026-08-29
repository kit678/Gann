import { buildGannSquare } from '../gannGrid';
import { armDegree, subdivide, ringOf } from '../gannLevels';

/** The centre cross of a grid big enough to hold the worked example. */
const centreGrid = () => {
  const grid = buildGannSquare(27, 1);
  return { grid, centre: grid.bodyPosition };
};

const cellFor = (grid, value) =>
  grid.positionSequence.find((p) => p.value === value);

describe('armDegree', () => {
  test('labels ring 3 of the centre cross in 45 degree steps', () => {
    const { grid, centre } = centreGrid();
    const expected = {
      25: 0, 28: 45, 31: 90, 34: 135,
      37: 180, 40: 225, 43: 270, 46: 315, 49: 0,
    };
    Object.entries(expected).forEach(([value, degree]) => {
      expect(armDegree(cellFor(grid, Number(value)), centre)).toBe(degree);
    });
  });

  test('returns null for the cross centre itself', () => {
    const { grid, centre } = centreGrid();
    expect(armDegree(cellFor(grid, 1), centre)).toBe(null);
  });

  test('returns null for a cell that is not on the cross', () => {
    const { grid, centre } = centreGrid();
    // 27 sits between the arms - it is the price square, not a cross square.
    expect(armDegree(cellFor(grid, 27), centre)).toBe(null);
  });

  test('never returns 360; a full lap out returns to the same arm', () => {
    const { grid, centre } = centreGrid();
    expect(armDegree(cellFor(grid, 25), centre)).toBe(0);
    expect(armDegree(cellFor(grid, 49), centre)).toBe(0);
  });

  test('works for an off-centre cross', () => {
    // Body 9 sits on the odd-square diagonal, one ring out from centre.
    const grid = buildGannSquare(27, 9);
    const centre = grid.bodyPosition;
    expect(armDegree(cellFor(grid, 9), centre)).toBe(null);
    // Directly left of the body must be the 45 degree arm.
    const left = grid.positionSequence.find(
      (p) => p.row === centre.row && p.col === centre.col - 1
    );
    expect(armDegree(left, centre)).toBe(45);
  });
});

describe('subdivide', () => {
  test('reproduces the worked example for 25 to 28', () => {
    expect(subdivide(25, 28)).toEqual([
      25.375, 25.75, 26.125, 26.5, 26.875, 27.25, 27.625, 28,
    ]);
  });

  test('returns exactly eight points by default', () => {
    expect(subdivide(0, 80)).toHaveLength(8);
  });

  test('the last point is the upper bound', () => {
    const points = subdivide(49, 81);
    expect(points[points.length - 1]).toBeCloseTo(81, 10);
  });

  test('honours a custom part count', () => {
    expect(subdivide(0, 4, 4)).toEqual([1, 2, 3, 4]);
  });

  test('handles a descending range without reordering', () => {
    // buildLadder always passes ascending pairs, but the maths must not
    // silently misbehave if it ever does not.
    expect(subdivide(28, 25, 4)).toEqual([27.25, 26.5, 25.75, 25]);
  });
});

describe('ringOf', () => {
  test('attributes the documented boundaries', () => {
    const cases = [
      [1, 1], [8, 1],
      [9, 2], [24, 2],
      [25, 3], [48, 3],
      [49, 4], [80, 4],
      [360, 9],
      [361, 10], [440, 10],
    ];
    cases.forEach(([square, ring]) => {
      expect(ringOf(square)).toBe(ring);
    });
  });

  test('an odd square opens a ring rather than closing the previous one', () => {
    expect(ringOf(24)).toBe(2);
    expect(ringOf(25)).toBe(3);
  });

  test('never returns less than 1', () => {
    expect(ringOf(1)).toBe(1);
    expect(ringOf(0)).toBe(1);
  });
});

import { crossMarks } from '../gannLevels';

describe('crossMarks', () => {
  test('reproduces the worked example walking out from 27', () => {
    const grid = buildGannSquare(27, 1);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 8);
    expect(marks.up.map((c) => c.value)).toEqual([28, 31, 34, 37, 40, 43, 46, 49]);
    expect(marks.down.map((c) => c.value)).toEqual([25, 23, 21, 19, 17, 15, 13, 11]);
  });

  test('the inward walk steps by the inner ring width', () => {
    // Ring 2 spans 9..24 with a 45 degree step of 2, so 25, 23, 21 ... 11.
    const grid = buildGannSquare(27, 1);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 8);
    const gaps = marks.down
      .slice(1)
      .map((cell, i) => marks.down[i].value - cell.value);
    expect(gaps).toEqual([2, 2, 2, 2, 2, 2, 2]);
  });

  test('honours the requested count', () => {
    const grid = buildGannSquare(27, 1);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 3);
    expect(marks.up).toHaveLength(3);
    expect(marks.down).toHaveLength(3);
  });

  test('returns fewer marks rather than throwing near the grid edge', () => {
    const grid = buildGannSquare(27, 1);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 500);
    expect(marks.up.length).toBeLessThan(500);
    expect(marks.up.length).toBeGreaterThan(0);
  });

  test('returns empty lists when the target is not on the grid', () => {
    const grid = buildGannSquare(27, 1);
    const marks = crossMarks(grid, grid.bodyPosition, { row: -1, col: -1 }, 8);
    expect(marks.up).toEqual([]);
    expect(marks.down).toEqual([]);
  });

  test('an off-centre cross still returns the requested count', () => {
    const grid = buildGannSquare(3197, 155);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 8);
    expect(marks.up).toHaveLength(8);
    expect(marks.down).toHaveLength(8);
  });

  test('an off-centre cross yields unevenly spaced marks', () => {
    const grid = buildGannSquare(3197, 155);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 8);
    const gaps = marks.up
      .slice(1)
      .map((cell, i) => cell.value - marks.up[i].value);
    expect(new Set(gaps).size).toBeGreaterThan(1);
  });

  test('arm angles advance in order and wrap after eight, off-centre too', () => {
    const grid = buildGannSquare(3197, 155);
    const marks = crossMarks(grid, grid.bodyPosition, grid.targetPosition, 9);
    const degrees = marks.up.map((c) => armDegree(c, grid.bodyPosition));
    // Eight consecutive marks are one full cycle, so the ninth repeats the first.
    expect(degrees[8]).toBe(degrees[0]);
    expect(new Set(degrees.slice(0, 8)).size).toBe(8);
  });
});
