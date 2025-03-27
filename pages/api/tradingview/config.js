/**
 * TradingView UDF API - Configuration endpoint
 * 
 * Returns the datafeed configuration for the TradingView chart.
 * Required by the TradingView UDF protocol.
 * 
 * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/
 */

export default function handler(req, res) {
  res.status(200).json({
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    supports_search: true,
    supports_group_request: false,
    supports_marks: true,
    supports_timescale_marks: true,
    supports_time: true,
    exchanges: [
      { value: 'BINANCE', name: 'Binance', desc: 'Binance Crypto Exchange' },
      { value: 'NYSE', name: 'NYSE', desc: 'New York Stock Exchange' },
      { value: 'NASDAQ', name: 'NASDAQ', desc: 'NASDAQ Stock Exchange' },
    ],
    symbol_types: [
      { name: 'stock', value: 'stock' },
      { name: 'crypto', value: 'crypto' },
      { name: 'forex', value: 'forex' },
    ],
  });
} 