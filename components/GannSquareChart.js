import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  buildGannSquare, findLevels, normalizeBodyDegree, MAX_CELLS,
  DEFAULT_ZERO_DEGREE_OFFSET,
} from '../utils/gannGrid';
import { fitView, zoomAt, visibleCellRange, MIN_ZOOM, MAX_ZOOM } from '../utils/gannView';

const VIEWPORT_WIDTH = 900;
const VIEWPORT_HEIGHT = 620;

/** Below this on-screen cell size, numbers are illegible - skip drawing them. */
const LABEL_MIN_CELL_PX = 14;

const COLORS = {
  grid: '#ddd',
  text: '#333',
  center: 'rgba(100, 200, 100, 0.5)',
  oddSquare: 'rgba(100, 100, 200, 0.5)',
  target: 'rgba(255, 165, 0, 0.6)',
  targetBorder: 'rgba(255, 165, 0, 1)',
  sunCell: 'rgba(255, 215, 0, 0.6)',
  sunCross: 'rgba(0, 100, 255, 0.5)',
  moonCell: 'rgba(200, 210, 224, 0.75)',
  moonCross: 'rgba(160, 80, 220, 0.55)',
  conjunctCell: 'rgba(214, 150, 90, 0.8)',
  upFill: 'rgba(0, 200, 0, 0.4)',
  downFill: 'rgba(255, 0, 0, 0.4)',
  upRing: 'rgba(0, 160, 0, 0.95)',
  downRing: 'rgba(210, 0, 0, 0.95)',
};

const cellKey = (row, col) => `${row},${col}`;

/** Draw the Sun's rayed disc, centred in its square. */
function drawSunGlyph(ctx, cx, cy, cellSize, zoom) {
  const radius = cellSize * 0.22;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 200, 0, 0.9)';
  ctx.fill();

  ctx.strokeStyle = 'rgba(230, 150, 0, 0.9)';
  ctx.lineWidth = 1 / zoom;
  for (let angle = 0; angle < 360; angle += 45) {
    const rad = (angle * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(rad) * radius, cy + Math.sin(rad) * radius);
    ctx.lineTo(cx + Math.cos(rad) * (radius * 1.5), cy + Math.sin(rad) * (radius * 1.5));
    ctx.stroke();
  }
}

/** Draw a crescent by punching an offset disc out of a full disc. */
function drawMoonGlyph(ctx, cx, cy, cellSize, zoom) {
  const radius = cellSize * 0.24;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(245, 247, 252, 0.95)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(120, 130, 150, 0.9)';
  ctx.lineWidth = 1 / zoom;
  ctx.stroke();

  // Cut the crescent using the square's own background colour.
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cx + radius * 0.55, cy - radius * 0.2, radius * 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Renders the Gann Square of 9 with pan/zoom, and overlays the Sun's and
 * Moon's crosses and their derived levels.
 */
const GannSquareChart = ({
  targetNumber = 81,
  sunPosition = 71,
  moonPosition = null,
  showSun = true,
  showMoon = true,
  cellSize = 40,
  highlightSpokes = true,
  zeroDegreeOffset = DEFAULT_ZERO_DEGREE_OFFSET,
  onLevelsChange,
}) => {
  const canvasRef = useRef(null);
  const [view, setView] = useState({ zoom: 1, panX: 0, panY: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  const sunDegree = normalizeBodyDegree(sunPosition, 71, zeroDegreeOffset);
  const moonDegree =
    moonPosition == null ? null : normalizeBodyDegree(moonPosition, 71, zeroDegreeOffset);
  const isConjunct = moonDegree !== null && moonDegree === sunDegree;

  // Build one grid per visible body. The spiral itself is identical; only the
  // recorded body position differs, so levels differ. Skipped entirely while
  // hidden - nothing downstream (overlay, legend, or the page's level
  // summary) reads Moon data when showMoon is off, so there's no reason to
  // rebuild a possibly-large spiral matrix for it.
  const sunGrid = useMemo(
    () => buildGannSquare(targetNumber, sunDegree),
    [targetNumber, sunDegree]
  );
  const moonGrid = useMemo(
    () => (!showMoon || moonDegree === null ? null : buildGannSquare(targetNumber, moonDegree)),
    [showMoon, targetNumber, moonDegree]
  );

  const sunLevels = useMemo(() => findLevels(sunGrid, 3), [sunGrid]);
  const moonLevels = useMemo(
    () => (moonGrid ? findLevels(moonGrid, 3) : { up: [], down: [] }),
    [moonGrid]
  );

  const tooLarge = sunGrid.tooLarge;
  const dimension = sunGrid.dimension;

  // Report levels upward so the page can render them outside the canvas.
  useEffect(() => {
    if (!onLevelsChange) return;
    onLevelsChange({
      sun: { up: sunLevels.up.map((l) => l.value), down: sunLevels.down.map((l) => l.value) },
      moon: { up: moonLevels.up.map((l) => l.value), down: moonLevels.down.map((l) => l.value) },
      isConjunct,
    });
  }, [sunLevels, moonLevels, isConjunct, onLevelsChange]);

  // Fit only when the grid dimension changes. Recalculating levels (which the
  // Moon triggers roughly every 1.8 hours) must not throw away the user's view.
  useEffect(() => {
    if (!dimension) return;
    setView(fitView(dimension, cellSize, VIEWPORT_WIDTH, VIEWPORT_HEIGHT));
  }, [dimension, cellSize]);

  const handleFit = useCallback(() => {
    if (!dimension) return;
    setView(fitView(dimension, cellSize, VIEWPORT_WIDTH, VIEWPORT_HEIGHT));
  }, [dimension, cellSize]);

  const handleZoomButton = useCallback((factor) => {
    setView((current) => zoomAt(current, VIEWPORT_WIDTH / 2, VIEWPORT_HEIGHT / 2, factor));
  }, []);

  // Wheel zoom is attached natively so it can be non-passive and preventDefault.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      setView((current) =>
        zoomAt(current, e.clientX - rect.left, e.clientY - rect.top, factor)
      );
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  const startPan = (e) => {
    setIsPanning(true);
    panStart.current = { x: e.clientX - view.panX, y: e.clientY - view.panY };
  };

  useEffect(() => {
    if (!isPanning) return undefined;

    let frame = null;
    let latest = null;

    const apply = () => {
      frame = null;
      if (!latest) return;
      const { x, y } = latest;
      setView((current) => ({
        ...current,
        panX: x - panStart.current.x,
        panY: y - panStart.current.y,
      }));
    };

    const onMove = (e) => {
      latest = { x: e.clientX, y: e.clientY };
      if (frame === null) frame = requestAnimationFrame(apply);
    };
    const onUp = () => setIsPanning(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [isPanning]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tooLarge || !dimension) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const upSun = new Set(sunLevels.up.map((l) => cellKey(l.row, l.col)));
    const downSun = new Set(sunLevels.down.map((l) => cellKey(l.row, l.col)));
    const upMoon = new Set(moonLevels.up.map((l) => cellKey(l.row, l.col)));
    const downMoon = new Set(moonLevels.down.map((l) => cellKey(l.row, l.col)));

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    ctx.save();
    ctx.translate(view.panX, view.panY);
    ctx.scale(view.zoom, view.zoom);

    const range = visibleCellRange(view, cellSize, dimension, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    const scaledCell = cellSize * view.zoom;
    const drawLabels = scaledCell >= LABEL_MIN_CELL_PX;
    const gridPx = dimension * cellSize;

    // Grid lines - only the visible ones
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1 / view.zoom;
    for (let r = range.rowStart; r <= range.rowEnd + 1; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(gridPx, r * cellSize);
      ctx.stroke();
    }
    for (let c = range.colStart; c <= range.colEnd + 1; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, gridPx);
      ctx.stroke();
    }

    // Body crosses, drawn full-width across the grid
    const drawCross = (position, color) => {
      if (position.row < 0) return;
      const cx = position.col * cellSize + cellSize / 2;
      const cy = position.row * cellSize + cellSize / 2;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 / view.zoom;

      const lines = [
        [0, cy, gridPx, cy],
        [cx, 0, cx, gridPx],
        [0, cy - cx, gridPx, cy - cx + gridPx],
        [0, cy + cx, gridPx, cy + cx - gridPx],
      ];
      lines.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
    };

    if (highlightSpokes) {
      if (showSun && sunGrid.bodyFound) drawCross(sunGrid.bodyPosition, COLORS.sunCross);
      if (showMoon && moonGrid && moonGrid.bodyFound) {
        drawCross(moonGrid.bodyPosition, COLORS.moonCross);
      }
    }

    // Cells
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.max(10, cellSize * 0.4)}px Arial`;

    for (let row = range.rowStart; row <= range.rowEnd; row++) {
      for (let col = range.colStart; col <= range.colEnd; col++) {
        const value = sunGrid.matrix[row][col];
        if (value === null) continue;

        const x = col * cellSize;
        const y = row * cellSize;
        const key = cellKey(row, col);

        if (value === 1) {
          ctx.fillStyle = COLORS.center;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        const root = Math.sqrt(value);
        if (root % 1 === 0 && root % 2 === 1) {
          ctx.fillStyle = COLORS.oddSquare;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        // Sun levels fill; Moon levels ring. A square that is both shows both.
        if (showSun && upSun.has(key)) {
          ctx.fillStyle = COLORS.upFill;
          ctx.fillRect(x, y, cellSize, cellSize);
        } else if (showSun && downSun.has(key)) {
          ctx.fillStyle = COLORS.downFill;
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        if (showMoon && (upMoon.has(key) || downMoon.has(key))) {
          ctx.strokeStyle = upMoon.has(key) ? COLORS.upRing : COLORS.downRing;
          ctx.lineWidth = 3 / view.zoom;
          ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
        }

        // Body squares
        const isSunCell =
          showSun && row === sunGrid.bodyPosition.row && col === sunGrid.bodyPosition.col;
        const isMoonCell =
          showMoon &&
          moonGrid &&
          row === moonGrid.bodyPosition.row &&
          col === moonGrid.bodyPosition.col;

        const glyphX = x + cellSize / 2;
        const glyphY = y + cellSize / 2;

        if (isSunCell && isMoonCell) {
          ctx.fillStyle = COLORS.conjunctCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawSunGlyph(ctx, glyphX, glyphY, cellSize, view.zoom);
        } else if (isSunCell) {
          ctx.fillStyle = COLORS.sunCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawSunGlyph(ctx, glyphX, glyphY, cellSize, view.zoom);
        } else if (isMoonCell) {
          ctx.fillStyle = COLORS.moonCell;
          ctx.fillRect(x, y, cellSize, cellSize);
          drawMoonGlyph(ctx, glyphX, glyphY, cellSize, view.zoom);
        }

        if (row === sunGrid.targetPosition.row && col === sunGrid.targetPosition.col) {
          ctx.fillStyle = COLORS.target;
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.strokeStyle = COLORS.targetBorder;
          ctx.lineWidth = 2 / view.zoom;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }

        if (drawLabels) {
          ctx.fillStyle = COLORS.text;
          ctx.fillText(String(value), x + cellSize / 2, y + cellSize / 2);
        }
      }
    }

    ctx.restore();
  }, [
    view, cellSize, dimension, tooLarge, highlightSpokes,
    showSun, showMoon, sunGrid, moonGrid, sunLevels, moonLevels,
  ]);

  if (tooLarge) {
    return (
      <div className="alert alert-warning">
        This price needs a grid larger than {MAX_CELLS.toLocaleString()} squares, which would
        freeze the browser. Try an instrument priced under about $397,000.
      </div>
    );
  }

  const sunMissing = showSun && !sunGrid.bodyFound;
  const moonMissing = showMoon && moonGrid !== null && !moonGrid.bodyFound;

  return (
    <div>
      {(sunMissing || moonMissing) && (
        <div className="alert alert-warning py-2">
          {sunMissing && <div>Sun square not present in this grid — Sun overlay hidden.</div>}
          {moonMissing && <div>Moon square not present in this grid — Moon overlay hidden.</div>}
        </div>
      )}

      <div className="d-flex align-items-center mb-2" style={{ gap: '0.5rem' }}>
        <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => handleZoomButton(1 / 1.2)}>−</button>
        <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => handleZoomButton(1.2)}>+</button>
        <button type="button" className="btn btn-sm btn-outline-primary"
                onClick={handleFit}>Fit</button>
        <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
          {Math.round(view.zoom * 100)}% · scroll to zoom, drag to pan
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={VIEWPORT_WIDTH}
        height={VIEWPORT_HEIGHT}
        onMouseDown={startPan}
        style={{
          border: '1px solid #ccc',
          background: '#fff',
          display: 'block',
          maxWidth: '100%',
          cursor: isPanning ? 'grabbing' : 'grab',
        }}
      />

      <div className="d-flex flex-wrap mt-2" style={{ gap: '1rem', fontSize: '0.85rem' }}>
        <Swatch color={COLORS.center} label="Center (1)" />
        <Swatch color={COLORS.oddSquare} label="Odd squares (9, 25, 49...)" />
        <Swatch color={COLORS.target} label="Price square" />
        {showSun && <Swatch color={COLORS.sunCell} label="Sun" />}
        {showMoon && moonGrid && <Swatch color={COLORS.moonCell} label="Moon" />}
        {isConjunct && showSun && showMoon && (
          <Swatch color={COLORS.conjunctCell} label="Sun/Moon conjunct" />
        )}
        {showSun && <Swatch color={COLORS.upFill} label="Sun up levels (filled)" />}
        {showSun && <Swatch color={COLORS.downFill} label="Sun down levels (filled)" />}
        {showMoon && moonGrid && <Swatch color="transparent" border={COLORS.upRing}
                                          label="Moon up levels (ring)" />}
        {showMoon && moonGrid && <Swatch color="transparent" border={COLORS.downRing}
                                          label="Moon down levels (ring)" />}
      </div>
    </div>
  );
};

const Swatch = ({ color, border, label }) => (
  <span className="d-inline-flex align-items-center" style={{ gap: '0.35rem' }}>
    <span
      style={{
        width: 14,
        height: 14,
        background: color,
        border: border ? `3px solid ${border}` : '1px solid #bbb',
        display: 'inline-block',
      }}
    />
    {label}
  </span>
);

export default GannSquareChart;
