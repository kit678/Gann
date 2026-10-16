import React from 'react';
import {
  makeDateSequence, makeTimeSequence, formatDate, formatTime, findSequenceCell, parseWallClock,
} from '../utils/gannzillaCalendar';

export const DATA_TYPES = ['Price', 'Date', 'Time', 'Price and date', 'Price and time'];
const DATE_UNITS = ['Day', 'Week', 'Month', 'Year'];
const TIME_UNITS = ['Minute', 'Hour'];
const DATE_FORMATS = ['dd.mm', 'dd.mm.yy', 'dd.mm.yyyy', 'd mmm'];

/** Gannzilla's defaults: today, step 1 day / 1 hour, dd.mm, session 09:00-18:00 off. */
export function defaultDataType(today) {
  return {
    dataType: 'Price',
    dateStart: today,
    dateIncrement: '1',
    dateUnit: 'Day',
    timeStart: `${today}T00:00`,
    timeIncrement: '1',
    timeUnit: 'Hour',
    tradingDays: false,
    holidays: '',
    format: 'dd.mm',
    sessionOn: false,
    sessionStart: '09:00',
    sessionEnd: '18:00',
    find: '',
  };
}

const usesDate = (t) => t === 'Date' || t === 'Price and date';
const usesTime = (t) => t === 'Time' || t === 'Price and time';

/**
 * Turn the settings into what the grids need: a cell -> label-lines
 * function, the Find cell, and an error message. Price-only grids return
 * nulls so the charts keep their own price labels.
 *
 * @param {object} s - settings from defaultDataType
 * @param {(n: number) => string} priceLabel - the cell's price text
 * @param {number} maxCell - the last cell index on the grid
 */
export function gridLabels(s, priceLabel, maxCell) {
  const none = { cellLabel: null, findIndex: undefined, error: null };
  if (!usesDate(s.dataType) && !usesTime(s.dataType)) return none;

  const holidays = s.holidays.split(/[,\s]+/).filter(Boolean);
  const increment = Math.floor(Number(usesDate(s.dataType) ? s.dateIncrement : s.timeIncrement));
  if (!(increment >= 1)) return { ...none, error: 'Increment must be a whole number of at least 1.' };

  let at;
  if (usesDate(s.dataType)) {
    if (!parseWallClock(s.dateStart)) return { ...none, error: 'Pick a start date.' };
    at = makeDateSequence({
      start: s.dateStart, increment, unit: s.dateUnit, tradingDays: s.tradingDays, holidays,
    });
  } else {
    if (!parseWallClock(s.timeStart)) return { ...none, error: 'Pick a start date and time.' };
    if (s.sessionOn && !(s.sessionStart < s.sessionEnd)) {
      return { ...none, error: 'Session start must be before its end.' };
    }
    at = makeTimeSequence({
      start: s.timeStart, increment, unit: s.timeUnit, tradingDays: s.tradingDays, holidays,
      session: s.sessionOn ? { start: s.sessionStart, end: s.sessionEnd } : null,
    });
  }

  const when = (n) => (usesDate(s.dataType)
    ? formatDate(at(n), s.format)
    : `${formatTime(at(n))} ${formatDate(at(n), s.format)}`);
  const cellLabel = s.dataType.startsWith('Price and')
    ? (n) => [priceLabel(n), when(n)]
    : (n) => (usesTime(s.dataType) ? [formatTime(at(n)), formatDate(at(n), s.format)] : [when(n)]);

  const findIndex = s.find ? findSequenceCell(parseWallClock(s.find), at, maxCell) : null;
  return { cellLabel, findIndex, error: null };
}

const Field = ({ id, label, children }) => (
  <div className="d-flex align-items-center" style={{ gap: '0.4rem' }}>
    <label htmlFor={id} className="small mb-0">{label}</label>
    {children}
  </div>
);

/**
 * Gannzilla's Data type: number the grid with prices, dates, times, or a
 * price with a date or time under it.
 */
const DataTypePanel = ({ settings: s, onChange, error }) => {
  const set = (patch) => onChange({ ...s, ...patch });
  const dateMode = usesDate(s.dataType);
  const timeMode = usesTime(s.dataType);
  const sel = 'form-select form-select-sm';
  const box = 'form-control form-control-sm';

  return (
    <div className="card mt-3">
      <div className="card-body py-2">
        <div className="d-flex align-items-center flex-wrap" style={{ gap: '1rem' }}>
          <strong>Data type</strong>
          <select className={sel} style={{ width: 'auto' }} aria-label="Data type"
                  value={s.dataType} onChange={(e) => set({ dataType: e.target.value })}>
            {DATA_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>

          {dateMode && (
            <>
              <Field id="dtStart" label="Start">
                <input type="date" id="dtStart" className={box} value={s.dateStart}
                       onChange={(e) => set({ dateStart: e.target.value })} />
              </Field>
              <Field id="dtInc" label="Increment">
                <input type="number" id="dtInc" className={box} style={{ width: '4.5rem' }} min="1"
                       value={s.dateIncrement} onChange={(e) => set({ dateIncrement: e.target.value })} />
                <select className={sel} aria-label="Date unit" value={s.dateUnit}
                        onChange={(e) => set({ dateUnit: e.target.value })}>
                  {DATE_UNITS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </Field>
            </>
          )}

          {timeMode && (
            <>
              <Field id="tmStart" label="Start">
                <input type="datetime-local" id="tmStart" className={box} value={s.timeStart}
                       onChange={(e) => set({ timeStart: e.target.value })} />
              </Field>
              <Field id="tmInc" label="Increment">
                <input type="number" id="tmInc" className={box} style={{ width: '4.5rem' }} min="1"
                       value={s.timeIncrement} onChange={(e) => set({ timeIncrement: e.target.value })} />
                <select className={sel} aria-label="Time unit" value={s.timeUnit}
                        onChange={(e) => set({ timeUnit: e.target.value })}>
                  {TIME_UNITS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </Field>
              <div className="form-check mb-0">
                <input className="form-check-input" type="checkbox" id="tmSession"
                       checked={s.sessionOn} onChange={(e) => set({ sessionOn: e.target.checked })} />
                <label className="form-check-label small" htmlFor="tmSession">Session</label>
              </div>
              {s.sessionOn && (
                <>
                  <input type="time" className={box} style={{ width: 'auto' }} aria-label="Session start"
                         value={s.sessionStart} onChange={(e) => set({ sessionStart: e.target.value })} />
                  <input type="time" className={box} style={{ width: 'auto' }} aria-label="Session end"
                         value={s.sessionEnd} onChange={(e) => set({ sessionEnd: e.target.value })} />
                </>
              )}
            </>
          )}

          {(dateMode || timeMode) && (
            <>
              <div className="form-check mb-0">
                <input className="form-check-input" type="checkbox" id="dtTrading"
                       checked={s.tradingDays} onChange={(e) => set({ tradingDays: e.target.checked })} />
                <label className="form-check-label small" htmlFor="dtTrading">Trading days</label>
              </div>
              <Field id="dtFormat" label="Format">
                <select id="dtFormat" className={sel} value={s.format}
                        onChange={(e) => set({ format: e.target.value })}>
                  {DATE_FORMATS.map((f) => <option key={f}>{f}</option>)}
                </select>
              </Field>
              <Field id="dtHolidays" label="Holidays">
                <input type="text" id="dtHolidays" className={box} style={{ width: '14rem' }}
                       placeholder="YYYY-MM-DD, ..." value={s.holidays}
                       onChange={(e) => set({ holidays: e.target.value })} />
              </Field>
              <Field id="dtFind" label="Find">
                <input type={timeMode ? 'datetime-local' : 'date'} id="dtFind" className={box}
                       value={s.find} onChange={(e) => set({ find: e.target.value })} />
              </Field>
            </>
          )}
        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
        {(dateMode || timeMode) && (
          <div className="text-muted small mt-1">
            Levels still come from the price. Dates are wall-clock dates with no time zone;
            holidays are skipped only with Trading days on.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTypePanel;
