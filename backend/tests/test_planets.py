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
from app.utils.ephemeris import (
    calculate_body_position, calculate_all_positions, BODIES,
    GANNZILLA_STD_OFFSETS, gannzilla_local_to_utc,
)
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestEphemerisFiles(unittest.TestCase):
    """Ceres and Eris need the Swiss Ephemeris data files in backend/ephe."""

    WHEN = datetime(2000, 1, 1, 5, 0, tzinfo=timezone.utc)

    def test_ceres_is_computed_from_data_files(self):
        result = calculate_body_position(swe.CERES, self.WHEN)
        self.assertAlmostEqual(result["longitude"], 184.40, delta=0.03)

    def test_eris_is_computed_from_data_files(self):
        result = calculate_body_position(swe.AST_OFFSET + 136199, self.WHEN)
        self.assertAlmostEqual(result["longitude"], 18.60, delta=0.03)


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


if __name__ == "__main__":
    unittest.main()
