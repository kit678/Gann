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
