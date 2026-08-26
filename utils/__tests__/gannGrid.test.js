import { buildGannSquare, findLevels } from '../gannGrid';

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
});
