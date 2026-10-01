"""
Which bar timeframe actually fits an instrument's Gann level spacing?

A Gann sub-level's width is fixed by the ring the price sits in, so it is a
property of the instrument's price, not of its volatility. What varies is how
far price travels per bar. The two have to be comparable for level
interactions to mean anything:

  - bar range much smaller than a sub-level -> price rarely reaches a level,
    so most bars carry no information
  - bar range much larger -> a single bar jumps many levels at once and you
    cannot attribute a reaction to any one of them

So the useful timeframe is the one where average bar range is roughly one
sub-level. This script measures that ratio directly.

Usage:
    python scripts/level_spacing_fit.py [TICKER ...]
"""

import math
import sys
import warnings

import yfinance as yf

warnings.filterwarnings("ignore")

# (yfinance interval, period) - intraday history is capped by the provider.
TIMEFRAMES = [
    ("5m", "1mo"),
    ("15m", "1mo"),
    ("1h", "3mo"),
    ("1d", "2y"),
]

DEFAULT_TICKERS = ["AAPL", "SPY", "NVDA", "TSLA", "F"]

# How close to 1.0 the ratio must be to count as a good fit.
GOOD_FIT_LOW = 0.5
GOOD_FIT_HIGH = 2.0


def ring_of(square):
    """Value ring: the band between consecutive odd squares. Width is 8k."""
    return max(1, math.floor((math.sqrt(square) + 1) / 2))


def sub_level_spacing(price, scale):
    """Price distance between adjacent Gann sub-levels at this price."""
    square = round(price * scale)
    if square < 1:
        return None
    ring = ring_of(square)
    return (ring / 8) / scale


def average_range(bars):
    """Mean high-low range of the bars, in price units."""
    spans = (bars["High"] - bars["Low"]).dropna()
    return float(spans.mean()) if len(spans) else None


def analyse(ticker):
    print(f"\n{'=' * 74}\n{ticker}\n{'=' * 74}")

    try:
        daily = yf.Ticker(ticker).history(period="5d", interval="1d")
    except Exception as exc:
        print(f"  could not fetch: {exc}")
        return
    if daily.empty:
        print("  no data")
        return

    price = float(daily["Close"].iloc[-1])

    for scale in (10, 1):
        spacing = sub_level_spacing(price, scale)
        if spacing is None:
            continue
        print(f"\n  price ${price:,.2f}   scale x{scale}   "
              f"sub-level spacing ${spacing:,.4f}")
        print(f"  {'timeframe':<12}{'avg bar range':>16}{'ratio':>10}   fit")

        for interval, period in TIMEFRAMES:
            try:
                bars = yf.Ticker(ticker).history(period=period, interval=interval)
            except Exception:
                continue
            if bars.empty:
                print(f"  {interval:<12}{'no data':>16}")
                continue

            rng = average_range(bars)
            if not rng:
                continue
            ratio = rng / spacing
            if GOOD_FIT_LOW <= ratio <= GOOD_FIT_HIGH:
                verdict = "<-- good fit"
            elif ratio < GOOD_FIT_LOW:
                verdict = "too fine (levels rarely reached)"
            else:
                verdict = "too coarse (jumps many levels/bar)"
            print(f"  {interval:<12}${rng:>14,.4f}{ratio:>10.2f}   {verdict}")


if __name__ == "__main__":
    tickers = sys.argv[1:] or DEFAULT_TICKERS
    for symbol in tickers:
        analyse(symbol)
    print()
