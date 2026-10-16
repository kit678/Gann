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

# Gannzilla's twelve bodies, in its planet-table order.
BODIES = {
    "Sun": swe.SUN,
    "Moon": swe.MOON,
    "Mercury": swe.MERCURY,
    "Venus": swe.VENUS,
    "Mars": swe.MARS,
    "Ceres": swe.CERES,
    "Jupiter": swe.JUPITER,
    "Saturn": swe.SATURN,
    "Uranus": swe.URANUS,
    "Neptune": swe.NEPTUNE,
    "Pluto": swe.PLUTO,
    "Eris": swe.AST_OFFSET + 136199,
}

# Seen from the Sun, the Sun has no position and the Moon rides with the Earth.
_NOT_HELIOCENTRIC = ("Sun", "Moon")


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


def calculate_body_position(
    body: int, when: datetime.datetime = None, heliocentric: bool = False
) -> Dict[str, Any]:
    """
    Calculate a celestial body's position in the tropical zodiac.

    Args:
        body: A swisseph body constant, e.g. swe.SUN or swe.MOON
        when: Timezone-aware datetime, naive (treated as UTC), or None for now
        heliocentric: positions as seen from the Sun instead of the Earth

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
    if heliocentric:
        flags |= swe.FLG_HELCTR
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


def calculate_all_positions(
    when: datetime.datetime = None, heliocentric: bool = False
) -> Dict[str, Dict[str, Any]]:
    """
    Positions of every Gannzilla body at one instant.

    Args:
        when: Timezone-aware datetime, naive (treated as UTC), or None for now
        heliocentric: as seen from the Sun; Sun and Moon are then omitted

    Returns:
        dict: body name -> the dict calculate_body_position returns
    """
    when = _to_utc(when)
    return {
        name: calculate_body_position(body, when, heliocentric)
        for name, body in BODIES.items()
        if not (heliocentric and name in _NOT_HELIOCENTRIC)
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


# Gannzilla's city list with each city's *standard* UTC offset in hours.
# Gannzilla applies this offset all year and ignores daylight saving
# (black-box finding: New York is UTC-5 even in October). Only New York and
# London are verified against the app; the rest are standard time zones.
GANNZILLA_STD_OFFSETS = {
    "Chicago": -6, "Frankfurt": 1, "Hong Kong": 8, "Kiev": 2, "London": 0,
    "Moscow": 3, "Mumbai": 5.5, "New York": -5, "Paris": 1, "Sao Paulo": -3,
    "Seoul": 9, "Shanghai": 8, "Sydney": 10, "Tokyo": 9, "Toronto": -5,
    "Wellington": 12, "Zurich": 1,
}


def gannzilla_local_to_utc(local: datetime.datetime, city: str) -> datetime.datetime:
    """
    Convert a Gannzilla wall-clock time to UTC the way Gannzilla does.

    Args:
        local: naive wall-clock datetime, as typed into Gannzilla
        city: a key of GANNZILLA_STD_OFFSETS

    Returns:
        A timezone-aware UTC datetime.

    Raises:
        ValueError: unknown city, or `local` already carries a timezone.
    """
    if city not in GANNZILLA_STD_OFFSETS:
        raise ValueError(f"Unknown Gannzilla city '{city}'.")
    if local.tzinfo is not None:
        raise ValueError("Pass a naive wall-clock time; the city sets the offset.")
    offset = datetime.timedelta(hours=GANNZILLA_STD_OFFSETS[city])
    return (local - offset).replace(tzinfo=datetime.timezone.utc)
