/**
 * Pan and zoom maths for the Gann grid canvas.
 *
 * A "view" is { zoom, panX, panY }. World coordinates are pixels in unscaled
 * grid space; screen coordinates are canvas pixels. The relationship is:
 *
 *   screen = world * zoom + pan
 */

export const MIN_ZOOM = 0.05;
export const MAX_ZOOM = 4;

/** Fraction of the viewport the grid occupies when fitted, leaving a margin. */
const FIT_MARGIN = 0.95;

function clampZoom(zoom) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

/**
 * Compute the view that frames the entire grid, centred.
 *
 * @param {number} dimension - grid width in cells
 * @param {number} cellSize - unscaled cell size in pixels
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 * @returns {{zoom:number, panX:number, panY:number}}
 */
export function fitView(dimension, cellSize, viewportWidth, viewportHeight) {
  const gridPx = dimension * cellSize;
  if (gridPx <= 0) return { zoom: 1, panX: 0, panY: 0 };

  const zoom = clampZoom(
    Math.min(viewportWidth / gridPx, viewportHeight / gridPx) * FIT_MARGIN
  );

  return {
    zoom,
    panX: (viewportWidth - gridPx * zoom) / 2,
    panY: (viewportHeight - gridPx * zoom) / 2,
  };
}

/**
 * Zoom by a factor about a fixed screen point, so whatever is under that point
 * stays under it.
 *
 * @param {{zoom:number, panX:number, panY:number}} view
 * @param {number} screenX - anchor point in canvas pixels
 * @param {number} screenY
 * @param {number} factor - >1 zooms in, <1 zooms out
 * @returns {{zoom:number, panX:number, panY:number}}
 */
export function zoomAt(view, screenX, screenY, factor) {
  const nextZoom = clampZoom(view.zoom * factor);

  const worldX = (screenX - view.panX) / view.zoom;
  const worldY = (screenY - view.panY) / view.zoom;

  return {
    zoom: nextZoom,
    panX: screenX - worldX * nextZoom,
    panY: screenY - worldY * nextZoom,
  };
}

/**
 * Inclusive range of cells currently inside the viewport.
 *
 * Drawing only these keeps repaint cost tied to viewport area rather than grid
 * area, which is what makes zooming a million-cell grid viable.
 *
 * @returns {{rowStart:number, rowEnd:number, colStart:number, colEnd:number}}
 */
export function visibleCellRange(view, cellSize, dimension, viewportWidth, viewportHeight) {
  const scaledCell = cellSize * view.zoom;
  if (scaledCell <= 0) {
    return { rowStart: 0, rowEnd: -1, colStart: 0, colEnd: -1 };
  }

  const last = dimension - 1;
  const clamp = (v) => Math.min(last, Math.max(0, v));

  return {
    colStart: clamp(Math.floor(-view.panX / scaledCell)),
    colEnd: clamp(Math.ceil((viewportWidth - view.panX) / scaledCell)),
    rowStart: clamp(Math.floor(-view.panY / scaledCell)),
    rowEnd: clamp(Math.ceil((viewportHeight - view.panY) / scaledCell)),
  };
}
