"""
Levels Calculator Utility

This module provides functions to calculate Gann trading levels
and monitor price breaches.
"""

import logging
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
import time

from .ephemeris import get_current_sun_angle, calculate_sun_position, calculate_moon_position
from .market_data import get_current_price, get_prices_for_tickers, get_price_on_date
from .gann_square import calculate_gann_levels

# Import firestore but don't require it to work
try:
    from .firestore import save_gann_levels, get_gann_levels, save_ticker
    firestore_available = True
except Exception as e:
    logging.warning(f"Firestore not available: {str(e)}")
    firestore_available = False

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def calculate_levels_for_ticker(
    ticker: str,
    num_levels: int = 5,
    date: Optional[str] = None,
    when=None,
) -> Optional[Dict[str, Any]]:
    """
    Calculate Gann Square of 9 levels for a ticker.

    Args:
        ticker: The ticker symbol
        num_levels: Number of levels to calculate in each direction
        date: Optional date string (YYYY-MM-DD). If provided, uses that date's
              closing price and the sun's position on that date instead of
              the live price and current sun position.
        when: Optional timezone-aware datetime instant. Takes precedence over
              `date` when both are given. Used for both the historical price
              lookup and the celestial position calculation, so they describe
              the same moment.

    Returns:
        dict: Dictionary with calculated levels and metadata
    """
    logger.info(f"Starting calculate_levels_for_ticker for {ticker}, date={date}")
    try:
        # `when` is a timezone-aware instant and takes precedence over `date`.
        # `date` remains supported and means 16:00 on that day - the closing
        # bell, matching the closing price returned for that date.
        target_date = None
        if when is not None:
            target_date = when
        elif date:
            try:
                target_date = datetime.strptime(date, "%Y-%m-%d")
            except ValueError:
                logger.error(f"Invalid date format: {date}, expected YYYY-MM-DD")
                return None

        # Get the price - historical for a given date, or live otherwise
        if target_date is not None:
            logger.info(f"Getting price for {ticker} on {date}")
            price = get_price_on_date(ticker, target_date)
        else:
            logger.info(f"Getting current price for {ticker}")
            price = get_current_price(ticker)
        logger.info(f"Retrieved price for {ticker}: {price}")

        if price is None:
            logger.error(f"Failed to get price for {ticker}")
            return None

        # Get the celestial positions - for the given instant, or current
        logger.info(f"Calculating celestial positions")
        try:
            sun_position = calculate_sun_position(target_date)
            moon_position = calculate_moon_position(target_date)
            sun_angle = sun_position["angle"]
            logger.info(
                f"Positions calculated: sun={sun_angle}, moon={moon_position['angle']}"
            )
        except Exception as e:
            logger.error(f"Error calculating celestial positions: {str(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
        
        # Calculate the Gann levels
        logger.info(f"Calculating Gann levels for price={price}, sun_angle={sun_angle}")
        try:
            levels = calculate_gann_levels(price, sun_angle, num_levels)
            logger.info(f"Gann levels calculated: {levels}")
        except Exception as e:
            logger.error(f"Error calculating Gann levels: {str(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
        
        # Create the result dictionary
        result = {
            "symbol": ticker,
            "price": price,
            "price_date": target_date.strftime("%Y-%m-%d") if target_date else None,
            "sun_angle": sun_angle,
            "sun_position": sun_position,
            "moon_position": moon_position,
            "up_levels": levels["up_levels"],
            "down_levels": levels["down_levels"],
            "timestamp": datetime.now().isoformat(),
            "calculation_time": datetime.now().isoformat()
        }
        
        # Skip Firestore operations for testing
        # save_gann_levels(...)
        # save_ticker(...)
        
        logger.info(f"Completed calculate_levels_for_ticker for {ticker}")
        return result
    
    except Exception as e:
        logger.error(f"Error calculating levels for {ticker}: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return None


def calculate_levels_for_tickers(tickers: List[str], num_levels: int = 5) -> Dict[str, Any]:
    """
    Calculate Gann Square of 9 levels for multiple tickers.
    
    Args:
        tickers: List of ticker symbols
        num_levels: Number of levels to calculate in each direction
        
    Returns:
        dict: Dictionary mapping ticker symbols to their calculated levels
    """
    results = {}
    
    for ticker in tickers:
        # Add a larger delay to avoid hitting rate limits
        time.sleep(3)
        
        levels = calculate_levels_for_ticker(ticker, num_levels)
        results[ticker] = levels
    
    return results


def check_price_breaches(ticker: str, current_price: Optional[float] = None) -> Dict[str, Any]:
    """
    Check if the current price has breached any of the calculated levels.
    
    Args:
        ticker: The ticker symbol
        current_price: The current price (optional, fetched if not provided)
        
    Returns:
        dict: Dictionary containing breach information
    """
    # Get the current price if not provided
    if current_price is None:
        current_price = get_current_price(ticker)
        
    if current_price is None:
        logger.error(f"Failed to get price for {ticker}")
        return {
            "symbol": ticker,
            "breached_up": False,
            "breached_down": False,
            "breached_levels": [],
            "error": "Failed to get current price"
        }
    
    # Try to get stored Gann levels, or calculate new ones if not available
    levels_data = None
    if firestore_available:
        try:
            levels_data = get_gann_levels(ticker)
        except Exception:
            logger.warning(f"Failed to get levels from Firestore for {ticker}")
    
    if levels_data is None:
        logger.info(f"No stored levels found for {ticker}, calculating new ones")
        levels_data = calculate_levels_for_ticker(ticker)
        if levels_data is None:
            return {
                "symbol": ticker,
                "breached_up": False,
                "breached_down": False,
                "breached_levels": [],
                "error": "Failed to calculate levels"
            }
    
    # Extract the levels and the previous price
    up_levels = levels_data.get("up_levels", [])
    down_levels = levels_data.get("down_levels", [])
    previous_price = levels_data.get("price")
    
    if previous_price is None:
        logger.warning(f"No previous price found for {ticker}")
        return {
            "symbol": ticker,
            "breached_up": False,
            "breached_down": False,
            "breached_levels": [],
            "error": "No previous price found"
        }
    
    # Check for breaches
    breached_up = False
    breached_down = False
    breached_levels = []
    
    # Check if price breached any up levels
    for level in up_levels:
        if level is not None and previous_price < level <= current_price:
            breached_up = True
            breached_levels.append({"level": level, "direction": "up"})
    
    # Check if price breached any down levels
    for level in down_levels:
        if level is not None and previous_price > level >= current_price:
            breached_down = True
            breached_levels.append({"level": level, "direction": "down"})
    
    # Recalculate levels if there was a breach
    if breached_up or breached_down:
        logger.info(f"Price breach detected for {ticker}")
        # Recalculate the levels with the new price
        calculate_levels_for_ticker(ticker)
    
    return {
        "symbol": ticker,
        "current_price": current_price,
        "previous_price": previous_price,
        "breached_up": breached_up,
        "breached_down": breached_down,
        "breached_levels": breached_levels
    }


def check_price_breaches_for_tickers(tickers: List[str]) -> Dict[str, Any]:
    """
    Check price breaches for multiple tickers.
    
    Args:
        tickers: List of ticker symbols
        
    Returns:
        dict: Dictionary mapping ticker symbols to their breach information
    """
    # Get current prices for all tickers
    prices = get_prices_for_tickers(tickers)
    
    results = {}
    
    for ticker in tickers:
        current_price = prices.get(ticker)
        results[ticker] = check_price_breaches(ticker, current_price)
    
    return results 