/**
 * Gannzilla's circular instruments: where a degree sits on a wheel, and the
 * Chronometer's labels.
 *
 * Pure functions. Conventions come from the desktop black-box run
 * (notes/gannzilla_blackbox_findings.md [09]-[13]).
 */

import { mod360 } from './gannzillaAstro';

/**
 * Screen position of degree `deg` on a wheel of radius `r` (screen y points
 * down).
 *
 * Clockwise (Gannzilla's default): 0 deg at west, increasing clockwise.
 * Anticlockwise: 0 deg at east, increasing anticlockwise. `angle` rotates
 * the whole scale along its own direction of travel, so with angle 90 the
 * 0 deg mark sits at the top in both modes.
 */
export function wheelPoint(deg, r, { clockwise = true, angle = 0, cx = 0, cy = 0 } = {}) {
  const travelled = deg + angle;
  // Standard maths angle (anticlockwise from east, y up).
  const maths = clockwise ? 180 - travelled : travelled;
  const rad = (maths * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

/**
 * Gannzilla's annual Chronometer ring: a fixed calendar table every 15 deg
 * of Sun longitude, starting at 21 Mar for 0 deg. These are the labels the
 * app shows (they do not move with the year's actual ingress times).
 */
export const CHRONOMETER_ANNUAL_LABELS = [
  '21 Mar', '5 Apr', '21 Apr', '6 May', '21 May', '6 Jun',
  '21 Jun', '6 Jul', '22 Jul', '6 Aug', '22 Aug', '6 Sep',
  '22 Sep', '7 Oct', '22 Oct', '6 Nov', '21 Nov', '6 Dec',
  '21 Dec', '5 Jan', '20 Jan', '4 Feb', '19 Feb', '6 Mar',
].map((label, i) => ({ angle: i * 15, label }));

/** Daily Chronometer: 24 h = 360 deg, 15 deg per hour, 06:00 at 0 deg. */
export function chronometerDailyLabel(deg) {
  const hour = Math.round(mod360(deg) / 15 + 6) % 24;
  return `${String(hour).padStart(2, '0')}:00`;
}

export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

/** The zodiac sign of a longitude and the degree within that sign. */
export function signOf(longitude) {
  const lon = mod360(longitude);
  const index = Math.floor(lon / 30);
  return { sign: SIGNS[index], index, degree: lon - index * 30 };
}
