# Gannzilla Math Parity: Roadmap + Plan 1 (Math Core)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Work out the math behind Gannzilla Pro from fair sources only, pin it down as tested pure functions, then grow GannSq9 to match its feature set.

**Architecture:** New pure-JS modules sit beside the existing `utils/gannGrid.js` engine without changing it. Every formula is locked by a test case taken from Gannzilla's public user guide. Desktop behaviour the guide does not show is settled by black-box runs (we type inputs into the app and record outputs), never by opening the program.

**Tech Stack:** Next.js, Jest 29 (`npm test`, tests in `utils/__tests__/*.test.js`), Python backend with pyswisseph (`cd backend && pytest tests`).

---

## Ground rules (read first)

- **Allowed sources:** the user guide (https://gannzilla.com/docs/), the Gannzilla Web page (https://gannzilla.com/web/, open JS, not covered by the reverse-engineering ban), and black-box runs of the desktop app.
- **Forbidden:** unpacking, decompiling or disassembling `Gannzilla.exe` or `swedll32.dll`. The Terms & Conditions ban this for the desktop program.
- **No copied code.** We write our own code from documented behaviour. Gannzilla Web's code is a reference for behaviour only.
- **Trust order:** desktop black-box result > user guide > Gannzilla Web. The web page is a lookalike rebuilt from screenshots. It differs from the guide in at least two places: aspect orbs (web 5–6°, desktop 1° except conjunction 5°) and cycle dates (web uses equal day counts, desktop follows the Sun's longitude).
- **Evidence files:** `notes/gannzilla_docs_extract.md` holds the guide's 27 worked examples (cited as `extract #N`). `notes/gannzilla_blackbox_findings.md` holds the desktop black-box results (cited as `black-box [NN]`, the screenshot number). Where they disagree, the black-box result wins: the extract's radix/transit columns are swapped.

## What already matches (verified 2026-10-15)

- Our spiral is the same as Gannzilla's clockwise Square of 9: 2 sits left of 1, and the odd squares run down the lower-left diagonal. A closed-form position formula matched `buildGannSquare`'s walk on all 6,241 cells of a 79×79 grid, and it puts 298 due west, 316 due north, 334 due east and 352 due south, as the guide shows.

## Gaps (Gannzilla has it, GannSq9 does not)

| Area | Gannzilla | GannSq9 today |
|---|---|---|
| Grid | Value (start) + Increment (step, may be negative), Clockwise toggle, Find, Size | Always starts at 1 with step 1, clockwise only |
| Price ↔ degree | `(price × mult ÷ div) mod 360`; planet → price `floor(price/360)·360 + lon` | Degree used as a square number with a 0° offset preset |
| Planets | Sun..Pluto, Ceres, Eris, Summary, Average, geo/helio | Sun and Moon only, geocentric |
| Aspects | 9 aspects, per-aspect orb (conj 5°, others 1°) | Sun–Moon same-square check only |
| Time | Chronometer, Tetragram/Pentagram/Hexagram cycles, moon phases + eclipses | None |
| Layouts | Square of 4, Circle of 12/24/36, Permanent, Tetragon–Octagon | Square of 9 only |
| Figures | Locator, polygons, Vectors (Fibonacci angles), Vortex | Crosses only |

## Roadmap (one plan per sub-project; each ships working, tested software)

1. **Math core** (this document, fully detailed below). Pure functions plus docs-derived tests. No UI change.
2. **Black-box session.** DONE 2026-10-15: see `notes/gannzilla_blackbox_findings.md` and screenshots in `notes/gannzilla_blackbox/`. It corrected three rules in this plan (Δ sign, Market ×/÷, Find rounds down) and pinned the time-zone, angle, Chronometer and layout rules.
3. **Ephemeris upgrade (backend).** Add Mercury..Pluto, Ceres, Eris and heliocentric mode to `backend/app/utils/ephemeris.py`. Check against the guide's planet table for 01.01.2000 and 30.06.1995, New York 00:00 (extract planet table). Gannzilla treats input time as the city's fixed standard offset with no daylight saving (New York = UTC−5 all year); offer that as a "Gannzilla compatible" time mode.
4. **Grid controls in the app.** Wire Value, Increment, Clockwise and Find into `components/GannSquareChart.js` and `pages/gann-chart-test.js`, using `spiralOffset`/`cellValue` from Plan 1. The existing regression baselines in `utils/__tests__/gannGrid.test.js` must not change.
5. **Time tools.** Sun-longitude solver for cycles (extract #19–21) and the annual Chronometer (extract #24), plus moon octant phases and eclipses (extract #22–23).
6. **Cosmogram + aspects + projections UI.** Planet wheel, price "$" point, Summary/Average, aspect lines, Inspector table.
7. **Other layouts and figures.** Layout rules are in the findings note: Square of 4 (2×2-core spiral), Circle of 12/24/36 (polar, cell 1 just above west, clockwise), Permanent square (column-major), Tetragon/Pentagon (ring k has N·k cells, ending at the west vertex). Hexagon–Octagon are assumed to follow the same rule; check before building. Vortex units are still unknown.
8. **Figures and radix/transit.** DONE 2026-10-15 (`2026-10-15-gannzilla-figures-inspector.md`): polygons, Vectors and Locator on the Square of 9 and the Cosmogram; radix inner wheel, Δ column and the 12×12 Inspector. Still open: the Vortex (Radius units), and black-box checks of the figure assumptions (highlight rule, Vectors Clockwise off, which Locator end is the angle, whether Cosmogram figures follow the wheel's Angle).

---

# Plan 1: Math Core

## File structure

- Create `utils/gannzillaGrid.js`: where cell *n* sits (`spiralOffset`), what it shows (`cellValue`), and which cell holds a value (`findCell`).
- Create `utils/gannzillaAstro.js`: angle helpers (`mod360`, `separation`, `delta`), price ↔ degree (`priceToDegree`, `longitudeToPrice`), planet totals (`summary`, `average`), and aspect detection (`DEFAULT_ASPECTS`, `findAspect`).
- Create `utils/__tests__/fixtures/gannzillaDocs.js`: the guide's worked examples as data.
- Create `utils/__tests__/gannzillaGrid.test.js` and `utils/__tests__/gannzillaAstro.test.js`.

Grid and astro math change for different reasons, so they live in separate files. Neither touches `utils/gannGrid.js`.

### Task 1: Docs fixtures

**Files:**
- Create: `utils/__tests__/fixtures/gannzillaDocs.js`

- [ ] **Step 1: Write the fixture file**

```js
/**
 * Worked examples from the Gannzilla user guide (https://gannzilla.com/docs/),
 * as extracted in notes/gannzilla_docs_extract.md. Comments cite "extract #N".
 * These are observed outputs of the real desktop app, so they are the ground
 * truth our functions must reproduce.
 */

// extract #9-10: Dow 11497.10 on 01.01.2000. Longitudes are the guide's
// Market column minus 31*360. `price` is the Market column value.
export const DOW_PRICE = 11497.1;
export const DOW_PLANETS = [
  { body: 'Sun', lon: 280.08, price: 11440.08 },
  { body: 'Moon', lon: 219.82, price: 11379.82 },
  { body: 'Mercury', lon: 271.44, price: 11431.44 },
  { body: 'Venus', lon: 241.22, price: 11401.22 },
  { body: 'Mars', lon: 327.75, price: 11487.75 },
  { body: 'Ceres', lon: 184.4, price: 11344.4 },
  { body: 'Jupiter', lon: 25.25, price: 11185.25 },
  { body: 'Saturn', lon: 40.41, price: 11200.41 },
  { body: 'Uranus', lon: 314.8, price: 11474.8 },
  { body: 'Neptune', lon: 303.19, price: 11463.19 },
  { body: 'Pluto', lon: 251.45, price: 11411.45 },
  { body: 'Eris', lon: 18.6, price: 11178.6 },
];
// extract #11-12
export const DOW_SUMMARY = { bodies: ['Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'], value: 291.4 };
export const DOW_AVERAGE = { value: 206.53 }; // all 12 bodies above

// extract planet table + #14 + #16, with radix/transit corrected by the
// black-box run (notes/gannzilla_blackbox_findings.md): radix 01.01.2000,
// transit 30.06.1995. delta = (radix - transit) mod 360; arc = shortest separation.
export const RADIX_TRANSIT = [
  { body: 'Sun', radix: 280, transit: 98, delta: 182, arc: 178 },
  { body: 'Moon', radix: 220, transit: 122, delta: 98, arc: 98 },
  { body: 'Mercury', radix: 271, transit: 76, delta: 195, arc: 165 },
  { body: 'Venus', radix: 241, transit: 84, delta: 157, arc: 157 },
  { body: 'Mars', radix: 328, transit: 168, delta: 160, arc: 160 },
  { body: 'Ceres', radix: 184, transit: 152, delta: 32, arc: 32 },
  { body: 'Jupiter', radix: 25, transit: 247, delta: 138, arc: 138 },
  { body: 'Saturn', radix: 40, transit: 355, delta: 45, arc: 45 },
  { body: 'Uranus', radix: 315, transit: 299, delta: 16, arc: 16 },
  { body: 'Neptune', radix: 303, transit: 295, delta: 8, arc: 8 },
  { body: 'Pluto', radix: 251, transit: 238, delta: 13, arc: 13 },
  { body: 'Eris', radix: 19, transit: 19, delta: 0, arc: 0 },
];
// black-box [04]: radix 15.10.2026 vs transit 01.01.2000, both New York 00:00.
export const RADIX_TRANSIT_2026 = [
  { body: 'Sun', radix: 202, transit: 280, delta: 282 },
  { body: 'Moon', radix: 254, transit: 220, delta: 34 },
  { body: 'Jupiter', radix: 142, transit: 25, delta: 117 },
];

// black-box [06]: Dow 11497.10 with multiplier 10 -> Market column.
export const DOW_MARKET_X10 = [
  { body: 'Sun', lon: 280.08, price: 11512.008 },
  { body: 'Jupiter', lon: 25.25, price: 11486.525 },
  { body: 'Eris', lon: 18.6, price: 11485.86 },
];

// extract #17-18: Inspector cells that show an aspect symbol.
export const INSPECTOR_ASPECTS = [
  { a: 220, b: 40, aspect: 'Opposition' }, // transit Moon vs transit Saturn
  { a: 355, b: 84, aspect: 'Square' }, // radix Saturn vs radix Venus, 89 deg
  { a: 247, b: 98, aspect: 'Quincunx' }, // radix Jupiter vs radix Sun, 149 deg
];
// extract #17-18: Inspector cells that show a plain number (no aspect).
export const INSPECTOR_PLAIN = [
  { a: 280, b: 271 }, // 9
  { a: 280, b: 241 }, // 39
  { a: 280, b: 328 }, // 48
  { a: 98, b: 76 }, // 22
];

// extract #3-5: cell n -> displayed value for a given Value/Increment.
export const CELL_VALUES = [
  { value: 9, increment: 1, cells: { 1: 9, 2: 10, 3: 11, 14: 22, 17: 25 } },
  {
    value: 1,
    increment: 3,
    cells: { 2: 4, 3: 7, 4: 10, 5: 13, 8: 22, 9: 25, 13: 37, 21: 61, 25: 73, 307: 919, 325: 973, 343: 1027, 361: 1081 },
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add utils/__tests__/fixtures/gannzillaDocs.js notes/gannzilla_docs_extract.md notes/gannzilla_blackbox_findings.md notes/gannzilla_blackbox
git commit -m "test: add Gannzilla user-guide and black-box worked examples as fixtures"
```

Note: `jest.config.js` matches `**/__tests__/**/*.test.js`, so a file in `fixtures/` without `.test.js` is not run as a test.

### Task 2: Spiral position

**Files:**
- Create: `utils/gannzillaGrid.js`
- Test: `utils/__tests__/gannzillaGrid.test.js`

- [ ] **Step 1: Write the failing tests**

```js
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

  test('rejects an index that is not a positive integer', () => {
    expect(() => spiralOffset(0)).toThrow(RangeError);
    expect(() => spiralOffset(2.5)).toThrow(RangeError);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: FAIL, "Cannot find module '../gannzillaGrid'".

- [ ] **Step 3: Write the implementation**

```js
/**
 * Gannzilla-compatible Square of 9 cell maths.
 *
 * Pure functions. Cell n is the 1-based spiral index (Gannzilla's "Show
 * numbers" value); what a cell displays is a separate question, answered by
 * cellValue(). Offsets are in cells from the centre, x to the right and y
 * down, matching screen and matrix order.
 */

/**
 * Where cell n sits relative to the centre.
 *
 * Ring k holds cells (2k-1)^2+1 .. (2k+1)^2. It starts one step left of the
 * previous ring's lower-left corner, climbs to the top-left corner, then runs
 * right, down and left. Anticlockwise is the left-right mirror image.
 *
 * @param {number} n - 1-based spiral index
 * @param {boolean} [clockwise]
 * @returns {{x:number, y:number}}
 */
export function spiralOffset(n, clockwise = true) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`cell index must be a positive integer, got ${n}`);
  }
  if (n === 1) return { x: 0, y: 0 };

  const k = Math.ceil((Math.sqrt(n) - 1) / 2);
  const topLeft = 4 * k * k - 2 * k + 1;
  const topRight = 4 * k * k + 1;
  const bottomRight = 4 * k * k + 2 * k + 1;

  let x;
  let y;
  if (n <= topLeft) {
    x = -k;
    y = -k + (topLeft - n);
  } else if (n <= topRight) {
    x = -k + (n - topLeft);
    y = -k;
  } else if (n <= bottomRight) {
    x = k;
    y = -k + (n - topRight);
  } else {
    x = k - (n - bottomRight);
    y = k;
  }
  // `|| 0` turns -0 into 0 so toEqual comparisons stay clean.
  return { x: (clockwise ? x : -x) || 0, y };
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add utils/gannzillaGrid.js utils/__tests__/gannzillaGrid.test.js
git commit -m "feat: closed-form Gannzilla spiral position with clockwise toggle"
```

### Task 3: Cell value and Find

**Files:**
- Modify: `utils/gannzillaGrid.js` (append)
- Modify: `utils/__tests__/gannzillaGrid.test.js` (append)

- [ ] **Step 1: Write the failing tests**

Change the first import line of `utils/__tests__/gannzillaGrid.test.js` to:

```js
import { spiralOffset, cellValue, findCell } from '../gannzillaGrid';
import { CELL_VALUES } from './fixtures/gannzillaDocs';
```

Append:

```js
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
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: FAIL, "cellValue is not a function".

- [ ] **Step 3: Write the implementation (append to `utils/gannzillaGrid.js`)**

```js
/**
 * The number cell n displays. Gannzilla's Value is the centre cell and
 * Increment is the step per cell; Increment may be negative.
 */
export function cellValue(n, { value = 1, increment = 1 } = {}) {
  return value + (n - 1) * increment;
}

/**
 * The cell Gannzilla's Find marks: the one with the largest value that does
 * not exceed `target` (black-box finding [02]: with Value 1, Increment 3,
 * Find 6.99 marks 4, not 7). Null when target is below the centre value.
 *
 * Positive increments only: negative-increment Find is untested.
 */
export function findCell(target, { value = 1, increment = 1 } = {}) {
  if (!(increment > 0)) return null;
  const raw = (target - value) / increment + 1;
  // Snap float noise (0.3 / 0.1 = 2.9999999999999996) before flooring.
  const snapped = Math.abs(raw - Math.round(raw)) < 1e-9 ? Math.round(raw) : raw;
  const n = Math.floor(snapped);
  return n < 1 ? null : n;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add utils/gannzillaGrid.js utils/__tests__/gannzillaGrid.test.js
git commit -m "feat: Gannzilla cell value (Value/Increment) and round-down Find"
```

### Task 4: Angles, price ↔ degree, Summary and Average

**Files:**
- Create: `utils/gannzillaAstro.js`
- Test: `utils/__tests__/gannzillaAstro.test.js`

- [ ] **Step 1: Write the failing tests**

```js
import {
  mod360, separation, delta, priceToDegree, longitudeToPrice, summary, average,
} from '../gannzillaAstro';
import {
  DOW_PRICE, DOW_PLANETS, DOW_SUMMARY, DOW_AVERAGE, RADIX_TRANSIT, RADIX_TRANSIT_2026, DOW_MARKET_X10,
} from './fixtures/gannzillaDocs';

describe('angle helpers', () => {
  test('mod360 wraps into [0, 360)', () => {
    expect(mod360(370)).toBe(10);
    expect(mod360(-10)).toBe(350);
    expect(mod360(360)).toBe(0);
  });

  RADIX_TRANSIT.forEach(({ body, radix, transit, delta: d, arc }) => {
    test(`${body}: delta ${d} and shortest arc ${arc} match the guide`, () => {
      expect(delta(radix, transit)).toBe(d);
      expect(separation(radix, transit)).toBe(arc);
    });
  });

  RADIX_TRANSIT_2026.forEach(({ body, radix, transit, delta: d }) => {
    test(`${body}: delta is radix minus transit (black-box [04])`, () => {
      expect(delta(radix, transit)).toBe(d);
    });
  });
});

describe('priceToDegree = (price x mult / div) mod 360 (extract #8)', () => {
  test('gold 384.15 -> 24 degrees', () => {
    expect(priceToDegree(384.15)).toBeCloseTo(24.15, 6);
  });
  test('x2 multiplier -> 48 degrees', () => {
    expect(priceToDegree(384.15, { multiplier: 2 })).toBeCloseTo(48.3, 6);
  });
  test('divisor applies too', () => {
    expect(priceToDegree(800, { divisor: 2 })).toBeCloseTo(40, 6);
  });
});

describe('longitudeToPrice = floor(price/360)*360 + lon (extract #9-10)', () => {
  DOW_PLANETS.forEach(({ body, lon, price }) => {
    test(`${body} at ${lon} -> ${price}`, () => {
      expect(longitudeToPrice(lon, DOW_PRICE)).toBeCloseTo(price, 6);
    });
  });
  test('uses floor, not the nearest multiple of 360 (Jupiter)', () => {
    expect(longitudeToPrice(25.25, DOW_PRICE)).toBeCloseTo(11185.25, 6);
  });

  DOW_MARKET_X10.forEach(({ body, lon, price }) => {
    test(`${body} with multiplier 10 -> ${price} (black-box [06])`, () => {
      expect(longitudeToPrice(lon, DOW_PRICE, { multiplier: 10 })).toBeCloseTo(price, 6);
    });
  });
});

describe('Summary and Average (extract #11-12)', () => {
  const lonOf = (name) => DOW_PLANETS.find((p) => p.body === name).lon;
  test('Summary = sum of chosen longitudes mod 360', () => {
    expect(summary(DOW_SUMMARY.bodies.map(lonOf))).toBeCloseTo(DOW_SUMMARY.value, 2);
  });
  test('Average = plain arithmetic mean, not a circular mean', () => {
    expect(average(DOW_PLANETS.map((p) => p.lon))).toBeCloseTo(DOW_AVERAGE.value, 2);
  });
  test('Average of an empty list is null', () => {
    expect(average([])).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest utils/__tests__/gannzillaAstro.test.js`
Expected: FAIL, "Cannot find module '../gannzillaAstro'".

- [ ] **Step 3: Write the implementation**

```js
/**
 * Gannzilla-compatible price/planet maths.
 *
 * Every formula here is pinned by a worked example from the Gannzilla user
 * guide; see utils/__tests__/fixtures/gannzillaDocs.js.
 */

/** Wrap any angle into [0, 360). */
export function mod360(deg) {
  return ((deg % 360) + 360) % 360;
}

/** Shortest arc between two longitudes, 0..180 (the Inspector's number). */
export function separation(a, b) {
  const d = mod360(a - b);
  return d > 180 ? 360 - d : d;
}

/** Radix minus transit, 0..360 (the planet table's delta column). */
export function delta(radix, transit) {
  return mod360(radix - transit);
}

/** A price as a degree on the wheel: (price x multiplier / divisor) mod 360. */
export function priceToDegree(price, { multiplier = 1, divisor = 1 } = {}) {
  return mod360((price * multiplier) / divisor);
}

/**
 * A longitude as a price in the same 360-block as `price` (the Market
 * column). Gannzilla scales the price first, uses floor(scaled/360) - not
 * the nearest block - then scales the level back (black-box [05], [06]).
 */
export function longitudeToPrice(longitude, price, { multiplier = 1, divisor = 1 } = {}) {
  const scaled = (price * multiplier) / divisor;
  return ((Math.floor(scaled / 360) * 360 + mod360(longitude)) * divisor) / multiplier;
}

/** Gannzilla "Summary": the sum of the chosen longitudes, mod 360. */
export function summary(longitudes) {
  return mod360(longitudes.reduce((s, x) => s + x, 0));
}

/**
 * Gannzilla "Average": the plain arithmetic mean of 0..360 longitudes.
 * Deliberately not a circular mean; that is what the app shows.
 */
export function average(longitudes) {
  if (longitudes.length === 0) return null;
  return longitudes.reduce((s, x) => s + x, 0) / longitudes.length;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest utils/__tests__/gannzillaAstro.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add utils/gannzillaAstro.js utils/__tests__/gannzillaAstro.test.js
git commit -m "feat: Gannzilla price/degree, planet-to-price, Summary and Average"
```

### Task 5: Aspects

**Files:**
- Modify: `utils/gannzillaAstro.js` (append)
- Modify: `utils/__tests__/gannzillaAstro.test.js` (append)

- [ ] **Step 1: Write the failing tests**

Add `DEFAULT_ASPECTS, findAspect` to the import from `'../gannzillaAstro'`, and `INSPECTOR_ASPECTS, INSPECTOR_PLAIN` to the fixtures import. Append:

```js
describe('findAspect with the desktop defaults (extract aspects table, #17-18)', () => {
  test('has the nine desktop aspects', () => {
    expect(DEFAULT_ASPECTS.map((a) => a.angle)).toEqual([0, 30, 45, 60, 90, 120, 135, 150, 180]);
  });

  INSPECTOR_ASPECTS.forEach(({ a, b, aspect }) => {
    test(`${a} vs ${b} is a ${aspect}`, () => {
      expect(findAspect(a, b).name).toBe(aspect);
    });
  });

  INSPECTOR_PLAIN.forEach(({ a, b }) => {
    test(`${a} vs ${b} is no aspect`, () => {
      expect(findAspect(a, b)).toBeNull();
    });
  });

  test('the orb edge counts (89 deg is a square with a 1 deg orb)', () => {
    expect(findAspect(0, 89).name).toBe('Square');
    expect(findAspect(0, 88.9)).toBeNull();
  });

  test('conjunction has a 5 deg orb, wrapping through 0', () => {
    expect(findAspect(358, 3).name).toBe('Conjunction');
  });

  test('accepts a custom aspect table', () => {
    const only = [{ name: 'Trine', angle: 120, orb: 8 }];
    expect(findAspect(0, 113, only).name).toBe('Trine');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx jest utils/__tests__/gannzillaAstro.test.js`
Expected: FAIL, "findAspect is not a function".

- [ ] **Step 3: Write the implementation (append to `utils/gannzillaAstro.js`)**

```js
/**
 * Gannzilla desktop default aspects. Conjunction 5 deg orb, the rest 1 deg.
 * (Gannzilla Web uses 5-6 deg orbs and only five aspects; the desktop guide
 * wins.)
 */
export const DEFAULT_ASPECTS = [
  { name: 'Conjunction', angle: 0, orb: 5 },
  { name: 'Semisextile', angle: 30, orb: 1 },
  { name: 'Semisquare', angle: 45, orb: 1 },
  { name: 'Sextile', angle: 60, orb: 1 },
  { name: 'Square', angle: 90, orb: 1 },
  { name: 'Trine', angle: 120, orb: 1 },
  { name: 'Sesquisquare', angle: 135, orb: 1 },
  { name: 'Quincunx', angle: 150, orb: 1 },
  { name: 'Opposition', angle: 180, orb: 1 },
];

/**
 * The aspect two longitudes form, or null. The orb edge counts: the guide
 * shows 89 deg as a Square under a 1 deg orb. A tiny epsilon absorbs float
 * noise at the edge.
 */
export function findAspect(a, b, aspects = DEFAULT_ASPECTS) {
  const sep = separation(a, b);
  return aspects.find((asp) => Math.abs(sep - asp.angle) <= asp.orb + 1e-9) || null;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx jest utils/__tests__/gannzillaAstro.test.js`
Expected: PASS.

- [ ] **Step 5: Run the whole suite (existing baselines must not move)**

Run: `npm test`
Expected: PASS, including `gannGrid.test.js`, `gannLevels.test.js` and `gannView.test.js` unchanged.

- [ ] **Step 6: Commit**

```bash
git add utils/gannzillaAstro.js utils/__tests__/gannzillaAstro.test.js
git commit -m "feat: Gannzilla desktop aspect table and detection"
```

## Done when

- `npm test` passes, with the three existing Gann test files unchanged.
- Every worked example in `notes/gannzilla_docs_extract.md` sections "Grid layout", "Price ↔ degree", "Planet → price", "Summary and Average", "Planet table" and "Inspector" has a passing test.
- `notes/gannzilla_docs_extract.md`, `notes/gannzilla_blackbox_findings.md` and `notes/gannzilla_blackbox/` are committed with Task 1.
