import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GannSquareChart from '../components/GannSquareChart';
import { useAppContext } from '../contexts/AppContext';

const GannChartTest = () => {
  const { sunPosition } = useAppContext();
  const [inputNumber, setInputNumber] = useState(81);
  const [multiplyBy10, setMultiplyBy10] = useState(true);
  const [targetNumber, setTargetNumber] = useState(81);
  const [maxRings, setMaxRings] = useState(4);
  const [cellSize, setCellSize] = useState(40);
  const [highlightSpokes, setHighlightSpokes] = useState(true);

  // Get the sun degree in 0-360 format
  const getSunDegree = () => {
    if (!sunPosition) return 71; // Default value if sunPosition is not available
    
    // Extract zodiac sign and degrees
    const zodiacSigns = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 
      'Leo', 'Virgo', 'Libra', 'Scorpio', 
      'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    
    const zodiacIndex = zodiacSigns.indexOf(sunPosition.zodiac_sign);
    if (zodiacIndex === -1) return 71; // Default if sign not found
    
    // Calculate absolute position (0-360)
    const absoluteDegree = (zodiacIndex * 30) + (sunPosition.degrees_in_sign || 0);
    return Math.round(absoluteDegree);
  };

  // Calculate the target number based on input number and multiplier checkbox
  useEffect(() => {
    // Apply modulus operation if > 360
    const modulusResult = inputNumber > 360 ? inputNumber % 360 : inputNumber;
    
    // Apply multiplication if checkbox is selected
    const finalTarget = multiplyBy10 ? modulusResult * 10 : modulusResult;
    
    setTargetNumber(finalTarget);
    
    // Auto-adjust max rings based on target number
    const requiredRings = Math.ceil(Math.sqrt(finalTarget) / 2);
    setMaxRings(Math.max(requiredRings, 1));
  }, [inputNumber, multiplyBy10]);

  return (
    <Layout title="Gann Chart Test">
      <div className="container">
        <h1>Gann Square of 9 Chart Test</h1>
        
        <div className="controls">
          <div className="form-group">
            <label>Input Number:</label>
            <input 
              type="number" 
              value={inputNumber} 
              onChange={(e) => setInputNumber(parseInt(e.target.value) || 1)} 
              min="1" 
            />
          </div>
          
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                checked={multiplyBy10} 
                onChange={(e) => setMultiplyBy10(e.target.checked)} 
              />
              Multiply by 10
            </label>
          </div>
          
          <div className="form-group target-display">
            <label>Target Number:</label>
            <span className="target-value">{targetNumber}</span>
          </div>
          
          <div className="form-group">
            <label>Cell Size (px):</label>
            <input 
              type="number" 
              value={cellSize} 
              onChange={(e) => setCellSize(parseInt(e.target.value) || 20)} 
              min="20" 
              max="80" 
            />
          </div>
          
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                checked={highlightSpokes} 
                onChange={(e) => setHighlightSpokes(e.target.checked)} 
              />
              Highlight Spokes
            </label>
          </div>
        </div>
        
        <div className="chart-container">
          <GannSquareChart 
            targetNumber={targetNumber}
            sunPosition={getSunDegree()}
            maxRings={maxRings}
            cellSize={cellSize}
            highlightSpokes={highlightSpokes}
          />
        </div>
        
        <style jsx>{`
          .container {
            padding: 20px;
          }
          .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
          }
          .form-group {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .target-display {
            border-left: 1px solid #ccc;
            padding-left: 15px;
            font-weight: bold;
          }
          .target-value {
            background: #e0e0e0;
            padding: 4px 10px;
            border-radius: 4px;
            min-width: 50px;
            text-align: center;
          }
          .chart-container {
            margin-top: 20px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default GannChartTest; 