# Gann Chart Zoom + Moon Levels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add pan/zoom navigation to the Gann Square of 9 grid, and render a second independent set of levels driven by the Moon's position alongside the existing Sun levels.

**Architecture:** Level-finding logic moves out of the React component into pure functions in `utils/gannGrid.js`, so it can run twice (Sun and Moon) and be unit tested. Zoom maths moves into `utils/gannView.js` for the same reason. The canvas stops being allocated at full grid size and becomes viewport-sized with a pan/zoom transform plus cell culling. On the backend, the ephemeris helper is generalised to any body, gains a UTC correctness fix, and exposes a new `/api/celestial` endpoint returning Sun and Moon together.

**Tech Stack:** Next.js 12.3.4, React 18.3.1, Canvas 2D, Jest (added by Task 1), FastAPI, pyswisseph, pytest 9.

**Spec:** `docs/superpowers/specs/2026-08-25-gann-zoom-and-moon-levels-design.md`

**Ordering note:** The spec lists the zero-degree fix as part of step 1. This plan does the `gannGrid.js` extraction first (Task 3), then the zero-degree fix (Task 4), because the fix is only unit-testable once the logic is out of the component closure.

---

## File Structure

**Created:**
- `jest.config.js` — Jest configuration scoped to `__tests__` directories
- `utils/gannGrid.js` — pure spiral-building and level-finding functions
- `utils/__tests__/gannGrid.test.js` — regression + edge case tests
- `utils/gannView.js` — pure pan/zoom/culling maths
- `utils/__tests__/gannView.test.js` — zoom maths tests
- `backend/tests/test_ephemeris.py` — ephemeris UTC and body tests
- `backend/tests/test_celestial_endpoint.py` — endpoint tests

**Modified:**
- `backend/app/utils/ephemeris.py` — generalise to any body, fix UTC handling
- `backend/app/utils/levels_calculator.py` — pass ET-aware datetimes, return moon
- `backend/app/api/endpoints.py` — `/api/celestial`, `datetime` param
- `components/GannSquareChart.js` — viewport canvas, zoom, Moon rendering
- `pages/gann-chart-test.js` — date+time input, Sun/Moon toggles, polling
- `utils/api.js` — `getCelestial()`, `datetime` support
- `package.json` — jest devDependency and `test` script

---

## Task 1: Add a frontend test runner

There is currently no working frontend test runner. `test/indicators.test.js` exists but Jest is not installed and there is no `test` script, so it has never run. Tasks 3, 4 and 9 need one.

**Files:**
- Create: `jest.config.js`
- Modify: `package.json`

- [ ] **Step 1: Install Jest**

```bash
npm install --save-dev jest@29.7.0
```

- [ ] **Step 2: Create `jest.config.js`**

`next/jest` wires up the project's existing Babel config automatically. `testMatch` is deliberately scoped to `__tests__` directories so the legacy, never-run `test/indicators.test.js` is not swept in and does not fail the suite.

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
});
```

- [ ] **Step 3: Add the test script to `package.json`**

In the `"scripts"` block, add `"test": "jest"` after `"lint"`:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
```

- [ ] **Step 4: Create a placeholder test to prove the runner works**

Create `utils/__tests__/setup.test.js`:

```js
describe('jest setup', () => {
  test('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 6: Delete the placeholder and commit**

```bash
rm utils/__tests__/setup.test.js
git add package.json package-lock.json jest.config.js
git commit -m "chore: add jest test runner for frontend unit tests

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: Fix the ephemeris UTC bug

`calculate_sun_position()` calls `datetime.datetime.now()` (naive local time) and passes it to `swe.calc_ut()`, which expects Universal Time. On a UTC-6 machine this was measured to put the Moon 3.07 degrees out of position.

**Files:**
- Modify: `backend/app/utils/ephemeris.py`
- Test: `backend/tests/test_ephemeris.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_ephemeris.py`:

```python
"""
Tests for the ephemeris utility.
"""

import sys
import os
import unittest
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.utils.ephemeris import calculate_sun_position


class TestEphemerisUTC(unittest.TestCase):
    """The ephemeris must treat its input as UTC, not local time."""

    REFERENCE = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
    EXPECTED_SUN_LONGITUDE = 281.07802

    def test_sun_longitude_at_known_utc_instant(self):
        result = calculate_sun_position(self.REFERENCE)
        self.assertAlmostEqual(
            result["angle"], self.EXPECTED_SUN_LONGITUDE, places=2
        )

    def test_equivalent_instant_in_another_zone_gives_same_longitude(self):
        """13:00 at UTC+1 is the same instant as 12:00 UTC."""
        other_zone = datetime(
            2026, 1, 1, 13, 0, 0, tzinfo=timezone(timedelta(hours=1))
        )
        self.assertAlmostEqual(
            calculate_sun_position(other_zone)["angle"],
            calculate_sun_position(self.REFERENCE)["angle"],
            places=6,
        )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `cd backend && python -m pytest tests/test_ephemeris.py -v`
Expected: `test_equivalent_instant_in_another_zone_gives_same_longitude` FAILS — the current code reads `.hour` off the datetime without converting, so 13:00+01:00 is treated as 13:00 UT.

- [ ] **Step 3: Add UTC normalisation to `ephemeris.py`**

Add this helper immediately after the `initialize_ephemeris` function:

```python
def _to_utc(when: datetime.datetime = None) -> datetime.datetime:
    """
    Normalise a datetime to UTC for the ephemeris.

    swisseph's calc_ut() expects Universal Time. Passing local time silently
    shifts every body's position by the UTC offset.

    Args:
        when: Timezone-aware datetime, or naive (interpreted as UTC), or None
              for the current instant.

    Returns:
        A timezone-aware datetime in UTC.
    """
    if when is None:
        return datetime.datetime.now(datetime.timezone.utc)
    if when.tzinfo is None:
        # Naive input is interpreted as UTC by contract.
        return when.replace(tzinfo=datetime.timezone.utc)
    return when.astimezone(datetime.timezone.utc)
```

- [ ] **Step 4: Use it in `calculate_sun_position`**

Replace the date-defaulting and Julian-day block at the top of `calculate_sun_position` — that is, replace these lines:

```python
    # Use current date and time if not provided
    if date is None:
        date = datetime.datetime.now()
    
    # Convert date to Julian day
    jd = swe.julday(
        date.year,
        date.month,
        date.day,
        date.hour + date.minute / 60.0 + date.second / 3600.0
    )
```

with:

```python
    # Normalise to UTC - calc_ut() below expects Universal Time
    date = _to_utc(date)

    # Convert date to Julian day
    jd = swe.julday(
        date.year,
        date.month,
        date.day,
        date.hour + date.minute / 60.0 + date.second / 3600.0
    )
```

- [ ] **Step 5: Run the tests**

Run: `cd backend && python -m pytest tests/test_ephemeris.py -v`
Expected: PASS, 2 tests.

- [ ] **Step 6: Confirm nothing else regressed**

Run: `cd backend && python -m pytest tests/ -v`
Expected: PASS, all tests.

- [ ] **Step 7: Commit**

```bash
git add backend/app/utils/ephemeris.py backend/tests/test_ephemeris.py
git commit -m "fix: convert ephemeris input to UTC before calc_ut

Local time was passed where Universal Time was expected, putting the
Moon 3.07 degrees out of position on a UTC-6 machine.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Extract grid and level logic into `utils/gannGrid.js`

The spiral build and level search currently live in a closure inside a `useEffect` in `components/GannSquareChart.js` (around lines 40-353). Task 6 must run the level search twice — once per body — so it has to come out.

The four expected values below were captured from the running application and independently re-verified, so they are a true regression baseline.

**Files:**
- Create: `utils/gannGrid.js`
- Test: `utils/__tests__/gannGrid.test.js`

- [ ] **Step 1: Write the failing regression test**

Create `utils/__tests__/gannGrid.test.js`:

```js
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- gannGrid`
Expected: FAIL — `Cannot find module '../gannGrid'`.

- [ ] **Step 3: Create `utils/gannGrid.js`**

```js
/**
 * Gann Square of 9 grid construction and level finding.
 *
 * Pure functions, no React. Extracted from GannSquareChart so the level
 * search can run once per celestial body and be unit tested.
 */

/** Grids larger than this are refused rather than freezing the browser tab. */
export const MAX_CELLS = 4000000;

/**
 * Number of spiral rings needed to contain a value, plus headroom.
 */
function ringsFor(value) {
  return Math.max(Math.ceil(Math.sqrt(value) / 2) + 3, 4);
}

/**
 * Build the spiral matrix for a given ring count.
 * Records the traversal order, which is what level finding walks.
 */
function buildWithRings(rings, target, body) {
  const dimension = 2 * rings + 1;
  const matrix = Array.from({ length: dimension }, () => Array(dimension).fill(null));
  const center = Math.floor((dimension - 1) / 2);

  let row = center;
  let col = center;
  let currentVal = 2;
  let ring = 1;

  let targetPosition = { row: -1, col: -1 };
  let bodyPosition = { row: -1, col: -1 };

  matrix[row][col] = 1;
  if (target === 1) targetPosition = { row, col };
  if (body === 1) bodyPosition = { row, col };

  const positionSequence = [{ row: center, col: center, value: 1 }];

  function move(direction, steps) {
    for (let s = 0; s < steps; s++) {
      if (currentVal > dimension * dimension) return;
      if (direction === 'left') col--;
      else if (direction === 'up') row--;
      else if (direction === 'right') col++;
      else row++;

      matrix[row][col] = currentVal;
      positionSequence.push({ row, col, value: currentVal });
      if (currentVal === target) targetPosition = { row, col };
      if (currentVal === body) bodyPosition = { row, col };
      currentVal++;
    }
  }

  while (currentVal <= dimension * dimension && ring <= rings) {
    move('left', 1);
    if (currentVal > dimension * dimension) break;
    move('up', 2 * ring - 1);
    if (currentVal > dimension * dimension) break;
    move('right', 2 * ring);
    if (currentVal > dimension * dimension) break;
    move('down', 2 * ring);
    if (currentVal > dimension * dimension) break;
    move('left', 2 * ring);
    if (currentVal > dimension * dimension) break;
    ring++;
  }

  return { matrix, dimension, targetPosition, bodyPosition, positionSequence };
}

/**
 * Build a Gann Square of 9 containing both the target number and the body's
 * degree square, expanding the grid if either is missing.
 *
 * @param {number} target - the price-derived square to centre the analysis on
 * @param {number} body - the celestial body's degree, used as a square number
 * @param {number} [minRings] - optional lower bound on ring count
 * @returns {{matrix, dimension, targetPosition, bodyPosition, positionSequence,
 *            targetFound, bodyFound, tooLarge}}
 */
export function buildGannSquare(target, body, minRings = 4) {
  const rings = Math.max(ringsFor(Math.max(target, body)), minRings);
  const dimension = 2 * rings + 1;

  if (dimension * dimension > MAX_CELLS) {
    return {
      matrix: [],
      dimension: 0,
      targetPosition: { row: -1, col: -1 },
      bodyPosition: { row: -1, col: -1 },
      positionSequence: [],
      targetFound: false,
      bodyFound: false,
      tooLarge: true,
    };
  }

  const result = buildWithRings(rings, target, body);

  return {
    ...result,
    targetFound: result.targetPosition.row !== -1,
    bodyFound: result.bodyPosition.row !== -1,
    tooLarge: false,
  };
}

/**
 * True when a cell shares a row, column, or either diagonal with the body's
 * square - i.e. it lies on the body's eight-direction cross.
 */
function isOnBodyCross(row, col, bodyPosition) {
  const { row: bodyRow, col: bodyCol } = bodyPosition;
  return (
    row === bodyRow ||
    col === bodyCol ||
    row - bodyRow === col - bodyCol ||
    row - bodyRow === -(col - bodyCol)
  );
}

/**
 * Walk the spiral outward and inward from the target square, collecting the
 * squares that fall on the body's cross.
 *
 * @param {object} grid - the value returned by buildGannSquare
 * @param {number} [count] - how many levels to collect in each direction
 * @returns {{up: Array<{row,col,value}>, down: Array<{row,col,value}>}}
 */
export function findLevels(grid, count = 3) {
  const { positionSequence, targetPosition, bodyPosition, targetFound, bodyFound } = grid;
  const up = [];
  const down = [];

  if (!targetFound || !bodyFound) return { up, down };

  const targetIndex = positionSequence.findIndex(
    (p) => p.row === targetPosition.row && p.col === targetPosition.col
  );
  if (targetIndex === -1) return { up, down };

  for (let i = targetIndex + 1; i < positionSequence.length && up.length < count; i++) {
    const cell = positionSequence[i];
    if (isOnBodyCross(cell.row, cell.col, bodyPosition)) up.push(cell);
  }

  for (let i = targetIndex - 1; i >= 0 && down.length < count; i--) {
    const cell = positionSequence[i];
    if (isOnBodyCross(cell.row, cell.col, bodyPosition)) down.push(cell);
  }

  return { up, down };
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- gannGrid`
Expected: PASS, 6 tests. All four baselines must match exactly. If any differ, stop — the extraction changed behaviour.

- [ ] **Step 5: Commit**

```bash
git add utils/gannGrid.js utils/__tests__/gannGrid.test.js
git commit -m "refactor: extract Gann grid and level finding into pure functions

Regression-tested against four baselines captured from the running app.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: Fix the zero-degree bug

`buildGannSquare` in the component guards inputs with `parseInt(sun) || 71`. Zero is falsy in JavaScript, so a body at 0.4 degrees rounds to `0` and silently becomes square **71**. The Moon crosses 0 degrees every ~27 days.

**Files:**
- Modify: `utils/gannGrid.js`
- Test: `utils/__tests__/gannGrid.test.js`

- [ ] **Step 1: Write the failing test**

Append to `utils/__tests__/gannGrid.test.js`:

```js
import { normalizeBodyDegree } from '../gannGrid';

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

describe('a second body produces its own levels', () => {
  test('Moon at a different degree gives different levels from the Sun', () => {
    const target = 3099;
    const sun = findLevels(buildGannSquare(target, 152), 3);
    const moon = findLevels(buildGannSquare(target, 310), 3);

    expect(sun.up.map((l) => l.value)).toEqual([3115, 3144, 3166]);
    expect(moon.up.length).toBe(3);
    expect(moon.down.length).toBe(3);
    expect(moon.up.map((l) => l.value)).not.toEqual(sun.up.map((l) => l.value));
  });

  test('the same degree for both bodies gives identical levels', () => {
    const sun = findLevels(buildGannSquare(3099, 152), 3);
    const moon = findLevels(buildGannSquare(3099, 152), 3);
    expect(moon.up.map((l) => l.value)).toEqual(sun.up.map((l) => l.value));
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- gannGrid`
Expected: FAIL — `normalizeBodyDegree is not a function`.

- [ ] **Step 3: Add the function to `utils/gannGrid.js`**

Add near the top, after the `MAX_CELLS` export:

```js
/**
 * Convert a raw body longitude into a valid square number in 1..360.
 *
 * The spiral has no square 0, and `deg || fallback` would silently turn a
 * legitimate 0 degrees into the fallback. 0 and 360 are the same point on a
 * circle, so 0 maps to 360, which is a real square.
 *
 * @param {number} degree - longitude in degrees
 * @param {number} [fallback] - used only when degree is not a finite number
 * @returns {number} an integer in 1..360
 */
export function normalizeBodyDegree(degree, fallback = 71) {
  if (!Number.isFinite(degree)) return fallback;
  const wrapped = ((Math.round(degree) % 360) + 360) % 360;
  return wrapped === 0 ? 360 : wrapped;
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- gannGrid`
Expected: PASS, 14 tests. The four baselines from Task 3 must still pass.

- [ ] **Step 5: Commit**

```bash
git add utils/gannGrid.js utils/__tests__/gannGrid.test.js
git commit -m "fix: stop a body at 0 degrees collapsing to square 71

Zero is falsy, so the old parseInt(x) || 71 guard silently replaced a
legitimate 0-degree position. Affects the Moon roughly monthly.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: Generalise the ephemeris to any body and add the Moon

**Files:**
- Modify: `backend/app/utils/ephemeris.py`
- Test: `backend/tests/test_ephemeris.py`

- [ ] **Step 1: Write the failing test**

Append to `backend/tests/test_ephemeris.py`, above the `if __name__` block:

```python
from app.utils.ephemeris import calculate_body_position, calculate_moon_position
import swisseph as swe


class TestBodyPosition(unittest.TestCase):
    """Both bodies must be computable from the same generalised helper."""

    REFERENCE = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
    EXPECTED_SUN = 281.07802
    EXPECTED_MOON = 74.225405

    def test_sun_via_generic_helper(self):
        result = calculate_body_position(swe.SUN, self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_SUN, places=2)

    def test_moon_via_generic_helper(self):
        result = calculate_body_position(swe.MOON, self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_MOON, places=2)

    def test_moon_convenience_wrapper(self):
        result = calculate_moon_position(self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_MOON, places=2)

    def test_moon_result_has_the_same_shape_as_sun(self):
        moon = calculate_moon_position(self.REFERENCE)
        for key in ("angle", "longitude", "zodiac_sign", "degrees_in_sign",
                    "julian_day", "date"):
            self.assertIn(key, moon)

    def test_moon_zodiac_sign_is_correct_for_the_reference_instant(self):
        self.assertEqual(calculate_moon_position(self.REFERENCE)["zodiac_sign"], "Gemini")
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd backend && python -m pytest tests/test_ephemeris.py -v`
Expected: FAIL — `ImportError: cannot import name 'calculate_body_position'`.

- [ ] **Step 3: Rewrite `calculate_sun_position` as a thin wrapper over a generic helper**

In `backend/app/utils/ephemeris.py`, replace the whole body of `calculate_sun_position` with a generic function plus two wrappers. Keep `_to_utc` from Task 2 above them.

```python
def calculate_body_position(body: int, when: datetime.datetime = None) -> Dict[str, Any]:
    """
    Calculate a celestial body's position in the tropical zodiac.

    Args:
        body: A swisseph body constant, e.g. swe.SUN or swe.MOON
        when: Timezone-aware datetime, naive (treated as UTC), or None for now

    Returns:
        dict: position data - angle, longitude, zodiac_sign, degrees_in_sign,
              julian_day, date
    """
    initialize_ephemeris()

    when = _to_utc(when)

    jd = swe.julday(
        when.year,
        when.month,
        when.day,
        when.hour + when.minute / 60.0 + when.second / 3600.0
    )

    flags = swe.FLG_SWIEPH | swe.FLG_SPEED
    result, _ = swe.calc_ut(jd, body, flags)

    longitude = result[0] % 360
    zodiac_index = int(longitude / 30)
    degrees_in_sign = longitude % 30

    zodiac_names = [
        "Aries", "Taurus", "Gemini", "Cancer",
        "Leo", "Virgo", "Libra", "Scorpio",
        "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ]

    return {
        "date": when.strftime("%Y-%m-%d %H:%M:%S"),
        "julian_day": jd,
        "longitude": longitude,
        "zodiac_sign": zodiac_names[zodiac_index],
        "degrees_in_sign": degrees_in_sign,
        "angle": longitude,
    }


def calculate_sun_position(date: datetime.datetime = None) -> Dict[str, Any]:
    """Calculate the Sun's position. See calculate_body_position."""
    return calculate_body_position(swe.SUN, date)


def calculate_moon_position(when: datetime.datetime = None) -> Dict[str, Any]:
    """Calculate the Moon's position. See calculate_body_position."""
    return calculate_body_position(swe.MOON, when)
```

- [ ] **Step 4: Run the tests**

Run: `cd backend && python -m pytest tests/test_ephemeris.py -v`
Expected: PASS, 7 tests. The Task 2 UTC tests must still pass.

- [ ] **Step 5: Commit**

```bash
git add backend/app/utils/ephemeris.py backend/tests/test_ephemeris.py
git commit -m "feat: generalise ephemeris to any body and add Moon position

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Add ET-to-UTC conversion and the `/api/celestial` endpoint

**Files:**
- Modify: `backend/app/api/endpoints.py`
- Test: `backend/tests/test_celestial_endpoint.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_celestial_endpoint.py`:

```python
"""
Tests for the /api/celestial endpoint and ET datetime parsing.
"""

import sys
import os
import unittest
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app
from app.api.endpoints import parse_et_datetime

client = TestClient(app)


class TestParseEtDatetime(unittest.TestCase):
    """ET input must convert to the correct UTC instant on both sides of DST."""

    def test_summer_date_uses_edt_offset(self):
        result = parse_et_datetime("2026-07-15T16:00")
        self.assertEqual(result.astimezone(timezone.utc).hour, 20)

    def test_winter_date_uses_est_offset(self):
        result = parse_et_datetime("2026-01-15T16:00")
        self.assertEqual(result.astimezone(timezone.utc).hour, 21)

    def test_offsets_differ_across_the_dst_boundary(self):
        summer = parse_et_datetime("2026-07-15T16:00").utcoffset()
        winter = parse_et_datetime("2026-01-15T16:00").utcoffset()
        self.assertNotEqual(summer, winter)

    def test_explicit_offset_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_et_datetime("2026-07-15T16:00+05:30")

    def test_garbage_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_et_datetime("not-a-datetime")


class TestCelestialEndpoint(unittest.TestCase):

    def test_returns_both_bodies(self):
        response = client.get("/api/celestial")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn("sun", body)
        self.assertIn("moon", body)
        self.assertIn("angle", body["sun"])
        self.assertIn("angle", body["moon"])

    def test_echoes_both_timezones(self):
        response = client.get("/api/celestial", params={"datetime": "2026-01-01T07:00"})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn("datetime_et", body)
        self.assertIn("datetime_utc", body)

    def test_known_instant_matches_reference_longitudes(self):
        """2026-01-01 07:00 ET is 12:00 UTC (EST, UTC-5)."""
        response = client.get("/api/celestial", params={"datetime": "2026-01-01T07:00"})
        body = response.json()
        self.assertAlmostEqual(body["sun"]["angle"], 281.07802, places=2)
        self.assertAlmostEqual(body["moon"]["angle"], 74.225405, places=2)

    def test_bad_datetime_returns_400(self):
        response = client.get("/api/celestial", params={"datetime": "nonsense"})
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd backend && python -m pytest tests/test_celestial_endpoint.py -v`
Expected: FAIL — `ImportError: cannot import name 'parse_et_datetime'`.

- [ ] **Step 3: Add the parser and endpoint**

In `backend/app/api/endpoints.py`, add to the imports at the top:

```python
from datetime import datetime
from zoneinfo import ZoneInfo
import swisseph as swe
```

and extend the existing ephemeris import line to:

```python
from ..utils.ephemeris import (
    get_current_sun_angle,
    calculate_sun_position,
    calculate_moon_position,
)
```

Then add this above the `/sun` endpoint:

```python
EASTERN = ZoneInfo("America/New_York")
UTC = ZoneInfo("UTC")


def parse_et_datetime(value: str) -> datetime:
    """
    Parse a 'YYYY-MM-DDTHH:mm' string as US Eastern time.

    Eastern is used because it is the session the closing prices belong to.
    An explicit offset is rejected rather than silently reinterpreted, so a
    caller can never believe they sent one timezone and get another.

    Args:
        value: datetime string with no offset suffix

    Returns:
        A timezone-aware datetime in US Eastern.

    Raises:
        ValueError: if the string is malformed or carries an offset.
    """
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError:
        raise ValueError(
            f"Invalid datetime '{value}'. Expected format YYYY-MM-DDTHH:mm."
        )

    if parsed.tzinfo is not None:
        raise ValueError(
            "Do not supply a UTC offset. Times are always interpreted as US Eastern."
        )

    return parsed.replace(tzinfo=EASTERN)


@router.get("/celestial")
async def get_celestial_positions(
    datetime_et: Optional[str] = Query(
        None,
        alias="datetime",
        description="Optional 'YYYY-MM-DDTHH:mm' in US Eastern. Defaults to now.",
    )
):
    """Get Sun and Moon positions for an instant, defaulting to now."""
    try:
        when = parse_et_datetime(datetime_et) if datetime_et else datetime.now(EASTERN)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        return {
            "datetime_et": when.strftime("%Y-%m-%d %H:%M:%S"),
            "datetime_utc": when.astimezone(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "sun": calculate_sun_position(when),
            "moon": calculate_moon_position(when),
        }
    except Exception as e:
        logger.error(f"Error computing celestial positions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
```

- [ ] **Step 4: Run the tests**

Run: `cd backend && python -m pytest tests/test_celestial_endpoint.py -v`
Expected: PASS, 9 tests.

If `TestClient` raises an import error, install the test dependency:
`pip install httpx` (already listed in `backend/requirements.txt`).

- [ ] **Step 5: Confirm the whole backend suite passes**

Run: `cd backend && python -m pytest tests/ -v`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/app/api/endpoints.py backend/tests/test_celestial_endpoint.py
git commit -m "feat: add /api/celestial returning Sun and Moon for an ET instant

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Accept `datetime` on `/api/levels` and return the Moon

**Files:**
- Modify: `backend/app/utils/levels_calculator.py`
- Modify: `backend/app/api/endpoints.py`

- [ ] **Step 1: Write the failing test**

Append to `backend/tests/test_celestial_endpoint.py`, above the `if __name__` block:

```python
class TestLevelsDatetime(unittest.TestCase):
    """/api/levels must accept an ET datetime and report both bodies."""

    def test_levels_include_moon_position(self):
        response = client.get(
            "/api/levels/AAPL", params={"datetime": "2026-01-02T16:00"}
        )
        if response.status_code != 200:
            self.skipTest("market data unavailable")
        body = response.json()
        self.assertIn("sun_position", body)
        self.assertIn("moon_position", body)
        self.assertIn("angle", body["moon_position"])

    def test_bad_datetime_returns_400(self):
        response = client.get("/api/levels/AAPL", params={"datetime": "nonsense"})
        self.assertEqual(response.status_code, 400)
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd backend && python -m pytest tests/test_celestial_endpoint.py::TestLevelsDatetime -v`
Expected: FAIL — `test_bad_datetime_returns_400` gets 500 or 200, not 400.

- [ ] **Step 3: Teach `levels_calculator` about instants and the Moon**

In `backend/app/utils/levels_calculator.py`, change the ephemeris import to:

```python
from .ephemeris import get_current_sun_angle, calculate_sun_position, calculate_moon_position
```

Change the signature of `calculate_levels_for_ticker` to accept an instant:

```python
def calculate_levels_for_ticker(
    ticker: str,
    num_levels: int = 5,
    date: Optional[str] = None,
    when=None,
) -> Optional[Dict[str, Any]]:
```

Replace the body's date-parsing block (the `target_date = None` / `if date:` section added earlier) with:

```python
        # `when` is a timezone-aware instant and takes precedence.
        # `date` remains supported and means 16:00 ET on that day - the closing
        # bell, matching the closing price returned for that date.
        target_date = None
        if when is not None:
            target_date = when
        elif date:
            try:
                target_date = datetime.strptime(date, "%Y-%m-%d")
            except ValueError:
                logger.error(f"Invalid date format: {date}, expected YYYY-MM-DD")
                return None
```

Replace the sun-position block with one that computes both bodies:

```python
        logger.info(f"Calculating celestial positions")
        try:
            sun_position = calculate_sun_position(target_date)
            moon_position = calculate_moon_position(target_date)
            sun_angle = sun_position["angle"]
            logger.info(
                f"Positions calculated: sun={sun_angle}, moon={moon_position['angle']}"
            )
        except Exception as e:
            logger.error(f"Error calculating celestial positions: {str(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
```

Add `moon_position` to the result dict, after `"sun_position": sun_position,`:

```python
            "moon_position": moon_position,
```

And make `price_date` handle both input shapes:

```python
            "price_date": target_date.strftime("%Y-%m-%d") if target_date else None,
```

(unchanged — a timezone-aware datetime formats identically here).

- [ ] **Step 4: Wire the endpoint**

In `backend/app/api/endpoints.py`, change the `/levels/{ticker}` signature to add the parameter:

```python
@router.get("/levels/{ticker}", response_model=Dict[str, Any])
async def get_levels_for_ticker(
    ticker: str = Path(..., description="The ticker symbol"),
    recalculate: bool = Query(False, description="Whether to recalculate the levels"),
    date: Optional[str] = Query(None, description="Optional date (YYYY-MM-DD), priced at 16:00 ET"),
    datetime_et: Optional[str] = Query(
        None,
        alias="datetime",
        description="Optional 'YYYY-MM-DDTHH:mm' in US Eastern. Overrides `date`.",
    ),
):
```

Immediately inside the `try:` block, after `ticker = ticker.upper()`, add:

```python
        # Resolve the requested instant. `datetime` wins; `date` means 16:00 ET.
        when = None
        try:
            if datetime_et:
                when = parse_et_datetime(datetime_et)
            elif date:
                when = parse_et_datetime(f"{date}T16:00")
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
```

Change the cache guard so any explicit instant bypasses it:

```python
        if not recalculate and when is None and firestore_available:
```

And change the calculation call to pass the instant:

```python
                levels = calculate_levels_for_ticker(ticker, when=when)
```

- [ ] **Step 5: Run the tests**

Run: `cd backend && python -m pytest tests/ -v`
Expected: PASS. `test_levels_include_moon_position` may skip if Yahoo Finance is unreachable; that is acceptable.

- [ ] **Step 6: Verify by hand against a running server**

```bash
curl -s "http://localhost:8000/api/levels/AAPL?datetime=2026-01-02T16:00"
```

Expected: JSON containing both `sun_position` and `moon_position`, and `price_date` of `2026-01-02`.

- [ ] **Step 7: Commit**

```bash
git add backend/app/utils/levels_calculator.py backend/app/api/endpoints.py backend/tests/test_celestial_endpoint.py
git commit -m "feat: accept ET datetime on /api/levels and return moon_position

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: Extract pan/zoom maths into `utils/gannView.js`

Pure functions first so the zoom behaviour is testable before touching the canvas.

**Files:**
- Create: `utils/gannView.js`
- Test: `utils/__tests__/gannView.test.js`

- [ ] **Step 1: Write the failing test**

Create `utils/__tests__/gannView.test.js`:

```js
import { fitView, zoomAt, visibleCellRange, MIN_ZOOM, MAX_ZOOM } from '../gannView';

const CELL = 40;

describe('fitView', () => {
  test('frames the whole grid inside the viewport', () => {
    const view = fitView(10, CELL, 800, 600);
    const gridPx = 10 * CELL;
    expect(view.zoom * gridPx).toBeLessThanOrEqual(600);
    expect(view.zoom).toBeGreaterThan(0);
  });

  test('centres the grid', () => {
    const view = fitView(10, CELL, 800, 600);
    const gridPx = 10 * CELL * view.zoom;
    expect(view.panX).toBeCloseTo((800 - gridPx) / 2, 5);
    expect(view.panY).toBeCloseTo((600 - gridPx) / 2, 5);
  });

  test('never returns a zoom outside the allowed range', () => {
    const huge = fitView(5000, CELL, 800, 600);
    expect(huge.zoom).toBeGreaterThanOrEqual(MIN_ZOOM);
    expect(huge.zoom).toBeLessThanOrEqual(MAX_ZOOM);
  });
});

describe('zoomAt', () => {
  test('keeps the world point under the cursor fixed', () => {
    const before = { zoom: 1, panX: 0, panY: 0 };
    const cursorX = 300;
    const cursorY = 200;
    const worldX = (cursorX - before.panX) / before.zoom;
    const worldY = (cursorY - before.panY) / before.zoom;

    const after = zoomAt(before, cursorX, cursorY, 1.5);

    expect(worldX * after.zoom + after.panX).toBeCloseTo(cursorX, 5);
    expect(worldY * after.zoom + after.panY).toBeCloseTo(cursorY, 5);
  });

  test('clamps at the maximum', () => {
    const view = zoomAt({ zoom: MAX_ZOOM, panX: 0, panY: 0 }, 0, 0, 10);
    expect(view.zoom).toBe(MAX_ZOOM);
  });

  test('clamps at the minimum', () => {
    const view = zoomAt({ zoom: MIN_ZOOM, panX: 0, panY: 0 }, 0, 0, 0.01);
    expect(view.zoom).toBe(MIN_ZOOM);
  });
});

describe('visibleCellRange', () => {
  test('returns only the cells inside the viewport', () => {
    const view = { zoom: 1, panX: 0, panY: 0 };
    const range = visibleCellRange(view, CELL, 100, 800, 600);
    expect(range.colStart).toBe(0);
    expect(range.colEnd).toBeLessThan(100);
    expect(range.rowEnd).toBeLessThan(100);
  });

  test('clamps to the grid when panned past its edge', () => {
    const view = { zoom: 1, panX: 5000, panY: 5000 };
    const range = visibleCellRange(view, CELL, 20, 800, 600);
    expect(range.colStart).toBeGreaterThanOrEqual(0);
    expect(range.rowStart).toBeGreaterThanOrEqual(0);
    expect(range.colEnd).toBeLessThanOrEqual(19);
  });

  test('covers the entire grid when fully zoomed out to fit', () => {
    const view = fitView(20, CELL, 800, 600);
    const range = visibleCellRange(view, CELL, 20, 800, 600);
    expect(range.rowStart).toBe(0);
    expect(range.colStart).toBe(0);
    expect(range.rowEnd).toBe(19);
    expect(range.colEnd).toBe(19);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- gannView`
Expected: FAIL — `Cannot find module '../gannView'`.

- [ ] **Step 3: Create `utils/gannView.js`**

```js
/**
 * Pan and zoom maths for the Gann grid canvas.
 *
 * A "view" is { zoom, panX, panY }. World coordinates are pixels in unscaled
 * grid space; screen coordinates are canvas pixels. The relationship is:
 *
 *   screen = world * zoom + pan
 */

export const MIN_ZOOM = 0.05;
export const MAX_ZOOM = 4;

/** Fraction of the viewport the grid occupies when fitted, leaving a margin. */
const FIT_MARGIN = 0.95;

function clampZoom(zoom) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

/**
 * Compute the view that frames the entire grid, centred.
 *
 * @param {number} dimension - grid width in cells
 * @param {number} cellSize - unscaled cell size in pixels
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 * @returns {{zoom:number, panX:number, panY:number}}
 */
export function fitView(dimension, cellSize, viewportWidth, viewportHeight) {
  const gridPx = dimension * cellSize;
  if (gridPx <= 0) return { zoom: 1, panX: 0, panY: 0 };

  const zoom = clampZoom(
    Math.min(viewportWidth / gridPx, viewportHeight / gridPx) * FIT_MARGIN
  );

  return {
    zoom,
    panX: (viewportWidth - gridPx * zoom) / 2,
    panY: (viewportHeight - gridPx * zoom) / 2,
  };
}

/**
 * Zoom by a factor about a fixed screen point, so whatever is under that point
 * stays under it.
 *
 * @param {{zoom:number, panX:number, panY:number}} view
 * @param {number} screenX - anchor point in canvas pixels
 * @param {number} screenY
 * @param {number} factor - >1 zooms in, <1 zooms out
 * @returns {{zoom:number, panX:number, panY:number}}
 */
export function zoomAt(view, screenX, screenY, factor) {
  const nextZoom = clampZoom(view.zoom * factor);

  const worldX = (screenX - view.panX) / view.zoom;
  const worldY = (screenY - view.panY) / view.zoom;

  return {
    zoom: nextZoom,
    panX: screenX - worldX * nextZoom,
    panY: screenY - worldY * nextZoom,
  };
}

/**
 * Inclusive range of cells currently inside the viewport.
 *
 * Drawing only these keeps repaint cost tied to viewport area rather than grid
 * area, which is what makes zooming a million-cell grid viable.
 *
 * @returns {{rowStart:number, rowEnd:number, colStart:number, colEnd:number}}
 */
export function visibleCellRange(view, cellSize, dimension, viewportWidth, viewportHeight) {
  const scaledCell = cellSize * view.zoom;
  if (scaledCell <= 0) {
    return { rowStart: 0, rowEnd: -1, colStart: 0, colEnd: -1 };
  }

  const last = dimension - 1;
  const clamp = (v) => Math.min(last, Math.max(0, v));

  return {
    colStart: clamp(Math.floor(-view.panX / scaledCell)),
    colEnd: clamp(Math.ceil((viewportWidth - view.panX) / scaledCell)),
    rowStart: clamp(Math.floor(-view.panY / scaledCell)),
    rowEnd: clamp(Math.ceil((viewportHeight - view.panY) / scaledCell)),
  };
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- gannView`
Expected: PASS, 9 tests.

- [ ] **Step 5: Commit**

```bash
git add utils/gannView.js utils/__tests__/gannView.test.js
git commit -m "feat: add pure pan/zoom/culling maths for the Gann grid

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 9: Rewrite `GannSquareChart` onto a viewport canvas

This replaces the full-size canvas and the whole draw path. It is the largest single change; take it in one commit so the component is never half-migrated.

**Files:**
- Modify: `components/GannSquareChart.js` (full rewrite of the component body)

- [ ] **Step 1: Replace the file contents**

Replace all of `components/GannSquareChart.js` with:

```jsx
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { buildGannSquare, findLevels, normalizeBodyDegree, MAX_CELLS } from '../utils/gannGrid';
import { fitView, zoomAt, visibleCellRange, MIN_ZOOM, MAX_ZOOM } from '../utils/gannView';

const VIEWPORT_WIDTH = 900;
const VIEWPORT_HEIGHT = 620;

/** Below this on-screen cell size, numbers are illegible - skip drawing them. */
const LABEL_MIN_CELL_PX = 14;

const COLORS = {
  grid: '#ddd',
  text: '#333',
  center: 'rgba(100, 200, 100, 0.5)',
  oddSquare: 'rgba(100, 100, 200, 0.5)',
  target: 'rgba(255, 165, 0, 0.6)',
  targetBorder: 'rgba(255, 165, 0, 1)',
  sunCell: 'rgba(255, 215, 0, 0.6)',
  sunCross: 'rgba(0, 100, 255, 0.5)',
  moonCell: 'rgba(200, 210, 224, 0.75)',
  moonCross: 'rgba(160, 80, 220, 0.55)',
  conjunctCell: 'rgba(214, 150, 90, 0.8)',
  upFill: 'rgba(0, 200, 0, 0.4)',
  downFill: 'rgba(255, 0, 0, 0.4)',
  upRing: 'rgba(0, 160, 0, 0.95)',
  downRing: 'rgba(210, 0, 0, 0.95)',
};

const cellKey = (row, col) => `${row},${col}`;

/**
 * Renders the Gann Square of 9 with pan/zoom, and overlays the Sun's and
 * Moon's crosses and their derived levels.
 */
const GannSquareChart = ({
  targetNumber = 81,
  sunPosition = 71,
  moonPosition = null,
  showSun = true,
  showMoon = true,
  cellSize = 40,
  highlightSpokes = true,
  onLevelsChange,
}) => {
  const canvasRef = useRef(null);
  const [view, setView] = useState({ zoom: 1, panX: 0, panY: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  const sunDegree = normalizeBodyDegree(sunPosition);
  const moonDegree = moonPosition == null ? null : normalizeBodyDegree(moonPosition);
  const isConjunct = moonDegree !== null && moonDegree === sunDegree;

  // Build one grid per visible body. The spiral itself is identical; only the
  // recorded body position differs, so levels differ.
  const sunGrid = useMemo(
    () => buildGannSquare(targetNumber, sunDegree),
    [targetNumber, sunDegree]
  );
  const moonGrid = useMemo(
    () => (moonDegree === null ? null : buildGannSquare(targetNumber, moonDegree)),
    [targetNumber, moonDegree]
  );

  const sunLevels = useMemo(() => findLevels(sunGrid, 3), [sunGrid]);
  const moonLevels = useMemo(
    () => (moonGrid ? findLevels(moonGrid, 3) : { up: [], down: [] }),
    [moonGrid]
  );

  const tooLarge = sunGrid.tooLarge;
  const dimension = sunGrid.dimension;

  // Report levels upward so the page can render them outside the canvas.
  useEffect(() => {
    if (!onLevelsChange) return;
    onLevelsChange({
      sun: { up: sunLevels.up.map((l) => l.value), down: sunLevels.down.map((l) => l.value) },
      moon: { up: moonLevels.up.map((l) => l.value), down: moonLevels.down.map((l) => l.value) },
      isConjunct,
    });
  }, [sunLevels, moonLevels, isConjunct, onLevelsChange]);

  // Fit only when the grid dimension changes. Recalculating levels (which the
  // Moon triggers roughly every 1.8 hours) must not throw away the user's view.
  useEffect(() => {
    if (!dimension) return;
    setView(fitView(dimension, cellSize, VIEWPORT_WIDTH, VIEWPORT_HEIGHT));
  }, [dimension, cellSize]);

  const handleFit = useCallback(() => {
    if (!dimension) return;
    setView(fitView(dimension, cellSize, VIEWPORT_WIDTH, VIEWPORT_HEIGHT));
  }, [dimension, cellSize]);

  const handleZoomButton = useCallback((factor) => {
    setView((current) => zoomAt(current, VIEWPORT_WIDTH / 2, VIEWPORT_HEIGHT / 2, factor));
  }, []);

  // Wheel zoom is attached natively so it can be non-passive and preventDefault.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      setView((current) =>
        zoomAt(current, e.clientX - rect.left, e.clientY - rect.top, factor)
      );
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  const startPan = (e) => {
    setIsPanning(true);
    panStart.current = { x: e.clientX - view.panX, y: e.clientY - view.panY };
  };

  useEffect(() => {
    if (!isPanning) return;

    const onMove = (e) => {
      setView((current) => ({
        ...current,
        panX: e.clientX - panStart.current.x,
        panY: e.clientY - panStart.current.y,
      }));
    };
    const onUp = () => setIsPanning(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isPanning]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tooLarge || !dimension) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const upSun = new Set(sunLevels.up.map((l) => cellKey(l.row, l.col)));
    const downSun = new Set(sunLevels.down.map((l) => cellKey(l.row, l.col)));
    const upMoon = new Set(moonLevels.up.map((l) => cellKey(l.row, l.col)));
    const downMoon = new Set(moonLevels.down.map((l) => cellKey(l.row, l.col)));

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    ctx.save();
    ctx.translate(view.panX, view.panY);
    ctx.scale(view.zoom, view.zoom);

    const range = visibleCellRange(view, cellSize, dimension, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    const scaledCell = cellSize * view.zoom;
    const drawLabels = scaledCell >= LABEL_MIN_CELL_PX;
    const gridPx = dimension * cellSize;

    // Grid lines - only the visible ones
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1 / view.zoom;
    for (let r = range.rowStart; r <= range.rowEnd + 1; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(gridPx, r * cellSize);
      ctx.stroke();
    }
    for (let c = range.colStart; c <= range.colEnd + 1; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, gridPx);
      ctx.stroke();
    }

    // Body crosses, drawn full-width across the grid
    const drawCross = (position, color) => {
      if (position.row < 0) return;
      const cx = position.col * cellSize + cellSize / 2;
      const cy = position.row * cellSize + cellSize / 2;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 / view.zoom;

      const lines = [
        [0, cy, gridPx, cy],
        [cx, 0, cx, gridPx],
        [0, cy - cx, gridPx, cy - cx + gridPx],
        [0, cy + cx, gridPx, cy + cx - gridPx],
      ];
      lines.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
    };

    if (highlightSpokes) {
      if (showSun) drawCross(sunGrid.bodyPosition, COLORS.sunCross);
      if (showMoon && moonGrid) drawCross(moonGrid.bodyPosition, COLORS.moonCross);
    }

    // Cells
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.max(10, cellSize * 0.4)}px Arial`;

    for (let row = range.rowStart; row <= range.rowEnd; row++) {
      for (let col = range.colStart; col <= range.colEnd; col++) {
        const value = sunGrid.matrix[row][col];
        if (value === null) continue;

        const x = col * cellSize;
        const y = row * cellSize;
        const key = cellKey(row, col);

        if (value === 1) {
          ctx.fillStyle = COLORS.center;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        const root = Math.sqrt(value);
        if (root % 1 === 0 && root % 2 === 1) {
          ctx.fillStyle = COLORS.oddSquare;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        // Sun levels fill; Moon levels ring. A square that is both shows both.
        if (showSun && upSun.has(key)) {
          ctx.fillStyle = COLORS.upFill;
          ctx.fillRect(x, y, cellSize, cellSize);
        } else if (showSun && downSun.has(key)) {
          ctx.fillStyle = COLORS.downFill;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        if (showMoon && (upMoon.has(key) || downMoon.has(key))) {
          ctx.strokeStyle = upMoon.has(key) ? COLORS.upRing : COLORS.downRing;
          ctx.lineWidth = 3 / view.zoom;
          ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
        }

        // Body squares
        const isSunCell =
          showSun && row === sunGrid.bodyPosition.row && col === sunGrid.bodyPosition.col;
        const isMoonCell =
          showMoon &&
          moonGrid &&
          row === moonGrid.bodyPosition.row &&
          col === moonGrid.bodyPosition.col;

        if (isSunCell && isMoonCell) {
          ctx.fillStyle = COLORS.conjunctCell;
          ctx.fillRect(x, y, cellSize, cellSize);
        } else if (isSunCell) {
          ctx.fillStyle = COLORS.sunCell;
          ctx.fillRect(x, y, cellSize, cellSize);
        } else if (isMoonCell) {
          ctx.fillStyle = COLORS.moonCell;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        if (row === sunGrid.targetPosition.row && col === sunGrid.targetPosition.col) {
          ctx.fillStyle = COLORS.target;
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.strokeStyle = COLORS.targetBorder;
          ctx.lineWidth = 2 / view.zoom;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }

        if (drawLabels) {
          ctx.fillStyle = COLORS.text;
          ctx.fillText(String(value), x + cellSize / 2, y + cellSize / 2);
        }
      }
    }

    ctx.restore();
  }, [
    view, cellSize, dimension, tooLarge, highlightSpokes,
    showSun, showMoon, sunGrid, moonGrid, sunLevels, moonLevels,
  ]);

  if (tooLarge) {
    return (
      <div className="alert alert-warning">
        This price needs a grid larger than {MAX_CELLS.toLocaleString()} squares, which would
        freeze the browser. Try an instrument priced under about $397,000.
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-2" style={{ gap: '0.5rem' }}>
        <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => handleZoomButton(1 / 1.2)}>−</button>
        <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => handleZoomButton(1.2)}>+</button>
        <button type="button" className="btn btn-sm btn-outline-primary"
                onClick={handleFit}>Fit</button>
        <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
          {Math.round(view.zoom * 100)}% · scroll to zoom, drag to pan
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={VIEWPORT_WIDTH}
        height={VIEWPORT_HEIGHT}
        onMouseDown={startPan}
        style={{
          border: '1px solid #ccc',
          background: '#fff',
          display: 'block',
          maxWidth: '100%',
          cursor: isPanning ? 'grabbing' : 'grab',
        }}
      />

      <div className="d-flex flex-wrap mt-2" style={{ gap: '1rem', fontSize: '0.85rem' }}>
        <Swatch color={COLORS.center} label="Center (1)" />
        <Swatch color={COLORS.oddSquare} label="Odd squares (9, 25, 49...)" />
        <Swatch color={COLORS.target} label="Price square" />
        {showSun && <Swatch color={COLORS.sunCell} label="Sun" />}
        {showMoon && moonGrid && <Swatch color={COLORS.moonCell} label="Moon" />}
        {isConjunct && showSun && showMoon && (
          <Swatch color={COLORS.conjunctCell} label="Sun/Moon conjunct" />
        )}
        {showSun && <Swatch color={COLORS.upFill} label="Sun up levels (filled)" />}
        {showSun && <Swatch color={COLORS.downFill} label="Sun down levels (filled)" />}
        {showMoon && moonGrid && <Swatch color="transparent" border={COLORS.upRing}
                                          label="Moon up levels (ring)" />}
        {showMoon && moonGrid && <Swatch color="transparent" border={COLORS.downRing}
                                          label="Moon down levels (ring)" />}
      </div>
    </div>
  );
};

const Swatch = ({ color, border, label }) => (
  <span className="d-inline-flex align-items-center" style={{ gap: '0.35rem' }}>
    <span
      style={{
        width: 14,
        height: 14,
        background: color,
        border: border ? `3px solid ${border}` : '1px solid #bbb',
        display: 'inline-block',
      }}
    />
    {label}
  </span>
);

export default GannSquareChart;
```

- [ ] **Step 2: Verify the unit tests still pass**

Run: `npm test`
Expected: PASS — `gannGrid` and `gannView` suites unaffected.

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 4: Check it renders**

Start both servers, then open `http://localhost:3000/gann-chart-test`.

```bash
npm run dev
```

Expected: the grid appears fitted to the viewport, `+`/`−`/`Fit` work, the scroll wheel zooms toward the cursor, dragging pans, and cell numbers disappear when zoomed far out.

- [ ] **Step 5: Add the body glyphs**

The spec keeps the Sun's rayed glyph and gives the Moon a crescent. Add these two helpers
above the `GannSquareChart` component definition:

```jsx
/** Draw the Sun's rayed disc, centred in its square. */
function drawSunGlyph(ctx, cx, cy, cellSize, zoom) {
  const radius = cellSize * 0.22;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 200, 0, 0.9)';
  ctx.fill();

  ctx.strokeStyle = 'rgba(230, 150, 0, 0.9)';
  ctx.lineWidth = 1 / zoom;
  for (let angle = 0; angle < 360; angle += 45) {
    const rad = (angle * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(rad) * radius, cy + Math.sin(rad) * radius);
    ctx.lineTo(cx + Math.cos(rad) * (radius * 1.5), cy + Math.sin(rad) * (radius * 1.5));
    ctx.stroke();
  }
}

/** Draw a crescent by punching an offset disc out of a full disc. */
function drawMoonGlyph(ctx, cx, cy, cellSize) {
  const radius = cellSize * 0.24;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(245, 247, 252, 0.95)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(120, 130, 150, 0.9)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Cut the crescent using the square's own background colour.
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx + radius * 0.55, cy - radius * 0.2, radius * 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
```

Then, inside the cell loop, replace the body-square block with one that also draws the glyph:

```jsx
        const glyphX = x + cellSize / 2;
        const glyphY = y + cellSize / 2;

        if (isSunCell && isMoonCell) {
          ctx.fillStyle = COLORS.conjunctCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawSunGlyph(ctx, glyphX, glyphY, cellSize, view.zoom);
        } else if (isSunCell) {
          ctx.fillStyle = COLORS.sunCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawSunGlyph(ctx, glyphX, glyphY, cellSize, view.zoom);
        } else if (isMoonCell) {
          ctx.fillStyle = COLORS.moonCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawMoonGlyph(ctx, glyphX, glyphY, cellSize);
        }
```

- [ ] **Step 6: Warn when a body cannot be placed**

The spec requires hiding a body's overlay and warning, rather than drawing a partial cross.
`buildGannSquare` already returns `bodyFound`. Add this just above the `return (` in the
component:

```jsx
  const sunMissing = showSun && !sunGrid.bodyFound;
  const moonMissing = showMoon && moonGrid !== null && !moonGrid.bodyFound;
```

Guard the two `drawCross` calls so a missing body draws nothing:

```jsx
    if (highlightSpokes) {
      if (showSun && sunGrid.bodyFound) drawCross(sunGrid.bodyPosition, COLORS.sunCross);
      if (showMoon && moonGrid && moonGrid.bodyFound) {
        drawCross(moonGrid.bodyPosition, COLORS.moonCross);
      }
    }
```

And render the warning immediately after the opening `<div>` of the returned markup:

```jsx
      {(sunMissing || moonMissing) && (
        <div className="alert alert-warning py-2">
          {sunMissing && <div>Sun square not present in this grid — Sun overlay hidden.</div>}
          {moonMissing && <div>Moon square not present in this grid — Moon overlay hidden.</div>}
        </div>
      )}
```

- [ ] **Step 7: Throttle pan repaints with requestAnimationFrame**

Dragging fires `mousemove` far more often than the display refreshes. Coalesce them so at most
one state update happens per frame. Replace the pan effect from Step 1 with:

```jsx
  useEffect(() => {
    if (!isPanning) return undefined;

    let frame = null;
    let latest = null;

    const apply = () => {
      frame = null;
      if (!latest) return;
      const { x, y } = latest;
      setView((current) => ({
        ...current,
        panX: x - panStart.current.x,
        panY: y - panStart.current.y,
      }));
    };

    const onMove = (e) => {
      latest = { x: e.clientX, y: e.clientY };
      if (frame === null) frame = requestAnimationFrame(apply);
    };
    const onUp = () => setIsPanning(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [isPanning]);
```

- [ ] **Step 8: Rebuild and re-check**

Run: `npm run build`
Expected: `Compiled successfully`.

Reload the page. Expected: the Sun square shows a rayed disc, the Moon square a crescent, and
dragging is smooth with no stutter.

- [ ] **Step 9: Commit**

```bash
git add components/GannSquareChart.js
git commit -m "feat: viewport canvas with pan, zoom and cell culling

Canvas is now sized to the window rather than the whole grid, so large
grids no longer allocate multi-megapixel canvases. Adds Moon overlay
rendering, Sun/Moon glyphs, missing-body warnings, rAF-throttled panning,
and moves the legend into HTML.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: Add `getCelestial` to the API client

**Files:**
- Modify: `utils/api.js`

- [ ] **Step 1: Add the client function**

In `utils/api.js`, add above the `// Gann Levels` comment:

```js
// Celestial positions (Sun + Moon)
export const getCelestial = async (datetimeEt = null) => {
  const params = {};
  if (datetimeEt) params.datetime = datetimeEt;
  const response = await api.get('/api/celestial', { params });
  return response.data;
};
```

- [ ] **Step 2: Extend `getLevelsForTicker` to send a datetime**

Replace the existing `getLevelsForTicker` with:

```js
export const getLevelsForTicker = async (
  ticker,
  { recalculate = false, datetime = null } = {}
) => {
  try {
    const params = { recalculate };
    if (datetime) params.datetime = datetime;
    const response = await api.get(`/api/levels/${ticker}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching levels for ${ticker}:`, error);
    throw error;
  }
};
```

- [ ] **Step 3: Remove the mock fallback for `/api/celestial` and `/api/levels`**

The response interceptor silently substitutes mock data on failure, which previously produced a confusing crash when the mock's shape did not match. In the `api.interceptors.response.use` error handler, delete this block:

```js
    if (url.includes('/api/levels')) {
      return Promise.resolve({ data: mockResponses.levels });
    }
```

so a failed levels request rejects and the page shows its real error message.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 5: Commit**

```bash
git add utils/api.js
git commit -m "feat: add getCelestial client and datetime support on levels

Also stop substituting mock level data on failure - the mock shape did
not match the real response and produced a crash instead of an error.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11: Add date+time input, body toggles, and level display to the page

**Files:**
- Modify: `pages/gann-chart-test.js`

- [ ] **Step 1: Replace the file contents**

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import GannSquareChart from '../components/GannSquareChart';
import { getLevelsForTicker } from '../utils/api';

/** Local wall-clock 'YYYY-MM-DDTHH:mm', used as the max for the picker. */
const nowLocalInput = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const GannChartTest = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [tickerInput, setTickerInput] = useState('AAPL');
  const [selectedDateTime, setSelectedDateTime] = useState(''); // '' = live
  const [levelsData, setLevelsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cellSize, setCellSize] = useState(40);
  const [highlightSpokes, setHighlightSpokes] = useState(true);
  const [showSun, setShowSun] = useState(true);
  const [showMoon, setShowMoon] = useState(true);
  const [chartLevels, setChartLevels] = useState(null);

  const fetchLevels = useCallback(async (tickerSymbol, datetime) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLevelsForTicker(tickerSymbol, { datetime: datetime || null });
      if (!data || typeof data.price !== 'number' || typeof data.sun_angle !== 'number') {
        throw new Error('Unexpected response from levels API');
      }
      setLevelsData(data);
    } catch (err) {
      setLevelsData(null);
      setError(
        err?.response?.data?.detail ||
        `Could not fetch price for ${tickerSymbol}${datetime ? ` at ${datetime}` : ''}.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLevels(ticker, selectedDateTime);
  }, [ticker, selectedDateTime, fetchLevels]);

  const handleTickerSubmit = (e) => {
    e.preventDefault();
    const cleaned = tickerInput.trim().toUpperCase();
    if (cleaned) setTicker(cleaned);
  };

  // Price -> integer grid square. The x10 preserves one decimal of price.
  const targetNumber = levelsData ? Math.round(levelsData.price * 10) : 810;
  const sunDegree = levelsData ? Math.round(levelsData.sun_angle) : 71;
  const moonDegree =
    levelsData && levelsData.moon_position
      ? Math.round(levelsData.moon_position.angle)
      : null;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-end g-3">
              <div className="col-md-3">
                <form onSubmit={handleTickerSubmit}>
                  <label htmlFor="tickerInput" className="form-label mb-1">Ticker:</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      id="tickerInput"
                      value={tickerInput}
                      onChange={(e) => setTickerInput(e.target.value)}
                      style={{ maxWidth: '140px' }}
                    />
                    <button type="submit" className="btn btn-primary ms-2">Go</button>
                  </div>
                </form>
              </div>

              <div className="col-md-4">
                <label htmlFor="priceDateTime" className="form-label mb-1 d-block">
                  Date &amp; time <span className="text-muted">(ET)</span>:
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="datetime-local"
                    id="priceDateTime"
                    className="form-control"
                    value={selectedDateTime}
                    max={nowLocalInput()}
                    onChange={(e) => setSelectedDateTime(e.target.value)}
                    style={{ maxWidth: '220px' }}
                  />
                  {selectedDateTime && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => setSelectedDateTime('')}
                    >
                      Use live
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md-2">
                <label htmlFor="cellSize" className="form-label mb-1">Cell Size:</label>
                <input
                  type="number"
                  className="form-control"
                  id="cellSize"
                  value={cellSize}
                  onChange={(e) => setCellSize(parseInt(e.target.value) || 20)}
                  min="20"
                  max="80"
                  style={{ maxWidth: '80px' }}
                />
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="showSun"
                         checked={showSun} onChange={(e) => setShowSun(e.target.checked)} />
                  <label className="form-check-label" htmlFor="showSun">Show Sun</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="showMoon"
                         checked={showMoon} onChange={(e) => setShowMoon(e.target.checked)} />
                  <label className="form-check-label" htmlFor="showMoon">Show Moon</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="highlightSpokes"
                         checked={highlightSpokes}
                         onChange={(e) => setHighlightSpokes(e.target.checked)} />
                  <label className="form-check-label" htmlFor="highlightSpokes">
                    Highlight Crosses
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                {loading && (
                  <span className="text-muted">
                    Loading {ticker}{selectedDateTime ? ` at ${selectedDateTime} ET` : ''}...
                  </span>
                )}
                {!loading && error && <span className="text-danger">{error}</span>}
                {!loading && !error && levelsData && (
                  <div className="d-flex flex-wrap align-items-center" style={{ gap: '1.5rem' }}>
                    <div>
                      <strong className="me-2">{levelsData.symbol}:</strong>
                      <span className="badge bg-success">
                        ${Number(levelsData.price).toFixed(2)}
                      </span>
                      <span className="ms-2 text-muted">
                        {levelsData.price_date ? `as of ${levelsData.price_date}` : '(live)'}
                      </span>
                    </div>
                    <div>
                      <strong className="me-2">Sun:</strong>
                      <span className="badge bg-warning text-dark">{sunDegree}°</span>
                      <span className="ms-2 text-muted">
                        ({levelsData.sun_position?.zodiac_sign || 'N/A'}{' '}
                        {Number(levelsData.sun_position?.degrees_in_sign ?? 0).toFixed(2)}°)
                      </span>
                    </div>
                    {moonDegree !== null && (
                      <div>
                        <strong className="me-2">Moon:</strong>
                        <span className="badge bg-secondary">{moonDegree}°</span>
                        <span className="ms-2 text-muted">
                          ({levelsData.moon_position?.zodiac_sign || 'N/A'}{' '}
                          {Number(levelsData.moon_position?.degrees_in_sign ?? 0).toFixed(2)}°)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {chartLevels && (
              <div className="row mt-3">
                <div className="col-12">
                  {chartLevels.isConjunct && showSun && showMoon ? (
                    <div className="text-muted mb-1">
                      Sun and Moon are conjunct — both bodies give the same levels.
                    </div>
                  ) : null}
                  {showSun && (
                    <div>
                      <strong className="me-2">Sun levels —</strong>
                      <span className="text-success me-3">Up: {chartLevels.sun.up.join(', ') || 'none'}</span>
                      <span className="text-danger">Down: {chartLevels.sun.down.join(', ') || 'none'}</span>
                    </div>
                  )}
                  {showMoon && chartLevels.moon.up.length > 0 && (
                    <div>
                      <strong className="me-2">Moon levels —</strong>
                      <span className="text-success me-3">Up: {chartLevels.moon.up.join(', ')}</span>
                      <span className="text-danger">Down: {chartLevels.moon.down.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <GannSquareChart
          targetNumber={targetNumber}
          sunPosition={sunDegree}
          moonPosition={moonDegree}
          showSun={showSun}
          showMoon={showMoon}
          cellSize={cellSize}
          highlightSpokes={highlightSpokes}
          onLevelsChange={setChartLevels}
        />
      </div>
    </Layout>
  );
};

export default GannChartTest;
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 3: Verify by hand**

With both servers running, open `http://localhost:3000/gann-chart-test`.

Expected:
- Sun and Moon degrees both shown, with different zodiac signs
- Two level rows, Sun and Moon, with different numbers
- Unticking **Show Moon** removes the purple cross, the silver square, the rings, and the Moon level row
- Setting a past date and time changes both bodies' degrees

- [ ] **Step 4: Commit**

```bash
git add pages/gann-chart-test.js
git commit -m "feat: date+time input, Sun/Moon toggles and dual level display

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12: Poll for degree changes in live mode

The Moon crosses a whole degree roughly every 1.8 hours, so levels go stale during a session. Poll the ephemeris — never the price feed — and update only when a rounded degree actually changes.

**Files:**
- Modify: `pages/gann-chart-test.js`

- [ ] **Step 1: Import the client function**

Change the import line in `pages/gann-chart-test.js` to:

```jsx
import { getLevelsForTicker, getCelestial } from '../utils/api';
```

- [ ] **Step 2: Add live-position state**

Add after the `chartLevels` state declaration:

```jsx
  // Live-polled positions. Null means "use whatever came back with the price".
  const [livePositions, setLivePositions] = useState(null);
```

- [ ] **Step 3: Add the polling effect**

Add immediately after the existing `useEffect` that calls `fetchLevels`:

```jsx
  // Poll the ephemeris in live mode only. This is a local calculation on the
  // server, so it costs nothing and cannot be rate-limited - unlike the price
  // feed, which is deliberately not polled.
  useEffect(() => {
    if (selectedDateTime) {
      setLivePositions(null);
      return undefined;
    }

    let cancelled = false;

    const tick = async () => {
      try {
        const data = await getCelestial();
        if (cancelled) return;
        setLivePositions((previous) => {
          const nextSun = Math.round(data.sun.angle);
          const nextMoon = Math.round(data.moon.angle);
          if (previous && previous.sunDegree === nextSun && previous.moonDegree === nextMoon) {
            return previous; // No square change - avoid a pointless re-render.
          }
          return { sunDegree: nextSun, moonDegree: nextMoon, sun: data.sun, moon: data.moon };
        });
      } catch (err) {
        // A dropped poll must not clear the chart. Keep the last known
        // positions and try again on the next tick.
        console.warn('Celestial poll failed, keeping last known positions:', err.message);
      }
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [selectedDateTime]);
```

- [ ] **Step 4: Prefer polled positions when live**

Replace the three derived-value lines with:

```jsx
  // Price -> integer grid square. The x10 preserves one decimal of price.
  const targetNumber = levelsData ? Math.round(levelsData.price * 10) : 810;

  const sunDegree = livePositions
    ? livePositions.sunDegree
    : levelsData
      ? Math.round(levelsData.sun_angle)
      : 71;

  const moonDegree = livePositions
    ? livePositions.moonDegree
    : levelsData && levelsData.moon_position
      ? Math.round(levelsData.moon_position.angle)
      : null;

  const sunDetail = livePositions ? livePositions.sun : levelsData?.sun_position;
  const moonDetail = livePositions ? livePositions.moon : levelsData?.moon_position;
```

- [ ] **Step 5: Use the detail objects in the readout**

In the JSX, replace `levelsData.sun_position?.zodiac_sign` with `sunDetail?.zodiac_sign`,
`levelsData.sun_position?.degrees_in_sign` with `sunDetail?.degrees_in_sign`,
`levelsData.moon_position?.zodiac_sign` with `moonDetail?.zodiac_sign`, and
`levelsData.moon_position?.degrees_in_sign` with `moonDetail?.degrees_in_sign`.

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 7: Verify polling by hand**

With both servers running, open the page in live mode and watch the browser Network tab.

Expected: a request to `/api/celestial` immediately, then one per minute. No repeated `/api/levels` calls. Stopping the backend logs a console warning but leaves the chart intact.

To prove a degree change updates the view without waiting hours, temporarily change `60000` to `2000` and confirm the request cadence, then change it back.

- [ ] **Step 8: Commit**

```bash
git add pages/gann-chart-test.js
git commit -m "feat: poll ephemeris every 60s and recalc on degree change

Only the celestial endpoint is polled; the price feed is not, to avoid
rate limiting and constantly shifting levels.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13: Final verification

- [ ] **Step 1: Run the full frontend suite**

Run: `npm test`
Expected: PASS, 23 tests across `gannGrid` (14) and `gannView` (9).

- [ ] **Step 2: Run the full backend suite**

Run: `cd backend && python -m pytest tests/ -v`
Expected: PASS.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 4: Manual checklist**

With both servers running against a production build (`npm run start`), on `http://localhost:3000/gann-chart-test`:

- [ ] Grid loads fitted to the viewport
- [ ] Scroll wheel zooms toward the cursor; the square under the pointer stays put
- [ ] `+`, `−` and `Fit` behave
- [ ] Drag pans; numbers vanish when zoomed far out and return when zoomed in
- [ ] Sun and Moon show different degrees and different level sets
- [ ] The Sun square shows a rayed disc; the Moon square shows a crescent
- [ ] A square flagged by both bodies shows a fill and a ring together
- [ ] Toggling either body hides its square, cross, rings and level row
- [ ] Zooming in after a level recalculation does not reset the view
- [ ] Entering a past date+time changes both degrees
- [ ] A bad ticker shows an inline error rather than crashing
- [ ] `/api/celestial` is requested once a minute in live mode and not at all when a fixed time is set

- [ ] **Step 5: Commit any fixes and finish**

```bash
git add -A
git commit -m "test: verify zoom and moon levels end to end

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
