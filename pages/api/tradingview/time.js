/**
 * TradingView UDF API - Server Time endpoint
 * 
 * Returns the current server time in unix timestamp format (seconds)
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

export default function handler(req, res) {
  // Return current time in seconds (unix timestamp)
  res.status(200).json({
    time: Math.floor(Date.now() / 1000)
  });
} 