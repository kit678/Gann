# custom indicator tutorial

*This document contains aggregated content from 4 URLs*

## Table of Contents

1. [How to connect data via datafeed API | Advanced Charts Documentation](#how-to-connect-data-via-datafeed-api-|-advanced-charts-documentation)
2. [How to create a custom indicator | Advanced Charts Documentation](#how-to-create-a-custom-indicator-|-advanced-charts-documentation)
3. [Implement metainfo | Advanced Charts Documentation](#implement-metainfo-|-advanced-charts-documentation)
4. [Implement constructor | Advanced Charts Documentation](#implement-constructor-|-advanced-charts-documentation)


---

## How to connect data via datafeed API | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/*

  * [](/charting-library-docs/)
  * Connecting data via Datafeed API

On this page

# How to connect data via datafeed API

This tutorial explains how to implement real-time data streaming to Advanced Charts / [Trading Platform](/charting-library-docs/latest/trading_terminal/) step-by-step. As an example, the tutorial describes connection via free CryptoCompare API that provides data from several crypto exchanges.

After completing this tutorial, you will learn how to implement datafeed using Datafeed API, display historical data using ordinary HTTP requests, and stream real-time data via WebSocket.

The tutorial is divided into three parts:

  1. [Widget Constructor set-up](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Widget-Setup)
  2. [Datafeed implementation](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Datafeed-Implementation)
  3. [Streaming implementation](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Streaming-Implementation)

Tips

  * You can find the final code for this tutorial on the [GitHub repository](https://github.com/tradingview/charting-library-tutorial).
  * At the end of each section, you will find the complete code blocks related to a specific step.
  * Before proceeding with the tutorial, we recommend checking the Prerequisites section.

## Prerequisitesâ

### Get repository accessâ

The [Advanced Charts repository](https://github.com/tradingview/charting_library) is private. Refer to the [Getting Access](/charting-library-docs/latest/getting_started/quick-start# getting-access) section for more information.

### Use external data sourceâ

The library is used to display financial data but it does not contain or provide any data. You need to implement your own data source to display data in the library. It can be a web API, a database, or a CSV file.

This tutorial uses the [CryptoCompare API](https://min-api.cryptocompare.com/), which has a wide range of market data. Note that CryptoCompare requires an API key to request their stream data. You need to get such key to complete the tutorial. Refer to the [CryptoCompare documentation](https://www.cryptocompare.com/coins/guides/how-to-use-our-api/) for more information.

caution

We cannot guarantee that CryptoCompare works in your region. If you see the `ERR_CONNECTION_REFUSED` error when running the tutorial, try to use a proxy or VPN.

### See results on the flyâ

If you want to see the results of this tutorial right away, take the following steps:

  1. Clone the [tutorial repository](https://github.com/tradingview/charting-library-tutorial). Note that for the real project, it is better to use this repository as a submodule in yours.
    
        git clone https://github.com/tradingview/charting-library-tutorial.git  
    

  2. Go to the repository folder and initialize the Git submodule with the library:
    
        git submodule update --init --recursive  
    

Alternatively, you can [download](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives) the library repository from a ZIP file or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it using Git.

  3. Run the following command to serve static files:
    
        npx serve  
    



---

## How to create a custom indicator | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/create-custom-indicator/*

  * [](/charting-library-docs/)
  * Creating a custom indicator

On this page

# How to create a custom indicator

In this tutorial we will create a [custom indicator](/charting-library-docs/latest/custom_studies/) that displays a [Simple Moving Average (SMA)](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) and a Smoothing Line. The line represents either SMA, [Exponential Moving Average (EMA)](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), or [Weighted Moving Average (WMA)](https://www.tradingview.com/support/solutions/43000594680-weighted-moving-average/) calculated based on the existing SMA.

See the Pen [ Chart customization order](https://codepen.io/tradingview/pen/MWLqOWM) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

After completing the tutorial, you will learn how to add a custom indicator to the library, specify the indicator look and feel, and implement data calculations.

## Before you startâ

Consider taking the following steps before proceeding with the tutorial:

  1. Set up the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) and run the library. Refer to the [First run](/charting-library-docs/latest/tutorials/First-Run-Tutorial) tutorial for more information.
  2. Connect data to the library. Refer to the [Connecting data](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial for more information.

## Tutorial structureâ

The tutorial is divided into three parts:

  1. Add a custom indicator to the library
  2. [Implement metainfo](/charting-library-docs/latest/tutorials/create-custom-indicator/metainfo-implementation)
  3. [Implement constructor](/charting-library-docs/latest/tutorials/create-custom-indicator/constructor-implementation)

Tips

  * At the end of each part, you will find the complete code blocks related to a specific step.
  * Refer to the CodePen example above to see the complete tutorial code right away.

## Add a custom indicator to the libraryâ

To add a custom indicator to the library, specify a function that returns a Promise object and assign this function to the [`custom_indicators_getter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_indicators_getter) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). The Promise object should be resolved with an array of [`CustomIndicator`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomIndicator) instances. In this tutorial, only one custom indicator will be created, therefore, the array contains one element.

`CustomIndicator` is an interface that you should implement to provide information on the indicator. The interface contains the following required fields:

  * `name`: an indicator's internal name that is not visible in the UI. This name should be unique.
  * `metainfo`: the field that describes how the indicator looks like.
  * `constructor`: the field that contains data calculations.

At this stage of the tutorial, you should adjust the `name` filed only.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        custom_indicators_getter: function(PineJS) {  
            return Promise.resolve([  
                // Indicator object  
                {  
                    name: 'Custom Moving Average',  
                    metainfo: {  
                        // ...  
                    },  
                    constructor: function() {  
                        // ...  
                    }  
                }  
            ]);  
        },  
    });  
    

In the next steps, you will specify the `metainfo` and `constructor` fields.


---

## Implement metainfo | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/create-custom-indicator/metainfo-implementation*

  * [](/charting-library-docs/)
  * [Creating a custom indicator](/charting-library-docs/latest/tutorials/create-custom-indicator/)
  * Implement metainfo

On this page

# Implement metainfo

tip

This article is part of a tutorial about creating a custom indicator. We recommend that you follow the guide from the [start](/charting-library-docs/latest/tutorials/create-custom-indicator/).

[`CustomIndicator`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomIndicator) has the required `metainfo` field that you will specify at this part of the tutorial. To do this, create a [`StudyMetaInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studymetainfo) object that contains indicator metadata and assign this object to `metainfo`.

For a thorough understanding of the `StudyMetaInfo` implementation, consider the [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/) article.

## 1\. Specify service informationâ

Add [service information](/charting-library-docs/latest/custom_studies/metainfo/# service-information) required for any custom indicator. The code sample below specifies the [`_metainfoVersion`](/charting-library-docs/latest/custom_studies/metainfo/# _metainfoversion) and [`id`](/charting-library-docs/latest/custom_studies/metainfo/# id) properties.
    
    
    metainfo: {  
        _metainfoVersion: 53,  
        id: "Custom Moving Average@tv-basicstudies-1",  
        // ...  
    }  
    

## 2\. Specify indicator nameâ

Specify the indicator name that will be displayed in the _Indicators_ dialog and the [_Legend_](/charting-library-docs/latest/ui_elements/Legend). To do this, use the [`description`](/charting-library-docs/latest/custom_studies/metainfo/# description) and [`shortDescription`](/charting-library-docs/latest/custom_studies/metainfo/# shortdescription) properties, respectively.
    
    
    metainfo: {  
        // ...  
        description: "Custom Moving Average", // Name in the Indicators dialog  
        shortDescription: "Custom MA",        // Name in the Legend  
    }  
    

## 3\. Position on the chartâ

_Custom Moving Average_ should be displayed on the same pane with the [source symbol](/charting-library-docs/latest/getting_started/glossary# source-symbol) and remain attached to this symbol. Therefore, you should configure the [`is_price_study`](/charting-library-docs/latest/custom_studies/metainfo/# is_price_study) and [`linkedToSeries`](/charting-library-docs/latest/custom_studies/metainfo/# linkedtoseries) properties as follows:
    
    
    metainfo: {  
        // ...  
        is_price_study: true, // Display on the same pane with symbol  
        linkedToSeries: true, // Attach indicator to the symbol  
    }  
    

tip

If an indicator is attached to the symbol, users cannot move the symbol to another pane without the indicator.

## 4\. Specify visual representationâ

Each indicator is represented with visual elements such as [plots](/charting-library-docs/latest/getting_started/glossary# plot), [bands](/charting-library-docs/latest/custom_studies/metainfo/# bands) (horizontal lines), and filled (color) [areas](/charting-library-docs/latest/custom_studies/metainfo/# filledareas). In this tutorial, the _Custom Moving Average_ indicator will be represented with two plots. To implement the plots and specify their appearance, adjust the properties below.

### plotsâ

Define two plots in [`plots`](/charting-library-docs/latest/custom_studies/metainfo/# plots) as follows:
    
    
    metainfo: {  
        // ...  
        plots: [  
            { id: "plot_0", type: "line" },      // Simple Moving Average  
            { id: "smoothedMA", type: "line" },  // Smoothing Line  
        ],  
    }  
    

The `plots` property contains two [`StudyLinePlotInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotInfo) objects with the following parameters:

  * `id` that is used to refer to the plot
  * `type` that specifies the plot form

### stylesâ

Next, use the [`styles`](/charting-library-docs/latest/custom_studies/metainfo/# styles) property to specify appearance settings for each plot defined in `plots`.

The `styles` property should contain a [`MappedObject`](/charting-library-docs/latest/api/interfaces/Charting_Library.MappedObject). In this object, `key` is a certain plot's `id`, and `TValue` is a [`StudyStylesInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyStylesInfo) object. In `StudyStylesInfo`, specify basic appearance settings that are initialized once and cannot be changed by users, for example, the plot's name in the _Styles_ tab.

Note that users can change a line type in the UI, for example, from `Line` to `Histogram`. Therefore, you should specify `StudyStylesInfo` properties related to other line types if necessary.
    
    
    metainfo: {  
        // ...  
        styles: {  
            plot_0: {  
                title: "Plot",     // Name in the Styles tab  
                histogramBase: 0,  // Histogram base level  
                joinPoints: false  // Whether join points when the plot type is `Circles` or `Cross`  
            },  
            smoothedMA: {  
                title: "Smoothed MA",  
                histogramBase: 0,  
                joinPoints: false,  
            },  
        },  
    }  
    

![Styles tab](/charting-library-docs/assets/images/custom-MA-styles-tab-a182268ee836d5410572120415f75bd9.png)

### Style defaultsâ

All default indicator settings should be stored in a [`StudyDefaults`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyDefaults) object. You should assign this object to [`defaults`](/charting-library-docs/latest/custom_studies/metainfo/# defaults).

To provide default appearance settings for each plot defined in `plots`, use the `styles` property within `StudyDefaults`. This property should contain a [`MappedObject`](/charting-library-docs/latest/api/interfaces/Charting_Library.MappedObject). In this object, `key` is a certain plot's `id`, and `TValue` is a [`StudyLinePlotPreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyLinePlotPreferences) object. In `StudyLinePlotPreferences`, specify default appearance settings, for example, a line color and width.
    
    
    metainfo: {  
        // ...  
        defaults: {  
            styles: {  
                plot_0: {  
                    linestyle: 0,       // LineStyle.Solid  
                    linewidth: 1,  
                    plottype: 0,        // LineStudyPlotStyle.Line  
                    trackPrice: false,  // Hide the price line  
                    transparency: 0,  
                    visible: true,  
                    color: "# 2196F3",  
                },  
                smoothedMA: {  
                    linestyle: 0,  
                    linewidth: 1,  
                    plottype: 0,  
                    trackPrice: false,  
                    transparency: 0,  
                    visible: true,  
                    color: "# 9621F3",  
                },  
            },  
        },  
    }  
    

Users can change these appearance settings in the _Styles_ tab.

![Styles tab](/charting-library-docs/assets/images/change-plot-styles-8ae84744be8f80a5ffedc58ed18d9d9f.png)

## 5\. Specify dataâ

Next, you should specify data that the indicator uses.

### Data formatâ

Depending on the indicator data, the [_Price Scale_](/charting-library-docs/latest/ui_elements/Price-Scale) displays price, volume, or percent values. You can specify the indicator's data type using the [`format`](/charting-library-docs/latest/custom_studies/metainfo/# format) property. In this tutorial, _Custom Moving Average_ has the same format as the [source symbol](/charting-library-docs/latest/getting_started/glossary# source-symbol). Therefore, `format` is set to `inherit`.
    
    
    metainfo: {  
        // ...  
        format: { type: "inherit" },  
    }  
    

### inputsâ

You can allow users to adjust some indicator parameters such as a [source symbol](/charting-library-docs/latest/getting_started/glossary# source-symbol) or time period. To do this, specify input parameters that users can change in the _Inputs_ tab. The parameter values are used in the indicator calculations.

To specify input parameters, assign an array of objects to the [`inputs`](/charting-library-docs/latest/custom_studies/metainfo/# inputs) property. Each object should implement a certain interface depending on the parameter type. The table below contains the _Custom Moving Average_ input parameters and the corresponding interfaces.

Input parameter| Interface| Description  
---|---|---  
Length| [`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo)| A time period that is used in calculating the SMA.  
Source| [`StudySourceInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudySourceInputInfo)| Bar values that are used in calculating the SMA.  
Offset| [`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo)| A number of bars to shift to the right or left.  
Smoothing Line| [`StudyTextInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyTextInputInfo)| A type of the Smoothing Line. Possible types are: [SMA](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/), [EMA](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), and [WMA](https://www.tradingview.com/support/solutions/43000594680-weighted-moving-average/).  
Smoothing Length| [`StudyNumericInputInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyNumericInputInfo)| A length of the Smoothing Line.  
  
All these interfaces have the following properties:

  * `id` that is used to refer to the input parameter
  * `name` that specifies the parameter name in the _Inputs_ tab
  * `type` that specifies the parameter data type
  * `defval` that specifies the default parameter value

Other properties depend on the parameter type.

Implement the input parameters as follows:
    
    
    metainfo: {  
        // ...  
        inputs: [  
            {  
                id: "length",  
                name: "Length",   // Parameter name in the Inputs tab  
                defval: 9,        // 9 bars  
                type: "integer",  
                min: 1,  
                max: 10000,  
            },  
            {  
                id: "source",  
                name: "Source",  
                defval: "close",  // Close price  
                type: "source",  
                options: [        // Options in the drop-down menu  
                    "open",  
                    "high",  
                    "low",  
                    "close",  
                    "hl2",  
                    "hlc3",  
                    "ohlc4",  
                ],  
            },  
            {  
                id: "offset",  
                name: "Offset",  
                defval: 0,  
                type: "integer",  
                min: -10000,  
                max: 10000,  
            },  
            {  
                id: "smoothingLine",  
                name: "Smoothing Line",  
                defval: "SMA",  
                type: "text",  
                options: ["SMA", "EMA", "WMA"],  
            },  
            {  
                id: "smoothingLength",  
                name: "Smoothing Length",  
                defval: 9,  
                type: "integer",  
                min: 1,  
                max: 10000,  
            },  
        ],  
    }  
    

![Inputs tab](/charting-library-docs/assets/images/change-indicator-inputs-b184e7a8c31f5fcff87947a09428f383.png)

### Input defaultsâ

In Style defaults, you have created the `StudyDefaults` object and assigned it to `defaults`.

To provide default values for each input parameter defined in `inputs`, use the `inputs` property within `StudyDefaults`. This property should contain the `id` properties of all input parameters and the corresponding default values.
    
    
    metainfo: {  
        // ...  
        defaults: {  
            styles: {  
                // ...  
            },  
            inputs: {  
                length: 9,  
                source: "close",  
                offset: 0,  
                smoothingLine: "SMA",  
                smoothingLength: 9,  
            },  
        },  
    }  
    

## Complete codeâ

At this stage, you have implemented the [`StudyMetaInfo`](/charting-library-docs/latest/api/modules/Charting_Library# studymetainfo) object and assigned it to the `metainfo` field.

Expand to view the complete code for the `StudyMetaInfo` object.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        custom_indicators_getter: function(PineJS) {  
            return Promise.resolve([  
                // Indicator object  
                {  
                    name: 'Custom Moving Average',  
                    metainfo: {  
                        _metainfoVersion: 53,  
                        id: "Custom Moving Average@tv-basicstudies-1",  
                        description: "Custom Moving Average",  
                        shortDescription: "Custom MA",  
                        format: { type: "inherit" },  
                        linkedToSeries: true,  
                        is_price_study: true,  
                        plots: [  
                            { id: "plot_0", type: "line" },  
                            { id: "smoothedMA", type: "line" },  
                        ],  
                        defaults: {  
                            styles: {  
                                plot_0: {  
                                    linestyle: 0,  
                                    linewidth: 1,  
                                    plottype: 0,  
                                    trackPrice: false,  
                                    transparency: 0,  
                                    visible: true,  
                                    color: "# 2196F3",  
                                },  
                                smoothedMA: {  
                                    linestyle: 0,  
                                    linewidth: 1,  
                                    plottype: 0,  
                                    trackPrice: false,  
                                    transparency: 0,  
                                    visible: true,  
                                    color: "# 9621F3",  
                                },  
                            },  
                            inputs: {  
                                length: 9,  
                                source: "close",  
                                offset: 0,  
                                smoothingLine: "SMA",  
                                smoothingLength: 9,  
                            },  
                        },  
                        styles: {  
                            plot_0: { title: "Plot", histogramBase: 0, joinPoints: true },  
                            smoothedMA: {  
                                title: "Smoothed MA",  
                                histogramBase: 0,  
                                joinPoints: false,  
                            },  
                        },  
                        inputs: [  
                            {  
                                id: "length",  
                                name: "Length",  
                                defval: 9,  
                                type: "integer",  
                                min: 1,  
                                max: 10000,  
                            },  
                            {  
                                id: "source",  
                                name: "Source",  
                                defval: "close",  
                                type: "source",  
                                options: [  
                                    "open",  
                                    "high",  
                                    "low",  
                                    "close",  
                                    "hl2",  
                                    "hlc3",  
                                    "ohlc4",  
                                ],  
                            },  
                            {  
                                id: "offset",  
                                name: "Offset",  
                                defval: 0,  
                                type: "integer",  
                                min: -10000,  
                                max: 10000,  
                            },  
                            {  
                                id: "smoothingLine",  
                                name: "Smoothing Line",  
                                defval: "SMA",  
                                type: "text",  
                                options: ["SMA", "EMA", "WMA"],  
                            },  
                            {  
                                id: "smoothingLength",  
                                name: "Smoothing Length",  
                                defval: 9,  
                                type: "integer",  
                                min: 1,  
                                max: 10000,  
                            },  
                        ],  
                    },  
                    constructor: function() {  
                        // ...  
                    }  
                }  
            ]);  
        },  
    });  
    

Next, you will specify the `constructor` field.


---

## Implement constructor | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/create-custom-indicator/constructor-implementation*

  * [](/charting-library-docs/)
  * [Creating a custom indicator](/charting-library-docs/latest/tutorials/create-custom-indicator/)
  * Implement constructor

On this page

# Implement constructor

tip

This article is part of a tutorial about creating a custom indicator. We recommend that you follow the guide from the [start](/charting-library-docs/latest/tutorials/create-custom-indicator/).

`CustomIndicator` has the required `constructor` field that you will specify at this part of the tutorial. To do this, assign an ES5 constructor function to `constructor`. The function should contain the `main` method that calculates indicator data. To implement the method, follow the steps below.

For a thorough understanding of the constructor implementation, consider the [Constructor](/charting-library-docs/latest/custom_studies/custom-indicator-constructor) article.

## 1\. Handle method argumentsâ

The `main` method accepts the following parameters:

  * [`ctx`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext) â context that stores an indicator state. It includes information about the current symbol, resolution, OHLC values of the current bar, and more.
  * `inputs` â an array of the input parameters' values. Elements in the array are arranged in the same order as [`inputs`](/charting-library-docs/latest/tutorials/create-custom-indicator/metainfo-implementation# inputs) in `metainfo`.

Handle the method arguments as follows:
    
    
    constructor: function () {  
        this.main = function (ctx, inputs) {  
            this._context = ctx;  
            this._input = inputs;  
      
            var length = this._input(0);  
            var offset = this._input(2);  
            var smoothingLine = this._input(3);  
            var smoothingLength = this._input(4);  
             // If this._input(1) returns 'close', PineJS.Std.close(this._context) will be called  
            var source = PineJS.Std[this._input(1)](this._context);  
        }  
    }  
    

One of the indicator's [input parameters](/charting-library-docs/latest/tutorials/create-custom-indicator/metainfo-implementation# inputs) is _Source_. The parameter specifies certain bar values, such as close or open price, that will be used in the indicator calculations. To get the required values, you should call the corresponding method from [`PineJSStd`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd). For example, if the close price is specified as source, call the [`close`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd# close) method.

## 2\. Call setMinimumAdditionalDepthâ

Calculating any Moving Averages requires extra historical bars. Usually the library can calculate the number of extra bars to request from datafeed. However, in this tutorial, you implement a Smoothing Line which is a Moving Average calculated based on another Moving Average. In this exceptional case, you should specify the number of extra bars manually by calling the `setMinimumAdditionalDepth` method.

Call `setMinimumAdditionalDepth` and pass the sum of the _Length_ and _Smoothing Length_ values as a parameter:
    
    
    this._context.setMinimumAdditionalDepth(length + smoothingLength);  
    

## 3\. Call new_varâ

The library calls the `main` method for each bar of the [main series](/charting-library-docs/latest/getting_started/glossary# series). To access values you get on the previous iterations, you should call the [`new_var`](/charting-library-docs/latest/api/interfaces/Charting_Library.IContext# new_var) method that creates a special variable.

In this tutorial, you need to store the main series to use it as the input to another calculation. To do this, create the `series` variable as follows:
    
    
    var series = this._context.new_var(source);  
    

## 4\. Calculate dataâ

### For SMAâ

To calculate the SMA values, use the [`sma`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd# sma) method. The method returns a number â the SMA value for the current bar.
    
    
    var sma = PineJS.Std.sma(series, length, this._context);  
    

Additionally, you should store all SMA values to use them in the Smoothing Line calculations. To do this, create the `sma_series` variable with `new_var`:
    
    
    var sma_series = this._context.new_var(sma);  
    

### For Smoothing Lineâ

The Smoothing Line is a Moving Average calculated based on the SMA data. Depending on the type specified in the _Smoothing Line_ input parameter, you should call either `sma`, [`ema`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd# ema), or [`wma`](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd# wma) method to calculate the values:
    
    
    var smoothedMA;  
        if (smoothingLine === "EMA") {  
        smoothedMA = PineJS.Std.ema(  
            sma_series,  
            smoothingLength,  
            this._context  
        );  
        } else if (smoothingLine === "WMA") {  
        smoothedMA = PineJS.Std.wma(  
            sma_series,  
            smoothingLength,  
            this._context  
        );  
        } else {  // if (smoothingLine === "SMA") {  
        smoothedMA = PineJS.Std.sma(  
            sma_series,  
            smoothingLength,  
            this._context  
        );  
    }  
    

## 5\. Return valuesâ

Return the calculated values for the SMA and Smoothing Line as follows:
    
    
    return [  
        { value: sma, offset: offset },  
        { value: smoothedMA, offset: offset },  
    ];  
    

## Complete codeâ

At this stage, you have implemented the constructor function and assigned it to the `constructor` field.

Expand to view the complete code for the constructor.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        custom_indicators_getter: function(PineJS) {  
            return Promise.resolve([  
                // Indicator object  
                {  
                    constructor: function () {  
                        this.main = function (ctx, inputs) {  
                            this._context = ctx;  
                            this._input = inputs;  
      
                            var length = this._input(0);  
                            var offset = this._input(2);  
                            var smoothingLine = this._input(3);  
                            var smoothingLength = this._input(4);  
                            var source = PineJS.Std[this._input(1)](this._context);  
      
                            this._context.setMinimumAdditionalDepth(length + smoothingLength);  
      
                            var series = this._context.new_var(source);  
                            var sma = PineJS.Std.sma(series, length, this._context);  
                            var sma_series = this._context.new_var(sma);  
      
                            var smoothedMA;  
                            if (smoothingLine === "EMA") {  
                            smoothedMA = PineJS.Std.ema(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            } else if (smoothingLine === "WMA") {  
                            smoothedMA = PineJS.Std.wma(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            } else {  // if (smoothingLine === "SMA") {  
                            smoothedMA = PineJS.Std.sma(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            }  
      
                            return [  
                                { value: sma, offset: offset },  
                                { value: smoothedMA, offset: offset },  
                            ];  
                        };  
                    },  
                }  
            ]);  
        },  
    });  
    

## Tutorial resultsâ

This was the final step of the custom indicator implementation. You have created a custom indicator and specified its appearance and data.

Expand to view the complete code for the custom indicator.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        custom_indicators_getter: function(PineJS) {  
            return Promise.resolve([  
                // Indicator object  
                {  
                    name: 'Custom Moving Average',  
                    metainfo: {  
                        _metainfoVersion: 53,  
                        id: "Custom Moving Average@tv-basicstudies-1",  
                        description: "Custom Moving Average",  
                        shortDescription: "Custom MA",  
                        format: { type: "inherit" },  
                        linkedToSeries: true,  
                        is_price_study: true,  
                        plots: [  
                            { id: "plot_0", type: "line" },  
                            { id: "smoothedMA", type: "line" },  
                        ],  
                        defaults: {  
                            styles: {  
                                plot_0: {  
                                    linestyle: 0,  
                                    linewidth: 1,  
                                    plottype: 0,  
                                    trackPrice: false,  
                                    transparency: 0,  
                                    visible: true,  
                                    color: "# 2196F3",  
                                },  
                                smoothedMA: {  
                                    linestyle: 0,  
                                    linewidth: 1,  
                                    plottype: 0,  
                                    trackPrice: false,  
                                    transparency: 0,  
                                    visible: true,  
                                    color: "# 9621F3",  
                                },  
                            },  
                            inputs: {  
                                length: 9,  
                                source: "close",  
                                offset: 0,  
                                smoothingLine: "SMA",  
                                smoothingLength: 9,  
                            },  
                        },  
                        styles: {  
                            plot_0: { title: "Plot", histogramBase: 0, joinPoints: true },  
                            smoothedMA: {  
                                title: "Smoothed MA",  
                                histogramBase: 0,  
                                joinPoints: false,  
                            },  
                        },  
                        inputs: [  
                            {  
                                id: "length",  
                                name: "Length",  
                                defval: 9,  
                                type: "integer",  
                                min: 1,  
                                max: 10000,  
                            },  
                            {  
                                id: "source",  
                                name: "Source",  
                                defval: "close",  
                                type: "source",  
                                options: [  
                                    "open",  
                                    "high",  
                                    "low",  
                                    "close",  
                                    "hl2",  
                                    "hlc3",  
                                    "ohlc4",  
                                ],  
                            },  
                            {  
                                id: "offset",  
                                name: "Offset",  
                                defval: 0,  
                                type: "integer",  
                                min: -10000,  
                                max: 10000,  
                            },  
                            {  
                                id: "smoothingLine",  
                                name: "Smoothing Line",  
                                defval: "SMA",  
                                type: "text",  
                                options: ["SMA", "EMA", "WMA"],  
                            },  
                            {  
                                id: "smoothingLength",  
                                name: "Smoothing Length",  
                                defval: 9,  
                                type: "integer",  
                                min: 1,  
                                max: 10000,  
                            },  
                        ],  
                    },  
                    constructor: function () {  
                        this.main = function (ctx, inputs) {  
                            this._context = ctx;  
                            this._input = inputs;  
      
                            var length = this._input(0);  
                            var offset = this._input(2);  
                            var smoothingLine = this._input(3);  
                            var smoothingLength = this._input(4);  
                            var source = PineJS.Std[this._input(1)](this._context);  
      
                            this._context.setMinimumAdditionalDepth(length + smoothingLength);  
      
                            var series = this._context.new_var(source);  
                            var sma = PineJS.Std.sma(series, length, this._context);  
                            var sma_series = this._context.new_var(sma);  
      
                            var smoothedMA;  
                            if (smoothingLine === "EMA") {  
                            smoothedMA = PineJS.Std.ema(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            } else if (smoothingLine === "WMA") {  
                            smoothedMA = PineJS.Std.wma(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            } else {  // if (smoothingLine === "SMA") {  
                            smoothedMA = PineJS.Std.sma(  
                                sma_series,  
                                smoothingLength,  
                                this._context  
                            );  
                            }  
      
                            return [  
                                { value: sma, offset: offset },  
                                { value: smoothedMA, offset: offset },  
                            ];  
                        };  
                    },  
                }  
            ]);  
        },  
    });  
    

If you want to dive deeper into the custom indicators, we recommend checking out the following documentation sections:

  * [Custom indicators](/charting-library-docs/latest/custom_studies/)
  * [Custom indicators examples](/charting-library-docs/latest/custom_studies/Custom-Studies-Examples)

