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

/** Gannzilla's x and / price fields must be positive; anything else has no meaning. */
function checkScale(multiplier, divisor) {
  if (!(multiplier > 0) || !(divisor > 0)) {
    throw new RangeError(`multiplier and divisor must be positive, got ${multiplier} and ${divisor}`);
  }
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
  checkScale(multiplier, divisor);
  return mod360((price * multiplier) / divisor);
}

/**
 * A longitude as a price in the same 360-block as `price` (the Market
 * column). Gannzilla scales the price first, uses floor(scaled/360) - not
 * the nearest block - then scales the level back (black-box [05], [06]).
 */
export function longitudeToPrice(longitude, price, { multiplier = 1, divisor = 1 } = {}) {
  checkScale(multiplier, divisor);
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
