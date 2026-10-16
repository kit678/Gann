import {
  POLYGONS, DEFAULT_VECTORS, polygonVertices, vectorRays, locatorLine,
  pointInPolygon, polygonCells, defaultFigures,
} from '../gannzillaFigures';

const close = (p, x, y) => {
  expect(p.x).toBeCloseTo(x, 9);
  expect(p.y).toBeCloseTo(y, 9);
};

describe('polygons (docs §1.3)', () => {
  test('the list is Triangle..Dodecagon', () => {
    expect(POLYGONS.map((p) => p.sides)).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(POLYGONS[0].name).toBe('Triangle');
    expect(POLYGONS[9].name).toBe('Dodecagon');
  });

  test('Triangle at 0: apex west, then +120 and +240 clockwise, labelled 1/3 and 2/3', () => {
    const v = polygonVertices(3, 0, 1);
    close(v[0], -1, 0);
    expect(v.map((p) => p.label)).toEqual(['0°', '1/3', '2/3']);
    expect(v.map((p) => p.deg)).toEqual([0, 120, 240]);
    // 120 clockwise from west is upper-right on screen (y down).
    expect(v[1].x).toBeGreaterThan(0);
    expect(v[1].y).toBeLessThan(0);
  });

  test('the angle rotates the first vertex and labels it', () => {
    const v = polygonVertices(4, 90, 2, { cx: 10, cy: 10 });
    close(v[0], 10, 8); // 90 = north
    expect(v[0].label).toBe('90°');
    expect(v[1].deg).toBe(180);
  });
});

describe('Vectors (docs §1.3, #25)', () => {
  test('defaults are the guide list', () => {
    expect(DEFAULT_VECTORS).toEqual([23.6, 38.2, 50, 61.8, 100, 161.8, 261.8]);
  });

  test('base 0: 100 just past north, 161.8 just above east, 261.8 just east of south', () => {
    const rays = vectorRays(DEFAULT_VECTORS, 0, 1);
    const at = (v) => rays.find((r) => r.value === v);
    expect(at(100).x).toBeGreaterThan(0);
    expect(at(100).y).toBeLessThan(0);
    expect(at(161.8).x).toBeGreaterThan(0.9);
    expect(at(161.8).y).toBeLessThan(0);
    expect(at(261.8).y).toBeGreaterThan(0.9);
    expect(at(261.8).x).toBeGreaterThan(0);
  });

  test('Clockwise off mirrors left-right', () => {
    const [ray] = vectorRays([90], 30, 1, { clockwise: false });
    const [mirror] = vectorRays([90], 30, 1);
    close(ray, -mirror.x, mirror.y);
  });
});

describe('Locator (docs §1.3)', () => {
  test('at 354 the bear end sits just below west and the bull end opposite', () => {
    const { bear, bull } = locatorLine(354, 1);
    expect(bear.x).toBeLessThan(-0.99);
    expect(bear.y).toBeGreaterThan(0);
    close(bull, -bear.x, -bear.y);
  });
});

describe('polygon highlight', () => {
  test('pointInPolygon', () => {
    const square = [{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }];
    expect(pointInPolygon({ x: 0, y: 0 }, square)).toBe(true);
    expect(pointInPolygon({ x: 2, y: 0 }, square)).toBe(false);
    expect(pointInPolygon({ x: 1, y: 0 }, square)).toBe(true); // edge counts
  });

  test('a Square at 0 (a diamond) on 5x5 holds the 13 cells within Manhattan distance 2', () => {
    const cells = polygonCells(5, 4, 0);
    expect(cells.has('2,2')).toBe(true);
    expect(cells.has('2,0')).toBe(true); // west vertex row
    expect(cells.has('0,0')).toBe(false);
    expect(cells.size).toBe(13);
  });

  test('a Square at 45 (axis-aligned, inscribed in the circle) holds the middle 3x3', () => {
    const cells = polygonCells(5, 4, 45);
    expect(cells.size).toBe(9);
    expect(cells.has('1,1')).toBe(true);
    expect(cells.has('0,2')).toBe(false);
  });

  test('anticlockwise grids mirror the columns', () => {
    // Triangle at 0 points west; mirrored it covers the east side's columns instead.
    const cw = polygonCells(9, 3, 0);
    const ccw = polygonCells(9, 3, 0, { clockwise: false });
    expect(cw.size).toBe(ccw.size);
    cw.forEach((key) => {
      const [row, col] = key.split(',').map(Number);
      expect(ccw.has(`${row},${8 - col}`)).toBe(true);
    });
  });
});

test('defaultFigures: every figure hidden, Vectors at the guide list', () => {
  const f = defaultFigures();
  expect(f.hide).toBe(false);
  expect(Object.keys(f.polygons)).toHaveLength(10);
  expect(Object.values(f.polygons).every((p) => !p.visible && !p.highlight && p.angle === 0)).toBe(true);
  expect(f.vectors).toEqual({ visible: false, clockwise: true, angle: 0, values: DEFAULT_VECTORS });
  expect(f.locator).toEqual({ visible: false, angle: 0 });
});
