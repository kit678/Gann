import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { availableIndicators } from '../utils/indicators';
import BacktestingPanel from '../components/BacktestingPanel';
import Script from 'next/script';

// Use dynamic import with no SSR for the TradingView component
const TradingViewChart = dynamic(
  () => import('../components/TradingViewSimpleChart'),
  { ssr: false }
);

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 2rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  background-color: white;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fed7d7;
`;

/**
 * Advanced TradingView chart page with custom geometric indicators and backtesting
 */
const TradingViewAdvancedPage = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [interval, setInterval] = useState('D');
  const [tvWidget, setTvWidget] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndicators, setActiveIndicators] = useState({});
  const tvWidgetRef = useRef(null);
  
  // Reference to library path
  const libraryPath = '/charting_library/';
  
  // Default datafeed URL - use our own UDF-compatible API
  const datafeedUrl = '/api/tradingview';
  
  // Handle symbol change
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };
  
  // Handle interval change
  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };
  
  // Get reference to widget instance when it's ready
  const onChartReady = (widgetInstance) => {
    tvWidgetRef.current = widgetInstance;
    setTvWidget(widgetInstance);
  };
  
  // Toggle an indicator on/off
  const handleIndicatorToggle = (indicatorId, isEnabled) => {
    setActiveIndicators(prev => ({
      ...prev,
      [indicatorId]: isEnabled
    }));
  };

  // Reference to the chart component
  const chartRef = useRef(null);

  return (
    <Layout>
      <Head>
        <title>Advanced TradingView Chart with Custom Indicators | GannSq9</title>
        <meta name="description" content="Advanced TradingView chart with custom geometric indicators and backtesting capabilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src={`${libraryPath}charting_library.js`} strategy="beforeInteractive" />
      <Script src={`/datafeeds/udf/dist/bundle.js`} strategy="beforeInteractive" />
      
      <PageContainer>
        <ControlsContainer>
          <InputGroup>
            <Label htmlFor="symbol">Symbol</Label>
            <Input 
              id="symbol" 
              type="text" 
              value={symbol} 
              onChange={handleSymbolChange} 
              placeholder="Enter symbol" 
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="interval">Interval</Label>
            <Select 
              id="interval" 
              value={interval} 
              onChange={handleIntervalChange}
            >
              <option value="1">1 Minute</option>
              <option value="5">5 Minutes</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="D">1 Day</option>
              <option value="W">1 Week</option>
              <option value="M">1 Month</option>
            </Select>
          </InputGroup>
        </ControlsContainer>
        
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
          />
        </ChartWrapper>
        
        <BacktestingPanel 
          tvWidget={tvWidgetRef.current}
          customIndicators={availableIndicators}
          onIndicatorToggle={handleIndicatorToggle}
        />
      </PageContainer>
    </Layout>
  );
};

export default TradingViewAdvancedPage; 