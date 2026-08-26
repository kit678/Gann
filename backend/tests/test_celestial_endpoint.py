"""
Tests for the /api/celestial endpoint and ET datetime parsing.
"""

import sys
import os
import unittest
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app
from app.api.endpoints import parse_et_datetime

client = TestClient(app)


class TestParseEtDatetime(unittest.TestCase):
    """ET input must convert to the correct UTC instant on both sides of DST."""

    def test_summer_date_uses_edt_offset(self):
        result = parse_et_datetime("2026-07-15T16:00")
        self.assertEqual(result.astimezone(timezone.utc).hour, 20)

    def test_winter_date_uses_est_offset(self):
        result = parse_et_datetime("2026-01-15T16:00")
        self.assertEqual(result.astimezone(timezone.utc).hour, 21)

    def test_offsets_differ_across_the_dst_boundary(self):
        summer = parse_et_datetime("2026-07-15T16:00").utcoffset()
        winter = parse_et_datetime("2026-01-15T16:00").utcoffset()
        self.assertNotEqual(summer, winter)

    def test_explicit_offset_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_et_datetime("2026-07-15T16:00+05:30")

    def test_garbage_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_et_datetime("not-a-datetime")


class TestCelestialEndpoint(unittest.TestCase):

    def test_returns_both_bodies(self):
        response = client.get("/api/celestial")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn("sun", body)
        self.assertIn("moon", body)
        self.assertIn("angle", body["sun"])
        self.assertIn("angle", body["moon"])

    def test_echoes_both_timezones(self):
        response = client.get("/api/celestial", params={"datetime": "2026-01-01T07:00"})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn("datetime_et", body)
        self.assertIn("datetime_utc", body)

    def test_known_instant_matches_reference_longitudes(self):
        """2026-01-01 07:00 ET is 12:00 UTC (EST, UTC-5)."""
        response = client.get("/api/celestial", params={"datetime": "2026-01-01T07:00"})
        body = response.json()
        self.assertAlmostEqual(body["sun"]["angle"], 281.07802, places=2)
        self.assertAlmostEqual(body["moon"]["angle"], 74.225405, places=2)

    def test_bad_datetime_returns_400(self):
        response = client.get("/api/celestial", params={"datetime": "nonsense"})
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
