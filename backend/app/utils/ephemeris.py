"""
Ephemeris Utility

This module provides functions to calculate the position of the sun
and other celestial bodies using the Swiss Ephemeris library.
"""

import os
import swisseph as swe
import datetime
from typing import Dict, Any, Tuple


# Swiss Ephemeris data files (planets, Moon, main asteroids, Eris). Without
# them swisseph silently falls back to its Moshier model and cannot compute
# Ceres or Eris at all. SE_EPHE_PATH overrides the bundled folder.
EPHE_PATH = os.environ.get(
    "SE_EPHE_PATH",
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "ephe")),
)


def initialize_ephemeris() -> None:
    """Initialize the Swiss Ephemeris library."""
    swe.set_ephe_path(EPHE_PATH)

    # Use the tropical zodiac (default)
    swe.set_sid_mode(swe.SIDM_FAGAN_BRADLEY)


def _to_utc(when: datetime.datetime = None) -> datetime.datetime:
    """
    Normalise a datetime to UTC for the ephemeris.

    swisseph's calc_ut() expects Universal Time. Passing local time silently
    shifts every body's position by the UTC offset.

    Args:
        when: Timezone-aware datetime, or naive (interpreted as UTC), or None
              for the current instant.

    Returns:
        A timezone-aware datetime in UTC.
    """
    if when is None:
        return datetime.datetime.now(datetime.timezone.utc)
    if when.tzinfo is None:
        # Naive input is interpreted as UTC by contract.
        return when.replace(tzinfo=datetime.timezone.utc)
    return when.astimezone(datetime.timezone.utc)


def calculate_body_position(body: int, when: datetime.datetime = None) -> Dict[str, Any]:
    """
    Calculate a celestial body's position in the tropical zodiac.

    Args:
        body: A swisseph body constant, e.g. swe.SUN or swe.MOON
        when: Timezone-aware datetime, naive (treated as UTC), or None for now

    Returns:
        dict: position data - angle, longitude, zodiac_sign, degrees_in_sign,
              julian_day, date
    """
    initialize_ephemeris()

    when = _to_utc(when)

    jd = swe.julday(
        when.year,
        when.month,
        when.day,
        when.hour + when.minute / 60.0 + when.second / 3600.0
    )

    flags = swe.FLG_SWIEPH | swe.FLG_SPEED
    result, _ = swe.calc_ut(jd, body, flags)

    longitude = result[0] % 360
    zodiac_index = int(longitude / 30)
    degrees_in_sign = longitude % 30

    zodiac_names = [
        "Aries", "Taurus", "Gemini", "Cancer",
        "Leo", "Virgo", "Libra", "Scorpio",
        "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ]

    return {
        "date": when.strftime("%Y-%m-%d %H:%M:%S"),
        "julian_day": jd,
        "longitude": longitude,
        "zodiac_sign": zodiac_names[zodiac_index],
        "degrees_in_sign": degrees_in_sign,
        "angle": longitude,
    }


def calculate_sun_position(date: datetime.datetime = None) -> Dict[str, Any]:
    """
    Calculate the position of the sun in the tropical zodiac.

    Args:
        date: UTC instant to calculate for (default: now). A naive datetime
              is interpreted as UTC, not local time - see _to_utc().

    Returns:
        dict: Contains the sun's position data
    """
    return calculate_body_position(swe.SUN, date)


def calculate_moon_position(when: datetime.datetime = None) -> Dict[str, Any]:
    """
    Calculate the position of the moon in the tropical zodiac.

    Args:
        when: UTC instant to calculate for (default: now). A naive datetime
              is interpreted as UTC, not local time - see _to_utc().

    Returns:
        dict: Contains the moon's position data
    """
    return calculate_body_position(swe.MOON, when)


def calculate_sun_position_for_date(
    year: int, month: int, day: int, 
    hour: int = 12, minute: int = 0, second: int = 0
) -> Dict[str, Any]:
    """
    Calculate the position of the sun for a specific date and time.
    
    All arguments are UTC, not local/wall-clock time - see _to_utc().

    Args:
        year: The year
        month: The month (1-12)
        day: The day (1-31)
        hour: The hour (0-23), UTC
        minute: The minute (0-59)
        second: The second (0-59)

    Returns:
        dict: Contains the sun's position data
    """
    date = datetime.datetime(year, month, day, hour, minute, second)
    return calculate_sun_position(date)


def get_current_sun_angle() -> float:
    """
    Get the current angle of the sun in the tropical zodiac.
    
    Returns:
        float: The sun's longitude in degrees (0-360)
    """
    return calculate_sun_position()["angle"] 