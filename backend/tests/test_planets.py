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
