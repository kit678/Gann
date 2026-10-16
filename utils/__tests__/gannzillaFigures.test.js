import {
  POLYGONS, DEFAULT_VECTORS, polygonVertices, vectorRays, locatorLine,
  figureRadius, vortexSpiral, vortexAxes, VORTEX_OUTER_CELLS, defaultFigures,
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

  test('Clockwise off keeps the base and turns the rays the other way (black-box)', () => {
    // Base 30, ray 90 anticlockwise: screen angle -60, i.e. down-left.
    const [ray] = vectorRays([90], 30, 1, { clockwise: false });
    close(ray, -0.5, Math.sqrt(3) / 2);
    // Base 30, ray 23.6 anticlockwise sits 6.4 deg above west.
    const [low] = vectorRays([23.6], 30, 1, { clockwise: false });
    expect(low.x).toBeLessThan(-0.99);
    expect(low.y).toBeLessThan(0);
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

describe('figure size', () => {
  test('figures reach the grid corners: half the diagonal', () => {
    expect(figureRadius(100)).toBeCloseTo(70.7107, 4);
  });
});

describe('Vortex (black-box)', () => {
  test('starts at the angle, 10 cells out at Radius 1, and shrinks by phi per quarter turn', () => {
    const pts = vortexSpiral(0, 1, 1, { steps: 16, turns: 1 });
    close(pts[0], -VORTEX_OUTER_CELLS, 0);
    const phi = (1 + Math.sqrt(5)) / 2;
    // A quarter turn clockwise from west is north.
    close(pts[4], 0, -VORTEX_OUTER_CELLS / phi);
  });

  test('the bear spiral winds the other way', () => {
    const bull = vortexSpiral(0, 1, 1, { steps: 16, turns: 1 });
    const bear = vortexSpiral(0, 1, 1, { steps: 16, turns: 1, bull: false });
    close(bear[4], bull[4].x, -bull[4].y);
  });

  test('Radius scales it linearly', () => {
    const one = vortexSpiral(0, 1, 1, { steps: 8, turns: 1 });
    const two = vortexSpiral(0, 2, 1, { steps: 8, turns: 1 });
    one.forEach((p, i) => close(two[i], 2 * p.x, 2 * p.y));
  });

  test('eight axes every 45 deg from the angle', () => {
    const axes = vortexAxes(0, 1, 1);
    expect(axes).toHaveLength(8);
    close(axes[0], -10, 0);
    close(axes[2], 0, -10);
  });
});

test('defaultFigures: every figure hidden, Vectors at the guide list', () => {
  const f = defaultFigures();
  expect(f.hide).toBe(false);
  expect(Object.keys(f.polygons)).toHaveLength(10);
  expect(Object.values(f.polygons).every((p) => !p.visible && !p.highlight && p.angle === 0)).toBe(true);
  expect(f.vectors).toEqual({ visible: false, clockwise: true, angle: 0, values: DEFAULT_VECTORS });
  expect(f.locator).toEqual({ visible: false, angle: 0 });
  expect(f.vortex).toEqual({ visible: false, angle: 0, trend: 'Both', price: 1, radius: 1 });
});
