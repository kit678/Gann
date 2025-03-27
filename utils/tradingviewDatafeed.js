/**
 * TradingView UDF (Universal Data Feed) compatible data provider
 * 
 * This module implements a data provider that conforms to the TradingView
 * Charting Library UDF protocol. It can be used to feed data to a TradingView
 * chart from various sources.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF
 */

/**
 * Default configuration for the UDF compatible data feed
 */
const defaultConfig = {
  supportedResolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
  exchanges: [
    { value: 'BINANCE', name: 'Binance', desc: 'Binance Crypto Exchange' },
    { value: 'NYSE', name: 'NYSE', desc: 'New York Stock Exchange' },
    { value: 'NASDAQ', name: 'NASDAQ', desc: 'NASDAQ Stock Exchange' },
  ],
  symbolTypes: [
    { name: 'stock', value: 'stock' },
    { name: 'crypto', value: 'crypto' },
    { name: 'forex', value: 'forex' },
  ],
};

/**
 * DataFeedProvider class for fetching and formatting data for TradingView charts
 */
export class DataFeedProvider {
  constructor(options = {}) {
    this.options = {
      ...defaultConfig,
      ...options,
    };
    
    this.apiBaseUrl = options.apiBaseUrl || '/api/tradingview';
    this.debug = options.debug || false;
    this.lastBarsCache = new Map();
    this.subscribedBars = new Map();
    this.replayData = null;
  }
  
  /**
   * Generate a UDF-compatible configuration for the TradingView datafeed
   */
  getConfig() {
    return {
      supported_resolutions: this.options.supportedResolutions,
      supports_search: true,
      supports_group_request: false,
      supports_marks: true,
      supports_timescale_marks: true,
      supports_time: true,
      exchanges: this.options.exchanges,
      symbol_types: this.options.symbolTypes,
    };
  }
  
  /**
   * Fetch symbols matching the provided search string
   * @param {string} userInput - User's search input
   * @param {string} exchange - Exchange filter (optional)
   * @param {string} symbolType - Symbol type filter (optional)
   * @param {number} limit - Maximum number of results to return
   * @returns {Promise<Array>} - Array of symbol objects
   */
  async searchSymbols(userInput, exchange, symbolType, limit) {
    if (this.debug) {
      console.log('searchSymbols:', { userInput, exchange, symbolType, limit });
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/search?query=${encodeURIComponent(userInput)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.symbols || [];
    } catch (error) {
      console.error('Symbol search error:', error);
      return [];
    }
  }
  
  /**
   * Fetch symbol details by symbol name
   * @param {string} symbolName - Symbol to resolve
   * @returns {Promise<Object>} - Symbol information
   */
  async resolveSymbol(symbolName) {
    if (this.debug) {
      console.log('resolveSymbol:', symbolName);
    }
    
    // For testing with static data
    if (this.options.testSymbols && this.options.testSymbols[symbolName]) {
      return { ...this.options.testSymbols[symbolName] };
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/symbols?symbol=${encodeURIComponent(symbolName)}`);
      
      if (!response.ok) {
        throw new Error(`Symbol resolution failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.symbol) {
        throw new Error(`Symbol ${symbolName} not found`);
      }
      
      return {
        name: data.symbol,
        ticker: data.symbol,
        description: data.description || data.symbol,
        type: data.type || 'stock',
        session: data.session || '24x7',
        exchange: data.exchange || '',
        listed_exchange: data.listed_exchange || '',
        timezone: data.timezone || 'Etc/UTC',
        minmov: data.minmov || 1,
        pricescale: data.pricescale || 100,
        has_intraday: data.has_intraday !== undefined ? data.has_intraday : true,
        has_daily: data.has_daily !== undefined ? data.has_daily : true,
        has_weekly_and_monthly: data.has_weekly_and_monthly !== undefined ? data.has_weekly_and_monthly : true,
        data_status: data.data_status || 'streaming',
        supported_resolutions: data.supported_resolutions || this.options.supportedResolutions,
      };
    } catch (error) {
      console.error('Symbol resolution error:', error);
      return null;
    }
  }
  
  /**
   * Fetch historical bars for a symbol
   * @param {string} symbolInfo - Symbol information object
   * @param {string} resolution - Chart resolution
   * @param {number} from - Unix timestamp (seconds) for the start of the range
   * @param {number} to - Unix timestamp (seconds) for the end of the range
   * @param {Function} onHistoryCallback - Callback function for the results
   * @param {Function} onErrorCallback - Callback function for errors
   */
  async getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback) {
    if (this.debug) {
      console.log('getBars:', { symbol: symbolInfo.name, resolution, from, to });
    }
    
    // For testing/backtesting modes with predefined data
    if (this.replayData && this.options.useReplayData) {
      return this._getReplayBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback);
    }
    
    try {
      const url = `${this.apiBaseUrl}/history?symbol=${encodeURIComponent(symbolInfo.name)}&resolution=${encodeURIComponent(resolution)}&from=${from}&to=${to}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`History data request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.s !== 'ok' && data.s !== 'no_data') {
        if (data.errmsg) {
          throw new Error(data.errmsg);
        }
        throw new Error('Unknown error getting bars');
      }
      
      if (data.s === 'no_data') {
        onHistoryCallback([], { noData: true });
        return;
      }
      
      // Format the response data into bars
      const bars = [];
      const { t, c, o, h, l, v } = data;
      
      for (let i = 0; i < t.length; i++) {
        bars.push({
          time: t[i] * 1000, // Convert to milliseconds for TradingView
          close: parseFloat(c[i]),
          open: parseFloat(o[i]),
          high: parseFloat(h[i]),
          low: parseFloat(l[i]),
          volume: parseFloat(v[i]),
        });
      }
      
      // Update last bars cache
      if (bars.length > 0) {
        const lastBar = bars[bars.length - 1];
        const key = `${symbolInfo.name}:${resolution}`;
        this.lastBarsCache.set(key, lastBar);
      }
      
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.error('Error getting bars:', error);
      onErrorCallback(error);
    }
  }
  
  /**
   * For backtesting: get bars from replay data
   * @private
   */
  _getReplayBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback) {
    try {
      if (!this.replayData || !this.replayData.length) {
        onHistoryCallback([], { noData: true });
        return;
      }
      
      // Filter data for requested time range
      from = from * 1000; // Convert to milliseconds
      to = to * 1000;
      
      // Filter and format the replay data for the requested time range
      const bars = this.replayData
        .filter(bar => bar.time >= from && bar.time <= to)
        .map(bar => ({
          time: bar.time,
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
          volume: bar.volume || 0,
        }));
      
      if (bars.length === 0) {
        onHistoryCallback([], { noData: true });
        return;
      }
      
      // Update last bars cache
      const lastBar = bars[bars.length - 1];
      const key = `${symbolInfo.name}:${resolution}`;
      this.lastBarsCache.set(key, lastBar);
      
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.error('Error getting replay bars:', error);
      onErrorCallback(error);
    }
  }
  
  /**
   * Set up a real-time data subscription for a symbol
   * @param {string} symbolInfo - Symbol information object
   * @param {string} resolution - Chart resolution
   * @param {Function} onRealtimeCallback - Callback for new bars
   * @param {string} subscriberUID - Unique subscriber ID
   * @param {Function} onResetCacheNeededCallback - Callback when cache should be reset
   */
  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    if (this.debug) {
      console.log('subscribeBars:', { symbol: symbolInfo.name, resolution, subscriberUID });
    }
    
    const key = `${symbolInfo.name}:${resolution}:${subscriberUID}`;
    this.subscribedBars.set(key, {
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      lastBar: this.lastBarsCache.get(`${symbolInfo.name}:${resolution}`),
    });
    
    // In a real implementation, you would set up WebSocket connections or polling here
  }
  
  /**
   * Unsubscribe from real-time data for a symbol
   * @param {string} subscriberUID - Unique subscriber ID
   */
  unsubscribeBars(subscriberUID) {
    if (this.debug) {
      console.log('unsubscribeBars:', subscriberUID);
    }
    
    // Remove all subscriptions for this subscriber
    for (const [key, sub] of this.subscribedBars.entries()) {
      if (sub.subscriberUID === subscriberUID) {
        this.subscribedBars.delete(key);
      }
    }
    
    // In a real implementation, you would close WebSocket connections here
  }
  
  /**
   * Load custom replay data for backtesting
   * @param {Array} data - Array of OHLCV bars
   */
  loadReplayData(data) {
    if (!data || !Array.isArray(data)) {
      console.error('Invalid replay data provided');
      return;
    }
    
    // Ensure data is sorted by time
    this.replayData = [...data].sort((a, b) => a.time - b.time);
    
    if (this.debug) {
      console.log(`Loaded ${this.replayData.length} bars for replay/backtesting`);
    }
  }
  
  /**
   * Process a new real-time bar update
   * @param {Object} bar - The new bar data
   * @param {string} symbol - Symbol name
   * @param {string} resolution - Chart resolution
   */
  updateRealtimeData(bar, symbol, resolution) {
    if (!bar || !symbol) return;
    
    // Update last bars cache
    const cacheKey = `${symbol}:${resolution}`;
    this.lastBarsCache.set(cacheKey, bar);
    
    // Notify all subscribers for this symbol and resolution
    for (const [key, subscription] of this.subscribedBars.entries()) {
      if (subscription.symbolInfo.name === symbol && subscription.resolution === resolution) {
        subscription.onRealtimeCallback(bar);
      }
    }
  }
  
  /**
   * Get marks (events) for a symbol
   * @param {string} symbolInfo - Symbol information
   * @param {number} from - Start time (unix timestamp)
   * @param {number} to - End time (unix timestamp)
   * @param {Function} onDataCallback - Callback for the marks data
   */
  async getMarks(symbolInfo, from, to, onDataCallback) {
    if (this.debug) {
      console.log('getMarks:', { symbol: symbolInfo.name, from, to });
    }
    
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/marks?symbol=${encodeURIComponent(symbolInfo.name)}&from=${from}&to=${to}`
      );
      
      if (!response.ok) {
        throw new Error(`Marks request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      onDataCallback(data);
    } catch (error) {
      console.error('Error getting marks:', error);
      onDataCallback([]);
    }
  }
  
  /**
   * Get timescale marks (events that can be shown on the timescale)
   * @param {string} symbolInfo - Symbol information
   * @param {number} from - Start time (unix timestamp)
   * @param {number} to - End time (unix timestamp)
   * @param {Function} onDataCallback - Callback for the timescale marks data
   */
  async getTimescaleMarks(symbolInfo, from, to, onDataCallback) {
    if (this.debug) {
      console.log('getTimescaleMarks:', { symbol: symbolInfo.name, from, to });
    }
    
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/timescale_marks?symbol=${encodeURIComponent(symbolInfo.name)}&from=${from}&to=${to}`
      );
      
      if (!response.ok) {
        throw new Error(`Timescale marks request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      onDataCallback(data);
    } catch (error) {
      console.error('Error getting timescale marks:', error);
      onDataCallback([]);
    }
  }
  
  /**
   * Get server time (in unix timestamp format)
   * @param {Function} callback - Callback for the server time
   */
  async getServerTime(callback) {
    if (this.debug) {
      console.log('getServerTime');
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/time`);
      
      if (!response.ok) {
        throw new Error(`Server time request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      callback(data.time);
    } catch (error) {
      console.error('Error getting server time:', error);
      // Fallback to local time
      callback(Math.floor(Date.now() / 1000));
    }
  }
}

/**
 * Create and return a UDF-compatible datafeed object
 * @param {Object} options - Configuration options
 * @returns {Object} - TradingView UDF compatible datafeed object
 */
export function createUDFDatafeed(options) {
  const provider = new DataFeedProvider(options);
  
  return {
    onReady: (callback) => {
      setTimeout(() => callback(provider.getConfig()), 0);
    },
    
    searchSymbols: (userInput, exchange, symbolType, onResult) => {
      provider.searchSymbols(userInput, exchange, symbolType, 30)
        .then(symbols => onResult(symbols))
        .catch(error => {
          console.error('Search symbols error:', error);
          onResult([]);
        });
    },
    
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      provider.resolveSymbol(symbolName)
        .then(symbolInfo => {
          if (symbolInfo) {
            onSymbolResolvedCallback(symbolInfo);
          } else {
            onResolveErrorCallback('Symbol not found');
          }
        })
        .catch(error => {
          console.error('Resolve symbol error:', error);
          onResolveErrorCallback(error.message);
        });
    },
    
    getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
      provider.getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback);
    },
    
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
      provider.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback);
    },
    
    unsubscribeBars: (subscriberUID) => {
      provider.unsubscribeBars(subscriberUID);
    },
    
    getMarks: (symbolInfo, from, to, onDataCallback) => {
      provider.getMarks(symbolInfo, from, to, onDataCallback);
    },
    
    getTimescaleMarks: (symbolInfo, from, to, onDataCallback) => {
      provider.getTimescaleMarks(symbolInfo, from, to, onDataCallback);
    },
    
    getServerTime: (callback) => {
      provider.getServerTime(callback);
    }
  };
}

// Export the provider for direct usage
export default {
  DataFeedProvider,
  createUDFDatafeed
}; 