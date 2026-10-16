import {
  wheelPoint, CHRONOMETER_ANNUAL_LABELS, chronometerDailyLabel, signOf,
} from '../gannzillaWheel';

const close = (p, x, y) => {
  expect(p.x).toBeCloseTo(x, 9);
  expect(p.y).toBeCloseTo(y, 9);
};

describe('wheelPoint (black-box [09]-[12], screen y down)', () => {
  test('clockwise: 0 deg west, 90 north, 180 east, 270 south', () => {
    close(wheelPoint(0, 1), -1, 0);
    close(wheelPoint(90, 1), 0, -1);
    close(wheelPoint(180, 1), 1, 0);
    close(wheelPoint(270, 1), 0, 1);
  });

  test('anticlockwise mirrors it: 0 deg east, 90 north', () => {
    close(wheelPoint(0, 1, { clockwise: false }), 1, 0);
    close(wheelPoint(90, 1, { clockwise: false }), 0, -1);
    close(wheelPoint(180, 1, { clockwise: false }), -1, 0);
  });

  test('Angle rotates the scale along its own direction of travel', () => {
    // Clockwise, Angle 90: 0 deg at the top, 90 deg on the right.
    close(wheelPoint(0, 1, { angle: 90 }), 0, -1);
    close(wheelPoint(90, 1, { angle: 90 }), 1, 0);
    // Anticlockwise, Angle 90: 0 deg at the top, 90 deg on the left.
    close(wheelPoint(0, 1, { clockwise: false, angle: 90 }), 0, -1);
    close(wheelPoint(90, 1, { clockwise: false, angle: 90 }), -1, 0);
  });

  test('scales by radius and offsets by centre', () => {
    close(wheelPoint(0, 10, { cx: 100, cy: 50 }), 90, 50);
  });
});

describe('Chronometer labels', () => {
  test('annual labels are Gannzilla\'s fixed table, every 15 deg from 21 Mar', () => {
    expect(CHRONOMETER_ANNUAL_LABELS).toHaveLength(24);
    expect(CHRONOMETER_ANNUAL_LABELS[0]).toEqual({ angle: 0, label: '21 Mar' });
    expect(CHRONOMETER_ANNUAL_LABELS[6]).toEqual({ angle: 90, label: '21 Jun' });
    expect(CHRONOMETER_ANNUAL_LABELS[12]).toEqual({ angle: 180, label: '22 Sep' });
    expect(CHRONOMETER_ANNUAL_LABELS[18]).toEqual({ angle: 270, label: '21 Dec' });
    expect(CHRONOMETER_ANNUAL_LABELS[13]).toEqual({ angle: 195, label: '7 Oct' });
  });

  test('daily: 06:00 at 0 deg, 15 deg per hour (black-box [13])', () => {
    expect(chronometerDailyLabel(0)).toBe('06:00');
    expect(chronometerDailyLabel(90)).toBe('12:00');
    expect(chronometerDailyLabel(180)).toBe('18:00');
    expect(chronometerDailyLabel(270)).toBe('00:00');
    expect(chronometerDailyLabel(15)).toBe('07:00');
  });
});

describe('signOf', () => {
  test('names the sign and the degree within it', () => {
    expect(signOf(0)).toEqual({ sign: 'Aries', index: 0, degree: 0 });
    expect(signOf(202.5)).toEqual({ sign: 'Libra', index: 6, degree: 22.5 });
    expect(signOf(359.9).sign).toBe('Pisces');
    expect(signOf(-10).sign).toBe('Pisces');
  });
});
