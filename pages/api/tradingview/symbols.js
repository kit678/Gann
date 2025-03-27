/**
 * TradingView UDF API - Symbol Resolve endpoint
 * 
 * Returns symbol information for a given symbol name.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

// Sample symbol data - in a real implementation, this would come from a database
const symbolMap = {
  'AAPL': {
    symbol: 'AAPL',
    description: 'Apple Inc.',
    type: 'stock',
    exchange: 'NASDAQ',
    listed_exchange: 'NASDAQ',
    timezone: 'America/New_York',
    minmov: 1,
    pricescale: 100,
    has_intraday: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    session: '0930-1600',
    data_status: 'streaming'
  },
  'MSFT': {
    symbol: 'MSFT',
    description: 'Microsoft Corporation',
    type: 'stock',
    exchange: 'NASDAQ',
    listed_exchange: 'NASDAQ',
    timezone: 'America/New_York',
    minmov: 1,
    pricescale: 100,
    has_intraday: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    session: '0930-1600',
    data_status: 'streaming'
  },
  'BTCUSD': {
    symbol: 'BTCUSD',
    description: 'Bitcoin / US Dollar',
    type: 'crypto',
    exchange: 'BINANCE',
    listed_exchange: 'BINANCE',
    timezone: 'Etc/UTC',
    minmov: 1,
    pricescale: 1,
    has_intraday: true,
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    session: '24x7',
    data_status: 'streaming'
  }
};

export default function handler(req, res) {
  const { symbol } = req.query;
  
  if (!symbol) {
    return res.status(400).json({
      s: 'error',
      errmsg: 'Symbol parameter is required'
    });
  }
  
  // Find the symbol in our map
  const symbolInfo = symbolMap[symbol] || null;
  
  // If symbol not found, return appropriate error
  if (!symbolInfo) {
    // In a production environment, you might want to try to fetch the symbol from an external API
    // if it's not in your local database
    
    return res.status(404).json({
      s: 'error',
      errmsg: `Symbol ${symbol} not found`
    });
  }
  
  // Return the symbol information
  res.status(200).json(symbolInfo);
} 