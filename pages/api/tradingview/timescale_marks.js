/**
 * TradingView UDF API - Timescale Marks endpoint
 * 
 * Returns timescale marks (events on the time axis) for a given symbol.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

// Sample timescale marks data for demonstration
const sampleTimeScaleMarks = {
  'AAPL': [
    {
      id: 'earnings-q1-2021',
      time: 1619827200, // 2021-05-01
      color: 'red',
      label: 'Q1',
      tooltip: 'Q1 2021 Earnings',
    },
    {
      id: 'earnings-q2-2021',
      time: 1627776000, // 2021-08-01
      color: 'red',
      label: 'Q2',
      tooltip: 'Q2 2021 Earnings',
    },
    {
      id: 'dividend-2021',
      time: 1623369600, // 2021-06-11
      color: 'green',
      label: 'Div',
      tooltip: 'Dividend Payment',
    },
  ],
  'MSFT': [
    {
      id: 'earnings-q1-2021',
      time: 1619827200, // 2021-05-01
      color: 'red',
      label: 'Q1',
      tooltip: 'Q1 2021 Earnings',
    },
    {
      id: 'earnings-q2-2021',
      time: 1627776000, // 2021-08-01
      color: 'red',
      label: 'Q2',
      tooltip: 'Q2 2021 Earnings',
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
    
    // Get timescale marks for the symbol
    const symbolTimeScaleMarks = sampleTimeScaleMarks[symbol] || [];
    
    // Filter marks within the requested time range
    const filteredMarks = symbolTimeScaleMarks.filter(mark => 
      mark.time >= fromTimestamp && mark.time <= toTimestamp
    );
    
    // In a real implementation, you would fetch timescale marks from a database
    
    res.status(200).json(filteredMarks);
  } catch (error) {
    console.error('Error getting timescale marks:', error);
    
    res.status(500).json({
      s: 'error',
      errmsg: 'Internal server error'
    });
  }
} 