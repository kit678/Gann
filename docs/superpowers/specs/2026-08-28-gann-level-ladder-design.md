# Gann Level Ladder — Design

Date: 2026-08-28
Status: approved, not yet implemented
Scope: Phase 1 of three (see "Roadmap")

## Purpose

Produce a complete, labeled set of Gann Square-of-9 price levels for a given
instrument at a given instant, from three independent crosses. The output is
consumed later by an event logger (Phase 2) and by statistical/ML analysis
(Phase 3), so every level must carry enough provenance to be grouped and
filtered after the fact.

This phase produces levels only. It does not predict, score, or rank them.

## Background: the observed model

The theory below is the user's own market observation. It is recorded here as
the specification's premise, not as an established result. Phase 3 exists
precisely to test which parts of it hold.

### Odd squares as cycle boundaries

Odd squares (1, 9, 25, 49, 81, 121, 169, 225, 289, 361 …) lie exactly on one
diagonal of the spiral. Verified against the implementation: the odd square
`(2m+1)^2` sits at `(row-centre, col-centre) = (m, -m)`. So 9 is at `(1,-1)`,
25 at `(2,-2)`, 361 at `(9,-9)`.

The gap between consecutive odd squares is always a multiple of 8:

    (2k+1)^2 - (2k-1)^2 = 8k

So the band from `(2k-1)^2` to `(2k+1)^2` spans `8k` squares, and one eighth of
it is exactly `k` squares. This document calls that band **ring k**. Ring 3
runs 25 → 49, gap 24, and each 45° step is 3.

> **Two senses of "ring" — do not confuse them.** Ring `k` above is a *band of
> values* between consecutive odd squares. It is not the same as a cell's
> geometric distance from the grid centre. Square 361 sits 9 cells out
> geometrically, but *begins* value-ring 10, because `361 = (2·10-1)^2`.
> Throughout this spec and the `ring` field, **ring always means the value
> band**, never the cell distance.

`361 = 19^2` sits 360 squares along the spiral from the centre. A full
360-square traverse returns to the odd-square diagonal. This is why the default
zero-degree offset places 0° on square 361 (see `ZERO_DEGREE_PRESETS` in
`utils/gannGrid.js`).

### The eight major marks

A cross has eight arms. Every square lying on a cross sits on exactly one of
them, and that arm is the square's angle relative to that cross's centre.

For the **centre cross**, one spiral revolution crosses each arm exactly once,
so a revolution yields eight marks in clean angular order. Verified for ring 3:

| Degree | 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315 | 360 |
|---|---|---|---|---|---|---|---|---|---|
| Square | 25 | 28 | 31 | 34 | 37 | 40 | 43 | 46 | 49 |

**This regularity does not carry over to the Sun and Moon crosses.** A spiral
revolution is a ring around the grid's centre, so it only tiles evenly against
a cross that shares that centre. Measured mark counts per revolution for
off-centre crosses ran 5, 12, 8, 2, 11, 16 across successive rings — not 8.

The arm angle itself remains well defined for every mark on every cross, since
it depends only on the offset between the mark and its own cross centre. So
angle labelling is universal; even *spacing* is not. Ladders are therefore
sized by mark count, not by revolutions.

### The eight sub-levels

Each gap between consecutive major marks divides linearly into eight parts.
For 25 → 28 the step is `(28 - 25) / 8 = 0.375`:

    25.375, 25.75, 26.125, 26.5, 26.875, 27.25, 27.625, 28.0

The 4th sub-level is the halfway point of the segment. The 8th is the next
major mark.

### Observed movement proclivities (hypotheses, not rules)

Recorded for Phase 3 testing. **Not implemented in Phase 1.**

- Once a level is breached, the next level in sequence becomes the anticipated
  target.
- Within a segment the progression tends to double: 1st → 2nd → 4th (halfway)
  → 8th (the next major mark).
- Across major marks the progression also doubles: 45° → 90° → 180° → 360°.
- Intermediate levels that were skipped still act as support and resistance.
- None of this is claimed to be deterministic. Frequency and conditioning are
  what Phase 3 must measure.

## The unified rule

All three crosses obey the same two-step construction:

1. **Major marks** are the numbers physically lying on that cross, found by
   walking the spiral outward and inward from the price's square.
2. **Sub-levels** are each consecutive gap divided linearly into eight.

### The straddling segment

The price almost never sits exactly on a major mark. It sits *between* the
nearest mark below and the nearest mark above. That straddling segment is the
one the price is actually trading inside, so it is the most important segment
in the ladder and must not be skipped.

To guarantee that, `buildLadder` merges the marks into a single ascending list
— `down` reversed, then `up` — and subdivides **every** consecutive pair in
that merged list. The pair `(down[0], up[0])` is the straddling segment and is
subdivided like any other.

Marks are collected separately as `up` and `down` only because the spiral walk
runs in two directions from the price. Once collected, direction is no longer
how they are grouped.

For the centre cross this reproduces the closed-form arithmetic above, because
the centre cross's marks are exactly `lo, lo + k, lo + 2k, …`. For the Sun and
Moon crosses the same walk yields different numbers, since those crosses are
centred on the body's degree square rather than on 1. One engine therefore
serves all three; only the cross centre differs.

## The three crosses

| Source | Cross centre | Moves over time |
|---|---|---|
| `center` | square 1, grid centre | Never |
| `sun` | the Sun's degree square | ~1°/day |
| `moon` | the Moon's degree square | ~13°/day, ~1.8h per degree |

The Sun and Moon centres already come from `buildGannSquare(target, body)`.
The centre cross needs no body lookup; its centre is the grid centre.

## Price scaling

A price becomes a grid square by multiplying by a per-ticker scale and
rounding. The scale is 10 or 1, chosen by eye per instrument, because some
instruments' levels read better unscaled. AAPL uses 10.

Conversion back out is `square / scale`, and must preserve fractions: a
sub-level at square 26.5 with scale 10 is a price of 2.65.

The scale is currently a UI checkbox (`multiplyBy10`). Persisting it per ticker
is out of scope here.

## Module: `utils/gannLevels.js`

Pure functions, no React, mirroring the existing `utils/gannGrid.js` and
`utils/gannView.js` split.

### `crossMarks(grid, crossCentre, targetPosition, count)`

Walks `grid.positionSequence` outward and inward from `targetPosition`,
collecting cells that lie on the cross through `crossCentre`. Reuses the same
row/column/diagonal test that `findLevels` already uses.

Returns `{ up: Cell[], down: Cell[] }`, each holding up to `count` marks, or
fewer near the grid edge.

### `armDegree(cell, crossCentre)`

Returns which of the eight arms a cell sits on, as `0 | 45 | … | 315`. Returns
`null` for the cross's own centre cell (it is on all arms at once) and `null`
for any cell not on the cross at all. Derived purely from the row/column
offset, so it is valid for any cross centre.

Note it never returns `360`; a mark one full revolution out from a `0` mark is
itself labelled `0`. Angle identifies the *arm*, not the lap.

### `subdivide(lo, hi, parts = 8)`

Returns the `parts` division points of `[lo, hi]`, ending at `hi` — so the last
element equals `hi`. Pure arithmetic; no grid access.

`buildLadder` emits only sub-indices 1–7 as levels, dropping the 8th, because
the 8th is exactly the next major mark and would otherwise appear twice in the
ladder.

### `buildLadder(options)`

Combines the above into the labeled output. Options:

- `grid` — from `buildGannSquare`
- `crossCentre` — `{row, col}`
- `source` — `'center' | 'sun' | 'moon'`
- `scale` — 10 or 1
- `count` — major marks per direction, default 8 (one revolution's worth for
  the centre cross)

### Level shape

```js
{
  price: 2.65,          // square / scale
  square: 26.5,         // fractional for sub-levels
  source: 'center',     // which cross produced it
  kind: 'sub',          // 'major' | 'sub'
  degree: 0,            // 0/45/.../315 - the segment this level opens or sits in
  segmentStart: 25,     // major mark below
  segmentEnd: 28,       // major mark above
  subIndex: 4,          // 1..7; absent for majors
  isHalfway: true,      // subIndex === 4
  ring: 3,              // value-ring containing this level
  direction: 'up'       // this level vs the current price
}
```

`degree` for a major mark is its own arm angle, from `armDegree`. For a
sub-level it is the angle of the segment's opening mark, so sub-levels group
naturally under their segment.

`direction` compares the level's own `square` against the price's square:
`'up'` if above, `'down'` if below. It is **not** inherited from whether the
bounding mark came from the `up` or `down` walk. This matters for the
straddling segment, whose sub-levels fall on both sides of the price.

## Ring attribution

`ring` is the value band defined earlier: the `k` such that
`(2k-1)^2 <= square < (2k+1)^2`, i.e. `k = floor((sqrt(square) + 1) / 2)`.
Recorded on every level so Phase 3 can condition on ring size, since a ring's
width is `8k` and therefore grows linearly with `k`.

Worked boundaries: `1..8 → 1`, `9..24 → 2`, `25..48 → 3`, `49..80 → 4`,
`361..440 → 10`. Note an odd square always *opens* a ring rather than closing
the previous one.

Fractional sub-levels take the ring of the segment they sit in, which is the
ring of `segmentStart`. Do not recompute from a fractional square — a
sub-level just under a ring boundary would otherwise be attributed to the
wrong ring.

A cross's marks do not necessarily stay within one ring; `ring` is a property
of each individual level, not of the ladder.

## Display

A table under the existing chart on `pages/gann-chart-test.js`, listing the
ladder for whichever crosses are currently shown. Columns: price, square,
source, degree, sub-index, ring. Sorted by price descending so it reads like a
price axis, with the current price marked in place.

The mark count per direction is a numeric input, defaulting to 8.

This is for eyeballing correctness. It is not the analysis surface.

## Testing

Unit tests in `utils/__tests__/gannLevels.test.js`:

- The worked example: centre cross, ring 3, must yield majors
  `25, 28, 31, 34, 37, 40, 43, 46, 49`.
- The worked example's sub-levels for 25 → 28 must be
  `25.375, 25.75, 26.125, 26.5, 26.875, 27.25, 27.625, 28`.
- `subdivide` returns exactly 8 points and ends at `hi`.
- `buildLadder` emits sub-indices 1–7 only; no level appears twice, and no
  major mark is duplicated by an 8th sub-level.
- Ring attribution: 25 → ring 3, 24 → ring 2, 49 → ring 4, 1 → ring 1,
  8 → ring 1, 9 → ring 2, 361 → ring 10, 360 → ring 9.
- A fractional sub-level just below a ring boundary takes its segment's ring,
  not the ring its own fractional value would imply.
- `armDegree` on the centre cross labels ring 3 as
  `25→0, 28→45, 31→90, 34→135, 37→180, 40→225, 43→270, 46→315, 49→0`.
- `armDegree` returns `null` for the cross's own centre cell.
- A `count` of 8 yields 8 majors per direction on a grid with room for them,
  for both a centred and an off-centre cross.
- The segment straddling the price is subdivided: given a price between two
  marks, the ladder contains sub-levels both above and below it, all tagged
  with `segmentStart`/`segmentEnd` equal to those two marks.
- Those straddling sub-levels carry `direction` per their own value, so the set
  contains both `'up'` and `'down'` entries from a single segment.
- Sun and Moon crosses at different degrees produce different ladders.
- Sun and Moon at the same degree produce identical ladders.
- An off-centre cross produces unevenly spaced majors; the ladder still
  subdivides each gap into its own eighths rather than assuming a shared step.
- Scale 10 vs 1 changes `price` but not `square`.
- Fractional sub-levels survive the scale conversion without rounding to
  integers.
- Near the grid edge the ladder returns fewer marks rather than throwing.

## Out of scope

- Any prediction, target-chain, or scoring logic.
- Historical bar data, breach detection, event logging (Phase 2).
- Feature engineering or models (Phase 3).
- Per-ticker persistence of the scale setting.
- Planetary bodies beyond Sun and Moon.

## Roadmap

1. **Level engine** — this document.
2. **Event logger** — walk historical bars, record every level interaction
   under configurable breach rules. The existing angular-coverage work in
   `C:\Dev\GannTesting` already has a `breach_mode` of `'wick' | 'close'`, a
   successive-closes confirmation, and a reversal case for crossings that fail
   to confirm. Phase 2 should reuse that event vocabulary rather than invent a
   parallel one, so both strategies produce comparable datasets. What
   constitutes a valid breach is itself a question to be mined, so the logger
   must record the raw interaction and let the definition be applied later.
3. **Mining** — features, correlations, models, and testing the movement
   proclivities recorded above.
