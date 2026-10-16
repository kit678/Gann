# Gannzilla Pro v8.3: black-box findings (2026-10-15)

Method: I drove the desktop app with computer use. I only typed inputs and read the outputs, and never opened the program's files.
All tests ran on a new chart called "ClaudeTest". The user's Default chart was left as it was.
Screenshots are in `notes/gannzilla_blackbox/` and are cited as `[NN]`.
Each finding below answers an open question from `notes/gannzilla_docs_extract.md` §4.

## Corrections to the plan

1. **Δ = (radix − transit) mod 360.** It is NOT transit − radix. [04]
   - Example: radix 15.10.2026 vs transit 01.01.2000. Moon 254 − 220 = 34, Jupiter 142 − 25 = 117, Sun 202 − 280 → 282.
   - The docs extract's planet table has radix and transit swapped. The guide's prose ("Jupiter radix at 25") was right.
   - The fixture numbers still hold if the radix and transit columns are swapped.
2. **The Market column honours ×/÷.** The rule is:
   - `P' = price × mult ÷ div`
   - `level = (floor(P'/360)·360 + lon) × div ÷ mult`
   - Dow 11497.10 at ×10 [06]: Sun 11512.0 = (114840 + 280.08)/10, Jupiter 11486.5, Eris 11485.9. At ×1 it matches the guide exactly [05].
   - The ▲ green / ▼ red marks show whether the level is above or below the price.
3. **Find rounds down.** It marks the largest cell value ≤ the target. [02]
   - Value 1, Inc 3: Find 5 → 4, Find 6 → 4, Find 6.99 → 4, Find 9.5 → 7, Find 7 → 7.
   - A comma decimal ("6,99") is rejected and nothing is marked. A '.' decimal works.

## Confirmed (matches the plan)

- **Grid:** 2 sits west of 1, the spiral runs clockwise, and odd squares lie on the lower-left diagonal. This is identical to `utils/gannGrid.js`.
- **Clockwise off** is a pure left-right mirror: 2 east, 3 upper-right, 9 lower-right. [01]
- **Cell value** = Value + (n−1)·Increment. Value 1, Inc 3 shows 1, 4, 7, 10 … [02]
- **Planets** for 01.01.2000 00:00 New York match the guide's table to 0.1°. Ceres and Eris are included.
- **Summary and Average** with all 12 bodies: 318.4° and 206.5° (transit 2000). Average is a plain linear mean. The default Summary set on this chart is all 12 bodies.
- **Aspect defaults:** Conjunction orb 5°, and 1° for Semisextile, Semisquare, Sextile, Quadrature, Trine, Sesquisquare, Quincunx and Opposition. [03]
- **Projections:** a body's icon sits on the cell whose number is its whole-degree longitude (Sun 202° → cell 202).

## New facts

- **Time zone:** the time you type is local to the chosen city, using a **fixed standard offset with no daylight saving**.
  - London vs New York at 00:00: Moon 217.3° vs 219.8°, about 5 h of Moon motion. [07]
  - The moon-phase strip for 15.10.2026 (New York) reads 10 Oct 10:49, 14 Oct 08:15, 18 Oct 11:13, 22 Oct 10:21 and 25 Oct 23:10. pyswisseph gives 15:50, 13:15, 16:13, 15:20 UTC and 26 Oct 04:12 UTC. Every one is exactly UTC−5, although October is EDT (UTC−4).
- **Moon strip:** 5 octant phases (every 45° of Sun–Moon elongation), then the next solar eclipse (6 Feb 2027 10:54) and the next lunar eclipse (31 Dec 2028 11:47).
- **Cycles** solve for the ruler's longitude reaching base ± k·360/n.
  - Sun Tetragram forward from 15 Oct 2026: 12 Jan, 12 Apr and 14 Jul 2027.
  - Mars Tetragram forward: 17 Sep 2027, 16 Jan 2028 and 11 May 2028 [08]. pyswisseph gives 16 Sep 2027 (UTC), 16 Jan 2028 and 11 May 2028.
  - What happens when a retrograde planet crosses a target three times is still untested.
- **Protractor and Chronometer angles:**
  - Clockwise on: 0° at west, increasing clockwise. Clockwise off: 0° at east, increasing anticlockwise. [09, 10]
  - `Angle` rotates the scale in its own direction of travel. With Angle 90, 0° moves to the top in both modes. [11, 12]
  - So a label at d sits at screen direction `zero + (d + Angle)` measured along the travel direction, where zero is west (clockwise on) or east (clockwise off).
- **Chronometer:**
  - Annual: Sun longitude, 0° = 21 Mar (west). [09]
  - Daily: 24 h = 360°, 15° per hour, with 06:00 at 0° (west), 12:00 at the top and 18:00 east. The red triangle marks the current local time. [13]
- **Hiding the Cosmogram** also hides the moon strip and the cycle wheels, which are its sub-modules.
- **Each View keeps its own settings.** Circle of 12 had Size 15 and Fill Levels, while Square of 9 had Size 10 and Fill Cross.

## Other layouts

Positions use x to the right, y down, and 1 at the centre unless stated.

- **Square of 4** [14]: an even spiral with a 2×2 core.
  - The core is 1 (0,0), 2 (1,0), 3 (1,1), 4 (0,1).
  - Ring k ≥ 2 holds cells (2k−2)²+1 … (2k)². It starts at (−(k−1), 0), climbs to (−(k−1), −(k−1)), then runs right to x = k, down to y = k, left to x = −(k−1), and up to (−(k−1), 1).
  - Even squares 4, 16, 36 … 400 lie on the row y = 1, running left.
  - Size 10 gives a 20×20 grid.
- **Circle of 12 / 24 / 36** [15–17]:
  - N equal slices, with N cells per ring. Ring r holds N(r−1)+1 … Nr.
  - Cell 1 is in the slice just above west, and numbering runs clockwise.
  - So slice k is centred at `180° − (k − 0.5)·360/N` in standard maths angles.
- **Permanent square** [18]: a Size×Size table filled column by column, top to bottom (1–10 is the first column).
- **Tetragon** [19]: a diamond spiral on a square lattice.
  - Ring k is the cells at Manhattan distance k (4k cells).
  - The ring starts at (−(k−1), −1) and runs clockwise through N, E and S, ending at west (−k, 0).
  - The west row holds the centred square numbers 1, 5, 13, 25, 41.
- **Pentagon** [20]: ring k has 5k cells and ends at the west vertex. The west row holds 1, 6, 16, 31 (centred pentagonal numbers).
  - Hexagon, Heptagon and Octagon follow the same rule with 6k, 7k and 8k cells. Checked on screen in a second run (2026-10-15).
    - Hexagon ring 1 is 2 upper-left, 3 upper-right, 4 east, 5 lower-right, 6 lower-left, 7 west. Ring 2 runs 8–19 and ends west.
    - This matches Gann's own Hexagon Chart text: 7, 19, 37 … 397 lie on one line, and 2, 9, 22, 41 … 342 lie on the line 60° from it.
    - Heptagon ring 1 ends at 8 (west). Octagon ring 1 runs 2 (north-west) … 9 (west), and ring 2 ends at 25 (west).

## Figures (black-box run 2, 2026-10-15)

Tested on the "ClaudeTest" chart, Square of 9 Size 5. The user's Default chart was not changed.

- **Size:** polygons and Vectors reach the grid's corners. Their radius is half the grid's *diagonal*, not half its side. A Square at 0 touches the corner cells' circle.
- **Show highlight** fills the polygon with a see-through colour. It does not pick out a set of cells. With it off, only the outline is drawn.
- **Locator:** the bear end sits at the Angle (clockwise from west) and the bull end is opposite. Angle 30 puts the bear at the upper left.
- **Vectors, Clockwise off:** this is *not* a left-right mirror. The base line stays where Angle puts it (clockwise from west). Only the rays turn the other way, so each ray sits at Angle − value.
  - Base 30, ray 23.6 sits 6.4° above west.
  - Base 0, ray 100 points almost south.
- **Figures ignore the Cosmogram's Angle and Clockwise.** With the Cosmogram at Angle 90, the zodiac turns but a Triangle at 0 still points west.
- **Vortex:** two golden spirals, the bull in green and the bear in pink, winding opposite ways, plus 8 grey axes every 45° from its Angle.
  - **Radius:** scales both spirals linearly. Radius 2 doubles them.
  - **Size at Radius 1:** the outermost loop reaches about 10 cells.
  - **Price:** the cell the Vortex is centred on. Price 9 moves it to cell 9.
  - **Approximate:** the exact radii where the spirals cross the axes could not be read precisely, so GannSq9 models them as r = 10·Radius·φ^(−t/90°), measured inward from the Angle.

## Data types: Date and Time grids (black-box run 3, 2026-10-15)

Tested on the "ClaudeTest" chart, Square of 9 Size 5.

- **Options:** Price, Date, Time, Price and date, Price and time.
- **Date:** the settings are Today, Value (start date), Find (a date), Increment with a unit (Day, Week, Month, Year), Show trading days, Format, and a Holidays list (empty by default; Visible plus Add).
  - Cell n shows start + (n−1) × increment. Cell 1 is 15.10, cell 2 is 16.10, and so on.
  - The formats are dd.mm (default), dd.mm.yy, dd.mm.yyyy and d mmm.
  - **Show trading days** skips Saturdays and Sundays: 15.10 (Thu), 16.10 (Fri), then 19.10 (Mon).
  - The Holidays list is assumed to be extra days skipped in trading-days mode. Its exact use was not tested.
- **Time:** the settings are Now, Value (start date and time), Find, Increment with a unit (Minute, Hour), Show trading days, Format (for the date line), Session (Visible, Start 09:00, End 18:00), and Holidays.
  - Each cell shows HH:mm with the date (dd.mm) under it.
  - **Session on:** times stay inside [start, end], with both ends included. 09:00, 10:00 … 18:00 is 10 cells per day, then the next day starts at 09:00. A start value before the session (00:00) snaps forward to 09:00.
- **Price and date / Price and time:** both sets of settings are shown, and each cell shows the price value with the date (or time) under it.
- **Vortex:** its Price field becomes a Date (or Time) in these modes.
