/**
 * TradingView UDF API - Marks endpoint
 * 
 * Returns marks (events) that appear on the chart for a given symbol.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

// Sample marks data for demonstration
const sampleMarks = {
  'AAPL': [
    {
      id: 1,
      time: 1625097600, // 2021-07-01
      color: 'green',
      text: 'Earnings Beat',
      label: 'EB',
      labelFontColor: 'white',
      minSize: 20,
    },
    {
      id: 2,
      time: 1627689600, // 2021-07-31
      color: 'red',
      text: 'Product Announcement',
      label: 'PA',
      labelFontColor: 'white',
      minSize: 20,
    }
  ],
  'MSFT': [
    {
      id: 1,
      time: 1625097600, // 2021-07-01
      color: 'green',
      text: 'Earnings Beat',
      label: 'EB',
      labelFontColor: 'white',
      minSize: 20,
    }
  ]
};

export default function handler(req, res) {
  const { symbol, from, to } = req.query;
  
  if (!symbol) {
    return res.status(400).json({
      s: 'error',
      errmsg: 'Symbol parameter is required'
    });
  }
  
  try {
    // Convert from/to to integers
    const fromTimestamp = from ? parseInt(from, 10) : 0;
    const toTimestamp = to ? parseInt(to, 10) : Math.floor(Date.now() / 1000);
    
    // Get marks for the symbol
    const symbolMarks = sampleMarks[symbol] || [];
    
    // Filter marks within the requested time range
    const filteredMarks = symbolMarks.filter(mark => 
      mark.time >= fromTimestamp && mark.time <= toTimestamp
    );
    
    // In a real implementation, you would fetch marks from a database
    
    res.status(200).json(filteredMarks);
  } catch (error) {
    console.error('Error getting marks:', error);
    
    res.status(500).json({
      s: 'error',
      errmsg: 'Internal server error'
    });
  }
} 