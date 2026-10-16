# Gannzilla Plan 4: Grid Controls (Value, Increment, Clockwise, Find)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Gann chart page gets Gannzilla's grid controls: **Value** (centre number), **Increment** (step per cell), **Clockwise**, and **Find**. Increment replaces the "Multiply price ×10" switch.

**Architecture:** The spiral engine (`utils/gannGrid.js`) and its level search stay exactly as they are. They keep working on cell *indices* 1, 2, 3 … Value and Increment only change what each cell **shows** (`cellValue` from Plan 1) and how a price maps to a cell index. With Value = Increment = 0.1, this is exactly today's "×10 on". With Value = Increment = 1, it is "×10 off". So existing levels do not move. Sun and Moon still sit on the cell whose *index* equals their degree, which is how Gannzilla's projections work. Clockwise mirrors the drawing left-right.

**Tech Stack:** Next.js / React, Jest (`npx jest`, node environment, so there are no component tests). UI is checked by running the page.

**Roadmap context:** step 4 of `docs/superpowers/plans/2026-10-15-gannzilla-math-parity.md`. Uses `cellValue` and `findCell` from `utils/gannzillaGrid.js`.

---

## Design decisions (made, not open)

- **The price square keeps rounding to the nearest cell**, as `Math.round(price × 10)` does today. A new `nearestCell` handles this, so current levels are unchanged. Gannzilla's own **Find** rounds down (`findCell`) and is offered as a separate Find box that highlights a cell.
- **Ladder prices** become `cellValue(square)` instead of `square / scale`. `buildLadder` gets an optional `toPrice` function, and its default stays `square / scale`, so existing tests keep passing.
- **Defaults:** Value 0.1 and Increment 0.1 reproduce today's default (×10 on).

## File structure

- Modify `utils/gannzillaGrid.js`: add `nearestCell`.
- Modify `utils/gannLevels.js`: `buildLadder` accepts `toPrice`.
- Modify `components/GannSquareChart.js`: new props `gridValue`, `gridIncrement`, `clockwise`, `findValue`; drop `priceScale`.
- Modify `pages/gann-chart-test.js`: replace the ×10 switch with Value and Increment inputs, a Clockwise switch and a Find box.
- Tests: `utils/__tests__/gannzillaGrid.test.js`, `utils/__tests__/gannLevels.test.js`.

---

### Task 1: `nearestCell`

**Files:**
- Modify: `utils/gannzillaGrid.js`
- Test: `utils/__tests__/gannzillaGrid.test.js`

- [ ] **Step 1: Write the failing tests**

Change the first import line of `utils/__tests__/gannzillaGrid.test.js` to:

```js
import { spiralOffset, cellValue, findCell, nearestCell } from '../gannzillaGrid';
```

Append to the end of the file:

```js
describe('nearestCell (price square, rounds to nearest)', () => {
  test('Value = Increment = 0.1 reproduces the old round(price x 10)', () => {
    const g = { value: 0.1, increment: 0.1 };
    [81, 123.44, 123.45, 123.46, 0.1, 397.04, 0.15, 2.25, 99.95].forEach((price) => {
      expect(nearestCell(price, g)).toBe(Math.round(price * 10));
    });
  });

  test('matches the old rounding for every 2-decimal price from 0.05 to 5000', () => {
    const g = { value: 0.1, increment: 0.1 };
    for (let cents = 5; cents <= 500000; cents++) {
      const price = cents / 100;
      if (nearestCell(price, g) !== Math.round(price * 10)) {
        throw new Error(`mismatch at ${price}`);
      }
    }
  });

  test('Value = Increment = 1 reproduces the old round(price)', () => {
    [81, 123.4, 123.5, 4917.2].forEach((price) => {
      expect(nearestCell(price, { value: 1, increment: 1 })).toBe(Math.round(price));
    });
  });

  test('inverts cellValue on a custom grid', () => {
    const g = { value: 100, increment: 2 };
    for (let n = 1; n <= 500; n++) expect(nearestCell(cellValue(n, g), g)).toBe(n);
  });

  test('returns null below the centre, for a non-positive increment, or non-finite input', () => {
    expect(nearestCell(0.04, { value: 0.1, increment: 0.1 })).toBeNull();
    expect(nearestCell(5, { increment: 0 })).toBeNull();
    expect(nearestCell(NaN)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: FAIL, "nearestCell is not a function".

- [ ] **Step 3: Implement (append to `utils/gannzillaGrid.js`)**

```js
/**
 * The cell index whose value is nearest to `target`. This is how a price
 * picks its square: Value = Increment = 0.1 gives exactly the old
 * Math.round(price * 10). (Gannzilla's Find box rounds down instead; see
 * findCell.) Null when the target is below the centre, the increment is not
 * positive, or the input is not finite.
 */
export function nearestCell(target, { value = 1, increment = 1 } = {}) {
  if (!(increment > 0)) return null;
  const raw = (target - value) / increment + 1;
  if (!Number.isFinite(raw)) return null;
  // Snap float noise around exact halves (123.45 on a 0.1 grid lands on
  // 1234.4999999999998) so they round up like Math.round(price * 10) did.
  const doubled = raw * 2;
  const snapped = Math.abs(doubled - Math.round(doubled)) < 1e-9 ? Math.round(doubled) / 2 : raw;
  const n = Math.round(snapped);
  return n < 1 ? null : n;
}
```

- [ ] **Step 4: Run to verify they pass**

Run: `npx jest utils/__tests__/gannzillaGrid.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add utils/gannzillaGrid.js utils/__tests__/gannzillaGrid.test.js
git commit -m "feat: nearestCell maps a price to its square on any Value/Increment grid"
```

### Task 2: `buildLadder` accepts `toPrice`

**Files:**
- Modify: `utils/gannLevels.js` (`buildLadder`)
- Test: `utils/__tests__/gannLevels.test.js`

- [ ] **Step 1: Write the failing test**

Append to `utils/__tests__/gannLevels.test.js` (it already imports `buildLadder` and `buildGannSquare`; if `buildGannSquare` is not imported, add `import { buildGannSquare } from '../gannGrid';`):

```js
describe('buildLadder toPrice', () => {
  test('maps every level square through toPrice when given', () => {
    const grid = buildGannSquare(3099, 152);
    const centre = { row: (grid.dimension - 1) / 2, col: (grid.dimension - 1) / 2 };
    const toPrice = (square) => 0.1 + (square - 1) * 0.1;
    const levels = buildLadder({ grid, crossCentre: centre, source: 'center', toPrice });
    expect(levels.length).toBeGreaterThan(0);
    levels.forEach((l) => expect(l.price).toBeCloseTo(toPrice(l.square), 9));
  });

  test('defaults to square / scale when toPrice is absent', () => {
    const grid = buildGannSquare(3099, 152);
    const centre = { row: (grid.dimension - 1) / 2, col: (grid.dimension - 1) / 2 };
    const levels = buildLadder({ grid, crossCentre: centre, source: 'center', scale: 10 });
    levels.forEach((l) => expect(l.price).toBeCloseTo(l.square / 10, 9));
  });
});
```

- [ ] **Step 2: Run to verify the first test fails**

Run: `npx jest utils/__tests__/gannLevels.test.js`
Expected: the `toPrice` test FAILS (prices are `square / 1`). All other tests pass.

- [ ] **Step 3: Implement**

In `utils/gannLevels.js`, in the JSDoc above `buildLadder`, add after the `options.scale` line:

```js
 * @param {(square:number)=>number} [options.toPrice] - square -> price;
 *   defaults to square / scale
```

Change the destructured parameters by adding `toPrice = (square) => square / scale,` directly after `scale = 1,`. Then change the two `price:` lines in the function body:
- `price: cell.value / scale,` becomes `price: toPrice(cell.value),`
- `price: square / scale,` becomes `price: toPrice(square),`

- [ ] **Step 4: Run to verify**

Run: `npx jest`
Expected: PASS, with every existing test unchanged.

- [ ] **Step 5: Commit**

```bash
git add utils/gannLevels.js utils/__tests__/gannLevels.test.js
git commit -m "feat: buildLadder takes a toPrice mapping"
```

### Task 3: Chart component props

**Files:**
- Modify: `components/GannSquareChart.js`

No unit tests (Jest runs in node with no DOM). Check with `npx next build` (or `npx next lint` if the build is too slow) and in Task 4's browser check.

- [ ] **Step 1: Imports**

After the `import { fitView, ... } from '../utils/gannView';` line, add:

```js
import { cellValue, findCell } from '../utils/gannzillaGrid';
```

- [ ] **Step 2: Add a label formatter** below `const cellKey = ...`:

```js
/** A cell's displayed number: whole numbers stay whole, decimals keep at most 4 places. */
const formatCell = (v) => String(Math.round(v * 10000) / 10000);
```

- [ ] **Step 3: Props.** In the component's parameter list, replace `priceScale = 1,` with:

```js
  gridValue = 1,
  gridIncrement = 1,
  clockwise = true,
  findValue = null,
```

Directly after the `const panStart = useRef(...)` line, add:

```js
  const grid = useMemo(
    () => ({ value: gridValue, increment: gridIncrement }),
    [gridValue, gridIncrement]
  );
  const toPrice = useCallback((square) => cellValue(square, grid), [grid]);
  // Gannzilla's Find box: the cell with the largest value <= findValue.
  const findIndex = findValue == null ? null : findCell(findValue, grid);
```

- [ ] **Step 4: Ladder prices.** In the `ladders` useMemo, replace each of the three `scale: priceScale,` lines with `toPrice,`, and replace `priceScale` in that useMemo's dependency array with `toPrice`.

- [ ] **Step 5: Reported levels show cell values.** In the `onLevelsChange` effect, change the four `.map((l) => l.value)` calls to `.map((l) => formatCell(toPrice(l.value)))`, and add `toPrice` to that effect's dependency array.

- [ ] **Step 6: Mirror for anticlockwise.** At the top of the draw effect, directly after `ctx.scale(view.zoom, view.zoom);`, add:

```js
    // Anticlockwise is Gannzilla's left-right mirror of the same spiral.
    const colX = (col) => (clockwise ? col : dimension - 1 - col) * cellSize;
```

Then:
- in `drawCross`, change `const cx = position.col * cellSize + cellSize / 2;` to `const cx = colX(position.col) + cellSize / 2;`
- in the cell loop, change `const x = col * cellSize;` to `const x = colX(col);`

The visible-range culling still works: mirroring a full-width range of columns keeps the same set of on-screen columns only when the view is centred. To stay correct when panned, change the column loop bounds in the cell loop from `range.colStart … range.colEnd` to iterate **all** columns when `!clockwise`:

```js
    const colFrom = clockwise ? range.colStart : 0;
    const colTo = clockwise ? range.colEnd : dimension - 1;
```

and use `colFrom` / `colTo` in the `for (let col = ...)` header of the cell loop. (Grid lines are symmetric and need no change.)

- [ ] **Step 7: Labels, centre, and Find highlight.** In the cell loop:
- after the target-square block (`if (row === sunGrid.targetPosition.row && ...) { ... }`), add:

```js
        if (findIndex !== null && value === findIndex) {
          ctx.strokeStyle = COLORS.find;
          ctx.lineWidth = 4 / view.zoom;
          ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
```

- replace `ctx.fillText(String(value), x + cellSize / 2, y + cellSize / 2);` with `ctx.fillText(formatCell(toPrice(value)), x + cellSize / 2, y + cellSize / 2);`

Add `find: 'rgba(20, 20, 20, 0.95)',` to `COLORS`, and add `clockwise, toPrice, findIndex` to the draw effect's dependency array.

- [ ] **Step 8: Legend.** Change the label `"Center (1)"` to `` {`Center (${formatCell(gridValue)})`} `` (as a JSX expression: `label={`Center (${formatCell(gridValue)})`}`), and after the "Price square" swatch add:

```jsx
        {findIndex !== null && <Swatch color="transparent" border={COLORS.find} label="Find" />}
```

- [ ] **Step 9: Check it compiles**

Run: `npx next lint --file components/GannSquareChart.js` then `npx jest`.
Expected: no new lint errors in this file; all tests pass.

- [ ] **Step 10: Commit**

```bash
git add components/GannSquareChart.js
git commit -m "feat: Gann chart shows Value/Increment cell numbers, mirrors for anticlockwise, highlights Find"
```

### Task 4: Page controls

**Files:**
- Modify: `pages/gann-chart-test.js`

- [ ] **Step 1: State.** Replace the comment and `const [multiplyBy10, setMultiplyBy10] = useState(true);` with:

```js
  // Gannzilla's grid: the centre cell shows Value and each step adds
  // Increment. 0.1 / 0.1 is the old "x10 on"; 1 / 1 is the old "x10 off".
  // Which reads better is judged per ticker by eye, so it stays a manual choice.
  const [gridValue, setGridValue] = useState(0.1);
  const [gridIncrement, setGridIncrement] = useState(0.1);
  const [clockwise, setClockwise] = useState(true);
  const [findInput, setFindInput] = useState('');
```

Add `import { nearestCell } from '../utils/gannzillaGrid';` with the other imports.

- [ ] **Step 2: Price square.** Replace the two lines starting `const priceScale =` and `const targetNumber =` (and their comment) with:

```js
  // Price -> grid square: the cell whose value is nearest the price.
  const gridOptions = { value: gridValue, increment: gridIncrement };
  const targetNumber =
    nearestCell(levelsData ? levelsData.price : 81, gridOptions) ?? 1;
  const findValue = findInput.trim() === '' ? null : Number(findInput);
```

- [ ] **Step 3: Controls.** Replace the whole `multiplyBy10` `form-check` div (input + label) with:

```jsx
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="clockwise"
                         checked={clockwise} onChange={(e) => setClockwise(e.target.checked)} />
                  <label className="form-check-label" htmlFor="clockwise">Clockwise</label>
                </div>
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="gridValue" style={{ width: '4.5rem' }}>
                    Value
                  </label>
                  <input type="number" step="any" id="gridValue" className="form-control form-control-sm"
                         value={gridValue}
                         onChange={(e) => setGridValue(Number(e.target.value))} />
                </div>
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="gridIncrement" style={{ width: '4.5rem' }}>
                    Increment
                  </label>
                  <input type="number" step="any" min="0" id="gridIncrement"
                         className="form-control form-control-sm"
                         value={gridIncrement}
                         onChange={(e) => setGridIncrement(Number(e.target.value))} />
                </div>
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="findInput" style={{ width: '4.5rem' }}>
                    Find
                  </label>
                  <input type="number" step="any" id="findInput" className="form-control form-control-sm"
                         placeholder="price" value={findInput}
                         onChange={(e) => setFindInput(e.target.value)} />
                </div>
```

- [ ] **Step 4: Status line.** Replace `→ square {targetNumber}{multiplyBy10 ? ' (×10)' : ''}` with:

```jsx
                        → square {targetNumber} (Value {gridValue}, Increment {gridIncrement})
```

- [ ] **Step 5: Chart props.** In `<GannSquareChart ... />` replace `priceScale={priceScale}` with:

```jsx
          gridValue={gridValue}
          gridIncrement={gridIncrement}
          clockwise={clockwise}
          findValue={findValue}
```

- [ ] **Step 6: Check nothing else uses the old names**

Run: `grep -n "priceScale\|multiplyBy10" pages components utils -r`
Expected: no matches.

- [ ] **Step 7: Lint, tests, and a browser check**

Run: `npx next lint --file pages/gann-chart-test.js` and `npx jest`. Both are clean.
Start the dev server (`npm run dev`), open `/gann-chart-test`, and confirm:
- the default view (Value 0.1, Increment 0.1) shows the same levels and ladder as before, but cells read as prices (e.g. 309.9 instead of 3099);
- Value 1, Increment 1 shows whole numbers like the old "×10 off";
- turning Clockwise off mirrors the grid (2 moves to the right of the centre);
- typing a price in Find outlines one cell, the largest value at or below it.

- [ ] **Step 8: Commit**

```bash
git add pages/gann-chart-test.js
git commit -m "feat: Value/Increment/Clockwise/Find controls replace the x10 switch"
```

## Done when

- `npx jest` passes (Plan 1 tests plus the new `nearestCell` and `toPrice` tests). Existing gannGrid/gannLevels/gannView tests are unchanged.
- With the default Value 0.1 and Increment 0.1, the Sun/Moon levels and ladder **squares** are identical to before this plan. Prices are shown instead of squares.
- Clockwise, Value/Increment and Find behave as in the Task 4 browser check.
