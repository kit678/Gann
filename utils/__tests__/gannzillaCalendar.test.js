import {
  makeDateSequence, makeTimeSequence, formatDate, formatTime, findSequenceCell, parseWallClock,
} from '../gannzillaCalendar';

// Expected values are what Gannzilla showed on 2026-10-15 (black-box run 3,
// notes/gannzilla_blackbox_findings.md "Data types").
const d = (s) => formatDate(s, 'dd.mm');

describe('Date grid', () => {
  const at = makeDateSequence({ start: '2026-10-15' });

  test('cell n is the start plus n-1 days', () => {
    expect(d(at(1))).toBe('15.10');
    expect(d(at(2))).toBe('16.10');
    expect(d(at(17))).toBe('31.10');
    expect(d(at(81))).toBe('03.01');
  });

  test('trading days skip weekends: Thu 15, Fri 16, Mon 19', () => {
    const t = makeDateSequence({ start: '2026-10-15', tradingDays: true });
    expect(d(t(1))).toBe('15.10');
    expect(d(t(2))).toBe('16.10');
    expect(d(t(3))).toBe('19.10');
    expect(d(t(8))).toBe('26.10');
    expect(d(t(57))).toBe('01.01'); // no built-in holidays
    expect(d(t(81))).toBe('04.02');
  });

  test('holidays are skipped too in trading-days mode', () => {
    const t = makeDateSequence({ start: '2026-10-15', tradingDays: true, holidays: ['2026-10-16'] });
    expect(d(t(2))).toBe('19.10');
  });

  test('a weekend start snaps forward in trading-days mode', () => {
    const t = makeDateSequence({ start: '2026-10-17', tradingDays: true });
    expect(d(t(1))).toBe('19.10');
  });

  test('week, month and year units; months clamp to the month end without drifting', () => {
    expect(d(makeDateSequence({ start: '2026-10-15', unit: 'Week' })(2))).toBe('22.10');
    const m = makeDateSequence({ start: '2026-01-31', unit: 'Month' });
    expect(formatDate(m(2), 'dd.mm.yyyy')).toBe('28.02.2026');
    expect(formatDate(m(3), 'dd.mm.yyyy')).toBe('31.03.2026');
    const y = makeDateSequence({ start: '2026-10-15', unit: 'Year', increment: 2 });
    expect(formatDate(y(3), 'dd.mm.yyyy')).toBe('15.10.2030');
  });
});

describe('Time grid', () => {
  test('cell n is the start plus n-1 hours', () => {
    const at = makeTimeSequence({ start: '2026-10-15T00:00' });
    expect(formatTime(at(2))).toBe('01:00');
    expect(formatTime(at(25))).toBe('00:00');
    expect(d(at(25))).toBe('16.10');
  });

  test('minutes', () => {
    const at = makeTimeSequence({ start: '2026-10-15T09:30', unit: 'Minute', increment: 15 });
    expect(formatTime(at(3))).toBe('10:00');
  });

  test('a 09:00-18:00 session holds 10 hourly cells a day, both ends included', () => {
    const at = makeTimeSequence({ start: '2026-10-15T00:00', session: { start: '09:00', end: '18:00' } });
    expect(formatTime(at(1))).toBe('09:00'); // 00:00 snaps forward
    expect(formatTime(at(10))).toBe('18:00');
    expect(formatTime(at(11))).toBe('09:00');
    expect(d(at(11))).toBe('16.10');
    expect(`${formatTime(at(80))} ${d(at(80))}`).toBe('18:00 22.10');
    expect(`${formatTime(at(81))} ${d(at(81))}`).toBe('09:00 23.10');
  });

  test('session plus trading days skips the weekend', () => {
    const at = makeTimeSequence({
      start: '2026-10-16T17:00', tradingDays: true, session: { start: '09:00', end: '18:00' },
    });
    expect(`${formatTime(at(3))} ${d(at(3))}`).toBe('09:00 19.10');
  });
});

describe('formats', () => {
  const day = parseWallClock('2026-10-05');
  test('the four Gannzilla date formats', () => {
    expect(formatDate(day, 'dd.mm')).toBe('05.10');
    expect(formatDate(day, 'dd.mm.yy')).toBe('05.10.26');
    expect(formatDate(day, 'dd.mm.yyyy')).toBe('05.10.2026');
    expect(formatDate(day, 'd mmm')).toBe('5 Oct');
  });
});

describe('findSequenceCell (largest cell not after the target)', () => {
  const at = makeDateSequence({ start: '2026-10-15' });
  test('an exact date', () => {
    expect(findSequenceCell(parseWallClock('2026-10-20'), at, 500)).toBe(6);
  });
  test('between cells rounds down, like the price Find', () => {
    const t = makeDateSequence({ start: '2026-10-15', tradingDays: true });
    expect(findSequenceCell(parseWallClock('2026-10-18'), t, 500)).toBe(2); // Sunday -> Friday's cell
  });
  test('before the start, or past the last cell', () => {
    expect(findSequenceCell(parseWallClock('2026-10-14'), at, 500)).toBeNull();
    expect(findSequenceCell(parseWallClock('2030-01-01'), at, 10)).toBeNull();
  });
});

test('parseWallClock rejects garbage', () => {
  expect(parseWallClock('nope')).toBeNull();
  expect(parseWallClock('')).toBeNull();
});
