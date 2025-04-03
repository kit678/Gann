import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { availableIndicators, INDICATOR_TYPES, PivotPointsIndicator, SimpleLineIndicator } from '../utils/indicators';
import BacktestingPanel from '../components/BacktestingPanel';
import Script from 'next/script';

// Use dynamic import with no SSR for the TradingView component
const TradingViewChart = dynamic(
  () => import('../components/TradingViewSimpleChart'),
  { ssr: false }
);

// Global styles to ensure proper rendering
const GlobalStyle = styled.div`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #131722;
  position: relative;
`;

const ChartWrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1; /* Ensure chart tools are accessible */
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fed7d7;
`;

// Custom styled backtesting panel wrapper to control its size independently
const BacktestingContainer = styled.div`
  width: 100%;
  min-height: ${props => props.isCollapsed ? '50px' : '250px'};
  max-height: ${props => props.isCollapsed ? '50px' : '250px'};
  transition: min-height 0.3s ease, max-height 0.3s ease;
`;

/**
 * Advanced TradingView chart page with custom geometric indicators and backtesting
 */
const TradingViewAdvancedPage = () => {
  // Use state for things that should trigger re-renders
  const [symbol, setSymbol] = useState('AAPL');
  const [interval, setInterval] = useState('D');
  const [error, setError] = useState(null);
  const [activeIndicators, setActiveIndicators] = useState({});
  const [isBacktestingCollapsed, setIsBacktestingCollapsed] = useState(true);
  
  // Use refs for things that shouldn't trigger re-renders
  const tvWidgetRef = useRef(null);
  const chartRef = useRef(null);
  const isUpdatingRef = useRef(false);
  
  // Reference to library path
  const libraryPath = '/charting_library/';
  
  // Default datafeed URL - use our own UDF-compatible API
  const datafeedUrl = '/api/tradingview';
  
  // Handle symbol change from chart or external UI
  const handleSymbolChange = useCallback((newSymbol) => {
    console.log('Parent: Symbol changed to', newSymbol);
    
    // Prevent unnecessary updates
    if (newSymbol && newSymbol !== symbol && !isUpdatingRef.current) {
      isUpdatingRef.current = true;
      setSymbol(newSymbol);
      
      // Reset the flag after the state update
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  }, [symbol]);
  
  // Handle interval change from chart or external UI
  const handleIntervalChange = useCallback((newInterval) => {
    console.log('Parent: Interval changed to', newInterval);
    
    // Prevent unnecessary updates
    if (newInterval && newInterval !== interval && !isUpdatingRef.current) {
      isUpdatingRef.current = true;
      setInterval(newInterval);
      
      // Reset the flag after the state update
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  }, [interval]);
  
  // Get reference to widget instance when it's ready
  const onChartReady = useCallback((widget) => {
    console.log('Chart widget instance ready');
    
    // Initialize widget reference
    if (chartRef.current) {
      chartRef.current.tvWidget = widget;
    }
    
    // Add a longer delay before adding the indicator
    setTimeout(() => {
      if (availableIndicators && availableIndicators.length > 0) {
        // Use the simple line indicator for now
        const simpleIndicator = availableIndicators.find(ind => ind.id === 'simple_line');
        
        if (simpleIndicator) {
          console.log('Adding Simple Line indicator programmatically');
          try {
            // Only add if the chart is fully loaded
            if (widget && widget.chart()) {
              simpleIndicator.add(widget.chart(), widget);
            } else {
              console.error('Chart not fully initialized yet');
            }
          } catch (err) {
            console.error('Error adding indicator:', err);
          }
        }
      }
    }, 2000);  // Keep the 2 second delay
    
    // Other initialization code...
  }, []);
  
  // Toggle an indicator on/off
  const handleIndicatorToggle = useCallback((indicatorId, isEnabled) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicatorId]: isEnabled
    }));
  }, []);

  // Keep handler for future use
  const handleBacktestingCollapse = useCallback((isCollapsed) => {
    setIsBacktestingCollapsed(isCollapsed);
  }, []);

  // Handle potential errors from the chart loading
  useEffect(() => {
    // Create error event handler
    const handleError = (event) => {
      if (event.message && event.message.includes('TradingView')) {
        setError(`Chart error: ${event.message}`);
      }
    };

    // Add global error listener
    window.addEventListener('error', handleError);
    
    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Update the useEffect where indicators are initialized:
  useEffect(() => {
    // Initialize available indicators (you may want to modify this based on how indicators are managed)
    setActiveIndicators({
      simple_line: new SimpleLineIndicator(INDICATOR_TYPES.SIMPLE_LINE, {
        offset: 0,
        color: '#FF0000'
      }),
      // Keep your other indicators (or comment them out temporarily)
      // new PivotPointsIndicator(...),
      // etc.
    });
  }, []);

  return (
    <>
      <Head>
        <title>Advanced TradingView Chart | GannSq9</title>
        <meta name="description" content="Advanced TradingView chart with custom geometric indicators and backtesting capabilities" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </Head>
      {/* Properly load scripts with correct paths */}
      <Script src={`${libraryPath}charting_library.standalone.js`} strategy="beforeInteractive" />
      <Script src={`/datafeeds/udf/dist/bundle.js`} strategy="beforeInteractive" />
      
      <PageContainer>
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
        
        <ChartWrapper>
          <TradingViewChart 
            ref={chartRef}
            symbol={symbol}
            interval={interval}
            libraryPath={libraryPath}
            datafeedUrl={datafeedUrl}
            customIndicators={availableIndicators}
            debug={true}
            onChartReady={onChartReady}
            onSymbolChange={handleSymbolChange}
            onIntervalChange={handleIntervalChange}
          />
        </ChartWrapper>
        
        {/* Backtesting panel removed from display but code kept for future use */}
      </PageContainer>
    </>
  );
};

export default TradingViewAdvancedPage; 