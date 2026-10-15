import { spiralOffset, cellValue, findCell } from '../gannzillaGrid';
import { CELL_VALUES } from './fixtures/gannzillaDocs';
import { buildGannSquare } from '../gannGrid';

describe('spiralOffset (clockwise, x right, y down)', () => {
  test('first ring matches the guide: 2 west, 4 north, 6 east, 8 south', () => {
    expect(spiralOffset(1)).toEqual({ x: 0, y: 0 });
    expect(spiralOffset(2)).toEqual({ x: -1, y: 0 });
    expect(spiralOffset(3)).toEqual({ x: -1, y: -1 });
    expect(spiralOffset(4)).toEqual({ x: 0, y: -1 });
    expect(spiralOffset(5)).toEqual({ x: 1, y: -1 });
    expect(spiralOffset(6)).toEqual({ x: 1, y: 0 });
    expect(spiralOffset(7)).toEqual({ x: 1, y: 1 });
    expect(spiralOffset(8)).toEqual({ x: 0, y: 1 });
    expect(spiralOffset(9)).toEqual({ x: -1, y: 1 });
  });

  test('a new ring starts one step left of the last odd square', () => {
    expect(spiralOffset(10)).toEqual({ x: -2, y: 1 });
    expect(spiralOffset(26)).toEqual({ x: -3, y: 2 });
    expect(spiralOffset(50)).toEqual({ x: -4, y: 3 });
  });

  test('odd squares lie on the lower-left diagonal', () => {
    [3, 5, 7, 9, 19].forEach((root) => {
      const k = (root - 1) / 2;
      expect(spiralOffset(root * root)).toEqual({ x: -k, y: k });
    });
  });

  test('19x19 default chart: 298 W, 316 N, 334 E, 352 S', () => {
    expect(spiralOffset(298)).toEqual({ x: -9, y: 0 });
    expect(spiralOffset(316)).toEqual({ x: 0, y: -9 });
    expect(spiralOffset(334)).toEqual({ x: 9, y: 0 });
    expect(spiralOffset(352)).toEqual({ x: 0, y: 9 });
  });

  test('anticlockwise mirrors left-right: 2 east, 4 north, 6 west', () => {
    expect(spiralOffset(2, false)).toEqual({ x: 1, y: 0 });
    expect(spiralOffset(4, false)).toEqual({ x: 0, y: -1 });
    expect(spiralOffset(6, false)).toEqual({ x: -1, y: 0 });
    expect(spiralOffset(9, false)).toEqual({ x: 1, y: 1 });
    expect(spiralOffset(10, false)).toEqual({ x: 2, y: 1 });
  });

  test('agrees with the existing engine on every cell of a large grid', () => {
    const grid = buildGannSquare(5000, 1);
    const c = (grid.dimension - 1) / 2;
    grid.positionSequence.forEach((p) => {
      expect(spiralOffset(p.value)).toEqual({ x: p.col - c, y: p.row - c });
    });
  });

  test('anticlockwise mirrors the existing engine on every cell', () => {
    const grid = buildGannSquare(5000, 1);
    const c = (grid.dimension - 1) / 2;
    grid.positionSequence.forEach((p) => {
      expect(spiralOffset(p.value, false)).toEqual({ x: -(p.col - c) || 0, y: p.row - c });
    });
  });

  test('stays exact at ring boundaries for very large n', () => {
    expect(spiralOffset(20001 ** 2)).toEqual({ x: -10000, y: 10000 });
    expect(spiralOffset(20001 ** 2 + 1)).toEqual({ x: -10001, y: 10000 });
  });

  test('rejects an index that is not a positive integer', () => {
    expect(() => spiralOffset(0)).toThrow(RangeError);
    expect(() => spiralOffset(2.5)).toThrow(RangeError);
  });
});

describe('cellValue = Value + (n-1) * Increment', () => {
  CELL_VALUES.forEach(({ value, increment, cells }) => {
    test(`Value ${value}, Increment ${increment} matches the guide`, () => {
      Object.entries(cells).forEach(([n, shown]) => {
        expect(cellValue(Number(n), { value, increment })).toBe(shown);
      });
    });
  });

  test('defaults to Value 1, Increment 1', () => {
    expect(cellValue(361)).toBe(361);
  });

  test('allows a negative increment (counting down from a high)', () => {
    expect(cellValue(1, { value: 100, increment: -2 })).toBe(100);
    expect(cellValue(4, { value: 100, increment: -2 })).toBe(94);
  });
});

describe('findCell', () => {
  test('Find 8 with defaults lands directly below the centre (extract #6)', () => {
    const n = findCell(8);
    expect(n).toBe(8);
    expect(spiralOffset(n)).toEqual({ x: 0, y: 1 });
  });

  test('inverts cellValue for a non-default grid', () => {
    expect(findCell(1081, { value: 1, increment: 3 })).toBe(361);
  });

  test('rounds down to the largest value <= target (black-box [02])', () => {
    const g = { value: 1, increment: 3 }; // cells show 1, 4, 7, 10 ...
    expect(cellValue(findCell(5, g), g)).toBe(4);
    expect(cellValue(findCell(6, g), g)).toBe(4);
    expect(cellValue(findCell(6.99, g), g)).toBe(4);
    expect(cellValue(findCell(9.5, g), g)).toBe(7);
    expect(cellValue(findCell(7, g), g)).toBe(7);
  });

  test('returns null below the centre value', () => {
    expect(findCell(0)).toBeNull();
  });

  test('tolerates floating-point noise in decimal increments', () => {
    expect(findCell(0.3, { value: 0.1, increment: 0.1 })).toBe(3);
  });

  test('returns null for non-finite input or a non-positive increment', () => {
    expect(findCell(NaN)).toBeNull();
    expect(findCell(Infinity)).toBeNull();
    expect(findCell(5, { value: NaN })).toBeNull();
    expect(findCell(5, { increment: 0 })).toBeNull();
    expect(findCell(5, { increment: -1 })).toBeNull();
  });

  test('hits every cell exactly on a decimal grid', () => {
    const g = { value: 20000, increment: 0.05 };
    for (let n = 1; n <= 2000; n++) expect(findCell(cellValue(n, g), g)).toBe(n);
  });
});
