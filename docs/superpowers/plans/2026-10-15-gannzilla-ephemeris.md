# Gannzilla Plan 3: Ephemeris Upgrade

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The backend returns all 12 Gannzilla bodies (Sun..Pluto, Ceres, Eris), geocentric or heliocentric, with an optional "Gannzilla time" mode that matches the desktop app's clock rule.

**Architecture:** `backend/app/utils/ephemeris.py` gains a body table, an ephemeris-file path, a heliocentric flag and an all-bodies function. A new `/api/planets` endpoint exposes them. `/api/celestial` and its tests stay unchanged. Swiss Ephemeris data files live in `backend/ephe/` (copied from the local Astrolog install), so Ceres and Eris work everywhere.

**Tech Stack:** Python, FastAPI, pyswisseph 2.10, unittest/pytest (`cd backend && python -m pytest tests -q`).

**Roadmap context:** step 3 of `docs/superpowers/plans/2026-10-15-gannzilla-math-parity.md`. Evidence: `notes/gannzilla_docs_extract.md` (planet table) and `notes/gannzilla_blackbox_findings.md` (time-zone rule).

---

## Facts this plan relies on (verified 2026-10-15)

- Without data files, pyswisseph silently falls back to its Moshier model. Ceres and Eris then raise "file not found".
- With `seas_18.se1`, `semo_18.se1`, `sepl_18.se1` and `s136199s.se1` (Eris), every body works. At 2000-01-01 05:00 UTC the results are within 0.013° of Gannzilla's Market-column values (Sun 280.072 vs 280.08, Ceres 184.389 vs 184.40, Eris 18.592 vs 18.60).
  - The leftover ~0.01° gap is the same for all bodies. Its cause is unknown, and it is far below what Gannzilla displays. Tests use a 0.03° tolerance.
- Gannzilla reads input time as the city's **fixed standard offset with no daylight saving**: New York is UTC−5 all year (black-box [07] plus the moon-phase check). Only New York and London are verified. The other offsets in the table below are standard time zones and are marked unverified.
- Baseline: `python -m pytest tests -q` gives 29 passed and 1 failed. The failure, `test_gann_square.py::TestGannSquare::test_generate_square`, was there before this work and is out of scope.

## File structure

- Create `backend/ephe/` holding the 4 `.se1` files.
- Modify `backend/app/utils/ephemeris.py`: add the ephemeris path, `BODIES`, the `heliocentric` flag, `calculate_all_positions`, `GANNZILLA_STD_OFFSETS` and `gannzilla_local_to_utc`.
- Modify `backend/app/api/endpoints.py`: add `GET /api/planets`.
- Create `backend/tests/test_planets.py`: the 2000/1995 tables, helio, the time rule and the endpoint.

---

### Task 1: Ephemeris data files and path

**Files:**
- Create: `backend/ephe/seas_18.se1`, `semo_18.se1`, `sepl_18.se1`, `s136199s.se1`
- Modify: `backend/app/utils/ephemeris.py` (`initialize_ephemeris`)
- Test: `backend/tests/test_planets.py`

- [ ] **Step 1: Copy the data files**

```bash
mkdir -p backend/ephe
cp /c/Astrolog/ephem/seas_18.se1 /c/Astrolog/ephem/semo_18.se1 /c/Astrolog/ephem/sepl_18.se1 /c/Astrolog/ephem/s136199s.se1 backend/ephe/
ls backend/ephe
```
Expected: the 4 files are listed.

- [ ] **Step 2: Write the failing test**

Create `backend/tests/test_planets.py`:

```python
"""
Tests for the all-bodies ephemeris and the Gannzilla-compatible time rule.

Expected longitudes come from the Gannzilla user guide's planet table
(notes/gannzilla_docs_extract.md) and the desktop black-box run
(notes/gannzilla_blackbox_findings.md).
"""

import sys
import os
import unittest
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import swisseph as swe
from app.utils.ephemeris import calculate_body_position


class TestEphemerisFiles(unittest.TestCase):
    """Ceres and Eris need the Swiss Ephemeris data files in backend/ephe."""

    WHEN = datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc)

    def test_ceres_is_computed_from_data_files(self):
        result = calculate_body_position(swe.CERES, self.WHEN)
        self.assertAlmostEqual(result["longitude"], 184.40, delta=0.03)

    def test_eris_is_computed_from_data_files(self):
        result = calculate_body_position(swe.AST_OFFSET + 136199, self.WHEN)
        self.assertAlmostEqual(result["longitude"], 18.60, delta=0.03)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run to verify it fails**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: 2 failed, with "SwissEph file 'seas_18.se1' not found" and "'s136199s.se1' not found".

- [ ] **Step 4: Point swisseph at backend/ephe**

In `backend/app/utils/ephemeris.py`, add `import os` next to the other imports, and replace the whole `initialize_ephemeris` function with:

```python
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
```

- [ ] **Step 5: Run to verify it passes, then run the whole suite**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: 2 passed.
Run: `cd backend && python -m pytest tests -q`
Expected: 31 passed, 1 failed (only the known `test_generate_square`).

- [ ] **Step 6: Commit**

```bash
git add backend/ephe backend/app/utils/ephemeris.py backend/tests/test_planets.py
git commit -m "feat: bundle Swiss Ephemeris data files so Ceres and Eris compute"
```

### Task 2: All bodies, geocentric and heliocentric

**Files:**
- Modify: `backend/app/utils/ephemeris.py`
- Modify: `backend/tests/test_planets.py`

- [ ] **Step 1: Write the failing tests**

Change the import line in `backend/tests/test_planets.py` to:

```python
from app.utils.ephemeris import calculate_body_position, calculate_all_positions, BODIES
```

Append these classes above the `if __name__ == "__main__":` line:

```python
class TestAllBodies(unittest.TestCase):
    """All 12 Gannzilla bodies, checked against the user guide's tables."""

    # 01.01.2000 00:00 New York = 05:00 UTC (Gannzilla's fixed UTC-5).
    TABLE_2000 = {
        "Sun": 280.08, "Moon": 219.82, "Mercury": 271.44, "Venus": 241.22,
        "Mars": 327.75, "Ceres": 184.40, "Jupiter": 25.25, "Saturn": 40.41,
        "Uranus": 314.80, "Neptune": 303.19, "Pluto": 251.45, "Eris": 18.60,
    }
    # 30.06.1995 00:00 New York = 05:00 UTC. The guide shows whole degrees.
    TABLE_1995 = {
        "Sun": 98, "Moon": 122, "Mercury": 76, "Venus": 84, "Mars": 168,
        "Ceres": 152, "Jupiter": 247, "Saturn": 355, "Uranus": 299,
        "Neptune": 295, "Pluto": 238, "Eris": 19,
    }

    def test_body_table_lists_the_twelve_gannzilla_bodies_in_order(self):
        self.assertEqual(list(BODIES), list(self.TABLE_2000))

    def test_2000_geocentric_matches_the_guide(self):
        result = calculate_all_positions(datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc))
        for name, expected in self.TABLE_2000.items():
            with self.subTest(body=name):
                self.assertAlmostEqual(result[name]["longitude"], expected, delta=0.03)

    def test_1995_geocentric_matches_the_guide_to_the_degree(self):
        result = calculate_all_positions(datetime(1995, 6, 30, 5, 0, tzinfo=timezone.utc))
        for name, expected in self.TABLE_1995.items():
            with self.subTest(body=name):
                diff = (result[name]["longitude"] - expected + 180) % 360 - 180
                self.assertLessEqual(abs(diff), 0.5)

    def test_heliocentric_drops_sun_and_moon(self):
        result = calculate_all_positions(
            datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc), heliocentric=True
        )
        self.assertNotIn("Sun", result)
        self.assertNotIn("Moon", result)
        self.assertEqual(len(result), 10)

    def test_heliocentric_differs_from_geocentric(self):
        when = datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc)
        geo = calculate_all_positions(when)["Mars"]["longitude"]
        helio = calculate_all_positions(when, heliocentric=True)["Mars"]["longitude"]
        self.assertGreater(abs(geo - helio), 1.0)
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: ImportError, "cannot import name 'calculate_all_positions'".

- [ ] **Step 3: Implement**

In `backend/app/utils/ephemeris.py`:

(a) Below the `EPHE_PATH` block, add:

```python
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
```

(b) Change the signature and flags of `calculate_body_position`:

```python
def calculate_body_position(
    body: int, when: datetime.datetime = None, heliocentric: bool = False
) -> Dict[str, Any]:
```

Add this line to its docstring Args, after `when`:

```
        heliocentric: positions as seen from the Sun instead of the Earth
```

and replace `flags = swe.FLG_SWIEPH | swe.FLG_SPEED` with:

```python
    flags = swe.FLG_SWIEPH | swe.FLG_SPEED
    if heliocentric:
        flags |= swe.FLG_HELCTR
```

(c) Add this function after `calculate_body_position`:

```python
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
```

- [ ] **Step 4: Run to verify they pass, then the whole suite**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: 7 passed.
Run: `cd backend && python -m pytest tests -q`
Expected: only the known `test_generate_square` fails.

- [ ] **Step 5: Commit**

```bash
git add backend/app/utils/ephemeris.py backend/tests/test_planets.py
git commit -m "feat: all twelve Gannzilla bodies, geocentric or heliocentric"
```

### Task 3: Gannzilla time rule

**Files:**
- Modify: `backend/app/utils/ephemeris.py`
- Modify: `backend/tests/test_planets.py`

- [ ] **Step 1: Write the failing tests**

Extend the import line to:

```python
from app.utils.ephemeris import (
    calculate_body_position, calculate_all_positions, BODIES,
    GANNZILLA_STD_OFFSETS, gannzilla_local_to_utc,
)
```

Append above `if __name__ == "__main__":`:

```python
class TestGannzillaTime(unittest.TestCase):
    """Gannzilla uses the city's standard offset all year, with no DST."""

    def test_new_york_is_utc_minus_5_in_winter(self):
        utc = gannzilla_local_to_utc(datetime(2000, 1, 1, 0, 0), "New York")
        self.assertEqual(utc, datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc))

    def test_new_york_is_still_utc_minus_5_in_october(self):
        """Real New York time is EDT (UTC-4) here; Gannzilla still uses -5."""
        utc = gannzilla_local_to_utc(datetime(2026, 10, 15, 0, 0), "New York")
        self.assertEqual(utc, datetime(2026, 10, 15, 5, 0, tzinfo=timezone.utc))

    def test_london_is_utc(self):
        utc = gannzilla_local_to_utc(datetime(2000, 1, 1, 0, 0), "London")
        self.assertEqual(utc, datetime(2000, 1, 1, 0, 0, tzinfo=timezone.utc))

    def test_mumbai_half_hour_offset(self):
        utc = gannzilla_local_to_utc(datetime(2000, 1, 1, 0, 0), "Mumbai")
        self.assertEqual(utc, datetime(1999, 12, 31, 18, 30, tzinfo=timezone.utc))

    def test_london_moon_is_about_2_5_degrees_behind_new_york(self):
        """Black-box [07]: Moon 217.3 (London 00:00) vs 219.8 (New York 00:00)."""
        london = calculate_all_positions(gannzilla_local_to_utc(datetime(2000, 1, 1), "London"))
        new_york = calculate_all_positions(gannzilla_local_to_utc(datetime(2000, 1, 1), "New York"))
        self.assertAlmostEqual(london["Moon"]["longitude"], 217.3, delta=0.1)
        self.assertAlmostEqual(new_york["Moon"]["longitude"], 219.8, delta=0.1)

    def test_unknown_city_is_rejected(self):
        with self.assertRaises(ValueError):
            gannzilla_local_to_utc(datetime(2000, 1, 1), "Atlantis")

    def test_aware_input_is_rejected(self):
        with self.assertRaises(ValueError):
            gannzilla_local_to_utc(datetime(2000, 1, 1, tzinfo=timezone.utc), "London")

    def test_city_list_matches_gannzilla(self):
        self.assertEqual(
            sorted(GANNZILLA_STD_OFFSETS),
            sorted([
                "Chicago", "Frankfurt", "Hong Kong", "Kiev", "London", "Moscow",
                "Mumbai", "New York", "Paris", "Sao Paulo", "Seoul", "Shanghai",
                "Sydney", "Tokyo", "Toronto", "Wellington", "Zurich",
            ]),
        )
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: ImportError, "cannot import name 'GANNZILLA_STD_OFFSETS'".

- [ ] **Step 3: Implement (append to `backend/app/utils/ephemeris.py`)**

```python
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
```

- [ ] **Step 4: Run to verify they pass, then the whole suite**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: 15 passed.
Run: `cd backend && python -m pytest tests -q`
Expected: only the known `test_generate_square` fails.

- [ ] **Step 5: Commit**

```bash
git add backend/app/utils/ephemeris.py backend/tests/test_planets.py
git commit -m "feat: Gannzilla fixed-offset city time rule"
```

### Task 4: `/api/planets` endpoint

**Files:**
- Modify: `backend/app/api/endpoints.py`
- Modify: `backend/tests/test_planets.py`

- [ ] **Step 1: Write the failing tests**

Add to the imports at the top of `backend/tests/test_planets.py`:

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
```

Append above `if __name__ == "__main__":`:

```python
class TestPlanetsEndpoint(unittest.TestCase):
    """GET /api/planets exposes all bodies with either time rule."""

    def test_gannzilla_mode_new_york_matches_the_guide(self):
        response = client.get("/api/planets", params={
            "datetime": "2000-01-01T00:00", "time_mode": "gannzilla", "city": "New York",
        })
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["datetime_utc"], "2000-01-01T05:00:00Z")
        self.assertEqual(body["system"], "geocentric")
        self.assertAlmostEqual(body["bodies"]["Jupiter"]["longitude"], 25.25, delta=0.03)
        self.assertEqual(len(body["bodies"]), 12)

    def test_default_mode_is_us_eastern_with_dst(self):
        """Matches /api/celestial: 2026-10-15 00:00 ET is EDT, so 04:00 UTC."""
        response = client.get("/api/planets", params={"datetime": "2026-10-15T00:00"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["datetime_utc"], "2026-10-15T04:00:00Z")

    def test_heliocentric_has_ten_bodies(self):
        response = client.get("/api/planets", params={
            "datetime": "2000-01-01T00:00", "system": "heliocentric",
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["system"], "heliocentric")
        self.assertEqual(len(response.json()["bodies"]), 10)

    def test_bad_inputs_are_400(self):
        for params in (
            {"datetime": "nope"},
            {"system": "barycentric"},
            {"time_mode": "gannzilla", "city": "Atlantis", "datetime": "2000-01-01T00:00"},
            {"time_mode": "lunar"},
        ):
            with self.subTest(params=params):
                self.assertEqual(client.get("/api/planets", params=params).status_code, 400)
```

- [ ] **Step 2: Run to verify they fail**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: the 4 new tests fail with 404.

- [ ] **Step 3: Implement**

In `backend/app/api/endpoints.py`, extend the existing `from ..utils.ephemeris import (` list with `calculate_all_positions` and `gannzilla_local_to_utc`. Then add this endpoint directly after the `/celestial` endpoint function:

```python
@router.get("/planets")
async def get_planet_positions(
    datetime_local: Optional[str] = Query(
        None,
        alias="datetime",
        description="Optional 'YYYY-MM-DDTHH:mm'. Defaults to now.",
    ),
    system: str = Query("geocentric", description="'geocentric' or 'heliocentric'"),
    time_mode: str = Query(
        "et",
        description="'et' = US Eastern with DST (like /celestial); "
                    "'gannzilla' = the city's fixed standard offset, no DST.",
    ),
    city: str = Query("New York", description="Gannzilla city, used when time_mode='gannzilla'"),
):
    """Positions of all twelve Gannzilla bodies for an instant."""
    if system not in ("geocentric", "heliocentric"):
        raise HTTPException(status_code=400, detail="system must be 'geocentric' or 'heliocentric'.")
    if time_mode not in ("et", "gannzilla"):
        raise HTTPException(status_code=400, detail="time_mode must be 'et' or 'gannzilla'.")

    try:
        if time_mode == "gannzilla":
            if datetime_local is None:
                when = datetime.now(UTC)
            else:
                try:
                    naive = datetime.fromisoformat(datetime_local)
                except ValueError:
                    raise ValueError(
                        f"Invalid datetime '{datetime_local}'. Expected format YYYY-MM-DDTHH:mm."
                    )
                when = gannzilla_local_to_utc(naive, city)
        else:
            when = parse_et_datetime(datetime_local) if datetime_local is not None else datetime.now(EASTERN)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    try:
        return {
            "datetime_utc": when.astimezone(UTC).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "system": system,
            "time_mode": time_mode,
            "bodies": calculate_all_positions(when, heliocentric=(system == "heliocentric")),
        }
    except Exception as e:
        logger.error(f"Error computing planet positions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
```

- [ ] **Step 4: Run to verify they pass, then the whole suite**

Run: `cd backend && python -m pytest tests/test_planets.py -q`
Expected: 19 passed.
Run: `cd backend && python -m pytest tests -q`
Expected: only the known `test_generate_square` fails. `test_celestial_endpoint.py` is unchanged and passes.

- [ ] **Step 5: Commit**

```bash
git add backend/app/api/endpoints.py backend/tests/test_planets.py
git commit -m "feat: /api/planets endpoint with geo/helio and Gannzilla time mode"
```

## Done when

- `backend/tests/test_planets.py` passes 19 tests, and the rest of the backend suite is unchanged (the 1 failure that was already there remains).
- All 12 bodies match the guide's 2000 table within 0.03° and its 1995 table to the degree.
- `/api/celestial` behaviour and tests are untouched.
