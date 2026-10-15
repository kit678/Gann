import { spiralOffset } from '../gannzillaGrid';
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
