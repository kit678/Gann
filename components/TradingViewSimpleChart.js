import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
`;

/**
 * TradingViewSimpleChart - Simplified TradingView chart implementation
 * 
 * @param {Object} props - Component props
 * @param {string} props.symbol - Trading symbol to display (e.g., 'AAPL')
 * @param {string} props.interval - Chart interval (e.g., 'D' for daily, '60' for 60min)
 * @param {string} props.containerId - DOM container ID
 * @param {Object} props.libraryPath - Path to the TradingView library
 * @param {Function} props.datafeedUrl - URL to the datafeed
 * @param {Object} props.customIndicators - Custom indicators to register
 * @param {boolean} props.debug - Enable debug mode
 * @param {Function} props.onChartReady - Callback when chart is ready with widget instance
 * @param {Function} props.onSymbolChange - Callback when symbol changes
 * @param {Function} props.onIntervalChange - Callback when interval changes
 */
const TradingViewSimpleChart = ({ 
  symbol = 'AAPL',
  interval = 'D', 
  containerId = 'tv_chart_container',
  libraryPath = '/charting_library/',
  datafeedUrl = 'https://demo_feed.tradingview.com',
  customIndicators = [],
  debug = false,
  onChartReady = null,
  onSymbolChange = null,
  onIntervalChange = null,
}, ref) => {
  const chartContainerRef = useRef(null);
  const tvWidgetRef = useRef(null);
  const [isChartReady, setIsChartReady] = useState(false);
  
  // Use refs to track current symbol and interval to prevent unnecessary re-renders
  const currentSymbolRef = useRef(symbol);
  const currentIntervalRef = useRef(interval);
  const isInternalUpdateRef = useRef(false);
  
  // Create a stable version of callback refs to prevent recreation
  const onChartReadyRef = useRef(onChartReady);
  const onSymbolChangeRef = useRef(onSymbolChange);
  const onIntervalChangeRef = useRef(onIntervalChange);
  
  // Update refs when props change
  useEffect(() => {
    onChartReadyRef.current = onChartReady;
    onSymbolChangeRef.current = onSymbolChange;
    onIntervalChangeRef.current = onIntervalChange;
  }, [onChartReady, onSymbolChange, onIntervalChange]);

  // Initialize TradingView widget
  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    // Skip re-initialization if we already have a widget and just symbol/interval changed
    if (tvWidgetRef.current && isChartReady && (
        symbol !== currentSymbolRef.current || 
        interval !== currentIntervalRef.current)) {
      
      console.log('Updating existing widget with new symbol/interval', symbol, interval);
      isInternalUpdateRef.current = true;
      
      try {
        const chart = tvWidgetRef.current.chart();
        
        // Only update the symbol if it has changed
        if (symbol !== currentSymbolRef.current) {
          chart.setSymbol(symbol, () => {
            currentSymbolRef.current = symbol;
            console.log('Symbol updated to', symbol);
            isInternalUpdateRef.current = false;
          });
        }
        
        // Only update the interval if it has changed
        if (interval !== currentIntervalRef.current) {
          chart.setResolution(interval, () => {
            currentIntervalRef.current = interval;
            console.log('Interval updated to', interval);
            isInternalUpdateRef.current = false;
          });
        }
      } catch (error) {
        console.error('Error updating widget with new symbol/interval', error);
        isInternalUpdateRef.current = false;
      }
      
      // Return early since we're just updating the existing widget
      return;
    }

    // Check if TradingView library is loaded
    if (!window.TradingView) {
      console.error('TradingView library not loaded');
      return;
    }
    
    // Cleanup existing widget before creating a new one
    if (tvWidgetRef.current) {
      try {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
      } catch (error) {
        console.error('Error removing existing TradingView widget:', error);
      }
    }

    // Create widget
    const createWidget = async () => {
      try {
        // Update our refs to the current values
        currentSymbolRef.current = symbol;
        currentIntervalRef.current = interval;
        
        // Create datafeed
        const datafeed = new window.Datafeeds.UDFCompatibleDatafeed(datafeedUrl, {
          debug: debug // Enable debug logging if debug mode is on
        });
        
        // Ensure symbol info has a valid name by modifying the resolveSymbol method
        const originalResolveSymbol = datafeed.resolveSymbol;
        if (originalResolveSymbol) {
          datafeed.resolveSymbol = function(symbolName, onResolve, onError, extension) {
            if (debug) console.log('Resolving symbol:', symbolName);
            return originalResolveSymbol.call(this, symbolName, (symbolInfo) => {
              // Ensure the symbol has a valid name property
              if (!symbolInfo.name || symbolInfo.name === '') {
                symbolInfo.name = symbolName;
              }
              if (debug) console.log('Symbol resolved:', symbolInfo);
              onResolve(symbolInfo);
            }, (error) => {
              console.error('Error resolving symbol:', error);
              if (onError) onError(error);
            }, extension);
          };
        }

        // Widget options
        const widgetOptions = {
          symbol: symbol,
          datafeed: datafeed,
          interval: interval,
          container: chartContainerRef.current,
          library_path: libraryPath,
          locale: 'en',
          disabled_features: [
            'use_localstorage_for_settings' // Disable local storage to prevent caching issues
          ],
          enabled_features: [
            'study_templates',
            'create_volume_indicator_by_default',
            'bar_replay',
            'header_symbol_search',
            'header_interval_dialog_button',
            'show_interval_dialog_on_key_press',
            'header_chart_type',
            'header_settings',
            'header_indicators',
            'header_compare',
            'header_undo_redo',
            'header_screenshot',
            'timeframes_toolbar',
            'header_saveload',
            'header_fullscreen_button',
            'constraint_dialogs_movement',
            'display_market_status',
            'remove_library_container_border'
          ],
          header_widget_buttons_mode: 'fullsize',
          allow_symbol_change: true,
          allow_timeframe_change: true,
          fullscreen: false,
          autosize: true,
          studies_overrides: {
            "volume.volume.color.0": "#ef5350",
            "volume.volume.color.1": "#26a69a",
            "volume.volume.transparency": 50,
            "volume.volume.visible": true
          },
          theme: 'Dark',
          loading_screen: { backgroundColor: "#131722" },
          overrides: {
            "paneProperties.background": "#131722",
            "paneProperties.vertGridProperties.color": "#242632",
            "paneProperties.horzGridProperties.color": "#242632",
            "scalesProperties.textColor": "#AAA",
            "volumePaneSize": "medium",
            "mainSeriesProperties.priceAxisProperties.lockScale": false,
            "mainSeriesProperties.priceAxisProperties.autoScale": true,
            "mainSeriesProperties.candleStyle.upColor": "#26a69a",
            "mainSeriesProperties.candleStyle.downColor": "#ef5350",
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": "#378658",
            "mainSeriesProperties.candleStyle.borderUpColor": "#26a69a",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ef5350",
            "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350"
          }
        };

        // Create widget instance
        const widget = new window.TradingView.widget(widgetOptions);

        // Store widget reference
        tvWidgetRef.current = widget;

        // Set up widget event handlers
        widget.onChartReady(() => {
          if (debug) console.log('Chart is ready');
          setIsChartReady(true);
          
          // Get chart instance
          const chart = widget.chart();
          
          // Subscribe to symbol change events
          chart.onSymbolChanged().subscribe(null, () => {
            const newSymbol = chart.symbol();
            if (debug) console.log('Symbol changed to:', newSymbol);
            
            if (!isInternalUpdateRef.current && newSymbol !== currentSymbolRef.current) {
              currentSymbolRef.current = newSymbol;
              if (onSymbolChangeRef.current) {
                onSymbolChangeRef.current(newSymbol);
              }
            }
          });
          
          // Subscribe to interval change events
          chart.onIntervalChanged().subscribe(null, (newInterval) => {
            if (debug) console.log('Interval changed to:', newInterval);
            
            if (!isInternalUpdateRef.current && newInterval !== currentIntervalRef.current) {
              currentIntervalRef.current = newInterval;
              if (onIntervalChangeRef.current) {
                onIntervalChangeRef.current(newInterval);
              }
            }
          });
          
          // Call onChartReady callback if provided
          if (onChartReadyRef.current) {
            onChartReadyRef.current(widget);
          }
        });
      } catch (error) {
        console.error('Error initializing TradingView chart:', error);
      }
    };

    createWidget();

    // Cleanup
    return () => {
      if (tvWidgetRef.current) {
        try {
          tvWidgetRef.current.remove();
          tvWidgetRef.current = null;
        } catch (error) {
          console.error('Error removing TradingView widget:', error);
        }
      }
    };
    
    // Only include dependencies that should trigger a complete rebuild of the chart
    // Do NOT include symbol, interval, onChartReady, onSymbolChange, onIntervalChange
  }, [datafeedUrl, libraryPath, containerId, debug]);

  // Add volume indicator to the chart properly
  const addVolumeIndicator = (widget) => {
    if (!widget || !widget.chart()) return;
    
    try {
      const chart = widget.chart();
      
      // First, remove any existing volume indicators that might be in the wrong place
      chart.getAllStudies().forEach(study => {
        if (study.name === 'Volume') {
          chart.removeEntity(study.id);
        }
      });
      
      // Add volume indicator in a separate pane with proper configuration
      chart.createStudy(
        'Volume', 
        false, 
        false, 
        {}, 
        {
          'color.0': '#ef5350',  // Down color
          'color.1': '#26a69a',  // Up color
          'transparency': 50,
          'visible': true,
          'in_main_pane': false  // Ensure it's not in the main pane
        }
      );
      
      if (debug) {
        console.log('Volume indicator added in separate pane');
      }
    } catch (error) {
      console.error('Error adding volume indicator:', error);
    }
  };

  // Register custom indicators with the TradingView widget
  const registerCustomIndicators = (widget) => {
    if (!widget || !widget.chart()) return;
    
    try {
      const chart = widget.chart();
      
      // Register custom indicators with the chart
      customIndicators.forEach(indicator => {
        if (typeof indicator.register === 'function') {
          indicator.register(chart, widget);
        }
        
        if (debug) {
          console.log(`Registered custom indicator: ${indicator.name}`);
        }
      });
    } catch (error) {
      console.error('Error registering custom indicators:', error);
    }
  };
  
  // Setup drawing tools
  const setupDrawingTools = (widget) => {
    if (!widget) return;
    
    const chart = widget.chart();
    
    // Enable drawing tools
    try {
      // Subscribe to drawing events when available
      if (chart.subscribe) {
        // Subscribe to drawing completed event
        chart.subscribe('onDrawingComplete', (drawing) => {
          if (!drawing) return;
          calculateAndDisplayAngle(chart, drawing);
        });
        
        // Subscribe to drawing changed event
        chart.subscribe('onDrawingChange', (drawing) => {
          if (!drawing) return;
          calculateAndDisplayAngle(chart, drawing);
        });
      }
    } catch (err) {
      console.warn('Error setting up drawing tools:', err);
    }
  };
  
  // Function to calculate and display angle of a drawn line
  const calculateAndDisplayAngle = (chart, drawing) => {
    try {
      // Check if the drawing has points method to get coordinates
      if (!drawing.points || typeof drawing.points !== 'function') {
        return;
      }
      
      const points = drawing.points();
      if (!points || points.length < 2) return;
      
      // Get the start and end points of the line
      const startPoint = points[0];
      const endPoint = points[1];
      
      if (!startPoint || !endPoint) return;
      
      // Convert logical coordinates (time, price) to pixel coordinates
      const pixelCoordinates = getPixelCoordinates(chart, startPoint, endPoint);
      if (!pixelCoordinates) return;
      
      // Calculate the angle in degrees
      const angle = calculateAngle(pixelCoordinates.x1, pixelCoordinates.y1, pixelCoordinates.x2, pixelCoordinates.y2);
      
      // Update the line's properties to display the angle
      if (drawing.setProperties && typeof drawing.setProperties === 'function') {
        drawing.setProperties({
          text: `${angle.toFixed(2)}°`,
          textcolor: '#FFFFFF',
          fontsize: 12,
          showLabel: true
        });
      }
    } catch (err) {
      console.warn('Error calculating angle:', err);
    }
  };
  
  // Helper function to get pixel coordinates from logical coordinates
  const getPixelCoordinates = (chart, startPoint, endPoint) => {
    try {
      // Get time scale and price scale
      const timeScale = chart.timeScale();
      const priceScale = chart.priceScale();
      
      if (!timeScale || !priceScale) return null;
      
      // Convert time to x-coordinate (pixels)
      const x1 = timeScale.timeToCoordinate(startPoint.time);
      const x2 = timeScale.timeToCoordinate(endPoint.time);
      
      // Convert price to y-coordinate (pixels)
      const y1 = priceScale.priceToCoordinate(startPoint.price);
      const y2 = priceScale.priceToCoordinate(endPoint.price);
      
      // Check if all coordinates were successfully converted
      if (x1 === null || x2 === null || y1 === null || y2 === null) {
        return null;
      }
      
      return { x1, y1, x2, y2 };
    } catch (err) {
      console.warn('Error converting coordinates:', err);
      return null;
    }
  };
  
  // Helper function to calculate angle in degrees
  const calculateAngle = (x1, y1, x2, y2) => {
    // Calculate slope (remember that y-axis is inverted in screen coordinates)
    const dx = x2 - x1;
    const dy = y1 - y2; // Invert y to account for the coordinate system
    
    // Calculate angle in radians
    let radians = Math.atan2(dy, dx);
    
    // Convert to degrees
    let degrees = radians * (180 / Math.PI);
    
    // Normalize to 0-360 range
    if (degrees < 0) {
      degrees += 360;
    }
    
    return degrees;
  };
  
  // Helper function to get milliseconds per bar based on interval
  const getMillisecondsPerBar = (interval) => {
    // Convert interval to milliseconds
    const intervalMap = {
      '1': 60 * 1000, // 1 minute
      '5': 5 * 60 * 1000, // 5 minutes
      '15': 15 * 60 * 1000, // 15 minutes
      '30': 30 * 60 * 1000, // 30 minutes
      '60': 60 * 60 * 1000, // 1 hour
      'D': 24 * 60 * 60 * 1000, // 1 day
      'W': 7 * 24 * 60 * 60 * 1000, // 1 week
      'M': 30 * 24 * 60 * 60 * 1000, // 1 month (approximate)
    };
    
    return intervalMap[interval] || 24 * 60 * 60 * 1000; // Default to 1 day
  };

  // Method to set the price-to-bar ratio
  const setPriceToBarRatio = useCallback((ratio) => {
    if (!tvWidgetRef.current) return;
    
    const chart = tvWidgetRef.current.chart();
    if (!chart) return;
    
    console.log("Setting price-to-bar ratio to:", ratio);
    
    try {
      // Store the ratio for future reference
      chart._customPriceToBarRatio = ratio;
      
      // Get time scale and price scale
      const timeScale = chart.timeScale();
      const priceScale = chart.priceScale();
      
      if (!timeScale || !priceScale) return;
      
      // 1. First, get the current visible range
      const visibleRange = chart.timeScale().getVisibleRange();
      if (!visibleRange) return;
      
      // 2. Get the price range
      const seriesApi = chart.activeChart().mainSeries();
      const priceRange = seriesApi.priceRange();
      if (!priceRange) return;
      
      const minPrice = priceRange.minValue();
      const maxPrice = priceRange.maxValue();
      const priceSpan = maxPrice - minPrice;
      
      // 3. Calculate time span in bars
      const timeDiff = (visibleRange.to - visibleRange.from) / 1000; // in seconds
      const barsPerSec = getMillisecondsPerBar(interval) / 1000;
      const bars = timeDiff / barsPerSec;
      
      // 4. Calculate the desired price range based on the ratio and bars
      const desiredPriceSpan = ratio * bars;
      
      // 5. Calculate scaling factor
      const scaleFactor = desiredPriceSpan / priceSpan;
      
      // 6. Apply the settings
      
      // Lock the price scale
      chart.applyOverrides({
        "mainSeriesProperties.priceAxisProperties.lockScale": true,
        "mainSeriesProperties.priceAxisProperties.autoScale": false
      });
      
      // Set bar spacing based on ratio
      // For a higher ratio, we need narrower bars, so adjust accordingly
      const baseSpacing = 6; // Default bar spacing
      const spacing = Math.max(3, Math.min(20, baseSpacing / Math.sqrt(ratio)));
      timeScale.setBarSpacing(spacing);
      
      // Apply zoom to price scale
      const midPrice = (minPrice + maxPrice) / 2;
      priceScale.setScale(scaleFactor);
      
      // Force update
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
      
      return {
        ratio,
        bars,
        priceSpan,
        desiredPriceSpan,
        scaleFactor,
        barSpacing: spacing
      };
    } catch (err) {
      console.warn('Error setting price-to-bar ratio:', err);
      return null;
    }
  }, [interval]);

  // Expose the method via a ref if needed
  useImperativeHandle(ref, () => ({
    setPriceToBarRatio,
    tvWidget: tvWidgetRef.current
  }), [setPriceToBarRatio, tvWidgetRef.current]);

  return (
    <ChartContainer 
      id={containerId} 
      ref={chartContainerRef}
    />
  );
};

export default forwardRef(TradingViewSimpleChart); 