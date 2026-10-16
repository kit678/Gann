import { defaultDataType, gridLabels } from '../../components/DataTypePanel';

const price = (n) => String(n);
const base = { ...defaultDataType('2026-10-15') };

describe('gridLabels', () => {
  test('Price keeps the charts\' own labels', () => {
    expect(gridLabels(base, price, 1000)).toEqual({ cellLabel: null, findIndex: undefined, error: null });
  });

  test('Date: one date line per cell', () => {
    const { cellLabel } = gridLabels({ ...base, dataType: 'Date' }, price, 1000);
    expect(cellLabel(1)).toEqual(['15.10']);
    expect(cellLabel(81)).toEqual(['03.01']);
  });

  test('Time: time over date', () => {
    const { cellLabel } = gridLabels({ ...base, dataType: 'Time' }, price, 1000);
    expect(cellLabel(25)).toEqual(['00:00', '16.10']);
  });

  test('Price and date / Price and time: price over date or time', () => {
    expect(gridLabels({ ...base, dataType: 'Price and date' }, price, 1000).cellLabel(2))
      .toEqual(['2', '16.10']);
    expect(gridLabels({ ...base, dataType: 'Price and time' }, price, 1000).cellLabel(2))
      .toEqual(['2', '01:00 15.10']);
  });

  test('date Find marks the largest cell not after the date', () => {
    const { findIndex } = gridLabels({ ...base, dataType: 'Date', find: '2026-10-20' }, price, 1000);
    expect(findIndex).toBe(6);
  });

  test('bad settings give an error, not a crash', () => {
    expect(gridLabels({ ...base, dataType: 'Date', dateIncrement: '0' }, price, 10).error).toMatch(/Increment/);
    expect(gridLabels({ ...base, dataType: 'Date', dateStart: '' }, price, 10).error).toMatch(/start date/);
    expect(gridLabels({
      ...base, dataType: 'Time', sessionOn: true, sessionStart: '18:00', sessionEnd: '09:00',
    }, price, 10).error).toMatch(/Session/);
  });
});
