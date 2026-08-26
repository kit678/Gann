import { buildGannSquare, findLevels } from '../gannGrid';
import { normalizeBodyDegree } from '../gannGrid';

/**
 * Baselines captured from the running application before the extraction.
 * These must not change - they are the guarantee that Sun output is identical.
 */
const BASELINES = [
  { target: 810,  body: 71,  up: [811, 823, 835],    down: [801, 791, 775] },
  { target: 3099, body: 152, up: [3115, 3144, 3166], down: [3086, 3052, 3018] },
  { target: 3094, body: 148, up: [3115, 3140, 3162], down: [3090, 3056, 3022] },
  { target: 4917, body: 152, up: [4937, 4966, 5000], down: [4908, 4872, 4836] },
];

describe('gannGrid regression against pre-extraction behaviour', () => {
  BASELINES.forEach(({ target, body, up, down }) => {
    test(`target=${target} body=${body} produces the original levels`, () => {
      const grid = buildGannSquare(target, body);
      const levels = findLevels(grid, 3);
      expect(levels.up.map((l) => l.value)).toEqual(up);
      expect(levels.down.map((l) => l.value)).toEqual(down);
    });
  });

  test('reports the target and body as found', () => {
    const grid = buildGannSquare(3099, 152);
    expect(grid.targetFound).toBe(true);
    expect(grid.bodyFound).toBe(true);
  });

  test('produces an odd square dimension', () => {
    const grid = buildGannSquare(810, 71);
    expect(grid.dimension % 2).toBe(1);
    expect(grid.matrix.length).toBe(grid.dimension);
  });

  test('refuses a grid above MAX_CELLS rather than freezing the tab', () => {
    const grid = buildGannSquare(10000000, 71);
    expect(grid.tooLarge).toBe(true);
    expect(grid.matrix).toEqual([]);
    expect(grid.targetFound).toBe(false);
    expect(grid.bodyFound).toBe(false);
  });
});

describe('normalizeBodyDegree', () => {
  test('maps 0 degrees to square 360, not the fallback', () => {
    expect(normalizeBodyDegree(0)).toBe(360);
  });

  test('maps a sub-degree value to 360 rather than 0', () => {
    expect(normalizeBodyDegree(0.4)).toBe(360);
  });

  test('rounds 359.6 up to 360 and keeps it there', () => {
    expect(normalizeBodyDegree(359.6)).toBe(360);
  });

  test('leaves an ordinary degree alone', () => {
    expect(normalizeBodyDegree(152.3)).toBe(152);
  });

  test('falls back only when the value is genuinely missing', () => {
    expect(normalizeBodyDegree(undefined)).toBe(71);
    expect(normalizeBodyDegree(NaN)).toBe(71);
    expect(normalizeBodyDegree(null, 90)).toBe(90);
  });

  test('wraps values at or beyond a full turn', () => {
    expect(normalizeBodyDegree(361)).toBe(1);
    expect(normalizeBodyDegree(720)).toBe(360);
  });
});
