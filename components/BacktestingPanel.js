import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BacktestEngine } from '../utils/backtesting';
import { pivotAngleRule, trendlineBreakRule, candleAngleIntersectionRule, createExitRules } from '../utils/tradingRules';

const PanelContainer = styled.div`
  background-color: #131722;
  color: #d1d4dc;
  border-radius: 4px;
  border: 1px solid #2a2e39;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-top: 16px;
  width: 100%;
  height: ${props => props.isCollapsed ? '50px' : '250px'};
  transition: height 0.3s ease;
  overflow: hidden;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.isCollapsed ? '0' : '16px'};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #5d9cf5;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  
  &:hover {
    background-color: rgba(93, 156, 245, 0.1);
    border-radius: 4px;
  }
`;

const Content = styled.div`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  flex-direction: column;
  height: calc(100% - 40px);
  overflow-y: auto;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2a2e39;
  margin-bottom: 16px;
`;

const Tab = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 2px solid ${props => props.active ? '#5d9cf5' : 'transparent'};
  color: ${props => props.active ? '#d1d4dc' : '#787b86'};
  
  &:hover {
    color: ${props => props.active ? '#d1d4dc' : '#a3a6af'};
  }
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#5d9cf5' : '#2a2e39'};
  color: #d1d4dc;
  border: 1px solid ${props => props.primary ? '#5d9cf5' : '#363c4e'};
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#4a8be0' : '#363c4e'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  background-color: #2a2e39;
  color: #d1d4dc;
  border: 1px solid #363c4e;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #5d9cf5;
  }
`;

const Input = styled.input`
  background-color: #2a2e39;
  color: #d1d4dc;
  border: 1px solid #363c4e;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  width: 100px;
  
  &:focus {
    outline: none;
    border-color: #5d9cf5;
  }
  
  &[type="checkbox"] {
    width: auto;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #a3a6af;
`;

const ResultsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  font-size: 14px;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    text-align: left;
    padding: 8px 12px;
    border-bottom: 1px solid #2a2e39;
  }
  
  th {
    color: #787b86;
    font-weight: 600;
    position: sticky;
    top: 0;
    background-color: #131722;
  }
  
  tbody tr:hover {
    background-color: rgba(93, 156, 245, 0.05);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const MetricCard = styled.div`
  background-color: #1c2030;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

const MetricTitle = styled.div`
  font-size: 12px;
  color: #787b86;
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => {
    if (props.positive) return '#4caf50';
    if (props.negative) return '#f44336';
    return '#d1d4dc';
  }};
`;

/**
 * Backtesting Panel Component
 * 
 * Provides controls for running a backtest and visualizing results.
 */
const BacktestingPanel = ({ data, chartInstance, priceToBarRatio }) => {
  const backtestEngineRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [results, setResults] = useState(null);
  const [selectedRules, setSelectedRules] = useState({
    pivotAngle: true,
    trendlineBreak: true,
    candleIntersection: false,
    takeProfitStopLoss: true
  });
  const [ruleParams, setRuleParams] = useState({
    pivotAngle: {
      minAngle: 30,
      maxAngle: 60,
      direction: 'up',
      pivotLookback: 5
    },
    trendlineBreak: {
      breakoutThreshold: 1
    },
    candleIntersection: {
      angle: 45,
      pivotLookback: 5
    },
    takeProfitStopLoss: {
      takeProfit: 5,
      stopLoss: 2
    }
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState('normal');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTrades: 0,
    winRate: 0,
    averageReturn: 0,
    maxDrawdown: 0,
    profitFactor: 0,
    sharpeRatio: 0
  });
  const backtestTimerRef = useRef(null);
  const tradesRef = useRef([]);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const initialCapitalRef = useRef(10000);
  const currentEquityRef = useRef(10000);
  
  // Initialize backtest engine
  useEffect(() => {
    if (!data || !data.length) return;
    
    // Create new backtest engine
    const backtestEngine = new BacktestEngine(data);
    backtestEngineRef.current = backtestEngine;
    
    // Add event listeners
    backtestEngine.on('candle', handleCandleUpdate);
    backtestEngine.on('complete', handleBacktestComplete);
    
    setIsInitialized(true);
    
    return () => {
      // Clean up on unmount
      if (backtestEngineRef.current) {
        backtestEngineRef.current.stop();
      }
    };
  }, [data]);
  
  // Apply selected rules when they change
  useEffect(() => {
    if (!backtestEngineRef.current || !isInitialized) return;
    
    // Clear existing rules
    backtestEngineRef.current.rules = [];
    
    // Add selected rules
    applySelectedRules();
    
  }, [selectedRules, ruleParams, isInitialized, priceToBarRatio]);
  
  // Apply the selected trading rules to the backtest engine
  const applySelectedRules = () => {
    const engine = backtestEngineRef.current;
    if (!engine) return;
    
    // Pivot Angle Rule
    if (selectedRules.pivotAngle) {
      const { minAngle, maxAngle, direction, pivotLookback } = ruleParams.pivotAngle;
      const rule = pivotAngleRule(minAngle, maxAngle, direction, pivotLookback, priceToBarRatio);
      engine.addRule(rule.condition, rule.action, rule.name);
    }
    
    // Trendline Break Rule
    if (selectedRules.trendlineBreak) {
      const { breakoutThreshold } = ruleParams.trendlineBreak;
      const rule = trendlineBreakRule(breakoutThreshold);
      engine.addRule(rule.condition, rule.action, rule.name);
    }
    
    // Candle Intersection Rule
    if (selectedRules.candleIntersection) {
      const { angle, pivotLookback } = ruleParams.candleIntersection;
      const rule = candleAngleIntersectionRule(angle, pivotLookback, priceToBarRatio);
      engine.addRule(rule.condition, rule.action, rule.name);
    }
    
    // Take Profit/Stop Loss Rule
    if (selectedRules.takeProfitStopLoss) {
      const { takeProfit, stopLoss } = ruleParams.takeProfitStopLoss;
      const rule = createExitRules(takeProfit, stopLoss);
      engine.addRule(rule.condition, rule.action, rule.name);
    }
  };
  
  // Handle candle updates during backtest
  const handleCandleUpdate = (data) => {
    setCurrentIndex(data.index);
    setProgress((data.index / (backtestEngineRef.current?.data.length || 1)) * 100);
    
    // Update chart if available
    updateChartMarkers(data);
  };
  
  // Update chart with trade markers
  const updateChartMarkers = (data) => {
    if (!chartInstance) return;
    
    // Clear existing trade markers
    if (chartInstance.annotations) {
      const existingAnnotations = chartInstance.annotations.filter(a => a.options.id?.startsWith('trade-'));
      existingAnnotations.forEach(a => a.destroy());
    }
    
    // Add markers for open positions
    data.account.positions.forEach(position => {
      const color = position.side === 'buy' ? '#22c55e' : '#ef4444';
      
      // Add entry marker
      chartInstance.addAnnotation({
        id: `trade-${position.id}-entry`,
        labels: [{
          point: { x: position.entryTimestamp, y: position.entryPrice },
          text: position.side === 'buy' ? '▲' : '▼',
          backgroundColor: color,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          padding: 5,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white'
          }
        }]
      });
    });
    
    // Add markers for closed trades
    data.account.trades.slice(-5).forEach(trade => {
      const pnlColor = trade.pnl >= 0 ? '#22c55e' : '#ef4444';
      
      // Add exit marker
      chartInstance.addAnnotation({
        id: `trade-${trade.id}-exit`,
        labels: [{
          point: { x: trade.exitTimestamp, y: trade.exitPrice },
          text: trade.pnl >= 0 ? '✓' : '✗',
          backgroundColor: pnlColor,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          padding: 5,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white'
          }
        }]
      });
    });
  };
  
  // Handle backtest completion
  const handleBacktestComplete = (data) => {
    setIsRunning(false);
    setIsPaused(false);
    setResults(data.stats);
    console.log('Backtest completed:', data.stats);
  };
  
  // Start the backtest
  const startBacktest = () => {
    if (!backtestEngineRef.current) return;
    
    // Reset previous results
    setResults(null);
    
    // Start backtest engine
    backtestEngineRef.current.start(true, 100);
    setIsRunning(true);
    setIsPaused(false);
  };
  
  // Pause the backtest
  const pauseBacktest = () => {
    if (!backtestEngineRef.current) return;
    
    backtestEngineRef.current.pause();
    setIsPaused(true);
  };
  
  // Resume the backtest
  const resumeBacktest = () => {
    if (!backtestEngineRef.current) return;
    
    backtestEngineRef.current.resume();
    setIsPaused(false);
  };
  
  // Stop the backtest
  const stopBacktest = () => {
    if (!backtestEngineRef.current) return;
    
    backtestEngineRef.current.stop();
    setIsRunning(false);
    setIsPaused(false);
  };
  
  // Step forward one candle
  const stepForward = () => {
    if (!backtestEngineRef.current) return;
    
    if (!isRunning) {
      backtestEngineRef.current.start(false);
      setIsRunning(true);
      setIsPaused(true);
    } else {
      backtestEngineRef.current.next();
    }
  };
  
  // Step backward one candle
  const stepBackward = () => {
    if (!backtestEngineRef.current || !isRunning) return;
    
    backtestEngineRef.current.previous();
  };
  
  // Change playback speed
  const changeSpeed = (speed) => {
    if (!backtestEngineRef.current) return;
    
    backtestEngineRef.current.setSpeed(speed);
    setPlaybackSpeed(speed);
  };
  
  // Toggle a rule
  const toggleRule = (ruleName) => {
    setSelectedRules(prev => ({
      ...prev,
      [ruleName]: !prev[ruleName]
    }));
  };
  
  // Update a rule parameter
  const updateRuleParam = (ruleName, paramName, value) => {
    setRuleParams(prev => ({
      ...prev,
      [ruleName]: {
        ...prev[ruleName],
        [paramName]: value
      }
    }));
  };
  
  // Detect bar replay mode changes
  useEffect(() => {
    if (!chartInstance) return;
    
    const checkReplayMode = () => {
      if (chartInstance && chartInstance.chart) {
        try {
          // In a real implementation, you would detect bar replay mode changes
          // This is a placeholder for the real implementation
          const isInReplayMode = false; // chartInstance.chart().isInReplayMode()
          
          if (isInReplayMode !== isBacktesting) {
            setIsBacktesting(isInReplayMode);
            
            if (isInReplayMode) {
              // Replay mode started
              startBacktest();
            } else {
              // Replay mode ended
              endBacktest();
            }
          }
        } catch (error) {
          console.error('Error checking replay mode:', error);
        }
      }
    };
    
    // Check initial state
    checkReplayMode();
    
    // Set up interval to check for replay mode changes
    const interval = setInterval(checkReplayMode, 1000);
    return () => clearInterval(interval);
  }, [chartInstance, isBacktesting]);
  
  // Handle component unmount
  useEffect(() => {
    return () => {
      if (backtestTimerRef.current) {
        clearInterval(backtestTimerRef.current);
      }
    };
  }, []);
  
  const endBacktest = () => {
    if (backtestTimerRef.current) {
      clearInterval(backtestTimerRef.current);
      backtestTimerRef.current = null;
    }
    
    endTimeRef.current = new Date();
    setIsBacktesting(false);
    
    // Calculate final results
    calculateResults();
  };
  
  const checkForSignals = () => {
    if (!chartInstance || !selectedIndicators.length) return;
    
    try {
      // Get current bar info
      const chart = chartInstance.chart();
      const visibleRange = chart.getVisibleRange();
      const currentTime = chart.getVisibleTime();
      
      // In a real implementation, you would:
      // 1. Check each indicator for signals at the current bar
      // 2. Record any trades that would be taken
      // 3. Calculate performance metrics
      
      // Mock implementation for demonstration
      if (Math.random() < 0.02) { // 2% chance of signal
        const randomIndicator = selectedIndicators[Math.floor(Math.random() * selectedIndicators.length)];
        const isBuy = Math.random() > 0.5;
        
        // Mock price data
        const price = 100 + Math.random() * 20;
        
        // Add trade to history
        tradesRef.current.push({
          time: new Date(),
          indicatorId: randomIndicator,
          type: isBuy ? 'buy' : 'sell',
          price,
          quantity: 1,
          equity: currentEquityRef.current
        });
        
        // Update equity
        if (isBuy) {
          currentEquityRef.current -= price;
        } else {
          currentEquityRef.current += price;
        }
      }
    } catch (error) {
      console.error('Error checking for signals:', error);
    }
  };
  
  const calculateResults = () => {
    const trades = tradesRef.current;
    
    if (!trades.length) {
      setResults([]);
      setMetrics({
        totalTrades: 0,
        winRate: 0,
        averageReturn: 0,
        maxDrawdown: 0,
        profitFactor: 0,
        sharpeRatio: 0
      });
      return;
    }
    
    // Group trades by indicator
    const indicatorPerformance = {};
    
    selectedIndicators.forEach(indicator => {
      indicatorPerformance[indicator] = {
        trades: 0,
        wins: 0,
        losses: 0,
        profitSum: 0,
        lossSum: 0,
        returns: []
      };
    });
    
    // Process trades
    let maxEquity = initialCapitalRef.current;
    let minEquity = initialCapitalRef.current;
    let currentDrawdown = 0;
    let maxDrawdown = 0;
    
    // Simulate trade processing
    trades.forEach((trade, index) => {
      const indicator = trade.indicatorId;
      
      if (!indicatorPerformance[indicator]) return;
      
      indicatorPerformance[indicator].trades++;
      
      // In a real implementation, you would calculate actual profit/loss
      // This is a mock implementation
      const isWin = Math.random() > 0.4; // 60% win rate for demo
      const pnl = isWin ? Math.random() * 100 + 10 : -(Math.random() * 100 + 10);
      
      if (isWin) {
        indicatorPerformance[indicator].wins++;
        indicatorPerformance[indicator].profitSum += pnl;
      } else {
        indicatorPerformance[indicator].losses++;
        indicatorPerformance[indicator].lossSum += Math.abs(pnl);
      }
      
      indicatorPerformance[indicator].returns.push(pnl);
      
      // Track equity and drawdown
      const equity = trade.equity;
      maxEquity = Math.max(maxEquity, equity);
      
      if (equity < maxEquity) {
        currentDrawdown = (maxEquity - equity) / maxEquity * 100;
        maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
      }
    });
    
    // Calculate metrics for each indicator
    const results = Object.keys(indicatorPerformance).map(indicator => {
      const perf = indicatorPerformance[indicator];
      const winRate = perf.trades > 0 ? (perf.wins / perf.trades * 100) : 0;
      const avgReturn = perf.trades > 0 ? perf.returns.reduce((sum, val) => sum + val, 0) / perf.trades : 0;
      const profitFactor = perf.lossSum > 0 ? perf.profitSum / perf.lossSum : perf.profitSum > 0 ? Infinity : 0;
      
      // Calculate Sharpe Ratio
      const returns = perf.returns;
      const meanReturn = returns.length > 0 ? returns.reduce((sum, val) => sum + val, 0) / returns.length : 0;
      const variance = returns.length > 0 ? 
        returns.reduce((sum, val) => sum + Math.pow(val - meanReturn, 2), 0) / returns.length : 0;
      const stdDev = Math.sqrt(variance);
      const sharpeRatio = stdDev > 0 ? meanReturn / stdDev : 0;
      
      return {
        indicator,
        trades: perf.trades,
        winRate: winRate.toFixed(2),
        averageReturn: avgReturn.toFixed(2),
        profitFactor: profitFactor.toFixed(2),
        sharpeRatio: sharpeRatio.toFixed(2)
      };
    });
    
    // Calculate overall metrics
    const totalTrades = trades.length;
    const winningTrades = trades.filter((_, index) => Math.random() > 0.4).length; // Mock win rate
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades * 100) : 0;
    const returns = trades.map((_, index) => 
      Math.random() > 0.4 ? Math.random() * 100 + 10 : -(Math.random() * 100 + 10)
    );
    const averageReturn = returns.length > 0 ? 
      returns.reduce((sum, val) => sum + val, 0) / returns.length : 0;
    const profitSum = returns.filter(r => r > 0).reduce((sum, val) => sum + val, 0);
    const lossSum = Math.abs(returns.filter(r => r < 0).reduce((sum, val) => sum + val, 0));
    const profitFactor = lossSum > 0 ? profitSum / lossSum : profitSum > 0 ? Infinity : 0;
    
    // Calculate Sharpe Ratio
    const meanReturn = returns.length > 0 ? returns.reduce((sum, val) => sum + val, 0) / returns.length : 0;
    const variance = returns.length > 0 ? 
      returns.reduce((sum, val) => sum + Math.pow(val - meanReturn, 2), 0) / returns.length : 0;
    const stdDev = Math.sqrt(variance);
    const sharpeRatio = stdDev > 0 ? meanReturn / stdDev : 0;
    
    setResults(results);
    setMetrics({
      totalTrades,
      winRate: winRate.toFixed(2),
      averageReturn: averageReturn.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(2),
      profitFactor: profitFactor.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2)
    });
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleIndicatorToggle = (indicatorId) => {
    const isSelected = selectedIndicators.includes(indicatorId);
    let newSelectedIndicators;
    
    if (isSelected) {
      newSelectedIndicators = selectedIndicators.filter(id => id !== indicatorId);
    } else {
      newSelectedIndicators = [...selectedIndicators, indicatorId];
    }
    
    setSelectedIndicators(newSelectedIndicators);
  };
  
  const handleStartBacktest = () => {
    if (isBacktesting) {
      endBacktest();
    } else {
      startBacktest();
    }
  };
  
  const handleSpeedChange = (e) => {
    setReplaySpeed(e.target.value);
    
    if (chartInstance && chartInstance.chart) {
      try {
        // Mock implementation - in a real case, you would call the appropriate API
        console.log('Setting replay speed to', e.target.value);
        // chartInstance.chart().setReplaySpeed(e.target.value);
      } catch (error) {
        console.error('Error setting replay speed:', error);
      }
    }
  };
  
  const renderSetupTab = () => {
    return (
      <>
        <ControlsRow>
          <Label>
            Initial Capital:
            <Input 
                  type="number" 
              value={initialCapitalRef.current}
              onChange={(e) => initialCapitalRef.current = parseFloat(e.target.value)} 
                  min="1"
            />
          </Label>
          
          <Label>
            Replay Speed:
            <Select value={replaySpeed} onChange={handleSpeedChange}>
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="normal">1x</option>
              <option value="2">2x</option>
              <option value="4">4x</option>
            </Select>
          </Label>
          
          <Button 
            primary={isBacktesting} 
            onClick={handleStartBacktest}
          >
            {isBacktesting ? 'Stop Backtest' : 'Start Backtest'}
          </Button>
        </ControlsRow>
        
        <div>
          <div style={{ marginBottom: '8px', color: '#a3a6af', fontSize: '14px' }}>Select Indicators to Analyze:</div>
          
          {/* Add your custom indicators here */}
          {/* For example: */}
          {/* <Label key="custom-indicator-1" style={{ marginBottom: '8px' }}>
            <Input 
              type="checkbox" 
              checked={selectedIndicators.includes('custom-indicator-1')}
              onChange={() => handleIndicatorToggle('custom-indicator-1')}
            />
            Custom Indicator 1
          </Label> */}
        </div>
      </>
    );
  };
  
  const renderResultsTab = () => {
    return (
      <>
        <MetricsGrid>
          <MetricCard>
            <MetricTitle>Total Trades</MetricTitle>
            <MetricValue>{metrics.totalTrades}</MetricValue>
          </MetricCard>
          
          <MetricCard>
            <MetricTitle>Win Rate</MetricTitle>
            <MetricValue 
              positive={parseFloat(metrics.winRate) > 50}
              negative={parseFloat(metrics.winRate) < 50}
            >
              {metrics.winRate}%
            </MetricValue>
          </MetricCard>
          
          <MetricCard>
            <MetricTitle>Average Return</MetricTitle>
            <MetricValue 
              positive={parseFloat(metrics.averageReturn) > 0}
              negative={parseFloat(metrics.averageReturn) < 0}
            >
              ${metrics.averageReturn}
            </MetricValue>
          </MetricCard>
          
          <MetricCard>
            <MetricTitle>Max Drawdown</MetricTitle>
            <MetricValue negative={true}>
              {metrics.maxDrawdown}%
            </MetricValue>
          </MetricCard>
          
          <MetricCard>
            <MetricTitle>Profit Factor</MetricTitle>
            <MetricValue 
              positive={parseFloat(metrics.profitFactor) > 1}
              negative={parseFloat(metrics.profitFactor) < 1}
            >
              {metrics.profitFactor}
            </MetricValue>
          </MetricCard>
          
          <MetricCard>
            <MetricTitle>Sharpe Ratio</MetricTitle>
            <MetricValue 
              positive={parseFloat(metrics.sharpeRatio) > 1}
              negative={parseFloat(metrics.sharpeRatio) < 0}
            >
              {metrics.sharpeRatio}
            </MetricValue>
          </MetricCard>
        </MetricsGrid>
        
        <ResultsContainer>
          <ResultsTable>
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Trades</th>
                <th>Win Rate</th>
                <th>Avg Return</th>
                <th>Profit Factor</th>
                <th>Sharpe Ratio</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map(result => (
                  <tr key={result.indicator}>
                    <td>{result.indicator}</td>
                    <td>{result.trades}</td>
                    <td>{result.winRate}%</td>
                    <td>${result.averageReturn}</td>
                    <td>{result.profitFactor}</td>
                    <td>{result.sharpeRatio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#787b86', padding: '20px' }}>
                    {isBacktesting ? 'Collecting data...' : 'No results available. Run a backtest to see indicator performance.'}
                  </td>
                </tr>
              )}
            </tbody>
          </ResultsTable>
        </ResultsContainer>
      </>
    );
  };
  
  return (
    <PanelContainer isCollapsed={isCollapsed}>
      <Header isCollapsed={isCollapsed}>
        <Title>Backtesting {isBacktesting && '(Running...)'}</Title>
        <ToggleButton onClick={toggleCollapse}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </ToggleButton>
      </Header>
      
      <Content isCollapsed={isCollapsed}>
        <TabsContainer>
          <Tab 
            active={activeTab === 'setup'} 
            onClick={() => setActiveTab('setup')}
          >
            Setup
          </Tab>
          <Tab 
            active={activeTab === 'results'} 
            onClick={() => setActiveTab('results')}
          >
            Results
          </Tab>
        </TabsContainer>
        
        {activeTab === 'setup' && renderSetupTab()}
        {activeTab === 'results' && renderResultsTab()}
      </Content>
    </PanelContainer>
  );
};

export default BacktestingPanel; 