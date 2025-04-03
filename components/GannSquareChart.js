import React, { useRef, useEffect, useState } from 'react';

/**
 * GannSquareChart Component
 * 
 * Renders a visual representation of the Gann Square of 9 chart for a given ticker.
 * Shows the square/spiral pattern, sun position, and highlights relevant levels.
 * Highlights the target number with a special color.
 * 
 * @param {Object} props - Component props
 * @param {number} props.targetNumber - Target number to highlight on the chart
 * @param {number} props.maxRings - Maximum number of rings to display
 * @param {number} props.cellSize - Size of each cell in pixels
 * @param {boolean} props.highlightSpokes - Whether to highlight cardinal spokes
 */
const GannSquareChart = ({ targetNumber = 81, maxRings = 4, cellSize = 40, highlightSpokes = true }) => {
  const canvasRef = useRef(null);
  const [square, setSquare] = useState([]);
  const [dimension, setDimension] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ row: -1, col: -1 });
  const [targetFound, setTargetFound] = useState(true);
  
  // Build the Gann Square data
  useEffect(() => {
    console.log("Building Gann Square with targetNumber:", targetNumber);
    // Build a Gann Square with the ring-by-ring approach
    function buildGannSquare(target) {
      // Determine dimension: smallest odd integer with dim^2 >= target
      // But limit by maxRings to prevent excessive generation
      const maxRingSize = 2 * maxRings + 1; // 1 center + maxRings*2
      let dim = Math.ceil(Math.sqrt(target));
      if (dim % 2 === 0) dim++;
      
      // Cap the dimension based on maxRings
      dim = Math.min(dim, maxRingSize);
      console.log("Calculated dimension:", dim);
      
      // Check if target might be outside our current square size
      const isTargetPossiblyOutside = target > dim * dim;
      
      // Create an empty 2D array (dim x dim)
      const matrix = Array.from({ length: dim }, () => Array(dim).fill(null));
      
      // The center coordinates
      const center = Math.floor((dim - 1) / 2);
      let row = center;
      let col = center;
      
      // Place '1' in the center
      matrix[row][col] = 1;
      
      // Current value to place
      let currentVal = 2;
      let i = 1; // Ring counter
      
      // Track where our target number is placed
      let targetRow = -1;
      let targetCol = -1;
      if (target === 1) {
        targetRow = row;
        targetCol = col;
      }
      
      // Helper function to move 'steps' in a direction, filling matrix with values
      function moveSteps(direction, steps) {
        for (let s = 0; s < steps; s++) {
          if (currentVal > dim * dim) break;
          
          switch (direction) {
            case 'left':  col--; break;
            case 'up':    row--; break;
            case 'right': col++; break;
            case 'down':  row++; break;
          }
          
          matrix[row][col] = currentVal;
          
          // Check if this is our target number
          if (currentVal === target) {
            targetRow = row;
            targetCol = col;
          }
          
          currentVal++;
        }
      }
      
      // Keep adding rings until we've placed all numbers up to dim^2
      // or reached maxRings
      while (currentVal <= dim * dim && i <= maxRings) {
        // For ring i, do:
        //  1 step left
        moveSteps('left', 1);
        if (currentVal > dim * dim) break;
        
        //  (2i - 1) steps up
        moveSteps('up', 2*i - 1);
        if (currentVal > dim * dim) break;
        
        //  (2i) steps right
        moveSteps('right', 2*i);
        if (currentVal > dim * dim) break;
        
        //  (2i) steps down
        moveSteps('down', 2*i);
        if (currentVal > dim * dim) break;
        
        //  (2i) steps left
        moveSteps('left', 2*i);
        if (currentVal > dim * dim) break;
        
        i++;
      }
      
      return { 
        matrix, 
        dimension: dim, 
        targetPosition: { row: targetRow, col: targetCol },
        targetFound: !isTargetPossiblyOutside || (targetRow !== -1 && targetCol !== -1)
      };
    }
    
    const { matrix, dimension, targetPosition, targetFound } = buildGannSquare(targetNumber);
    console.log("Built matrix with dimension:", dimension);
    console.log("Target number position:", targetPosition);
    console.log("Target found:", targetFound);
    setSquare(matrix);
    setDimension(dimension);
    setTargetPosition(targetPosition);
    setTargetFound(targetFound);
    
    // Calculate canvas dimensions
    const totalWidth = dimension * cellSize;
    const totalHeight = dimension * cellSize + 40; // Add 40px for legend
    setCanvasWidth(totalWidth);
    setCanvasHeight(totalHeight);
    
  }, [targetNumber, maxRings, cellSize]);

  // Draw the Gann Square on canvas
  useEffect(() => {
    if (!canvasRef.current || square.length === 0) {
      console.log("Canvas ref not available or square is empty");
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }
    
    // Set canvas size
    const size = dimension * cellSize;
    canvas.width = size;
    canvas.height = size + 40; // Add space for legend
    
    console.log("Canvas dimensions set to:", canvas.width, "x", canvas.height);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    
    // Draw horizontal lines
    for (let i = 0; i <= dimension; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }
    
    // Draw vertical lines
    for (let i = 0; i <= dimension; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();
    }
    
    // Draw the original spokes if enabled
    if (highlightSpokes) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      
      // Find center coordinates
      const centerX = Math.floor((dimension - 1) / 2) * cellSize + cellSize / 2;
      const centerY = Math.floor((dimension - 1) / 2) * cellSize + cellSize / 2;
      
      // Draw the 8 cardinal spokes
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(size, centerY);
      ctx.stroke();
      
      // Vertical
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, size);
      ctx.stroke();
      
      // Diagonal 1 (top-left to bottom-right)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size);
      ctx.stroke();
      
      // Diagonal 2 (top-right to bottom-left)
      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.lineTo(0, size);
      ctx.stroke();
      
      // 45° spokes
      // Top-left to center
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(centerX, 0);
      ctx.stroke();
      
      // Top-right to center
      ctx.beginPath();
      ctx.moveTo(size, centerY);
      ctx.lineTo(centerX, 0);
      ctx.stroke();
      
      // Bottom-left to center
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(centerX, size);
      ctx.stroke();
      
      // Bottom-right to center
      ctx.beginPath();
      ctx.moveTo(size, centerY);
      ctx.lineTo(centerX, size);
      ctx.stroke();
    }
    
    // Fill in numbers
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        const value = square[row][col];
        if (value !== null) {
          // Center of cell
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          
          // Highlight cells on original spokes
          if (highlightSpokes) {
            const centerRow = Math.floor((dimension - 1) / 2);
            const centerCol = Math.floor((dimension - 1) / 2);
            
            // Check if on a cardinal spoke
            const isOnVertical = col === centerCol;
            const isOnHorizontal = row === centerRow;
            const isOnDiagonal1 = row - centerRow === col - centerCol; // top-left to bottom-right
            const isOnDiagonal2 = row - centerRow === -(col - centerCol); // top-right to bottom-left
            
            if (isOnVertical || isOnHorizontal || isOnDiagonal1 || isOnDiagonal2) {
              ctx.fillStyle = 'rgba(255, 220, 220, 0.5)'; // light red background for cells on spokes
              ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
              ctx.fillStyle = '#333'; // reset text color
            }
          }
          
          // Highlight 1 (center)
          if (value === 1) {
            ctx.fillStyle = 'rgba(100, 200, 100, 0.5)';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#333';
          }
          
          // Highlight the bottom-left corners (9, 25, 49, etc.)
          const isPerfectSquare = Math.sqrt(value) % 1 === 0;
          const isOddSquare = isPerfectSquare && Math.sqrt(value) % 2 === 1;
          
          if (isOddSquare) {
            ctx.fillStyle = 'rgba(100, 100, 200, 0.5)';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#333';
          }
          
          // Highlight target number
          if (row === targetPosition.row && col === targetPosition.col) {
            ctx.fillStyle = 'rgba(255, 165, 0, 0.6)'; // orange for target number
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#333';
            
            // Draw a border around the target number
            ctx.strokeStyle = 'rgba(255, 165, 0, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
          
          // Draw the number
          ctx.font = `${Math.max(12, cellSize * 0.4)}px Arial`;
          ctx.fillText(value.toString(), x, y);
        }
      }
    }
    
    // Add a legend
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Legend:', 10, size + 20);
    
    // Center square
    ctx.fillStyle = 'rgba(100, 200, 100, 0.5)';
    ctx.fillRect(80, size + 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('Center (1)', 100, size + 20);
    
    // Odd square corners
    ctx.fillStyle = 'rgba(100, 100, 200, 0.5)';
    ctx.fillRect(180, size + 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('Odd squares (9, 25, 49...)', 200, size + 20);
    
    // Target number
    ctx.fillStyle = 'rgba(255, 165, 0, 0.6)';
    ctx.fillRect(380, size + 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText(`Target Number (${targetNumber})`, 400, size + 20);
    
    // Spoke cells
    if (highlightSpokes) {
      ctx.fillStyle = 'rgba(255, 220, 220, 0.5)';
      ctx.fillRect(550, size + 10, 15, 15);
      ctx.fillStyle = '#333';
      ctx.fillText('Cardinal spokes', 570, size + 20);
    }
    
    console.log("Canvas drawing complete");
    
  }, [square, dimension, cellSize, highlightSpokes, targetPosition, targetNumber]);
  
  return (
    <div className="gann-square-container">
      <h3>Gann Square of 9</h3>
      {!targetFound && (
        <div className="warning-message" style={{ 
          color: '#d9534f', 
          background: '#f9f2f2', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px',
          border: '1px solid #d9534f'
        }}>
          Target number {targetNumber} may not be visible with current max rings setting. 
          Consider increasing max rings to see it.
        </div>
      )}
      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ 
            margin: '10px', 
            border: '1px solid #ccc',
            display: 'block',
            background: '#fff'
          }}
        />
      </div>
      
      <div className="chart-legend" style={{ padding: '10px', marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '15px', height: '15px', backgroundColor: 'rgba(255, 165, 0, 0.6)', borderRadius: '3px', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Target Number ({targetNumber})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '15px', height: '15px', backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Current Price</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '15px', height: '15px', backgroundColor: 'red', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Up Levels</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '15px', height: '15px', backgroundColor: 'blue', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Down Levels</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GannSquareChart; 