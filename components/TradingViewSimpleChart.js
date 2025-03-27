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
 */
const TradingViewSimpleChart = ({ 
  symbol = 'AAPL',
  interval = 'D', 
  containerId = 'tv_chart_container',
  libraryPath = '/charting_library/',
  datafeedUrl = 'https://demo_feed.tradingview.com',
  customIndicators = [],
  debug = false,
}, ref) => {
  const chartContainerRef = useRef(null);
  const tvWidgetRef = useRef(null);
  const [isChartReady, setIsChartReady] = useState(false);

  // Initialize TradingView widget
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Check if TradingView library is loaded
    if (!window.TradingView) {
      console.error('TradingView library not loaded');
      return;
    }

    // Create widget
    const createWidget = async () => {
      try {
        // Create datafeed
        const datafeed = new window.Datafeeds.UDFCompatibleDatafeed(datafeedUrl);

        // Widget options
        const widgetOptions = {
          symbol: symbol,
          datafeed: datafeed,
          interval: interval,
          container: chartContainerRef.current,
          library_path: libraryPath,
          locale: 'en',
          disabled_features: [
            'header_symbol_search',
            'header_compare'
          ],
          enabled_features: [
            'study_templates',
            'use_localstorage_for_settings',
            'create_volume_indicator_by_default',
            'bar_replay'
          ],
          charts_storage_url: 'https://saveload.tradingview.com',
          charts_storage_api_version: '1.1',
          client_id: 'tradingview.com',
          user_id: 'public_user',
          fullscreen: false,
          autosize: true,
          studies_overrides: {
            "volume.volume.color.0": "rgba(255, 68, 68, 0.5)",
            "volume.volume.color.1": "rgba(68, 170, 255, 0.5)",
            "volume.volume.in_main_pane": false,
            "volume.volume.up.color": "rgba(68, 170, 255, 0.5)",
            "volume.volume.down.color": "rgba(255, 68, 68, 0.5)",
            "volume.volume.transparency": 50,
            "volume.show.separate.pane": true
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
            "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",
            "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
            "mainSeriesProperties.priceAxisProperties.percentage": false,
            "mainSeriesProperties.priceAxisProperties.log": false,
            "mainSeriesProperties.barSpacing": 6,
            "timeScale.rightOffset": 5,
            "timeScale.barSpacing": 6
          },
          timeScale: {
            rightOffset: 5,
            barSpacing: 6,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            timeVisible: true,
            secondsVisible: false
          },
          priceScale: {
            autoScale: true,
            mode: 0,
            invertScale: false,
            alignLabels: true,
            borderVisible: true,
            entireTextOnly: false,
            visible: true
          }
        };

        // Create TradingView widget
        const tvWidget = new window.TradingView.widget(widgetOptions);
        tvWidgetRef.current = tvWidget;

        // Save reference to widget and hook up ready callback
        tvWidget.onChartReady(() => {
          console.log('Chart has been initialized');
          setIsChartReady(true);
          
          // Register custom indicators
          registerCustomIndicators(tvWidget);
          
          // Initialize drawing tools capabilities
          setupDrawingTools(tvWidget);
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
  }, [symbol, interval, datafeedUrl, libraryPath, containerId]);

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