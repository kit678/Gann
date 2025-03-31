/**
 * Tests for custom indicator implementation in TradingView
 */

import { availableIndicators, PivotPointsIndicator } from '../utils/indicators';
import { configureWidgetWithCustomIndicators } from '../utils/tradingviewIntegration';

describe('Custom indicators', () => {
  test('All indicators should have the required properties', () => {
    availableIndicators.forEach(indicator => {
      expect(indicator.id).toBeDefined();
      expect(indicator.name).toBeDefined();
      expect(indicator.description).toBeDefined();
      expect(typeof indicator.register).toBe('function');
      expect(typeof indicator.add).toBe('function');
      expect(typeof indicator.remove).toBe('function');
    });
  });

  test('PivotPointsIndicator should have TradingView indicator configuration', () => {
    const pivotPointsIndicator = availableIndicators.find(
      indicator => indicator instanceof PivotPointsIndicator
    );
    expect(pivotPointsIndicator).toBeDefined();
    expect(pivotPointsIndicator.tvIndicator).toBeDefined();
    expect(pivotPointsIndicator.tvIndicator.name).toBe('Pivot Points');
    expect(pivotPointsIndicator.tvIndicator.metainfo).toBeDefined();
    expect(pivotPointsIndicator.tvIndicator.constructor).toBeDefined();
    expect(typeof pivotPointsIndicator.tvIndicator.constructor).toBe('function');
  });

  test('configureWidgetWithCustomIndicators should add custom_indicators_getter', () => {
    const baseOptions = {
      symbol: 'AAPL',
      interval: 'D',
    };

    const configuredOptions = configureWidgetWithCustomIndicators(baseOptions);
    
    // Should preserve original options
    expect(configuredOptions.symbol).toBe('AAPL');
    expect(configuredOptions.interval).toBe('D');
    
    // Should add custom_indicators_getter
    expect(configuredOptions.custom_indicators_getter).toBeDefined();
    expect(typeof configuredOptions.custom_indicators_getter).toBe('function');
  });

  test('TradingView indicator constructor should have proper methods', () => {
    const pivotPointsIndicator = availableIndicators.find(
      indicator => indicator instanceof PivotPointsIndicator
    );
    
    const tvConstructor = pivotPointsIndicator.tvIndicator.constructor;
    const instance = new tvConstructor();
    
    expect(typeof instance.init).toBe('function');
    expect(typeof instance.main).toBe('function');
  });
}); 