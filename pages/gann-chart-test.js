import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Layout from '../components/Layout';
import GannSquareChart from '../components/GannSquareChart';
import LevelLadderTable from '../components/LevelLadderTable';
import TimeToolsPanel from '../components/TimeToolsPanel';
import CosmogramPanel from '../components/CosmogramPanel';
import LayoutViewer from '../components/LayoutViewer';
import FiguresPanel from '../components/FiguresPanel';
import DataTypePanel, { defaultDataType, gridLabels } from '../components/DataTypePanel';
import { defaultFigures } from '../utils/gannzillaFigures';
import { getLevelsForTicker, getCelestial } from '../utils/api';
import { ZERO_DEGREE_PRESETS, DEFAULT_ZERO_DEGREE_OFFSET, MAX_CELLS } from '../utils/gannGrid';
import { nearestCell, cellValue } from '../utils/gannzillaGrid';

// Stable empty list, so hiding projections doesn't hand the chart a new array every render.
const NO_PROJECTIONS = [];

/**
 * Current wall-clock time in US Eastern, as 'YYYY-MM-DDTHH:mm'. Used as the
 * max for the picker, which is itself labelled and interpreted as ET - using
 * the browser's local zone here would wrongly block or allow times depending
 * on where the user happens to be.
 */
const nowEasternInput = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
};

const GannChartTest = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [tickerInput, setTickerInput] = useState('AAPL');
  const [selectedDateTime, setSelectedDateTime] = useState(''); // '' = live
  const [levelsData, setLevelsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cellSize, setCellSize] = useState(40);
  const [highlightSpokes, setHighlightSpokes] = useState(true);
  const [showSun, setShowSun] = useState(true);
  const [showMoon, setShowMoon] = useState(true);
  const [chartLevels, setChartLevels] = useState(null);
  const [zeroDegreeOffset, setZeroDegreeOffset] = useState(DEFAULT_ZERO_DEGREE_OFFSET);
  // Gannzilla's grid: the centre cell shows Value and each step adds
  // Increment. 0.1 / 0.1 is the old "x10 on"; 1 / 1 is the old "x10 off".
  // Which reads better is judged per ticker by eye, so it stays a manual choice.
  const [gridValueInput, setGridValueInput] = useState('0.1');
  const [gridIncrementInput, setGridIncrementInput] = useState('0.1');
  const [clockwise, setClockwise] = useState(true);
  const [findInput, setFindInput] = useState('');
  // Every body's longitude, reported by the Cosmogram, for grid projections.
  const [projections, setProjections] = useState([]);
  const [showProjections, setShowProjections] = useState(true);
  const [ladders, setLadders] = useState(null);
  const [markCount, setMarkCount] = useState(8);
  const [showLadder, setShowLadder] = useState(false);
  // Gannzilla's Figures, shared by the Square of 9 and the Cosmogram.
  const [figures, setFigures] = useState(defaultFigures);
  // Gannzilla's Data type (Price / Date / Time / Price and date / Price and time).
  const [dataTypeSettings, setDataTypeSettings] = useState(
    () => defaultDataType(new Date().toISOString().slice(0, 10))
  );

  // Live-polled positions. Null means "use whatever came back with the price".
  const [livePositions, setLivePositions] = useState(null);

  const fetchLevels = useCallback(async (tickerSymbol, datetime) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLevelsForTicker(tickerSymbol, { datetime: datetime || null });
      if (!data || typeof data.price !== 'number' || typeof data.sun_angle !== 'number') {
        throw new Error('Unexpected response from levels API');
      }
      setLevelsData(data);
    } catch (err) {
      setLevelsData(null);
      setError(
        err?.response?.data?.detail ||
        `Could not fetch price for ${tickerSymbol}${datetime ? ` at ${datetime}` : ''}.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLevels(ticker, selectedDateTime);
  }, [ticker, selectedDateTime, fetchLevels]);

  // Poll the ephemeris in live mode only. This is a local calculation on the
  // server, so it costs nothing and cannot be rate-limited - unlike the price
  // feed, which is deliberately not polled.
  useEffect(() => {
    if (selectedDateTime) {
      setLivePositions(null);
      return undefined;
    }

    let cancelled = false;

    const tick = async () => {
      try {
        const data = await getCelestial();
        if (cancelled) return;
        setLivePositions((previous) => {
          const nextSun = Math.round(data.sun.angle);
          const nextMoon = Math.round(data.moon.angle);
          if (previous && previous.sunDegree === nextSun && previous.moonDegree === nextMoon) {
            return { ...previous, datetimeEt: data.datetime_et }; // Square unchanged, but the clock still ticks.
          }
          return {
            sunDegree: nextSun, moonDegree: nextMoon, sun: data.sun, moon: data.moon,
            datetimeEt: data.datetime_et,
          };
        });
      } catch (err) {
        // A dropped poll must not clear the chart. Keep the last known
        // positions and try again on the next tick.
        console.warn('Celestial poll failed, keeping last known positions:', err.message);
      }
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [selectedDateTime]);

  const handleTickerSubmit = (e) => {
    e.preventDefault();
    const cleaned = tickerInput.trim().toUpperCase();
    if (cleaned) setTicker(cleaned);
  };

  // Price -> grid square: the cell whose value is nearest the price.
  const gridValue = Number(gridValueInput);
  const gridIncrement = Number(gridIncrementInput);
  const gridError =
    !Number.isFinite(gridValue) || gridValueInput.trim() === '' ? 'Value must be a number.'
    : !(gridIncrement > 0) ? 'Increment must be greater than 0.'
    : null;
  const priceCell = gridError
    ? null
    : nearestCell(levelsData ? levelsData.price : 81, { value: gridValue, increment: gridIncrement });
  const shownError = gridError ?? (priceCell === null ? 'Price is below Value.' : null);
  const targetNumber = priceCell;
  const findValue = findInput.trim() === '' ? null : Number(findInput);

  // Date/Time labels for the grids. Price-only keeps the charts' own labels.
  const labels = useMemo(() => gridLabels(
    dataTypeSettings,
    (n) => String(Math.round(cellValue(n, { value: gridValue, increment: gridIncrement }) * 10000) / 10000),
    MAX_CELLS,
  ), [dataTypeSettings, gridValue, gridIncrement]);

  const sunDegree = livePositions
    ? livePositions.sunDegree
    : levelsData
      ? Math.round(levelsData.sun_angle)
      : 71;

  const moonDegree = livePositions
    ? livePositions.moonDegree
    : levelsData && levelsData.moon_position
      ? Math.round(levelsData.moon_position.angle)
      : null;

  const sunDetail = livePositions ? livePositions.sun : levelsData?.sun_position;
  const moonDetail = livePositions ? livePositions.moon : levelsData?.moon_position;

  // What instant the grid's Sun/Moon squares were actually computed from.
  const gridDatetimeLabel = selectedDateTime
    ? `${selectedDateTime.replace('T', ' ')} ET (historical)`
    : livePositions?.datetimeEt
      ? `${livePositions.datetimeEt} ET (live)`
      : 'Loading current time…';

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="mb-3">
              <strong className="me-2">Grid reflects:</strong>
              <span className="badge bg-info text-dark">{gridDatetimeLabel}</span>
            </div>

            <div className="row align-items-end g-3">
              <div className="col-md-3">
                <form onSubmit={handleTickerSubmit}>
                  <label htmlFor="tickerInput" className="form-label mb-1">Ticker:</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      id="tickerInput"
                      value={tickerInput}
                      onChange={(e) => setTickerInput(e.target.value)}
                      style={{ maxWidth: '140px' }}
                    />
                    <button type="submit" className="btn btn-primary ms-2">Go</button>
                  </div>
                </form>
              </div>

              <div className="col-md-4">
                <label htmlFor="priceDateTime" className="form-label mb-1 d-block">
                  Date &amp; time <span className="text-muted">(ET)</span>:
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="datetime-local"
                    id="priceDateTime"
                    className="form-control"
                    value={selectedDateTime}
                    max={nowEasternInput()}
                    onChange={(e) => setSelectedDateTime(e.target.value)}
                    style={{ maxWidth: '220px' }}
                  />
                  {selectedDateTime && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => setSelectedDateTime('')}
                    >
                      Use live
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md-2">
                <label htmlFor="cellSize" className="form-label mb-1">Cell Size:</label>
                <input
                  type="number"
                  className="form-control"
                  id="cellSize"
                  value={cellSize}
                  onChange={(e) => setCellSize(parseInt(e.target.value) || 20)}
                  min="20"
                  max="80"
                  style={{ maxWidth: '80px' }}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="zeroDegreeOffset" className="form-label mb-1 d-block">
                  0° line <span className="text-muted">(square offset)</span>:
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control"
                    id="zeroDegreeOffset"
                    value={zeroDegreeOffset}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10);
                      setZeroDegreeOffset(Number.isFinite(n) ? n : 0);
                    }}
                    style={{ maxWidth: '90px' }}
                  />
                  <span className="ms-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    {zeroDegreeOffset === ZERO_DEGREE_PRESETS.oddSquare
                      ? '0° → 361 (odd-square line)'
                      : zeroDegreeOffset === ZERO_DEGREE_PRESETS.legacy
                        ? '0° → 360 (legacy)'
                        : `0° → ${360 + zeroDegreeOffset}`}
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <label htmlFor="markCount" className="form-label mb-1 d-block">
                  Marks <span className="text-muted">(each way)</span>:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="markCount"
                  value={markCount}
                  min="1"
                  max="64"
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    setMarkCount(Number.isFinite(n) && n > 0 ? n : 8);
                  }}
                  style={{ maxWidth: '90px' }}
                />
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="showSun"
                         checked={showSun} onChange={(e) => setShowSun(e.target.checked)} />
                  <label className="form-check-label" htmlFor="showSun">Show Sun</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="showMoon"
                         checked={showMoon} onChange={(e) => setShowMoon(e.target.checked)} />
                  <label className="form-check-label" htmlFor="showMoon">Show Moon</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="showProjections"
                         checked={showProjections}
                         onChange={(e) => setShowProjections(e.target.checked)} />
                  <label className="form-check-label" htmlFor="showProjections">
                    Planet projections
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="clockwise"
                         checked={clockwise} onChange={(e) => setClockwise(e.target.checked)} />
                  <label className="form-check-label" htmlFor="clockwise">Clockwise</label>
                </div>
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="gridValue" style={{ width: '4.5rem' }}>
                    Value
                  </label>
                  <input type="number" step="any" id="gridValue" className="form-control form-control-sm"
                         value={gridValueInput}
                         onChange={(e) => setGridValueInput(e.target.value)} />
                </div>
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="gridIncrement" style={{ width: '4.5rem' }}>
                    Increment
                  </label>
                  <input type="number" step="any" min="0" id="gridIncrement"
                         className="form-control form-control-sm"
                         value={gridIncrementInput}
                         onChange={(e) => setGridIncrementInput(e.target.value)} />
                </div>
                {shownError && <div className="text-danger small mt-1">{shownError}</div>}
                <div className="d-flex mt-1" style={{ gap: '0.5rem' }}>
                  <label className="form-label mb-0" htmlFor="findInput" style={{ width: '4.5rem' }}>
                    Find
                  </label>
                  <input type="number" step="any" id="findInput" className="form-control form-control-sm"
                         placeholder="price" value={findInput}
                         onChange={(e) => setFindInput(e.target.value)} />
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="highlightSpokes"
                         checked={highlightSpokes}
                         onChange={(e) => setHighlightSpokes(e.target.checked)} />
                  <label className="form-check-label" htmlFor="highlightSpokes">
                    Highlight Crosses
                  </label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                {loading && (
                  <span className="text-muted">
                    Loading {ticker}{selectedDateTime ? ` at ${selectedDateTime} ET` : ''}...
                  </span>
                )}
                {!loading && error && <span className="text-danger">{error}</span>}
                {!loading && !error && levelsData && (
                  <div className="d-flex flex-wrap align-items-center" style={{ gap: '1.5rem' }}>
                    <div>
                      <strong className="me-2">{levelsData.symbol}:</strong>
                      <span className="badge bg-success">
                        ${Number(levelsData.price).toFixed(2)}
                      </span>
                      <span className="ms-2 text-muted">
                        {levelsData.price_date ? `as of ${levelsData.price_date}` : '(live)'}
                      </span>
                      <span className="ms-2 text-muted">
                        {!shownError && <>→ square {targetNumber} (Value {gridValue}, Increment {gridIncrement})</>}
                      </span>
                    </div>
                    <div>
                      <strong className="me-2">Sun:</strong>
                      <span className="badge bg-warning text-dark">{sunDegree}°</span>
                      <span className="ms-2 text-muted">
                        ({sunDetail?.zodiac_sign || 'N/A'}{' '}
                        {Number(sunDetail?.degrees_in_sign ?? 0).toFixed(2)}°)
                      </span>
                    </div>
                    {moonDegree !== null && (
                      <div>
                        <strong className="me-2">Moon:</strong>
                        <span className="badge bg-secondary">{moonDegree}°</span>
                        <span className="ms-2 text-muted">
                          ({moonDetail?.zodiac_sign || 'N/A'}{' '}
                          {Number(moonDetail?.degrees_in_sign ?? 0).toFixed(2)}°)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {chartLevels && (
              <div className="row mt-3">
                <div className="col-12">
                  {chartLevels.isConjunct && showSun && showMoon ? (
                    <div className="text-muted mb-1">
                      Sun and Moon are conjunct — both bodies give the same levels.
                    </div>
                  ) : null}
                  {showSun && (
                    <div>
                      <strong className="me-2">Sun levels —</strong>
                      <span className="text-success me-3">Up: {chartLevels.sun.up.join(', ') || 'none'}</span>
                      <span className="text-danger">Down: {chartLevels.sun.down.join(', ') || 'none'}</span>
                    </div>
                  )}
                  {showMoon && (chartLevels.moon.up.length > 0 || chartLevels.moon.down.length > 0) && (
                    <div>
                      <strong className="me-2">Moon levels —</strong>
                      <span className="text-success me-3">Up: {chartLevels.moon.up.join(', ') || 'none'}</span>
                      <span className="text-danger">Down: {chartLevels.moon.down.join(', ') || 'none'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <FiguresPanel figures={figures} onChange={setFigures} />
        <DataTypePanel settings={dataTypeSettings} onChange={setDataTypeSettings} error={labels.error} />

        {!shownError && (
        <GannSquareChart
          targetNumber={targetNumber}
          sunPosition={sunDegree}
          moonPosition={moonDegree}
          showSun={showSun}
          showMoon={showMoon}
          cellSize={cellSize}
          highlightSpokes={highlightSpokes}
          zeroDegreeOffset={zeroDegreeOffset}
          gridValue={gridValue}
          gridIncrement={gridIncrement}
          clockwise={clockwise}
          findValue={findValue}
          cellLabel={labels.cellLabel}
          findIndexOverride={labels.findIndex}
          projections={showProjections ? projections : NO_PROJECTIONS}
          markCount={markCount}
          figures={figures}
          onLevelsChange={setChartLevels}
          onLaddersChange={setLadders}
        />
        )}

        {ladders && (
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <strong>Level ladder</strong>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowLadder((v) => !v)}
                >
                  {showLadder ? 'Hide' : 'Show'}
                </button>
              </div>
              {showLadder && (
                <LevelLadderTable
                  ladders={[
                    ladders.center,
                    showSun ? ladders.sun : [],
                    showMoon ? ladders.moon : [],
                  ]}
                  price={levelsData ? levelsData.price : null}
                />
              )}
            </div>
          </div>
        )}

        {/* The picker's ET wall-clock time doubles as Gannzilla's New York
            base time (Gannzilla ignores daylight saving). */}
        {!shownError && (
          <LayoutViewer
            gridValue={gridValue}
            gridIncrement={gridIncrement}
            clockwise={clockwise}
            price={levelsData ? Number(levelsData.price) : null}
            findValue={findValue}
            cellLabel={labels.cellLabel}
            findIndexOverride={labels.findIndex}
          />
        )}

        <CosmogramPanel
          datetime={selectedDateTime || null}
          price={levelsData ? Number(levelsData.price) : null}
          onBodiesChange={setProjections}
          figures={figures}
        />

        <TimeToolsPanel datetime={selectedDateTime || null} />
      </div>
    </Layout>
  );
};

export default GannChartTest;
