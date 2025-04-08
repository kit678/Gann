# custom indicators

*This document contains aggregated content from 8 URLs*

## Table of Contents

1. [Constructor | Advanced Charts Documentation](#constructor-|-advanced-charts-documentation)
2. [PineJS Utility Functions | Advanced Charts Documentation](#pinejs-utility-functions-|-advanced-charts-documentation)
3. [Custom Studies Plots | Advanced Charts Documentation](#custom-studies-plots-|-advanced-charts-documentation)
4. [Custom Studies OHLC Plots | Advanced Charts Documentation](#custom-studies-ohlc-plots-|-advanced-charts-documentation)
5. [Custom Studies Examples | Advanced Charts Documentation](#custom-studies-examples-|-advanced-charts-documentation)
6. [Extending the time scale | Advanced Charts Documentation](#extending-the-time-scale-|-advanced-charts-documentation)
7. [Inputs | Advanced Charts Documentation](#inputs-|-advanced-charts-documentation)
8. [Custom Studies Defaults | Advanced Charts Documentation](#custom-studies-defaults-|-advanced-charts-documentation)


---

## Constructor | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/custom-indicator-constructor*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * Constructor

On this page

# Constructor

## Overviewâ

`constructor` is a required field in the [`CustomIndicator`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomIndicator) object that you should specify to create a [custom indicator](/charting-library-docs/latest/custom_studies/).
    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            {  
                // Indicator object  
                // ...  
                constructor: {  
                    // ...  
                },  
            }  
        ]);  
    },  
    

The field should contain an ES5 constructor function. The library applies the `new` operator to the constructor to create an instance of the custom indicator.

The constructor contains the `main` and `init` methods that accept the following arguments:

  * [`ctx`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext) â context that stores an indicator state. It includes information about the current symbol, resolution, OHLC values of the current bar, and more.
  * `inputs` â an array of input values. Elements in the array are arranged in the same order as [inputs](/charting-library-docs/latest/custom_studies/metainfo/# inputs) in the `metainfo`.

You should implement either both methods or only `main` to calculate indicator data. In your implementation, use mathematical, logical, and technical analysis functions provided in the [`PineJSStd`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd) interface.

## initâ

The [`init`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibraryPineStudy# init) method is **optional**. It is designed to get additional information for an indicator and allows you to initialize variables needed for your data calculations. For example, you can reset a counter with this method. The library calls `init` when the indicator should be calculated from scratch. This can occur when:

  * The indicator is added to the chart.
  * The indicator is added to a new pane.
  * The symbol is changed.
  * The resolution is changed.
  * Additional historical data is loaded.

Consider the following example. You want to display an indicator that compares values between the current symbol and a different one. In this case, the indicator requires data for another symbol. The code sample below shows how to request data for an additional symbol using the [`new_sym`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext# new_sym) method. In this case, requesting data should be done once, therefore, it is implemented within `init`.
    
    
    this.init = function(context, inputCallback) {  
        var symbol = "AAPL";  
        var period = PineJS.Std.period(this._context);  
        context.new_sym(symbol, period);  
    };  
    

## mainâ

The [`main`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibraryPineStudy# main) method is **required** and should contain the main data calculations. The library calls this method for each bar of the [main series](/charting-library-docs/latest/getting_started/glossary# series).

info

If there is more than one series, the library calls `main` for each bar of an additional series first, and then for each bar of the main series.

### Data calculationsâ

As mentioned above, the library calls `main` for each bar of the [main series](/charting-library-docs/latest/getting_started/glossary# series). On each iteration, you can get information about previous bars only. Therefore, when you calculate the tenth bar, you can access values of the bars in the [1..9] range. The library does not provide future bars, and you should not use them in your calculations to avoid unexpected results.

To store data for intermediate calculations, you should create variables using API methods such as [`new_var`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext# new_var) and [`new_unlimited_var`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext# new_unlimited_var). Consider the [Requesting Data for Another Ticker](/charting-library-docs/latest/custom_studies/Custom-Studies-Examples# requesting-data-for-another-ticker) example where the timestamp of the current bar is stored using `new_var`.

### Output valuesâ

As a result, the method should return an indicator value that corresponds to the current bar. An indicator is represented with [plots](/charting-library-docs/latest/custom_studies/metainfo/# plots) specified in `metainfo`. Therefore, you should provide a value for each plot. If there is only one plot, `main` should return a number, for example `10`, or an array with one element â `[10]`. Otherwise, the result is an array where elements are arranged in the same order as plots in `metainfo`. Consider the [OHLC Plots](/charting-library-docs/latest/custom_studies/Custom-Studies-OHLC-Plots) example where four plots get the corresponding open, high, low, and close values.

Values in the array can be one of the following types:

  * Numbers, for example, `[10, 20]`.
  * Objects with the `{ offset: number, value: number, }` structure that allow you to display a value several bars forward or backward from the current bar. For example, `[{ value: 10, offset: 5, }, { value: 20, offset: 10, }]`.

## Exampleâ

The code sample below demonstrates the `constructor` implementation for a simple indicator that plots the close value.
    
    
    constructor: function () {  
        this.main = function (context, inputCallback) {  
            this._context = context;  
            this._input = inputCallback;  
            var symbolClose = PineJS.Std.close(this._context);  
            return [symbolClose];  
        };  
    },  
    


---

## PineJS Utility Functions | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/PineJS-Utility-Functions*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * PineJS Utility Functions

On this page

# PineJS Utility Functions

Custom Study [Constructor](/charting-library-docs/latest/custom_studies/custom-indicator-constructor) is able to use utility functions from PineJS object (an argument of [custom_indicators_getter](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_indicators_getter) function).

## Functions ported from Pineâ

### `na(x)`â

Test value if it's a NaN.

**Returns**

`true` if `x` is not a valid number (`x` is NaN), otherwise `false`.

### `nz(x, y)`â

Replaces NaN values with zeros (or given value) in a series.

**Returns**

`x` if it's a valid (not NaN) number, otherwise y

### `and(expr1, expr2)`â

Logical AND. Applicable to boolean expressions.

**Returns**

Boolean value, or series of boolean values.

### `or(expr1, expr2)`â

Logical OR. Applicable to boolean expressions.

**Returns**

Boolean value, or series of boolean values.

### `not(expr)`â

Logical negation (NOT). Applicable to boolean expressions.

**Returns**

Boolean value, or series of boolean values.

### `max(x1, x2, ..., x10)`â

**Returns**

The greatest of multiple values

### `min(x1, x2, ..., x10)`â

**Returns**

The smallest of multiple given values.

### `pow(base, exponent)`â

Mathematical power function.

**Returns**

`x` raised to the power of `y`. If `x` is a series, it is calculated elementwise.

**Arguments**

  * **`base` (series[float])** Specify the base to use.
  * **`exponent` (float)** Specifies the exponent.

### `abs(x)`â

Absolute value of `x` is `x` if `x >= 0`, or `-x` otherwise.

**Returns**

The absolute value of x

### `log(x)`â

Natural logarithm of any `x > 0` is the unique `y` such that `e^y = x`

**Returns**

The natural logarithm of x.

### `log10(x)`â

Base 10 logarithm of any `x > 0` is the unique `y` such that `10^y = x`

**Returns**

The base 10 logarithm of x.

### `sqrt(x)`â

Square root of any `x >= 0` is the unique `y >= 0` such that `y^2 = x`

**Returns**

The square root of x.

### `sign(x)`â

Sign (signum) of `x` is zero if the `x` is zero, `1.0` if the `x` is greater than zero, `-1.0` if the `x` is less than zero.

**Returns**

The sign of the argument.

### `exp(x)`â

The exp function of `x` is `e^x`, where `x` is the argument and `e` is Euler's number.

**Returns**

A number representing e^x.

### `sin(x)`â

The `sin` function returns the trigonometric sine of an angle.

**Returns**

The trigonometric sine of an angle.

**Arguments**

  * **`x` (series[float])** Angle, in radians.

### `cos(x)`â

The cos function returns the trigonometric cosine of an angle.

**Returns**

The trigonometric cosine of an angle.

**Arguments**

  * **`x` (series[float])** Angle, in radians.

### `tan(x)`â

The tan function returns the trigonometric tangent of an angle.

**Returns**

The trigonometric tangent of an angle.

**Arguments**

  * **`x` (series[float])** Angle, in radians.

### `asin(x)`â

The asin function returns the arcsine (in radians) of number such that `sin(asin(y)) = y` for `y` in range `[-1, 1]`.

**Returns**

The arcsine of a value; the returned angle is in the range `[-Pi/2, Pi/2]`, or na if y is outside of range `[-1, 1]`.

### `acos(x)`â

The acos function returns the arccosine (in radians) of number such that `cos(acos(y)) = y` for `y` in range `[-1, 1]`.

**Returns**

The arc cosine of a value; the returned angle is in the range `[0, Pi]`, or `na` if `y` is outside of range `[-1, 1]`.

### `atan(x)`â

The atan function returns the arctangent (in radians) of number such that `tan(atan(y)) = y` for any `y`.

**Returns**

The arc tangent of a value; the returned angle is in the range `[-Pi/2, Pi/2]`.

### `floor(x)`â

**Returns**

The largest integer less than or equal to the given number.

### `ceil(x)`â

The ceil function returns the smallest (closest to negative infinity) integer that is greater than or equal to the argument.

**Returns**

The smallest integer greater than or equal to the given number.

### `round(x)`â

**Returns**

The value of `x` rounded to the nearest integer, with ties rounding up. If the precision parameter is used, returns a float value rounded to that number of decimal places.

### `avg(x1, x2, ..., x10)`â

Calculates average of all given series (elementwise).

**Returns**

Average.

### `open(context)`â

Current open price.

**Arguments**

  * **`context`** PineJS execution context.

### `high(context)`â

Current high price.

**Arguments**

  * **`context`** PineJS execution context.

### `low(context)`â

Current low price.

**Arguments**

  * **`context`** PineJS execution context.

### `close(context)`â

Close price of the current bar when it has closed, or last traded price of a yet incomplete, realtime bar.

**Arguments**

  * **`context`** PineJS execution context.

### `hl2(context)`â

Is a shortcut for `(high + low)/2`

**Arguments**

  * **`context`** PineJS execution context.

### `hlc3(context)`â

Is a shortcut for (high + low + close)/3

**Arguments**

  * **`context`** PineJS execution context.

### `ohlc4(context)`â

Is a shortcut for (open + high + low + close)/4

**Arguments**

  * **`context`** PineJS execution context.

### `volume(context)`â

Current bar volume.

**Arguments**

  * **`context`** PineJS execution context.

### `period(context)`â

Resolution string, e.g. `60` \- 60 minutes, `D` \- daily, `W` \- weekly, `M` \- monthly, `5D` \- 5 days, `12M` \- one year, `3M` \- one quarter

**Arguments**

  * **`context`** PineJS execution context.

### `tickerid(context)`â

**Arguments**

  * **`context`** PineJS execution context.

### `year(context)`â

Current bar year in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `month(context)`â

Current bar month in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `weekofyear(context)`â

Week number of current bar time in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `dayofmonth(context)`â

Date of current bar time in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `dayofweek(context)`â

Day of week for current bar time in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `hour(context)`â

Current bar hour in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `minute(context)`â

Current bar minute in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `second(context)`â

Current bar second in exchange timezone.

**Arguments**

  * **`context`** PineJS execution context.

### `iff(condition, then, _else)`â

If ... then ... else ...

**Remarks**

`iff` does exactly the same thing as ternary conditional operator `?:` but in a functional style. Also iff is slightly less efficient than operator `?:`

### `rising(series, length)`â

Test if the `series` is now rising for `length` bars long.

**Returns**

`true` if current `x` is greater than any previous `x` for `length` bars back, `false` otherwise.

**Arguments**

  * **`series` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).

### `falling(series, length)`â

Test if the `series` is now falling for `length` bars long.

**Returns**

`true` if current `x` is less than any previous `x` for `length` bars back, `false` otherwise.

**Arguments**

  * **`series` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).

### `rsi(upper, lower)`â

Relative strength index. It is calculated based on rma's of upward and downward change of x.

**Returns**

Relative strength index.

**Arguments**

  * **`upper` (float)** Series of values to process.
  * **`lower` (float)** Number of bars (length).

### `sum(source, length, context)`â

The sum function returns the sliding sum of last y values of x.

**Returns**

Sum of x for y bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `sma(source, length, context)`â

The sma function returns the moving average, that is the sum of last `length` values of `source`, divided by `length`.

**Returns**

Simple moving average of x for y bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `rma(source, length, context)`â

Moving average used in RSI. It is the exponentially weighted moving average with alpha = 1 / length.

**Returns**

Exponential moving average of x with alpha = 1 / y.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `fixnan(current, context)`â

For a given series replaces NaN values with previous nearest non-NaN value.

**Returns**

Series without `na` gaps.

**Arguments**

  * **`current` (series[float])** Series of values to process.
  * **`context`** PineJS execution context.

### `tr(handle_nan, context)`â

**Returns**

True range. It is `max(high - low, abs(high - close[1]), abs(low - close[1]))`

**Arguments**

  * **`handle_nan` (bool)** How NaN values are handled. if `true`, and previous day's close is NaN then `tr` would be calculated as current day high-low. Otherwise (if `false`) `tr` would return NaN in such cases. Also note, that atr uses `tr(true)`.
  * **`context`** PineJS execution context.

### `atr(length, context)`â

Function atr (average true range) returns the RMA of true range. True range is `max(high - low, abs(high - close[1]), abs(low - close[1]))`

**Returns**

Average true range.

**Arguments**

  * **`length` (integer)** Length (number of bars back).
  * **`context`** PineJS execution context.

### `ema(series, length, context)`â

The ema function returns the exponentially weighted moving average. In ema weighting factors decrease exponentially. It calculates by using a formula: `EMA = alpha * x + (1 - alpha) * EMA[1]`, where `alpha = 2 / (y + 1)`

**Returns**

Exponential moving average of x with alpha = 2 / (y + 1)

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `wma(source, length, context)`â

The wma function returns weighted moving average of `source` for `length` bars back. In wma weighting factors decrease in arithmetical progression.

**Returns**

Weighted moving average of `series` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `vwma(source, length, context)`â

The `vwma` function returns volume-weighted moving average of `source` for `length` bars back. It is the same as: `sma(x * volume, y) / sma(volume, y)`

**Returns**

Volume-weighted moving average of `source` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `swma(source, context)`â

Symmetrically weighted moving average with fixed length: 4. Weights: `[1/6, 2/6, 2/6, 1/6]`.

**Returns**

Symmetrically weighted moving average

**Arguments**

  * **`source` (series[float])** Source series.
  * **`context`** PineJS execution context.

### `lowestbars(source, length, context)`â

Lowest value offset for a given number of bars back.

**Returns**

Offset to the lowest bar.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `lowest(source, length, context)`â

Lowest value for a given number of bars back.

**Returns**

Lowest value.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `highestbars(source, length, context)`â

Highest value offset for a given number of bars back.

**Returns**

Offset to the highest bar.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `highest(source, length, context)`â

Highest value for a given number of bars back.

**Returns**

Highest value.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `cum(x, context)`â

Cumulative (total) sum of `x`. In other words it's a sum of all elements of `x`.

**Returns**

Total sum series.

**Arguments**

  * **`x` (series[float])** Series of values to process.
  * **`context`** PineJS execution context.

### `accdist(context)`â

Accumulation/distribution index.

**Arguments**

  * **`context`** PineJS execution context.

### `correlation(source_a, source_b, length, context)`â

Correlation coefficient. Describes the degree to which two series tend to deviate from their `sma` values.

**Returns**

Correlation coefficient.

**Arguments**

  * **`source_a` (series[float])** Source series.
  * **`source_b` (series[float])** Target series.
  * **`length` (integer)** Length (number of bars back).
  * **`context`** PineJS execution context.

### `stoch(source, high, low, length, context)`â

Stochastic. It is calculated by a formula: `100 * (close - lowest(low, length)) / (highest(high, length) - lowest(low, length))`

**Returns**

Stochastic.

**Arguments**

  * **`source` (series[float])** Source series.
  * **`high` (series[float])** Series of high.
  * **`low` (series[float])** Series of low.
  * **`length` (integer)** Length (number of bars back).
  * **`context`** PineJS execution context.

### `tsi(source, short_length, long_length, context)`â

True strength index. It uses moving averages of the underlying momentum of a financial instrument.

**Returns**

True strength index. A value in range [-1, 1]

**Arguments**

  * **`source` (series[float])** Source series.
  * **`short_length` (integer)** Short length.
  * **`long_length` (integer)** Long length.
  * **`context`** PineJS execution context.

### `cross(x, y, context)`â

**Returns**

`true` if two series have crossed each other, otherwise `false`.

**Arguments**

  * **`x` (series[float])** First series.
  * **`y` (series[float])** Second series.
  * **`context`** PineJS execution context.

### `linreg(source, length, offset)`â

Linear regression curve. A line that best fits the prices specified over a user-defined time period. It is calculated using the least squares method. The result of this function is calculated using the formula: `linreg = intercept + slope * (length - 1 - offset)`, where intercept and slope are the values calculated with the least squares method on source series (x argument).

**Returns**

Linear regression curve.

**Arguments**

  * **`source` (series[float])** Source series.
  * **`length` (integer)**
  * **`offset` (integer)** Offset.

### `sar(start, inc, max, context)`â

Parabolic SAR (parabolic stop and reverse) is a method devised by J. Welles Wilder, Jr., to find potential reversals in the market price direction of traded goods.

**Returns**

Parabolic SAR.

**Arguments**

  * **`start` (series[float])** Start.
  * **`inc` (integer)** Increment.
  * **`max` (integer)** Maximum.
  * **`context`** PineJS execution context.

### `alma(series, length, offset, sigma)`â

Arnaud Legoux Moving Average. It uses Gaussian distribution as weights for moving average.

**Returns**

Arnaud Legoux Moving Average.

**Arguments**

  * **`series` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`offset` (float)** Controls tradeoff between smoothness (closer to 1) and responsiveness (closer to 0).
  * **`sigma` (float)** Changes the smoothness of ALMA. The larger sigma the smoother ALMA.

### `change(source)`â

Difference between current value and previous, `x - x[1]`.

**Returns**

The result of subtraction.

**Arguments**

  * **`source` (series[float])**

### `roc(source, length)`â

Function roc (rate of change) showing the difference between current value of `source` and the value of `source` that was `length` days ago. It is calculated by the formula: `100 * change(src, length) / src[length]`.

**Returns**

The rate of change of `source` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).

### `dev(source, length, context)`â

Measure of difference between the series and it's `sma`.

**Returns**

Deviation of `source` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

### `stdev(source, length, context)`â

**Returns**

Standard deviation.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

**Remarks**

This is a biased estimation of standard deviation.

### `variance(source, length, context)`â

Variance is the expectation of the squared deviation of a series from its mean `sma`, and it informally measures how far a set of numbers are spread out from their mean.

**Returns**

Variance of `source` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).
  * **`context`** PineJS execution context.

**Remarks**

This is a biased estimation of sample variance.

### `percentrank(source, length)`â

Percent rank is the percents of how many previous values was less than or equal to the current value of given series.

**Returns**

Percent rank of `source` for `length` bars back.

**Arguments**

  * **`source` (series[float])** Series of values to process.
  * **`length` (integer)** Number of bars (length).

### `dmi(diLength, adxSmoothingLength, context)`â

Calculates the directional movement values +DI, -DI, DX, ADX, and ADXR.

**Returns**

An array of the +DI, -DI, DX, ADX, and ADXR values with `diLength` smoothing for the (+/-)DI values and `adxSmoothingLength` for the ADX value.

**Arguments**

  * **`diLength` (integer)** Number of bars (length) used when calculating the +DI and -DI values.
  * **`adxSmoothingLength` (integer)** Number of bars (length) used when calculating the ADX value.
  * **`context`** PineJS execution context.

## Functions specific to the libraryâ

  * `isZero(number)` \- boolean, shows whether the `number` equals zero or almost zero
  * `toBool(number)` \- boolean, `true` if a number is finite and not equals zero
  * `eq(arg1, arg2)` \- boolean, `true` if argument numbers are equal
  * `neq(arg1, arg2)` \- boolean, `true` if argument numbers are not equal
  * `ge(arg1, arg2)` \- boolean, `true` if first argument number is greater or equal to second
  * `gt(arg1, arg2)` \- boolean, `true` if first argument number is greater than second
  * `le(arg1, arg2)` \- boolean, `true` if first argument number is lesser or equal to second
  * `lt(arg1, arg2)` \- boolean, `true` if first argument is lesser than second
  * `updatetime(context)` \- string, symbol update time
  * `ticker(context)` \- string, symbol name without exchange prefix, e.g. 'MSFT'
  * `interval(context)` \- returns symbol interval string
  * `isdwm(context)` \- boolean, returns `true` if current resolution is a daily or weekly or monthly resolution
  * `isintraday(context)` \- boolean, returns true if current resolution is an intraday (minutes or seconds) resolution
  * `isdaily(context)` \- boolean, returns `true` if current resolution is a daily resolution
  * `isweekly(context)` \- boolean, returns `true` if current resolution is a weekly resolution
  * `ismonthly(context)` \- boolean, returns `true` if current resolution is a monthly resolution
  * `add_days_considering_dst(timezone, utcTime, daysCount)`
  * `selectSessionBreaks(context, times)` \- select session breaks for intraday resolutions only
  * `timepart(symbol, field, time)`
  * `wvap(source, context)`
  * `createNewSessionCheck(context)`
  * `error(message)` \- returns study error with `message` specified
  * `time(context, period)` \- returns UNIX time of current bar



---

## Custom Studies Plots | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/Custom-Studies-Plots*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * Plot Types

On this page

# Custom Studies Plots

When adding a Custom Study to Widget Constructor, you have the possibility to customize the style of each plot.

The `plots` field is located in [metainfo](/charting-library-docs/latest/custom_studies/metainfo/) and contains an array with plots info.

Plot info is an object, it contains required fields `id` and `type`. Also it can contain other fields depending on the type of a plot.

Example:
    
    
    ...  
    plots: [  
        {  
            id: 'plot_0',  
            type: 'line'  
        },  
        {  
            id: 'plot_1',  
            palette: 'palette_0',  
            target: 'plot_0',  
            type: 'colorer'  
        },  
        {  
            id: 'plot_2',  
            type: 'line'  
        },  
    ],  
    

## Arrowsâ

  * `type`\- 'arrows'
  * `visible`\- boolean
  * `colorup`\- string
  * `colordown`\- string

## Charsâ

  * `type`\- 'chars'
  * `visible`\- boolean
  * `char`\- string
  * `location`\- string, one of the following:
    * `AboveBar`
    * `BelowBar`
    * `Top`
    * `Bottom`
    * `Right`
    * `Left`
    * `Absolute`
    * `AbsoluteUp`
    * `AbsoluteDown`
  * `color`\- string
  * `textColor`\- string

## Colorerâ

  * `type`\- 'colorer'
  * `palette`\- string
  * `target`\- string

## DataOffsetâ

  * `type`\- 'dataoffset'
  * `target`\- string

## Lineâ

  * `type`\- 'line'
  * `visible`\- boolean
  * `plottype`\- number, one of the following:
    * `0`\- line
    * `1`\- histogram
    * `3`\- cross
    * `4`\- area
    * `5`\- columns
    * `6`\- circles
    * `7`\- line with breaks
    * `8`\- area with breaks
    * `9`\- step line
  * `color`\- string
  * `linestyle`\- number
  * `linewidth`\- number
  * `trackPrice`\- boolean

## Ohlcâ

  * `type`\- string, can be either `ohlc_open`, `ohlc_high`, `ohlc_low`, or `ohlc_close`
  * `target`\- string
  * `plottype`\- string, can be `ohlc_bars` or `ohlc_candles`
  * `visible`\- boolean
  * `color`\- string

If `plottype: 'ohlc_candles'`, additional fields should be provided:

  * `drawWick`\- boolean
  * `drawBorder`\- boolean
  * `wickColor`\- string
  * `borderColor`\- string

## Shapesâ

  * `type`\- 'shapes'
  * `visible`\- boolean
  * `plottype`\- string, can have following values:
    * `shape_arrow_down`
    * `shape_arrow_up`
    * `shape_circle`
    * `shape_cross`
    * `shape_xcross`
    * `shape_diamond`
    * `shape_flag`
    * `shape_square`
    * `shape_label_down`
    * `shape_label_up`
    * `shape_triangle_down`
    * `shape_triangle_up`
  * `location`\- string, one of the following:
    * `AboveBar`
    * `BelowBar`
    * `Top`
    * `Bottom`
    * `Right`
    * `Left`
    * `Absolute`
    * `AbsoluteUp`
    * `AbsoluteDown`
  * `color`\- string
  * `textColor`\- string

## BarColorerâ

  * `type`\- 'bar_colorer'
  * `palette`\- string

## BgColorerâ

  * `type`\- 'bg_colorer'
  * `palette`\- string

## TextColorerâ

  * `type`\- 'text_colorer'
  * `palette`\- string
  * `target`\- string

## OhlcColorerâ

  * `type`\- 'ohlc_colorer'
  * `palette`\- string
  * `target`\- string



---

## Custom Studies OHLC Plots | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/Custom-Studies-OHLC-Plots*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * OHLC Plots

# Custom Studies OHLC Plots

OHLC plots can be used to create custom OHLC study with candle or bars type.

Firstly, we should add new OHLC plot to the [metainfo](/charting-library-docs/latest/custom_studies/metainfo/), using `ohlcPlots` field:
    
    
    ohlcPlots: {  
        plotcandle_0: {  
            title: 'Plot candle title',  
        },  
    },  
    

`ohlcPlots` is an object, where keys are `plot id` and values are `plots info`. `Plot info` is an object with following fields:

`* - Required`

  * `title`* - string, title of plot that will be used in settings dialog
  * `isHidden`* - boolean
  * `drawBorder` \- boolean
  * `showLast` \- number

Now we need to declare `default` values for this plot (styles etc) in `metainfo`. Depending on the plot type you want to use there might be different schemas of the `default` object.

Example:
    
    
    // ...  
    defaults: {  
        ohlcPlots: {  
            plotcandle_0: {  
                plottype: 'ohlc_candles',  
                borderColor: '# 000000',  
                color: '# 2196F3',  
                drawBorder: true,  
                drawWick: true,  
                visible: true,  
                wickColor: '# 737375',  
            },  
        },  
    },  
    // ...  
    

OHLC plots are 'meta' plots, this means that under the hood there should be a set of simple plots in metainfo `plots` field.

Example:
    
    
    plots: [  
        {  
            id: 'plot_0',  
            type: 'ohlc_open',  
            target: 'plotcandle_0',  
        },  
        {  
            id: 'plot_1',  
            type: 'ohlc_high',  
            target: 'plotcandle_0',  
        },  
        {  
            id: 'plot_2',  
            type: 'ohlc_low',  
            target: 'plotcandle_0',  
        },  
        {  
            id: 'plot_3',  
            type: 'ohlc_close',  
            target: 'plotcandle_0',  
        },  
    ],  
    

The main things here are `type` and `target` fields.

  * `type` field must be one of the following: `ohlc_open`, `ohlc_high`, `ohlc_low` or `ohlc_close`, all four plots for every OHLC plot must be declared here.
  * `target` \- allows you to declare for which OHLC plot this 'simple' plot is. Here you should set an id of the OHLC plot (`plotcandle_0`).

Last but not least you have to return data for plots from your study's `main` function in [constructor](/charting-library-docs/latest/custom_studies/custom-indicator-constructor):
    
    
    this.main = function(context, inputCallback) {  
        this._context = context;  
        this._input = inputCallback;  
      
        var direction = Math.sign(Math.random() - 0.5);  
        var value = Math.random() * 200;  
      
        var open  = value + 8 * direction;  
        var high = value + 15;  
        var low = value - 15;  
        var close = value - 8 * direction;  
      
        return [open, high, low, close];  
    }  
    

Full example:
    
    
    {  
        name: 'OHLC_sample',  
        metainfo: {  
            _metainfoVersion: 51,  
            id: 'OHLC_sample@tv-basicstudies-1',  
            scriptIdPart: '',  
            description: 'OHLC_sample',  
            shortDescription: 'OHLC_sample',  
            is_hidden_study: false,  
            is_price_study: false,  
            isCustomIndicator: true,  
            plots: [  
                {  
                    id: 'plot_0',  
                    type: 'ohlc_open',  
                    target: 'plotcandle_0',  
                },  
                {  
                    id: 'plot_1',  
                    type: 'ohlc_high',  
                    target: 'plotcandle_0',  
                },  
                {  
                    id: 'plot_2',  
                    type: 'ohlc_low',  
                    target: 'plotcandle_0',  
                },  
                {  
                    id: 'plot_3',  
                    type: 'ohlc_close',  
                    target: 'plotcandle_0',  
                },  
            ],  
      
            ohlcPlots: {  
                plotcandle_0: {  
                    title: 'Plot candle title',  
                },  
            },  
      
            defaults: {  
                ohlcPlots: {  
                    plotcandle_0: {  
                    borderColor: '# 000000',  
                        color: '# 2196F3',  
                        drawBorder: true,  
                        drawWick: true,  
                        plottype: 'ohlc_candles', // might be 'ohlc_bars' for bars  
                        visible: true,  
                        wickColor: '# 737375',  
                    },  
                },  
                precision: 4,  
                inputs: {},  
            },  
            styles: {},  
            inputs: [],  
        },  
        constructor: function() {  
            this.main = function(context, inputCallback) {  
                this._context = context;  
                this._input = inputCallback;  
      
                var direction = Math.sign(Math.random() - 0.5);  
                var value = Math.random() * 200;  
      
                var open  = value + 8 * direction;  
                var high = value + 15;  
                var low = value - 15;  
                var close = value - 8 * direction;  
      
                return [open, high, low, close];  
            }  
        }  
    }  
    


---

## Custom Studies Examples | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/Custom-Studies-Examples*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * Examples

On this page

# Custom Studies Examples

## Requesting Data for Another Tickerâ

  1. Come up with a new ticker name to display your data and set up your server to return valid SymbolInfo for this new ticker.
  2. Also, set up the server to return valid historical data for this ticker.
  3. Add [custom_indicators_getter](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_indicators_getter) key to the widget constructor. Its value is a function that returns a Promise object with a list of custom indicators.
  4. _(Optional)_ Update your widget's initialization code to [create](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) this indicator when the chart is ready.

  * JavaScript
  * TypeScript

    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            {  
                name: 'Equity',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    id: 'Equity@tv-basicstudies-1',  
                    description: 'Equity',  
                    shortDescription: 'Equity',  
                    is_price_study: true,  
                    isCustomIndicator: true,  
                    format: {  
                        type: 'price',  
                        // Precision is set to one digit, e.g. 777.7  
                        precision: 1,  
                    },  
      
                    plots: [{id: 'plot_0', type: 'line'}],  
                    defaults: {  
                        styles: {  
                            plot_0: {  
                                linestyle: 0,  
                                visible: true,  
      
                                // Make the line thinner  
                                linewidth: 1,  
      
                                // Plot type is Line  
                                plottype: 2,  
      
                                // Show price line  
                                trackPrice: true,  
      
                                // Set the plotted line color to dark red  
                                color: '# 880000'  
                            }  
                        },  
      
                        inputs: {}  
                    },  
                    styles: {  
                        plot_0: {  
                            // Output name will be displayed in the Style window  
                            title: 'Equity value',  
                            histogramBase: 0,  
                        }  
                    },  
                    inputs: [],  
                },  
      
                constructor: function() {  
                    this.init = function(context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        // Define the symbol to be plotted.  
                        // Symbol should be a string.  
                        // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.  
                        // For example,  
                        //    var symbol = 'AAPL';  
                        //    var symbol = '# EQUITY';  
                        //    var symbol = PineJS.Std.ticker(this._context) + '# TEST';  
                        const symbol = '# EQUITY'; // # EQUITY should be replaced with the symbol you want to resolve  
                        this._context.new_sym(symbol, PineJS.Std.period(this._context));  
                    };  
      
                    this.main = function(context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
                        // Select the main symbol  
                        this._context.select_sym(0);  
                        const mainSymbolTime = this._context.new_var(this._context.symbol.time);  
      
                        // Select the secondary symbol  
                        this._context.select_sym(1);  
                        const secondarySymbolTime = this._context.new_var(this._context.symbol.time);  
      
                        // Align the times of the secondary symbol to the main symbol  
                        const secondarySymbolClose  = this._context.new_var(PineJS.Std.close(this._context));  
                        const alignedClose = secondarySymbolClose.adopt(secondarySymbolTime, mainSymbolTime, 1);  
      
                        // Select the main symbol again  
                        this._context.select_sym(0);  
      
                        return [alignedClose];  
                    }  
                }  
            }  
        ]);  
    },  
    
    
    
    /* Within the Widget constructor options */  
    custom_indicators_getter: PineJS => {  
        return Promise.resolve<CustomIndicator[]>([  
      
            /* Requesting data for another ticker */  
            {  
                name: 'Equity',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    id: 'Equity@tv-basicstudies-1' as RawStudyMetaInfoId,  
                    description: 'Equity',  
                    shortDescription: 'Equity',  
                    is_price_study: true,  
                    isCustomIndicator: true,  
                    format: {  
                        type: 'price',  
                        // Precision is set to one digit, e.g. 777.7  
                        precision: 1,  
                    },  
      
                    plots: [{ id: 'plot_0', type: StudyPlotType.Line }],  
                    defaults: {  
                        styles: {  
                            plot_0: {  
                                linestyle: 0,  
                                visible: true,  
      
                                // Make the line thinner  
                                linewidth: 1,  
      
                                // Plot type is Line  
                                plottype: 2 as StudyLinePlotPreferences['plottype'],  
      
                                // Show price line  
                                trackPrice: true,  
      
                                // Set the plotted line color to dark red  
                                color: '# 880000',  
                            },  
                        },  
      
                        inputs: {},  
                    },  
                    styles: {  
                        plot_0: {  
                            // Output name will be displayed in the Style window  
                            title: 'Equity value',  
                            histogramBase: 0,  
                        },  
                    },  
                    inputs: [],  
                },  
      
                constructor: function (  
                    this: LibraryPineStudy<IPineStudyResult>  
                ) {  
                    this.init = function (context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        const symbol = '# EQUITY'; // # EQUITY should be replaced with the symbol you want to resolve  
                        this._context.new_sym(  
                            symbol,  
                            PineJS.Std.period(this._context)  
                        );  
                    };  
      
                    this.main = function (context, inputCallback) {  
                           this._context = context;  
                        this._input = inputCallback;  
                        // Select the main symbol  
                        this._context.select_sym(0);  
                        const mainSymbolTime = this._context.new_var(this._context.symbol.time);  
      
                        // Select the secondary symbol ("# EQUITY")  
                        this._context.select_sym(1);  
                        const secondarySymbolTime = this._context.new_var(this._context.symbol.time);  
      
                        // Align the times of the secondary symbol to the main symbol  
                        const secondarySymbolClose  = this._context.new_var(PineJS.Std.close(this._context));  
                        const alignedClose = secondarySymbolClose.adopt(secondarySymbolTime, mainSymbolTime, 1);  
      
                        // Select the main symbol again  
                        this._context.select_sym(0);  
      
                        return [alignedClose];  
                    };  
                },  
            },  
        ]);  
    },  
    

## Coloring Barsâ

![/img/bar_colorer.png](data:image/png;base64,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)

  * JavaScript
  * TypeScript

    
    
    custom_indicators_getter: function (PineJS) {  
        return Promise.resolve([  
            {  
                name: 'Bar Colorer Demo',  
                metainfo: {  
                    _metainfoVersion: 51,  
      
                    id: "BarColoring@tv-basicstudies-1",  
                    name: "BarColoring",  
                    description: "Bar Colorer Demo",  
                    shortDescription: "Bar Coloring",  
      
                    isCustomIndicator: true,  
                    is_price_study: true,  
      
                    format: {  
                        type: 'price',  
                        precision: 4,  
                    },  
      
                    defaults: {  
                        palettes: {  
                            palette_0: {  
                                // palette colors  
                                // change it to the default colors that you prefer,  
                                // but note that the user can change them in the Style tab  
                                // of indicator properties  
                                colors: [  
                                    { color: '# FFFF00' },  
                                    { color: '# 0000FF' }  
                                ]  
                            }  
                        }  
                    },  
                    inputs: [],  
                    plots: [{  
                        id: 'plot_0',  
      
                        // plot type should be set to 'bar_colorer'  
                        type: 'bar_colorer',  
      
                        // this is the name of the palette that is defined  
                        // in 'palettes' and 'defaults.palettes' sections  
                        palette: 'palette_0'  
                    }],  
                    palettes: {  
                        palette_0: {  
                            colors: [  
                                { name: 'Color 0' },  
                                { name: 'Color 1' }  
                            ],  
      
                            // the mapping between the values that  
                            // are returned by the script and palette colors  
                            valToIndex: {  
                                100: 0,  
                                200: 1  
                            }  
                        }  
                    }  
                },  
                constructor: function() {  
                    this.main = function(context, input) {  
                        this._context = context;  
                        this._input = input;  
      
                        var valueForColor0 = 100;  
                        var valueForColor1 = 200;  
      
                        // perform your calculations here and return one of the constants  
                        // that is specified as a key in 'valToIndex' mapping  
                        var result =  
                            Math.random() * 100 % 2 > 1 ? // we randomly select one of the color values  
                                valueForColor0 : valueForColor1;  
      
                        return [result];  
                    }  
                }  
            }  
        ]);  
    },  
    
    
    
    /* Within the Widget constructor options */  
    custom_indicators_getter: PineJS => {  
        return Promise.resolve<CustomIndicator[]>([  
      
            /* Coloring bars */  
            {  
                name: 'Bar Colorer Demo',  
                metainfo: {  
                    _metainfoVersion: 51,  
      
                    id: 'BarColoring@tv-basicstudies-1' as RawStudyMetaInfoId,  
                    name: 'BarColoring',  
                    description: 'Bar Colorer Demo',  
                    shortDescription: 'BarColoring',  
      
                    isCustomIndicator: true,  
                    is_price_study: true,  
      
                    format: {  
                        type: 'price',  
                        precision: 4,  
                    },  
      
                    defaults: {  
                        palettes: {  
                            palette_0: {  
                                // palette colors  
                                // change it to the default colors that you prefer,  
                                // but note that the user can change them in the Style tab  
                                // of indicator properties  
                                colors: [{ color: '# FFFF00' }, { color: '# 0000FF' }],  
                            },  
                        },  
                    },  
                    inputs: [],  
                    plots: [  
                        {  
                            id: 'plot_0',  
      
                            // plot type should be set to 'bar_colorer'  
                            type: StudyPlotType.BarColorer,  
      
                            // this is the name of the palette that is defined  
                            // in 'palettes' and 'defaults.palettes' sections  
                            palette: 'palette_0',  
                        },  
                    ],  
                    palettes: {  
                        palette_0: {  
                            colors: [{ name: 'Color 0' }, { name: 'Color 1' }],  
      
                            // the mapping between the values that  
                            // are returned by the script and palette colors  
                            valToIndex: {  
                                100: 0,  
                                200: 1,  
                            },  
                        },  
                    },  
                },  
                constructor: function (  
                    this: LibraryPineStudy<IPineStudyResult>  
                ) {  
                    this.main = function (context, input) {  
                        this._context = context;  
                        this._input = input;  
      
                        const valueForColor0 = 100;  
                        const valueForColor1 = 200;  
      
                        // perform your calculations here and return one of the constants  
                        // that is specified as a key in 'valToIndex' mapping  
                        const result =  
                            (Math.random() * 100) % 2 > 1 // we randomly select one of the color values  
                                ? valueForColor0  
                                : valueForColor1;  
      
                        return [result];  
                    };  
                },  
            },  
        ]);  
    },  
    

## Custom Styles for Every Pointâ

![/img/custom_styles_for_every_point.png](/charting-library-docs/assets/images/custom_styles_for_every_point-417160519d071500e84be1dacf63e2c4.png)

  * JavaScript
  * TypeScript

    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            {  
                name: 'Custom Styles For Every Point',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    id: 'CustomStylesForEveryPoint@tv-basicstudies-1',  
                    description: 'Custom Styles For Every Point',  
                    shortDescription: 'Custom Styles For Every Point',  
                    is_price_study: false,  
                    isCustomIndicator: true,  
                    plots: [  
                        {  
                            'id': 'plot_0',  
                            'type': 'line',  
                        },  
                        {  
                            'id': 'plot_1',  
                            'type': 'colorer',  
                            'target': 'plot_0',  
                            'palette': 'paletteId1',  
                        },  
                    ],  
                    palettes: {  
                        paletteId1: {  
                            colors: {  
                                0: {  
                                        name: 'First color',  
                                },  
                                1: {  
                                        name: 'Second color',  
                                },  
                            },  
                        },  
                    },  
                    defaults: {  
                        palettes: {  
                            paletteId1: {  
                                colors: {  
                                    0: {  
                                        color: 'red',  
                                        width: 1,  
                                        style: 0,  
                                    },  
                                    1: {  
                                        color: 'blue',  
                                        width: 3,  
                                        style: 1,  
                                    },  
                                },  
                            },  
                        },  
                        styles: {},  
                        precision: 4,  
                        inputs: {},  
                    },  
                    styles: {  
                        plot_0: {  
                            title: 'Equity value',  
                            histogramBase: 0,  
                        },  
                    },  
                    inputs: [],  
                    format: {  
                        type: 'price',  
                        precision: 4,  
                    },  
                },  
                constructor: function() {  
                    this.main = function(context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        const value = Math.random() * 200;  
                        const colorIndex = value > 100 ? 0 : 1;  
      
                        return [value, colorIndex];  
                    }  
                }  
            }  
        ]);  
    },  
    
    
    
    /* Within the Widget constructor options */  
    custom_indicators_getter: PineJS => {  
        return Promise.resolve<CustomIndicator[]>([  
      
            /* Custom styles for every point */  
           {  
                name: 'Custom Styles For Every Point',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    id: 'CustomStylesForEveryPoint@tv-basicstudies-1' as RawStudyMetaInfoId,  
                    description: 'Custom Styles For Every Point',  
                    shortDescription: 'Custom Styles For Every Point',  
                    is_price_study: false,  
                    isCustomIndicator: true,  
                    plots: [  
                        {  
                            id: 'plot_0',  
                            type: StudyPlotType.Line,  
                        },  
                        {  
                            id: 'plot_1',  
                            type: StudyPlotType.Colorer,  
                            target: 'plot_0',  
                            palette: 'paletteId1',  
                        },  
                    ],  
                    palettes: {  
                        paletteId1: {  
                            colors: {  
                                0: {  
                                    name: 'First color',  
                                },  
                                1: {  
                                    name: 'Second color',  
                                },  
                            },  
                        },  
                    },  
                    defaults: {  
                        palettes: {  
                            paletteId1: {  
                                colors: {  
                                    0: {  
                                        color: 'red',  
                                        width: 1,  
                                        style: 0,  
                                    },  
                                    1: {  
                                        color: 'blue',  
                                        width: 3,  
                                        style: 1,  
                                    },  
                                },  
                            },  
                        },  
                        styles: {},  
                        precision: 4,  
                        inputs: {},  
                    },  
                    styles: {  
                        plot_0: {  
                            title: 'Equity value',  
                            histogramBase: 0,  
                        },  
                    },  
                    inputs: [],  
                    format: {  
                        type: 'price',  
                        precision: 4,  
                    },  
                },  
                constructor: function (  
                    this: LibraryPineStudy<IPineStudyResult>  
                ) {  
                    this.main = function (context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        const value = Math.random() * 200;  
                        const colorIndex = value > 100 ? 0 : 1;  
      
                        return [value, colorIndex];  
                    };  
                },  
            },  
        ]);  
    },  
    

## Complex Filled Areasâ

See the Pen [ Complex Filled Areas](https://codepen.io/tradingview/pen/mdYEjdW) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Advanced Shapes Useâ

![/img/advanced_shapes_use.png](/charting-library-docs/assets/images/advanced_shapes_use-64e071e8f356ff318f548fe27e21169b.png)

  * JavaScript
  * TypeScript

    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            {  
                name: 'Mondays',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    defaults: {  
                        styles: {  
                            plot_0: {  
                                color: '# FF5252',  
                                textColor: '# 2196F3',  
                                plottype: 'shape_circle',  
                                location: 'Bottom',  
                                visible: true  
                            }  
                        },  
                        inputs: {}  
                    },  
                    plots: [  
                        {  
                            id: 'plot_0',  
                            type: 'shapes'  
                        }  
                    ],  
                    styles: {  
                        plot_0: {  
                            isHidden: false,  
                            location: 'Bottom',  
                            text: 'Monday',  
                            title: 'Shapes'  
                        }  
                    },  
                    description: 'Mondays',  
                    shortDescription: 'Mondays',  
                    is_price_study: true,  
                    inputs: [],  
                    id: 'Mondays@tv-basicstudies-1',  
                    format: {  
                        type: 'inherit',  
                    },  
                },  
                constructor: function() {  
                    this.main = function(context, inputCallback) {  
                        // If we don't have a time, then we cannot determine the day of week  
                        if (isNaN(context.symbol.time)) {  
                            return [NaN]  
                        }  
      
                        // Check if the day of the week is Monday  
                        const dayofweek = PineJS.Std.dayofweek(context);  
                        const shouldBeShapeVisible = dayofweek === 2;  
                        // 1 is plot value, it'll be displayed in legend of the indicator  
                        // NaN means that there is no value for that plot and shape should be hidden for that bar  
                        const plotValue = shouldBeShapeVisible ? 1 : NaN;  
                        return [plotValue];  
                    }  
                }  
            },  
        ]);  
    },  
    
    
    
    /* Within the Widget constructor options */  
    custom_indicators_getter: PineJS => {  
        return Promise.resolve<CustomIndicator[]>([  
      
           /* Advanced Shapes use */  
            {  
                name: 'Mondays',  
                metainfo: {  
                    _metainfoVersion: 51,  
                    defaults: {  
                        styles: {  
                            plot_0: {  
                                color: '# FF5252',  
                                textColor: '# 2196F3',  
                                plottype: 'shape_circle' as StudyShapesPlotPreferences['plottype'],  
                                location: 'Bottom' as StudyShapesPlotPreferences['location'],  
                                visible: true  
                            }  
                        },  
                        inputs: {},  
                    },  
                    plots: [  
                        {  
                            id: 'plot_0',  
                            type: StudyPlotType.Shapes,  
                        },  
                    ],  
                    styles: {  
                        plot_0: {  
                            isHidden: false,  
                            location: 'Bottom' as StudyShapesPlotPreferences['location'],  
                            plottype: 'shape_circle' as StudyShapesPlotPreferences['plottype'],  
                            text: 'Monday',  
                            title: 'Shapes',  
                        },  
                    },  
                    description: 'Mondays',  
                    shortDescription: 'Mondays',  
                    is_price_study: true,  
                    inputs: [],  
                    id: 'Mondays@tv-basicstudies-1' as RawStudyMetaInfoId,  
                    format: {  
                        type: 'inherit',  
                    },  
                },  
                constructor: function (  
                    this: LibraryPineStudy<IPineStudyResult>  
                ) {  
                    this.main = function (context, inputCallback) {  
                        // If we don't have a time, then we cannot determine the day of week  
                        if (isNaN(context.symbol.time)) {  
                            return [NaN]  
                        }  
      
                        // Check if the day of the week is Monday  
                        const dayofweek = PineJS.Std.dayofweek(context);  
                        const shouldBeShapeVisible = dayofweek === 2;  
                        // 1 is plot value, it'll be displayed in legend of the indicator  
                        // NaN means that there is no value for that plot and shape should be hidden for that bar  
                        const plotValue = shouldBeShapeVisible ? 1 : NaN;  
                        return [plotValue];  
                    };  
                },  
            },  
        ]);  
    },  
    

## Advanced Colouring Candlesâ

![/img/colouring_candles.png](/charting-library-docs/assets/images/colouring_candles-585dac0a7e311183c0a7b92c23771aa8.png)

  * JavaScript
  * TypeScript

    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            {  
                name: 'Advanced Coloring Candles',  
                metainfo: {  
                    _metainfoVersion: 51,  
      
                    id: 'advancedcolouringcandles@tv-basicstudies-1',  
                    name: 'Advanced Coloring Candles',  
                    description: 'Advanced Coloring Candles',  
                    shortDescription: 'Advanced Coloring Candles',  
      
                    isCustomIndicator: true,  
      
                    is_price_study: false, // whether the study should appear on the main series pane.  
                    linkedToSeries: true, // whether the study price scale should be the same as the main series one.  
      
                    format: {  
                        type: 'price',  
                        precision: 2,  
                    },  
      
                    plots: [  
                        {  
                            id: 'plot_open',  
                            type: 'ohlc_open',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_high',  
                            type: 'ohlc_high',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_low',  
                            type: 'ohlc_low',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_close',  
                            type: 'ohlc_close',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_bar_color',  
                            type: 'ohlc_colorer',  
                            palette: 'palette_bar',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_wick_color',  
                            type: 'wick_colorer',  
                            palette: 'palette_wick',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_border_color',  
                            type: 'border_colorer',  
                            palette: 'palette_border',  
                            target: 'plot_candle',  
                        },  
                    ],  
      
                    palettes: {  
                        palette_bar: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                        palette_wick: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                        palette_border: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                    },  
      
                    ohlcPlots: {  
                        plot_candle: {  
                            title: 'Candles',  
                        },  
                    },  
      
                    defaults: {  
                        ohlcPlots: {  
                            plot_candle: {  
                                borderColor: '# 000000',  
                                color: '# 000000',  
                                drawBorder: true,  
                                drawWick: true,  
                                plottype: 'ohlc_candles',  
                                visible: true,  
                                wickColor: '# 000000',  
                            },  
                        },  
      
                        palettes: {  
                            palette_bar: {  
                                colors: [  
                                    { color: '# 1948CC', width: 1, style: 0 },  
                                    { color: '# F47D02', width: 1, style: 0 },  
                                ],  
                            },  
                            palette_wick: {  
                                colors: [  
                                    { color: '# 0C3299', },  
                                    { color: '# E65000', },  
                                ],  
                            },  
                            palette_border: {  
                                colors: [  
                                    { color: '# 5B9CF6', },  
                                    { color: '# FFB74D', },  
                                ],  
                            },  
                        },  
      
                        precision: 2,  
                        inputs: {},  
                    },  
                    styles: {},  
                    inputs: [],  
                },  
                constructor: function () {  
                    this.main = function (context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        this._context.select_sym(0);  
      
                        const o = PineJS.Std.open(this._context);  
                        const h = PineJS.Std.high(this._context);  
                        const l = PineJS.Std.low(this._context);  
                        const c = PineJS.Std.close(this._context);  
      
                        // Color is determined randomly  
                        const colour = Math.round(Math.random());  
                        return [o, h, l, c, colour /*bar*/, colour /*wick*/, colour /*border*/];  
                    };  
                },  
            },  
        ]);  
    },  
    
    
    
    /* Within the Widget constructor options */  
    custom_indicators_getter: PineJS => {  
        return Promise.resolve<CustomIndicator[]>([  
      
           /* Advanced Colouring Candles */  
            {  
                name: 'Advanced Coloring Candles',  
                metainfo: {  
                    _metainfoVersion: 51,  
      
                    id: 'advancedcolouringcandles@tv-basicstudies-1' as RawStudyMetaInfoId,  
                    name: 'Advanced Coloring Candles',  
                    description: 'Advanced Coloring Candles',  
                    shortDescription: 'Advanced Coloring Candles',  
      
                    isCustomIndicator: true,  
      
                    is_price_study: false, // whether the study should appear on the main series pane.  
                    linkedToSeries: true, // whether the study price scale should be the same as the main series one.  
      
                    format: {  
                        type: 'price',  
                        precision: 2,  
                    },  
      
                    plots: [  
                        {  
                            id: 'plot_open',  
                            type: StudyPlotType.OhlcOpen,  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_high',  
                            type: StudyPlotType.OhlcHigh,  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_low',  
                            type: StudyPlotType.OhlcLow,  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_close',  
                            type: StudyPlotType.OhlcClose,  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_bar_color',  
                            type: StudyPlotType.OhlcColorer,  
                            palette: 'palette_bar',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_wick_color',  
                            type: StudyPlotType.CandleWickColorer,  
                            palette: 'palette_wick',  
                            target: 'plot_candle',  
                        },  
                        {  
                            id: 'plot_border_color',  
                            type: StudyPlotType.CandleBorderColorer,  
                            palette: 'palette_border',  
                            target: 'plot_candle',  
                        },  
                    ],  
      
                    palettes: {  
                        palette_bar: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                        palette_wick: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                        palette_border: {  
                            colors: [{ name: 'Colour One' }, { name: 'Colour Two' }],  
      
                            valToIndex: {  
                                0: 0,  
                                1: 1,  
                            },  
                        },  
                    },  
      
                    ohlcPlots: {  
                        plot_candle: {  
                            title: 'Candles',  
                        },  
                    },  
      
                    defaults: {  
                        ohlcPlots: {  
                            plot_candle: {  
                                borderColor: '# 000000',  
                                color: '# 000000',  
                                drawBorder: true,  
                                drawWick: true,  
                                plottype: OhlcStudyPlotStyle.OhlcCandles,  
                                visible: true,  
                                wickColor: '# 000000',  
                            },  
                        },  
      
                        palettes: {  
                            palette_bar: {  
                                colors: [  
                                    { color: '# 1948CC', width: 1, style: 0 },  
                                    { color: '# F47D02', width: 1, style: 0 },  
                                ],  
                            },  
                            palette_wick: {  
                                colors: [{ color: '# 0C3299' }, { color: '# E65000' }],  
                            },  
                            palette_border: {  
                                colors: [{ color: '# 5B9CF6' }, { color: '# FFB74D' }],  
                            },  
                        },  
      
                        precision: 2,  
                        inputs: {},  
                    },  
                    styles: {},  
                    inputs: [],  
                },  
                constructor: function (  
                    this: LibraryPineStudy<IPineStudyResult>  
                ) {  
                    this.main = function (context, inputCallback) {  
                        this._context = context;  
                        this._input = inputCallback;  
      
                        this._context.select_sym(0);  
      
                        const o = PineJS.Std.open(this._context);  
                        const h = PineJS.Std.high(this._context);  
                        const l = PineJS.Std.low(this._context);  
                        const c = PineJS.Std.close(this._context);  
      
                        // Color is determined randomly  
                        const colour = Math.round(Math.random());  
                        return [  
                            o,  
                            h,  
                            l,  
                            c,  
                            colour /*bar*/,  
                            colour /*wick*/,  
                            colour /*border*/,  
                        ];  
                    };  
                },  
            },  
        ]);  
    },  
    


---

## Extending the time scale | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * Extending time scale

On this page

# Extending the time scale

The tick marks on the [time scale](/charting-library-docs/latest/ui_elements/Time-Scale) are defined by the times in the main series.

Most studies calculate their values from the bars of the main series. The simplest example of this is the Volume study - each bar of the main series has a volume associated with it and the Volume study simply shows that volume at the same time point as the bar. Because of this it is natural that the times of study values correspond 1-to-1 with the times of the main series.

For example, on the chart of weekly data, you can see there is one Volume bar for each bar of the main series.

![Image of a simple volume study on a chart](/charting-library-docs/assets/images/simple_volume_example-03337eaa5c58a4c4652e58e2a30ee4fe.png)

## Mapping timesâ

In some cases a study needs to calculate its values from a series of bars that are not the same as the main series. In this case it is necessary to map each study value to the time of one of the main series' bars.

Consider the example of the built-in Moving Average study. You can provide a symbol input that is different to the symbol of the main study. The library will resolve and then use this input to calculate the Moving Average.

The chart below has a symbol "A" for the main series and a Moving Average study for symbol "B". You can see 5 daily bars from 2022-12-26 to 2022-12-31.

![Image of a moving average study on a chart](/charting-library-docs/assets/images/moving_average_adopt_example-99daf3779e01381cf21ca28ceb7ddb2a.png)

Although you cannot tell by looking at the chart in this example the symbol B actually has more bars than symbol A: symbol A is missing a bar for 2022-12-29.

A time| B time| Shown on chart?  
---|---|---  
2022-12-26| 2022-12-26| Yes  
2022-12-27| 2022-12-27| Yes  
2022-12-28| 2022-12-28| Yes  
| 2022-12-29| No  
2022-12-30| 2022-12-30| Yes  
2022-12-31| 2022-12-31| Yes  
  
By default studies can only display data at a time point on the chart if the main series has a bar at that time point. This is done by mapping (or "adopting") the values of the study that correspond to a time in the main series. There are two ways of mapping times from one series to another: precise and continuous.

### Precise mappingâ

Precise mapping means that each bar time of the main series will be mapped to at most once.

Main series time| Study time| Study value| Displayed value  
---|---|---|---  
2023-01-01| 2022-01-01| 1.11| 1.11  
2023-01-02| 2022-01-02| 1.50| 1.50  
| 2022-01-02| 2.30|   
2023-01-03| 2022-01-03| 3.00| 3.00  
  
### Continuous mappingâ

Continuous mapping means that each main series bar time may be mapped to more than once. If the study time does not exist in the main series then the closest time greater than the study time is used.

Main series time| Study time| Study value| Displayed value  
---|---|---|---  
2023-01-01| 2022-01-01| 1.11| 1.11  
2023-01-02| 2022-01-02| 1.50| 1.50  
| 2022-01-02| 2.30| 3.00  
2023-01-03| 2022-01-03| 3.00| 3.00  
  
## Extending the time scale featureâ

There is a feature that allows studies to define their points on a time scale. For studies that use this feature, the restriction that the time exists in the main series is removed. This allows you to create custom studies that show bars at a higher resolution than the main series. For example, you can create a study showing the weekly average of a monthly symbol.

  * Monthly symbol and a weekly study on the chart
  * Monthly symbol on the chart

![Image of a monthly symbol and a weekly study on a chart](/charting-library-docs/assets/images/extended_time_scale_example-17b3441c006b77c1567e655f6f512eac.png)

![Image of a monthly symbol on the chart](/charting-library-docs/assets/images/non_extended_time_scale_example-eb0b2622e5fe5d062518716db00eaa3f.png)

There are two options available to enable the time scale extension feature:

  * for any custom study
  * for the Overlay study only

### For any custom studyâ

To enable the feature for any [custom study](/charting-library-docs/latest/custom_studies/), follow the steps below.

  1. Enable the [`studies_extend_time_scale`](/charting-library-docs/latest/customization/Featuresets# studies_extend_time_scale) featureset.
  2. Add `canExtendTimeScale: true` to the study's [metainfo](/charting-library-docs/latest/custom_studies/metainfo/).

In the example below, if a symbol input is chosen that contains more bars than the main series, the time scale will be extended to show those extra bars. Note that the example will resolve the other symbol with the same resolution as the main series. However, you can customize it by changing the resolution parameter.
    
    
    {  
        name: 'Extend Time Scale Example',  
        metainfo: {  
            id: 'Extend Time Scale Example@tv-basicstudies-1',  
            name: 'Extend Time Scale Example',  
            _metainfoVersion: 51,  
            description: 'Extend Time Scale Example',  
            shortDescription: 'Extend Time Scale Example',  
            is_price_study: true,  
            defaults: {  
                styles: {  
                    plot_0: {  
                        plottype: 0,  
                        visible: true,  
                        color: 'orange'  
                    },  
                },  
                inputs: {  
                    symbol: '',  
                }  
            },  
            plots: [{  
                id: 'plot_0',  
                type: 'line'  
            }],  
            styles: {  
                plot_0: {  
                    title: 'Plot',  
                },  
            },  
            inputs: [  
                {  
                    id: 'symbol',  
                    name: 'Other Symbol',  
                    type: 'symbol',  
                },  
            ],  
            format: { type: 'inherit' },  
            canExtendTimeScale: true, // important!  
        },  
        constructor:  
            function () {  
                this.init = function (ctx, inputCallback) {  
                    this._context = ctx;  
      
                    var symbol = inputCallback(0);  
                    if (symbol !== '') {  
                        const resolution = PineJS.Std.period(this._context);  
                        this._context.new_sym(symbol, resolution);  
                    }  
                }  
      
                this.main = function (ctx, inputCallback) {  
                    this._context = ctx;  
                    this._input = inputCallback;  
      
                    var symbol = inputCallback(0);  
      
                    if (symbol !== '') {  
                        this._context.select_sym(1);  
                    }  
      
                    var close = this._context.new_var(PineJS.Std.close(this._context));  
      
                    return [close];  
                };  
            }  
    }  
    

### For Overlay studyâ

The library includes the built-in Overlay study, which allows you to display multiple symbols on a single chart for easy comparison. To make [compared symbols](/charting-library-docs/latest/ui_elements/indicators/# add-and-compare-new-series) extend the time scale, enable the [`secondary_series_extend_time_scale`](/charting-library-docs/latest/customization/Featuresets# secondary_series_extend_time_scale) featureset. This featureset only applies to the Overlay study and enables the _Allow extend time scale_ option within the _Compare symbol_ dialog.

For example, when comparing BTCUSD to AAPL, you can see the points on the time scale where only BTCUSD has data. The image below shows that the upper chart allows the Overlay study to extend the time scale, while the bottom chart does not.

![Extending time scale when comparing BTCUSD with AAPL](/charting-library-docs/assets/images/extended-time-scale-for-overlay-c0e98b44b9386e2d1da4e876280d0add.png)


---

## Inputs | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/metainfo/Custom-Studies-Inputs*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/)
  * Inputs

On this page

# Inputs

## Overviewâ

When you create a [custom indicator](/charting-library-docs/latest/custom_studies/), you can make some indicator parameters variable and allow users to adjust them in the UI. Such parameters are called **input parameters** or **inputs**. Users should provide values for the input parameters in the _Inputs_ tab of the indicator settings dialog. Then, these values will be used in the indicator calculations.

For example, a custom indicator can accept a [source symbol](/charting-library-docs/latest/getting_started/glossary# source-symbol) and length as input parameters.

![Inputs tab](/charting-library-docs/assets/images/inputs-custom-indicator-3bea3a4208fb6aa48883cd1fd9e4549f.png)

To enable input parameters, you should take the following steps:

  1. Define a list of input parameters
  2. Specify default values
  3. Handle input values in the constructor

## Define a list of input parametersâ

To define a list of input parameters, you should assign an array of objects to the [`inputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo# inputs) property in [`StudyMetaInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studymetainfo).
    
    
    custom_indicators_getter: function(PineJS) {  
        return Promise.resolve([  
            // Indicator object  
            {  
                // Define indicator metadata  
                metainfo: {  
                    /* Other StudyMetaInfo properties */  
      
                    // Define input parameters  
                    inputs: [  
                        /* A list of input objects */  
                    ]  
                },  
            }  
        ]);  
    },  
    

tip

`StudyMetaInfo` is an interface that you should implement to provide metadata for the custom indicator. For more information, refer to the [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/) article.

Input parameters can be of multiple types, including numeric, text, time, and others. Therefore, each object in `inputs` should implement a certain interface depending on the parameter type. The table below contains frequently used interfaces:

Interface| Definition  
---|---  
[`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo)| Designed for numeric parameters.  
[`StudyTextInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextInputInfo)| Designed for parameters represented with text. For example, types of a smoothing line: SMA, EMA, and WMA.  
[`StudySourceInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySourceInputInfo)| Designed to specify values that are used to calculate the indicator. For example, open or close prices of the bars.  
[`StudySymbolInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySymbolInputInfo)| Designed to specify a [source symbol](/charting-library-docs/latest/getting_started/glossary# source-symbol).  
  
Refer to [`StudyInputInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studyinputinfo) for a complete list of interfaces.

Consider the following example. A custom indicator has two input parameters: length (a time period) and source (a type of bar values). To specify these parameters, you should implement a [`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo) and [`StudySourceInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySourceInputInfo) objects, respectively. Both interfaces have the following properties:

  * `id` that is used to refer to the input parameter
  * `name` that specifies the parameter name in the _Inputs_ tab
  * `type` that specifies the parameter data type
  * `defval` that specifies the default parameter value

Other properties depend on the parameter type. The code sample below shows the implementation of the input parameters.
    
    
    metainfo: {  
        // ...  
        inputs: [  
            // StudyNumericInputInfo object  
            {  
                id: "length",  
                name: "Length",  
                defval: 9,       // 9 bars  
                type: "integer",  
                min: 1,  
                max: 10000,  
            },  
            // StudySourceInputInfo object  
            {  
                id: "source",  
                name: "Source",  
                defval: "close", // Close price  
                type: "source",  
                options: [       // Options in the drop-down menu  
                    "open",  
                    "high",  
                    "low",  
                    "close",  
                    "hl2",  
                    "hlc3",  
                    "ohlc4",  
                ],  
            },  
        ]  
    }  
    

## Specify default valuesâ

[`StudyMetaInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studymetainfo) contains the [`defaults`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo# defaults) property that stores default values for all indicator settings, including input parameters. For each parameter defined in [`inputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo# inputs), you should provide the corresponding value in `defaults`.

warning

Your custom indicator will not work unless you provide values in `defaults` for each input parameter.

To specify default values, assign a [`StudyInputsSimple`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyInputsSimple) object to the `inputs` property in [`StudyDefaults`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDefaults). `StudyInputsSimple` contains pairs of keys and values, where a key is a certain input parameter's `id`, and a value is the default value for this parameter.

In the previous section, you can see an example of the indicator with two input parameters: length and source. The code sample below demonstrates how to specify default input values for this indicator.
    
    
    metainfo: {  
        // ...  
        inputs: [  
            {  
                id: "length", // This value is used as ID to refer to the input parameter  
                // ...  
            },  
            {  
                id: "source", // This value is used as ID to refer to the input parameter  
                // ...  
            },  
        ]  
        // StudyDefaults object  
        defaults: {  
            // ...  
            inputs: {  
                // ID : default value  
                length: 9,  
                source: "close",  
            },  
        }  
    }  
    

## Handle input values in the constructorâ

To create a custom indicator, you should implement a [constructor](/charting-library-docs/latest/custom_studies/custom-indicator-constructor) that calculates indicator data. In the constructor, you can retrieve input values and then use them in your data calculations. To do this, use the `inputCallback` provided with [`main`](/charting-library-docs/latest/custom_studies/custom-indicator-constructor# main) and [`init`](/charting-library-docs/latest/custom_studies/custom-indicator-constructor# init) functions. The callback returns an array of input values arranged in the same order as in the [`inputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo# inputs) property.

In the Define a list of input parameters section, you can see an example of the indicator with two input parameters: length and source. The code sample below demonstrates how to get input values for this indicator.
    
    
    constructor: function () {  
        this.main = function(ctx, inputCallback) {  
            // ...  
            this._input = inputCallback;  
            var length = this._input(0);  
            var source = this._input(1);  
        };  
    }  
    


---

## Custom Studies Defaults | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/custom_studies/metainfo/Custom-Studies-Defaults*

  * [](/charting-library-docs/)
  * [Custom Indicators](/charting-library-docs/latest/custom_studies/)
  * [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/)
  * Defaults

On this page

# Custom Studies Defaults

`defaults` is a field in [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/) of Custom Study, containing an object with settings that are applied when user clicks `Apply Defaults`.

This object has following fields:

`* - required`

  * `bands` \- an array with band styles. Band style is an object with fields:
    * `color`* - string
    * `linestyle`* - number
    * `linewidth`* - number
    * `value`* - number
    * `visible`* - boolean
  * `filledAreasStyle` \- an object. The keys are filled area ids, the values are style objects with fields:
    * `color`* - string
    * `visible`* - boolean
    * `transparency`* - number
  * `inputs` \- an object with `input id` as a key and default value for this input. The default value can be `string`, `number` or `bool` depending on input type. The field is required if your study has inputs
  * `palettes` \- an object with `pallette id` as a key and palette definition: `[name]: { colors, valToIndex, addDefaultColor }`, where
    * `colors`* - an object `{ [color_id]: color_info }`. The color is an object with following fields:
      * `color`* - string
      * `style`* - number
      * `width`* - number
    * `valToIndex` \- an object, the mapping between the values that are returned by the script and palette color indexes
    * `addDefaultColor` \- boolean, if `true` the defaults are used for `colorer` type plot, when its value is `NaN`
  * `precision`* - precision of the study's output values (quantity of digits after the decimal separator)
  * `styles` \- an object with `plot id` as keys and style info as values. `plot style` is an object with keys, specific for each plot `type` (see below)

## Default Stylesâ

Here is a short reference for `plot style` object in `defaults`. Some of fields are the same for all of plot types:

  * `visible`* - boolean

Additional fields should be added depending on `plot type`.

### Lineâ

  * `color`* - string, plot color
  * `linestyle`* - number
  * `linewidth`* - number
  * `trackPrice`* - boolean, if `true`, price line is displayed

### Shapesâ

  * `plottype`* - string, can have following values:
    * `shape_arrow_down`
    * `shape_arrow_up`
    * `shape_circle`
    * `shape_cross`
    * `shape_xcross`
    * `shape_diamond`
    * `shape_flag`
    * `shape_square`
    * `shape_label_down`
    * `shape_label_up`
    * `shape_triangle_down`
    * `shape_triangle_up`
  * `location`*- string, one of the following:
    * `AboveBar`
    * `BelowBar`
    * `Top`
    * `Bottom`
    * `Right`
    * `Left`
    * `Absolute`
    * `AbsoluteUp`
    * `AbsoluteDown`
  * `color`* - string, plot color
  * `textColor`* - string, text color

### Charsâ

  * `char*`* - string
  * `location`*- string, one of the following:
    * `AboveBar`
    * `BelowBar`
    * `Top`
    * `Bottom`
    * `Right`
    * `Left`
    * `Absolute`
    * `AbsoluteUp`
    * `AbsoluteDown`
  * `color`* - string, plot color
  * `textColor`* - string, color

### Arrowsâ

  * `colorup`* - string, color
  * `colordown`* - string, color

