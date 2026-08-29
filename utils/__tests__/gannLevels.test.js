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

import { buildLadder } from '../gannLevels';

const centreLadder = (overrides = {}) => {
  const grid = buildGannSquare(27, 1);
  return buildLadder({
    grid,
    crossCentre: grid.bodyPosition,
    source: 'center',
    scale: 1,
    count: 8,
    ...overrides,
  });
};

describe('buildLadder', () => {
  test('includes the majors from the worked example', () => {
    const majors = centreLadder()
      .filter((l) => l.kind === 'major')
      .map((l) => l.square);
    [11, 13, 25, 28, 31, 49].forEach((sq) => expect(majors).toContain(sq));
  });

  test('subdivides the segment straddling the price', () => {
    // 27 sits between 25 and 28. That segment must be present.
    const subs = centreLadder().filter(
      (l) => l.kind === 'sub' && l.segmentStart === 25 && l.segmentEnd === 28
    );
    expect(subs.map((l) => l.square)).toEqual([
      27.625, 27.25, 26.875, 26.5, 26.125, 25.75, 25.375,
    ]);
  });

  test('the straddling segment yields levels on both sides of the price', () => {
    const subs = centreLadder().filter(
      (l) => l.kind === 'sub' && l.segmentStart === 25
    );
    expect(subs.some((l) => l.direction === 'down')).toBe(true);
    expect(subs.some((l) => l.direction === 'up')).toBe(true);
  });

  test('emits sub-indices 1 to 7 only, so no major is duplicated', () => {
    const ladder = centreLadder();
    const subIndices = new Set(
      ladder.filter((l) => l.kind === 'sub').map((l) => l.subIndex)
    );
    expect([...subIndices].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const squares = ladder.map((l) => l.square);
    expect(new Set(squares).size).toBe(squares.length);
  });

  test('flags the halfway sub-level', () => {
    const halfway = centreLadder().filter((l) => l.isHalfway);
    halfway.forEach((l) => expect(l.subIndex).toBe(4));
    const straddling = halfway.find((l) => l.segmentStart === 25);
    expect(straddling.square).toBe(26.5);
  });

  test('labels majors with their own arm angle', () => {
    const bySquare = Object.fromEntries(
      centreLadder()
        .filter((l) => l.kind === 'major')
        .map((l) => [l.square, l.degree])
    );
    expect(bySquare[25]).toBe(0);
    expect(bySquare[28]).toBe(45);
    expect(bySquare[49]).toBe(0);
  });

  test('sub-levels inherit the angle of the segment they open', () => {
    const subs = centreLadder().filter((l) => l.segmentStart === 25);
    subs.forEach((l) => expect(l.degree).toBe(0));
  });

  test('sub-levels take the ring of their segment start, not their own value', () => {
    const grid = buildGannSquare(48, 1);
    const ladder = buildLadder({
      grid, crossCentre: grid.bodyPosition, source: 'center', scale: 1, count: 8,
    });
    // 49 opens ring 4. A sub-level just below it belongs to the segment that
    // starts in ring 3, so it must be tagged ring 3.
    const justBelow = ladder.find(
      (l) => l.kind === 'sub' && l.segmentEnd === 49 && l.subIndex === 7
    );
    expect(justBelow.square).toBeGreaterThan(48);
    expect(justBelow.ring).toBe(3);
  });

  test('scale changes price but not square', () => {
    const plain = centreLadder({ scale: 1 });
    const scaled = centreLadder({ scale: 10 });
    expect(scaled[0].square).toBe(plain[0].square);
    expect(scaled[0].price).toBeCloseTo(plain[0].square / 10, 10);
  });

  test('fractional sub-levels survive scaling without being rounded', () => {
    const level = centreLadder({ scale: 10 }).find(
      (l) => l.kind === 'sub' && l.square === 26.5
    );
    expect(level.price).toBeCloseTo(2.65, 10);
  });

  test('is sorted by square descending, so it reads like a price axis', () => {
    const squares = centreLadder().map((l) => l.square);
    const sorted = [...squares].sort((a, b) => b - a);
    expect(squares).toEqual(sorted);
  });

  test('tags every level with the source it came from', () => {
    centreLadder({ source: 'moon' }).forEach((l) =>
      expect(l.source).toBe('moon')
    );
  });

  test('Sun and Moon at different degrees give different ladders', () => {
    const sunGrid = buildGannSquare(3197, 155);
    const moonGrid = buildGannSquare(3197, 331);
    const sun = buildLadder({
      grid: sunGrid, crossCentre: sunGrid.bodyPosition, source: 'sun', scale: 10, count: 8,
    });
    const moon = buildLadder({
      grid: moonGrid, crossCentre: moonGrid.bodyPosition, source: 'moon', scale: 10, count: 8,
    });
    expect(sun.map((l) => l.square)).not.toEqual(moon.map((l) => l.square));
  });

  test('the same degree for both bodies gives identical squares', () => {
    const a = buildGannSquare(3197, 200);
    const b = buildGannSquare(3197, 200);
    const ladderA = buildLadder({
      grid: a, crossCentre: a.bodyPosition, source: 'sun', scale: 10, count: 8,
    });
    const ladderB = buildLadder({
      grid: b, crossCentre: b.bodyPosition, source: 'moon', scale: 10, count: 8,
    });
    expect(ladderA.map((l) => l.square)).toEqual(ladderB.map((l) => l.square));
  });

  test('an off-centre cross subdivides each gap by its own width', () => {
    const grid = buildGannSquare(3197, 155);
    const ladder = buildLadder({
      grid, crossCentre: grid.bodyPosition, source: 'sun', scale: 10, count: 8,
    });
    const stepFor = (start) => {
      const seg = ladder.filter((l) => l.kind === 'sub' && l.segmentStart === start);
      return seg.length ? Math.abs(seg[0].square - start) : null;
    };
    const starts = [
      ...new Set(ladder.filter((l) => l.kind === 'sub').map((l) => l.segmentStart)),
    ];
    const steps = starts.map(stepFor).filter((s) => s !== null);
    expect(new Set(steps.map((s) => s.toFixed(6))).size).toBeGreaterThan(1);
  });

  test('returns an empty ladder when the target is missing', () => {
    const grid = buildGannSquare(27, 1);
    expect(
      buildLadder({
        grid,
        crossCentre: grid.bodyPosition,
        source: 'center',
        scale: 1,
        count: 8,
        targetPosition: { row: -1, col: -1 },
      })
    ).toEqual([]);
  });

  test('a price sitting exactly on a major mark is itself listed as a major', () => {
    // 28 is on the centre cross's 45 degree arm (ring 3's second mark).
    // crossMarks only walks strictly outward from the target, so without
    // special handling the target's own square is silently dropped and the
    // segments on either side of it get merged into one.
    const grid = buildGannSquare(28, 1);
    const ladder = buildLadder({
      grid, crossCentre: grid.bodyPosition, source: 'center', scale: 1, count: 8,
    });

    const major = ladder.find((l) => l.square === 28);
    expect(major.kind).toBe('major');
    expect(major.degree).toBe(45);

    // With 28 correctly present as its own major, the segments on either
    // side are 25-28 and 28-31, not one merged 25-31 segment.
    const segmentStarts = new Set(
      ladder.filter((l) => l.kind === 'sub').map((l) => l.segmentStart)
    );
    expect(segmentStarts.has(25)).toBe(true);
    expect(segmentStarts.has(28)).toBe(true);
    expect(segmentStarts.has(24)).toBe(false); // no merged 25-31 span
  });
});
