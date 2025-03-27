/**
 * TradingView UDF API - History endpoint
 * 
 * Returns historical price data for a symbol.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

import axios from 'axios';

// Data source constants
const DATA_SOURCE = {
  YAHOO_FINANCE: 'yahoo',
  ALPHA_VANTAGE: 'alphavantage',
  MOCK: 'mock'
};

// Default data source (can be overridden by environment variable)
const DEFAULT_DATA_SOURCE = process.env.DEFAULT_DATA_SOURCE || DATA_SOURCE.YAHOO_FINANCE;

export default async function handler(req, res) {
  const { symbol, resolution, from, to, countback, source } = req.query;
  
  if (!symbol) {
    return res.status(400).json({
      s: 'error',
      errmsg: 'Symbol parameter is required'
    });
  }
  
  // Determine which data source to use
  // Priority: 1. Query param 2. Environment variable 3. Default (Yahoo Finance)
  const dataSource = source || DEFAULT_DATA_SOURCE;
  
  try {
    let data;
    
    // ==========================================
    // Option 1: Generate mock data
    // ==========================================
    if (dataSource === DATA_SOURCE.MOCK || process.env.USE_MOCK_DATA === 'true') {
      data = generateMockData(symbol, resolution, from, to);
      return res.status(200).json(data);
    }
    
    // ==========================================
    // Option 2: Yahoo Finance (Default)
    // ==========================================
    if (dataSource === DATA_SOURCE.YAHOO_FINANCE) {
      const { interval, range } = mapTradingViewToYahoo(resolution, from, to);
      
      // Method 1: Use internal Yahoo Finance API endpoint
      const yahooResponse = await axios.get(`/api/yahoo-finance`, {
        params: {
          ticker: symbol,
          interval,
          range
        },
        baseURL: process.env.NEXTAUTH_URL || `http://${req.headers.host}`
      });
      
      if (yahooResponse.data?.chart?.error) {
        throw new Error(yahooResponse.data.chart.error.description);
      }
      
      // Transform Yahoo Finance data to UDF format
      data = processYahooFinanceData(yahooResponse.data, from, to);
      return res.status(200).json(data);
    }
    
    // ==========================================
    // Option 3: Alpha Vantage
    // ==========================================
    if (dataSource === DATA_SOURCE.ALPHA_VANTAGE) {
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
      let interval = '1min'; // Default
      
      // Map TradingView resolutions to AlphaVantage intervals
      switch (resolution) {
        case '1':
          interval = '1min';
          break;
        case '5':
          interval = '5min';
          break;
        case '15':
          interval = '15min';
          break;
        case '30':
          interval = '30min';
          break;
        case '60':
          interval = '60min';
          break;
        case 'D':
        case '1D':
          interval = 'daily';
          break;
        case 'W':
        case '1W':
          interval = 'weekly';
          break;
        case 'M':
        case '1M':
          interval = 'monthly';
          break;
      }
      
      // Choose the right endpoint based on interval
      let endpoint = '';
      if (['1min', '5min', '15min', '30min', '60min'].includes(interval)) {
        endpoint = 'TIME_SERIES_INTRADAY';
      } else if (interval === 'daily') {
        endpoint = 'TIME_SERIES_DAILY';
      } else if (interval === 'weekly') {
        endpoint = 'TIME_SERIES_WEEKLY';
      } else if (interval === 'monthly') {
        endpoint = 'TIME_SERIES_MONTHLY';
      }
      
      // Fetch from Alpha Vantage API
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: endpoint,
          symbol: symbol,
          interval: ['1min', '5min', '15min', '30min', '60min'].includes(interval) ? interval : undefined,
          apikey: apiKey,
          outputsize: 'full'
        }
      });
      
      // Process the Alpha Vantage response to match UDF format
      data = processAlphaVantageData(response.data, from, to, interval);
      return res.status(200).json(data);
    }
    
    // If we reach here, no valid data source was selected
    throw new Error(`Invalid data source: ${dataSource}`);
    
  } catch (error) {
    console.error('Error fetching historical data:', error);
    
    return res.status(500).json({
      s: 'error',
      errmsg: error.message || 'Internal server error'
    });
  }
}

/**
 * Maps TradingView resolution and time range to Yahoo Finance parameters
 * @param {string} resolution - TradingView resolution
 * @param {number} from - Unix timestamp for start time
 * @param {number} to - Unix timestamp for end time
 * @returns {Object} - Yahoo Finance parameters
 */
function mapTradingViewToYahoo(resolution, from, to) {
  // Map TradingView resolution to Yahoo interval
  let interval;
  switch (resolution) {
    case '1':
      interval = '1m';
      break;
    case '5':
      interval = '5m';
      break;
    case '15':
      interval = '15m';
      break;
    case '30':
      interval = '30m';
      break;
    case '60':
      interval = '1h';
      break;
    case 'D':
    case '1D':
      interval = '1d';
      break;
    case 'W':
    case '1W':
      interval = '1wk';
      break;
    case 'M':
    case '1M':
      interval = '1mo';
      break;
    default:
      interval = '1d'; // Default to daily
  }
  
  // Calculate time difference in seconds
  const diffInSeconds = to - from;
  const diffInDays = Math.ceil(diffInSeconds / (60 * 60 * 24));
  
  // Map to Yahoo range parameter based on time difference
  let range;
  if (diffInDays <= 7) {
    range = '1wk';
  } else if (diffInDays <= 30) {
    range = '1mo';
  } else if (diffInDays <= 90) {
    range = '3mo';
  } else if (diffInDays <= 180) {
    range = '6mo';
  } else if (diffInDays <= 365) {
    range = '1y';
  } else if (diffInDays <= 730) {
    range = '2y';
  } else if (diffInDays <= 1825) {
    range = '5y';
  } else {
    range = 'max';
  }
  
  return { interval, range };
}

/**
 * Process Yahoo Finance data to match UDF format
 * @param {Object} data - Raw Yahoo Finance response data
 * @param {number} from - Unix timestamp for start time
 * @param {number} to - Unix timestamp for end time
 * @returns {Object} - UDF-compatible history response
 */
function processYahooFinanceData(data, from, to) {
  try {
    // Validate the response structure
    if (!data || !data.chart || !data.chart.result || data.chart.result.length === 0) {
      return { s: 'no_data' };
    }
    
    const result = data.chart.result[0];
    const { timestamp, indicators } = result;
    const quote = indicators.quote[0];
    
    // Check if we have the required data
    if (!timestamp || !quote || !quote.open || !quote.high || !quote.low || !quote.close) {
      return { s: 'no_data' };
    }
    
    // Convert to UDF format and filter by time range
    const t = [];  // timestamps
    const o = [];  // open
    const h = [];  // high
    const l = [];  // low
    const c = [];  // close
    const v = [];  // volume
    
    from = parseInt(from, 10);
    to = parseInt(to, 10);
    
    for (let i = 0; i < timestamp.length; i++) {
      const ts = timestamp[i];
      
      // Filter by time range
      if (ts < from || ts > to) continue;
      
      // Skip invalid data points
      if (!quote.open[i] || !quote.high[i] || !quote.low[i] || !quote.close[i]) continue;
      
      t.push(ts);
      o.push(parseFloat(quote.open[i]));
      h.push(parseFloat(quote.high[i]));
      l.push(parseFloat(quote.low[i]));
      c.push(parseFloat(quote.close[i]));
      v.push(quote.volume[i] || 0);
    }
    
    return {
      s: t.length > 0 ? 'ok' : 'no_data',
      t,
      o,
      h,
      l,
      c,
      v
    };
  } catch (error) {
    console.error('Error processing Yahoo Finance data:', error);
    return { s: 'error', errmsg: 'Failed to process Yahoo Finance data' };
  }
}

/**
 * Generate mock OHLC data for a symbol
 * @param {string} symbol - Symbol to generate data for
 * @param {string} resolution - Chart resolution
 * @param {number} from - Unix timestamp for start time
 * @param {number} to - Unix timestamp for end time
 * @returns {Object} - UDF-compatible history response
 */
function generateMockData(symbol, resolution, from, to) {
  // Convert from/to to integers
  from = parseInt(from, 10);
  to = parseInt(to, 10);
  
  // Determine the interval in seconds
  let intervalSeconds = 60; // Default to 1 minute
  
  switch (resolution) {
    case '1':
      intervalSeconds = 60;
      break;
    case '5':
      intervalSeconds = 5 * 60;
      break;
    case '15':
      intervalSeconds = 15 * 60;
      break;
    case '30':
      intervalSeconds = 30 * 60;
      break;
    case '60':
      intervalSeconds = 60 * 60;
      break;
    case 'D':
    case '1D':
      intervalSeconds = 24 * 60 * 60;
      break;
    case 'W':
    case '1W':
      intervalSeconds = 7 * 24 * 60 * 60;
      break;
    case 'M':
    case '1M':
      intervalSeconds = 30 * 24 * 60 * 60;
      break;
  }
  
  // Generate data points
  const t = []; // timestamps
  const o = []; // open prices
  const h = []; // high prices
  const l = []; // low prices
  const c = []; // close prices
  const v = []; // volumes
  
  // Base price depends on the symbol
  let basePrice = 0;
  
  switch (symbol) {
    case 'AAPL':
      basePrice = 150;
      break;
    case 'MSFT':
      basePrice = 300;
      break;
    case 'BTCUSD':
      basePrice = 30000;
      break;
    default:
      basePrice = 100;
  }
  
  // Generate a random walk
  let currentTimestamp = from;
  let currentPrice = basePrice;
  
  while (currentTimestamp <= to) {
    t.push(currentTimestamp);
    
    // Random price change within a range (more volatile for crypto)
    const volatility = symbol === 'BTCUSD' ? 0.02 : 0.01;
    const priceChange = currentPrice * (Math.random() * volatility * 2 - volatility);
    
    // Calculate OHLC values
    const open = currentPrice;
    const close = currentPrice + priceChange;
    const high = Math.max(open, close) + Math.random() * Math.abs(priceChange) * 0.5;
    const low = Math.min(open, close) - Math.random() * Math.abs(priceChange) * 0.5;
    const volume = Math.floor(Math.random() * 1000000) + 100000;
    
    o.push(parseFloat(open.toFixed(2)));
    h.push(parseFloat(high.toFixed(2)));
    l.push(parseFloat(low.toFixed(2)));
    c.push(parseFloat(close.toFixed(2)));
    v.push(volume);
    
    // Update for next iteration
    currentPrice = close;
    currentTimestamp += intervalSeconds;
  }
  
  return {
    s: 'ok',
    t: t,
    o: o,
    h: h,
    l: l,
    c: c,
    v: v
  };
}

/**
 * Process Alpha Vantage data to match UDF format
 * @param {Object} data - Raw Alpha Vantage data
 * @param {number} from - Unix timestamp for start time
 * @param {number} to - Unix timestamp for end time
 * @param {string} interval - Data interval (e.g., '1min', 'daily')
 * @returns {Object} - UDF-compatible history response
 */
function processAlphaVantageData(data, from, to, interval) {
  // Determine the right time series key based on the interval
  let timeSeriesKey = '';
  
  if (['1min', '5min', '15min', '30min', '60min'].includes(interval)) {
    timeSeriesKey = `Time Series (${interval})`;
  } else if (interval === 'daily') {
    timeSeriesKey = 'Time Series (Daily)';
  } else if (interval === 'weekly') {
    timeSeriesKey = 'Weekly Time Series';
  } else if (interval === 'monthly') {
    timeSeriesKey = 'Monthly Time Series';
  }
  
  // Check if we have valid data
  if (!data[timeSeriesKey]) {
    return { s: 'no_data' };
  }
  
  const timeSeries = data[timeSeriesKey];
  const dates = Object.keys(timeSeries).sort();
  
  // Convert to UDF format
  const t = []; // timestamps
  const o = []; // open prices
  const h = []; // high prices
  const l = []; // low prices
  const c = []; // close prices
  const v = []; // volumes
  
  // Parse the from/to timestamps
  from = parseInt(from, 10);
  to = parseInt(to, 10);
  
  for (const date of dates) {
    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    
    // Skip if outside the requested range
    if (timestamp < from || timestamp > to) continue;
    
    const candle = timeSeries[date];
    
    t.push(timestamp);
    o.push(parseFloat(candle['1. open']));
    h.push(parseFloat(candle['2. high']));
    l.push(parseFloat(candle['3. low']));
    c.push(parseFloat(candle['4. close']));
    v.push(parseInt(candle['5. volume'], 10));
  }
  
  return {
    s: t.length > 0 ? 'ok' : 'no_data',
    t,
    o,
    h,
    l,
    c,
    v
  };
} 