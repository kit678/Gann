import { layoutPosition, layoutCellCount, LAYOUTS } from '../gannzillaLayouts';

const at = (view, n, opts) => {
  const p = layoutPosition(view, n, opts);
  return { x: Math.round(p.x * 1e6) / 1e6 || 0, y: Math.round(p.y * 1e6) / 1e6 || 0 };
};

describe('Square of 4 (black-box [14])', () => {
  test('2x2 core: 1 top-left, 2 top-right, 3 bottom-right, 4 bottom-left', () => {
    expect(at('square4', 1)).toEqual({ x: 0, y: 0 });
    expect(at('square4', 2)).toEqual({ x: 1, y: 0 });
    expect(at('square4', 3)).toEqual({ x: 1, y: 1 });
    expect(at('square4', 4)).toEqual({ x: 0, y: 1 });
  });

  test('ring 2 starts left of 1, climbs, then runs right, down, left, up', () => {
    expect(at('square4', 5)).toEqual({ x: -1, y: 0 });
    expect(at('square4', 6)).toEqual({ x: -1, y: -1 });
    expect(at('square4', 9)).toEqual({ x: 2, y: -1 });
    expect(at('square4', 12)).toEqual({ x: 2, y: 2 });
    expect(at('square4', 15)).toEqual({ x: -1, y: 2 });
    expect(at('square4', 16)).toEqual({ x: -1, y: 1 });
    expect(at('square4', 17)).toEqual({ x: -2, y: 0 });
  });

  test('even squares run left along the row below 1', () => {
    [4, 16, 36, 64, 100, 144, 196, 256, 324, 400].forEach((sq, i) => {
      expect(at('square4', sq)).toEqual({ x: -i || 0, y: 1 });
    });
  });
});

describe('Circle of N (black-box [15]-[17])', () => {
  test('cell 1 sits just above west and numbering runs clockwise', () => {
    const one = layoutPosition('circle12', 1);
    expect(one.x).toBeLessThan(0);
    expect(one.y).toBeLessThan(0);
    expect(Math.abs(one.y)).toBeLessThan(Math.abs(one.x));
    const three = layoutPosition('circle12', 3); // just left of north
    expect(three.x).toBeLessThan(0);
    expect(Math.abs(three.x)).toBeLessThan(Math.abs(three.y));
    const six = layoutPosition('circle12', 6); // just above east
    expect(six.x).toBeGreaterThan(0);
    expect(six.y).toBeLessThan(0);
  });

  test('each ring holds N cells, further out', () => {
    const r = (p) => Math.hypot(p.x, p.y);
    expect(r(layoutPosition('circle12', 13))).toBeGreaterThan(r(layoutPosition('circle12', 12)));
    expect(r(layoutPosition('circle24', 24))).toBeCloseTo(r(layoutPosition('circle24', 1)), 9);
    expect(r(layoutPosition('circle36', 37))).toBeGreaterThan(r(layoutPosition('circle36', 36)));
  });
});

describe('Permanent square (black-box [18])', () => {
  test('fills top to bottom, column by column', () => {
    expect(at('permanent', 1, { size: 10 })).toEqual({ x: 0, y: 0 });
    expect(at('permanent', 10, { size: 10 })).toEqual({ x: 0, y: 9 });
    expect(at('permanent', 11, { size: 10 })).toEqual({ x: 1, y: 0 });
    expect(at('permanent', 100, { size: 10 })).toEqual({ x: 9, y: 9 });
  });
});

describe('Tetragon (black-box [19])', () => {
  test('ring 1 is N, E, S, W', () => {
    expect(at('tetragon', 1)).toEqual({ x: 0, y: 0 });
    expect(at('tetragon', 2)).toEqual({ x: 0, y: -1 });
    expect(at('tetragon', 3)).toEqual({ x: 1, y: 0 });
    expect(at('tetragon', 4)).toEqual({ x: 0, y: 1 });
    expect(at('tetragon', 5)).toEqual({ x: -1, y: 0 });
  });

  test('ring 2 starts north-west of centre and ends at west', () => {
    expect(at('tetragon', 6)).toEqual({ x: -1, y: -1 });
    expect(at('tetragon', 7)).toEqual({ x: 0, y: -2 });
    expect(at('tetragon', 9)).toEqual({ x: 2, y: 0 });
    expect(at('tetragon', 11)).toEqual({ x: 0, y: 2 });
    expect(at('tetragon', 13)).toEqual({ x: -2, y: 0 });
    expect(at('tetragon', 14)).toEqual({ x: -2, y: -1 });
  });

  test('centred square numbers line up to the west', () => {
    [1, 5, 13, 25, 41].forEach((n, k) => expect(at('tetragon', n)).toEqual({ x: -k || 0, y: 0 }));
  });
});

describe('Pentagon to Octagon (black-box [20])', () => {
  test('pentagon: centred pentagonal numbers line up to the west', () => {
    [1, 6, 16, 31].forEach((n, k) => expect(at('pentagon', n)).toEqual({ x: -k || 0, y: 0 }));
  });

  test('ring k of an N-gon holds N*k cells', () => {
    expect(layoutCellCount('hexagon', 3)).toBe(1 + 6 * (1 + 2 + 3));
    expect(layoutCellCount('octagon', 2)).toBe(1 + 8 * 3);
  });
});

describe("Hexagon (black-box, and Gann's own Hexagon Chart text)", () => {
  const h = (n) => layoutPosition('hexagon', n);
  const angleOf = (p) => (Math.atan2(-p.y, p.x) * 180) / Math.PI; // maths angle, y up

  test('ring 1 as Gannzilla draws it: 2 upper-left, 4 east, 7 west', () => {
    expect(angleOf(h(2))).toBeCloseTo(120, 9);
    expect(angleOf(h(3))).toBeCloseTo(60, 9);
    expect(angleOf(h(4))).toBeCloseTo(0, 9);
    expect(angleOf(h(5))).toBeCloseTo(-60, 9);
    expect(angleOf(h(6))).toBeCloseTo(-120, 9);
    expect(Math.abs(angleOf(h(7)))).toBeCloseTo(180, 9);
  });

  test('Gann: 7, 19, 37 ... 397 all lie on one straight line from the centre (west)', () => {
    [7, 19, 37, 61, 91, 127, 169, 217, 271, 331, 397].forEach((n) => {
      expect(Math.abs(angleOf(h(n)))).toBeCloseTo(180, 9);
    });
  });

  test('Gann: 2, 9, 22 ... 342 lie on the line 60 deg from it', () => {
    [2, 9, 22, 41, 66, 97, 134, 177, 226, 281, 342].forEach((n) => {
      expect(angleOf(h(n))).toBeCloseTo(120, 9);
    });
  });
});

describe('Heptagon and Octagon ring 1 (black-box)', () => {
  test('ring 1 ends at west: 8 for the heptagon, 9 for the octagon', () => {
    expect(layoutPosition('septagon', 8).x).toBeCloseTo(-1, 9);
    expect(layoutPosition('septagon', 8).y).toBeCloseTo(0, 9);
    expect(layoutPosition('octagon', 9).x).toBeCloseTo(-1, 9);
    expect(layoutPosition('octagon', 9).y).toBeCloseTo(0, 9);
  });

  test('octagon: 2 at the upper-left corner, 3 north, 5 east, 7 south', () => {
    const o = (n) => layoutPosition('octagon', n);
    expect(o(2).x).toBeCloseTo(-Math.SQRT1_2, 9);
    expect(o(2).y).toBeCloseTo(-Math.SQRT1_2, 9);
    expect(o(3).x).toBeCloseTo(0, 9);
    expect(o(5).y).toBeCloseTo(0, 9);
    expect(o(7).y).toBeCloseTo(1, 9);
  });
});

describe('anticlockwise and bad input', () => {
  test('anticlockwise mirrors every layout left-right', () => {
    LAYOUTS.forEach((view) => {
      const cw = layoutPosition(view, 7, { size: 10 });
      const ccw = layoutPosition(view, 7, { size: 10, clockwise: false });
      if (view === 'permanent') return; // a plain table has no direction
      expect(ccw.x).toBeCloseTo(-cw.x, 9);
      expect(ccw.y).toBeCloseTo(cw.y, 9);
    });
  });

  test('rejects an unknown layout or a bad index', () => {
    expect(() => layoutPosition('triangle', 1)).toThrow(RangeError);
    expect(() => layoutPosition('square4', 0)).toThrow(RangeError);
  });
});
