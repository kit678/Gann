# Gannzilla Figures + Radix/Transit Inspector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Roadmap step 8 of `2026-10-15-gannzilla-math-parity.md`: Gannzilla's Figures (polygons, Vectors, Locator) on the Square of 9 and the Cosmogram, plus a radix/transit two-wheel Cosmogram with the Δ column and the 12×12 Inspector.

**Architecture:** Pure maths in `utils/gannzillaFigures.js` (figure geometry, all angles through `wheelPoint`) and `inspectorTable()` in `utils/gannzillaAstro.js`. One `components/FiguresPanel.js` holds the controls; the page lifts the figure state and hands it to `GannSquareChart` (canvas) and `CosmogramPanel` (SVG). The Cosmogram gains a Radix side with its own date.

**Tech Stack:** Next 12, React 18, Jest 29. No new dependencies.

**Sources (fair only):** `notes/gannzilla_docs_extract.md` §1.3, §1.6, §2 #14-#18, #25; `notes/gannzilla_blackbox_findings.md`. Gannzilla.exe is never decompiled. The Vortex is out of scope (its Radius units are not pinned).

---

## Conventions and stated assumptions

- **Figure angles are screen angles:** 0° at west, growing clockwise (docs §0: Triangle at 0 has its apex west; Vectors base 0 puts 100° just past north). Computed with `wheelPoint(deg, r, { clockwise: true, angle })`.
- **Figures are centred on cell 1** (the grid centre) and sized to the grid: radius = half the grid side. On the Cosmogram they are centred on the wheel with radius `R_ZODIAC_IN`.
- **On the Cosmogram the figure angle stays a screen angle.** It does not follow the Cosmogram's own Angle/Clockwise. With the defaults the two coincide (0° Aries at west). Untested in the app; docs §4 #1.
- **Polygon vertex k** sits at `angle + k·360/n` and is labelled `k/n` (docs: triangle "1/3", "2/3"). Vertex 0 is labelled with the angle.
- **Polygon highlight** = grid cells whose centre lies inside the polygon (docs §4 #14 says the exact rule is open).
- **Vectors Clockwise off** is the same left-right mirror as every black-box-tested module (`wheelPoint` with `clockwise: false`). Untested for Vectors specifically.
- **Locator:** the bear end sits at the angle, the bull end at angle + 180 (docs: "Locator at 354 has its bear end slightly below west"). Docs §4 #15 leaves this open.
- **Δ = (radix − transit) mod 360** (black-box [04]), via `delta()`.
- **Inspector** (docs #16-#18, radix/transit corrected by the black box; fixture `RADIX_TRANSIT`): cell (row i, column j) is
  - i = j: `separation(radix_i, transit_i)`
  - i < j (above the diagonal): `separation(radix_i, radix_j)`
  - i > j (below the diagonal): `separation(transit_i, transit_j)`
  - and carries `findAspect()` of the same pair.

## File structure

- Create `utils/gannzillaFigures.js` — `POLYGONS`, `DEFAULT_VECTORS`, `polygonVertices`, `vectorRays`, `locatorLine`, `pointInPolygon`, `polygonCells`, `defaultFigures`.
- Create `utils/__tests__/gannzillaFigures.test.js`.
- Modify `utils/gannzillaAstro.js` — add `inspectorTable`.
- Modify `utils/__tests__/gannzillaAstro.test.js` — Inspector tests.
- Create `components/FiguresPanel.js` — controls; `components/FigureOverlay.js` — SVG drawing used by the Cosmogram.
- Modify `components/GannSquareChart.js` — `figures` prop drawn on the canvas.
- Modify `components/CosmogramPanel.js` — `figures` prop, radix side, Δ column, Inspector.
- Modify `pages/gann-chart-test.js` — figure state and wiring.

---

### Task 1: Figure geometry (TDD)

**Files:** Create `utils/gannzillaFigures.js`, `utils/__tests__/gannzillaFigures.test.js`

- [ ] **Step 1: Failing tests**

```js
import {
  POLYGONS, DEFAULT_VECTORS, polygonVertices, vectorRays, locatorLine,
  pointInPolygon, polygonCells,
} from '../gannzillaFigures';

const close = (p, x, y) => { expect(p.x).toBeCloseTo(x, 9); expect(p.y).toBeCloseTo(y, 9); };

test('polygon list is Triangle..Dodecagon', () => {
  expect(POLYGONS.map((p) => p.sides)).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  expect(POLYGONS[0].name).toBe('Triangle');
  expect(POLYGONS[9].name).toBe('Dodecagon');
});

test('Triangle at 0: apex west, then +120 and +240 clockwise, labelled 1/3, 2/3', () => {
  const v = polygonVertices(3, 0, 1);
  close(v[0], -1, 0);
  expect(v.map((p) => p.label)).toEqual(['0°', '1/3', '2/3']);
  expect(v.map((p) => p.deg)).toEqual([0, 120, 240]);
  // 120 clockwise from west is upper-right.
  expect(v[1].x).toBeGreaterThan(0); expect(v[1].y).toBeLessThan(0);
});

test('Vectors default to the guide list; base 0 puts 100 just past north', () => {
  expect(DEFAULT_VECTORS).toEqual([23.6, 38.2, 50, 61.8, 100, 161.8, 261.8]);
  const rays = vectorRays(DEFAULT_VECTORS, 0, 1);
  const r100 = rays.find((r) => r.value === 100);
  expect(r100.x).toBeGreaterThan(0); expect(r100.y).toBeLessThan(0);
  const r261 = rays.find((r) => r.value === 261.8);
  expect(r261.y).toBeGreaterThan(0); expect(r261.x).toBeGreaterThan(0); // just east of south
});

test('Vectors clockwise off mirrors left-right', () => {
  const [ray] = vectorRays([90], 30, 1, { clockwise: false });
  const [mirror] = vectorRays([90], 30, 1);
  close(ray, -mirror.x, mirror.y);
});

test('Locator at 354: bear just below west, bull opposite', () => {
  const { bear, bull } = locatorLine(354, 1);
  expect(bear.x).toBeLessThan(-0.99); expect(bear.y).toBeGreaterThan(0);
  close(bull, -bear.x, -bear.y);
});

test('pointInPolygon', () => {
  const square = [{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }];
  expect(pointInPolygon({ x: 0, y: 0 }, square)).toBe(true);
  expect(pointInPolygon({ x: 2, y: 0 }, square)).toBe(false);
});

test('polygonCells: a Square at 45 deg (axis-aligned, inscribed in the circle) covers the middle 3x3', () => {
  expect(polygonCells(5, 4, 45).size).toBe(9);
});

test('polygonCells: a Square at 0 deg (diamond) on 5x5 holds the 13 cells within Manhattan 2', () => {
  const cells = polygonCells(5, 4, 0);
  expect(cells.has('2,2')).toBe(true);
  expect(cells.has('0,0')).toBe(false);
  expect(cells.size).toBe(13);
});
```

- [ ] **Step 2:** `npx jest utils/__tests__/gannzillaFigures.test.js` → FAIL (module missing).

- [ ] **Step 3: Implement** — see `utils/gannzillaFigures.js` (each function a few lines over `wheelPoint`; `polygonCells(dimension, sides, angle, { clockwise })` uses cell-centre coordinates with the centre cell at the origin, radius `dimension/2`, and a `1e-9` tolerance on the edge test so boundary cells count as inside; `clockwise: false` mirrors the column like the canvas does).

- [ ] **Step 4:** tests PASS.
- [ ] **Step 5:** commit `feat: Gannzilla figure geometry (polygons, Vectors, Locator)`.

### Task 2: Inspector table (TDD)

**Files:** Modify `utils/gannzillaAstro.js`, `utils/__tests__/gannzillaAstro.test.js`

- [ ] **Step 1: Failing tests** using `RADIX_TRANSIT` from the fixtures:

```js
describe('inspectorTable (extract #16-#18, black-box corrected)', () => {
  const radix = RADIX_TRANSIT.map((r) => r.radix);
  const transit = RADIX_TRANSIT.map((r) => r.transit);
  const t = inspectorTable(radix, transit);
  const idx = (name) => RADIX_TRANSIT.findIndex((r) => r.body === name);

  test('diagonal is radix vs transit, shortest arc', () => {
    RADIX_TRANSIT.forEach((r, i) => expect(t[i][i].value).toBeCloseTo(r.arc, 9));
  });
  test('above the diagonal is radix vs radix', () => {
    expect(t[idx('Sun')][idx('Mercury')].value).toBe(9);
    expect(t[idx('Sun')][idx('Venus')].value).toBe(39);
    expect(t[idx('Moon')][idx('Saturn')].aspect.name).toBe('Opposition');
  });
  test('below the diagonal is transit vs transit', () => {
    expect(t[idx('Mercury')][idx('Sun')].value).toBe(22);
    expect(t[idx('Saturn')][idx('Venus')].aspect.name).toBe('Square');
    expect(t[idx('Jupiter')][idx('Sun')].aspect.name).toBe('Quincunx');
  });
  test('plain cells carry no aspect', () => {
    expect(t[idx('Sun')][idx('Mercury')].aspect).toBeNull();
  });
});
```

- [ ] **Step 2:** FAIL. **Step 3:** implement `inspectorTable(radix, transit, aspects = DEFAULT_ASPECTS)` returning `n×n` of `{ value, aspect }`. **Step 4:** PASS. **Step 5:** commit `feat: Gannzilla Inspector table`.

### Task 3: Figures panel + overlays

**Files:** Create `components/FiguresPanel.js`, `components/FigureOverlay.js`; modify `components/GannSquareChart.js`, `components/CosmogramPanel.js`, `pages/gann-chart-test.js`.

- [ ] `defaultFigures()` (in `gannzillaFigures.js`) returns `{ hide: false, polygons: { [sides]: { visible: false, highlight: false, angle: 0 } }, vectors: { visible: false, clockwise: true, angle: 0, values: DEFAULT_VECTORS }, locator: { visible: false, angle: 0 } }`. Add a test that it has 10 polygons all hidden.
- [ ] `FiguresPanel` renders: global Hide; one row per polygon (Visible, Highlight, Angle); Vectors (Visible, Clockwise, Angle, comma-separated Values); Locator (Visible, Angle). It calls `onChange(next)`.
- [ ] `FigureOverlay` (SVG `<g>`) draws visible polygons with labels, vector rays with value labels, the Locator line with "Bear"/"Bull" end labels. Used inside the Cosmogram SVG at radius `R_ZODIAC_IN`.
- [ ] `GannSquareChart` takes `figures`; after the cells loop it shades `polygonCells` for highlighted polygons and strokes the same shapes on the canvas (centre = grid centre, radius = `gridPx/2`).
- [ ] The page holds `figures` state, renders `FiguresPanel` above the grid, and passes `figures` to both.
- [ ] Commit `feat: Gannzilla figures on the Square of 9 and the Cosmogram`.

### Task 4: Radix vs transit on the Cosmogram

**Files:** Modify `components/CosmogramPanel.js`.

- [ ] The page's date stays the **transit** side. Add Radix/Transit toggle buttons (green = on) and a Radix date input (`datetime-local`, default `2000-01-01T00:00`).
- [ ] Fetch radix bodies with `getPlanets({ datetime: radixDate, system })` when the radix side is on.
- [ ] Both on: radix glyphs on an inner ring (`R_RADIX = 112`), transit on `R_BODIES`; aspect lines move inside to `R_ASPECTS_INNER = 90`. Aspect lines are drawn for the transit side (or the radix side when it is the only one on).
- [ ] Table: Radix and Δ columns when both sides are on (`delta(radix, transit)`).
- [ ] Inspector: 12×12 table under the wheel when both sides are on. Header columns = bodies (transit), rows = bodies (radix), labelled with the two dates. Aspect cells show a symbol (☌ ⚺ ∠ ⚹ □ △ ⚼ ⚻ ☍) in the aspect colour, with a `title` like `Opposition: 180° Moon-Saturn`.
- [ ] Commit `feat: Cosmogram radix/transit wheels, delta column and Inspector`.

### Task 5: Verify, review, merge

- [ ] `npx jest` all green.
- [ ] Run frontend + backend; check figures on the grid and the wheel, Hide, highlight; both wheels, Δ and the Inspector against `RADIX_TRANSIT_2026` (radix 15.10.2026 vs transit 01.01.2000: Moon Δ 34, Jupiter Δ 117, Sun Δ 282). No console errors.
- [ ] Code review (superpowers:requesting-code-review), fix findings.
- [ ] Merge `gannzilla-figures` into master with `--no-ff` and tick step 8 in the parity plan.
