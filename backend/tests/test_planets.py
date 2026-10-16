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
from app.utils.ephemeris import calculate_body_position, calculate_all_positions, BODIES


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


if __name__ == "__main__":
    unittest.main()
