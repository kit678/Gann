# Gannzilla user guide: structured extraction

Source: https://gannzilla.com/docs/ (fetched 2026-10-15). It is a third-party user guide, written by a user and not by the program's author ("Gannzilla Pro" window title).
The page text is short. Most parameter names, defaults and option lists appear only in the ~80 screenshots, so this extract draws on both.
Tags: **[text]** = the prose says it. **[shot]** = read off a screenshot. **[inferred]** = my arithmetic on screenshot values. Treat **[inferred]** items as hypotheses to confirm.

---

## 0. Global conventions (read these first)

- **Angle zero and direction (figures, grid, default wheels).** [shot + inferred] In the default chart, angle 0 sits at **west (9 o'clock)** and angles grow **clockwise on screen** (0 = W, 90 = N, 180 = E, 270 = S). Evidence:
  - The Vectors figure at base angle 0 draws 100° just past north, 161.8° just above east and 261.8° just east of south.
  - The Triangle at 0° has its apex at west.
  - A Vortex at angle 12 tilts its base line about 12° above west.
  - A Locator at 354 has its bear end slightly below west.
  - The Chronometer (annual) puts 21 Mar at west and 21 Jun at top.
- **The "Clockwise" checkbox appears to mirror the wheel.** [shot] A Protractor with Clockwise off and Angle 0 puts 0° at **east** and increases counter-clockwise (90 at top). A Cosmogram with Clockwise off and Angle 180 puts 0° Aries at west, with the signs running counter-clockwise (Aries lower-left, Cancer at the bottom). So "Angle" seems to rotate the zero point and "Clockwise" seems to flip the direction. The exact rule is still open (see section 4).
- **Grid spiral (Square of 9, Clockwise on).** [shot] Cell 1 is the centre. Cell 2 is directly **left** (west) of 1. The spiral then runs 3 upper-left, 4 up, 5 upper-right, 6 right, 7 lower-right, 8 down, 9 lower-left. Each new ring starts one step left of the previous ring's lower-left corner (10 left of 9, 26 left of 25, 50 left of 49).
  - Odd squares (1, 9, 25, 49, 81, ... 361) sit on the **lower-left** diagonal.
  - Corners of ring k: top-left 3, 13, 31, 57; top-right 5, 17, 37, 65; bottom-right 7, 21, 43, 73.
  - In the 19×19 default, 298 is due west, 316 due north, 334 due east and 352 due south.
- **Anticlockwise grid.** [shot] This is the mirror image: 2 is right of 1, 3 upper-right, 4 up, 5 upper-left, 6 left, 7 lower-left, 8 down, 9 lower-right, and 10 right of 9.
- **The Cosmogram marks cells by number, not by angle.** [shot] Venus at 327° on the wheel sits upper-left on the circle. The cell numbered 327 sits upper-right on the grid. The program does not try to make the two line up.

---

## 1. Modules: inputs, options, defaults, outputs

### 1.1 Menu bar / chart management [text]
- **Chart Active**: a drop-down list of saved charts ("Default" plus any the user creates).
  - Quirk: a new chart starts as a copy of the current settings, and later edits **save automatically** when you switch charts. To keep the Default chart intact, Add a new chart first, then edit it.
- **Add / Delete chart**: the toolbar buttons, or the Insert and Delete keys.
- **Rename / Copy chart**: F2. There is an option to create a copy.
- **Save screen image**: Ctrl+S. The image is saved into the same folder as the chart files.
- **Cursor**: returns to pointer mode after drawing.
- **Lines, Shapes, Label**: drawing tools. To delete a drawing, select it in pointer mode and press Delete.
- **Hide Tools**: shows or hides the two icon bars beside the main view.
  - Left bar: Circle of 12/24/36, Square of 4, Square of 9, "N" (Permanent square?), then polygon layouts.
  - Right bar: the figures (triangle, square, pentagon ... spiral/vortex).
- **Zoom**: keys -, + and * (* resets to 100%). Range is **50%–150%**.
- **Full screen**: F11 to enter, Esc to leave.
- **Connection settings**: F9. Fields: Use proxy (toggle), Type (HTTP...), Server, Port, Login, Password, plus Test / OK / Cancel. The guide says you do not need these when you are online.
- **Language selector**: "English" [shot].

### 1.2 Layout (SO9 and the other grids)
Parameters [shot, default chart]:

| Parameter | Default | Options / notes |
|---|---|---|
| Visible | on | Hides the grid, e.g. when you want only the cosmogram |
| Clockwise | on | Spiral direction (see section 0) |
| Size | 10 | Number of rings **including the centre**. Size 5 → 9×9 grid (1..81). Size 10 → 19×19 (1..361). In general the side is 2·Size−1 [shot + inferred] |
| View | Square of 9 | Circle of 12, Circle of 24, Circle of 36, Square of 4, Square of 9, Permanent square, Tetragon, Pentagon, Hexagon, Septagon, Octagon |
| Data type | Price | Price, Date, Time, Price and date, Price and time |
| Price → Value | 1 | The start (centre) value. It has < > steppers. If Data type is Date or Time, this becomes a date or time value |
| Price → Find | 1 | Type a value, then click the magnifier. That cell turns highlighted (black). Click the cell to clear it |
| Price → Increment | 1 | The step between cells. **Negative steps are allowed** (useful when the start value is a high) |
| Highlight → Visible | on | |
| Highlight → Fill | Cross | **Cross** shades the 8 rays (both cardinal and diagonal lines through the centre). **Levels** shades alternate rings (ring 1, ring 3, ...; the centre and even rings stay white) |
| Show marks | on | Hides marks without deleting them |
| Show numbers | off | Shows the plain 1×1 cell index (small, on top) above each value |

Outputs: a grid of cell values. Clicking a cell cycles its mark colour through High → Low → Forecast → Error (defaults: Pistachio, Salmon, Lemon, Asphalt). Right-click clears a cell's marks. F8 clears all marks.

Colours [shot]: Background White, Grid Ghost, Marker Cream, Layout Highlight Ghost, then the four mark colours above.

Quirk [text]: **shrinking Size erases the marks** on the rings that disappear. They do not come back when you enlarge the grid again.

### 1.3 Figures (overlays on the layout)
- Global: **Figures → Hide** checkbox [shot] toggles every figure the user has made visible.
- Figure list [shot]: Triangle, Square, Pentagon, Hexagon, Septagon, Octagon, Nonagon, Decagon, Hendecagon, Dodecagon, Vectors, Vortex. **Locator** is a separate item.
- Colours live under Colors → Figures.

**Locator** [text + shot]
- What it does: draws a straight "swing line" through the centre, with a bear icon on one end and a bull icon on the other.
- Inputs: Visible, Angle. The screenshot shows 354, with the bear end about 6° below west. You can also set the angle by dragging either icon.

**Triangle** (Square and the other polygons work the same way) [text + shot]
- Inputs: Visible, Show highlight, Angle (default 0°). You can also drag the base pointer to set the angle.
- Output: a polygon centred on cell 1, with its first vertex at the angle.
  - The triangle's other vertices are labelled "1/3" and "2/3" (i.e. +120° and +240°).
  - The highlight shades the cells inside the polygon.

**Vectors** [shot]
- Inputs: Visible, Clockwise (on), Angle (base, 0°), and Values (a list with "+ Add" for custom angles).
- Default values: **23.6°, 38.2°, 50°, 61.8°, 100°, 161.8°, 261.8°**. These are Fibonacci percentages used directly as **degrees**, measured from the base angle.
- Output: rays from the centre, each labelled with its value.

**Vortex** [text + shot]
- Inputs: Visible, Angle (0°), Trend (Bull trend / Bear trend / **Both**), Price, Radius.
  - Price = the start cell. Example: Price 3 → the spiral is centred on cell 3.
  - Radius example: 4. The units are not stated.
- Output: two logarithmic (Fibonacci) spirals, bull = Emerald and bear = Rose. It also draws a set of axes (Asphalt) through the centre at the base angle plus 45° steps.

### 1.4 Protractor [text + shot]
- Inputs and defaults:
  - Visible (on), Clockwise (**off**), Angle (0°; dragging the zero-line icon also sets it).
  - **Counter**: Visible (off), Start angle 0°, End angle 0°.
  - **Secondary scale**: Visible (off), Reverse (on), Angle 180°.
  - **Marker**: Visible (off), Angle 0°.
- Outputs:
  - A 0–360° ring with 10° labels, plus an inner grey ring of 5°-offset labels (5°, 15°, ...).
  - An optional second wheel, which can run the opposite way.
  - The counter draws two vectors and prints the separation at their midpoint.
  - The marker is a single vector with a label.

### 1.5 Chronometer [text + shot]
- Same controls as the Protractor, plus **Range: Daily / Annual**.
- Screenshot defaults: Visible on, Clockwise on, Angle 0°, Range Annual. Secondary scale has Visible, Reverse (on), Angle 0°. Marker is Visible (on) with Angle 107° in the example.
- Output in Annual mode, with dates around the ring:
  - **21 Mar at west (0°), 21 Jun at top, 22 Sep at east, 21 Dec at bottom.**
  - Other labels: 21 Apr, 21 May, 22 Jul, 22 Aug, 22 Oct, 21 Nov, 20 Jan, 19 Feb.
  - Mid labels: 5 Apr, 6 May, 6 Jun, 6 Jul, 6 Aug, 6 Sep, 7 Oct, 6 Nov, 6 Dec, ~5 Jan, 4 Feb, 6 Mar.
- These are the Sun's sign-ingress dates and the 15° points. So the annual ring is very likely laid out by the **Sun's ecliptic longitude**, not by equal days [inferred].
- Marker 107° is labelled "8 JUL". The Sun is at about 106° on 8 July [inferred].
- Today's date is shown as a red triangle on the rim.

### 1.6 Cosmogram (main module)
General [shot]:

| Parameter | Default | Options |
|---|---|---|
| Visible | on | |
| Clockwise | on | |
| Angle | 0° | Where the zero point sits. The guide's examples use Clockwise off with Angle 180° |
| System | Geocentric | Geocentric / Heliocentric |
| Location → City | New York | Picklist: Frankfurt, Hong Kong, Kiev, London, Moscow, Mumbai, New York, ... |
| Latitude | 40° 43' North | Editable degrees, minutes and N/S |
| Longitude | 74° 1' West | Editable degrees, minutes and E/W |

**Radix / Transit switch** [text + shot]:
- Two buttons (green = on, red = off) with a slider between them.
- The slider picks which side's settings (date, price, planets) the panel below is editing. Double-clicking a button usually moves the slider to that side.
- What shows on the wheel:
  - Both buttons red → the main wheel is hidden (sub-modules only).
  - One button green → one wheel.
  - Both green → radix on the **inner** wheel and transit on the **outer** wheel.
- **Date** (per side): Today checkbox (overrides Value), Value (dd.mm.yyyy), < > steppers, a "..." calendar, and a lightbulb **events list** (historical market events, e.g. 1792 Buttonwood, the panics of 1797/1807/1815/1819/1825, ...). Increment: number plus unit (Day ...).
  - Defaults: Today on, Value 31.12.2019, Increment 1 Day.
- **Time** (per side): Now checkbox, Value 00:00, Increment 1 Hour.
- The < > steppers move the chart by the increment, so you can animate it day by day.

**Price** (per side) [text + shot]:
- Quote: None, or a market. Markets include Cocoa, Coffee, Corn, Cotton, Soybeans, Sugar, Wheat, Copper, Gold, Silver, Palladium, Platinum, Crude oil, Natural gas, Dow Jones, ... The quote is fetched online.
- Quote value picker: lists 5 prices with icons, plus three "X.XX" format choices. Default shown is close.
- A pencil field (0): a manual price, it seems.
- **×** multiplier (default 1) and **÷** divisor (default 1).
- The header line shows the price, the % change from the prior day, and an up/down triangle.
- Output: a "$" glyph on the wheel at the price's degree. You can show it on the radix side, the transit side, or both.

**Planets** (per side) [text + shot]:
- Rows are grouped Zodiac / Short term / Middle term / Long term / Total:
  - Sun, Moon, Mercury, Venus, Mars
  - Ceres, Jupiter, Saturn
  - Uranus, Neptune, Pluto, Eris
  - **Summary**, **Average**
- Each row has a checkbox (show it), its longitude, its degree within the sign, a sign icon, and **Δ** (the transit−radix separation).
- Summary and Average each have a planet-chooser (fork icon) that picks which bodies go into them.
- A vertical slider switches the columns from **Zodiac** (degrees) to **Market** (price equivalents).

**Aspects** [shot]:
- Hide (master switch).
- One row per aspect, each with: planet-selector, visible checkbox, orb, and line style. Defaults:
  - Conjunction **Δ5°**
  - Semisextile 1°, Semisquare 1°, Sextile 1°
  - Quadrature (square) 1°, Trine 1°
  - Sesquisquare 1°, Quincunx 1°, Opposition 1°
- Colours: Conjunction Cornflower; Semisextile, Sextile, Trine and Quincunx Lime; Semisquare, Quadrature, Sesquisquare and Opposition Coral.
- Aspects also include the price point and the Summary/Average points when those are enabled [text].

**Inspector** [text + shot]:
- A 12×12 table, labelled with transit (columns) and radix (rows) dates and times. Cells show separations in degrees.
- Cells that form an aspect show the aspect's symbol instead. Hovering shows the aspect name, its angle and the pair (e.g. "Opposition: 180° Moon-Saturn").

**Projections** [text + shot]:
- Appears when a layout is shown with the cosmogram. Each body has a toggle button.
- Output: a body's icon is drawn in the grid cell whose **number equals its longitude**. Example: Jupiter 247° → cell 247. Hover shows "247 / Jupiter: 247°".

**Colours**: zodiac elements Fire Red, Earth Green, Air Plum, Water Blue; the aspect colours are listed above.

### 1.7 Moon phases sub-module [text + shot]
- Inputs: Visible, Show eclipses, Today, Date (default 31.12.2019 / 01.01.2020).
- Output: a strip of **5 consecutive octant phases** (every 45° of Sun–Moon elongation), each with a date and time, followed by **the next solar eclipse** and **the next lunar eclipse** [shot + inferred].

### 1.8 Cycles sub-module [text + shot]
- Inputs: Visible (one switch for everything), then a separate block each for **Tetragram**, **Pentagram** and **Hexagram**. Each block has:
  - Ruler (a planet, default Sun; "None" hides that figure)
  - Reverse (default on)
  - Today (default on)
  - Date (default 01.01.2020)
- Output: a small wheel with a 4-, 5- or 6-point figure. Each vertex is labelled with a date, and an arrow shows the direction.
- With Reverse on, the dates run **backwards** from the base date [shot].
- My reading [inferred]: the dates are when the ruler's longitude reaches base ± k·360/n. The gaps between dates are uneven (89, 93 and 94 days), which matches the Sun moving faster in winter and slower in summer.

---

## 2. Worked numeric examples (test cases)

### Grid layout
1. Value 1, Inc 1, Size 10, Clockwise → cell 2 is left of 1, 4 is above 1, 6 is right of 1, 8 is below 1. 9, 25, 49, 81 ... 361 sit on the lower-left diagonal. [shot]
2. Size 5 → a 9×9 grid holding 1..81. [shot]
3. **Value 9**, Inc 1 → the centre shows 9. Cell n shows 9 + (n−1): cell 2 = 10, cell 3 = 11, cell 14 = 22, cell 17 = 25. [shot]
4. **Value 1, Inc 3** → cell n shows 1 + 3(n−1): cell 2 = 4, cell 3 = 7, cell 4 = 10, cell 5 = 13, cell 8 = 22, cell 9 = 25, cell 13 = 37, cell 21 = 61, cell 25 = 73. With Show numbers on, both values appear. [shot]
5. Value 1, Inc 3, Size 19ish → the outer corners read 919 (top-left), 973 (top-right), 1027 (bottom-right) and 1081 (bottom-left). 1081 = 1 + 3·360, i.e. cell 361. [shot; Locator image]
6. **Find 8** (Value 1, Inc 1) → the cell directly below the centre is highlighted. [shot]
7. Data type "Price and date", base date 10.01 → cell n shows date 10.01 + (n−1) days: cell 2 = 11.01, cell 3 = 12.01, cell 9 = 18.01, cell 14 = 23.01, cell 17 = 26.01. [shot]

### Price ↔ degree
8. Gold **384.15 → 24°** ("384 − 360"). With ×2 → **48°**. [text + shot]
9. Gold quote list for 30.06.1995: 387.80, 387.90, 385.45, 383.00, 384.15, and −0.94% on the day. 385.45 = (387.90 + 383.00)/2, which matches **mid = (High + Low)/2**. So the order is probably O, H, Mid, L, C (icons not legible). [shot + inferred]

### Planet → price (Market column)
Dow **11497.10** on 01.01.2000; 31×360 = 11160. [shot]

| Body | Price shown | minus 11160 = longitude |
|---|---|---|
| Sun | 11440.08 | 280.08 |
| Moon | 11379.82 | 219.82 |
| Mercury | 11431.44 | 271.44 |
| Venus | 11401.22 | 241.22 |
| Mars | 11487.75 | 327.75 |
| Ceres | 11344.40 | 184.40 |
| **Jupiter** | **11185.25** | **25.25** (the guide's "11160 + 25 = 11185") |
| Saturn | 11200.41 | 40.41 |
| Uranus | 11474.80 | 314.80 |
| Neptune | 11463.19 | 303.19 |
| Pluto | 11411.45 | 251.45 |
| Eris | 11178.60 | 18.60 |
| Summary | 11451.40 | 291.40 |
| Average | 11366.53 | 206.53 |

10. The base is **floor(price/360)·360**, not the nearest multiple. For Jupiter, 11545 (= 32·360 + 25) is closer to 11497 than 11185 is, yet 11185 is shown. [inferred]

### Summary and Average
11. **Summary** = (Mars + Jupiter + Saturn + Uranus + Neptune) mod 360 = (327.75 + 25.25 + 40.41 + 314.80 + 303.19) = 1011.40 → **291.40**. This matches exactly. The guide's "five outer planets" are therefore Mars through Neptune. [inferred]
12. **Average** = the plain arithmetic mean of all 12 bodies' 0–360 longitudes (Sun..Eris): 2478.41 / 12 = **206.53**. This matches exactly. It is not a circular mean, and its body set differs from Summary's in the same screenshot. [inferred]
13. In another screenshot, transit Summary = 318° when all 12 bodies are included: Σ ≈ 2477 → 317–318. Radix Summary = 352°, from radix Σ ≈ 2153 → 353. Radix Average 179° (2153/12 = 179.4). [inferred]

### Planet table, radix 30.06.1995 vs transit 01.01.2000 (geocentric, New York, 00:00)

| Body | Radix | Transit | Δ shown |
|---|---|---|---|
| Sun | 98 | 280 | 182 |
| Moon | 122 | 220 | 98 |
| Mercury | 76 | 271 | 195 |
| Venus | 84 | 241 | 157 |
| Mars | 168 | 328 | 160 |
| Ceres | 152 | 184 | 32 |
| Jupiter | 247 | 25 | 138 |
| Saturn | 355 | 40 | 45 |
| Uranus | 299 | 315 | 16 |
| Neptune | 295 | 303 | 8 |
| Pluto | 238 | 251 | 13 |
| Eris | 19 | 19 | 0 |

14. **Δ = (transit − radix) mod 360**, on 0..360 rather than the shortest arc. Example: Jupiter 25 − 247 → 138. [inferred]
    - Note: the prose says Jupiter's "radix position is at 25" and 138° from transit. The table shows **radix = 247 and transit = 25**, so the prose has the two swapped.
15. Projection example: Jupiter 247° → icon on cell 247. Venus 327° → cell 327. [text]

### Inspector (same dates)
16. The diagonal is radix X vs transit X as the **shortest arc**: Sun 178, Moon 98, Mercury 165, Venus 157, Mars 160, Ceres 32, Jupiter 138, Saturn 45, Uranus 16, Neptune 8, Pluto 13, Eris 0.
17. Above the diagonal (row = "radix", column = "transit"), values match **transit vs transit**:
    - Sun/Mercury 9 (280−271)
    - Sun/Venus 39
    - Sun/Mars 48
    - Sun/Jupiter 105
    - Moon/Saturn **180, shown as an opposition** (220 vs 40)
18. Below the diagonal, values match **radix vs radix**:
    - Mercury/Sun 22 (98−76)
    - Venus/Sun 14
    - Saturn/Venus shows a square (355 vs 84 = 89°, inside the 1° orb)
    - Jupiter/Sun shows a quincunx (247 vs 98 = 149°)

### Cycles (Ruler Sun, Reverse on)
19. Base **11 Jan 2020**:
    - Tetragram → 14 Oct 2019, 13 Jul 2019, 10 Apr 2019.
    - Pentagram → 01 Nov 2019, 19 Aug 2019, 05 Jun 2019, 23 Mar 2019.
    - Hexagram → 13 Nov 2019, 13 Sep 2019, 13 Jul 2019, 11 May 2019, 11 Mar 2019.
20. Base **10 Jan 2020**:
    - Tetragram → 12 Oct, 11 Jul, 09 Apr 2019.
    - Pentagram → 31 Oct, 18 Aug, 04 Jun, 22 Mar 2019.
    - Hexagram → 11 Nov, 12 Sep, 11 Jul, 10 May, 10 Mar 2019.
21. Base **01 Jan 2020** (main-window shot):
    - Tetragram → 03 Oct, 02 Jul, 31 Mar 2019.
    - Pentagram → 21 Oct, 09 Aug, 25 May, 13 Mar 2019.
    - Hexagram → 03 Nov, 03 Sep, 03 Jul, 30 Apr, 01 Mar 2019 (partly legible).

### Moon phases
22. Date 01.01.2020: 26 Dec 2019 01:12, 29 Dec 2019 21:58, 3 Jan 2020 04:44, 7 Jan 2020 04:38, 10 Jan 2020 19:20; solar eclipse 21 Jun 2020 06:40; lunar eclipse 26 May 2021 07:14.
23. Today = 11.01.2020: 2 Jan 23:44, 6 Jan 23:38, 10 Jan 14:20, 13 Jan 22:59, 17 Jan 07:57; solar eclipse 21 Jun 2020 02:40; lunar eclipse 26 May 2021 06:14.
    - These times are 5 h behind #22's for the lunar phases (New York local time?).
    - The eclipse times are not: they differ by 4 h and 1 h. See section 5.

### Chronometer / Protractor / figures
24. Chronometer annual, marker 107° → "8 JUL". [shot]
25. Vectors at base 0 → rays at 23.6, 38.2, 50, 61.8, 100, 161.8 and 261.8 degrees. [shot]
26. Vortex Angle 12, Trend Both, Price 3, Radius 4 → spirals centred on cell 3. [shot]

### Trading illustration [text]
27. Venus at 327° with a top at price 327. The guide names 304 and 259 as "geometrically connected" cells to watch.
    - The rule behind that link is not stated.
    - 327 − 304 = 23 and 327 − 259 = 68, so it is not a simple angle.
    - It probably comes from other planets' projected cells or the cross/diagonal lines in that screenshot.

---

## 3. Statements and evidence about the underlying math

- **Grid value formula**: cell_value(n) = Value + (n−1)·Increment. Here n is the 1×1 spiral index, shown when "Show numbers" is on. Increment may be negative. For dates, the same formula steps in days (and presumably in time units for Time). [shot + inferred]
- **Price Find**: highlights the cell whose value equals the typed number. What happens when no cell matches exactly (e.g. non-integer input, or values between steps) is not stated.
- **Price → degree**: degree = (price × mult ÷ div) mod 360. Examples: 384 → 24, and ×2 → 48. Applied to the chosen OHLC/mid value. [text]
- **Planet → price (Market column)**: price_equiv = floor(price/360)·360 + longitude. The guide calls this "modulus 360 depending on the chosen market price". It is not certain whether the multiplier and divisor apply before this step. [text + inferred]
- **Planet → grid cell (Projections)**: a planet's longitude in degrees goes to the cell with that number. Rounding is unknown, and so is whether Value and Increment are honoured (cell value vs cell index).
- **Harmonics**: there is no harmonic setting in the guide. The only scaling knobs are the price ×/÷ and the Vectors' custom angles.
- **Summary** = Σ selected longitudes, mod 360. **Average** = arithmetic mean of the selected longitudes (not a circular mean). Each side (radix/transit) has its own selection. [inferred, exact matches above]
- **Geocentric vs heliocentric**: a single System switch for the whole Cosmogram. Location (latitude/longitude) presumably matters only for the Moon, time zone and topocentric effects. Nothing more is stated.
- **Δ column**: (transit − radix) mod 360. **Inspector cells**: shortest arc, 0..180.
- **Aspects**: fixed angles 0, 30, 45, 60, 90, 120, 135, 150, 180. Each aspect type has one orb (default 5° for conjunction, 1° for the rest). Each type also has its own planet filter.
- **Cycles**: the circle is divided into 4, 5 or 6 equal parts. The dates are when the ruler planet reaches those longitudes, going forward or (with Reverse) backward from the base date. [inferred from uneven day gaps]
- **Chronometer annual**: angle = Sun longitude, with 0° = equinox ≈ 21 Mar. **Daily** mode presumably maps 24 h to 360°, but no screenshot shows it.
- **Time increments**: a number plus a unit for both Date (Day ...) and Time (Hour ...). The full list of units is not shown.
- **Moon phases**: 45° elongation steps, plus the next solar and lunar eclipses.

---

## 4. Behaviours the docs do not let us infer (need black-box tests on the desktop app)

1. **Angle conventions**: the exact rule linking Angle and Clockwise for each module (grid, figures, protractor, chronometer, cosmogram). Is Clockwise=off a pure horizontal mirror? Does Cosmogram Angle mean "where 0° Aries sits"?
2. **Spiral start for other layouts**: Square of 4, Permanent square, Circle of 12/24/36, Tetragon...Octagon. Where is cell 2? What is the ring size per level? How do Size and Increment map to cells?
3. **Price Find on non-exact values**: nearest cell, the cell below, or nothing? Behaviour with negative increments and with date/time data types.
4. **Projections with Value/Increment ≠ 1**: is the icon placed by cell value or by cell index? Are longitudes rounded or floored, and does it use longitude mod 360 + k·360 when values exceed 360?
5. **Price to degree**: the order of ×/÷ versus mod 360. Is it rounded? Which quote field (O/H/L/C/Mid) is the default? The meaning of the three "X.XX" choices (decimals?) and of the pencil field.
6. **Market column**: is the base always floor(price/360)·360? Does it use the multiplied price or the raw quote? What do the red/grey triangles next to each value mean?
7. **Summary/Average**: confirm the linear mean (not circular) with a test that straddles 0°/360°. Does Average have its own body set? Default selections.
8. **Heliocentric**: how the Sun row, the Moon and Ceres behave. Whether Location changes geocentric longitudes (topocentric vs geocentric, and time zone for the "00:00" input).
9. **Time zone**: is Date/Time input local to the chosen City or UTC? (The moon-phase times suggest local time, but the eclipse times disagree.)
10. **Cycles**: confirm whether it solves for planet longitude or uses fixed day counts. Behaviour with a retrograde ruler (e.g. Mercury or Mars): first crossing or every crossing? What Reverse off produces.
11. **Moon phase window**: how many phases before and after the date, and how the window is centred.
12. **Chronometer Daily mode**: mapping and zero point.
13. **Vortex**: units of Radius, growth ratio (φ per quarter turn?), the meaning of "Price" (cell index or value), and the axes count.
14. **Vectors Clockwise and polygon highlights**: which cells count as "inside".
15. **Locator angle**: is the angle at the bear end or the bull end?
16. **Inspector**: confirm the upper-triangle transit×transit / lower-triangle radix×radix layout. Whether orbs follow the Aspects settings.
17. **Aspect detection**: is it applied to the price "$" point and to Summary/Average? (The text says yes.) Is the orb inclusive?
18. **Increment units** available for Date and Time (Minute? Week? Month? Year?).
19. **Price + date / price + time data types**: are both steps applied per cell, and is there an independent date increment?
20. **Marks persistence** across chart switches and save files. Format of the saved chart files.

---

## 5. Reported bugs and quirks

- **Inspector mislabels its cells** [text]. The guide's author thinks it shows transit-to-transit aspects under radix-to-transit labels. The screenshot shows more than that: only the diagonal is radix-vs-transit, cells above the diagonal are transit-vs-transit, and cells below are radix-vs-radix.
- **Shrinking Size erases marks** on the rings that are cut off [text].
- **Chart settings auto-save** when switching charts, and a new chart starts from the current one. Edits to Default are easy to make by accident [text].
- **Drawing tools leave the cursor in draw mode.** Click Cursor to get the pointer back [text].
- **The Radix/Transit slider** usually follows a double-click on a button, but not always [text].
- **The guide swaps radix and transit for Jupiter.** It says radix 25°, but the table shows radix 247° and transit 25° [shot].
- **Moon phase and eclipse times disagree.** Between two screenshots the phase times shift by 5 h, but the eclipse times shift by 4 h (solar) and 1 h (lunar). The solar eclipse time is 06:40 in one shot (correct for UTC) and 02:40 in the other. Possible time-zone bug in the eclipse times [shot + inferred].
- **Price quotes need internet** when the market is selected. Proxy settings are under F9 [text].
