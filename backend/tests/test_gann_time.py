"""
Tests for Gannzilla-compatible cycles, moon phases and eclipses.

Expected dates are what the Gannzilla desktop app printed (user guide
examples and the 2026-10-15 black-box run, notes/gannzilla_blackbox_findings.md),
all for base dates at 00:00 New York.
"""

import sys
import os
import unittest
from datetime import datetime, date, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.utils.ephemeris import gannzilla_local_to_utc
from app.utils.gann_time import cycle_dates, moon_phases, next_eclipses, gannzilla_date


def ny(y, m, d, h=0, mi=0):
    return gannzilla_local_to_utc(datetime(y, m, d, h, mi), "New York")


def dates(vertices):
    return [v["date"] for v in vertices[1:]]


class TestCycles(unittest.TestCase):

    def test_sun_tetragram_forward_2026(self):
        v = cycle_dates("Sun", ny(2026, 10, 15), 4, False, "New York")
        self.assertEqual(dates(v), [date(2027, 1, 12), date(2027, 4, 12), date(2027, 7, 14)])

    def test_sun_tetragram_reverse_2026(self):
        v = cycle_dates("Sun", ny(2026, 10, 15), 4, True, "New York")
        self.assertEqual(dates(v), [date(2026, 7, 14), date(2026, 4, 12), date(2026, 1, 12)])

    def test_sun_pentagram_reverse_2026(self):
        v = cycle_dates("Sun", ny(2026, 10, 15), 5, True, "New York")
        self.assertEqual(dates(v), [date(2026, 8, 2), date(2026, 5, 19), date(2026, 3, 6), date(2025, 12, 25)])

    def test_guide_example_base_2020_01_11(self):
        base = ny(2020, 1, 11)
        self.assertEqual(dates(cycle_dates("Sun", base, 4, True, "New York")),
                         [date(2019, 10, 14), date(2019, 7, 13), date(2019, 4, 10)])
        self.assertEqual(dates(cycle_dates("Sun", base, 5, True, "New York")),
                         [date(2019, 11, 1), date(2019, 8, 19), date(2019, 6, 5), date(2019, 3, 23)])
        self.assertEqual(dates(cycle_dates("Sun", base, 6, True, "New York")),
                         [date(2019, 11, 13), date(2019, 9, 13), date(2019, 7, 13),
                          date(2019, 5, 11), date(2019, 3, 11)])

    def test_mars_tetragram_forward_2026(self):
        v = cycle_dates("Mars", ny(2026, 10, 15), 4, False, "New York")
        self.assertEqual(dates(v), [date(2027, 9, 17), date(2028, 1, 16), date(2028, 5, 11)])

    def test_vertex_zero_is_the_base(self):
        v = cycle_dates("Sun", ny(2026, 10, 15), 6, False, "New York")
        self.assertEqual(v[0]["date"], date(2026, 10, 15))
        self.assertEqual([x["angle"] for x in v], [0, 60, 120, 180, 240, 300])

    def test_bad_inputs(self):
        with self.assertRaises(ValueError):
            cycle_dates("Vulcan", ny(2026, 10, 15), 4, False, "New York")
        with self.assertRaises(ValueError):
            cycle_dates("Sun", ny(2026, 10, 15), 1, False, "New York")


class TestNearestDayRounding(unittest.TestCase):

    def test_before_noon_keeps_the_day_and_after_noon_rounds_up(self):
        self.assertEqual(gannzilla_date(ny(2027, 9, 16, 11, 59), "New York"), date(2027, 9, 16))
        self.assertEqual(gannzilla_date(ny(2027, 9, 16, 13, 26), "New York"), date(2027, 9, 17))


class TestMoonPhases(unittest.TestCase):

    def test_strip_for_2026_10_15_matches_gannzilla(self):
        """Gannzilla: 10 Oct 10:49, 14 Oct 08:15, 18 Oct 11:13, 22 Oct 10:21, 25 Oct 23:10."""
        phases = moon_phases(ny(2026, 10, 15), "New York")
        expected = [
            datetime(2026, 10, 10, 10, 49), datetime(2026, 10, 14, 8, 15),
            datetime(2026, 10, 18, 11, 13), datetime(2026, 10, 22, 10, 21),
            datetime(2026, 10, 25, 23, 10),
        ]
        self.assertEqual(len(phases), 5)
        for got, want in zip(phases, expected):
            with self.subTest(want=want):
                self.assertLessEqual(abs((got["local"] - want).total_seconds()), 180)
        self.assertEqual([p["angle"] for p in phases], [0, 45, 90, 135, 180])
        self.assertEqual(phases[0]["name"], "New Moon")

    def test_two_before_and_three_after_the_base(self):
        base = ny(2020, 1, 1)
        phases = moon_phases(base, "New York")
        self.assertEqual(sum(p["utc"] < base for p in phases), 2)
        self.assertEqual(sum(p["utc"] > base for p in phases), 3)
        gaps = [(b["utc"] - a["utc"]).total_seconds() / 86400 for a, b in zip(phases, phases[1:])]
        for gap in gaps:
            self.assertTrue(3.0 < gap < 4.5, gaps)  # synodic month / 8 = 3.69 days


class TestEclipses(unittest.TestCase):

    def test_next_eclipses_after_2026_10_15(self):
        """Gannzilla: solar 6 Feb 2027, lunar 31 Dec 2028 (it skips non-total lunar eclipses)."""
        e = next_eclipses(ny(2026, 10, 15), "New York")
        self.assertEqual(e["solar"]["local"].date(), date(2027, 2, 6))
        self.assertEqual(e["lunar"]["local"].date(), date(2028, 12, 31))
        self.assertLessEqual(abs((e["lunar"]["local"] - datetime(2028, 12, 31, 11, 47)).total_seconds()), 600)

    def test_next_eclipses_after_2020_01_01(self):
        e = next_eclipses(ny(2020, 1, 1), "New York")
        self.assertEqual(e["solar"]["utc"].date(), date(2020, 6, 21))
        self.assertEqual(e["lunar"]["utc"].date(), date(2021, 5, 26))


if __name__ == "__main__":
    unittest.main()
