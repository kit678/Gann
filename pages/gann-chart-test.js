import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import GannSquareChart from '../components/GannSquareChart';
import { getLevelsForTicker } from '../utils/api';

const todayStr = () => new Date().toISOString().slice(0, 10);

const GannChartTest = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [tickerInput, setTickerInput] = useState('AAPL');
  const [selectedDate, setSelectedDate] = useState(''); // '' = live price, else 'YYYY-MM-DD'
  const [levelsData, setLevelsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cellSize, setCellSize] = useState(40);
  const [highlightSpokes, setHighlightSpokes] = useState(true);

  const fetchLevels = useCallback(async (tickerSymbol, date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLevelsForTicker(tickerSymbol, { date: date || null });
      // Guard against malformed/unexpected response shapes (e.g. the shared
      // API client's offline mock fallback, which has a different shape).
      if (!data || typeof data.price !== 'number' || typeof data.sun_angle !== 'number') {
        throw new Error('Unexpected response from levels API');
      }
      setLevelsData(data);
    } catch (err) {
      setLevelsData(null);
      setError(
        err?.response?.data?.detail ||
        `Could not fetch price for ${tickerSymbol}${date ? ` on ${date}` : ''}.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch whenever the confirmed ticker or date changes
  useEffect(() => {
    fetchLevels(ticker, selectedDate);
  }, [ticker, selectedDate, fetchLevels]);

  const handleTickerSubmit = (e) => {
    e.preventDefault();
    const cleaned = tickerInput.trim().toUpperCase();
    if (cleaned) setTicker(cleaned);
  };

  // Price -> integer grid target. Multiplying by 10 preserves one decimal
  // of price precision when mapping into the Gann Square's integer spiral.
  const targetNumber = levelsData ? Math.round(levelsData.price * 10) : 810;
  const sunDegree = levelsData ? Math.round(levelsData.sun_angle) : 71;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
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

              <div className="col-md-3">
                <label htmlFor="priceDate" className="form-label mb-1 d-block">Price Date:</label>
                <div className="d-flex align-items-center">
                  <input
                    type="date"
                    id="priceDate"
                    className="form-control"
                    value={selectedDate}
                    max={todayStr()}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ maxWidth: '160px' }}
                  />
                  {selectedDate && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => setSelectedDate('')}
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

              <div className="col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="highlightSpokes"
                    checked={highlightSpokes}
                    onChange={(e) => setHighlightSpokes(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="highlightSpokes">
                    Highlight Spokes
                  </label>
                </div>
              </div>

              <div className="col-md-2">
                <strong className="me-2">Target:</strong>
                <span className="badge bg-primary">{targetNumber}</span>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-8">
                {loading && <span className="text-muted">Loading {ticker}{selectedDate ? ` for ${selectedDate}` : ''}...</span>}
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
                    </div>
                    <div>
                      <strong className="me-2">Sun Position:</strong>
                      <span className="badge bg-warning text-dark">{sunDegree}°</span>
                      <span className="ms-2 text-muted">
                        ({levelsData.sun_position?.zodiac_sign || 'N/A'} {Number(levelsData.sun_position?.degrees_in_sign ?? 0).toFixed(2)}°)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <GannSquareChart
          targetNumber={targetNumber}
          sunPosition={sunDegree}
          cellSize={cellSize}
          highlightSpokes={highlightSpokes}
        />
      </div>
    </Layout>
  );
};

export default GannChartTest;
