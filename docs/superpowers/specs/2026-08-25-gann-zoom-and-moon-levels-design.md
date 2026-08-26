# Gann Chart: Grid Zoom + Moon Levels — Design

Date: 2026-08-25
Status: Approved for planning
Affects: `pages/gann-chart-test.js`, `components/GannSquareChart.js`, `backend/app/utils/ephemeris.py`, `backend/app/api/endpoints.py`, `backend/app/utils/levels_calculator.py`

## Background

The Gann chart page renders a spiral number grid ("Square of 9"). A target square is derived
from the instrument price, and support/resistance levels are read off the squares that fall on
an eight-direction cross drawn through the Sun's square.

Two facts about the current code drive this design:

1. **The canvas is allocated at full grid size.** `canvas.width = dimension * cellSize`, so a
   63x63 grid at 40px cells produces a 2520x2580 pixel canvas inside an `overflow:hidden`
   window. Navigation is therefore dragging a large image through a small viewport.

2. **Displayed levels are computed in the browser, not the API.** `GannSquareChart` walks the
   spiral itself (`isOnBlueAxis`, `components/GannSquareChart.js:201`) to find level squares.
   The backend `/api/levels/{ticker}` computes levels using different math and its numbers are
   not rendered anywhere on this page.

## Goals

- Zoom the number grid in and out so the whole structure can be seen at once.
- Compute and display a second, independent set of levels driven by the Moon's position.
- Make the celestial calculation time-accurate, and refresh levels when a body changes degree.

## Non-goals

- Reconciling the two competing level calculations (frontend vs backend). Out of scope; see
  Open Issues.
- Changing the Square of 9 level-finding method itself. Sun output must remain identical.
- Bodies other than Sun and Moon.

---

## Part A — Grid zoom

Sequenced first: it restructures rendering, so Moon drawing should be written once against the
new renderer rather than migrated.

### Approach

Replace the full-size canvas with a viewport-sized canvas plus a pan/zoom transform.

- Canvas dimensions track the container (roughly 900x700), not the grid.
- Drawing applies `ctx.translate(pan.x, pan.y)` then `ctx.scale(zoom, zoom)`.
- Effective cell size on screen is `cellSize * zoom`. `cellSize` stays the base unit.

### Controls

| Control | Behaviour |
| --- | --- |
| Mouse wheel | Zoom toward the cursor position (cursor stays anchored to the same square) |
| `+` / `-` buttons | Step zoom by a fixed factor (1.2x per press) about the viewport centre |
| **Fit** button | Set zoom and pan so the entire grid is framed |
| Drag | Pan (existing behaviour, adapted to the transform) |

Zoom range clamps to `0.05x` – `4x`. **Fit** is the view on first load; when it re-runs
automatically thereafter is defined below.

### View persistence

Pan and zoom persist across re-renders. **Fit** runs automatically only when the grid
*dimension* changes (a new ticker or price producing a differently sized grid) — never on a
level recalculation.

This matters because of Part C: the Moon changes degree roughly every 1.8 hours, which triggers
a recalculation. If that reset the view, a user studying a zoomed-in region would be thrown back
to full-grid view several times per session.

### Performance

Measured grid sizes (`target = round(price * 10)`, dimension from the existing ring formula):

| Instrument | Target | Grid | Cells | Spiral build |
| --- | --- | --- | --- | --- |
| NVDA @ $180 | 1,800 | 51x51 | 2,601 | <1 ms |
| AAPL @ $309 | 3,099 | 63x63 | 3,969 | 1 ms |
| BTC @ $95,000 | 950,000 | 983x983 | 966,289 | 55 ms |

Building the spiral is not the bottleneck even at ~1M cells. **Drawing is** — the current draw
loop iterates every cell in the grid on every repaint, and additionally does an
`Array.some()` scan over the level list per cell.

- **Culling:** derive the visible row/column range from the current pan and zoom, and iterate
  only those cells. Keeps redraw cost tied to viewport area, not grid area. This is what makes
  zoom viable on large grids.
- **Level lookup:** replace the per-cell `Array.some()` scan with a `Set` of `"row,col"` keys
  built once per render.
- **Text suppression:** skip drawing cell numbers when `cellSize * zoom < 14`. They are
  illegible at that size and dominate draw time.
- Redraw is driven by `requestAnimationFrame` during drag/zoom to avoid redundant paints.
- **Guard:** above 4M cells refuse to build and show an explanatory message rather than freezing
  the tab. Measured, that threshold falls at roughly a **$397,000** instrument price:
  $95,000 -> 966k cells (allowed), $200,000 -> 2.0M (allowed), $700,000 -> 7.0M (blocked).

### Legend

The legend currently draws inside the canvas at `y = size + N`, which assumes canvas height
tracks grid height. With a fixed viewport that no longer holds. Move the legend to HTML markup
below the canvas.

---

## Part B — Moon levels

### Backend

1. **Generalise the ephemeris helper.** `ephemeris.py` gains
   `calculate_body_position(body, when)` where `body` is `swe.SUN` or `swe.MOON`.
   `calculate_sun_position()` and a new `calculate_moon_position()` delegate to it. The returned
   dict keeps the existing shape (`angle`, `zodiac_sign`, `degrees_in_sign`, `longitude`,
   `julian_day`, `date`) so existing consumers are unaffected.

2. **New endpoint `GET /api/celestial`.** Accepts an optional `datetime` query parameter and
   returns both bodies:

   ```json
   {
     "datetime_utc": "2026-08-25T20:00:00Z",
     "datetime_et": "2026-08-25 16:00:00",
     "sun":  { "angle": 152.31, "zodiac_sign": "Virgo", "degrees_in_sign": 2.31, ... },
     "moon": { "angle": 309.27, "zodiac_sign": "Aquarius", "degrees_in_sign": 9.27, ... }
   }
   ```

   `GET /api/sun` is retained unchanged; `contexts/AppContext.js` still calls it.

3. **`/api/levels/{ticker}` accepts `datetime`** (ET, see Part C) in place of `date`, and
   includes `moon_position` alongside `sun_position` in its response. The existing `date`
   parameter remains accepted; its exact meaning is defined under Part C, Wire format.

### Frontend

1. **Extract level-finding into `utils/gannGrid.js`** as pure functions:

   - `buildGannSquare(targetNumber, bodyDegree, maxRings)` — spiral matrix + positions
   - `findLevels(positionSequence, targetPosition, bodyPosition, count)` — up/down level squares

   This extraction is required, not incidental: Part B must run the same logic twice (Sun and
   Moon) and the current implementation is a closure inside a `useEffect`. It also makes level
   output unit-testable for the first time.

2. **`GannSquareChart` props gain** `moonPosition`, `showSun`, `showMoon`. It calls
   `findLevels` once per visible body.

3. **Sun output must be byte-identical** to current behaviour after the extraction. This is the
   regression gate for Part B.

### Edge cases (both discovered by testing the current code)

**Zero degrees silently yields the wrong square.** `buildGannSquare` guards its inputs with
`sun = parseInt(sun) || 71`. Zero is falsy in JavaScript, so a body at 0.4 degrees rounds to `0`
and then becomes **71** — a completely unrelated square, drawn with no warning. Verified:

```
body at 0.4 deg   -> rounds to 0   -> guard yields 71   (wrong, silent)
body at 359.6 deg -> rounds to 360 -> guard yields 360  (correct)
```

The Moon crosses 0 degrees every ~27.3 days, so this would produce wrong Moon levels roughly
monthly. The Sun hits it once a year at the vernal equinox.

Fix: normalise a body degree to the range 1–360, mapping 0 to 360. That is correct on a circle
(0 and 360 are the same zodiac point) and 360 is a real square in the spiral, whereas 0 is not.
Replace the falsy-coalescing guard with an explicit `Number.isFinite` check so a genuinely
missing value is distinguishable from a legitimate zero.

**Sun and Moon can occupy the same square.** At new moon the two longitudes converge, so both
round to the same integer for roughly two hours each month. Their crosses then coincide exactly
and the two level sets are identical. Render this as a single square using a distinct
"conjunction" fill rather than letting silver paint over gold, and label it in the legend. The
levels summary should state that Sun and Moon levels coincide rather than printing the same
list twice.

### Colour scheme

Direction keeps its meaning; the body determines the style. This avoids inventing four new
colours and keeps overlaps readable.

| Element | Sun | Moon |
| --- | --- | --- |
| Body square | Gold `rgba(255,215,0,0.6)` (existing) | Silver `rgba(200,210,224,0.75)` |
| Body square when conjunct | Amber-violet `rgba(214,150,90,0.8)`, both glyphs | (same square) |
| Cross lines | Blue `rgba(0,100,255,0.5)` (existing) | Purple `rgba(160,80,220,0.55)` |
| Up levels | Green **fill** `rgba(0,200,0,0.4)` | Green **ring** (3px border, no fill) |
| Down levels | Red **fill** `rgba(255,0,0,0.4)` | Red **ring** (3px border, no fill) |

A square that is a Sun up-level and a Moon down-level renders as a green fill with a red ring.
Confluence (same square flagged by both bodies) is visually obvious.

The Sun square keeps its rayed glyph; the Moon square gets a crescent glyph.

### Controls

Two checkboxes, **Show Sun** and **Show Moon**, both on by default. Each hides that body's
square, cross lines, and level highlights. The levels summary below the chart splits into a Sun
row and a Moon row.

---

## Part C — Time accuracy and auto-recalculation

### Correctness fix (prerequisite)

`calculate_sun_position()` currently calls `datetime.datetime.now()` — a naive **local** time —
and passes it to `swe.calc_ut()`, which expects **Universal Time**. On the development machine
(UTC-6) this was measured to put the Moon **3.07 degrees** out of position, which is enough to
place it in a different square and yield wrong levels. The Sun error is roughly 0.25 degrees.

All ephemeris input must be converted to UTC before `swe.julday()`. This fix is a prerequisite
for Part B being meaningful.

### Time input

- The date control becomes **date + time**, labelled **ET**.
- Times are entered in `America/New_York` and converted to UTC server-side using `zoneinfo`
  (handles EDT/EST automatically). This matches the market the current tickers trade in and the
  session the closing price belongs to.
- Empty date/time means "now" (live mode).

**Wire format.** The `datetime` query parameter is `YYYY-MM-DDTHH:mm` with no offset suffix, and
is always interpreted as ET. An offset must not be supplied; if one is present the request is
rejected with 400 rather than silently reinterpreted. Responses echo both `datetime_et` and
`datetime_utc` so the conversion is auditable.

The existing `date` parameter (`YYYY-MM-DD`) remains accepted and now means **16:00 ET** on that
date — the closing bell, matching the closing price already returned for that day. Note this is
a behaviour change from the current implementation, which effectively used midnight in the
server's local timezone.

### Live auto-recalculation

Rate of change: the Sun crosses a whole degree roughly once per day; the Moon roughly every 1.8
hours. During one session the Moon typically shifts squares 3–4 times.

- In live mode, poll `GET /api/celestial` every **60 seconds**. This is a local computation with
  no external dependency, so it costs nothing and cannot be rate-limited.
- Compare `Math.round(angle)` for each body against the current value. If either changed, update
  state; the chart re-renders and levels recompute.
- If neither changed, do nothing — no redraw, no flicker.
- Polling is active only in live mode. A fixed date/time is static and is never polled.
- The poll timer is cleared on unmount and when switching to a fixed date/time.

### Price refresh

Price is fetched once per ticker or date/time change, and refreshed manually via **Go**. It is
deliberately not polled: the target square would shift continuously during the session so levels
would never settle, and repeated Yahoo Finance calls risk throttling.

---

## Data flow

```
[ticker, datetime?] ──> GET /api/levels/{ticker}?datetime=...
                          └─> price, sun_position, moon_position
                                    │
[60s timer, live only] ──> GET /api/celestial
                          └─> sun.angle, moon.angle ──(only if rounded degree changed)──┐
                                    │                                                   │
                                    v                                                   v
                        targetNumber = round(price * 10)                    sunDeg / moonDeg
                                    │                                                   │
                                    └───────────────> utils/gannGrid.js <───────────────┘
                                                        buildGannSquare
                                                        findLevels (x2)
                                                              │
                                                              v
                                                  GannSquareChart renders
                                                  (viewport canvas, pan/zoom)
```

## Error handling

- **Ticker or price fetch fails:** existing behaviour retained — inline error message, chart
  falls back to its default target, no crash.
- **`/api/celestial` poll fails:** fail silently and retain the last known positions. A transient
  poll failure must not clear the chart or surface an error banner; the next tick retries.
- **Invalid datetime:** backend returns 400 with a clear message; frontend shows it inline.
- **Body square not found in grid:** the grid already expands rings until the target and body
  are present. Extend the same guarantee to the Moon; if it still cannot be placed, hide that
  body's overlay and show a warning rather than rendering a partial cross.

## Testing

**Backend (pytest):**
- `calculate_body_position(MOON, <fixed UTC instant>)` equals a known longitude to within
  0.01 degrees. This is the concrete regression test for the UTC bug: if local time is passed
  where UT is expected, the assertion fails on any machine not running UTC.
- The same assertion for the Sun, so a future refactor cannot regress one body only.
- ET-to-UTC conversion is correct on both sides of a daylight-saving boundary (test a March and
  a November date, asserting the UTC offset differs).
- A `datetime` carrying an explicit offset is rejected with 400.
- `/api/celestial` returns both bodies; `/api/levels` includes `moon_position`.

**Frontend:**
- `findLevels` regression: for a fixed `(targetNumber, sunDegree)` the extracted function
  returns exactly the levels the current inline implementation produces. Capture the current
  output before refactoring and assert against those literals.
- `findLevels` with a Moon degree returns a different, correct set.
- Degree normalisation: input `0` resolves to square 360, not 71; input `360` stays 360;
  a missing/undefined degree still falls back to the default.
- Zoom maths: `Fit` frames the full grid; wheel-zoom keeps the square under the cursor fixed.
- View persistence: a level recalculation does not alter pan or zoom; a grid dimension change
  does re-fit.

**Manual:**
- Zoom in/out and Fit on a large grid (high-priced ticker) stays responsive.
- Toggling Show Sun / Show Moon hides the right elements.
- A square that is both a Sun and Moon level renders fill + ring correctly.

## Sequencing

1. **Correctness fixes** — the UTC bug (backend) and the zero-degree guard (frontend). Both are
   small, independently testable, and everything downstream is untrustworthy without them.
2. **Part A** — zoom, viewport rendering, culling, view persistence, HTML legend.
3. **`utils/gannGrid.js` extraction** — gated on the Sun regression test passing.
4. **Part B Moon** — backend `calculate_body_position` and `/api/celestial`, then frontend
   rendering including the conjunction case.
5. **Part C** — date+time input and 60-second polling.

Steps 1 and 2 are independent of each other and could run in parallel. Step 3 must precede
step 4. Step 5 depends on step 4 for the Moon half of the polling comparison.

## Open issues (not addressed here)

- `/api/levels/{ticker}` computes levels with different math than the chart, and its numbers are
  displayed nowhere. The two implementations will keep drifting. Worth deciding later whether the
  backend calculation should be removed, or made the single source of truth.
- `GannSquareChart.js` is ~800 lines. This design extracts level-finding; drawing and interaction
  remain together. Further decomposition may be warranted once zoom lands.
- Timezone is fixed to ET. Non-US instruments (crypto, Indian equities) would need a per-market
  timezone before their times are meaningful.
