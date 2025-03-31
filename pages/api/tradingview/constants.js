/**
 * Constants for the TradingView integration
 */

// Data source constants
export const DATA_SOURCE = {
  YAHOO_FINANCE: 'yahoo',
  ALPHA_VANTAGE: 'alphavantage',
  MOCK_DATA: 'mock'
};

// Common UDF configs
export const SUPPORTED_RESOLUTIONS = ['1', '5', '15', '30', '60', '1D', '1W', '1M'];

// Real-time support by data source
export const REALTIME_SUPPORT = {
  [DATA_SOURCE.YAHOO_FINANCE]: false,
  [DATA_SOURCE.ALPHA_VANTAGE]: false,
  [DATA_SOURCE.MOCK_DATA]: true
}; 