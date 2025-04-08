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
 * @param {number} props.sunPosition - Sun position (zodiac degree) to center blue axes on
 * @param {number} props.maxRings - Maximum number of rings to display
 * @param {number} props.cellSize - Size of each cell in pixels
 * @param {boolean} props.highlightSpokes - Whether to highlight cardinal spokes
 */
const GannSquareChart = ({ targetNumber = 81, sunPosition = 71, maxRings = 4, cellSize = 40, highlightSpokes = true }) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [square, setSquare] = useState([]);
  const [dimension, setDimension] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ row: -1, col: -1 });
  const [sunPositionCoords, setSunPositionCoords] = useState({ row: -1, col: -1 });
  const [targetFound, setTargetFound] = useState(true);
  const [sunFound, setSunFound] = useState(true);
  const [keyLevels, setKeyLevels] = useState({
    up: [],
    down: []
  });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  
  // Ensure we have valid sun position
  const validSunPosition = typeof sunPosition === 'number' && !isNaN(sunPosition) ? sunPosition : 71;
  
  // Build the Gann Square data
  useEffect(() => {
    console.log("Building Gann Square with targetNumber:", targetNumber, "and sunPosition:", validSunPosition);
    
    // We need to ensure we have enough rings to find all the key levels
    // Let's add a buffer to maxRings to make sure we can find 3 levels in both directions
    const initialMaxRings = Math.max(Math.ceil(Math.sqrt(targetNumber) / 2) + 3, maxRings);
    
    // Build a Gann Square with the ring-by-ring approach
    function buildGannSquare(target, sun, initialMaxRings) {
      // Ensure sun and target are valid numbers
      target = parseInt(target) || 81;
      sun = parseInt(sun) || 71;
      
      // Start with initial max rings, which may be increased if needed
      let effectiveMaxRings = initialMaxRings;
      
      // Function to build the square with a given number of rings
      function buildSquareWithRings(rings) {
        // Determine dimension based on rings
        const maxRingSize = 2 * rings + 1; // 1 center + rings*2
        const dim = maxRingSize;
        
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
        
        // Track where our target number and sun position are placed
        let targetRow = -1;
        let targetCol = -1;
        let sunRow = -1;
        let sunCol = -1;
        
        if (target === 1) {
          targetRow = row;
          targetCol = col;
        }
        
        if (sun === 1) {
          sunRow = row;
          sunCol = col;
        }
        
        // Keep track of the sequence of positions for traversal
        const positionSequence = [{ row: center, col: center, value: 1 }];
        
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
            
            // Store this position in the sequence
            positionSequence.push({ row, col, value: currentVal });
            
            // Check if this is our target number
            if (currentVal === target) {
              targetRow = row;
              targetCol = col;
            }
            
            // Check if this is our sun position
            if (currentVal === sun) {
              sunRow = row;
              sunCol = col;
            }
            
            currentVal++;
          }
        }
        
        // Keep adding rings until we've placed all numbers up to dim^2
        // or reached maxRings
        while (currentVal <= dim * dim && i <= rings) {
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
          sunPosition: { row: sunRow, col: sunCol },
          positionSequence
        };
      }
      
      // First, build the square with initial rings
      let result = buildSquareWithRings(effectiveMaxRings);
      let { matrix, dimension, targetPosition, sunPosition, positionSequence } = result;
      
      // Check if target and sun are found
      const isTargetFound = targetPosition.row !== -1 && targetPosition.col !== -1;
      const isSunFound = sunPosition.row !== -1 && sunPosition.col !== -1;
      
      // If either the target or sun is not found, we might need more rings
      if (!isTargetFound || !isSunFound) {
        const maxNeeded = Math.max(target, sun);
        const neededRings = Math.ceil(Math.sqrt(maxNeeded) / 2);
        
        if (neededRings > effectiveMaxRings) {
          effectiveMaxRings = neededRings;
          result = buildSquareWithRings(effectiveMaxRings);
          matrix = result.matrix;
          dimension = result.dimension;
          targetPosition = result.targetPosition;
          sunPosition = result.sunPosition;
          positionSequence = result.positionSequence;
        }
      }
      
      // Find up and down levels only if both target and sun are found
      const upLevels = [];
      const downLevels = [];
      
      if (isTargetFound && isSunFound) {
        // Find the index of the target in the position sequence
        const targetIndex = positionSequence.findIndex(
          pos => pos.row === targetPosition.row && pos.col === targetPosition.col
        );
        
        if (targetIndex !== -1) {
          // Function to check if a position is on a blue axis (aligned with sun)
          function isOnBlueAxis(row, col) {
            const sunRow = sunPosition.row;
            const sunCol = sunPosition.col;
            
            // Check if on same row (horizontal)
            if (row === sunRow) return true;
            
            // Check if on same column (vertical)
            if (col === sunCol) return true;
            
            // Check if on diagonal (top-left to bottom-right)
            if (row - sunRow === col - sunCol) return true;
            
            // Check if on diagonal (top-right to bottom-left)
            if (row - sunRow === -(col - sunCol)) return true;
            
            return false;
          }
          
          // Forward traversal for up levels
          let upLevelCount = 0;
          let upIndex = targetIndex + 1;
          
          while (upLevelCount < 3 && upIndex < positionSequence.length) {
            const pos = positionSequence[upIndex];
            
            if (isOnBlueAxis(pos.row, pos.col)) {
              upLevels.push({
                row: pos.row,
                col: pos.col,
                value: pos.value
              });
              upLevelCount++;
            }
            
            upIndex++;
          }
          
          // If we didn't find enough up levels, we might need to extend the spiral
          if (upLevelCount < 3) {
            // Extend the spiral and rebuild
            effectiveMaxRings += 3; // Add more rings
            result = buildSquareWithRings(effectiveMaxRings);
            
            // Update variables with new result
            matrix = result.matrix;
            dimension = result.dimension;
            targetPosition = result.targetPosition;
            sunPosition = result.sunPosition;
            positionSequence = result.positionSequence;
            
            // Find the target index again in the new sequence
            const newTargetIndex = positionSequence.findIndex(
              pos => pos.row === targetPosition.row && pos.col === targetPosition.col
            );
            
            // Clear previously found levels and try again
            upLevels.length = 0;
            upLevelCount = 0;
            upIndex = newTargetIndex + 1;
            
            while (upLevelCount < 3 && upIndex < positionSequence.length) {
              const pos = positionSequence[upIndex];
              
              if (isOnBlueAxis(pos.row, pos.col)) {
                upLevels.push({
                  row: pos.row,
                  col: pos.col,
                  value: pos.value
                });
                upLevelCount++;
              }
              
              upIndex++;
            }
          }
          
          // Backward traversal for down levels
          let downLevelCount = 0;
          let downIndex = targetIndex - 1;
          
          while (downLevelCount < 3 && downIndex >= 0) {
            const pos = positionSequence[downIndex];
            
            if (isOnBlueAxis(pos.row, pos.col)) {
              downLevels.push({
                row: pos.row,
                col: pos.col,
                value: pos.value
              });
              downLevelCount++;
            }
            
            downIndex--;
          }
        }
      }
      
      console.log("Up levels:", upLevels.map(l => l.value));
      console.log("Down levels:", downLevels.map(l => l.value));
      
      return {
        matrix,
        dimension,
        targetPosition,
        sunPosition,
        targetFound: isTargetFound,
        sunFound: isSunFound,
        keyLevels: {
          up: upLevels,
          down: downLevels
        },
        effectiveMaxRings
      };
    }
    
    const { 
      matrix, 
      dimension, 
      targetPosition, 
      sunPosition, 
      targetFound, 
      sunFound, 
      keyLevels,
      effectiveMaxRings 
    } = buildGannSquare(targetNumber, validSunPosition, initialMaxRings);
    
    console.log("Built matrix with dimension:", dimension);
    console.log("Target number position:", targetPosition);
    console.log("Sun position coordinates:", sunPosition);
    console.log("Target found:", targetFound);
    console.log("Sun found:", sunFound);
    console.log("Using effective max rings:", effectiveMaxRings);
    console.log("Key levels:", keyLevels);
    
    setSquare(matrix);
    setDimension(dimension);
    setTargetPosition(targetPosition);
    setSunPositionCoords(sunPosition);
    setTargetFound(targetFound);
    setSunFound(sunFound);
    setKeyLevels(keyLevels);
    
    // Calculate canvas dimensions
    const totalWidth = dimension * cellSize;
    const totalHeight = dimension * cellSize + 60; // Add 60px for legend
    setCanvasWidth(totalWidth);
    setCanvasHeight(totalHeight);
    
    // Reset panning when data changes
    setPanOffset({ x: 0, y: 0 });
    
  }, [targetNumber, validSunPosition, maxRings, cellSize]);

  // Handle mouse events for panning
  const startPan = (e) => {
    setIsPanning(true);
    setStartPanPosition({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });
  };
  
  const doPan = (e) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - startPanPosition.x,
        y: e.clientY - startPanPosition.y
      });
    }
  };
  
  const endPan = () => {
    setIsPanning(false);
  };
  
  // Setup event listeners for panning
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;
    
    container.addEventListener('mousedown', startPan);
    window.addEventListener('mousemove', doPan);
    window.addEventListener('mouseup', endPan);
    
    return () => {
      container.removeEventListener('mousedown', startPan);
      window.removeEventListener('mousemove', doPan);
      window.removeEventListener('mouseup', endPan);
    };
  }, [isPanning, startPanPosition]);

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
    canvas.height = size + 60; // Add space for legend
    
    console.log("Canvas dimensions set to:", canvas.width, "x", canvas.height);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply panning transformation
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    
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
    
    // Find center and sun position coordinates for drawing axes
    const centerX = Math.floor((dimension - 1) / 2) * cellSize + cellSize / 2;
    const centerY = Math.floor((dimension - 1) / 2) * cellSize + cellSize / 2;
    
    const sunX = sunPositionCoords.row >= 0 && sunPositionCoords.col >= 0 ? 
                 sunPositionCoords.col * cellSize + cellSize / 2 : 
                 centerX;
                 
    const sunY = sunPositionCoords.row >= 0 && sunPositionCoords.col >= 0 ? 
                 sunPositionCoords.row * cellSize + cellSize / 2 : 
                 centerY;
    
    // Draw the original spokes if enabled (lighter shade now)
    if (highlightSpokes) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.15)'; // Very light red
      ctx.lineWidth = 1.5;
      
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
      
      // Draw the blue spokes through sun position if found
      if (sunPositionCoords.row >= 0 && sunPositionCoords.col >= 0) {
        ctx.strokeStyle = 'rgba(0, 100, 255, 0.5)'; // Medium blue
        ctx.lineWidth = 2;
        
        // Horizontal through sun
        ctx.beginPath();
        ctx.moveTo(0, sunY);
        ctx.lineTo(size, sunY);
        ctx.stroke();
        
        // Vertical through sun
        ctx.beginPath();
        ctx.moveTo(sunX, 0);
        ctx.lineTo(sunX, size);
        ctx.stroke();
        
        // Diagonal 1 (top-left to bottom-right) through sun
        const diag1Slope = 1; // Slope is 1 for 45-degree line
        const diag1Intercept = sunY - diag1Slope * sunX;
        
        ctx.beginPath();
        ctx.moveTo(0, diag1Intercept);
        ctx.lineTo(size, diag1Slope * size + diag1Intercept);
        ctx.stroke();
        
        // Diagonal 2 (top-right to bottom-left) through sun
        const diag2Slope = -1; // Slope is -1 for 135-degree line
        const diag2Intercept = sunY - diag2Slope * sunX;
        
        ctx.beginPath();
        ctx.moveTo(0, diag2Slope * 0 + diag2Intercept);
        ctx.lineTo(size, diag2Slope * size + diag2Intercept);
        ctx.stroke();
      }
    }
    
    // Fill in numbers
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Collect cells to highlight
    const upKeyLevelCells = keyLevels.up.map(level => ({ row: level.row, col: level.col }));
    const downKeyLevelCells = keyLevels.down.map(level => ({ row: level.row, col: level.col }));
    
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        const value = square[row][col];
        if (value !== null) {
          // Center of cell
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          
          // Highlight cells on original spokes (very light)
          if (highlightSpokes) {
            const centerRow = Math.floor((dimension - 1) / 2);
            const centerCol = Math.floor((dimension - 1) / 2);
            
            // Check if on a cardinal spoke
            const isOnVertical = col === centerCol;
            const isOnHorizontal = row === centerRow;
            const isOnDiagonal1 = row - centerRow === col - centerCol; // top-left to bottom-right
            const isOnDiagonal2 = row - centerRow === -(col - centerCol); // top-right to bottom-left
            
            if (isOnVertical || isOnHorizontal || isOnDiagonal1 || isOnDiagonal2) {
              ctx.fillStyle = 'rgba(255, 220, 220, 0.25)'; // Very light red background
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
          
          // Highlight Sun position
          if (row === sunPositionCoords.row && col === sunPositionCoords.col) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.6)'; // Gold for sun
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            
            // Draw sun symbol
            ctx.beginPath();
            ctx.arc(x, y, cellSize * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw sun rays
            const rayLength = cellSize * 0.15;
            for (let angle = 0; angle < 360; angle += 45) {
              const radian = angle * Math.PI / 180;
              const startX = x + Math.cos(radian) * cellSize * 0.3;
              const startY = y + Math.sin(radian) * cellSize * 0.3;
              const endX = x + Math.cos(radian) * (cellSize * 0.3 + rayLength);
              const endY = y + Math.sin(radian) * (cellSize * 0.3 + rayLength);
              
              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
              ctx.stroke();
            }
            
            ctx.fillStyle = '#333'; // reset text color
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
          
          // Highlight up key levels (next three after target)
          const isUpKeyLevel = upKeyLevelCells.some(cell => cell.row === row && cell.col === col);
          if (isUpKeyLevel) {
            ctx.fillStyle = 'rgba(0, 200, 0, 0.4)'; // Green for up levels
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#333';
            
            // Draw a border around the up level
            ctx.strokeStyle = 'rgba(0, 200, 0, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
          
          // Highlight down key levels (previous three before target)
          const isDownKeyLevel = downKeyLevelCells.some(cell => cell.row === row && cell.col === col);
          if (isDownKeyLevel) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'; // Red for down levels
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = '#333';
            
            // Draw a border around the down level
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
          
          // Draw the number
          ctx.font = `${Math.max(12, cellSize * 0.4)}px Arial`;
          ctx.fillText(value.toString(), x, y);
        }
      }
    }
    
    // Restore the canvas context (removes panning transformation before drawing legend)
    ctx.restore();
    
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
    
    // Sun position
    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.fillRect(380, size + 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText(`Sun Position (${validSunPosition})`, 400, size + 20);
    
    // Target number
    ctx.fillStyle = 'rgba(255, 165, 0, 0.6)';
    ctx.fillRect(550, size + 10, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText(`Target Number (${targetNumber})`, 570, size + 20);
    
    // Key levels
    // Up levels
    ctx.fillStyle = 'rgba(0, 200, 0, 0.4)';
    ctx.fillRect(80, size + 35, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('Up Levels', 100, size + 45);
    
    // Down levels
    ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.fillRect(180, size + 35, 15, 15);
    ctx.fillStyle = '#333';
    ctx.fillText('Down Levels', 200, size + 45);
    
    // Red spokes
    if (highlightSpokes) {
      ctx.fillStyle = 'rgba(255, 220, 220, 0.25)';
      ctx.fillRect(330, size + 35, 15, 15);
      ctx.fillStyle = '#333';
      ctx.fillText('Original Axes (Center)', 350, size + 45);
      
      // Blue spokes
      ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';
      ctx.fillRect(500, size + 35, 15, 15);
      ctx.fillStyle = '#333';
      ctx.fillText('Sun Axes', 520, size + 45);
    }
    
    console.log("Canvas drawing complete");
    
  }, [square, dimension, cellSize, highlightSpokes, targetPosition, targetNumber, sunPositionCoords, validSunPosition, keyLevels, panOffset]);
  
  // Format key levels for display
  const upLevelsDisplay = keyLevels.up.map(level => level.value).join(', ');
  const downLevelsDisplay = keyLevels.down.map(level => level.value).join(', ');
  
  return (
    <div className="gann-square-container">
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
          Consider increasing target number to see it.
        </div>
      )}
      {!sunFound && (
        <div className="warning-message" style={{ 
          color: '#d9534f', 
          background: '#f9f2f2', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px',
          border: '1px solid #d9534f'
        }}>
          Sun position {validSunPosition} may not be visible with current max rings setting.
        </div>
      )}
      
      {/* Display key levels at the top */}
      <div className="key-levels-summary" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '10px', 
        background: '#f8f9fa', 
        borderRadius: '4px',
        marginBottom: '15px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div>
          <span style={{ fontWeight: 'bold', color: '#28a745', marginRight: '8px' }}>Up Levels:</span>
          <span>{upLevelsDisplay || 'None found'}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: '#dc3545', marginRight: '8px' }}>Down Levels:</span>
          <span>{downLevelsDisplay || 'None found'}</span>
        </div>
      </div>
      
      <div 
        ref={canvasContainerRef}
        style={{ 
          width: '90%', 
          margin: '0 auto', 
          overflow: 'hidden',
          position: 'relative',
          cursor: isPanning ? 'grabbing' : 'grab'
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ 
            border: '1px solid #ccc',
            display: 'block',
            background: '#fff'
          }}
        />
      </div>
      
      <div className="chart-info" style={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        fontSize: '14px', 
        color: '#666' 
      }}>
        Drag to pan the chart
      </div>
    </div>
  );
};

export default GannSquareChart; 