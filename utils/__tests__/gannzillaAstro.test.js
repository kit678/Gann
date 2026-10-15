import {
  mod360, separation, delta, priceToDegree, longitudeToPrice, summary, average,
} from '../gannzillaAstro';
import {
  DOW_PRICE, DOW_PLANETS, DOW_SUMMARY, DOW_AVERAGE, RADIX_TRANSIT, RADIX_TRANSIT_2026, DOW_MARKET_X10,
} from './fixtures/gannzillaDocs';

describe('angle helpers', () => {
  test('mod360 wraps into [0, 360)', () => {
    expect(mod360(370)).toBe(10);
    expect(mod360(-10)).toBe(350);
    expect(mod360(360)).toBe(0);
  });

  RADIX_TRANSIT.forEach(({ body, radix, transit, delta: d, arc }) => {
    test(`${body}: delta ${d} and shortest arc ${arc} match the guide`, () => {
      expect(delta(radix, transit)).toBe(d);
      expect(separation(radix, transit)).toBe(arc);
    });
  });

  RADIX_TRANSIT_2026.forEach(({ body, radix, transit, delta: d }) => {
    test(`${body}: delta is radix minus transit (black-box [04])`, () => {
      expect(delta(radix, transit)).toBe(d);
    });
  });
});

describe('priceToDegree = (price x mult / div) mod 360 (extract #8)', () => {
  test('gold 384.15 -> 24 degrees', () => {
    expect(priceToDegree(384.15)).toBeCloseTo(24.15, 6);
  });
  test('x2 multiplier -> 48 degrees', () => {
    expect(priceToDegree(384.15, { multiplier: 2 })).toBeCloseTo(48.3, 6);
  });
  test('divisor applies too', () => {
    expect(priceToDegree(800, { divisor: 2 })).toBeCloseTo(40, 6);
  });
});

describe('longitudeToPrice = floor(price/360)*360 + lon (extract #9-10)', () => {
  DOW_PLANETS.forEach(({ body, lon, price }) => {
    test(`${body} at ${lon} -> ${price}`, () => {
      expect(longitudeToPrice(lon, DOW_PRICE)).toBeCloseTo(price, 6);
    });
  });
  test('uses floor, not the nearest multiple of 360 (Jupiter)', () => {
    expect(longitudeToPrice(25.25, DOW_PRICE)).toBeCloseTo(11185.25, 6);
  });

  DOW_MARKET_X10.forEach(({ body, lon, price }) => {
    test(`${body} with multiplier 10 -> ${price} (black-box [06])`, () => {
      expect(longitudeToPrice(lon, DOW_PRICE, { multiplier: 10 })).toBeCloseTo(price, 6);
    });
  });
});

describe('Summary and Average (extract #11-12)', () => {
  const lonOf = (name) => DOW_PLANETS.find((p) => p.body === name).lon;
  test('Summary = sum of chosen longitudes mod 360', () => {
    expect(summary(DOW_SUMMARY.bodies.map(lonOf))).toBeCloseTo(DOW_SUMMARY.value, 2);
  });
  test('Average = plain arithmetic mean, not a circular mean', () => {
    expect(average(DOW_PLANETS.map((p) => p.lon))).toBeCloseTo(DOW_AVERAGE.value, 2);
  });
  test('Average of an empty list is null', () => {
    expect(average([])).toBeNull();
  });
});

describe('scale edge cases', () => {
  test('a price exactly on a 360 boundary starts that block', () => {
    expect(longitudeToPrice(10, 720)).toBe(730);
  });
  test('divisor scales the block back', () => {
    expect(longitudeToPrice(10, 800, { divisor: 2 })).toBeCloseTo(740, 6); // 800/2=400 -> block 360 -> (360+10)*2
  });
  test('wraps longitudes outside 0..360', () => {
    expect(longitudeToPrice(370, 0)).toBe(10);
    expect(longitudeToPrice(-10, 0)).toBe(350);
  });
  test('rejects a zero or negative multiplier or divisor', () => {
    expect(() => priceToDegree(100, { divisor: 0 })).toThrow(RangeError);
    expect(() => longitudeToPrice(10, 100, { multiplier: 0 })).toThrow(RangeError);
    expect(() => longitudeToPrice(10, 100, { multiplier: -1 })).toThrow(RangeError);
  });
});
