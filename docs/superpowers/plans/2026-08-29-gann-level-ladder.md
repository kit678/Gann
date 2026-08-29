# Gann Level Ladder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure module that emits a fully-labeled ladder of Gann Square-of-9 price levels from three crosses (centre, Sun, Moon), and display it under the existing chart.

**Architecture:** Four pure functions compose into one `buildLadder` entry point. `armDegree` labels which of a cross's eight arms a cell sits on and doubles as the on-cross test. `crossMarks` walks the existing spiral sequence outward and inward from the price's square. `subdivide` and `ringOf` are standalone arithmetic. `buildLadder` merges the up and down marks into one ascending list, subdivides every consecutive pair (including the segment straddling the price), and tags each level with its provenance. A presentational React component renders the result.

**Tech Stack:** JavaScript ES modules, React 18, Jest via `next/jest`. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-28-gann-level-ladder-design.md`

---

## File Structure

| File | Responsibility |
|---|---|
| `utils/gannLevels.js` (create) | All ladder maths. Pure, no React. Mirrors the existing `utils/gannGrid.js` / `utils/gannView.js` split. |
| `utils/__tests__/gannLevels.test.js` (create) | Unit tests for the above. |
| `components/LevelLadderTable.js` (create) | Presentational table. Kept out of the page, which is already ~330 lines. |
| `components/GannSquareChart.js` (modify) | Builds the three ladders from grids it already has; emits via a new `onLaddersChange` callback, matching the existing `onLevelsChange` pattern. |
| `pages/gann-chart-test.js` (modify) | Holds ladder state, renders the table, exposes the mark-count input. |

**Key simplification, already verified:** `buildGannSquare(target, 1)` returns `bodyPosition` equal to the grid centre, because the spiral writes `1` at the centre and the function records the position of whatever `body` value it is given. So the centre cross needs no special-casing — it is just a cross centred on the cell holding value `1`.

---

## Task 1: Arm angle labelling

**Files:**
- Create: `utils/gannLevels.js`
- Create: `utils/__tests__/gannLevels.test.js`

`armDegree` answers "which of the eight arms of this cross does this cell sit on". It returns `null` for cells that are not on the cross at all, which makes it double as the on-cross predicate used later by `crossMarks`.

The angle convention is fixed by the project's zero-degree choice: the odd-square diagonal runs down-left from the centre and is `0°`. Angles then increase anticlockwise in screen terms. This was verified against the live grid — ring 3 of the centre cross labels as `25→0, 28→45, 31→90, 34→135, 37→180, 40→225, 43→270, 46→315, 49→0`.

- [ ] **Step 1: Write the failing test**

Create `utils/__tests__/gannLevels.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: FAIL — `Cannot find module '../gannLevels'`

- [ ] **Step 3: Write minimal implementation**

Create `utils/gannLevels.js`:

```js
/**
 * Gann level ladder construction.
 *
 * Pure functions, no React. See
 * docs/superpowers/specs/2026-08-28-gann-level-ladder-design.md
 */

/**
 * Arm angle by the sign of the offset from the cross centre.
 *
 * 0 degrees is the down-left diagonal, which is where the odd squares
 * (1, 9, 25, 49 ...) lie. Keys are `${sign(dRow)},${sign(dCol)}`.
 */
const ARM_BY_SIGN = {
  '1,-1': 0,
  '0,-1': 45,
  '-1,-1': 90,
  '-1,0': 135,
  '-1,1': 180,
  '0,1': 225,
  '1,1': 270,
  '1,0': 315,
};

/**
 * Which of a cross's eight arms a cell sits on.
 *
 * Returns null for the cross's own centre (it belongs to every arm at once)
 * and null for any cell not on the cross. That second case makes this usable
 * as the on-cross predicate.
 *
 * Never returns 360: a mark one full lap beyond a 0 mark is itself 0. The
 * angle identifies the arm, not the lap.
 *
 * @param {{row:number, col:number}} cell
 * @param {{row:number, col:number}} crossCentre
 * @returns {number|null} 0, 45, 90, 135, 180, 225, 270, 315, or null
 */
export function armDegree(cell, crossCentre) {
  const dRow = cell.row - crossCentre.row;
  const dCol = cell.col - crossCentre.col;

  if (dRow === 0 && dCol === 0) return null;

  const onCross =
    dRow === 0 || dCol === 0 || Math.abs(dRow) === Math.abs(dCol);
  if (!onCross) return null;

  const key = `${Math.sign(dRow)},${Math.sign(dCol)}`;
  return ARM_BY_SIGN[key] ?? null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: PASS, 5 tests

- [ ] **Step 5: Commit**

```bash
git add utils/gannLevels.js utils/__tests__/gannLevels.test.js
git commit -m "feat: label which arm of a Gann cross a cell sits on"
```

---

## Task 2: Subdivision and ring attribution

**Files:**
- Modify: `utils/gannLevels.js`
- Modify: `utils/__tests__/gannLevels.test.js`

Two independent pieces of arithmetic.

`subdivide` splits a gap into eight. It returns all eight points including the
final one, which equals `hi`. `buildLadder` later drops that eighth point,
because it is the next major mark and would otherwise be listed twice.

`ringOf` answers which value band a square falls in. **A ring here is a band of
values between consecutive odd squares, not a cell's distance from the grid
centre.** Square 361 sits nine cells out but opens ring 10, because
`361 = (2·10−1)²`. Ring `k` spans `(2k−1)²` to `(2k+1)²−1`, a width of `8k`.

- [ ] **Step 1: Write the failing test**

Append to `utils/__tests__/gannLevels.test.js`:

```js
import { subdivide, ringOf } from '../gannLevels';

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: FAIL — `subdivide is not a function`

- [ ] **Step 3: Write minimal implementation**

Append to `utils/gannLevels.js`:

```js
/**
 * Split a gap into equal parts, returning the division points.
 *
 * The final element equals `hi`. buildLadder drops it, because it is the next
 * major mark and is already in the ladder under its own entry.
 *
 * @param {number} lo
 * @param {number} hi
 * @param {number} [parts]
 * @returns {number[]} `parts` points, ending at `hi`
 */
export function subdivide(lo, hi, parts = 8) {
  const step = (hi - lo) / parts;
  return Array.from({ length: parts }, (_, i) => lo + step * (i + 1));
}

/**
 * Which value ring a square falls in.
 *
 * Ring k spans (2k-1)^2 .. (2k+1)^2 - 1, a width of 8k. This is a band of
 * values between consecutive odd squares - NOT a cell's distance from the
 * grid centre. Square 361 is nine cells out but opens ring 10.
 *
 * @param {number} square
 * @returns {number} ring index, at least 1
 */
export function ringOf(square) {
  return Math.max(1, Math.floor((Math.sqrt(square) + 1) / 2));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: PASS, 13 tests

- [ ] **Step 5: Commit**

```bash
git add utils/gannLevels.js utils/__tests__/gannLevels.test.js
git commit -m "feat: add gap subdivision and value-ring attribution"
```

---

## Task 3: Collecting the major marks

**Files:**
- Modify: `utils/gannLevels.js`
- Modify: `utils/__tests__/gannLevels.test.js`

Walks the spiral outward and inward from the price's square, collecting cells
that lie on the cross. Uses `armDegree(...) !== null` as the on-cross test, so
there is one definition of "on the cross" rather than two.

A consequence worth stating: the cross's own centre cell is **excluded** from
the marks, because `armDegree` returns `null` for it. That cell has no single
arm angle, so it cannot be labelled like the others. It is only ever reachable
when the price square sits immediately beside the body's square.

- [ ] **Step 1: Write the failing test**

Append to `utils/__tests__/gannLevels.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: FAIL — `crossMarks is not a function`

- [ ] **Step 3: Write minimal implementation**

Append to `utils/gannLevels.js`:

```js
/**
 * Collect the squares lying on a cross, walking the spiral out from and back
 * from the price's square.
 *
 * The cross's own centre cell is excluded, since armDegree returns null for
 * it and it therefore has no arm to be labelled with.
 *
 * @param {object} grid - from buildGannSquare
 * @param {{row:number, col:number}} crossCentre
 * @param {{row:number, col:number}} targetPosition - the price's square
 * @param {number} [count] - marks to collect in each direction
 * @returns {{up: object[], down: object[]}} cells in walk order
 */
export function crossMarks(grid, crossCentre, targetPosition, count = 8) {
  const up = [];
  const down = [];
  const { positionSequence } = grid;

  const targetIndex = positionSequence.findIndex(
    (p) => p.row === targetPosition.row && p.col === targetPosition.col
  );
  if (targetIndex === -1) return { up, down };

  for (let i = targetIndex + 1; i < positionSequence.length && up.length < count; i++) {
    const cell = positionSequence[i];
    if (armDegree(cell, crossCentre) !== null) up.push(cell);
  }

  for (let i = targetIndex - 1; i >= 0 && down.length < count; i--) {
    const cell = positionSequence[i];
    if (armDegree(cell, crossCentre) !== null) down.push(cell);
  }

  return { up, down };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: PASS, 21 tests

- [ ] **Step 5: Commit**

```bash
git add utils/gannLevels.js utils/__tests__/gannLevels.test.js
git commit -m "feat: collect the major marks lying on a Gann cross"
```

---

## Task 4: Assembling the ladder

**Files:**
- Modify: `utils/gannLevels.js`
- Modify: `utils/__tests__/gannLevels.test.js`

The entry point. Three details matter and each has a test:

1. **The straddling segment.** The price sits between `down[0]` and `up[0]`.
   That gap is the one price is actually trading inside, so the marks are
   merged into a single ascending list and *every* consecutive pair is
   subdivided, that pair included.
2. **No duplicates.** `subdivide` returns eight points and the eighth is the
   next major mark, so only sub-indices 1–7 are emitted.
3. **Direction is per level.** It compares the level's own square against the
   price's square. It is not inherited from which walk found the bounding
   mark — the straddling segment's sub-levels legitimately fall on both sides
   of the price.

Sub-levels take the ring of `segmentStart`, not of their own fractional value.
A sub-level just under a ring boundary would otherwise land in the wrong ring.

- [ ] **Step 1: Write the failing test**

Append to `utils/__tests__/gannLevels.test.js`:

```js
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
      25.375, 25.75, 26.125, 26.5, 26.875, 27.25, 27.625,
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: FAIL — `buildLadder is not a function`

- [ ] **Step 3: Write minimal implementation**

Append to `utils/gannLevels.js`:

```js
/** Sub-levels emitted per segment. The 8th is the next major mark. */
const SUBS_PER_SEGMENT = 7;

/** The sub-index that lands on the midpoint of a segment. */
const HALFWAY_SUB_INDEX = 4;

/**
 * Build the full labeled level ladder for one cross.
 *
 * Marks are merged into a single ascending list before subdividing, so the
 * segment straddling the price is treated like any other. That segment is the
 * one price is actually trading inside, so it must not be skipped.
 *
 * @param {object} options
 * @param {object} options.grid - from buildGannSquare
 * @param {{row:number, col:number}} options.crossCentre
 * @param {'center'|'sun'|'moon'} options.source
 * @param {number} [options.scale] - price multiplier used to reach the grid
 * @param {number} [options.count] - major marks per direction
 * @param {{row:number, col:number}} [options.targetPosition] - defaults to
 *   the grid's own target
 * @returns {object[]} levels, sorted by square descending
 */
export function buildLadder({
  grid,
  crossCentre,
  source,
  scale = 1,
  count = 8,
  targetPosition = grid.targetPosition,
}) {
  const { up, down } = crossMarks(grid, crossCentre, targetPosition, count);
  if (up.length === 0 && down.length === 0) return [];

  const targetSquare = grid.matrix[targetPosition.row][targetPosition.col];
  const directionOf = (square) => (square > targetSquare ? 'up' : 'down');

  // Ascending: the inward walk reversed, then the outward walk. The pair
  // straddling the price is now just the middle pair.
  const ascending = [...down].reverse().concat(up);

  const levels = ascending.map((cell) => ({
    price: cell.value / scale,
    square: cell.value,
    source,
    kind: 'major',
    degree: armDegree(cell, crossCentre),
    segmentStart: null,
    segmentEnd: null,
    subIndex: null,
    isHalfway: false,
    ring: ringOf(cell.value),
    direction: directionOf(cell.value),
  }));

  for (let i = 0; i < ascending.length - 1; i++) {
    const lo = ascending[i];
    const hi = ascending[i + 1];
    const points = subdivide(lo.value, hi.value);
    // The segment's angle and ring come from the mark that opens it, so a
    // sub-level near a ring boundary is not misattributed.
    const segmentDegree = armDegree(lo, crossCentre);
    const segmentRing = ringOf(lo.value);

    for (let s = 0; s < SUBS_PER_SEGMENT; s++) {
      const square = points[s];
      levels.push({
        price: square / scale,
        square,
        source,
        kind: 'sub',
        degree: segmentDegree,
        segmentStart: lo.value,
        segmentEnd: hi.value,
        subIndex: s + 1,
        isHalfway: s + 1 === HALFWAY_SUB_INDEX,
        ring: segmentRing,
        direction: directionOf(square),
      });
    }
  }

  return levels.sort((a, b) => b.square - a.square);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: PASS, 37 tests

- [ ] **Step 5: Run the whole suite to confirm nothing regressed**

Run: `npx jest`
Expected: PASS — `gannGrid.test.js`, `gannView.test.js`, `gannLevels.test.js`

- [ ] **Step 6: Commit**

```bash
git add utils/gannLevels.js utils/__tests__/gannLevels.test.js
git commit -m "feat: assemble the labeled Gann level ladder"
```

---

## Task 5: The ladder table component

**Files:**
- Create: `components/LevelLadderTable.js`

Purely presentational. It receives finished levels and renders them. It does no
maths, so it needs no unit test of its own; correctness lives in Task 4.

The current price is rendered as its own row in the right position, so the
table reads as a price axis with the price sitting where it actually is.

- [ ] **Step 1: Write the component**

Create `components/LevelLadderTable.js`:

```js
import React, { useMemo } from 'react';

const SOURCE_LABELS = {
  center: 'Centre',
  sun: 'Sun',
  moon: 'Moon',
};

const SOURCE_CLASSES = {
  center: 'text-secondary',
  sun: 'text-warning',
  moon: 'text-info',
};

/**
 * Renders one or more level ladders as a single price-ordered table, with the
 * current price shown in its true position.
 */
const LevelLadderTable = ({ ladders = [], price = null }) => {
  const rows = useMemo(() => {
    const merged = ladders.flat().slice().sort((a, b) => b.price - a.price);
    if (price === null) return merged;

    const index = merged.findIndex((level) => level.price <= price);
    const marker = { isPriceMarker: true, price };
    if (index === -1) return [...merged, marker];
    return [...merged.slice(0, index), marker, ...merged.slice(index)];
  }, [ladders, price]);

  if (rows.length === 0) {
    return <div className="text-muted">No levels to show.</div>;
  }

  return (
    <div className="table-responsive" style={{ maxHeight: '420px' }}>
      <table className="table table-sm table-hover mb-0" style={{ fontSize: '0.85rem' }}>
        <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
          <tr>
            <th>Price</th>
            <th>Square</th>
            <th>Cross</th>
            <th>Angle</th>
            <th>Sub</th>
            <th>Ring</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
            row.isPriceMarker ? (
              <tr key="price-marker" className="table-warning fw-bold">
                <td>{row.price.toFixed(4)}</td>
                <td colSpan={5}>← current price</td>
              </tr>
            ) : (
              <tr key={`${row.source}-${row.square}-${i}`}>
                <td>{row.price.toFixed(4)}</td>
                <td>{row.square}</td>
                <td className={SOURCE_CLASSES[row.source]}>
                  {SOURCE_LABELS[row.source] || row.source}
                </td>
                <td>{row.degree === null ? '—' : `${row.degree}°`}</td>
                <td>
                  {row.kind === 'major'
                    ? 'major'
                    : `${row.subIndex}/8${row.isHalfway ? ' ½' : ''}`}
                </td>
                <td>{row.ring}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LevelLadderTable;
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/LevelLadderTable.js
git commit -m "feat: add a table for displaying level ladders"
```

---

## Task 6: Wire the ladder into the chart and page

**Files:**
- Modify: `components/GannSquareChart.js`
- Modify: `pages/gann-chart-test.js`

`GannSquareChart` already builds the grids, so it builds the ladders too and
reports them upward through a new `onLaddersChange` callback. This mirrors the
existing `onLevelsChange` pattern rather than inventing a second one, and
avoids the page rebuilding the same spiral.

The centre cross is obtained from `sunGrid` by locating the cell holding value
`1`, which is the grid centre. No extra grid is built.

- [ ] **Step 1: Add ladder construction to the chart component**

In `components/GannSquareChart.js`, extend the import at the top:

```js
import {
  buildGannSquare, findLevels, normalizeBodyDegree, MAX_CELLS,
  DEFAULT_ZERO_DEGREE_OFFSET,
} from '../utils/gannGrid';
import { buildLadder } from '../utils/gannLevels';
```

Add two props to the component signature, alongside `zeroDegreeOffset`:

```js
  zeroDegreeOffset = DEFAULT_ZERO_DEGREE_OFFSET,
  priceScale = 1,
  markCount = 8,
  onLevelsChange,
  onLaddersChange,
}) => {
```

Immediately after the existing `moonLevels` `useMemo` block, add:

```js
  // The centre cross sits on the cell holding value 1, which is the grid
  // centre. Reusing sunGrid avoids building a third identical spiral.
  const centreCross = useMemo(() => {
    if (!sunGrid.dimension) return null;
    const middle = Math.floor((sunGrid.dimension - 1) / 2);
    return { row: middle, col: middle };
  }, [sunGrid]);

  const ladders = useMemo(() => {
    if (sunGrid.tooLarge || !sunGrid.targetFound || !centreCross) return null;

    const result = {
      center: buildLadder({
        grid: sunGrid,
        crossCentre: centreCross,
        source: 'center',
        scale: priceScale,
        count: markCount,
      }),
      sun: sunGrid.bodyFound
        ? buildLadder({
            grid: sunGrid,
            crossCentre: sunGrid.bodyPosition,
            source: 'sun',
            scale: priceScale,
            count: markCount,
          })
        : [],
      moon: moonGrid && moonGrid.bodyFound
        ? buildLadder({
            grid: moonGrid,
            crossCentre: moonGrid.bodyPosition,
            source: 'moon',
            scale: priceScale,
            count: markCount,
          })
        : [],
    };
    return result;
  }, [sunGrid, moonGrid, centreCross, priceScale, markCount]);

  useEffect(() => {
    if (onLaddersChange) onLaddersChange(ladders);
  }, [ladders, onLaddersChange]);
```

- [ ] **Step 2: Verify the chart still builds and its tests pass**

Run: `npx jest && npm run build`
Expected: all tests PASS, `Compiled successfully`

- [ ] **Step 3: Commit the chart change**

```bash
git add components/GannSquareChart.js
git commit -m "feat: build and report level ladders from the chart"
```

- [ ] **Step 4: Add ladder state and controls to the page**

In `pages/gann-chart-test.js`, add the import:

```js
import LevelLadderTable from '../components/LevelLadderTable';
```

Add state alongside `multiplyBy10`:

```js
  const [ladders, setLadders] = useState(null);
  const [markCount, setMarkCount] = useState(8);
  const [showLadder, setShowLadder] = useState(false);
```

Add a control next to the existing `zeroDegreeOffset` input. Insert this block
immediately after the `col-md-3` div containing `zeroDegreeOffset`:

```jsx
              <div className="col-md-2">
                <label htmlFor="markCount" className="form-label mb-1 d-block">
                  Marks <span className="text-muted">(each way)</span>:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="markCount"
                  value={markCount}
                  min="1"
                  max="64"
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    setMarkCount(Number.isFinite(n) && n > 0 ? n : 8);
                  }}
                  style={{ maxWidth: '90px' }}
                />
              </div>
```

Pass the new props to the chart, extending the existing element:

```jsx
        <GannSquareChart
          targetNumber={targetNumber}
          sunPosition={sunDegree}
          moonPosition={moonDegree}
          showSun={showSun}
          showMoon={showMoon}
          cellSize={cellSize}
          highlightSpokes={highlightSpokes}
          zeroDegreeOffset={zeroDegreeOffset}
          priceScale={priceScale}
          markCount={markCount}
          onLevelsChange={setChartLevels}
          onLaddersChange={setLadders}
        />
```

Render the table below the chart, after the `GannSquareChart` element:

```jsx
        {ladders && (
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <strong>Level ladder</strong>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowLadder((v) => !v)}
                >
                  {showLadder ? 'Hide' : 'Show'}
                </button>
              </div>
              {showLadder && (
                <LevelLadderTable
                  ladders={[
                    ladders.center,
                    showSun ? ladders.sun : [],
                    showMoon ? ladders.moon : [],
                  ]}
                  price={levelsData ? levelsData.price : null}
                />
              )}
            </div>
          </div>
        )}
```

- [ ] **Step 5: Build and restart the server**

```bash
npm run build
```

Expected: `Compiled successfully`

- [ ] **Step 6: Verify in the browser**

Start the backend if it is not running:

```bash
cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Start the frontend and open `http://localhost:3000/gann-chart-test`.

Check each of these:
- Clicking **Show** reveals the ladder table.
- The current price row appears in the table, in the correct position — with
  levels above it having higher prices and levels below it lower.
- Levels appear from all three crosses: Centre, Sun, Moon.
- Unticking **Show Moon** removes the Moon rows; reticking restores them.
- Changing **Marks** from 8 to 3 shortens the table; the price row stays put.
- Unticking **Multiply price ×10** changes the Square column and the prices.
- The `Sub` column shows `major` for marks and `1/8` … `7/8` for sub-levels,
  with `½` beside the 4th.
- No errors appear in the browser console.

- [ ] **Step 7: Run the full suite once more**

Run: `npx jest`
Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add pages/gann-chart-test.js
git commit -m "feat: show the level ladder under the Gann chart"
```

---

## Out of scope

Per the spec, none of the following belong in this plan:

- Prediction, target-chain, or scoring logic. The doubling progression is
  recorded in the spec as a hypothesis; `isHalfway` and `subIndex` are
  metadata for Phase 3 to test, not rules to act on.
- Historical bars, breach detection, or event logging (Phase 2).
- Features or models (Phase 3).
- Persisting the price scale per ticker.
- Bodies beyond the Sun and Moon.
