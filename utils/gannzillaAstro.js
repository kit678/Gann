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
