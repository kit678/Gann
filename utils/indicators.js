/**
 * Custom indicators framework for TradingView Charting Library v25+
 * 
 * This file provides utilities and base classes for creating custom geometric/visual
 * indicators that can be registered with the TradingView chart.
 */

// Move the INDICATOR_TYPES constant to the top of the file
export const INDICATOR_TYPES = {
  SIMPLE_LINE: 'simple_line',
  PIVOT_POINTS: 'pivot_points',
  MA: 'ma',
  EMA: 'ema',
  BOLLINGER: 'bollinger',
  RSI: 'rsi',
  MACD: 'macd',
  // other indicator types...
};

/**
 * Calculate the angle between two points in degrees
 * @param {Object} point1 - First point with x and y coordinates
 * @param {Object} point2 - Second point with x and y coordinates
 * @returns {number} - Angle in degrees
 */
export const calculateAngleBetweenPoints = (point1, point2) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI);
  
  // Normalize to 0-360
  if (degrees < 0) {
    degrees += 360;
  }
  
  return degrees;
};

/**
 * Base class for custom indicators
 */
export class CustomIndicator {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = false;
    this._instances = [];
  }

  register(chart, widget) {
    console.log(`Base register method called for ${this.name}`);
  }

  add(chart, widget) {
    this.isActive = true;
  }

  remove(chart) {
    this.isActive = false;
    this._clearInstances(chart);
  }

  _trackInstance(instance) {
    this._instances.push(instance);
  }

  _clearInstances(chart) {
    this._instances.forEach(instance => {
      if (instance && typeof instance.remove === 'function') {
        instance.remove();
      }
    });
    this._instances = [];
  }
}

/**
 * Geometric TrendLine Indicator
 * 
 * Creates a trend line based on geometry patterns in price action
 */
export class GeometricTrendLine extends CustomIndicator {
  constructor() {
    super(
      'geometric_trendline',
      'Geometric Trend Line',
      'Automatically draws trend lines based on geometric patterns'
    );
    
    this.settings = {
      lookbackBars: 50,
      minimumSwings: 3,
      angleThreshold: 5, // degrees
      lineColor: '#2196F3',
      lineWidth: 2,
      lineStyle: 0 // 0 = solid, 1 = dotted, 2 = dashed
    };
  }

  register(chart, widget) {
    console.log('Registered Geometric Trend Line indicator');
  }

  add(chart, widget) {
    super.add(chart, widget);
    
    try {
      // Get visible range
      const visibleRange = chart.getVisibleRange();
      const bars = this.settings.lookbackBars;
      
      // Create a trend line
      this._createTrendLine(chart, visibleRange);
      
      // Subscribe to visible range changes
      widget.subscribe('visibleRangeChanged', () => {
        if (this.isActive) {
          // Update trend lines when range changes
          this._updateTrendLines(chart);
        }
      });
    } catch (error) {
      console.error('Error adding Geometric Trend Line:', error);
    }
  }

  _createTrendLine(chart, visibleRange) {
    try {
      // Find swing points in the visible range
      const swingPoints = this._findSwingPoints(chart, visibleRange);
      
      // If we have enough swing points, create a trend line
      if (swingPoints.length >= this.settings.minimumSwings) {
        // Use linear regression to find best fit line
        const trendLinePoints = this._calculateTrendLine(swingPoints);
        
        if (trendLinePoints.length >= 2) {
          // Create a trend line shape
          const shape = chart.createMultipointShape(
            trendLinePoints.map(point => ({ time: point.time, price: point.price })),
            {
              shape: 'trend_line',
              lock: false,
              disableSelection: false,
              disableSave: false,
              disableUndo: false,
              overrides: {
                linecolor: this.settings.lineColor,
                linewidth: this.settings.lineWidth,
                linestyle: this.settings.lineStyle,
                extendLeft: true,
                extendRight: true,
                leftEnd: 0,
                rightEnd: 0
              },
              zOrder: 'top',
              showInObjectsTree: true,
            }
          );
          
          // Track this instance
          this._trackInstance(shape);
        }
      }
    } catch (error) {
      console.error('Error creating geometric trend line:', error);
    }
  }

  _findSwingPoints(chart, visibleRange) {
    // This would be a more complex algorithm to identify swing highs and lows
    // For demonstration, we'll just use some simplified logic

    const swingPoints = [];
    
    try {
      // Get data in the visible range
      const bars = chart.barsCount();
      const resolution = chart.resolution();
      
      // Sample points - in a real implementation, this would analyze price action
      const startBar = Math.max(0, bars - this.settings.lookbackBars);
      const endBar = bars - 1;
      
      for (let i = startBar; i <= endBar; i += Math.ceil(this.settings.lookbackBars / 5)) {
        const time = chart.getVisibleRange().from + (i * (chart.getVisibleRange().to - chart.getVisibleRange().from) / bars);
        // This is simplified - in reality, you'd find actual swing points
        const price = Math.random() * chart.priceScale().getCoordFromPrice(chart.priceScale().containerPointToPrice(100));
        
        swingPoints.push({ time, price });
      }
    } catch (error) {
      console.error('Error finding swing points:', error);
    }
    
    return swingPoints;
  }

  _calculateTrendLine(points) {
    // Simplified linear regression
    // In a real implementation, this would use proper linear regression
    
    if (points.length < 2) return [];
    
    // Sort points by time
    const sortedPoints = [...points].sort((a, b) => a.time - b.time);
    
    // For demonstration, just return first and last points
    return [sortedPoints[0], sortedPoints[sortedPoints.length - 1]];
  }

  _updateTrendLines(chart) {
    // First remove all existing lines
    this.remove(chart);
    
    // Then recreate them for new range
    this._createTrendLine(chart, chart.getVisibleRange());
  }
}

/**
 * Gann Square Angle Indicator
 * 
 * Draws Gann angle lines (1x1, 2x1, etc.) from significant price points
 */
export class GannAngleIndicator extends CustomIndicator {
  constructor() {
    super(
      'gann_angles',
      'Gann Angles',
      'Draws Gann angle lines (1x1, 2x1, etc.) from significant price points'
    );
    
    this.settings = {
      baseLineColor: '#FF6D00',
      angle45Color: '#2196F3',
      angle26Color: '#4CAF50',
      angle63Color: '#FFC107',
      lineWidth: 1,
      lineStyle: 2, // dashed
      anchorToRecent: true, // anchor to most recent significant low/high
    };
  }

  register(chart, widget) {
    console.log('Registered Gann Angle indicator');
  }

  add(chart, widget) {
    super.add(chart, widget);
    
    try {
      // Get visible range
      const visibleRange = chart.getVisibleRange();
      
      // Find anchor point (recent significant low or high)
      const anchorPoint = this._findAnchorPoint(chart, visibleRange);
      
      if (anchorPoint) {
        // Draw Gann angles from anchor point
        this._drawGannAngles(chart, anchorPoint);
      }
      
      // Subscribe to visible range changes
      widget.subscribe('visibleRangeChanged', () => {
        if (this.isActive) {
          // Update Gann angles when range changes
          this._updateGannAngles(chart);
        }
      });
    } catch (error) {
      console.error('Error adding Gann Angles:', error);
    }
  }

  _findAnchorPoint(chart, visibleRange) {
    // In a real implementation, this would find significant lows/highs
    // For demonstration, we'll use a simplified approach
    
    try {
      // Get the most recent price
      const symbolInfo = chart.symbolInfo();
      if (!symbolInfo) return null;
      
      // For demonstration, use the start of the visible range
      return {
        time: visibleRange.from,
        price: chart.priceScale().containerPointToPrice(chart.priceScale().height() / 2)
      };
    } catch (error) {
      console.error('Error finding anchor point:', error);
      return null;
    }
  }

  _drawGannAngles(chart, anchorPoint) {
    try {
      const visibleRange = chart.getVisibleRange();
      const timeRange = visibleRange.to - visibleRange.from;
      const priceScale = chart.priceScale();
      
      // Calculate price range per time unit (for 1x1 angle)
      const barCount = chart.barsCount();
      const pixelsPerBar = chart.timeScale().width() / barCount;
      const pricePerBar = priceScale.height() / priceScale.priceRange().length();
      
      // For a 1x1 angle (45 degrees), price change equals time change
      const timeOffset = timeRange * 0.3; // 30% of visible time range
      const endTime = anchorPoint.time + timeOffset;
      
      // Draw 1x1 (45°) angle
      const shape45 = this._createAngleLine(
        chart, 
        anchorPoint, 
        { time: endTime, price: anchorPoint.price + (timeOffset * pricePerBar / pixelsPerBar) },
        this.settings.angle45Color
      );
      this._trackInstance(shape45);
      
      // Draw 2x1 (26.57°) angle
      const shape26 = this._createAngleLine(
        chart, 
        anchorPoint, 
        { time: endTime, price: anchorPoint.price + (timeOffset * pricePerBar / pixelsPerBar / 2) },
        this.settings.angle26Color
      );
      this._trackInstance(shape26);
      
      // Draw 1x2 (63.43°) angle
      const shape63 = this._createAngleLine(
        chart, 
        anchorPoint, 
        { time: endTime, price: anchorPoint.price + (timeOffset * pricePerBar / pixelsPerBar * 2) },
        this.settings.angle63Color
      );
      this._trackInstance(shape63);
    } catch (error) {
      console.error('Error drawing Gann angles:', error);
    }
  }

  _createAngleLine(chart, startPoint, endPoint, color) {
    return chart.createMultipointShape(
      [
        { time: startPoint.time, price: startPoint.price },
        { time: endPoint.time, price: endPoint.price }
      ],
      {
        shape: 'ray',
        lock: false,
        disableSelection: false,
        disableSave: false,
        disableUndo: false,
        overrides: {
          linecolor: color,
          linewidth: this.settings.lineWidth,
          linestyle: this.settings.lineStyle
        },
        zOrder: 'top',
        showInObjectsTree: true,
      }
    );
  }

  _updateGannAngles(chart) {
    // First remove all existing angles
    this.remove(chart);
    
    // Then recreate them for new range
    const visibleRange = chart.getVisibleRange();
    const anchorPoint = this._findAnchorPoint(chart, visibleRange);
    
    if (anchorPoint) {
      this._drawGannAngles(chart, anchorPoint);
    }
  }
}

/**
 * Fibonacci Retracement Indicator
 * 
 * Automatically identifies swing highs and lows and draws Fibonacci retracements
 */
export class FibonacciRetracement extends CustomIndicator {
  constructor() {
    super(
      'fib_retracement',
      'Auto Fibonacci',
      'Automatically identifies swing highs and lows and draws Fibonacci retracements'
    );
    
    this.settings = {
      levels: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1],
      colors: ['#787B86', '#2962FF', '#2962FF', '#2962FF', '#2962FF', '#2962FF', '#787B86'],
      lineWidth: 1,
      lineStyle: 0, // solid
    };
  }

  register(chart, widget) {
    console.log('Registered Auto Fibonacci indicator');
  }
  
  add(chart, widget) {
    super.add(chart, widget);
    
    try {
      // Find recent swing high and low
      const [swingLow, swingHigh] = this._findRecentSwing(chart);
      
      if (swingLow && swingHigh) {
        // Draw Fibonacci retracement
        this._drawFibonacciRetracement(chart, swingLow, swingHigh);
      }
      
      // Subscribe to visible range changes
      widget.subscribe('visibleRangeChanged', () => {
        if (this.isActive) {
          // Update Fibonacci retracement when range changes
          this._updateFibonacciRetracement(chart);
        }
      });
    } catch (error) {
      console.error('Error adding Fibonacci Retracement:', error);
    }
  }

  _findRecentSwing(chart) {
    // This would be a more complex algorithm to identify recent swing high and low
    // For demonstration, we'll use a simplified approach
    
    try {
      const visibleRange = chart.getVisibleRange();
      const timeRange = visibleRange.to - visibleRange.from;
      
      // For demonstration, use 30% and 70% of visible range
      const swingLowTime = visibleRange.from + timeRange * 0.3;
      const swingHighTime = visibleRange.from + timeRange * 0.7;
      
      const priceScale = chart.priceScale();
      const priceRange = priceScale.priceRange();
      
      if (!priceRange) return [null, null];
      
      const priceMid = priceScale.containerPointToPrice(priceScale.height() / 2);
      const priceAmplitude = priceRange.length() * 0.1; // 10% of visible price range
      
      const swingLow = {
        time: swingLowTime,
        price: priceMid - priceAmplitude
      };
      
      const swingHigh = {
        time: swingHighTime,
        price: priceMid + priceAmplitude
      };
      
      return [swingLow, swingHigh];
    } catch (error) {
      console.error('Error finding swing points:', error);
      return [null, null];
    }
  }

  _drawFibonacciRetracement(chart, swingLow, swingHigh) {
    try {
      // Create the Fibonacci retracement
      const shape = chart.createMultipointShape(
        [
          { time: swingLow.time, price: swingLow.price },
          { time: swingHigh.time, price: swingHigh.price }
        ],
        {
          shape: 'fib_retracement',
          lock: false,
          disableSelection: false,
          disableSave: false,
          disableUndo: false,
          overrides: {
            // Set properties for each level
            ...this.settings.levels.reduce((acc, level, index) => {
              acc[`level${index+1}Visible`] = true;
              acc[`level${index+1}`] = level;
              acc[`level${index+1}Color`] = this.settings.colors[index];
              acc[`level${index+1}Width`] = this.settings.lineWidth;
              acc[`level${index+1}Style`] = this.settings.lineStyle;
              return acc;
            }, {}),
            // Common properties
            extendLines: false,
            extendLeft: false,
            extendRight: false,
            reverse: false,
            fibLevelsBasedOnLogScale: false,
          },
          zOrder: 'top',
          showInObjectsTree: true,
        }
      );
      
      this._trackInstance(shape);
    } catch (error) {
      console.error('Error drawing Fibonacci retracement:', error);
    }
  }

  _updateFibonacciRetracement(chart) {
    // First remove all existing retracements
    this.remove(chart);
    
    // Then recreate them for new range
    const [swingLow, swingHigh] = this._findRecentSwing(chart);
    
    if (swingLow && swingHigh) {
      this._drawFibonacciRetracement(chart, swingLow, swingHigh);
    }
  }
}

/**
 * Pivot Points Indicator
 * Identifies and marks pivot high and low points on the chart
 */
export class PivotPointsIndicator extends CustomIndicator {
  constructor() {
    super(
      'pivot_points',
      'Pivots High/Low',
      'Identifies and marks swing highs and lows in price action'
    );
    
    // Default settings
    this.settings = {
      lookbackBars: 5,
      highColor: '#F44336',
      lowColor: '#4CAF50'
    };
    
    // The TV-compatible indicator definition
    this.tvIndicator = {
      name: "Pivots High/Low",
      metainfo: {
        _metainfoVersion: 51,
        id: "PivotPoints@tv-basicstudies-1",
        name: "Pivots High/Low",
        description: "Pivots High/Low",
        shortDescription: "Pivots",
        is_price_study: true,
        isCustomIndicator: true,
        
        // Important: Set this to true to make it show as an overlay
        overlay: true,
        
        // Add format specification - this is required
        format: {
          type: "price",
          precision: 2
        },
        
        // Plot definitions
        plots: [
          {
            id: "pivot_high",
            type: "shapes"
          },
          {
            id: "pivot_low", 
            type: "shapes"
          }
        ],
        
        // Define styles with proper price format
        styles: {
          pivot_high: { 
            title: "Pivot High", 
            color: "#F44336",
            plottype: 8, // Shape plot type
            location: "AboveBar",
            // Add price format
            priceFormat: {
              type: "price",
              precision: 2
            }
          },
          pivot_low: { 
            title: "Pivot Low", 
            color: "#4CAF50",
            plottype: 8, // Shape plot type
            location: "BelowBar",
            // Add price format
            priceFormat: {
              type: "price",
              precision: 2
            }
          }
        },
        
        // Input parameters
        inputs: [
          {
            id: "lookback",
            name: "Lookback Bars",
            defval: 5,
            type: "integer",
            min: 1,
            max: 50
          }
        ]
      },
      
      // The constructor is the implementation of the indicator
      constructor: function() {
        this.init = function(context, inputCallback) {
          this._context = context;
          this._input = inputCallback;
          
          // Define the main series
          var lookback = this._input("lookback");
          
          // Define plot mapping to outputs
          this._context.new_var("high_pivot", false);
          this._context.new_var("low_pivot", false);
        };
        
        this.main = function(context, inputCallback) {
          this._context = context;
          this._input = inputCallback;
          
          var lookback = this._input("lookback");
          
          // Get data
          var high = this._context.high;
          var low = this._context.low;
          
          // Check for pivot high
          var isPivotHigh = this._context.Highest(high, lookback*2+1, lookback) == high[lookback];
          
          // Check for pivot low
          var isPivotLow = this._context.Lowest(low, lookback*2+1, lookback) == low[lookback];
          
          // Return results
          return [isPivotHigh ? 1 : NaN, isPivotLow ? 1 : NaN];
        };
      }
    };
  }
  
  // Add method to register the indicator with TradingView
  register(chart, widget) {
    console.log('Registering Pivot Points indicator');
    // This will be handled by the custom_indicators_getter in tradingviewIntegration.js
  }
}

// Move the BaseIndicator class definition before PivotPointsIndicator
export class BaseIndicator {
  constructor(id, name, config = {}) {
    this.id = id;
    this.name = name;
    this._instances = [];
  }

  add(chart, widget) {
    // Base add method
    if (!chart || !widget) {
      console.error('Chart or widget not available');
      return;
    }
  }

  _trackInstance(instance) {
    this._instances.push(instance);
  }

  remove() {
    // Remove all instances of this indicator
    this._instances.forEach(instance => {
      if (instance && typeof instance.remove === 'function') {
        try {
          instance.remove();
        } catch (e) {
          console.error(`Error removing instance of ${this.name}:`, e);
        }
      }
    });
    this._instances = [];
  }
}

// Move the SimpleLineIndicator class definition before the availableIndicators array
export class SimpleLineIndicator extends BaseIndicator {
  constructor(type = INDICATOR_TYPES.SIMPLE_LINE, config = {}) {
    super(type, 'Simple Line', config);
    this.settings = {
      offset: config.offset || 0,
      color: config.color || '#FF0000'
    };
  }

  add(chart, widget) {
    super.add(chart, widget);
    
    try {
      console.log('Adding Simple Line indicator...');
      
      widget.chart().createStudy(
        "Simple Line",     // Must match the name in custom_indicators_getter
        true,              // Set to true to force overlay on the chart
        true,              // Make visible
        { offset: this.settings.offset || 0 }, // Inputs
        null,              // No callback
        { "plot_0.color": this.settings.color } // Customization
      ).then(studyId => {
        console.log(`Added ${this.name} with ID: ${studyId}`);
        this._trackInstance({ 
          type: 'study', 
          id: studyId, 
          remove: () => widget.chart().removeStudy(studyId)
        });
      }).catch(err => {
        console.error(`Error adding ${this.name}:`, err);
      });
    } catch (error) {
      console.error(`Failed to add ${this.name}:`, error);
    }
  }
}

// Then keep the availableIndicators array after all class definitions
export const availableIndicators = [
  new PivotPointsIndicator()
];

// Experimental indicators - not registered with the chart
// export const experimentalIndicators = [
//   new GeometricTrendLine(),
//   new GannAngleIndicator(),
//   new FibonacciRetracement()
// ];
