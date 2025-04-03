import { availableIndicators } from './indicators';

/**
 * Configures a new TradingView widget instance with our custom indicators
 * @param {Object} widgetOptions - TradingView widget options
 * @returns {Object} - Updated widget options
 */
export function configureWidgetWithCustomIndicators(widgetOptions = {}) {
  // Create a wrapper for custom_indicators_getter to inject our custom indicators
  const customIndicatorsGetter = (PineJS) => {
    // Initialize with an empty array or use the existing getter if provided
    let originalGetterPromise = Promise.resolve([]);
    if (widgetOptions.custom_indicators_getter) {
      originalGetterPromise = widgetOptions.custom_indicators_getter(PineJS);
    }
    
    return originalGetterPromise.then(originalIndicators => {
      // Transform our indicators to the format expected by TradingView
      const customIndicators = availableIndicators
        .filter(indicator => indicator.tvIndicator) // Only use indicators with TV configuration
        .map(indicator => {
          try {
            console.log(`Preparing indicator: ${indicator.tvIndicator.name} (ID: ${indicator.tvIndicator.metainfo.id})`);
            
            // Validate the indicator structure
            if (!indicator.tvIndicator.name || !indicator.tvIndicator.metainfo || !indicator.tvIndicator.constructor) {
              console.warn(`Indicator ${indicator.name} is missing required TradingView properties`);
            }
            
            // Return exact format required by TradingView without modifying the ID
            return {
              name: indicator.tvIndicator.name,
              metainfo: indicator.tvIndicator.metainfo, // Use the metainfo exactly as defined
              constructor: indicator.tvIndicator.constructor
            };
          } catch (error) {
            console.error(`Error preparing indicator ${indicator.name}:`, error);
            return null;
          }
        })
        .filter(indicator => indicator !== null); // Remove any that failed to prepare
      
      console.log(`${customIndicators.length} custom indicators prepared for TradingView`);
      
      // Combine original indicators with our custom ones
      return [...originalIndicators, ...customIndicators];
    }).catch(error => {
      console.error('Error setting up custom indicators:', error);
      return originalIndicators || [];
    });
  };
  
  // Return updated widget options
  return {
    ...widgetOptions,
    custom_indicators_getter: customIndicatorsGetter
  };
}

/**
 * Sets up custom indicators on a TradingView chart after it's ready
 * @param {Object} tvWidget - TradingView widget instance
 * @param {Array} customIndicators - Array of custom indicator instances to register
 */
export function setupTradingViewCustomIndicators(tvWidget, customIndicators = []) {
  if (!tvWidget || !tvWidget.chart) {
    console.error('Cannot setup custom indicators: widget is not ready');
    return;
  }
  
  try {
    // Get the chart instance
    const chart = tvWidget.chart();
    
    // Check TradingView version and capabilities
    console.log('TradingView version:', tvWidget.version ? tvWidget.version() : 'unknown');
    console.log('Chart supports studies:', typeof chart.createStudy === 'function');
    
    // Register all available indicators
    const indicatorsToRegister = customIndicators.length > 0 ? customIndicators : availableIndicators;
    
    indicatorsToRegister.forEach(indicator => {
      try {
        if (typeof indicator.register === 'function') {
          indicator.register(chart, tvWidget);
          console.log(`Successfully registered indicator: ${indicator.name}`);
        }
      } catch (err) {
        console.error(`Failed to register indicator ${indicator.name}:`, err);
      }
    });
    
    console.log('Custom indicators registration completed');
  } catch (error) {
    console.error('Error setting up custom indicators:', error);
  }
}

// Instead, add a utility function to add custom indicators to a widget
export function addCustomIndicatorsToWidget(tvWidget) {
  if (!tvWidget) return;
  
  try {
    // Create a filtered list of valid indicators
    const validIndicators = availableIndicators
      .filter(indicator => indicator.tvIndicator);
      
    // Make all indicators available via widget reference for direct access
    tvWidget.customIndicators = validIndicators;
    
    console.log(`Added ${validIndicators.length} custom indicators to widget reference`);
  } catch (error) {
    console.error('Error adding custom indicators to widget:', error);
  }
} 