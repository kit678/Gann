# Future Features

This file tracks potential features and improvements for the GannTV project.

## Pivot Point Visualization Enhancements

*   **Connect Pivots with Angle Lines:** Draw lines connecting consecutive pivot highs and lows (high -> low -> high, etc.).
    *   The line should preferably be a type that can display the angle relative to the time axis (e.g., similar to the Trend Angle drawing tool).
    *   This will likely require storing the previous pivot point's details (time, price, type) and using `chart.createMultipointShape()` when the next, opposite-type pivot is confirmed.
    *   Need to manage the lifecycle of these drawn lines (creation, potential updates, removal).