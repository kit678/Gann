"""
Tests for the ephemeris utility.
"""

import sys
import os
import unittest
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.utils.ephemeris import calculate_sun_position


class TestEphemerisUTC(unittest.TestCase):
    """The ephemeris must treat its input as UTC, not local time."""

    REFERENCE = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
    EXPECTED_SUN_LONGITUDE = 281.07802

    def test_sun_longitude_at_known_utc_instant(self):
        result = calculate_sun_position(self.REFERENCE)
        self.assertAlmostEqual(
            result["angle"], self.EXPECTED_SUN_LONGITUDE, places=2
        )

    def test_equivalent_instant_in_another_zone_gives_same_longitude(self):
        """13:00 at UTC+1 is the same instant as 12:00 UTC."""
        other_zone = datetime(
            2026, 1, 1, 13, 0, 0, tzinfo=timezone(timedelta(hours=1))
        )
        self.assertAlmostEqual(
            calculate_sun_position(other_zone)["angle"],
            calculate_sun_position(self.REFERENCE)["angle"],
            places=6,
        )


from app.utils.ephemeris import calculate_body_position, calculate_moon_position
import swisseph as swe


class TestBodyPosition(unittest.TestCase):
    """Both bodies must be computable from the same generalised helper."""

    REFERENCE = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
    EXPECTED_SUN = 281.07802
    EXPECTED_MOON = 74.225405

    def test_sun_via_generic_helper(self):
        result = calculate_body_position(swe.SUN, self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_SUN, places=2)

    def test_moon_via_generic_helper(self):
        result = calculate_body_position(swe.MOON, self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_MOON, places=2)

    def test_moon_convenience_wrapper(self):
        result = calculate_moon_position(self.REFERENCE)
        self.assertAlmostEqual(result["angle"], self.EXPECTED_MOON, places=2)

    def test_moon_result_has_the_same_shape_as_sun(self):
        moon = calculate_moon_position(self.REFERENCE)
        for key in ("angle", "longitude", "zodiac_sign", "degrees_in_sign",
                    "julian_day", "date"):
            self.assertIn(key, moon)

    def test_moon_zodiac_sign_is_correct_for_the_reference_instant(self):
        self.assertEqual(calculate_moon_position(self.REFERENCE)["zodiac_sign"], "Gemini")


if __name__ == "__main__":
    unittest.main()
