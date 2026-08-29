import { buildGannSquare } from '../gannGrid';
import { armDegree } from '../gannLevels';

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
