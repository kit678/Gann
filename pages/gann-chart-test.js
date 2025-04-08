import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GannSquareChart from '../components/GannSquareChart';
import { useAppContext } from '../contexts/AppContext';

const GannChartTest = () => {
  const { sunInfo } = useAppContext();
  const [inputNumber, setInputNumber] = useState('81');
  const [multiplyBy10, setMultiplyBy10] = useState(true);
  const [targetNumber, setTargetNumber] = useState(81);
  const [cellSize, setCellSize] = useState(40);
  const [highlightSpokes, setHighlightSpokes] = useState(true);
  
  // Function to get sun degree based on zodiac sign and degrees
  const getSunDegree = () => {
    if (!sunInfo || !sunInfo.sign || !sunInfo.degreesInSign) {
      return 71; // Default value if sun info not available
    }
    
    // Convert zodiac sign to base degrees (0-330, in 30-degree increments)
    const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    const signIndex = zodiacSigns.indexOf(sunInfo.sign);
    if (signIndex === -1) return 71; // Default if sign not found
    
    const baseDegree = signIndex * 30;
    const totalDegree = baseDegree + parseFloat(sunInfo.degreesInSign);
    
    return Math.round(totalDegree);
  };
  
  // Effect to handle changes to input number and multiply option
  useEffect(() => {
    // Parse the input - allow it to be empty string during editing
    const parsedInput = inputNumber === '' ? 0 : parseInt(inputNumber) || 0;
    
    // Calculate effective target based on checkbox
    const effectiveTarget = multiplyBy10 ? parsedInput * 10 : parsedInput;
    setTargetNumber(effectiveTarget);
    
  }, [inputNumber, multiplyBy10]);
  
  const handleInputChange = (e) => {
    // Store input as string to allow for empty field
    setInputNumber(e.target.value);
  };
  
  return (
    <Layout>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3 mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <label htmlFor="inputNumber" className="form-label me-2 mb-0">Input Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNumber"
                    value={inputNumber}
                    onChange={handleInputChange}
                    style={{ maxWidth: '100px' }}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="multiplyBy10"
                    checked={multiplyBy10}
                    onChange={(e) => setMultiplyBy10(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="multiplyBy10">
                    Multiply by 10
                  </label>
                </div>
              </div>
              <div className="col-md-2 mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <label htmlFor="cellSize" className="form-label me-2 mb-0">Cell Size:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cellSize"
                    value={cellSize}
                    onChange={(e) => setCellSize(parseInt(e.target.value) || 20)}
                    min="20"
                    max="80"
                    style={{ maxWidth: '80px' }}
                  />
                </div>
              </div>
              <div className="col-md-2 mb-3 mb-md-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="highlightSpokes"
                    checked={highlightSpokes}
                    onChange={(e) => setHighlightSpokes(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="highlightSpokes">
                    Highlight Spokes
                  </label>
                </div>
              </div>
              <div className="col-md-2">
                <div className="d-flex align-items-center">
                  <strong className="me-2">Target:</strong>
                  <span className="badge bg-primary">{targetNumber}</span>
                </div>
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <strong className="me-2">Sun Position:</strong>
                  <span className="badge bg-warning text-dark">{getSunDegree()}°</span>
                  <span className="ms-2 text-muted">
                    ({sunInfo?.sign || 'N/A'} {sunInfo?.degreesInSign || '0'}°)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GannSquareChart 
          targetNumber={targetNumber} 
          sunPosition={getSunDegree()} 
          cellSize={cellSize}
          highlightSpokes={highlightSpokes}
        />
      </div>
    </Layout>
  );
};

export default GannChartTest; 