import { fitView, zoomAt, visibleCellRange, MIN_ZOOM, MAX_ZOOM } from '../gannView';

const CELL = 40;

describe('fitView', () => {
  test('frames the whole grid inside the viewport', () => {
    const view = fitView(10, CELL, 800, 600);
    const gridPx = 10 * CELL;
    expect(view.zoom * gridPx).toBeLessThanOrEqual(600);
    expect(view.zoom).toBeGreaterThan(0);
  });

  test('centres the grid', () => {
    const view = fitView(10, CELL, 800, 600);
    const gridPx = 10 * CELL * view.zoom;
    expect(view.panX).toBeCloseTo((800 - gridPx) / 2, 5);
    expect(view.panY).toBeCloseTo((600 - gridPx) / 2, 5);
  });

  test('never returns a zoom outside the allowed range', () => {
    const huge = fitView(5000, CELL, 800, 600);
    expect(huge.zoom).toBeGreaterThanOrEqual(MIN_ZOOM);
    expect(huge.zoom).toBeLessThanOrEqual(MAX_ZOOM);
  });
});

describe('zoomAt', () => {
  test('keeps the world point under the cursor fixed', () => {
    const before = { zoom: 1, panX: 0, panY: 0 };
    const cursorX = 300;
    const cursorY = 200;
    const worldX = (cursorX - before.panX) / before.zoom;
    const worldY = (cursorY - before.panY) / before.zoom;

    const after = zoomAt(before, cursorX, cursorY, 1.5);

    expect(worldX * after.zoom + after.panX).toBeCloseTo(cursorX, 5);
    expect(worldY * after.zoom + after.panY).toBeCloseTo(cursorY, 5);
  });

  test('clamps at the maximum', () => {
    const view = zoomAt({ zoom: MAX_ZOOM, panX: 0, panY: 0 }, 0, 0, 10);
    expect(view.zoom).toBe(MAX_ZOOM);
  });

  test('clamps at the minimum', () => {
    const view = zoomAt({ zoom: MIN_ZOOM, panX: 0, panY: 0 }, 0, 0, 0.01);
    expect(view.zoom).toBe(MIN_ZOOM);
  });
});

describe('visibleCellRange', () => {
  test('returns only the cells inside the viewport', () => {
    const view = { zoom: 1, panX: 0, panY: 0 };
    const range = visibleCellRange(view, CELL, 100, 800, 600);
    expect(range.colStart).toBe(0);
    expect(range.colEnd).toBeLessThan(100);
    expect(range.rowEnd).toBeLessThan(100);
  });

  test('clamps to the grid when panned past its edge', () => {
    const view = { zoom: 1, panX: 5000, panY: 5000 };
    const range = visibleCellRange(view, CELL, 20, 800, 600);
    expect(range.colStart).toBeGreaterThanOrEqual(0);
    expect(range.rowStart).toBeGreaterThanOrEqual(0);
    expect(range.colEnd).toBeLessThanOrEqual(19);
  });

  test('covers the entire grid when fully zoomed out to fit', () => {
    const view = fitView(20, CELL, 800, 600);
    const range = visibleCellRange(view, CELL, 20, 800, 600);
    expect(range.rowStart).toBe(0);
    expect(range.colStart).toBe(0);
    expect(range.rowEnd).toBe(19);
    expect(range.colEnd).toBe(19);
  });
});
