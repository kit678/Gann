/**
 * TradingView UDF API - Symbol Search endpoint
 * 
 * Searches for symbols based on a user query.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

// Sample list of available symbols
const availableSymbols = [
  {
    symbol: 'AAPL',
    full_name: 'NASDAQ:AAPL',
    description: 'Apple Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'MSFT',
    full_name: 'NASDAQ:MSFT',
    description: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'AMZN',
    full_name: 'NASDAQ:AMZN',
    description: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'GOOGL',
    full_name: 'NASDAQ:GOOGL',
    description: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'META',
    full_name: 'NASDAQ:META',
    description: 'Meta Platforms Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'TSLA',
    full_name: 'NASDAQ:TSLA',
    description: 'Tesla Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'NFLX',
    full_name: 'NASDAQ:NFLX',
    description: 'Netflix Inc.',
    exchange: 'NASDAQ',
    type: 'stock'
  },
  {
    symbol: 'BTCUSD',
    full_name: 'BINANCE:BTCUSD',
    description: 'Bitcoin / US Dollar',
    exchange: 'BINANCE',
    type: 'crypto'
  },
  {
    symbol: 'ETHUSD',
    full_name: 'BINANCE:ETHUSD',
    description: 'Ethereum / US Dollar',
    exchange: 'BINANCE',
    type: 'crypto'
  }
];

export default function handler(req, res) {
  const { query = '', limit = 30, exchange, type } = req.query;
  
  try {
    // Filter symbols based on query, exchange, and type
    let results = availableSymbols.filter(symbol => {
      // Match query against symbol, full_name, or description
      const matchesQuery = query === '' || 
        symbol.symbol.toLowerCase().includes(query.toLowerCase()) ||
        symbol.full_name.toLowerCase().includes(query.toLowerCase()) ||
        symbol.description.toLowerCase().includes(query.toLowerCase());
      
      // Match exchange if provided
      const matchesExchange = !exchange || symbol.exchange.toLowerCase() === exchange.toLowerCase();
      
      // Match type if provided
      const matchesType = !type || symbol.type.toLowerCase() === type.toLowerCase();
      
      return matchesQuery && matchesExchange && matchesType;
    });
    
    // Limit the number of results
    results = results.slice(0, parseInt(limit));
    
    res.status(200).json({
      s: 'ok',
      symbols: results
    });
  } catch (error) {
    console.error('Error searching symbols:', error);
    
    res.status(500).json({
      s: 'error',
      errmsg: 'Internal server error'
    });
  }
} 