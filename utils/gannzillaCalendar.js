/**
 * Gannzilla's Date and Time grids: what date or time cell n shows.
 *
 * Pure functions. Dates are naive wall-clock values held in JS Dates read
 * through the UTC getters, so no time zone ever shifts them. Rules come from
 * the desktop black-box run (notes/gannzilla_blackbox_findings.md,
 * "Data types").
 */

const DAY_MS = 86400000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm' as a wall-clock Date, or null. */
export function parseWallClock(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?$/.exec(String(text || '').trim());
  if (!m) return null;
  const [, y, mo, d, h = '0', mi = '0'] = m;
  const date = new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi));
  return Number.isNaN(date.getTime()) ? null : date;
}

const pad = (n) => String(n).padStart(2, '0');
const dayKey = (date) => date.toISOString().slice(0, 10);
const midnight = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

/** Gannzilla's date formats: dd.mm, dd.mm.yy, dd.mm.yyyy, d mmm. */
export function formatDate(date, format = 'dd.mm') {
  const d = date.getUTCDate();
  const m = date.getUTCMonth();
  const y = date.getUTCFullYear();
  if (format === 'dd.mm.yy') return `${pad(d)}.${pad(m + 1)}.${String(y).slice(-2)}`;
  if (format === 'dd.mm.yyyy') return `${pad(d)}.${pad(m + 1)}.${y}`;
  if (format === 'd mmm') return `${d} ${MONTHS[m]}`;
  return `${pad(d)}.${pad(m + 1)}`;
}

export const formatTime = (date) => `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;

/** Weekday and not a listed holiday. */
function makeTradingTest(holidays) {
  const skip = new Set(holidays);
  return (date) => {
    const wd = date.getUTCDay();
    return wd !== 0 && wd !== 6 && !skip.has(dayKey(date));
  };
}

/** Add whole months, clamping to the month's last day (31 Jan + 1 month = 28 Feb). */
function addMonths(date, months) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + months;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(date.getUTCDate(), last)));
}

/** A function n -> Date that remembers the cells it has walked through. */
function cached(first, next) {
  const cells = [first];
  return (n) => {
    while (cells.length < n) cells.push(next(cells[cells.length - 1]));
    return cells[n - 1];
  };
}

/**
 * Cell n of a Date grid: start + (n-1) * increment units. With trading days
 * on, each step skips weekends and listed holidays, and a non-trading start
 * snaps forward to the next trading day.
 *
 * @param {{start: string, increment?: number, unit?: 'Day'|'Week'|'Month'|'Year',
 *          tradingDays?: boolean, holidays?: string[]}} opts
 * @returns {(n: number) => Date}
 */
export function makeDateSequence({ start, increment = 1, unit = 'Day', tradingDays = false, holidays = [] }) {
  const first = midnight(parseWallClock(start));
  const isTrading = makeTradingTest(holidays);
  const toTrading = (date) => {
    let d = date;
    while (!isTrading(d)) d = new Date(d.getTime() + DAY_MS);
    return d;
  };

  if (unit === 'Day' && tradingDays) {
    // Each step is `increment` trading days.
    return cached(toTrading(first), (prev) => {
      let d = prev;
      for (let i = 0; i < increment; i++) d = toTrading(new Date(d.getTime() + DAY_MS));
      return d;
    });
  }

  // Closed forms, measured from the start so months never drift.
  const plain = (n) => {
    const k = (n - 1) * increment;
    if (unit === 'Week') return new Date(first.getTime() + k * 7 * DAY_MS);
    if (unit === 'Month') return addMonths(first, k);
    if (unit === 'Year') return addMonths(first, 12 * k);
    return new Date(first.getTime() + k * DAY_MS);
  };
  return tradingDays ? (n) => toTrading(plain(n)) : plain;
}

const minutesOf = (hhmm) => {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + m;
};

/**
 * Cell n of a Time grid: start + (n-1) * increment minutes or hours.
 *
 * With a session (e.g. 09:00-18:00, both ends included) times stay inside
 * it: past the end, the next cell is the session start of the next day (the
 * next trading day with trading days on). A start outside the session snaps
 * forward to the next session start.
 *
 * @param {{start: string, increment?: number, unit?: 'Minute'|'Hour',
 *          tradingDays?: boolean, holidays?: string[],
 *          session?: {start: string, end: string} | null}} opts
 * @returns {(n: number) => Date}
 */
export function makeTimeSequence({
  start, increment = 1, unit = 'Hour', tradingDays = false, holidays = [], session = null,
}) {
  const stepMs = increment * (unit === 'Minute' ? 60000 : 3600000);
  const first = parseWallClock(start);
  const isTrading = makeTradingTest(holidays);

  if (!session && !tradingDays) {
    return (n) => new Date(first.getTime() + (n - 1) * stepMs);
  }

  const open = session ? minutesOf(session.start) : 0;
  const close = session ? minutesOf(session.end) : 24 * 60 - 1;
  const dayOk = (date) => !tradingDays || isTrading(date);
  const openOn = (day) => new Date(midnight(day).getTime() + open * 60000);
  const nextOpen = (date) => {
    let day = new Date(midnight(date).getTime() + DAY_MS);
    while (!dayOk(day)) day = new Date(day.getTime() + DAY_MS);
    return openOn(day);
  };
  // Move a time into the session, if it is not already inside one.
  const settle = (date) => {
    const mins = date.getUTCHours() * 60 + date.getUTCMinutes();
    if (!dayOk(date) || mins > close) return nextOpen(date);
    if (mins < open) return openOn(date);
    return date;
  };

  return cached(settle(first), (prev) => settle(new Date(prev.getTime() + stepMs)));
}

/**
 * The largest cell n (1..maxN) whose date/time is not after `target`, the
 * same round-down rule as the price Find. Null when the target is before
 * cell 1 or past the last cell. The sequence must be increasing.
 */
export function findSequenceCell(target, at, maxN) {
  if (!target || maxN < 1 || target < at(1) || at(maxN + 1) <= target) return null;
  let lo = 1;
  let hi = maxN;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (at(mid) <= target) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
