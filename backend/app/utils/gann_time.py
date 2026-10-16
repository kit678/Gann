"""
Gannzilla-compatible time tools: cycle dates, moon octant phases, eclipses.

Every rule here was matched against the Gannzilla desktop app (see
notes/gannzilla_blackbox_findings.md):
- A cycle divides the circle into n equal parts from the ruler's longitude
  at the base instant. Each vertex is the moment the ruler next reaches
  base +/- k*360/n (searching backward when reversed). Gannzilla prints that
  moment's date in the city's fixed standard offset, rounded to the nearest
  day.
- The moon strip shows octant phases (every 45 deg of Moon-minus-Sun
  elongation): the 2 before the base instant and the 3 after it.
- The eclipses shown are the next central solar eclipse (total, annular or
  hybrid) and the next total lunar eclipse.
"""

import datetime
from typing import Dict, List, Optional

import swisseph as swe

from .ephemeris import BODIES, GANNZILLA_STD_OFFSETS, SUPPORTED_YEARS, initialize_ephemeris

# Search step in days. Small enough that no body (the Sun included) moves
# more than a few degrees between samples, so a crossing is never skipped.
_STEP_DAYS = 0.25
# Give up after this many days. A 4-part Saturn cycle needs about 7.5 years.
_MAX_SEARCH_DAYS = 365.25 * 40

_UNIX_EPOCH_JD = 2440587.5


def _jd(when: datetime.datetime) -> float:
    """Julian day (UT) of a timezone-aware datetime, inside the bundled data's range."""
    if not SUPPORTED_YEARS[0] <= when.year <= SUPPORTED_YEARS[1]:
        raise ValueError(
            f"Date {when:%Y-%m-%d} is outside the supported range "
            f"{SUPPORTED_YEARS[0]}-{SUPPORTED_YEARS[1]}."
        )
    return _UNIX_EPOCH_JD + when.timestamp() / 86400.0


def _from_jd(jd: float) -> datetime.datetime:
    """Timezone-aware UTC datetime for a Julian day (UT)."""
    return datetime.datetime.fromtimestamp((jd - _UNIX_EPOCH_JD) * 86400.0, datetime.timezone.utc)


def _lon(jd: float, body: int) -> float:
    return swe.calc_ut(jd, body, swe.FLG_SWIEPH)[0][0]


def _signed_gap(a: float, b: float) -> float:
    """a - b wrapped into [-180, 180)."""
    return (a - b + 180.0) % 360.0 - 180.0


def next_longitude_crossing(body: int, start_jd: float, target: float, backward: bool = False) -> float:
    """
    The first instant after (or, if backward, before) start_jd at which the
    body's longitude passes `target`, to about a second.

    Raises:
        ValueError: if no crossing is found within _MAX_SEARCH_DAYS.
    """
    step = -_STEP_DAYS if backward else _STEP_DAYS
    # Nudge off the start so a body sitting exactly on the target is not
    # reported as crossing at the start itself.
    j = start_jd + step * 1e-3
    prev = _signed_gap(_lon(j, body), target)
    for _ in range(int(_MAX_SEARCH_DAYS / _STEP_DAYS)):
        nxt_j = j + step
        cur = _signed_gap(_lon(nxt_j, body), target)
        # A sign change of the wrapped gap is a crossing, unless it is the
        # +/-180 wrap on the far side of the circle.
        if (prev < 0) != (cur < 0) and abs(prev - cur) < 180.0:
            lo, hi = j, nxt_j
            for _ in range(40):
                mid = (lo + hi) / 2
                if (_signed_gap(_lon(mid, body), target) < 0) == (prev < 0):
                    lo = mid
                else:
                    hi = mid
            return (lo + hi) / 2
        j, prev = nxt_j, cur
    raise ValueError(f"No crossing of {target:.2f} deg found within {_MAX_SEARCH_DAYS:.0f} days.")


def gannzilla_date(when: datetime.datetime, city: str) -> datetime.date:
    """The calendar date Gannzilla prints: city standard time, nearest day."""
    local = when.astimezone(datetime.timezone.utc) + datetime.timedelta(hours=GANNZILLA_STD_OFFSETS[city])
    return (local.replace(tzinfo=None) + datetime.timedelta(hours=12)).date()


def gannzilla_local_time(when: datetime.datetime, city: str) -> datetime.datetime:
    """A UTC instant shown as naive wall-clock time in the city's standard offset."""
    local = when.astimezone(datetime.timezone.utc) + datetime.timedelta(hours=GANNZILLA_STD_OFFSETS[city])
    return local.replace(tzinfo=None)


def cycle_dates(
    ruler: str, base: datetime.datetime, parts: int, reverse: bool, city: str
) -> List[Dict]:
    """
    Vertices of a Tetragram (parts=4), Pentagram (5) or Hexagram (6).

    Args:
        ruler: a key of BODIES (e.g. "Sun", "Mars")
        base: timezone-aware base instant (vertex 0)
        parts: number of equal divisions of the circle
        reverse: search backward in time, as Gannzilla's Reverse option does
        city: a key of GANNZILLA_STD_OFFSETS, used only to print dates

    Returns:
        list of {vertex, angle, utc, date}, vertex 0 being the base itself.
    """
    if ruler not in BODIES:
        raise ValueError(f"Unknown ruler '{ruler}'.")
    if parts < 2:
        raise ValueError("A cycle needs at least 2 parts.")
    initialize_ephemeris()
    body = BODIES[ruler]
    jd = _jd(base)
    start_lon = _lon(jd, body)
    sign = -1 if reverse else 1

    vertices = [{"vertex": 0, "angle": 0.0, "utc": base.astimezone(datetime.timezone.utc),
                 "date": gannzilla_date(base, city)}]
    for k in range(1, parts):
        target = (start_lon + sign * 360.0 * k / parts) % 360.0
        jd = next_longitude_crossing(body, jd, target, backward=reverse)
        when = _from_jd(jd)
        vertices.append({"vertex": k, "angle": 360.0 * k / parts, "utc": when,
                         "date": gannzilla_date(when, city)})
    return vertices


def _elongation(jd: float) -> float:
    return (_lon(jd, swe.MOON) - _lon(jd, swe.SUN)) % 360.0


def _octant_crossing(start_jd: float, backward: bool) -> float:
    """Next (or previous) instant the Moon-Sun elongation hits a multiple of 45 deg."""
    step = -0.05 if backward else 0.05  # elongation moves ~12 deg/day
    j = start_jd + step * 1e-3
    prev_e = _elongation(j)
    for _ in range(int(40 / abs(step))):
        nxt_j = j + step
        cur_e = _elongation(nxt_j)
        if int(prev_e // 45) != int(cur_e // 45):
            # The boundary between the two octants, unwrapped across 360/0.
            boundary = (max(int(prev_e // 45), int(cur_e // 45)) * 45) % 360
            if abs(prev_e - cur_e) > 180:
                boundary = 0.0
            lo, hi = j, nxt_j
            for _ in range(40):
                mid = (lo + hi) / 2
                if (_signed_gap(_elongation(mid), boundary) < 0) == (_signed_gap(prev_e, boundary) < 0):
                    lo = mid
                else:
                    hi = mid
            return (lo + hi) / 2
        j, prev_e = nxt_j, cur_e
    raise ValueError("No octant phase found within 40 days.")


_PHASE_NAMES = {
    0: "New Moon", 45: "Waxing Crescent", 90: "First Quarter", 135: "Waxing Gibbous",
    180: "Full Moon", 225: "Waning Gibbous", 270: "Last Quarter", 315: "Waning Crescent",
}


def moon_phases(base: datetime.datetime, city: str, before: int = 2, after: int = 3) -> List[Dict]:
    """The `before` octant phases preceding `base` and the `after` following it, in time order."""
    initialize_ephemeris()
    start = _jd(base)

    def collect(count: int, backward: bool) -> List[float]:
        out, j = [], start
        for _ in range(count):
            j = _octant_crossing(j, backward)
            out.append(j)
        return out

    jds = list(reversed(collect(before, True))) + collect(after, False)
    phases = []
    for jd in jds:
        angle = int(round(_elongation(jd) / 45.0)) * 45 % 360
        when = _from_jd(jd)
        phases.append({"angle": angle, "name": _PHASE_NAMES[angle], "utc": when,
                       "local": gannzilla_local_time(when, city)})
    return phases


def _next_eclipse(search, start_jd: float, wanted: int) -> List[float]:
    """Times of the first eclipse after start_jd whose type has any `wanted` bit."""
    jd = start_jd
    for _ in range(40):  # ~20 years of eclipses; a total one always appears sooner
        kind, times = search(jd, swe.FLG_SWIEPH, 0)
        if kind & wanted:
            return times
        jd = times[0] + 1.0
    raise ValueError("No matching eclipse found.")


def next_eclipses(base: datetime.datetime, city: str) -> Dict[str, Optional[Dict]]:
    """The next central solar eclipse and the next total lunar eclipse after `base`."""
    initialize_ephemeris()
    start = _jd(base)
    # Search every eclipse and filter here: passing several type bits to the
    # search itself makes swisseph look for an eclipse matching all of them.
    central = swe.ECL_TOTAL | swe.ECL_ANNULAR | swe.ECL_ANNULAR_TOTAL
    solar = _next_eclipse(swe.sol_eclipse_when_glob, start, central)
    lunar = _next_eclipse(swe.lun_eclipse_when, start, swe.ECL_TOTAL)

    def pack(jd: float) -> Dict:
        when = _from_jd(jd)
        return {"utc": when, "local": gannzilla_local_time(when, city)}

    return {"solar": pack(solar[0]), "lunar": pack(lunar[0])}
