# general documentation

*This document contains aggregated content from 56 URLs*

## Table of Contents

1. [Quick start | Advanced Charts Documentation](#quick-start-|-advanced-charts-documentation)
2. [Key features | Advanced Charts Documentation](#key-features-|-advanced-charts-documentation)
3. [Best Practices | Advanced Charts Documentation](#best-practices-|-advanced-charts-documentation)
4. [Frequently Asked Questions | Advanced Charts Documentation](#frequently-asked-questions-|-advanced-charts-documentation)
5. [Glossary | Advanced Charts Documentation](#glossary-|-advanced-charts-documentation)
6. [Accessibility | Advanced Charts Documentation](#accessibility-|-advanced-charts-documentation)
7. [Cross Origin Hosting | Advanced Charts Documentation](#cross-origin-hosting-|-advanced-charts-documentation)
8. [Using the library with online code playgrounds | Advanced Charts Documentation](#using-the-library-with-online-code-playgrounds-|-advanced-charts-documentation)
9. [NPM | Advanced Charts Documentation](#npm-|-advanced-charts-documentation)
10. [Keyboard shortcuts | Advanced Charts Documentation](#keyboard-shortcuts-|-advanced-charts-documentation)
11. [Package Content | Advanced Charts Documentation](#package-content-|-advanced-charts-documentation)
12. [Other TradingView products | Advanced Charts Documentation](#other-tradingview-products-|-advanced-charts-documentation)
13. [Update the library | Advanced Charts Documentation](#update-the-library-|-advanced-charts-documentation)
14. [Release Notes | Advanced Charts Documentation](#release-notes-|-advanced-charts-documentation)
15. [Widget Constructor | Advanced Charts Documentation](#widget-constructor-|-advanced-charts-documentation)
16. [Widget methods | Advanced Charts Documentation](#widget-methods-|-advanced-charts-documentation)
17. [Localization | Advanced Charts Documentation](#localization-|-advanced-charts-documentation)
18. [Resolution | Advanced Charts Documentation](#resolution-|-advanced-charts-documentation)
19. [Required methods | Advanced Charts Documentation](#required-methods-|-advanced-charts-documentation)
20. [Trading Platform methods | Advanced Charts Documentation](#trading-platform-methods-|-advanced-charts-documentation)
21. [Additional methods | Advanced Charts Documentation](#additional-methods-|-advanced-charts-documentation)
22. [UDF | Advanced Charts Documentation](#udf-|-advanced-charts-documentation)
23. [Symbology | Advanced Charts Documentation](#symbology-|-advanced-charts-documentation)
24. [Trading sessions | Advanced Charts Documentation](#trading-sessions-|-advanced-charts-documentation)
25. [Extended sessions | Advanced Charts Documentation](#extended-sessions-|-advanced-charts-documentation)
26. [Datafeed: common issues | Advanced Charts Documentation](#datafeed-common-issues-|-advanced-charts-documentation)
27. [Chart | Advanced Charts Documentation](#chart-|-advanced-charts-documentation)
28. [Toolbars | Advanced Charts Documentation](#toolbars-|-advanced-charts-documentation)
29. [Symbol Search | Advanced Charts Documentation](#symbol-search-|-advanced-charts-documentation)
30. [Legend | Advanced Charts Documentation](#legend-|-advanced-charts-documentation)
31. [Time zones | Advanced Charts Documentation](#time-zones-|-advanced-charts-documentation)
32. [Price scale | Advanced Charts Documentation](#price-scale-|-advanced-charts-documentation)
33. [Time scale | Advanced Charts Documentation](#time-scale-|-advanced-charts-documentation)
34. [Marks | Advanced Charts Documentation](#marks-|-advanced-charts-documentation)
35. [Context menu | Advanced Charts Documentation](#context-menu-|-advanced-charts-documentation)
36. [Panes and Scales Behavior | Advanced Charts Documentation](#panes-and-scales-behavior-|-advanced-charts-documentation)
37. [Snapshots | Advanced Charts Documentation](#snapshots-|-advanced-charts-documentation)
38. [Market Status | Advanced Charts Documentation](#market-status-|-advanced-charts-documentation)
39. [Object tree | Advanced Charts Documentation](#object-tree-|-advanced-charts-documentation)
40. [Symbol Status | Advanced Charts Documentation](#symbol-status-|-advanced-charts-documentation)
41. [Featuresets | Advanced Charts Documentation](#featuresets-|-advanced-charts-documentation)
42. [Customization precedence | Advanced Charts Documentation](#customization-precedence-|-advanced-charts-documentation)
43. [Chart overrides | Advanced Charts Documentation](#chart-overrides-|-advanced-charts-documentation)
44. [Drawing overrides | Advanced Charts Documentation](#drawing-overrides-|-advanced-charts-documentation)
45. [Indicator overrides | Advanced Charts Documentation](#indicator-overrides-|-advanced-charts-documentation)
46. [Trading overrides | Advanced Charts Documentation](#trading-overrides-|-advanced-charts-documentation)
47. [Custom themes API | Advanced Charts Documentation](#custom-themes-api-|-advanced-charts-documentation)
48. [CSS Color Themes | Advanced Charts Documentation](#css-color-themes-|-advanced-charts-documentation)
49. [Chart layout methods | Advanced Charts Documentation](#chart-layout-methods-|-advanced-charts-documentation)
50. [Indicator template methods | Advanced Charts Documentation](#indicator-template-methods-|-advanced-charts-documentation)
51. [Drawing methods | Advanced Charts Documentation](#drawing-methods-|-advanced-charts-documentation)
52. [Drawing template methods | Advanced Charts Documentation](#drawing-template-methods-|-advanced-charts-documentation)
53. [API handlers for saving and loading | Advanced Charts Documentation](#api-handlers-for-saving-and-loading-|-advanced-charts-documentation)
54. [Low-level API for saving and loading | Advanced Charts Documentation](#low-level-api-for-saving-and-loading-|-advanced-charts-documentation)
55. [Saving drawings separately | Advanced Charts Documentation](#saving-drawings-separately-|-advanced-charts-documentation)
56. [Save user settings | Advanced Charts Documentation](#save-user-settings-|-advanced-charts-documentation)


---

## Quick start | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/quick-start*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Quick start

On this page

# Quick start

## Getting accessâ

The [Advanced Charts](https://github.com/tradingview/charting_library) and [Trading Platform](https://github.com/tradingview/trading_platform) repositories are private, and you should fill out the form on the [TradingView website](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=technical-analysis-charts) to request access. Otherwise, attempting to access the GitHub repositories or legacy documentation links will result in the _404 NotÂ Found_ error.

caution

Advanced Charts and Trading Platform should only be downloaded from the official TradingView repositories provided within this documentation. Obtaining the library from third-party services is strictly prohibited and may lead to legal consequences.

The library is not redistributable. Therefore, it is prohibited to use any part of the library in public repositories.

## First stepsâ

You should complete the steps below to get started with Advanced Charts / Trading Platform:

  1. [Run Advanced Charts / Trading Platform](/charting-library-docs/latest/tutorials/First-Run-Tutorial) for the first time.

  2. Set up [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).

  3. [Connect data](/charting-library-docs/latest/connecting_data/) and [implement real-time data streaming](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/).

  4. [Explore](/charting-library-docs/latest/ui_elements/) various parts of the interface and configure them to fit your needs.

  5. [Customize](/charting-library-docs/latest/customization/) your chart's appearance.

We recommend that you also check out [Best Practices](/charting-library-docs/latest/getting_started/Best-Practices) and [Frequently Asked Questions](/charting-library-docs/latest/getting_started/Frequently-Asked-Questions) before you start development to avoid common mistakes.

## Integration examplesâ

You can integrate Advanced Charts / Trading Platform with Android WebView, iOS WKWebView, Angular, React, and other frameworks. Check out the [repository on GitHub](https://github.com/tradingview/charting-library-examples) for some integration examples.

## Online code playgroundsâ

You can use the libraries on some code playgrounds/editors such as JSFiddle and Codepen. The [Online editors](/charting-library-docs/latest/getting_started/Online-Editors) article provides several starter templates, that can help you quickly create your own examples, reproduce bugs, and experiment with the libraries.

## Hosting the library on a separate originâ

If you want to host an HTML page that contains the chart and the library bundles on different origins (domains), refer to [Cross-origin hosting](/charting-library-docs/latest/getting_started/Hosting-Library-Cross-Origin).


---

## Key features | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Key-Features*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Key features

On this page

# Key features

This topic describes the key features of Advanced Charts and Trading Platform. You can find a full list of features on the [TradingView website](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=technical-analysis-charts). Note that some features that are available on [tradingview.com](https://www.tradingview.com/chart/) are not supported in the libraries.

## Advanced Charts featuresâ

The following features are available in Advanced Charts and Trading Platform.

### Mobile friendlinessâ

Advanced Charts and Trading Platform are compatible with mobile devices.

info

The chart layout adapts to the device type and screen size by resizing/hiding elements. This means that some features, such as [Watchlist](/charting-library-docs/latest/trading_terminal/# watchlist) and [News](/charting-library-docs/latest/trading_terminal/# news), may not be supported on smaller devices.

The library supports mouse and touch-based inputs and recognizes single and multi-touch gestures. Refer to the [Mobile app development](/charting-library-docs/latest/mobile_specifics/) topic for more information.

### Chart typesâ

Advanced Charts and Trading Platform support the following chart types:

  * Bars
  * Candles
  * Hollow candles
  * Line
  * Line with markers
  * Step line
  * Area
  * HLC area
  * Baseline
  * Columns
  * High-low
  * Heikin Ashi

info

The types below are available in the Trading Platform only.

  * Renko
  * Point-and-Figure
  * Line Break
  * Kagi

### Indicatorsâ

Advanced Charts and Trading Platform support more than 100 [indicators](/charting-library-docs/latest/ui_elements/indicators/). Follow the [Indicators List](/charting-library-docs/latest/ui_elements/indicators/Indicators-List) page to see all available indicators.

You can also create your custom indicators in JavaScript. Refer to [Custom Studies](/charting-library-docs/latest/custom_studies/) for more information. Note that [Pine ScriptÂ®](https://www.tradingview.com/pine-script-docs/) is not supported in the libraries.

### Drawingsâ

Advanced Charts and Trading Platform support more than 70 [drawings](/charting-library-docs/latest/ui_elements/drawings/). Follow the [Drawings List](/charting-library-docs/latest/ui_elements/drawings/Drawings-List) page to see all available drawings.

### Compare symbolsâ

Advanced Charts and Trading Platform allow you to display multiple symbols on the same chart. The library brings them to the common time zone and trading session. If some symbol's trading session is longer than others, the extra data is cut by default. Alternatively, you can [extend the time scale](/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale# for-overlay-study) using the [`secondary_series_extend_time_scale`](/charting-library-docs/latest/customization/Featuresets# important-features) featureset. For example, the current symbol's session starts at 09:00, and you add another symbol whose session starts at 08:00. In this case, the `08:00` timestamp appears on the time scale.

### Advanced price scaleâ

Advanced Charts and Trading Platform include additional logarithmic, percent, fractional, and other price scales. You can also display symbols in different currencies and units. For more information, refer to [Price Scale](/charting-library-docs/latest/ui_elements/Price-Scale).

### Building custom resolutionsâ

Advanced Charts and Trading Platform can build bars with a higher resolution using lower resolution data. For example, they can build 2-minute bars from 1-minute bars. For more information, refer to [Resolution](/charting-library-docs/latest/core_concepts/Resolution).

### Resolution in seconds and ticksâ

Advanced Charts and Trading Platform support resolutions in seconds and ticks. Refer to the [Resolution](/charting-library-docs/latest/connecting_data/Symbology# resolutions) topic for more information.

### Trading hoursâ

Advanced Charts and Trading Platform display trading hours for a symbol in a separate widget. The libraries also support [pre-market and post-market](/charting-library-docs/latest/connecting_data/Extended-Sessions) trading sessions.

![Session Widget](/charting-library-docs/assets/images/session-widget-d0ed57b7e389307dc804805e425663fe.png)

### Chart snapshotâ

Users can take [snapshots](/charting-library-docs/latest/ui_elements/Snapshots) in the UI. All snapshots are stored on the TradingView servers. The data storage period is not limited in time. You can also change the storage path using the [API](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# snapshot_url).

### Time zonesâ

Advanced Charts and Trading Platform support more than 80 time zones and daylight saving time for each of them. Users can select a time zone in the UI and observe the chart in the exchange's time zone or any time zone from the [list](/charting-library-docs/latest/ui_elements/timezones# supported-time-zones).

If a time zone you want to provide is not supported in the library, you can request it on [GitHub Issues](https://github.com/tradingview/charting_library/issues "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")). You can also create a [custom time zone](/charting-library-docs/latest/ui_elements/timezones# adding-custom-time-zones).

### Themeâ

Advanced Charts and Trading Platform include pre-designed dark and light themes. Note that users cannot switch the theme in the UI unless you develop this option outside the library. For more information, refer to the [Theme](/charting-library-docs/latest/customization/# theme) section.

## Trading Platform featuresâ

Refer to the [Trading Platform](/charting-library-docs/latest/trading_terminal/) article for more information about the features.

## Unsupported featuresâ

Neither Advanced Charts nor Trading Platform provides full functionality of the charts on [tradingview.com](https://www.tradingview.com/chart/). Since Advanced Charts and Trading Platform are client-side solutions, they do not support the client-server features listed below.

  * Pine ScriptÂ®
  * Alerts
  * Bar Replay Tool
  * Range Bars
  * TradingView data
  * Strategy Tester
  * Screener Widget
  * Technicals in the Details widget
  * Hotlists
  * Calendars
  * Chats
  * Heatmap
  * Patterns

tip

Consider using the TradingView [Widgets](/charting-library-docs/latest/getting_started/product-comparison# widgets) to display Calendars, Hotlists, and Heatmaps.


---

## Best Practices | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Best-Practices*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Best Practices

On this page

# Best Practices

This article describes the best practices for integrating the library into your website or mobile application.

## Separate Additional Features from the Libraryâ

The library is used to display charts, prices, and technical analysis tools. You can find a list of included features in the [Key features](/charting-library-docs/latest/getting_started/Key-Features) article.

If you need additional features like chats, special symbol lists, hot deals, advertisements, etc., you should implement them outside of the library. You can still integrate them to the library using the [API](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi).

## Choose an Appropriate Data Connection Approachâ

Pay attention to the differences between implementing a datafeed in JavaScript via the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) and using the predefined implementation with a server that responds in the [UDF](/charting-library-docs/latest/connecting_data/UDF) format. Refer to the following topic for more information: [Connecting Data](/charting-library-docs/latest/connecting_data/). If you need really fast data updates or data streaming, you can use WebSockets.

## Provide Correct Amount of Dataâ

Most issues with the library appear because data is provided incorrectly. Consider the following topic for more information: [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# correct-amount-of-data). Note that when you specify [Marks](/charting-library-docs/latest/ui_elements/Marks), you should provide data that matches the requested range.

## Consider the Chart's Sizeâ

The smallest meaningful size that the library supports is 500Ã500Â px. Avoid making charts smaller because they look messy. We recommend that you hide some UI elements if you need charts smaller than those mentioned above. Refer to the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor# chart-size) topic for more information on how to specify the chart's size.

## Localize Your Chartâ

The library [supports a variety of languages](/charting-library-docs/latest/core_concepts/Localization). Use the one that fits your users' needs.

## Enable Debug Logs during Developmentâ

Set the [`debug`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# debug) property to `true` in [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) to enable logs. We recommend that you enable the debug mode during the development and disable this mode in the production to speed up the code execution.

## If You Face Issuesâ

First, you should [update](/charting-library-docs/latest/releases/Update-Library) your library's build to the latest version. If the issues still appear, the steps below can help you to debug them:

  1. Set the [`debug`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# debug) property to `true` in Widget Constructor to enable logs.
  2. Check that you provide data correctly. Pay special attention to [symbology](/charting-library-docs/latest/connecting_data/Symbology) as it is the most common place to make a mistake.
  3. Review the output of our [demo data service](https://demo_feed.tradingview.com/quotes?symbols=AAPL) and compare this output to yours to ensure your backend behaves correctly.

You can also search your issue among the [GitHub Issues](https://github.com/tradingview/charting_library/issues "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) and the [Discord discussions](https://discord.gg/UC7cGkvn4U).

## Avoid Using Undocumented Featuresâ

All features that are not mentioned in the documentation are subject to change without any warnings and backward compatibility. Also, altering the source code is strictly prohibited by the legal agreement you signed.

## Avoid Using Demo Datafeed on a Production Websiteâ

The demo datafeed is not designed for real usage. It might be unstable and cannot withstand high loads.

## Speed Up Load Timesâ

We recommend that you use the following protocols to speed up load times:

  * HTTP/2 or higher
  * TLS 1.3 or higher

Also, you can compress the library's HTML files using Gzip or Brotli when sending them to a client.

## Set Minimum Expiration Time for charting_library.jsâ

All files in the library contain hash in their names except `charting_library.js` that you add to your HTML files. When you update the library to a newer version, all file names are changed as well. If a browser loads `charting_library.js` from the cache, then all the links in this file are broken. The expiration time for this file should be set to the minimum to prevent its caching.


---

## Frequently Asked Questions | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Frequently-Asked-Questions*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * FAQ

On this page

# Frequently Asked Questions

If your question is not outlined below, you can ask it on [GitHub Issues](https://github.com/tradingview/charting_library/issues "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) or join the [Discord discussions](https://discord.gg/UC7cGkvn4U).

## Data Managementâ

**1\. How do I connect my data? How to add new symbols?**

Refer to the following articles for information on how to connect data:

  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/)
  * [UDF](/charting-library-docs/latest/connecting_data/UDF)

Also, consider the [Datafeed: Common Issues](/charting-library-docs/latest/connecting_data/Datafeed-Issues) article to avoid typical errors when implementing the Datafeed API.

Use the [Demo Chart](https://charting-library.tradingview-widget.com) to investigate how the library processes data. Open the Network tab in a browser console and filter requests by `demo-feed` to see all data requests and responses.

**2\. Do you have an example of the Datafeed API implementation?**

You can consider [UDF Adapter](https://github.com/tradingview/charting_library/tree/master/datafeeds/udf "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) as an example of the Datafeed API implementation.

If you need a step-by-step guide, refer to the [How to connect data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial.

**3\. Do you have an example of a WebSocket data transport?**

The [How to connect data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial shows how to stream data using WebSocket.

**4\. Do you have an example of a backend datafeed in ASP.NET, Python, PHP, etc. ?**

The only example of a backend datafeed that we have is written in JavaScript for Node.js. For more information, refer to the [yahoo_datafeed](https://github.com/tradingview/yahoo_datafeed) repository.

**5\. How can I display data stored in a TXT/CSV/XLSX file?**

The library is intended to display data from a server, not a file. You should also keep in mind that according to the license agreement you can use the library on public websites only. If you still want to use a file as a data source, complete the following steps:

  1. Write an application using any server language (.NET, PHP, Node.js, Python, etc.). This application should read a file and transfer data from it in the [UDF](/charting-library-docs/latest/connecting_data/UDF) format over HTTP(S).

Note: You can provide data in another format or use a WebSocket to transfer it, but in this case you need a custom [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) implementation.

  2. Make sure a browser can send requests to your server. For this, you should either have a static IP or register a domain.

  3. Open `index.html` and replace `demo_feed.tradingview.com` with the URL to your server.

**6\. Why my data is not displayed / displayed incorrectly / incorrectly fetched from the server?**

The first thing you should do to debug any issue is to [enable console logs](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# debug). These logs contain the most important actions performed in the library. You can also refer to the [Datafeed: Common Issues](/charting-library-docs/latest/connecting_data/Datafeed-Issues) article that might answer your question.

Note that most data issues occur because symbol information is set incorrectly. To avoid these issues, consider [Symbology](/charting-library-docs/latest/connecting_data/Symbology).

**7\. The library is constantly asking for data. How to tell it that the data is over?**

To do this, you should use a flag that notifies the library that there is no more data on the server. Set the status code to `no_data` or the [`noData`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata# nodata) property to `true` if you use [UDF](/charting-library-docs/latest/connecting_data/UDF# bars) or [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# correct-amount-of-data), respectively.

**8\. How to change the number of decimal places for prices on the chart?**

The number of decimal places depends on the [`pricescale`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# pricescale) value. For more information on the price format, refer to the [Symbology](/charting-library-docs/latest/connecting_data/Symbology# price-format) article.

**9\. What if I have a single price for each timestamp?**

Since the library is intended to display multiple data types like candles, bars, and histograms, you are supposed to provide Open, High, Low, Close, and optional Volume for each timestamp. If you have a single price for each timestamp, you can pass `Open = High = Low = Close = price`. For better data visualization, you can change the default chart style to âLineâ (refer to the GUI section).

**10\. Why is`unsubscribeBars` called with a delay?**

This is intentional.

Refer to the [`unsubscribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# unsubscribebars) method for more information.

**11\. How to specify time properties within the library?**

All time properties should be [Unix timestamps](https://developer.mozilla.org/en-US/docs/Glossary/Unix_time) in **seconds** unless otherwise stated. For example, the code sample below specifies boundary values of a time range.
    
    
    const from = Date.now() / 1000 - 500 * 24 * 3600; // 500 days ago  
    const to = Date.now() / 1000;  
    

**12\. Does the library support the FIX protocol?**

Advanced Charts / Trading Platform is a browser-based client-side solution. You can implement your backend data connection with any instruments, including the FIX protocol, based on your requirements. However, the library does not provide any pre-made data integrations with the FIX protocol.

The diagram below illustrates the data connection layers. You should integrate the FIX protocol between your backend and the data provider.

[![Diagram illustrating data connection layers](/charting-library-docs/img/diagram-fix-protocol.svg)![Diagram illustrating data connection layers](/charting-library-docs/img/diagram-fix-protocol-dark.svg)](/img/diagram-fix-protocol.svg)

## GUIâ

**1\. How can I subscribe to chart events?**

You can subscribe to chart events in two ways:

  * Subscribe to [general](/charting-library-docs/latest/core_concepts/widget-methods# subscribe--unsubscribe) events that are related to a whole chart layout, not a specific chart.

  * Subscribe to events that are related to a [single](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# methods) chart such as [`isSelectBarRequested`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# isselectbarrequested).

Some methods that expose events only allow a subscription to be created by passing a single callback function, others return a [Subscription](/charting-library-docs/latest/api/interfaces/Broker.ISubscription) object that can be used to subscribe and unsubscribe.

**2\. How to change the default bar style?**

You can use the [`mainSeriesProperties.style`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesstyle) property to customize bar style. Refer to the [Chart Overrides](/charting-library-docs/latest/customization/overrides/chart-overrides# chart-styles) article for information.

**3\. How to customize the chart style?**

The library provides extensive customization options through multiple APIs. Refer to the [Customization](/charting-library-docs/latest/customization/) section for more information.

**4\. How can I change the list of resolutions (time intervals) on the chart / disable them?**

Refer to the [Resolution](/charting-library-docs/latest/core_concepts/Resolution# configure-resolutions-in-datafeed) article for more information.

**5\. How to enable the resolution in seconds?**

Refer to the [Resolution in seconds](/charting-library-docs/latest/core_concepts/Resolution# resolution-in-seconds) section for more information.

**6\. How to hide a GUI element (symbol, interval, button, etc.)?**

Most of GUI elements can be hidden using [featuresets](/charting-library-docs/latest/customization/Featuresets). There are base elements that cannot be hidden, but if you still want to get rid of them, you can use [CSS customization](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_css_url). Note that names, classes, and identifiers of the DOM elements may be changed in the next versions of the product without any notifications.

**7\. Why do the Ask/Bid buttons not work?**

Make sure you have implemented the [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes) method.

**8\. Can I add custom buttons to areas of the UI other than the top toolbar?**

Custom buttons created with [`createButton`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createbutton) and [`createDropdown`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createdropdown) can only be added to the [top toolbar](/charting-library-docs/latest/ui_elements/# top-toolbar). However, there are other ways to customize the UI: you can add extra buttons to the [context menu](/charting-library-docs/latest/ui_elements/context-menu) and [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket), or [modify other elements](/charting-library-docs/latest/customization/) to tailor the interface to your needs.

**9\. Why an indicator is not plotted when the resolution is changed?**

Indicators, such as _VWAP_ and _Pivot Points_ , use extensive historical data to calculate their values and may need more bars than are visible on the chart. These indicators are plotted only after the library gets all required data.

The library does not prefetch all data to avoid excessive requests. Therefore, when the resolution is changed, users need to scroll the chart for the indicator to appear.

## Localizationâ

**1\. What languages does the library support? How can I add the language that is not supported?**

The library supports a variety of languages. You can find the complete list in the [Localization](/charting-library-docs/latest/core_concepts/Localization# supported-languages) article. Note that it is impossible to add your own language support.

**2\. Could you provide the list of all UI strings so I can translate them?**

We cannot provide the list of UI strings. However, if you want to add custom translations, you can use the [`custom_translate_function`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_translate_function) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).

## Other Questionsâ

**1\. What is the difference between Widget, Advanced Charts, and Trading Platform?**

  * [Widget](https://tradingview.com/widget/) is connected to the TradingView data. Perfect for websites, blogs, and forums where you need a fast & free solution.

Integration is simply copying & pasting pre-made iframe code. Widget has lots of display modes.

  * [Advanced Charts](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/) is a chart with your data.

This is a standalone solution that you download, host on your servers, and connect your data to. You can use it in your site/app for free.

  * [Trading Platform](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=charting-and-trading-platform) is a standalone product that is licensed to brokers.

It contains all features available in Advanced Charts and also includes trading functionality, multiple-chart layouts, watchlists, details, news widgets, and other advanced tools. Trading Platform has its own licensing fees associated with it.

**2\. Does TradingView have access to any user data through the integration?**

No, TradingView does not collect any user data. Advanced Charts and Trading Platform are self-hosted solutions that run independently on your servers, ensuring there is no interaction with TradingView on user data.

**3\. Is there a way to see detailed logs when working with the library?**

Yes, you can enable debug modes that provide detailed logs for data connection and trading features. For more information, refer to [How to enable debug mode](/charting-library-docs/latest/tutorials/enable-debug-mode).

**4\. What should I do if I encounter a bug while using the library?**

If you come across a bug or issue while using the library, we recommend taking the following steps:

  1. **Check for updates**. Ensure that you are using the latest version of the library. Sometimes, bugs are resolved in newer releases. If you are not using the most recent version, [update the library](/charting-library-docs/latest/releases/Update-Library) before proceeding further.
  2. **Reproduce the bug**. After updating to the latest version, attempt to replicate the bug. This step helps determine whether the issue persists in the updated version.
  3. **Report the issue**. If the bug persists even after updating to the latest version, report it in [GitHub issues](https://github.com/tradingview/charting_library/issues)Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")). Provide detailed information about the issue, including steps to reproduce it, the library version, console logs, and any error messages encountered. This allows us to investigate and address the issue promptly.

**5\. Is it possible to reduce the size of the library?**

Yes. You can remove locales from the [bundle file](/charting-library-docs/latest/getting_started/Package-Content# package-content) if your app does not support them.

**6\. How do I add a custom indicator?**

Refer to [Custom indicators](/charting-library-docs/latest/custom_studies/) for more information.

**7\. Does the library support Rocket Loader by Cloudflare?**

No, it does not. Please avoid using Rocket Loader.

**8\. Do you provide iOS or Android SDKs like you do for Lightweight Charts?**

No, not currently. However, we have a collection of [integration examples](/charting-library-docs/latest/tutorials/# framework-integrations) for frameworks commonly used with Advanced Charts and Trading Platform. You can check the following examples:

  * [iOS WKWebView in Swift](https://github.com/tradingview/charting-library-examples/tree/master/ios-swift)
  * [Android WebView](https://github.com/tradingview/charting-library-examples/tree/master/android)
  * [React Native for iOS and Android](https://github.com/tradingview/charting-library-examples/tree/master/react-native)

**9\. How to integrate the library with Flutter?**

We do not have an example for integrating the library with Flutter currently. You can consider the [How to Build a Native Communication Bridge in Flutter with WebView and JavaScript](https://www.freecodecamp.org/news/how-to-build-a-native-communication-bridge-in-flutter-with-webview-and-javascript/) article that explains how to use Flutter with WebView and JavaScript.

**10\. How to switch from Advanced Charts to Trading Platform?**

Refer to the [How to migrate from Advanced Charts](/charting-library-docs/latest/trading_terminal/# how-to-migrate-from-advanced-charts) topic for more information.

**11\. Is it possible to use Pine ScriptÂ® for creating and editing indicators?**

[Pine ScriptÂ®](https://www.tradingview.com/pine-script-docs/) is not supported in Advanced Charts or Trading Platform. Alternatively, you can create your custom indicator using JavaScript. For more information, refer to [Custom indicators](/charting-library-docs/latest/custom_studies/).

**12\. Does Advanced Charts / Trading Platform support Alerts, Range Bars, Bar Replay Tool, and patterns?**

Some features that are available on [tradingview.com](https://www.tradingview.com/chart/) are not supported in the libraries, including Alerts, Range Bars, Bar Replay Tool, and patterns. Refer to the [Unsupported features](/charting-library-docs/latest/getting_started/Key-Features# unsupported-features) section for more information.

**13\. Why do I get error messages mentioning CSP or blob?**

Content Security Policy (CSP) is a web security standard that helps prevent various types of attacks. CSP defines a policy specifying which domains are considered trusted sources for content such as scripts, images, fonts, and other resources.

The error message may look like the following:
    
    
    Refused to load the image <URL>' because it violates the following Content Security Policy directive: "img-src 'self' blob data  
    

Depending on your use cases, implementation, browser compatibility, or internal company policies, you may encounter issues with some library features. These could include displaying screenshots, logos, or using emojis/icons within the chart.

We encourage you to properly assess the situation and choose the appropriate solution by reading the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) article.

When changing CSP is not allowed, you can enable the [`iframe_loading_compatibility_mode`](/charting-library-docs/latest/customization/Featuresets# iframe_loading_compatibility_mode) featureset. This featureset will instead use `about:blank` as the source URL and build the iframe HTML using `document.write`.

The blob method is the preferred approach but this featureset offers a fallback for non-standard applications.

**14\. Does the library set cookies?**

The library does not set any cookies.

If necessary, you can add your own cookies via server responses and restrict access to specific files, pages, or content based on the cookies set in the user's request.


---

## Glossary | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/glossary*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Glossary

On this page

# Glossary

This article contains terms that are used in the Advanced Charts documentation.

## Trading termsâ

### Bracket orderâ

An order that helps users limit their losses and secure their profits by bracketing positions with two opposing stop-loss and take-profit orders. Refer to [Bracket orders](/charting-library-docs/latest/trading_terminal/trading-concepts/brackets) for more information.

### Executionâ

The completion of a buy or sell order for a financial instrument. An execution involves matching a buyer and a seller and transferring ownership of the financial instrument.

### Individual positionâ

The amount of a singular holding or investment in a financial instrument.

### Limit orderâ

An order to buy or sell a financial instrument when a given or better price is reached. This order type guarantees a specific price but does not guarantee immediate execution.

### Limit priceâ

The maximum price a buyer is willing to pay or the minimum price a seller is willing to accept.

### Market orderâ

An order to buy or sell a financial instrument at the current market price. This order type guarantees immediate execution but does not guarantee a specific price.

### Net positionâ

The difference between an investor's total number of open long and short positions at any given time.

### Orderâ

A request made by a trader to buy or sell a financial instrument at a specified price and quantity. An order can have various attributes, such as a limit price, stop price, and duration. Depending on whether an order has been executed or not, it can be in various statuses such as canceled, filled, placing, or rejected. Refer to [Orders](/charting-library-docs/latest/trading_terminal/trading-concepts/orders) for more information.

### Order durationâ

The time during which an order remains active.

### Pipâ

The minimum price movement for Forex symbols. For more information on how to display pips, refer to the [Price format](/charting-library-docs/latest/connecting_data/Symbology# how-to-display-pips) section.

### Positionâ

The amount of a financial instrument held by an investor. For more information, refer to [Positions](/charting-library-docs/latest/trading_terminal/trading-concepts/positions).

### Position nettingâ

The process of aggregating multiple individual positions for one symbol into a single net position. For more information, refer to [Position netting](/charting-library-docs/latest/trading_terminal/trading-concepts/positions# position-netting).

### Quotesâ

Real-time price information for financial instruments, including the most recent bid and ask prices, opening and closing prices, price changes, and other market data. Refer to [Quotes](/charting-library-docs/latest/trading_terminal/trading-concepts/quotes) for more information.

### Stop-loss orderâ

A type of order designed to limit losses by automatically closing a position at a given price when it moves unfavorably.

### Stop orderâ

An order to buy or sell a financial instrument at the market price as soon as it reaches a certain level.

### Stop priceâ

A trigger price at which an order becomes a market or limit order.

### Take-profit orderâ

A type of limit order that closes a position at a specific price to secure a profit.

### Tickâ

The minimum price movement.

## Technical termsâ

### Datafeedâ

A middleware that requests data from a server and sends it to the library. Refer to the [Connecting data](/charting-library-docs/latest/connecting_data/) article for more information.

### Date rangeâ

A period of time that is currently visible on the chart canvas. This range changes when users scale the chart. Refer to [Time scale](/charting-library-docs/latest/ui_elements/Time-Scale# time-frame-toolbar) for more information.

### Featuresetâ

A toggle that allows you to enable or disable a certain feature. Refer to the [Featuresets](/charting-library-docs/latest/customization/Featuresets) article for more information.

### Paneâ

An area on the chart where a series or [indicator](/charting-library-docs/latest/ui_elements/indicators/) is displayed. The picture below shows the red pane with the main series and the green pane with the indicator.

![Chart panes](/charting-library-docs/assets/images/pane-d44d70e4c4be2d846c4ecdd789fc0e17.png)

### Plotâ

A line or area that represents indicator values on a chart.

### Seriesâ

A collection of data points that represents a specific metric over time. A series can be of different styles that affect how data is displayed on the chart. Refer to [Chart styles](/charting-library-docs/latest/customization/overrides/chart-overrides# chart-styles) for more information.

### Source symbolâ

A symbol that is used as a data source for a certain indicator. The indicator calculates its own data based on the symbol's data.

### Spread operatorsâ

Operators that allow comparison between a financial instrument, such as a stock, and an additional variable, such as another financial instrument or a numerical value. Spread operators can be enabled in the [Search Symbol](/charting-library-docs/latest/ui_elements/Symbol-Search# enable-spread-operators) and [Compare Symbol](/charting-library-docs/latest/ui_elements/indicators/# enable-spread-operators) dialogs.


---

## Accessibility | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/accessibility*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Accessibility

On this page

# Accessibility

## Disclaimerâ

The TradingView team is actively working to make the library more accessible and compliant with [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/). We understand that our product is complex and feature-rich, and achieving full accessibility for everyone is an ongoing journey. It is important to note that certain components might not fully meet accessibility requirements.

If you encounter any accessibility issues or have suggestions for improvements, kindly contact us at `accessibility@tradingview.com`. Note that this email is exclusively for accessibility matters. All other questions should be directed to [GitHub Issues](https://github.com/tradingview/charting_library/issues "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) or the [Discord discussions](https://discord.gg/UC7cGkvn4U).

At this stage, the library ships with the following accessibility features.

## Keyboard navigationâ

Users can navigate through elements on the top, bottom, and drawing toolbars using the `Tab` and arrow keys.

![Keyboard navigation](/charting-library-docs/assets/images/keyboard-navigation-3b31fbd6f4be1baaf77d4cb219886d3e.gif)

By default, users should press `Alt` \+ `Z` to start navigation. Alternatively, you can enable the [`accessible_keyboard_shortcuts`](/charting-library-docs/latest/customization/Featuresets# accessible_keyboard_shortcuts) featureset to start the navigation with `Tab`. In this case, the built-in [shortcuts](/charting-library-docs/latest/getting_started/Shortcuts) listed in the table below are also changed.

Action| Default shortcut| `accessible_keyboard_shortcuts`  
---|---|---  
Start keyboard navigation| `Alt` \+ `Z`| `Tab`  
Switch between charts| `Tab`| `Shift` \+ `â`  
Switch between charts in reverse order| `Shift` \+ `Tab`| `Shift` \+ `â`  
  
tip

The library includes built-in shortcuts that allow users to perform actions in the UI. You can also add custom shortcuts. For more information, refer to [Shortcuts](/charting-library-docs/latest/getting_started/Shortcuts).

## Color and contrastâ

Colors on the chart are compliant with the [WCAG 2.2 AA standard](https://www.w3.org/TR/WCAG22/# contrast-minimum). The library also provides multiple customization options. For example, you can configure colors for different UI elements, resize the chart size, and adjust fonts. For more information, refer to the [Customization](/charting-library-docs/latest/customization/) section.

## Screen reader compatibilityâ

The library supports the following screen readers.

  * [VoiceOver](https://support.apple.com/en-us/guide/voiceover-guide/welcome/web) on macOS
  * [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)/[JAWS](https://www.freedomscientific.com/products/software/jaws/)/[NVDA](https://www.nvaccess.org/about-nvda/) on Windows

To use a screen reader, users should download and enable it.


---

## Cross Origin Hosting | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Hosting-Library-Cross-Origin*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Cross Origin Hosting

On this page

# Cross Origin Hosting

If you need to host the library files on a separate origin (domain) to the page containing the chart then please ensure that the [`library_path` widget constructor parameter](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# library_path) is configured as follows:

  * The `library_path` value should start with either `http://` or `https://`, followed by the url to the folder containing the library's static files.
    * example: `library_path: 'https://example.com/charting_library/'`
  * `library_path` should end with a trailing forward slash.

## Example: Loading the standalone version from separate originâ

If you hosted the library files within a folder named `charting_library` on the `example.com` domain then you would configure the library as follows.

### Loading the standalone scriptâ

Place the following script tag within the `<head>` of the page.
    
    
    <script  
        type="text/javascript"  
        src="https://example.com/charting_library/charting_library.standalone.js"  
    ></script>  
    

### Specifying the `library_path` parameterâ

When evoking the widget constructor, ensure that the `library_path` value starts with `http` as described above.
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        library_path: 'https://example.com/charting_library/',  
      
        symbol: 'A',  
        interval: '1D',  
        container: 'tv_chart_container',  
        datafeed: new Datafeeds.UDFCompatibleDatafeed(  
            'https://demo_feed.tradingview.com'  
        ),  
    }));  
    

## Server setupâ

Make sure that the server hosting the library files is configured to allow cross-origin requests from the origin of the page containing the chart element. Please see this MDN article for more information: [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

### Demo Charts and Study Templates Storage Serverâ

Please note that the demo charts and [study template storage server](/charting-library-docs/latest/saving_loading/save-load-rest-api/# use-demo-storage) (`http://saveload.tradingview.com`) isn't compatible with requests from any origin except `localhost` and `tradingview.com`. Attempting to use this server from any other origin will still result in a CORS error.

Please see [Saving and Loading Charts](/charting-library-docs/latest/saving_loading/) for an overview on how to setup your own storage server.


---

## Using the library with online code playgrounds | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Online-Editors*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Online Editors

On this page

# Using the library with online code playgrounds

It is possible to use our hosted library bundles on a few select code playground / online editors (such as JSFiddle). This document provides guidance on how to correctly configure the library for these sites when using our hosted library files. Please see the starter templates below to get started quickly with a working example which you can use to create your own examples, produce bug reproductions, or experiment with the library.

  * See [Hosting Library Cross Origin](/charting-library-docs/latest/getting_started/Hosting-Library-Cross-Origin) for more information on how to use the library when the html page and the library bundles aren't on the same origin.

## How to setupâ

The latest version of the libraries are hosted on the following domains:

  * `https://charting-library.tradingview-widget.com`
  * `https://trading-terminal.tradingview-widget.com`

  1. Select one of the domains listed above depending on whether you are creating an example for the Advanced Charts or the Trading Platform. The following steps will use the `https://charting-library.tradingview-widget.com` domain.

  2. Within the head of your html file you can load the standalone versions of the library and the demo data-feed implementation with the following script tags:
    
        <script  
       type="text/javascript"  
       src="https://charting-library.tradingview-widget.com/charting_library/charting_library.standalone.js"  
    ></script>  
    <script  
       type="text/javascript"  
       src="https://charting-library.tradingview-widget.com/datafeeds/udf/dist/bundle.js"  
    ></script>  
    

  3. The `library_path` property in the widget constructor options should be set to `charting_library` sub folder of the domain of choice, for example:
    
        library_path: 'https://charting-library.tradingview-widget.com/charting_library/',  
    

## Supported sitesâ

Currently, the use of the hosted library files is only supported on the following sites:

  * [JSFiddle](https://jsfiddle.net)
  * [Glitch](https://glitch.com)
  * [Codepen](https://codepen.io)

Attempting to use the library files hosted by `tradingview-widget.com` on any other origin will result in a CORS error which will prevent the chart from loading correctly.

## Noteâ

  * The library files hosted by `tradingview-widget.com` will always be the latest version available on the [charting_library GitHub repository](https://github.com/tradingview/charting_library "The repository is private.") Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) on the `master` branch. If you would like to use a specific version then you should rather link to your hosted library files (and ensure that your server allows CORS for the code playground site of your choice).
  * Please note that theÂ [demo charts and study template storage server](/charting-library-docs/latest/saving_loading/# using-demo-charts-and-study-templates-storage)Â (`http://saveload.tradingview.com`) isn't compatible with requests from any origin exceptÂ `localhost`Â andÂ `tradingview.com`. Attempting to use this server from any other origin will still result in a CORS error.
  * When specifying a custom css file via the [`custom_css_url`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_css_url) widget constructor option, be aware that the css url should be specified relative to the [`library_path`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# library_path) option. Have a look at the [Themed Advanced Charts](https://glitch.com/edit/# !/charting-library-themed-starter) example for a working example.

## Starter templatesâ

Use one of the templates provided below to get started with a working example. You can 'fork' or 'remix' these templates to create your own examples and allow editing which can be saved and shared with others.

### JSFiddleâ

  * [Advanced Charts](https://jsfiddle.net/TradingView/8301r7nc/)
  * [Trading Platform](https://jsfiddle.net/TradingView/60vemsp8/)
  * [Themed Advanced Charts](https://jsfiddle.net/TradingView/v8x1hsdf/)
    * Note that this starter template has the custom CSS defined within the JS which is loaded via a blob URL. This is due to a restriction on additional files with JSFiddles.

### Glitchâ

  * [Advanced Charts](https://glitch.com/edit/# !/charting-library-starter)
  * [Trading Platform](https://glitch.com/edit/# !/trading-terminal-starter)
  * [Themed Advanced Charts](https://glitch.com/edit/# !/charting-library-themed-starter)



---

## NPM | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/NPM*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * NPM

On this page

# NPM

You can install the library as an NPM dependency. Follow the steps below to set it up.

## 1\. Configure package.jsonâ

Specify the library version number.
    
    
    {  
      "dependencies": {  
        "charting_library": "git@github.com:tradingview/charting_library.git# semver:28.0.0"  
      }  
    }  
    

Note that files located in `node_modules/charting_library/` are not bundled during the build process. You need to ensure that these files are included on the server and can be accessed by a specific path. To do this, add a script to copy the files into a folder that serves static assets. In this example, the `public` folder is used, but this may vary based on your project structure. Adjust the `copy-files` command accordingly.
    
    
    {  
      "scripts": {  
        "postinstall": "npm run copy-files",  
        "copy-files": "cp -R node_modules/charting_library/ public"  
      },  
      "dependencies": {  
        "charting_library": "git@github.com:tradingview/charting_library.git# semver:28.0.0"  
      }  
    }  
    

## 2\. Run npm installâ

This command also triggers the `postinstall` script, which copies the static files into the specified directory.

info

The library repository is private. `npm install` will only work if the Git client is logged into an account with access to the repository. Refer to [Getting Access](/charting-library-docs/latest/getting_started/quick-start# getting-access) for more information.

If you encounter installation issues, ensure your [SSH public key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) is added to your GitHub account and set for verification. If the `ssh -T git@github.com` command works, your SSH is set up correctly.


---

## Keyboard shortcuts | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Shortcuts*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Shortcuts

On this page

# Keyboard shortcuts

## Overviewâ

This article lists shortcuts built in Advanced Charts and Trading Platform. It also explains how to override the default shortcuts and specify custom ones.

info

The shortcut dialog that can be seen on [tradingview.com](https://www.tradingview.com/chart/) is not available in the libraries. Therefore, you need to implement a custom dialog if necessary.

## Advanced Charts shortcutsâ

The shortcuts below are available in Advanced Charts and Trading Platform.

tip

On macOS, you can use `â`/`â¥`/`â§` instead of `Ctrl`/`Alt`/`Shift`.

### Chartâ

You can use the following shortcuts to interact with the [chart](/charting-library-docs/latest/ui_elements/Chart).

Action| Shortcut  
---|---  
Open Quick Search| `Ctrl` \+ `K`  
Open indicators| `/`  
Load chart layout| `.`  
Save chart layout| `Ctrl` \+ `S`  
Undo| `Ctrl` \+ `Z`  
Redo| `Ctrl` \+ `Y`  
Change symbol| Start typing a symbol name  
Change interval| `Digit` or `,`  
Move chart 1 bar to the left| `â`  
Move chart 1 bar to the right| `â`  
Move chart to the left/right| `Shift` \+ Mouse wheel  
Zoom in| `Ctrl` \+ `â`  
Zoom out| `Ctrl` \+ `â`  
Move further to the left| `Ctrl` \+ `â`  
Move further to the right| `Ctrl` \+ `â`  
Toggle maximize pane| Double-click the pane  
Toggle collapse pane| `Ctrl` \+ Double-click the pane  
Go to date| `Alt` \+ `G`  
Take snapshot, saving URL to clipboard| `Alt` \+ `S`  
Reset chart| `Alt` \+ `R`  
Invert series scale| `Alt` \+ `I`  
Enable/disable logarithmic series scale| `Alt` \+ `L`  
Enable/disable percent series scale| `Alt` \+ `P`  
Zoom in focused area| `Ctrl` \+ Mouse wheel  
Start keyboard navigation| `Alt` \+ `Z`   
`Tab` if [`accessible_keyboard_shortcuts`](/charting-library-docs/latest/customization/Featuresets# accessible_keyboard_shortcuts) is enabled  
  
### Indicators and drawingsâ

You can use the following shortcuts to interact with [indicators](/charting-library-docs/latest/ui_elements/indicators/) and [drawings](/charting-library-docs/latest/ui_elements/drawings/).

Action| Shortcut  
---|---  
Partially erase drawing|  _Eraser_ \+ `Ctrl`  
Enable Gann box fixed increments| Hold `Shift`  
Enable measure tool| Hold `Shift` \+ Click  
Copy selected object| `Ctrl` \+ `C`  
Paste object| `Ctrl` \+ `V`  
Temporary turn on/off magnet mode| `Ctrl` \+ Move a point  
Hide all drawings| `Ctrl` \+ `Alt` \+ `H`  
Clone a drawing| `Ctrl` \+ Drag  
Select multiple drawings| Hold `Ctrl` \+ Click  
Move a drawing horizontally or vertically| Drag + `Shift`  
Move selected drawing left| `â`  
Move selected drawing right| `â`  
Move selected drawing up| `â`  
Move selected drawing down| `â`  
Draw _Trend line_| ` Alt` \+ `T`  
Draw _Horizontal line_| ` Alt` \+ `H`  
Draw _Vertical line_| ` Alt` \+ `V`  
Draw _Cross line_| ` Alt` \+ `C`  
Draw _Fib retracement_| ` Alt` \+ `F`  
Draw _Rectangle_| ` Alt` \+ `Shift` \+ `R`  
Draw _Square_|  _Rectangle_ \+ `Shift`  
Draw _Circle_|  _Ellipse_ \+ `Shift`  
Draw 45 degrees angle or horizontal|  _Trend line_ or _Channel_ \+ `Shift`  
  
## Trading Platform shortcutsâ

The shorcuts below are available in [Trading Platform](/charting-library-docs/latest/trading_terminal/) only.

### Chartâ

You can use the following shortcuts to interact with the [chart](/charting-library-docs/latest/ui_elements/Chart).

Action| Shortcut  
---|---  
Switch between charts| `Tab`   
`Shift` \+ `â` if [`accessible_keyboard_shortcuts`](/charting-library-docs/latest/customization/Featuresets# accessible_keyboard_shortcuts) is enabled  
Switch between charts in reverse order| `Shift` \+ `Tab`   
`Shift` \+ `â` if [`accessible_keyboard_shortcuts`](/charting-library-docs/latest/customization/Featuresets# accessible_keyboard_shortcuts) is enabled  
Toggle maximize chart| `Alt` \+ `Enter` or `Alt` \+ Click  
Add symbol to watchlist| `Alt` \+ `W`  
  
### Watchlistâ

You can use the following shortcuts to interact with [watchlist](/charting-library-docs/latest/trading_terminal/Watch-List).

Action| Shortcut  
---|---  
Switch to next symbol| `â` or `Space`  
Switch to previous symbol| `â` or `Shift` \+ `Space`  
Select all symbols| `Ctrl` \+ `A`  
Select next symbol| `Shift` \+ `â`  
Select previous symbol| `Shift` \+ `â`  
  
### Tradingâ

You can use the following shortcuts to trade.

Action| Shortcut  
---|---  
Place market order to buy| `Shift` \+ `B`  
Place market order to sell| `Shift` \+ `S`  
Place limit order| Click the [Depth of Market](/charting-library-docs/latest/trading_terminal/depth-of-market) (DOM) cell  
Place limit order to buy| `Shift` \+ `Alt` \+ `B`  
Place limit order to sell| `Shift` \+ `Alt` \+ `S`  
Place stop order| `Ctrl` \+ Click the [DOM](/charting-library-docs/latest/trading_terminal/depth-of-market) cell  
Center [DOM](/charting-library-docs/latest/trading_terminal/depth-of-market) data| `Shift` \+ `Alt` \+ `C`  
  
## Manage shortcutsâ

### Override shortcutsâ

The [`onShortcut`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# onshortcut) method allows you to override the builtâin shortcuts or specify custom ones. To do this, pass a keyboard shortcut and a callback function as parameters. The `shortCut` parameter depends on the key types:

  * If a shortcut consists of a modifier and alphabet keys, you should pass a string and use `+` as a separator.
    
        widget.onShortcut("alt+q", function() {  
      widget.chart().executeActionById("symbolSearch");  
    });  
    

  * If a shortcut consists of a non-alphabet key, you should pass the key code. You can refer to the [keycode.info](https://keycode.info) page to find out a key code.
    
        // F1  
    widget.onShortcut(112, function() {  
      widget.chart().executeActionById("symbolSearch");  
    });  
    

  * If a shortcut consists of modifier and non-alphabet keys, you should pass an array that contains strings and key codes.
    
        // Ctrl+Shift+\  
    widget.onShortcut(['ctrl', 'shift', 220], function() {  
        widget.chart().executeActionById("symbolSearch");  
    });  
    

### Disable shortcutsâ

The shortcuts listed below can be disabled using the corresponding [featureset](/charting-library-docs/latest/customization/Featuresets):

  * _Open indicators_ using [`insert_indicator_dialog_shortcut`](/charting-library-docs/latest/customization/Featuresets# insert_indicator_dialog_shortcut)
  * _Save chart layout_ using [`save_shortcut`](/charting-library-docs/latest/customization/Featuresets# save_shortcut)



---

## Package Content | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/Package-Content*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Package Content

On this page

# Package Content

The package is available on GitHub. You may check out the latest stable version (`master` branch). Please get in touch with us to get access to this repository.

You can check the library version by entering the `TradingView.version()` command in a browser console.

### Package contentâ
    
    
        +/charting_library  
            + /bundles  
            - charting_library.js  
            - charting_library.d.ts  
            - charting_library.cjs.js  
            - charting_library.esm.js  
            - charting_library.standalone.js  
            - datafeed-api.d.ts  
            - package.json  
        +/datafeeds  
            + /udf  
        - index.html  
        - mobile_black.html  
        - mobile_white.html  
        - test.html  
    

  * `/charting_library` contains all the library files.
  * `/charting_library/charting_library*` files contain an external library widget interface, they is not supposed to be edited.
    * `.js` is an [UMD](https://github.com/umdjs/umd) module (for backward compatibility).
    * `.esm.js` is an native JavaScript module, see [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
    * `.cjs.js` is an [CommonJS](https://en.wikipedia.org/wiki/CommonJS) module.
    * `.standalone.js` is an [iife](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) module.
    * `.d.ts` contains TypeScript definitions for the widget interface.
  * `/charting_library/datafeed-api.d.ts` contains TypeScript definitions for the data feed interface.
  * `/charting_library/bundles` stores library internal content and is not intended for other purposes, it should be like "black box" for you so it could be changed anytime without a notice.
  * `/charting_library/datafeeds/udf/` contains [UDF-compatible](/charting-library-docs/latest/connecting_data/UDF) datafeed wrapper (implements [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) to connect to library and UDF to connect to datafeed). Sample datafeed wrapper implements pulse real-time emulation. You are free to edit its code.
  * `/index.html` is an example of using library widget on your web page.
  * `/test.html` is an example of using different library customization features.
  * `/mobile*.html` are also examples of Widget customization.

All internal JS and CSS codes of the library are inlined and minified to reduce the page load time. Files that are expected to be edited by you were not minified.


---

## Other TradingView products | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/getting_started/product-comparison*

  * [](/charting-library-docs/)
  * [Getting Started](/charting-library-docs/latest/getting_started/)
  * Other TradingView products

On this page

# Other TradingView products

TradingView provides several charting solutions to display financial data. This page contains brief overview of these products and highlights their differences from Advances Charts / Trading Platform. For detailed information, refer to the [Compare libraries](https://www.tradingview.com/free-charting-libraries/) page.

## Lightweight Chartsâ¢â

[Lightweight Chartsâ¢](https://github.com/tradingview/lightweight-charts) is a free, open-source client-side library. It is 45 KB in size, which is smaller than a typical image of a chart. The main difference between this library and Advanced Charts is the way they retrieve data:

  * In Advanced Charts, you pass data in response to the library's request.
  * In Lightweight Chartsâ¢, you provide data directly to the library without any requests.

info

Neither Advanced Charts nor Lightweight Chartsâ¢ contains any market data. You should use data from your own source or third-party providers.

Note that Lightweight Chartsâ¢ does not contain any built-in indicators. Therefore, you should implement them on your own if required. Consider the [Moving Average](https://tradingview.github.io/lightweight-charts/tutorials/demos/moving-average) implementation example.

If you want to migrate from Lightweight Chartsâ¢ to Advanced Charts, consider the following table that contains common methods with similar functionality:

Functionality| Lightweight Chartsâ¢| Advanced Charts  
---|---|---  
Create a chart| `createChart`| Specify the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).  
Add a series of certain style| [`addLineSeries`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApiBase# addlineseries) or [`addCandlestickSeries`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApiBase# addcandlestickseries)| Specify any [series style](/charting-library-docs/latest/customization/overrides/chart-overrides# chart-styles) using the [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# overrides) property of the Widget Constructor.  
Get a pixel coordinate| [`timeToCoordinate`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ITimeScaleApi# timetocoordinate)| Advanced Charts / Trading Platform does not contain such method. As an alternative, consider using methods from the [`ITimeScaleApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimeScaleApi) interface.  
Create a price line| [`createPriceLine`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi# createpriceline)| [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline) or [`createShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createshape)  
  
## Widgetsâ

[Widgets](https://www.tradingview.com/widget-docs/) are free and simple standalone applications that do not require any code implementation. To embed a widget in your website, you just need to copy and paste the provided code. Widgets are hosted on the TradingView servers and display the TradingView data.

Compared to libraries, widgets offer fewer customization options. However, widgets have some additional features, such as Heatmaps and Hotlists, that are [not supported](/charting-library-docs/latest/getting_started/Key-Features# unsupported-features) in Advanced Charts.

If you like the Advanced Charts library but do not have your own data, consider using the [Advanced Chart widget](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/).

info

Note that you cannot connect your data to the widgets.


---

## Update the library | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/releases/Update-Library*

  * [](/charting-library-docs/)
  * Releases
  * Update the library

On this page

# Update the library

This article describes how to update Advanced Charts and Trading Platform. To do this, follow the steps below.

info

We are committed to keeping up with the latest technology trends and ensuring the library is compatible with evolving platforms and browsers. Therefore, we encourage you to regularly update the library's version. By keeping the library up-to-date, you can enhance your app performance and make sure it works smoothly on the latest browsers.

## 1\. Check a library versionâ

Check your current library version. To do this, run the following command in a browser console:
    
    
    TradingView.version()  
    

## 2\. Review release notesâ

Review [release notes](/charting-library-docs/latest/releases/release-notes) that describe changes in a version you would like to install. If your current version is more than one release behind the desired one, you should also check release notes for the previous versions.

Pay special attention to **breaking changes**. These changes can cause errors and require some enhancements in your code.

## 3\. Download a new versionâ

Go to the [Advanced Charts](https://github.com/tradingview/charting_library)Â ðÂ or [Trading Platform](https://github.com/tradingview/trading_platform "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) repository and download the latest version of the `master` branch.

![Download a new version](/charting-library-docs/assets/images/update_library-772e6e6743b48954e6044ef0d9785a8f.png)

If you want to download a version that is older than the latest, find the desired version among commits and reset the repository state to that commit.

![Old versions](/charting-library-docs/assets/images/old-versions-e991cf1c2ed3bab831e0b45c68948538.png)

caution

Advanced Charts and Trading Platform should only be downloaded from the official TradingView repositories provided within this documentation. Obtaining the library from third-party services is strictly prohibited and may lead to legal consequences.

The library is not redistributable. Therefore, it is prohibited to use any part of the library in public repositories.

## 4\. Unzip an archiveâ

When you download a ZIP archive, extract files from it to any folder you prefer. We recommend that you do not replace an old version with a new one in the existing project, but put this version in a new place. In this case, you keep a working copy that you can check with.

## 5\. Run the new versionâ

To test the new version, run the following command in a command line:
    
    
    npx serve <PATH_TO_YOUR_FOLDER>  
    

As a result, you get a URL that you need to copy and insert into your browser's address bar. Check the library version in a browser console to ensure you have installed the new version successfully.

## 6\. Implement new featuresâ

Implement new features if necessary. For more information about them, refer to the dedicated documentation sections that are introduced together with the features in the [release notes](/charting-library-docs/latest/releases/release-notes).

Everything that you worked on in previous versions should be compatible with the new version. However, you should always test your project on any versions you update to. If issues appear, make sure you have addressed all breaking changes.


---

## Release Notes | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/releases/release-notes*

  * [](/charting-library-docs/)
  * Releases
  * Release Notes

On this page

# Release Notes

tip

You can check the library version by executing `TradingView.version()` in a browser console.

## Version 29.1.0â

_Date: Fri Mar 07 2025_

### New Featuresâ

  * **Added the _Another symbol_ input field to Moving Average Multiple, Moving Average Triple, and Pivot Points Standard.** This field allows users to specify a different symbol for calculating the indicator. By default, the current symbol on the chart is used.#  

#### Trading Platform onlyâ

  * **Pre-/post-market lines.** Added the `pre_post_market_price_line` featureset that allows you to enable or disable the pre-/post-market price lines. To display the pre-/post-market lines, you need to provide the `rtc` property in [quotes](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedQuoteValues).#  

### Improvementsâ

  * **Adds an offset input to the Bollinger Bands indicator.** #  

  * **Allow overriding the default shortcuts.** Now, you can override the default shortcuts using the [`onShortcut`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# onshortcut) method. Note that modal dialogs shortcuts cannot be changed.#  

### Documentationâ

  * **New articles.** Explore our latest articles:
    * [Object tree](/charting-library-docs/latest/ui_elements/object-tree) â an overview of the feature.
    * [Quotes](/charting-library-docs/latest/trading_terminal/trading-concepts/quotes) â an article explaining the importance of quotes in Trading Platform.#  

  * **Other updates.** The following enhancements were made:
    * Updated the guide on [how to add a custom page to the Account Manager](/charting-library-docs/latest/tutorials/create-custom-page-in-account-manager). It now describes how to make the symbol name clickable on the custom page.
    * Added a guide on how to troubleshoot when [quotes are not displayed or refreshed](/charting-library-docs/latest/connecting_data/Datafeed-Issues# quotes-are-not-displayed-or-refreshed).
    * Added a guide on how to troubleshoot [delays in Trading Platform UI elements](/charting-library-docs/latest/connecting_data/Datafeed-Issues# delays-in-trading-platform-ui-elements).
    * Added a new FAQ â [Does the library set cookies](/charting-library-docs/latest/getting_started/Frequently-Asked-Questions# other-questions).#  

* * *

## Version 29.0.0â

_Date: Wed Feb 05 2025_

This major release introduces new features and enhancements focused on expanding UI customization options. Users now have greater control over drawings and indicators, allowing for a more tailored and flexible experience.

This release also includes several [breaking changes](/charting-library-docs/latest/releases/release-notes# v29_0-breaking-change) that impact the library API. Consider them to ensure compatibility with your implementation.

Key updates:

  * Better chart management with [leftmost bar visibility](/charting-library-docs/latest/releases/release-notes# v29_0-leftmost_bar_visibility)
  * Advanced [customization](/charting-library-docs/latest/releases/release-notes# v29_0-customize_order_and_position_lines) in Trading Platform
  * An alternative [loading mode](/charting-library-docs/latest/releases/release-notes# version-2810)
  * Enhanced [visualization](/charting-library-docs/latest/releases/release-notes# v28_3-symbol_name_in_the_watchlist_and_details_widgets) in the Watchlist and Details widgets
  * Removal of [Trading API](/charting-library-docs/latest/releases/release-notes# v29_0-removed_trading_api_methods_from_advanced_charts) methods from Advanced Charts

For a detailed breakdown of changes, refer to the sections below.

### Breaking Changesâ

  * **Removed trading API methods from Advanced Charts.** The following methods are now available exclusively in Trading Platform. If youâre using Advanced Charts, these methods will no longer be accessible.
    * [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline)
    * [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline)
    * [`createExecutionShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createexecutionshape)#  

  * **Changed the`getPositionDialogOptions` signature.** The [`getPositionDialogOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerCommon# getpositiondialogoptions) method is asynchronous and returns a promise now. The method also expects a symbol as a parameter.#  

  * **Broker API simplification.** To further improve and simplify the library, we have merged the two existing APIs, `IBrokerWithoutRealtime` and `IBrokerTerminal`, and now exclusively expose the latter. Additionally, we have removed the `subscribeDOM`/`unsubscribeDOM` methods, as they were rarely used and duplicated the functionality of [`subscribeDepth`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# subscribedepth)/[`unsubscribeDepth`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# unsubscribedepth). This change ensures that the datafeed fully handles all data management responsibilities.#  

  * **Removed the Anchored Note drawing.** #  

  * **Renamed the Note drawing to Pin.** #  

  * **Updated the default colors for drawings/indicators with Volume Profiles.** #  

  * **Added MACD smoothing inputs.** #  

  * **Drawing creation methods now return Promises instead of synchronous values.** The drawing creation methods ([`createShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createshape), [`createMultipointShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createmultipointshape), and [`createAnchoredShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createanchoredshape)) now return Promises that resolve to the drawing ID. The methods also throw an Error through a rejected Promise when the drawing creation fails, instead of returning `null`.#  

#### Trading Platform onlyâ

  * **Trading Platform methods for drawing creation now return Promises instead of synchronous values.** The ([`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline), [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline), and [`createExecutionShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createexecutionshape)) methods now return Promises that resolve to the corresponding API interface. #  

### New Featuresâ

  * **Added the _Another symbol_ input field to Ichimoku Cloud, Bollinger Bands, and Average Price.** This field allows users to specify a different symbol for calculating the indicator. By default, the current symbol on the chart is used.#  

#### Trading Platform onlyâ

  * **New properties for customizing order and position lines.** You can now override the style of order and position lines created with the [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api). The [`trading_customization`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# trading_customization) option in the Widget Constructor now supports `brokerOrder` and `brokerPosition` properties. For more details, see the [Trading Overrides](/charting-library-docs/latest/customization/overrides/trading-overrides# created-with-broker-api) article.#  

### Improvementsâ

  * **Added an option to keep the leftmost bar visible after resolution switching.** By default, the library resets the chart to the latest data when the resolution is changed. To keep the current time range, users can enable the Save chart left edge position when changing interval option in _Chart settings_ â _Scales_.#  

  * **Added option to hide/show scroll to the most recent bar button.** The presence of the _Scroll to the most_ recent bar button now depends on the Navigation buttons settings (_Chart settings_ â _Canvas_ â _Buttons_ â _Navigation_).#  

  * **Added a new`paneIndex` getter to the `StudyAPI`.** The [`paneIndex`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# paneindex) function returns the index of the pane the indicator belongs to.#  

  * **Enabled users to adjust coordinates of Parallel Channel within the drawing settings.** #  

  * **Enabled users to reverse the Long/Short Position drawings.** #  

  * **Buy/Sell buttons' visibility can now be changed for each chart in the layout.** #  

  * **Added the Volume option for the Date Range and Date & Price Range tools.** #  

  * **Added multiline option for Parallel Channel.** Additional level lines have been added.#  

  * **Show price line of Heikin Ashi on real price when the real price label is selected.** On Heikin Ashi chart, the price line now matches the position of the _Last price_ label when the _Real prices on price scale (instead of Heikin-Ashi price)_ setting is enabled.#  

  * **Added new time zone Azores (UTC-1).** #  

  * **Added an error message for unsupported resolutions.** If the selected resolution is not supported by the current symbol, an error message appears on the chart along with a button to switch to a supported resolution.#  

  * **Implemented dynamic loading for drawings to optimize bundle size.** Drawings have been refactored to utilize dynamic imports, reducing the initial bundle size by loading these components on-demand. This optimization results in faster initial page loads and improved application startup time, while maintaining full drawing functionality through lazy loading when tools are actually accessed by users.#  

  * **Added a star icon to chart context menu for indicator.** This icon is displayed next to the _Add this indicator to favorites / Remove this indicator_ from favorites option in the indicator context menu.#  

#### Trading Platform onlyâ

  * **Changed the return type for`OrderPreviewResult`.** When implementing [`previewOrder`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# previeworder), you can specify links to external URLs now. The links will be displayed within the `warnings` or `errors` block. #  

### Bug Fixesâ

  * **Fixed unreliable onChartReady callback with cached bundles.** When using `iframe_loading_compatibility_mode` with cached library bundles, the `onChartReady` callback would sometimes fail to execute. Fixes [# 8889](https://github.com/tradingview/charting_library/issues/8889)#  

  * **Long/Short Position tools are extended to the right if the next bar crosses stop/profit level.** Fixed a bug where Long/Short Position would get partially extended to the right if the next bar crossed the stop/profit level.#  

  * **Fixed hovering on the indicator legend.** Now, when an indicator is deleted via the legend, the hover state shifts to the legend of the next indicator below.#  

  * **Fixed an issue when cloning drawings that were not selected.** Fixed a bug where _Ctrl+Drag_ would create copies of the last selected drawings on chart, even if they were no longer selected. Now, this shortcut enables area selection.#  

### Documentationâ

  * **New how-to guide.** Check out a new [guide](/charting-library-docs/latest/tutorials/add-custom-button-to-top-toolbar) on how to add a custom button to the top toolbar.#  

  * **Other updates.** The following enhancements were made:
    * Added a new section that explains [multiple symbol resolving](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# multiple-symbol-resolving).
    * Updated information on how to [change colors of the _Buy/Sell_ buttons](/charting-library-docs/latest/customization/styles/CSS-Color-Themes# buysell-buttons-properties).
    * Updated the [Toolbars](/charting-library-docs/latest/ui_elements/Toolbars) article.
    * Added a new [section](/charting-library-docs/latest/ui_elements/Chart# execute-action-by-id) that describes how to trigger specific actions, such as opening the _Chart settings_ dialog, using the [`executeActionById`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# executeactionbyid) method.
    * Added an [overview](/charting-library-docs/latest/getting_started/product-comparison) of other TradingView products.#  

* * *

## Version 28.5.0â

_Date: Wed Dec 18 2024_

**New Features**

  * **Added`baselinePosition` property for column series.** The [`baselinePosition`](/charting-library-docs/latest/api/interfaces/Charting_Library.ColumnStylePreferences# baselineposition) property allows column series to be drawn relative to the specified baseline value.
    * The default value is `'bottom'`, which draws columns with the bottom of the chart pane as their baseline.
    * Setting the value to `'zero'` draws columns with a baseline of 0, displayed as either 0% or 0.00 depending on the price scale mode.# 
  * **Added the _Another symbol_ input field to Moving Average Double.** This field allows users to specify a different symbol for calculating the indicator. By default, the current symbol on the chart is used.# 

**Documentation**

  * **New how-to guide.** Check out a new [guide](/charting-library-docs/latest/tutorials/create-custom-page-in-account-manager) that explains how to create a custom page in the Account Manager.# 
  * **Other updates.** The following enhancements were made:
    * Added a new section that explains how to enable and specify [last day change values](/charting-library-docs/latest/ui_elements/Legend# last-day-change-values).
    * Updated information on [overnight sessions](/charting-library-docs/latest/connecting_data/Trading-Sessions# overnight-sessions).
    * Updated information on how to [close](/charting-library-docs/latest/trading_terminal/trading-concepts/positions# close-positions) and [reverse](/charting-library-docs/latest/trading_terminal/trading-concepts/positions# reverse-positions) positions.
    * Updated API overview page.# 

## Version 28.4.0â

_Date: Thu Nov 28 2024_

**New Features**

  * **Added`includeOHLCValuesForSingleValuePlots` option when exporting data.** When set to `true`, this option forces all four OHLC plot values to be exported, even if the plot has a single value. This applies, for example, when the symbol has `visible_plots_set: 'c'` or when the exported plot is a single-value style (Area, Baseline, Line, Line with markets, Stepline, or Column).# 

**Improvements**

  * **Added logging of quotes events.** Added extra logging of quote events when [debug mode](/charting-library-docs/latest/tutorials/enable-debug-mode# enable-debug-mode-for-data-connection) is enabled. The logs will contain information about quote data requests, real-time subscribe and unsubscribe events, and alerts for data requests that do not respond within 10 seconds.# 

**Bug Fixes**

  * **Fixed an issue where missing translations caused errors when opening the settings dialog of the Ichimoku Cloud indicator.**# 
  * **Fixed an issue where the Point and Figure series would not be displayed.**# 

**Documentation**

  * **New articles.** Explore our latest articles:
    * [Positions](/charting-library-docs/latest/trading_terminal/trading-concepts/positions) â an article that overviews position types supported in the library and describes how to manage them.
    * [UI elements](/charting-library-docs/latest/ui_elements/) â an overview of the library's UI elements.
    * [News](/charting-library-docs/latest/trading_terminal/news) â an article that explains how to connect data to the _News_ widget.# 
  * **Other updates.** The following articles were improved:
    * [NPM](/charting-library-docs/latest/getting_started/NPM)
    * [Custom themes API](/charting-library-docs/latest/customization/styles/custom-themes)
    * [CSS color themes](/charting-library-docs/latest/customization/styles/CSS-Color-Themes)
    * [Market Status](/charting-library-docs/latest/ui_elements/market-status)# 

## Version 28.3.0â

_Date: Thu Oct 24 2024_

**New Features**

  * **Symbol name in the Watchlist and Details widgets.** Now, the [`DatafeedQuoteValues.short_name`](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedQuoteValues# short_name) value is displayed as a symbol's short name in the [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List) and [Details](/charting-library-docs/latest/trading_terminal/# details). You can disable the [`prefer_quote_short_name`](/charting-library-docs/latest/customization/Featuresets# prefer_quote_short_name) featureset to revert to the old behavior. In this case, the [`ticker`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# ticker) value will be used instead. 

Trading Platform Only

# 

**Bug Fixes**

  * **Anchored Note in multi-layout.** Fixed an issue where plotting a saved Anchored Note in multi-layout would raise an error. 

Trading Platform Only

# 
  * **Fixed symbol logo persistence in legend.** Resolved an issue where a failed image load (e.g., a 404 error) for a symbol logo would cause the previous logo to persist in the legend. Now, the legend correctly updates to reflect the absence of a logo when loading fails. See the [Symbol logos](/charting-library-docs/latest/ui_elements/Legend# symbol-logos) section of the Legend documentation for more details on the feature.# 
  * **Fixed ordering of symbol logos.** Fixed an issue where symbol logos with two URLs defined in [`logo_urls`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# logo_urls) were displayed in an inconsistent order. The order has been corrected on the chart legend and within the Account Manager table.# 

## Version 28.2.0â

_Date: Tue Oct 01 2024_

**New Features**

  * **Added`Rank Correlation Index` indicator.**
  * **Support building seconds bars from ticks.** Trading Platform now supports building seconds bars from ticks for symbols configured to support it. Compatible symbols must set the [`build_seconds_from_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# build_seconds_from_ticks) flag to `true`. Additionally, [`has_seconds`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_seconds) and [`has_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_ticks) must be `true`, and [`seconds_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# seconds_multipliers) must be an empty array or only contain multipliers that the datafeed provides itself. 

Trading Platform Only

**Improvements**

  * **Added an option to customize the default Volume MA calculation in the Volume indicator.** By default, the Volume MA, optionally plotted in the Volume indicator, used the SMA calculation. We have now introduced two additional options: EMA and WMA.
  * **Added new event to`SubscribeEventsMap`.** The [`timeframe_interval`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# timeframe_interval) event is triggered when the one of the bottom left intervals is selected or the [`setTimeFrame`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# settimeframe) API is used.
  * **Added a symbol change to MACD indicator.** It is now possible to change the targeted symbol when plotting MACD indicator without using the main series.
  * **Sped up sorting animation in the Account Manager.** Raised by [# 8760](https://github.com/tradingview/charting_library/issues/8760)

Trading Platform Only

## Version 28.1.0â

_Date: Wed Sep 04 2024_

**Breaking Changes**

  * **Deprecated API methods.** [`activateBottomWidget`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# activatebottomwidget) is now marked `deprecated`. Please use [`setAccountManagerVisibilityMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# setaccountmanagervisibilitymode) instead. If you want to retrieve the current state of the Account Manager please use [`getAccountManagerVisibilityMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# getaccountmanagervisibilitymode)

**New Features**

  * **Added`iframe_loading_same_origin` featureset.** The `iframe_loading_same_origin` featureset ensures the library's iframe is loaded from the same domain as the `library_path` files.

**Improvements**

  * **Added new event to`SubscribeEventsMap`.** The [`study_dialog_save_defaults`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# study_dialog_save_defaults) event is triggered when the _Save as default_ option is selected in the indicator settings.
  * **Changed the return type for`OrderPreviewResult`.** When implementing [`previewOrder`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# previeworder), you can specify links to external URLs now. The links will be displayed within the `warnings` or `errors` block. 

Trading Platform Only

  * **Added an item counter for custom pages.** By default, custom pages added to the [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/) do not display the number of items in their corresponding table. Enabling [`displayCounterInTab`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerPage# displaycounterintab) will show this number next to the tab title. 

Trading Platform Only

**Bug Fixes**

  * **charting_library_debug_mode.** Fixed an issue where enabling the featureset `charting_library_debug_mode` was of no effect.

  * **Instant display of refreshed marks.** Fixed an issue where new [marks](/charting-library-docs/latest/ui_elements/Marks) added after calling [`refreshMarks`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# refreshmarks) were not immediately displayed on the chart. Previously, these marks only appeared after user interaction, but now they are instantly visible once the data is provided.

  * **Fixed an issue with`multiple_watchlists` featureset.** When the `multiple_watchlists` featureset was disabled, it was still possible to see the `Create a new list` option under the Watchlist drop-down menu.

**Documentation**

  * **New how-to guide.** Check out a new guide on [enabling debug modes](/charting-library-docs/latest/tutorials/enable-debug-mode) to help identify potential issues when implementing your app and ensure it is running smoothly.

## Version 28.0.0â

_Date: Wed Aug 14 2024_

**Breaking Changes**

  * **Removed`full_name`.** The `LibrarySymbolInfo.full_name` property was removed from public API. The property contained strings in the `'EXCHANGE:SYMBOL'` format and was used to request data from the datafeed. Therefore:

    * Now, you should use either the [`name`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# name) or [`ticker`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# ticker) property to specify an identifier for a certain symbol. For more information, refer to the [Symbology](/charting-library-docs/latest/connecting_data/Symbology# symbol-name) article.
    * Instead of `'EXCHANGE:SYMBOL'`, the library will send either `name` or `ticker` values to the datafeed when calling methods such as [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars), [`getQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# getquotes), and [`subscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# subscribequotes).
    * The `'EXCHANGE:SYMBOL'` strings are no longer displayed in the Trading Platform UI. The symbol name will be used instead. You can disable the [`prefer_symbol_name_over_fullname`](/charting-library-docs/latest/customization/Featuresets# prefer_symbol_name_over_fullname) featureset to revert to the old behavior. 

Trading Platform Only

  * **Deprecated API methods.** The following methods are now marked `deprecated` for the Advanced Charts users.

    * [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline)
    * [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline)
    * [`createExecutionShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createexecutionshape)

These methods will be removed from the Advanced Charts library in the next major version. However, they will still be available in Trading Platform.# 

  * **Make`cancelOrders` optional.** The [`cancelOrders`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# cancelorders) method is marked as optional because the library calls it only for the [Depth of Market](/charting-library-docs/latest/trading_terminal/# depth-of-market) widget. 

Trading Platform Only

# 

  * **Removed the`calculatePLUsingLast` flag.** The `calculatePLUsingLast` [broker configuration flag](/charting-library-docs/latest/trading_terminal/trading-concepts/trading-features-configuration) has been removed. 

Trading Platform Only

# 

  * **Symbol search dialog behavior.** Previously, when users pressed _Enter_ in the [_Symbol Search_](/charting-library-docs/latest/ui_elements/Symbol-Search) dialog, they could enter arbitrary input directly. This input was passed to the datafeed for resolution and loading, regardless of whether the input matched any search results.  
Now, pressing _Enter_ selects the top search result unless the user has explicitly chosen another item. If there are no search results, pressing _Enter_ will have no effect. You can enable the [`allow_arbitrary_symbol_search_input`](/charting-library-docs/latest/customization/Featuresets# allow_arbitrary_symbol_search_input) featureset to use the old behavior.

  * **Change custom translation API.** Change the [custom_translate_function](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_translate_function) interface to accept different parameters: the original text, the singular original text, and the translated text. For example "prices", "price", "prix".

  * **Changed the behavior of data display in the Depth of Market widget.** Now, data is displayed in static mode. This means that the price series is fixed, while the current price moves within, above, or below the designated range. To center on the current price, click the centering button () or use the _Shift + Alt/Option + C_ shortcut. Previously, centering was applied dynamically.

  * **Renamed the Symbol Info dialog.** The _Symbol Info_ dialog and the corresponding items in context menus are called _Security Info_ now. [# 8444](https://github.com/tradingview/charting_library/issues/8444)

  * **Renamed ErrorCallback to DatafeedErrorCallback.** `ErrorCallback` used in `IDatafeedChartApi` has been renamed to `DatafeedErrorCallback`.

  * **Updated`selectedCurrency` behavior.** In `CurrencyInfo`, the [`selectedCurrency`](/charting-library-docs/latest/api/interfaces/Charting_Library.CurrencyInfo# selectedcurrency) property now returns `null` instead of `"Mixed"` when price scales contain mixed currencies.

  * **Deprecated property.** The `brokerConfig` property in the [`TradingTerminalWidgetOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions) interface is deprecated and will be removed in the next major release. Use the [`broker_config`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# broker_config) property instead.

**New Features**

  * **New Custom themes API.** This API allows you to customize colors of the chart elements including toolbars, dialogs, and buttons. To do this, you should specify your own theme with a custom color palette. For more information, refer to the [Custom themes API](/charting-library-docs/latest/customization/styles/custom-themes) article.
  * **Added Volume Candles chart style.** This chart style allows for a visual assessment of the volume of trades for each candle. These are still candlesticks, but the width of each candle depends on the volume of trades during the period of formation of this candle. The greater the trading volume during the formation period of the candle, the larger the width of the candle. To display Volume Candles, select the corresponding option in the drop-down menu on the top toolbar.

**Improvements**

  * **Behavior change for`chartContextMenuActions`.** When the [`chartContextMenuActions`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# chartcontextmenuactions) method returns an empty array, the _Trade_ item within the chart [context menu](/charting-library-docs/latest/ui_elements/context-menu) will not be displayed. Previously, the item was rendered but grayed out. 

Trading Platform Only

# 

  * **Added the`library_custom_fields` property to the `LibrarySymbolInfo` interface.** This property is used to include additional metadata in the symbol information. The metadata will not be processed by the library.# 

  * **Added extra properties to`symbolExt` method.** The [`symbolExt`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# symbolext) method now returns additional properties including `ticker`.# 

  * **Added the`debug_broker` option to the Widget Constructor.** When [`debug_broker`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# debug_broker) is specified, the library logs calls and responses to [`IBrokerTerminal`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal) and [`IBrokerConnectionAdapterHost`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) in the browser console. You can set `debug_broker` to one of the debug levels defined by [`BrokerDebugMode`](/charting-library-docs/latest/api/modules/Charting_Library# brokerdebugmode). 

Trading Platform Only

# 

  * **Updated the Anchored VWAP drawing.** Add bands settings to the Anchored VWAP drawing.# 

  * **Added new methods to the Trading Host.** The `getOrderTicketSetting` and `setOrderTicketSetting` methods have been added to the [`IBrokerConnectionAdapterHost`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) interface. These methods allow you to read and adjust Order Ticket settings. 

Trading Platform Only

# 

  * **Changed`const enum` to `enum` in the library type declarations.** This change allows you to import enums from the library in a TypeScript environment with the [`isolatedModules`](https://www.typescriptlang.org/tsconfig/# isolatedModules) option enabled, such as when using Vite or similar tools.# 

  * **Added the`hideStudiesFromLegend` option to `ClientSnapshotOptions`.** When `hideStudiesFromLegend` is set to true, the legend within the generated screenshots won't contain any studies applied to the chart.# 

  * **Exposed`connectionStatusUpdate` from `IBrokerConnectionAdapterHost`.** An existing [`connectionStatusUpdate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# connectionstatusupdate) API has been exposed for [`IBrokerConnectionAdapterHost`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) to help reflect connection status changes throughout the application lifecycle. 

Trading Platform Only

# 

  * **New keyboard shortcuts.** The following [shortcuts](/charting-library-docs/latest/getting_started/Shortcuts) were added:

    * _Shift_ \+ _Mouse wheel_ â scroll the chart horizontally
    * _Shift_ \+ _Alt_ \+ _B_ â place limit order to buy
    * _Shift_ \+ _Alt_ \+ _S_ â place limit order to sell
  * **Enabled in-place editing for drawing texts.** For the following drawings, users can now add custom text and edit it on the chart:

    * _Fib Retracement_
    * _Trend-based Fib Extension_
    * _Horizontal_ and _Vertical Line_
    * _Trend Line_
    * _Info Line_
    * _Ray_
    * _Extended Line_
    * _Signpost_
    * _Note_
    * _Anchored Note_
    * _Comment_
    * _Rectangle_
    * _Ellipse_
    * _Circle_

To enter the text, users should click the _+Add text_ placeholder that appears on hover.

  * **Disabled color pickers in Chart settings.** If a certain price label or line is hidden on the chart, users cannot adjust the color of this label/line in the _Chart settings_ dialog.

  * **Time zones.** Time zone updates:

    * Changed the Almaty (UTC+6) time zone to Astana (UTC+5).
    * Added the new Kuala Lumpur (UTC+8) time zone.
  * **Visibility of price labels for risk-reward drawings.** Previously, price labels for the _Long position_ and _Short position_ drawings could be either hidden entirely or always displayed. Now, if the price labels are disabled for a certain drawing, the labels will be displayed when the drawing is selected.

  * **Accessibility improvement.** Users can now select the following elements in the _Legend_ when navigating with the keyboard.

    * The _More_ () button and items in the corresponding menu
    * The _Remove_ () button
  * **Added new multiple-chart layouts combinations.**

Trading Platform Only

  * **New style settings for the Note drawing.** Now:

    * The _Background_ and _Border_ settings are optional.
    * The default color of the drawing depends on the current chart [theme](/charting-library-docs/latest/customization/# theme).

**Bug Fixes**

  * **Fixed the _Pivot Points Standard_ compatibility with Japanese chart types.** The _Pivot Points Standard_ indicator used to cause the _Assertion failed: data must have unique sorted times_ error when applied to chart types such as Line Break, Renko, Kagi, and Point-and-Figure under certain data conditions.
  * **Workaround for corrupted chart layouts.** In rare cases, chart layouts can become corrupted and cause a _DEFAULT_SYMBOL is not defined_ error when loaded by the library. To work around this error, set [`symbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol) to be used as a fallback for any corrupted charts.
  * **Fixed an issue where 0-volume data were not displayed in the Legend.** [# 8662](https://github.com/tradingview/charting_library/issues/8662)
  * **Fixed the time indicator.** The time indicator now correctly moves across the timeline in the [Market Status](/charting-library-docs/latest/ui_elements/Symbol-Status) pop-up.
  * **Fixed resizing for risk-reward tools.** The resizing of _Long position_ and _Short position_ drawings works correctly now. [# 8513](https://github.com/tradingview/charting_library/issues/8513)
  * **Fixed changing of drawing coordinates.** The setting dialog used to crash when users changed coordinates of drawings such as _Anchored Volume Profile_ , _Fixed Range Volume Profile_ , and _Regression Trend_.
  * **Fixed the drawing settings bug.** Previously, when users clicked _Hide/Show_ on a drawing, the settings applied to this drawing would override the default ones. Now, changing drawing visibility does not affect the default settings. [# 8434](https://github.com/tradingview/charting_library/issues/8434)
  * **Fixed colors of the scale buttons.** The colors of the _A_ (auto) and _L_ (log) scale buttons match the chart background color now. [# 8459](https://github.com/tradingview/charting_library/issues/8459)
  * **Fixed bugs on the multiple-chart layout.**

Trading Platform Only

The following bugs were fixed:
    * The _Long/Short Position_ drawing used to cause errors if the drawing was hidden for a certain resolution and that resolution was currently displayed on the chart.
    * Synchronized _Path_ and _Polyline_ drawings were not displayed on larger resolutions if the first two points of the drawing were set at the same level on a smaller resolution.
    * The _Curve_ and _Double Curve_ drawings used to cause errors if a user moved the drawing before enabling layout synchronization.
    * Changing the Profit/Stop level of the synchronized _Long/Short Position_ drawing used to cause errors if the drawing was hidden for a certain resolution and that resolution was currently displayed on the chart.

**Documentation**

  * **Updated types for overrides.** The following categories of overrides within the [`ChartPropertiesOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides) have been added or updated:
    * Added types for the Step line chart style (`mainSeriesProperties.steplineStyle.*`).
    * Updated the types for `paneProperties.*`.
    * Added overrides that affect Trading Platform features (`tradingProperties.*`).
  * **New articles.** Explore our latest articles:
    * [How to create a custom indicator](/charting-library-docs/latest/tutorials/create-custom-indicator/) â a step-by-step tutorial that demonstrates the Moving Average implementation.
    * [Custom indicators. Inputs](/charting-library-docs/latest/custom_studies/metainfo/Custom-Studies-Inputs) â an overview of how to specify and manage input parameters for a custom indicator.
    * [Authentication](/charting-library-docs/latest/trading_terminal/trading-concepts/authentication) â an article that outlines possible authentication approaches. 

Trading Platform Only

## Version 27.006â

_Date: Tue May 21 2024_

**Bug Fixes**

  * **Resolve quotes with ticker instead of symbol name.** The library will now request quote data using the [`ticker`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# ticker) property. If `ticker` is not provided in the `LibrarySymbolInfo` object, the `name` property will be used instead. This should resolve an issue some customers were experiencing where quote data was not being properly displayed in the [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List) and [Legend](/charting-library-docs/latest/ui_elements/Legend).

## Version 27.005â

_Date: Tue May 07 2024_

**Improvements**

  * **Update the Anchored AVWAP drawing.** Add bands settings to the Anchored VWAP drawing.
  * **Subscribe to widget bar visibility events.** A new [`study_event`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# study_event) type was added: `widgetbar_visibility_changed`. It returns the visibility state of the widget bar.

**Bug Fixes**

  * **Fixed a bug in the Market Status pop-up.** [Corrections](/charting-library-docs/latest/connecting_data/Extended-Sessions# corrections-for-extended-sessions) specified for the extended session in the [`session-correction`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo# session-correction) properties were not displayed in the _Market Status_ pop-up window.

## Version 27.004â

_Date: Wed Apr 17 2024_

**Breaking Changes**

  * **Fixed time parameters in CrossHairMovedEventParams.** In version 26.001, we changed the `time` property of [`CrossHairMovedEventParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CrossHairMovedEventParams) to be a timestamp in the selected time zone. In this version, we reverted that change, and `time` represents a UTC timestamp again. Additionally, we introduced a new [`userTime`](/charting-library-docs/latest/api/interfaces/Charting_Library.CrossHairMovedEventParams# usertime) property that represents a timestamp in the selected time zone.

**Improvements**

  * **Added ability to disable pulse animation when chart type is set to Line.** New _disable_pulse_animation_ featureset allows users to disable the pulse animation when chart type is set to Line.

**Bug Fixes**

  * **Fixed the price scale placement.** The [price scale](/charting-library-docs/latest/ui_elements/Price-Scale) should be placed back to its original position when a change made through the _Settings_ dialog is canceled. Fixes [# 4991](https://github.com/tradingview/charting_library/issues/4991)
  * **Fixed the 52 Week High/Low indicator issue.** The 52 Week High/Low indicator no longer adds an empty space to the price scale when less than 52 weeks of historic bars are available. Fixes [# 8137](https://github.com/tradingview/charting_library/issues/8137) [# 8469](https://github.com/tradingview/charting_library/issues/8469)
  * **Only calculate VWAP value when entire anchor period is loaded.** The VWAP indicator will only calculate values for the input anchor period if all bars in that period have been loaded.
  * **Fixed a trailing stop modification dialog error.** Fixed a problem where opening the Order Ticket for a trailing stop position caused a "ReferenceError: isPositionLikeItem is not defined" error to be thrown.
  * **Fixed the incorrect point position for the Long Position drawing.** The `getPositionPoints()` method will now return correct point positions. Fixes [# 8230](https://github.com/tradingview/charting_library/issues/8230)
  * **`BREAKING CHANGE` Position line price label does not use the correct price formatter.** The price scale will now correctly reflect the value when a formatter is used with [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline). Both [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline) and [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline) methods behave similarly to the corresponding actions made in the UI via [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket). Fixes [# 8413](https://github.com/tradingview/charting_library/issues/8413) [# 8324](https://github.com/tradingview/charting_library/issues/8324)

**Documentation**

  * **New User accounts article.** Refer to [User accounts](/charting-library-docs/latest/trading_terminal/account-manager/user-accounts) for information on how to manage user accounts in the [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/).
  * **Session documentation updates.** The [Symbology](/charting-library-docs/latest/connecting_data/Symbology# session) and [Extended sessions](/charting-library-docs/latest/connecting_data/Extended-Sessions) articles now include more information on how to specify sessions and corrections for them.
  * **New Save user settings article.** Refer to the [Save user settings](/charting-library-docs/latest/saving_loading/user-settings) article for information on how to store user settings.
  * **Updated Watchlist article.** Explore our latest [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List) article that describes how to customize and handle the watchlist's data.

## Version 27.003â

_Date: Thu Mar 14 2024_

**Improvements**

  * **Added the resetLayoutSizes method.** Use [`resetLayoutSizes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# resetlayoutsizes) to reset the sizes of all charts within a multiple-chart layout back to their initial default values. 

Trading Platform Only

  * **Added the unloadUnusedCharts method.** The [`unloadUnusedCharts`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# unloadunusedcharts) method deletes non-visible charts from a multiple-chart layout. Use this method to prevent the library's inherent behavior to restore previously displayed charts instead of creating new charts when changing layouts. 

Trading Platform Only

  * **Added a new type that reflects the ID of the created indicator.** A new [`study_event`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# study_event) type was added: `create`. It returns the `id` of the newly created indicator.

**Bug Fixes**

  * **Displaying volume indicator on chart load when visible_plots_set is not specified.** The chart will now correctly display the volume indicator if the `create_volume_indicator_by_default` featureset is enabled even if the symbols [LibrarySymbolInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) doesn't specify the optional [`visible_plots_set`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# visible_plots_set) property.
  * **Prioritise widget constructor symbol over saved state.** The [`symbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol) property in the widget constructor will now have priority over symbols loaded from saved chart states when using [`saved_data`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# saved_data) or [`load_last_chart`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# load_last_chart). Fixes [# 7922](https://github.com/tradingview/charting_library/issues/7922) [# 8473](https://github.com/tradingview/charting_library/issues/8473) [# 7926](https://github.com/tradingview/charting_library/issues/7926) [# 8168](https://github.com/tradingview/charting_library/issues/8168)
  * **Fixed an issue where the time_frames description was ignored.**

## Version 27.002â

_Date: Thu Feb 22 2024_

**Improvements**

  * **Add positive and negative filled areas to Spread.** The Spread indicator now has a positive and negative filled area above and below the baseline value of 0. The colors of the filled areas are green and red respectively.

**Bug Fixes**

  * **Brush drawing_event is now raising a`create` event when starting drawing.**

**Documentation**

  * **Improved drawing documentation.** Explore our latest articles about drawings.
    * New [Drawings API](/charting-library-docs/latest/ui_elements/drawings/drawings-api) article describes how to manage drawings in the code.
    * Updated [Drawing Overrides](/charting-library-docs/latest/customization/overrides/Drawings-Overrides) article now includes more information on how to customize drawings.

## Version 27.001â

_Date: Fri Feb 2 2024_

**Improvements**

  * **Custom indicators can now dynamically hide indicator inputs in the legend when plots are hidden.** The `hideWhenPlotsHidden` option has been added for a custom indicator's input. It enables you to hide an input's value in the legend text when the user hides all of the specified plots.

**Bug Fixes**

  * **Allow studies that extend the time scale to load historic bars before the leftmost bar of the main series.**

**Documentation**

  * **New articles**
    * [Context menu](/charting-library-docs/latest/ui_elements/context-menu)
    * [Orders](/charting-library-docs/latest/trading_terminal/trading-concepts/orders)
    * [Snapshots](/charting-library-docs/latest/ui_elements/Snapshots)

## Version 27â

_Date: Wed Jan 17 2024_

**Breaking Changes**

  * **Custom study plot style text property moved.** The chars and shapes custom study plots `text` style property was moved from `metainfo.defaults.styles.[plot id].text` to `metainfo.styles.[plot id].text`. See this GitHub issue for more details [# 8184](https://github.com/tradingview/charting_library/issues/8184)
  * **Changed context menu behavior of the 'Plus' button and removed the 'show_context_menu_in_crosshair_if_only_one_item' featureset.** Now, the context menu of the _Plus_ button opens even if the menu has only one item. Previously, the item's action was immediately executed if there was only one item in the context menu. Additionally, the `show_context_menu_in_crosshair_if_only_one_item` featureset has been removed.

**Breaking Changes: Trading Platform**

  * **Changed parameter type in the showPositionDialog method.** The `position` parameter type of the [`showPositionDialog`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerCustomUI# showpositiondialog) method in the [`BrokerCustomUI`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerCustomUI) interface has been changed to `Position | IndividualPosition`.
  * **Renamed flags in the BrokerConfigFlags interface.** The following flags have been renamed in the [`BrokerConfigFlags`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerConfigFlags) interface:
    * `supportTrades` flag has been renamed to `supportPositionNetting`;
    * `supportTradeBrackets` flag has been renamed to `supportIndividualPositionBrackets`;
    * `supportCloseTrade` flag has been renamed to `supportCloseIndividualPosition`;
    * `supportPartialCloseTrade` flag has been renamed to `supportPartialCloseIndividualPosition`;
    * `requiresFIFOCloseTrades` flag has been renamed to `requiresFIFOCloseIndividualPositions`.
  * **Renamed TradeBase and Trade interfaces.** The `TradeBase` interface has been renamed to [`IndividualPositionBase`](/charting-library-docs/latest/api/interfaces/Charting_Library.IndividualPositionBase) and the `Trade` interface has been renamed to [`IndividualPosition`](/charting-library-docs/latest/api/interfaces/Charting_Library.IndividualPosition) respectfully. All fields and their types has been left unchanged.
  * **Renamed tradeColumns field in the AccountManagerInfo interface.** The `tradesColumns` field in the [AccountManagerInfo](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerInfo) interface has been renamed to `individualPositionColumns`.
  * **Renamed Trade member to IndividualPosition in the ParentType enum.** The `Trade` member of the [`ParentType`](/charting-library-docs/latest/api/enums/Charting_Library.ParentType) enum has been renamed to `IndividualPosition`.
  * **Renamed trade related methods in the IBrokerConnectionAdapterHost interface.** The following methods in the [`IBrokerConnectionAdapterHost`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) have been changed:
    * the `tradeUpdate` method has been renamed to [`individualPositionUpdate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# individualpositionupdate). The `trade` parameter of the method has been renamed to `individualPosition`. Also, the type of that parameter has been changed to `IndividualPosition`;
    * the `tradePartialUpdate` method has been renamed to [`individualPositionPartialUpdate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# individualpositionpartialupdate). The type of the `changes` parameter has been changed to `Partial<IndividualPosition>`;
    * the `tradePLUpdate` method has been renamed to [`individualPositionPLUpdate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# individualpositionplupdate);
    * the type of the `position` parameter of the [`showPositionBracketsDialog`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# showpositionbracketsdialog) method has been changed to `Position | IndividualPosition`.
  * **Renamed methods in the IBrokerWithoutRealtime interface.** The following changes have been made in the [`IBrokerWithoutRealtime`](https://www.tradingview.com/charting-library-docs/v27/api/interfaces/Charting_Library.IBrokerWithoutRealtime.md) interface:
    * The `closeTrade` method has been renamed to `closeIndividualPosition`;
    * The `editTradeBrackets` method has been renamed to `editIndividualPositionBrackets`.
  * **Renamed trade method in the IBrokerCommon interface.** The `trades` method in the [`IBrokerCommon`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerCommon) has been renamed to `individualPositions`. The return type of that method has been changed to `Promise<IndividualPosition[]>`.
  * **Removed the Order Panel button from the right toolbar.** To open [_Advanced Order Ticket_](/charting-library-docs/latest/trading_terminal/# advanced-order-ticket), users should use the _Trade_ button in _Account Manager_ now.

**New Features**

  * **Enabled in-place editing in Legend.** Users can change a symbol and resolution right from the [_Legend_](/charting-library-docs/latest/ui_elements/Legend) now. [# 7966](https://github.com/tradingview/charting_library/issues/7966)
  * **Added Quick Search.** The _Quick Search_ dialog allows users to search for drawings, UI settings, and functions, such as _Remove Indicators_. To open this dialog, users should click the _Quick Search_ button on the top toolbar or use the _Ctrl/Cmd_ \+ _K_ shortcut.
  * **Added ability to show daily change in the chart legend.** New _Last day change values_ option allows users to show/hide the last day change values in the main series legend. To make this option available in the _Chart Settings_ dialog, use the [`legend_last_day_change`](/charting-library-docs/latest/customization/Featuresets# legend_last_day_change) featureset. [# 8193](https://github.com/tradingview/charting_library/issues/8193)
  * **Updated drawing icons.** New icons for the _Text_ , _Anchored Text_ , _Note_ , and _Anchored Note_ drawings. [# 8181](https://github.com/tradingview/charting_library/issues/8181)

**Improvements**

  * **`BREAKING CHANGE` Refactoring of the Ichimoku Cloud indicator.** Following feedback we've re-written the Ichimoku indicator and have brought the following changes:
    * 'Leading Span B' input is now 'Leading Span Periods'.
    * 'Lagging Span' input is now 'Lagging Span Periods'.
    * 'Leading Shift Periods' is a brand new input that aligns better to the original definition of the indicator.
    * Previously, 'Lagging span' was shifting both cloud and lagging lines. This should no longer apply as 'Leading Shift Periods' now handles the offset change for 'Lagging Span'.
  * **`BREAKING CHANGE` Inputs renaming for Stochastic indicator.** Inputs for the Stochastic indicator have been renamed for consistency across our products.
  * **`BREAKING CHANGE` Broker API clean up.**

Trading Platform Only

The `positionDialogOptions` object has been removed from the Broker's Configuration. Please use the `getPositionDialogOptions` method to customize the Position dialog.
  * **Added new keyboard navigation shortcut.** Starting from version [26.002](/charting-library-docs/latest/releases/release-notes# version-26002), the library supports a keyboard navigation activated via the _Alt/Opt_ \+ _Z_ shortcut. Now, you can change this default navigation shortcut to _Tab_. To do this, enable the new [`accessible_keyboard_shortcuts`](/charting-library-docs/latest/customization/Featuresets# accessible_keyboard_shortcuts) featureset. For more information, refer to [Keyboard navigation](/charting-library-docs/latest/getting_started/accessibility# keyboard-navigation).
  * **Added ability to cancel order dragging by pressing Esc.** If a user presses _Esc_ while dragging the order, the order will be returned to its initial position.

**Bug Fixes**

  * **Market status text during pre-market and post-market sessions.** The countdown text in the market status pop-up tooltip (in the legend area) has been fixed for pre-market and post-market sessions. The market status icon now shows an orange sunrise icon for pre-market and a blue moon icon for post-market.
  * **Floating drawing toolbar context menu.** It wasn't possibly to override the context menu for the floating drawing toolbar.
  * **Missing translation for No data here.** No data here message that is displayed on the chart whenever no bars are returned for a given symbol was missing its translation.
  * **Disabling the 'open_account_manager' featureset now works as expected.**

Trading Platform Only

  * **Order Panel Custom Input Fields Reactivity.**

Trading Platform Only

The reactivity of UI elements within the order panel when using custom fields has been improved (Fixes [# 6607](https://github.com/tradingview/charting_library/issues/6607)).
  * **Fixed the pane buttons on the collapsed pane.** The pane buttons used to overlap the _Scroll to the Most Recent Bar_ button when the pane is collapsed. [# 8213](https://github.com/tradingview/charting_library/issues/8213)
  * **The precision setting can be applied to all charts now.** To do this, users should specify precision in the _Chart settings_ dialog and click the _Apply to all_ button. [# 8343](https://github.com/tradingview/charting_library/issues/8343)

Trading Platform Only

  * **Fix the color of high/low price label.** Now, the color of high/low labels on the price scale corresponds to the color of the high/low lines. Users can specify this color in the _Chart settings_ dialog. [# 8255](https://github.com/tradingview/charting_library/issues/8255)

**Documentation**

  * **Chart customization precedence article added.** The library offers multiple approaches for changing the chart appearance and behavior. Explore our latest article on [customization precedence](/charting-library-docs/latest/customization/customization-precedence) for a comprehensive understanding of customization methods/properties and the sequence in which they are applied.
  * **Order Ticket dialog article added.** Refer to [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket) to learn how to provide custom fields, enable an order preview, implement your custom Order Ticket, and more.
  * **New how-to guide on metainfo.** Explore our latest [guide](/charting-library-docs/latest/tutorials/create-custom-indicator/metainfo-implementation) on how to implement the `metainfo` field when you create a custom indicator. For more information about custom indicators and `metainfo`, refer to the updated [Custom indicators](/charting-library-docs/latest/custom_studies/) and [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/) articles.
  * **Bracket orders article added.** Explore our latest article on [bracket orders](/charting-library-docs/latest/trading_terminal/trading-concepts/brackets) in Trading Platform.
  * **Account Manager article added.** Refer to [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/) for more information on creating pages, customizing columns, and configuring the Account Manager behavior.
  * **Accessibility article added.** Refer to the new [Accessibility](/charting-library-docs/latest/getting_started/accessibility) article for information about accessibility features that the library includes.
  * **Other documentation updates.** The new documentation version includes:
    * Updated [Resolution](/charting-library-docs/latest/core_concepts/Resolution) and [Price Scale](/charting-library-docs/latest/ui_elements/Price-Scale) articles.
    * A full list of overrides for built-in indicators. Refer to the [Indicator Overrides](/charting-library-docs/latest/customization/overrides/indicator-overrides# list-of-overrides) article for information.

**Other**

  * **`BREAKING CHANGE` Deprecated customFormatters and brokerFactory.** Use [`custom_formatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_formatters) and [`broker_factory`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# broker_factory) instead.
  * **`BREAKING CHANGE` Deprecated RawStudyMetaInfo.precision.** Use the [`format`](/charting-library-docs/latest/api/interfaces/Charting_Library.RawStudyMetaInfo# format) property instead. For more information, refer to the [Metainfo](/charting-library-docs/latest/custom_studies/metainfo/) article.

## Version 26.004â

_Date: Thu Nov 16 2023_

**New Features**

  * **Add methods to handle trading quantity.** The broker API now exposes a getter [getQty](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# getqty) and a setter [setQty](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# setqty) along with a subscription [subscribeSuggestedQtyChange](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# subscribesuggestedqtychange) and its dependant to unsubscribe [unsubscribeSuggestedQtyChange](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# unsubscribesuggestedqtychange).

**Improvements**

  * **Added anchor option to VWAP indicator.** The VWAP indicator now has input options for source and anchor.
    * Source allows customisation of the price source for the indicator. Defaults to `hlc3`.
    * Anchor period setting specifies how frequently the VWAP calculation will be reset. This Defaults to `'Session'`.

**Bug Fixes**

  * **VWAP Indicator behaviour.** The default behaviour for the VWAP indicator has been fixed. Previously it would anchor to the earliest available data point instead of the start of each session.
  * **Displaying DOM widget data on non-tradable symbols.**

Trading Platform Only

When a symbol is non-tradable (`isTradable()` in the Broker API is returning `false`) it is now possible to display depth data in the DOM widget provided via the datafeed.
  * **The price source text is visible in the screenshot.**
  * **Fix display of price sources in Overlay study.** Price sources for symbols in the Overlay study were not being shown when the main series symbol did not have the same price source
  * **Both Trend Strength Index and Linear Regression Slope indicators were missing their zero-based property to properly plot them using a histogram.**
  * **onChartReady inconsistency on Safari.** Fixed an issue where `onChartReady` wouldn't reliably get called on specific versions of Safari.

**Documentation**

  * **New article on core trading concepts.** We have added a new article describing [trading concepts](/charting-library-docs/latest/trading_terminal/trading-concepts/) in Trading Platform. Learn how to integrate trading functionality into your application using the Broker API and Trading Host.

## Version 26.003â

_Date: Thu Oct 05 2023_

**Bug Fixes**

  * **Do not save to localstorage when the use_localstorage_for_settings feature is disabled.** Fixed a bug where use_localstorage_for_settings did not stop some settings from being saved to localstorage.
  * **Disabling`drawing_templates` completely removes the ability to save it when using line tools.**
  * **Renaming a section within watchlist was throwing an error.**
  * **Fixed an issue where it wasn't possible to set the background colour of a Renko bar to transparent.**

## Version 26.002â

_Date: Mon Sep 18 2023_

**Improvements**

  * **IOrderLineAdapter and IPositionLineAdapter now support positioning with pixel units.** The [setLineLength](/charting-library-docs/latest/api/interfaces/Charting_Library.IOrderLineAdapter# setlinelength) method in the IOrderLineAdapter (returned by [createOrderLine](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline)) and IPositionLineAdapter ([createPositionLine](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline)) interfaces now support setting the unit to `'pixel'`.
    * Additionally, when using pixel unit, you can specify a negative number to position from the left edge of the chart instead.
  * **Added keyboard navigation.** Keyboard navigation (activated via alt/opt + z keyboard shortcut) and many other accessibility improvements have been added to the library.
    * A featureset `accessibility` (on by default) has been added to control this behaviour.
  * **Menu name is provided to items_processor (context menu API).** [items_processor](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# items_processor) within the [context_menu](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# context_menu) API now includes details about the name of menu, and the ids of the related item (such as the series, drawing, study, order, or position).
  * **Support more kinds of extended sessions.** The library now supports specifying only one of the postmarket or premarket sessions without the other.

**Bug Fixes**

  * **On mobile devices, fixed an issue for when scrolling the pricescale with one finger while another one was holding the crosshair.**
  * **Fixed an issue where it wasn't possible to set the background colour of a candle to transparent.**
  * **52 Week High/Low indicator compatibility with empty supported_resolutions array.** Fixes [# 7884](https://github.com/tradingview/charting_library/issues/7884) issue.
  * **Fixed an issue where any added indicator on the chart couldn't be undone.**
  * **Fixed issue with locking visible time range while resizing chart.** When resizing the chart window with percentage right margin, and the `lock_visible_time_range_on_resize` featureset enabled then the visible range wasn't locked correctly.
  * **SuperTrend Indicator Starting Point.** The SuperTrend would previously start drawing from zero for the first bar, instead of only drawing the indicator after the initial length (defined in the indicator's inputs) when all the possible data for a symbol has been loaded.
  * **Changing the LineStyle for a position is again available.**
  * **Styles tab for Pivot Point Standard indicator.** Resolved an issue where the style tab for the Pivot Point Standard indicator would not function correctly when the type option was set to 'Floor'.

**Other**

  * **Custom Translation Function.** The following changes have been made to the [custom_translate_function](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_translate_function)
    * The interface name for the options has changed from `TranslateOptions` to `CustomTranslateOptions`.
    * The `plural` field in `CustomTranslateOptions` can now be either a single string, or an array of strings.
    * A third boolean argument is now provided. When this is true then the key provided is already translated.

## Version 26.001â

_Date: Tue Aug 08 2023_

**New Features**

  * **Add series and study values to crosshair move event.** The [`crossHairMoved` subscription](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# crosshairmoved) now exposes the study and series values in the event object. The values are the same as the values shown in the data window.
  * **Adding a new Floor type for calculating Pivot.**
  * **Add the onHoveredSourceChanged method to the widget API.** See [`onHoveredSourceChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# onhoveredsourcechanged).

**Improvements**

  * **Added optional variable_tick_size property to symbol info.**
  * **Added onMoving to the Order Line Adapter.** [onMoving](/charting-library-docs/latest/api/interfaces/Charting_Library.IOrderLineAdapter# onmoving)

**Bug Fixes**

  * **Selecting an incorrect symbol within a study no longer prevents the study from recovering when a valid symbol is chosen later.**
  * **Fix drawing tools not affecting undo/redo stack and chart layout saving buttons.** Drawing actions can now be undone/redone and will affect the saving of the chart layout
  * **Disabling the 'open_account_manager' featureset now works as expected.**

**Other**

  * **Watchlist sections featureset added for adjusting the visibility of the 'Add Section' button.** The UI for creating watchlist sections can now be hidden by disabling the [watchlist_sections](/charting-library-docs/latest/customization/Featuresets# watchlist_sections) featureset.

## Version 26â

_Date: Tue Jul 18 2023_

**Breaking Changes**

  * **Remove Lines item and submenu from background and symbol context menu.** The "lines" item has been removed from the context menu of the chart and the legend of the main series.

**New Features**

  * **In bottom toolbar, tooltip text for date ranges has changed.** Hovering over the time frame buttons will provide more details to understand how chart is constructed.
  * **Add setting for visibility of A (auto) and L (log) scale buttons.** In Chart settings, Scale tab, a new setting has been introduced to enable shortcuts for Auto & Logarithmic modes.
  * **Bug in compare data displayed in Data window.** There was an issue where OHLC values would only be displayed in the data window widget when using the cross hair selection instead of displaying the data from the latest available bar if nothing was selected. Fixes [# 7769](https://github.com/tradingview/charting_library/issues/7769)
  * **Update chart maximization icon and remove animation.** Maximization button restyled
  * **Price scale resizing while scrolling chart in mobile browser.** When scrolling into history the price scale expands to accommodate the values, but doesn't retract when the values become shorter. This is done to make the scale less twitchy during scrolling. The scale's width is reset on data loading.

**Improvements**

  * **Fixed a bug where on some DPR there was no separator between the right widget panel and the order panel.** Now the separator line is always visible.
  * **No bracket settings in chart settings.** Bracket settings were added to the Chart settings in the Trading tab.
  * **Symbol logos within the Legend and Account Manager.** Symbol logos can now be displayed within the [Legend](/charting-library-docs/latest/ui_elements/Legend# symbol-logos) and the Account Manager panel (

Trading Platform Only

) if the `show_symbol_logos` featureset is enabled.
    * `show_symbol_logo_in_legend` featureset can be disabled to hide the logos within the legend.
    * `show_symbol_logo_for_compare_studies` featureset can be disabled to hide the logos within the legend for compare overlay studies.
    * `show_symbol_logo_in_account_manager` featureset can be disabled to hide the logos within the Account Manager panel (

Trading Platform Only

).
  * **Added setter and getter methods for CSS custom properties defined within the iframe.** The widget API now includes [setCSSCustomProperty](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# setcsscustomproperty) and [getCSSCustomPropertyValue](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# getcsscustompropertyvalue) methods for controlling CSS custom properties within the chart's iframe element.

**Other**

  * **Deprecated properties and methods.** The following properties and methods are marked as deprecated and will be removed in the next major release:
    * `customFormatters` in the [ChartingLibraryWidgetOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions) interface. Use [`custom_formatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_formatters) instead.
    * `customFormatters` and `brokerFactory` in the [TradingTerminalWidgetOptions](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions) interface. Use [`custom_formatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# custom_formatters) and [`broker_factory`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# broker_factory) instead.

## Version 25.002â

_Date: Wed Jul 12 2023_

**New Features**

  * **Add 52 Week High/Low study.**
  * **Enable hiding price scales when all studies or series are hidden.** Adds the `hide_price_scale_if_all_sources_hidden` feature. When enabled price scales will be hidden when all studies (or the main series) attached to the price scale are hidden.
  * **Option to always show legend values for studies on mobile.** By default, when on mobile, the legend won't display any values for studies. Enabling this new `always_show_legend_values_on_mobile` featureset allows you to display the values.

**Improvements**

  * **Sections can now be added within the Watchlist.** Sections dividers can now be added within the watchlist (

Trading Platform Only

).
    * Any item within a list which is prefixed with `### ` will be considered a section divider. [API Reference](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# watchlist)
  * **Symbol and exchange logos can now be shown within the Compare Dialog.** The [symbol info](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) provided by [resolveSymbol](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) should now include 'exchange_logo' if you would like to use the 'show_exchange_logos' featureset.

**Bug Fixes**

  * **Watermark API's content provider is now used for all charts within a multi-chart layout.**
  * **Fixed issue with resetData.** When resetting the data for a chart, any existing studies would become unlinked from the data source. Fixes [# 7802](https://github.com/tradingview/charting_library/issues/7802)
    * The `request_only_visible_range_on_reset` featureset now defaults to `disabled`.

## Version 25.001â

_Date: Mon Jun 26 2023_

**Breaking Changes**

  * **price_sources moved to symbol info.** To allow price sources resolved on-demand with the associated symbol the `price_sources` property has been removed from [the datafeed configuration object](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) and added to the [symbol info object](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo).

**New Features**

  * **Added Market status state getter.** [marketStatus](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# marketstatus) method is provided within [IChartWidgetApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi) which returns a watched value of the charts symbols current [market status](/charting-library-docs/latest/api/enums/Charting_Library.MarketStatus).
  * **Symbol and exchange logos.** It is now possible to specify logo images for symbols and exchanges. These will be visible within the search dialog, and watchlist (Trading Platform). The `show_symbol_logos` and `show_exchange_logos` featuresets should be enabled, and your datafeed should be updated to provide urls as part of the symbol info supplied by the `resolveSymbol` method, and results supplied by the `searchSymbols` method.
  * **Enable custom studies to extend the time scale.** Enable custom studies to extend the time scale with points that don't exist in the main series.
    * [See this article for more info](/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale)
  * **Added Custom Symbol Status API.** The new [Custom Symbol Status API](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomSymbolStatusApi) enables the creation and customisation of an additional status to be displayed for the symbol within the legend area.
    * The Custom Symbol Status API can be accessed via the [`customSymbolStatus`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# customsymbolstatus) method on the chart widget.
    * An example is provided on the [Symbol Status](/charting-library-docs/latest/ui_elements/Symbol-Status) page.
  * **Featureset added for clearing the price scale on errors.** Added new `clear_price_scale_on_error_or_empty_bars` featureset to automatically clear pane price scales when the main series has an error or has no bars.
  * **Adding Anchored VWAP in Trend line tools.** A new Trend line tool has been added to the already long list: Anchored VWAP.

**Improvements**

  * **Added Watermark API.** The new [Watermark API](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatermarkApi) enables the customisation of the watermark text in addition to providing [WatchedValues](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatchedValue) for the color and visibility properties.
    * The Watermark API can be accessed via the [`watermark`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# watermark) method on the chart widget.
  * **Updated broker API sample to support bracket orders.** The sample broker API has been updated to support brackets (stop loss, and take profit) orders. 

Trading Platform Only

  * **Drawings in saved charts now restore with the saved settings for lock and disableSelection.** The `lock` and `disableSelection` settings for a created shape will now be saved and restored correctly. [# 6761](https://github.com/tradingview/charting_library/issues/6761)
  * **Fullscreen button can now be used to exit fullscreen mode as well.** When using the `header_in_fullscreen_mode` featureset, it is now possible to use the fullscreen button to exit fullscreen mode.
  * **Added method to programmatically set the time frame for the active chart.** The [setTimeFrame](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# settimeframe) method has been added to the widget which can set the time frame in a similar manner to the [Timeframes at the bottom of the chart](/charting-library-docs/latest/ui_elements/Time-Scale# timeframes-at-the-bottom-of-the-chart) buttons.
  * **Renaming precision dropdown values in Chart settings.** To limit confusion when dealing with the Chart settings/Precision dropdown values, some fractional ones have been renamed to more readable ones.
  * **Changing Source option in line-break & renko chart.** In Trading Platform, it was unnecessary to offer the option to change the source of data for both Renko and Line Break, as the data is taken from the close value.

**Bug Fixes**

  * **Timescale marks will adjust correctly when widget theme is changed.**
  * **onAutoSaveNeeded event emitted when removing all drawings via toolbar button.**
  * **removeChart within the save load adapter will await the promise before updating the UI.**
  * **First getBars request after resetting data no longer has a countback of zero.**
  * **Market status pop up text could sometimes display Infinity or NaN values and not update on the dot.**
  * **Fix custom field validators.** Fixes a bug where custom broker field validator functions were not called if provided.
  * **Fixed rendering on price and time axes when a Trend Angle line drawing is selected.**

**Other**

  * **Changed validation warning message within the close position UI.** Message changed from 'Specified value is more than the instrument maximum' to 'The amount entered exceeds the position size'.
  * **Corrected the strings for the ThemeName type definition.** The possible values should have been lowercase: 'dark' & 'light'.
  * **Moved Session breaks from Events to Appearance tab in chart options.** This reverts a breaking change made in `v25.0`.
  * **Adding snippets for Trading Platform datafeed methods.** Some functions were lacking an out of the box snippet to use within their application.

## Version 25â

_Date: Mon May 22 2023_

**Breaking Changes**

  * **Save and Load Chart Templates.** Add methods to the [save/load adapter](/charting-library-docs/latest/saving_loading/) to support chart templates.
  * **Renew design for send order and buy sell buttons.** Renew design for send order and buy sell buttons:
    * Buttons are now rounded
    * Selected item and underline are now black
  * **New TV logo.** What is changing:
    * Changing the size, boldness of the text
    * Indentation of the logo from the borders of the chart
  * **One row for grid lines settings.** The grid lines settings have been combined into one row.
  * **Remove magnet icon near cursor - Reverting feature.** Following reviews this piece of work was reverted.
  * **Update the library branding.** Branding font and position is slightly changed.
  * **Do not load Euclid font for the branding logo on chart.** The Euclid font will not load if there is an animated logo on the chart.
  * **When the chart data is reset, the new request for data will only be for the visible range.** The previous behavior was that when [resetData](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# resetdata) was evoked, that the datafeed would be requested to provide data for the entire range of data already loaded for that symbol. The new behavior is that the request is now only for the current visible range. This more closely matches the behavior of the first load. If you require the old behavior then you can disable the `request_only_visible_range_on_reset` featureset.
  * **Remove timezone & session breaks section from scale gear menu.** Time zone and Session breaks section has been removed from gear menu.
  * **Update chart types icons.** Changed icons for Line, Area and Baseline chart types.
  * **Move Session breaks from Appearance to Events tab.** Session breaks setting is moved to events tab.
  * **Changed the gear icon.** Changed the icon for price scale settings button ('gear' in bottom-right corner).
  * **Chart navigation buttons.** Navigation buttons at the bottom of the chart have a slightly new design.

**New Features**

  * **Adding a new chart type HLC Area.** HLC Area is a new chart type available.
  * **Handle variable-tick-size.** Added support for variable tick size.
  * **Add new stats position for info line drawing "auto".** Option of automatic positioning of information block for infoline drawings was added "auto" (in addition to existing left, center, right).
  * **Add new checkboxes for price range in Info Line drawing box.** Added 2 settings in linetools context menu:
    * Percent change
    * Change in pips
  * **Add ability to move anchors continuously - not by bars.** Smooth resizing of icons, stickers and emojis was implemented.
  * **Correct Chart settings text Price scale labels.** "LABELS" group in "Scales" tab of Chart settings has been renamed to "LABELS ON PRICE SCALE".
  * **Show + button on cursor by hotkey.** Added hotkeys Alt+Ctrl (win) or Opt+Command (mac) for the appearance of the plus button under the cursor.
  * **Add Data window item to context/legend three dots menu.** Added new item to context/legend three dots menu - "Data window..." with a shortcut. Opens Data Window in the right panel.
  * **Add Volume profile indicators on the top of chart series.** Changed the default z-order for Volume Profile indicators and VP drawings. They are now located above the main series.
  * **Added new time zone Anchorage Alaska.** Added new time zone Anchorage Alaska (UTC-9).
  * **Separate chart types Line with markers and Stepline.** Step line and Line with markers types are added to the top toolbar chart types menu.
  * **Added new time zone Casablanca.** Timezone Casablanca (UTC) has been added.
  * **Try to load line tools code dynamically.** Fixed floating toolbar for Price Note to show color and text settings like for other drawings.
  * **Add sticker drawing tool.** Add the ability to use stickers with `createMultipointShape` or `selectLineTool`.
  * **Add Accelerator Oscillator indicator.**

**Improvements**

  * **Theming support for pop-up menus.** Additional CSS custom properties have been added for styling pop-up menus. Pop-up (as known as 'pop-over') menus include toolbar menus, and context menus. See the full list of CSS custom properties in the [CSS Color Themes](/charting-library-docs/latest/customization/styles/CSS-Color-Themes) article.
  * **Add date and time input UI for custom studies.** [Custom studies](/charting-library-docs/latest/custom_studies/) now support defining inputs of the `'time'` type and having a GUI element (date and time pickers) in the indicators settings dialog window.
  * **setActiveChart added to the Widget API.** The currently active chart in a multi-chart layout (available on Trading Platform only) can now be changed using the `setActiveChart` method. [more info](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# setactivechart)

**Bug Fixes**

  * **Include missing PriceAxisLastValueMode and LineStyle enums in type documentation.**

**Documentation**

  * **The Overrides article update.** We have updated the [Overrides](/charting-library-docs/latest/customization/overrides/) article. Now it contains general information about the Overrides API. For information on how to customize elements on the chart, refer to a new [Chart Overrides](/charting-library-docs/latest/customization/overrides/chart-overrides) article.

## Version 24.004â

_Date: Mon Apr 24 2023_

**New Features**

  * **Indicators can now be favorited.** Indicators can now be favorited by tapping on the star icon to the left of the indicator name. Favorited indicators will appear at the top of the indicator list.
    * The `items_favoriting` featureset should be enabled. [more info](/charting-library-docs/latest/customization/Featuresets)
  * **Adding two featuresets to hide the right_toolbar or its tabs.** There are 2 new featuresets `hide_right_toolbar` & `hide_right_toolbar_tabs` plus an additional WidgetBar API [changeWidgetBarVisibility](/charting-library-docs/latest/api/interfaces/Charting_Library.IWidgetbarApi# changewidgetbarvisibility) to control the right toolbar.
    * `hide_right_toolbar` allows you to instantiate the toolbar without showing it in the UI.
    * `hide_right_toolbar_tabs` will do the same with the exception of not showing tabs when displaying the right toolbar.

**Improvements**

  * **Added a middle band for the RSI indicator.** Unlike on tradingview.com RSI was not presenting the option to plot a middle limit.
  * **Indicators favorites can now be defined within widget constructor.** Indicators can now be defined as favorites using the [`favorites`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# favorites) property of the widget constructor options. See [Favorites.indicators](/charting-library-docs/latest/api/interfaces/Charting_Library.Favorites# indicators) for more information.
  * **Add a way to independently clear bar marks/timescale marks.** [`clearMarks`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# clearmarks) method has been enhanced to pass in an option to choose which marks should be cleared on the chart.
    * By default behaviour will remain similar and both bar & TimeScale marks will be removed.
    * Passing `ClearMarksMode.BarMarks` will only remove bar marks.
    * Passing `ClearMarksMode.TimeScaleMarks` will only remove TimeScale marks.
  * **`BREAKING CHANGE` Discrepancy in chart style/type methods.** Only TypeScript breaking change as an interface has been renamed to better reflect its purpose. `SeriesStyle` is now [SeriesType](/charting-library-docs/latest/api/enums/Charting_Library.SeriesType).

**Bug Fixes**

  * **load_study_template event is not emitted.** load_study_template event was not emitted when applying a template on the chart.
  * **Fixed autosize bug occurring on Chrome iOS when rotating the device.** Workaround fix for a browser bug until Chrome resolves the issue on their side.
  * **Fixed the type definitions for a few of the PineJS Std library functions.** [PineJSStd documentation](/charting-library-docs/latest/api/interfaces/Charting_Library.PineJSStd).

**Documentation**

  * **New Key Features article.** We have added the [Key Features](/charting-library-docs/latest/getting_started/Key-Features) article that lists features supported/unsupported in Advanced Charts and Trading Platform.
  * **How to connect data via Datafeed API.** We have added a new [tutorial on connecting data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/). It will help you implement datafeed and real-time data streaming to the library step-by-step.

**Other**

  * **Incorrect watermark property key.** Deprecated `symbolWatermarkProperties` property has now been removed. Please use [settings_adapter](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# settings_adapter) with `symbolWatermark` key instead or `applyOverrides` to change values.

## Version 24.003â

_Date: Tue Apr 11 2023_

**New Features**

  * **Images within bar marks.** Bar marks now support the rendering of images as the background by specifying the `imageUrl` property. Please see the [Mark](/charting-library-docs/latest/api/interfaces/Charting_Library.Mark) interface for more details.
  * **Price Source and Long Description symbol info fields.** Add support for displaying the price source and long description fields from the symbol info.
    * To enable the price source first add `symbol_info_price_source` to the list of enabled features. Then it will be shown in the legend, if available. It can be hidden through the legend context menu and the series property dialog.
    * To enable the long description first add `symbol_info_long_description` to the list of enabled features. Then it will be shown in the legend, if available. It can be hidden through the legend context menu and the series property dialog.

**Improvements**

  * **Added more styling options for bar marks.** The styling options for bar marks has been expanded to include options for styling the border.
    * Border color can be set using the `border` property within `color` of the Mark interface. See [MarkCustomColor](/charting-library-docs/latest/api/interfaces/Charting_Library.MarkCustomColor)
    * Border width can be set using `borderWidth` and `hoveredBorderWidth`. See [Mark](/charting-library-docs/latest/api/interfaces/Charting_Library.Mark)
  * **Drawing tools favorites can now be defined within widget constructor.** Drawing tools can now be defined as favorites using the [`favorites`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# favorites) property of the widget constructor options. See [Favorites.drawingTools](/charting-library-docs/latest/api/interfaces/Charting_Library.Favorites# drawingtools) for more information.
  * **Context menu API can now be used within the Watchlist.** `watchlist_context_menu` featureset is enabled by default. See [onContextMenu](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# oncontextmenu) for more details.
  * **Improved typings within package.json.** The `package.json` bundled with the library has been improved to support newer versions of node, and offer improved typings. See [NPM](/charting-library-docs/latest/getting_started/NPM) for more details.
  * **Price scale now supports numbers with more than 10 decimal points.**
  * **Timezone data has been updated.**

**Bug Fixes**

  * **Chart type won't change when restoring default options.** The chart type will no longer change when restoring the default options within the chart settings dialog.
  * **Last visible bar value in legend for overlay studies.** When `use_last_visible_bar_value_in_legend` featureset is enabled, overlay studies will display the value for the last visible item on the chart. This now matches the behavior for the main series.
  * **Fixed zoom behavior for percentage right margin option.** Incorrect zooming behavior has been fixed for zoom buttons appearing on the chart, and the keyboard shortcuts. See `show_percent_option_for_right_margin` [featureset](/charting-library-docs/latest/customization/Featuresets) for more information.

**Documentation**

  * **Add FAQ about unsubscribeBars delay.** Added [a new FAQ](/charting-library-docs/latest/getting_started/Frequently-Asked-Questions) about [`unsubscribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# unsubscribebars) being called with a delay.

**Other**

  * **Added symbol information to datafeed error messages.** Added symbol information to realtime subscription error messages to improve the developer experience.
  * **Updated localisation list.** The [list of support localisations](/charting-library-docs/latest/core_concepts/Localization) has been updated. Additionally, the chart will now fallback to english (with a console warning) if an unsupported locale is specified in the widget constructor options.

## Version 24.002â

**New Features**

  * **Added support for specifying custom timezones.**
    * Additional custom timezones can now be specified for use within the library. Please see the [Adding Custom Timezones](/charting-library-docs/latest/ui_elements/timezones# adding-custom-time-zones) section within the Timezones page.
  * **Images within timescale marks.**
    * Timescale marks now support the rendering of images within the circular shape by specifying the `imageUrl` property. Please see the [TimescaleMark](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark) interface for more details.
  * **Support different margin rates for different order types.** [6607](https://github.com/tradingview/charting_library/issues/6607)
    * `marginRate` has been deprecated
    * A [`supportLeverageButton`](/charting-library-docs/latest/api/interfaces/Broker.BrokerConfigFlags# supportleveragebutton) flag that displays a leverage button has been added to the Broker configuration.
    * The [`supportLeverage`](/charting-library-docs/latest/api/interfaces/Broker.BrokerConfigFlags# supportleverage) flag enables leverage calculation by getting information from `leverageInfo`.

**Enhancements**

  * Add horizontal line at 0 for Momentum study.

**Bug fixes**

  * [`setUserEditEnabled`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# setusereditenabled) does not hide 3 dots in Legend. [6765](https://github.com/tradingview/charting_library/issues/6765) | [6165](https://github.com/tradingview/charting_library/issues/6165)

widget.activeChart().getAllStudies().forEach(({ id }) => { console.log(id); tvWidget.activeChart().getStudyById(id).setUserEditEnabled(false); });

    * setUserEditEnabled(false) should mask all icons except the "eye".
    * setUserEditEnabled(true) should restore all the icons.
  * `priceFormatter` could previously only be used for main series. `priceFormatter` now applies to secondary series as well.

  * `right_toolbar` featureset didn't have a default `on` value.

  * Empty time frames at the bottom toolbar if `data_status: endofday`

  * Export data doesnât include projected data.

    * Projected data can be included by setting [`includeOffsetStudyValues`](/charting-library-docs/latest/api/interfaces/Charting_Library.ExportDataOptions# includeoffsetstudyvalues) to `true`.
    * `await widget.activeChart().exportData({ includeOffsetStudyValues: true });`
  * Highest PineJS.Std function doesnât work correctly with negative numbers.

  * Missing types in bundled definition file. [7445](https://github.com/tradingview/charting_library/issues/7445) | [7446](https://github.com/tradingview/charting_library/issues/7446)

  * Exposing `icon` prop in `CreateShapeOptionsBase`. [6723](https://github.com/tradingview/charting_library/issues/6723)

  * Wrong extended session background color [7443](https://github.com/tradingview/charting_library/issues/7443)

**Documentation**

  * Added [migration guide](/charting-library-docs/latest/trading_terminal/# how-to-migrate-from-advanced-charts) from Advanced Charts to Trading Platform.
  * Added additional documentation for [Drawings](/charting-library-docs/latest/ui_elements/drawings/).
  * Missing overrides in documentation. [7457](https://github.com/tradingview/charting_library/issues/7457)
  * Updated documentation for [Marks](/charting-library-docs/latest/ui_elements/Marks).
  * Align ChartMetaInfo & ChartData.

**Other**

  * Removed `Australia/ACT` from the list of [timezones](/charting-library-docs/latest/ui_elements/timezones) within our documentation. Please use either the Sydney timezone or [specify your own custom timezone](/charting-library-docs/latest/ui_elements/timezones# adding-custom-time-zones).

## Version 24.001â

**New Features**

  * **Adding originalText as an additional field to UndoRedoState.** Event should mention the name of the action in plain English in addition to also being translated to the corresponding language. [UndoRedoState](/charting-library-docs/latest/api/interfaces/Charting_Library.UndoRedoState# originalundotext)
  * **Add the ability to change X-Axis margin % from Chart Properties.** A new [featureset](/charting-library-docs/latest/customization/Featuresets) has been added `show_percent_option_for_right_margin` that adds additional percentage option to the right margin section of the chart settings dialog.
  * **Display rightmost visible value when in percent mode.** A new [featureset](/charting-library-docs/latest/customization/Featuresets) has been added `use_last_visible_bar_value_in_legend` to show the most recent âglobalâ bar value. When this feature is enabled the rightmost bar in the visible range is used instead.
  * **Ability to change on the fly the Currency and Unit label setting.** [currencyAndUnitVisibility API](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# currencyandunitvisibility)
  * **Add simple SSR support.** Allow the library to be imported within a NodeJS context. This improves support for frameworks such as Remix.
  * **Added[`clearUndoHistory`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# clearundohistory).**

**Improvements**

  * **Name to be used instead of ticker.** Allow a human friendly name to be returned from [`symbol_search_complete`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol_search_complete).

**Bug Fixes**

  * **Incomplete indicators when using Heikin-Ashi.** Indicator line should draw to all the visible data points.
  * **Compare study doesnât save and restore ticker name correctly.** The compare study should work for custom ticker names just like it does for ticker names which match our format (with the colon).
  * **VPFR: Right point is automatically moving when dragging start point.** When drawing the VPFR, or moving one of the anchor points, it is expected that the right anchor point should not move one bar further to the right.
  * **Selecting Apply Defaults option within chart settings doesnât work.** Some Settings even if not validated are not restored to their original values when Apply Defaults is selected.
  * **Decentralised app browser loading error.** Chart fails to load in wallet apps like MetaMask, Trust & Phantom. Enable the `iframe_loading_compatibility_mode` [featureset](/charting-library-docs/latest/customization/Featuresets) to enable compatibility with these browsers.
  * **When disabled, widget bar still present a significant margin.** Even when there aren't any pages or widget in the right toolbar and IF right_toolbar is disabled, contrary to the drawing toolbar that vanishes the widget bar stays there with the pill button to expand it whereas there isn't anything to expand.
  * **Canât enable header_compare feature without header_symbol_search.**
    * Disabling header_symbol_search should only hide the search button
    * Disabling header_compare should only hide the compare button
  * **Removed section of PostCSS syntax in bundled css files.**

**Other**

  * **New Documentation site.** ð
  * **Add`shape` to TimeScale.** Shape property is described in [TimescaleMark interface](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark# shape).
  * **Remove magnet icon near cursor.**

## Version 24â

  * `preset` Widget-Constructor parameter has been removed. Users can still use some featuresets to mimic the same behavior by disabling the following list:
    * `'left_toolbar', 'header_widget', 'timeframes_toolbar', 'edit_buttons_in_legend', 'context_menus', 'control_bar', 'border_around_the_chart'`
  * `chart_style_hilo` featureset is now enabled by default. This adds the High-low option to chart style controls dropdown. This featureset has been available since 1.15 but was previously disabled by default.
  * Added typings for custom indicators. Typescript equivalents of our existing examples are available here: [Custom Studies Typescript Examples](/charting-library-docs/latest/custom_studies/Custom-Studies-Examples).
  * [`symbol_search_complete`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol_search_complete) has changed. The function now takes an additional search result object parameter, and returns an additional human-friendly symbol name.
  * [Mark](/charting-library-docs/latest/ui_elements/Marks) tooltips do not support HTML anymore.

**UI changes**

  * With this version you will notice that the top toolbar has been redesigned with the following changes:

    * Button padding & separator size have been reduced
    * Compare button has shifted next to Symbol
    * Drawing icon is now more prominent
    * New fullscreen icon
    * Save button style better highlights when there's a change
    * Top toolbar now extends to left & right edges
    * UI font changes to a default system one
    * Undo/redo buttons are now relocated next to the save button

**Trading Platform**

  * Default formatter `textNoWrap` has been removed.
  * `columnId` field of [SortingParameters](/charting-library-docs/latest/api/interfaces/Broker.SortingParameters) has been renamed to `property`.
  * Required `id` field has been added to [column description](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerColumnBase# id).
  * Type of `formatter` field in [column description](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerColumnBase# formatter) has been changed to [StandardFormatterName | FormatterName](/charting-library-docs/latest/api/enums/Charting_Library.StandardFormatterName).
  * `property` field has been removed from `column description`. Use [dataFields](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerColumnBase# datafields) field instead.
  * Type of `formatter` field in [SummaryField](/charting-library-docs/latest/api/interfaces/Broker.AccountManagerSummaryField) has been changed to [StandardFormatterName](/charting-library-docs/latest/api/enums/Charting_Library.StandardFormatterName).

## Version 23â

  * `Average close price line` is now masked by default in Chart settings and can be shown by using `show_average_close_price_line_and_label` featureset.

## Version 22â

  * Methods getTimezone and setTimezone have been deprecated and will be removed in future versions. Use [getTimezoneApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# gettimezoneapi) instead.

  * POST request data format sent to [snapshot_url](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# snapshot_url) has been changed. Since this version this request contains `multipart/form-data` with the field `preparedImage` that represents binary data of the snapshot image in `image/png` format.

  * Optional `inputs` arguments for [createStudy](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) has been changed from using an array of ordered values to an object with named properties. You can still use array-like inputs but it will be removed in further releases.

  * The set of inputs for Moving Average study has been changed and the first input now is a symbol. If you used `createStudy` to create Moving Average study you will have to modify the list of inputs by simply adding an empty string as the first element:
    
        tvWidget.activeChart().createStudy('Moving Average', true, false, ['', 9]);  
    

instead of
    
        tvWidget.activeChart().createStudy('Moving Average', true, false, [9]);  
    

  * Study `Ichimoku` has been modified with some `Inputs` & `Style` properties renamed.

  * Both `scrollPosition` and `defaultScrollPosition` from [Chart-Methods](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi) have been deprecated in favour of [rightOffset](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimeScaleApi# rightoffset) and [defaultRightOffset](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimeScaleApi# defaultrightoffset) accordingly.

  * The `rest.html` file and `datafeeds/rest` directory have been removed.

  * When [subscribed](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# subscribe) to `drawing_event` a `click` is no longer emitted when a drawing is created. A `create` event is emitted instead.

  * Study `True Strength Indicator` has been renamed to `True Strength Index` and modified with its style elements being properly named with 1st `Plot` becoming `True Strength Index` & second `Plot` becoming `Signal`.

**Trading Platform**

  * The `watchList` method now returns a promise that resolves a watchlist API object when the watchlist widget has loaded.

  * `suggestedQty` has been removed from the `Trading Host`.

  * `dome_widget` featureset which controls the DOM widget visibility has be deprecated in favour of `dom_widget`.

## Version 21â

  * Featureset `show_dialog_on_snapshot_ready` has been removed. [takeScreenshot](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# takescreenshot) makes a snapshot silently, so you can use the URL from [onScreenshotReady](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# subscribe) callback to show your own dialog instead.

  * Field `holidays` from [SymbolInfo](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) has been renamed to [`session_holidays`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session_holidays).

  * `changeTheme` from [Widget Methods](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget) now returns a Promise. You can apply other style modifications after the promise is fulfilled.

  * Symbol type `bitcoin` has been renamed to `crypto`.

  * The symbol search dialog suggestions list uses the `full_name` instead of the `exchange` and `symbol` value. This data is provided by your implementation of [searchSymbols](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# searchsymbols).

**Trading Platform**

  * `supportModifyOrder` flag has been marked deprecated and will be removed in future versions. Use `supportModifyOrderPrice`, `supportEditAmount` and `supportModifyBrackets` instead.

  * `empty` formatter has been removed.

  * Flag `durationForMarketOrders` has been removed from Broker Configuration `configFlags` object. To use duration with market orders, add appropriate order type to `supportedOrderTypes` array.

  * `supportReducePosition` flag has been removed from the Broker Configuration `configFlags` object.

  * `supportExecutions` flag has been added. If broker supports executions you need to set the flag to `true`.

  * The default value of `asc` field of the [SortingParameters](/charting-library-docs/latest/api/interfaces/Broker.SortingParameters# asc) has been changed to `true`.

  * The `customFormatters` field has been removed from the [accountManagerInfo](/charting-library-docs/latest/trading_terminal/account-manager/).

  * `id`, `modificationProperty`, `fixedWidth`, `showOnMobile` and `showTooltipOnCell` fields have been removed from the [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/) `column description`. The `property` field has been made mandatory, so you can use it instead of `id`.

  * The string `id` field has been made mandatory in each `table` ([Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/)) row.

  * The return value of the method `placeOrder` in the [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api) has been changed from `Promise<void>` to `Promise<PlaceOrderResult>`.

  * `contextMenuEvent` type in `contextMenuActions` in `AccountManagerInfo` interface has been changed from `MouseEvent` to `MouseEvent | TouchEvent`.

  * The shape of the `news_provider` property in the [Widget Constructor options](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# news_provider) has changed. The `is_news_generic` and `get_news` properties have been replaced with a single function.



---

## Widget Constructor | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/core_concepts/Widget-Constructor*

  * [](/charting-library-docs/)
  * Core Concepts
  * Widget Constructor

On this page

# Widget Constructor

The Widget Constructor is the entry point to the library. It allows you to embed the library within your web page. You can use the Widget Constructor parameters to customize the widget's appearance and behavior. All parameters are listed in the [`ChartingLibraryWidgetOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions) interface. If you use [Trading Platform](/charting-library-docs/latest/trading_terminal/), you can specify some additional parameters.

The following video tutorial describes Widget Constructor parameters and demonstrates how to use them.

  

The code sample below shows how to adjust some basic parameters using Widget Constructor.

[View Example on JSFiddle](https://jsfiddle.net/TradingView/8301r7nc)

## Advanced Charts parametersâ

The following parameters relate to Advanced Charts and Trading Platform.

### Widget configurationâ

Use the parameters below to configure basic widget settings:

Parameter| Description  
---|---  
[`container`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# container)# | Represents either a reference to an attribute of a DOM element inside which the iframe with the chart will be placed or the HTMLElement itself.  
[`library_path`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# library_path)# | A path to a static folder.  
[`debug`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# debug)# | Makes the library write detailed Datafeed API logs into the browser console. Refer to [How to enable debug mode](https://www.tradingview.com/charting-library-docs/latest/tutorials/enable-debug-mode) for more information.  
  
### Chart configurationâ

Use the parameters below to configure basic chart settings:

Parameter| Description  
---|---  
[`symbol`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# symbol)# | The default chart symbol.  
[`interval`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# interval)# | The default chart interval.  
[`timeframe`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# timeframe)# | The default chart time frame.  
[`time_frames`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# time_frames)# | The list of visible time frames that can be selected at the bottom of the chart.  
[`timezone`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# timezone)# | The default chart time zone.  
[`locale`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# locale)# | The default chart [`locale`](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Localization/# supported-languages).  
[`favorites`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# favorites)# | Items that should be marked as favorite by default.  
  
### Data configurationâ

Use the parameters below to [connect data](/charting-library-docs/latest/connecting_data/) to the chart:

Parameter| Description  
---|---  
[`datafeed`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# datafeed)# | A JavaScript object that implements the [`IBasicDataFeed`](https://www.tradingview.com/charting-library-docs/latest/api/modules/Charting_Library# ibasicdatafeed) interface to supply the chart with data.  
[`additional_symbol_info_fields`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# additional_symbol_info_fields)# | An optional field containing an array of custom symbol info fields to be shown in the Security Info dialog.  
[`snapshot_url`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# snapshot_url)# | A URL that is used to send a POST request with binary chart snapshots when a user presses the snapshot button.  
  
### Chart sizeâ

Use the parameters below to customize the chart size:

Parameter| Description  
---|---  
[`width`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# width)# | The desired width of the widget.  
[`height`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# height)# | The desired height of the widget.  
[`fullscreen`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# fullscreen)# | A Boolean value showing whether the chart should use all the available space in the window.  
[`autosize`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# autosize)# | A Boolean value showing whether the chart should use all the available space in the container and resize when the container itself is resized.  
  
### UI customizationâ

Use the parameters below to customize colors, fonts, price and date formats, and more:

Parameter| Description  
---|---  
[`toolbar_bg`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# toolbar_bg)# | A background color of the toolbars.  
[`theme`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# theme)# | The predefined custom theme color for the chart.  
[`custom_themes`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_themes)# | The custom color palette.  
[`custom_css_url`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_css_url)# | Adds your custom CSS to the chart.  
[`custom_font_family`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_font_family)# | Changes the font family used on the chart.  
[`custom_formatters`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_formatters)# | Custom formatters for adjusting the display format of price, date, and time values.  
[`custom_translate_function`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_translate_function)# | Use this property to set [custom translations](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Localization# custom-translations) for UI elements.  
[`numeric_formatting`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# numeric_formatting)# | An object that contains formatting options for numbers.  
[`overrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# overrides)# | Overrides values for the default widget properties.  
[`settings_overrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# settings_overrides)# | An object that contains new values for values saved to the settings.  
[`loading_screen`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# loading_screen)# | An object that allows you to customize the loading spinner.  
[`context_menu`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# context_menu)# | A property that allows you to customize the [context menu](https://www.tradingview.com/charting-library-docs/latest/ui_elements/context-menu).  
[`time_scale`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# time_scale)# | An additional optional field to add more bars on screen.  
[`header_widget_buttons_mode`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# header_widget_buttons_mode)# | An additional optional field to change the look and feel of buttons on the top toolbar.  
  
### Chart featuresâ

If you want to change the chart's behavior or show/hide UI elements, you should use [featuresets](/charting-library-docs/latest/customization/Featuresets). The following parameters allow you to enable/disable a certain featureset:

Parameter| Description  
---|---  
[`enabled_features`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# enabled_features)# | The array containing names of features that should be enabled by default.  
[`disabled_features`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# disabled_features)# | The array containing names of features that should be disabled by default.  
  
### Indicators and drawingsâ

Use the parameters below to customize [indicators](/charting-library-docs/latest/ui_elements/indicators/) (studies) and [drawings](/charting-library-docs/latest/ui_elements/drawings/):

Parameter| Description  
---|---  
[`study_count_limit`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# study_count_limit)# | Maximum amount of studies allowed at one time within the layout.  
[`studies_access`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# studies_access)# | An object that allows you to specify indicators available for users.  
[`studies_overrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# studies_overrides)# | Use this option to customize the style or inputs of the indicators. Refer to [Indicator Overrides](https://www.tradingview.com/charting-library-docs/latest/customization/overrides/indicator-overrides# specify-default-properties) for more information.  
[`custom_indicators_getter`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_indicators_getter)# | A function that returns the Promise object with the array of your [custom indicators](https://www.tradingview.com/charting-library-docs/latest/custom_studies/# add-indicators).  
[`drawings_access`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# drawings_access)# | An object that allows you to specify drawing tools available for users.  
  
### Symbol search and comparisonâ

Use the parameters below to customize the [_Symbol Search_](/charting-library-docs/latest/ui_elements/Symbol-Search):

Parameter| Description  
---|---  
[`symbol_search_request_delay`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# symbol_search_request_delay)# | A threshold delay in milliseconds that is used to reduce the number of search requests when the user enters the symbol name in the _Symbol Search_.  
[`symbol_search_complete`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# symbol_search_complete)# | Takes an additional search result object parameter, and returns an additional human-friendly symbol name.  
[`compare_symbols`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# compare_symbols)# | An array of custom compare symbols for the Compare window.  
  
### Saving and loading chartâ

Specify the following parameters to save/load a chart using the [predefined REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/):

Parameter| Description  
---|---  
[`charts_storage_url`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# charts_storage_url)# | A storage URL endpoint.  
[`charts_storage_api_version`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# charts_storage_api_version)# | A version of your backend. Supported values are: `1.0` or `1.1`.  
[`client_id`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# client_id)# | A client ID that represents a user group.  
[`user_id`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# user_id)# | A user ID that uniquely identifies each user within a `client_id` group.  
  
Specify the following parameters to save/load a chart using the [low-level API](/charting-library-docs/latest/saving_loading/low-level-api):

Parameter| Description  
---|---  
[`auto_save_delay`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# auto_save_delay)# | A threshold delay in seconds that is used to reduce the number of [`onAutoSaveNeeded`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap/# onautosaveneeded) calls.  
[`saved_data`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# saved_data)# | An object containing saved chart content.  
[`saved_data_meta_info`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# saved_data_meta_info)# | An object containing saved chart content meta info.  
[`load_last_chart`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# load_last_chart)# | A Boolean value showing whether the library should load the last saved chart for a user.  
  
Specify the [`save_load_adapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# save_load_adapter) property to save/load a chart using the [API handlers](/charting-library-docs/latest/saving_loading/save-load-adapter).

Specify the [`settings_adapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# settings_adapter) property to save [user settings](/charting-library-docs/latest/saving_loading/user-settings) and set a watermark.

## Trading Platform parametersâ

All Trading Platform parameters are listed in the [`TradingTerminalWidgetOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions) interface. Most of them duplicate the Advanced Charts parameters. Additional parameters are listed below:

Parameter| Description  
---|---  
[`broker_config`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# broker_config)# | Configuration flags for Trading Platform. Refer to [Trading features configuration](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/trading-concepts# trading-features-configuration) for more information.  
[`debug_broker`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# debug_broker)# | Makes the library write detailed Broker API and Trading Host logs into the browser console. Refer to [How to enable debug mode](https://www.tradingview.com/charting-library-docs/latest/tutorials/enable-debug-mode) for more information.  
[`restConfig`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# restConfig)# | Connection configuration settings for the [Broker API](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/trading-concepts# broker-api).  
[`widgetbar`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# widgetbar)# | Settings for the widget panel on the right side of the chart. You can enable [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List), [News](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/news), [Details](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/# details) and Data Window widgets on the right side of the chart using this property.  
[`rss_news_feed`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# rss_news_feed)# | Use this property to change the RSS feed for news.  
[`rss_news_title`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# rss_news_title)# | Use this property to change the title for news widget when using a RSS feed.  
[`news_provider`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# news_provider)# | Use this property to set your own news getter function.  
[`trading_customization`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions/# trading_customization)# | Overrides order and position lines created using the [`createOrderLine`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi/# createorderline) and [`createPositionLine`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi/# createpositionline) methods.


---

## Widget methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/core_concepts/widget-methods*

  * [](/charting-library-docs/)  
  * Core Concepts
  * Widget methods

On this page

# Widget methods

## Overviewâ

After you create a widget with [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor), you can control the `widget` object using the methods defined in the `IChartingLibraryWidget` interface. This article describes the most commonly used methods. Refer to the [`IChartingLibraryWidget`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget) page to see the full list of methods.

## Advanced Charts methodsâ

### onChartReadyâ

The [`onChartReady`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# onchartready) method calls a callback when all data is loaded and the widget is ready. Therefore, you should call other widget methods only after the `onChartReady` callback.
    
    
    const widget = new TradingView.widget(/* Widget properties */);  
      
    widget.onChartReady(function() {  
        widget.getChartLanguage();  
    });  
    

### chartâ

The [`chart`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# chart) method returns an instance of the [`IChartWidgetApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi) interface that provides an extensive API for controlling the specific chart. For example, you can handle chart events, create indicators and drawings, change chart properties on the fly, and more. Consider the code sample below that adds the Bollinger Bands [indicator](/charting-library-docs/latest/ui_elements/indicators/) at the launch.
    
    
    widget.onChartReady(() => {  
        const chart = widget.chart();  
        chart.createStudy(  
          "Bollinger Bands", // Indicator's name  
          true,              // forceOverlay  
          false,             // lock  
          {  
            in_0: 25,        // length  
            in_1: 1,         // 'mult' indicator setting  
          }  
        );  
    });  
    

The `chart` method has an optional `index` parameter. If you want to interact with a certain chart on the multiple-chart layout, you should call the `chart` method with the corresponding index as a parameter.

### activeChartâ

The [`activeChart`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# activechart) method retrieves [`IChartWidgetApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi) to interact with the currently selected chart. For example, the code sample below draws a vertical line on the chart.
    
    
    widget.activeChart().createMultipointShape(  
      [{ price: 168, time: Date.UTC(2017, 10, 13) / 1000 }],  
      { shape: 'vertical_line'}  
    );  
    

You can also subscribe to events on the active chart, such as [`onIntervalChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# onintervalchanged).
    
    
    widget.activeChart().onIntervalChanged().subscribe(null, (interval, timeframeObj) =>  
        timeframeObj.timeframe = {  
            value: "12M",  
            type: "period-back"  
    });  
    

Note that the library does not manage the event subscriptions when users switch between the charts on the [multiple-chart layout](/charting-library-docs/latest/trading_terminal/# multiple-chart-layout). If necessary, you should manually unsubscribe from the previous chart and subscribe to the newly selected one using the corresponding [methods](/charting-library-docs/latest/api/interfaces/Charting_Library.ISubscription). To track the currently active chart, use the [`activeChartChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# activechartchanged) event.

You can also find out the active chart's index using the [`activeChartIndex`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# activechartindex) method and subscribe to this chart using the `chart` method.
    
    
    const index = widget.activeChartIndex();  
    const chart = widget.chart(index);  
    

### subscribe / unsubscribeâ

The [`subscribe`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# subscribe) method allows you to subscribe to the widget's [events](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap) and handle them. For example, the code sample below handles an event when an indicator is added to the chart and prints the indicator's name to the console.
    
    
    widget.subscribe('study', (event) => { console.log(`A ${event.value} indicator was added`) });  
    

You should use the [`unsubscribe`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# unsubscribe) method to unsubscribe from events.

### applyOverridesâ

The [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method allows you to change [Overrides](/charting-library-docs/latest/customization/overrides/) on the fly. The code sample below hides the main [series](/charting-library-docs/latest/getting_started/glossary# series).
    
    
    widget.applyOverrides({ "mainSeriesProperties.visible": false });  
    

### applyStudiesOverridesâ

The [`applyStudiesOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applystudiesoverrides) method allows you to change [Overrides](/charting-library-docs/latest/customization/overrides/indicator-overrides) that affect [indicators](/charting-library-docs/latest/ui_elements/indicators/) (studies) on the fly. The code sample below changes the color of the Bollinger Bands indicator.
    
    
    widget.applyStudiesOverrides({  
        'bollinger bands.median.color': '# 33FF88'  
    });  
    

Note that this method only changes the indicator's properties before the indicator is created. You should use the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# applyoverrides) method in [`IStudyApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi) to change an indicator that is already on the chart.

### setSymbolâ

The [`setSymbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# setsymbol) method sets a symbol and resolution of the active chart.
    
    
    widget.setSymbol('IBM', '1D', () => {  
      // Your callback function  
    });  
    

Note that a callback is evoked when the data for the new symbol is loaded.

### changeThemeâ

The [`changeTheme`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# changetheme) method allows you to change the [theme](/charting-library-docs/latest/customization/# theme) on the fly. This method returns a promise that is resolved once the theme is applied. You can apply other style modifications after the promise is fulfilled.
    
    
    widget.changeTheme('Dark').then(() => {  
        widget.chart().applyOverrides({ 'paneProperties.backgroundGradientStartColor': 'red' });  
    });  
    

### onShortcutâ

The [`onShortcut`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# onshortcut) method allows you to override the builtâin [shortcuts](/charting-library-docs/latest/getting_started/Shortcuts) or specify custom ones. For example, the code sample below specifies a shortcut that opens [_Symbol Search_](/charting-library-docs/latest/ui_elements/Symbol-Search).
    
    
    widget.onShortcut("alt+q", function() {  
        widget.chart().executeActionById("symbolSearch");  
    });  
    

Refer to the [Manage shortcuts](/charting-library-docs/latest/getting_started/Shortcuts# manage-shortcuts) section for more examples.

### takeClientScreenshotâ

The [`takeClientScreenshot`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# takeclientscreenshot) method creates a snapshot of the chart and returns it as a canvas. You can then take the canvas element and create an image from it. The code sample below saves a screenshot as PNG.
    
    
    async function saveChartToPNG() {  
      const screenshotCanvas = await widget.takeClientScreenshot();  
      const linkElement = document.createElement('a');  
      linkElement.download = 'screenshot';  
      linkElement.href = screenshotCanvas.toDataURL(); // Alternatively, use `toBlob` which is a better API  
      linkElement.dataset.downloadurl = ['image/png', linkElement.download, linkElement.href].join(':');  
      document.body.appendChild(linkElement);  
      linkElement.click();  
      document.body.removeChild(linkElement);  
    }  
    saveChartToPNG(); // Call the screenshot function  
    

### customThemesâ

The [`customThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# customthemes) method retrieves [`ICustomThemesApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomThemesApi) that allows you to manage [custom themes](/charting-library-docs/latest/customization/styles/custom-themes). For example, you can reset the applied themes to the default values.
    
    
    let customThemesAPI = (await widget.customThemes());  
    customThemesAPI.resetCustomThemes();  
    

## Trading Platform methodsâ

The methods below are available in [Trading Platform](/charting-library-docs/latest/trading_terminal/) only.

### widgetbarâ

The [`widgetbar`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# widgetbar) method retrieves [`IWidgetbarApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IWidgetbarApi) that allows you to interact with the widget bar.
    
    
    widget.onChartReady(() => {  
        widget.widgetbar().then(widgetbarApi => {  
           widgetbarApi.isPageVisible('data_window');  
        });  
    });  
    

### watchListâ

The [`watchList`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# watchlist) method retrieves [`IWatchListApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IWatchListApi) that allows you to interact with the [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List) widget.
    
    
    const watchlistApi = await widget.watchList();  
    const activeListId = watchlistApi.getActiveListId();  
    const currentListItems = watchlistApi.getList(activeListId);  
    // Adds a new section and item to the current Watchlist  
    watchlistApi.updateList(activeListId, [...currentListItems, '### NEW SECTION', 'AMZN']);  
    

### newsâ

The [`news`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# news) method retrieves [`INewsApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.INewsApi) that allows you to interact with the [News](/charting-library-docs/latest/trading_terminal/news) widget.
    
    
    widget.onChartReady(() => {  
        widget.news().then(newsApi => {  
            // newsApi is ready to use  
        });  
    });  
    

### chartsCountâ

The [`chartsCount`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# chartscount) method counts a number of charts on the multiple-chart layout. In the code sample below, this method is used to interact with all the charts on the layout one by one.
    
    
    for (let i = 0; i < widget.chartsCount(); i++) { console.log(widget.chart(i).symbolExt().symbol) }  
    


---

## Localization | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/core_concepts/Localization*

  * [](/charting-library-docs/)
  * Core Concepts
  * Localization

On this page

# Localization

## Set up languageâ

To set up a default language, specify the [`locale`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# locale) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). Check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=1353s) on YouTube for an implementation example.

## Supported languagesâ

The languages that the library supports are listed below.

Language| `locale` value  
---|---  
Arabic| `ar`  
Catalan (Spain)| `ca_ES`  
Chinese (Taiwan)| `zh_TW`  
Chinese| `zh`  
English| `en`  
French| `fr`  
German (Germany)| `de`  
Hebrew (Israel)| `he_IL`  
Indonesian (Indonesia)| `id_ID`  
Italian| `it`  
Japanese| `ja`  
Korean| `ko`  
Malay (Malaysia)| `ms_MY`  
Polish| `pl`  
Portuguese| `pt`  
Russian| `ru`  
Spanish| `es`  
Swedish| `sv`  
Thai (Thailand)| `th`  
Turkish| `tr`  
Vietnamese| `vi`  
  
## Multiple languagesâ

To support several languages, you need to create a custom [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) for each of them and recreate the widget every time users switch the language.

## Unsupported localeâ

If an unsupported locale is specified in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor), the chart falls back to English with a console warning _locale isn't supported_.

## Custom translationsâ

If you want to provide custom translations for UI strings, use the [`custom_translate_function`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_translate_function) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).

## Right-to-left alignmentâ

The library supports right-to-left (RTL) alignment for RTL languages such as Arabic and Hebrew. Note that the alignment affects only toolbars, dialogs, and other UI elements except the chart.


---

## Resolution | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/core_concepts/Resolution*

  * [](/charting-library-docs/)
  * Core Concepts
  * Resolution

On this page

# Resolution

**Resolution** or time interval is a time period of a single bar. The library supports resolutions in seconds, minutes, hours, days, weeks, months, years, and ticks.

## Resolution formatâ

A resolution value should have the [`ResolutionString`](/charting-library-docs/latest/api/modules/Datafeed# resolutionstring) type. The table below describes how to specify different resolution values. In these values, `x` represents a number of units.

Resolution| Format| Example  
---|---|---  
Ticks| `xT`| `1T` â one tick, `5T` â five ticks, `100T` â one hundred ticks  
Seconds| `xS`| `1S` â one second, `2S` â two seconds, `100S` â one hundred seconds  
Minutes| `x`| `1` â one minute, `2` â two minutes, `100` â one hundred minutes  
Hours| `x` minutes| `60` â one hour, `120` â two hours, `240` â four hours  
Days| `xD`| `1D` â one day, `2D` â two days, `100D` â one hundred days  
Weeks| `xW`| `1W` â one week, `2W` â two weeks, `100W` â one hundred weeks  
Months| `xM`| `1M` â one month, `2M` â two months, `100M` â one hundred months  
Years| `xM` months| `12M` â one year, `24M` â two years, `48M` â four years  
  
You can also omit the number of units if it is equal to `1`. For example, you can use `D` instead of `1D` and `W` instead of `1W`.

## Set up resolution on the chartâ

The resolution is initialized in the Widget Constructor and can be changed in the UI or using the API.

To get the current resolution, use the [`resolution`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# resolution) method.
    
    
    widget.onChartReady(() => {  
        widget.activeChart().resolution();  
    });  
    

### Default resolutionâ

You can specify the default resolution using the [`interval`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# interval) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).
    
    
    new TradingView.widget({  
        // ...  
        interval: '1D',  
    });  
    

### In UIâ

Users can change the resolution in the following ways:

  * Use the _Resolution_ button on the top toolbar.

![Change resolution via top toolbar](/charting-library-docs/assets/images/change-resolution-27d11071efbc4b89dfd760528abf653e.gif)

  * Use the _Resolution_ button in the [_Legend_](/charting-library-docs/latest/ui_elements/Legend).

![Change resolution in Legend](/charting-library-docs/assets/images/change-resolution-legend-53e5e1f28a07048eb2d70471f63dd191.gif)

  * Press any digit key or the `,` (comma) key.

![Change resolution using shortcuts](/charting-library-docs/assets/images/change-resolution-shortcut-9cdd50b118ea1410f8eed9d084a944c2.gif)

To disable any of the methods above, refer to Disable resolution changing.

### Using APIâ

You can use the [`setResolution`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# setresolution) method to change the resolution on the fly.
    
    
    widget.onChartReady(() => {  
        widget.activeChart().setResolution('2M');  
    });  
    

caution

In the UI, users can enter values like `2h` to specify a number of hours. However, you should specify hour resolutions in minutes, for example `120`, if you change the resolution using the API.

## Configure resolutions in datafeedâ

You should configure resolutions in your [datafeed](/charting-library-docs/latest/connecting_data/datafeed-api/) to display data correctly. To do this, follow the steps below:

  1. Specify resolutions that the chart and a certain symbol support.
  2. Enable specific resolutions that you use, for example, a resolution in seconds or days.
  3. Implement the corresponding method in the datafeed.

### 1\. Specify supported resolutionsâ

To enable any resolution, specify the following properties:

  * [`DatafeedConfiguration.supported_resolutions`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supported_resolutions) contains all resolutions that the chart should support.
  * [`LibrarySymbolInfo.supported_resolutions`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# supported_resolutions) contains all resolutions that a certain symbol should support.

The resolutions should be listed in a specific format. For example, `["1", "15", "240", "D", "6M"]` stands for 1 minute, 15 minutes, 4 hours, 1 day, and 6 months. If the certain symbol does not support some chart resolutions, they are disabled for this symbol in the UI.

![Supported resolutions](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAAG5CAIAAACFtKa1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH5wsCDjQbIZ1vEQAAIABJREFUeJzt3Xtc1HW+P/A3ezjOKDIjygDDNUG8IGKEmBcsL5QiUAmmi+y2GqS1tZ6Tv+IcTNv9ra3sYcvzq2xdKy+njpquaClIlkjJRQWVRBhUROM6MIPpDJIzRvH74wtfRrnIDAO8wdfzwaPHzPf7ne/3Y7783oDX1+Zmwx3qJzdv6vpr08CcTT/mUj78X/tr08BZeVX9r/p7DAAdQC6BI+QSOEIugSPkEjjiksvyqvr+HkKnOI9tsOKSSwBTyCUXOp3+D/+W8Mb6Df09EBaQyz5SVKTS6fRdzJ0TGnlTp0t47d/6clRsPYi5LCpSrXvzrb7c4iurX58dGjknNLKoSNV+bvLb7z4VtWzlC8s/3blVLpf15cDYeuByWVSkejo6duLECX22xVdWv36huKTsUsHrr61+KmqZaTQrKquejlqWlv71oQO7X1y5os+GxJ8FufzugzHjfdq+ks9Zf1S9paKy6uno2Nf/z+qYpdF9s0UhlIcO7JbLZTFLo/+yYb0YzT17U+aERvpPnPBtRqq/v9/91qRNecHHcVOBWVvXHIxzdEnKF96cTXJ0iUtRW/Kn6Hu2ln1s/n9n/T1SQUTaw6umjRm/Zv/Flx+26rh6gU6nf27FS2HzQ/tsz2QaSmGK8O/hqahlk/z9LhSpPt25deaMR/tmMD2i3rc8MDEgrWxNUB9t0MJcihSRW0/RqmmLk6dfSXjEKiOyqorKqqqqauH12vVv+fuN3/ze3/pguzqdft2bb90TSkHM0mhPD/cLRapPdvyjT88mgxLra/tuaz1khfNLRfAT82n7ye96viYry8k9PSc08q/J7wpfM6dP7ZtQEtHWj3YUFqnah1Iwc8ajL65cIc7KyT2de/J07snTFZVV3Vt9wSaXuJSz+5a7+Di6+Di6+Gw6azJT3TY94UjLNM3BOEcXn7Zj+t2LOb6wTyNMPJvkKE4UzxnU+5YHJqYSbQz3cXTxWX5Qe/c67x5Ay9lCwSZxuumGun8ecrPhjplfeX9x9l62u7rLKd36ajbxfaW22VK7P9u/+7P97SeO9p3cfroFLBvbzZu67iw22nfyKGdv8SvtyFedLKjZH+896p1zzc3Nzc3n3nH2HuW8Ma+5ubm5ue7A8+Lr5pq9v3MWF9Psj+9qsd8d0Ajv8t7xfueMsHzHCwhv3znTNpq6A8+Pcn5+f01zc3Nz85mNo8S5ZzaOcn7+d+J67hp2d31fqe3pcbzf7dmbIt6LFq9mkt9+9x8f7jh0YHc3rid6SzeP0Xp9Q31tmfD6qUXLiopVC8Oe6M4HI7bEBxMRkdO0+RGUmHU2MTiI8vckpkYmqdYEEhGRYtbC2XS4/Ue1KW8mpkYmqRYphPfBa8qCiYgU0R8ltiyinBMZSauuVREpOtp4wf++9E3EllPRSiIiCkpMT/g47B/7fvPREiciom8CXtwW3J0/Q+cGdi6FUB46sJuInopaRkQxS6PFq41+DGU/0VaUEE3wdbrPYlXlhyliy5yOFtOmvDBtlRjlzm6mqUsLiQI82yLrNXo2JZeVEzkREc32chXnKKJfjF8VvtgxOT69NrH7YbXG/cvaK8X0+ILgDv9h9SIxlP7+fv7+focO7H5j/YZHgh9nGMo31m8QT8V8xgUeSf+6d7ZTVX6YIka7W/rxgk0u01ZRkqq2rL721NZIKw0qKLG+tky15UqYybnpfVkhl9r8r4+GPTHdpedrMsMb6zeIoRSmCNEMWxDa2dVGP9r60c63/rzuiwO7vziwO2x+aFFxB9/1sYbAWQmUeiRTc5/F3L0iKfVau2uss19upNlb/ywci6vKOzgBaKX0DSAqrBBDps068g1F+nh1/gmnRdvq0+JTX/rPbt5A7XEua/f/8VX67zcW9/HeMmZpdPudor+/3182rOcWSsEkf7+ZMx6dOeNRT0/3z/YeeDpqmfBl3a0ExyRFHE5MaN0tlV/7pqOlFNEvxlPyYnHvlb9JvN/+TXmNMGUzJcymktKWiCt9A4g2fiteTQf+Zsvs1Jc+br1j//Gqw7T2xSVdnz9oKq50/w9i4fnl0Vdn+bxKRERhb526srWvD+FErA7T7Qn3Lzu77zNj+tSYXy8WXls5msolO2t9N7lMc3yJiCgicnbHiwUl1hf4LA9sWYwi49OJKChRteWKX7jPRqK1aWVrggrIZfH/nl2yJoiIAtekxW8MX+yYTETx6bWJwYu2qSjOz8VHWN/aTm+533XCujatrOVS6X64/J5ueVW9l7tjf42kaxaMLSf39Nr1GzZuWC+8fTpq2RcHdgvf2kl++10iEn9uyNHFx/R6PGTmo/iRovKq+oF9Pc6ZXCYbGN9jZOmB+3kiGBCwv+wtVVXVyW+/J779bG9KTu5pIhL+azpLfC1+Kx+Qy14hl9m7u7tl55wS3s6Y/mh5RVV5RdtlkOks8bW7u5uHh8V3HwcV5LJX+Pv7HTq4u79HMYDh/BI44nKfCECEPjdgCrkEjpBL4Ai5BI6QS+AIuQSOkEvgqOX7Pc3NzX2/7X7ZKHBmY2PT8uJahYZMIoKsQN9ri2PrC1vxl3aJmhFK6C82NjZENiLbX375WS6zGyGzs7X9l/4eGzzQmpp+vqlv1OkbbWx+ZSuX2TmO5PiLWvCgsbX9FyGKOn2jbeOPdxxH9veIAFqNcrAfPmwI7hMBLzY2Nk1NTcglsPPzzz8jl8DOL7/8glwCO8glcNTc3IxcAkfIJbCD/SUwhVwCR8glcIRcAkfIJXCEXAJHyCVwZEafW2VVzfadnxkMRiKKjYnynziuqPjSrj0HxAW8vNxXPLdEIpGIS0qlkueX/9rDveVxLhmZ2ccysoTXwhqE1eafOR/1TJgwvaj4UnZu3ornlmi018XN3bOePXs/L7xQYrrFHv5fAFZ+/qW5u7k0Go1p6RnRi8L9J44rvXJNKm2JQvtkCKEUltTrG7Jz84U8FRVfOnP2fGLCKzKZfWVVza49B+Vye2HWhaKSsb7eQkxNyeWyV1cvlcnsi4ovbd/5mRDNouJLOn3Dn9avIaIz5woRysHH+NOvunscNxrvGAxGudyeiHzHjBZ3Xe1l5+SJIZPJ7BcumEtERqMxOzcvPCxUJrMnIg931+Apk7Nz8sRPpaUf0+sbOlun/8RxITOnCsvXabRymb1EIpFIJDOn9/Bxb8BUd3Mpk9k7Oznu/uxgF+khIr2+oaKyepL/vQ9w02ivGwxGT4+2NDs7KXT6BqPRSERyuSxk5tTdez8X3nZIXH6sr/fl0qsZmdndHDkMRGZc98QsfcbTwy0pefM/PvpUDFB5edWfNmxKXJe0Z+/nwhSJRCLsVrsml9sbDEajsaV9c9LE8XKZfXZufhcf0en0RuMdD3fX55f/OjsnL3FdUlHxpe6PH/rAp7v2nz1XeM/Es+cKP92136z1mNdjHbP0mahnwnZ8su/A5+kxS5+hjs4vjUajTtfQvibcYDDq9A3CcZyIdLoGqVQikQwRFwgPm7f9f/YafTvtiZXLZcLyHu6uf1y3pqj4UsrBNPEkFTiIWPjEp7v2X/u+MmLhPKlUajAY/pmSduPGzd/GLjZrPWbfJ5JIJCEzpoqH4HvIZPaeHm51mnsfT+mkGDVihEynazsHEE8TTT8bvWhh/pnvOtzuhaKSe5b3HfOQs7PCdJ3Q7xwc5KtfiZNKJO9u3n6u4MJ7H2xXKp1WvxLn4CA3az1m5PLIl8eFk8v2ETElXKAIR1ij0Xjky+NGo1FIs3hxU1R8KTsnL2Tm1Hs+6+Hu2n4iEWVkZl8uvSrMqqyqyTmZT0Qa7fWbN/XdOWeAPhYRHvpsdMTXGVmLoyJC586yYA3dPY7r9Q0Xikqysk9T67FbmC6cXwqvhenC+d/2nZ8JtzaDpzwszPWfOK5Oo01K3kzt7keaCpkRLJ506nR6YfkRI2Svrn5BOAe4XHr1WEZWatoxIoqNicJBnCfv0Z7/8drvLf64zfeVWrYPZoQHk1arxfchgSPkEjhCLoEj5BI4Qi6BI+QSOEIugZ1bjY3IJbAz3M4OuQSOkEvgCLkEjpBL4Ai5BI5siai8qr6/hwHQZpiEbIkIP+cGrODn3IAp5BI4Qi6BI+QSOEIugSPkEjhCLoEj5BI4Qi6BIzN6s4xGY0Zmzrw5M4UGmIzMbGcnhdBzmZGZXXrlmlDCceDz9PCweUI3hl7fsP1/9kYvWujh7rpn7+dOTo7z5oQIq9rxyT7fMaODgyZv+fCTmzf1phsKmDRBaOcqL68SJwr9wmgKfkCYlcs7l0uvTvIfL1SvaDT1RNS+5Fenb0hLzxDa3u5LJrP/j9deJpP6aiFqQimX2HUtQFPwg8OM47hO36DT6S+XXqXW/lUhmu0VXijpjWZKNAU/OMzJpa7B2Vmh0dQbjcaKyhrfMd7UumO7R0R46LHjWZVVNVYbJhERoSl4YDEYDBZ/1oxc1mm0vmNGy+Uyo/FOnUbr5elGRGL3mim5TBY6d1Zaeoaho7ndt2vPgcR1Sf/3rU1CxNEUPICo1XXvfbB9/4E0yz7e/d5/Y+mVa85OColkSOmVaxpNve+Y0URUUdnxTtF/4ji5zN602d8CsTFRSW8l/nHdGrFMUGgKjo2JSjmYZvX9MViLquTyJ7tSfrssWiqRvLd5mwU7TrOfRzHW1/tC0UW5XCaT2Ts5ObavBhZFPROm0dbrdPrOFrAYmoI5y8nNP5aRtTIuVql0jggPnTkj+L/e/rtaXWfWSrqbS52+gYjkMnsnxSiD0ejp4UZEzk6Kzi59iEgikYSHzROvmif5Tyi9ck04HxVSPtbX26yxoimYP4PBcOOGbmV8rFhcHfRIwMq42Bozc9nd+0RiTb9EIpnkP17MRGdF6wIPd9dZIS291EJfsFgu3J2qX9OHqcXGRNVptGgKZk4qlUaEh94zUal0ViqdzVoP+oKBHfweBTCFXAJHyCVwhFwCR8glcIRcAkfIJXCEXAJHyCVwhFwCR8glcIRcAkfIJXCEXAI7eK4UcITnSgFTyCVwhFwCR8glcIRcAkfIJXCEXAJHyCVwhFwCR8glcGRJLn+4cePM2YIebri6Wr3zk90/3LjRw/XAoGR2Ln+4cePQ4fQ7d37qjdGYNYydn+yurlb37zCgl5jRr05E1dXqcwXnR40c2fMNu7kplz+3rOfrgUHJjFzeNhiuX78etiD0eOaJLhbLPZlnZzesrk7z3fkiJyfHpyLDZPb2xzNPfHe+aPRor4jw+UOlUlXJpdS0o+Jb048QUcjMaTOmT6XWffMT8+a4uSlN3w4dJj10OF2jqd+1559EFBE+32/COCKqrlYLU0xXAgORGbkcKpUGBPg3NTXdd8mC7wqfigx78om51dXqjOMnFI6jpkwJnDvnseOZJ7KycufOeUyIUbHqoviRo18dj4159skn5grh8/L0ELLYoZEODk9FhplGloiqq9VfZ2TGx/12pIPDbYMhNe1o7sk8RHOA6pXrcVeli8zenoiGDpM2Njb6jvEZ6eBga2vr7u6m0zf81FGyH57s7+ysICKZvb2r0qW8otKsLTY1NRWrSqYGB410cCCioVLpRL/x1TXq2z2onod+ZN75JVv6hoYade1354tS046KE0eP9urHIUFPDJJcCmJjnu3i6A8DyCC5rz506FA7Oztzj/7AFutcmqatqanpzJkC8TED9wRROKHMzjkl3tEsLCzCyeXAxfo4PlQqnTFt6q49/8zOOeXk5BgyY1qNurb9LOF+k9+EcXKZTLxPNDX4kf4bOPQUev+BHfT+A1PIJXCEXAJHyCVwhFwCR78aMoT1rSJ4MGF/CRwhl8ARcgkcIZfAEXIJHCGXwBFyCRwhl8ARcgkcIZfAEXIJHCGXwBFyCezgeWfAEZ53Bkwhl8ARcgkcmffD6rkn87JzTpE12iWFWsCnIsOEBjYAU2bsL6ur1SNGyBNeW73m339/69at3JN5vTes+0KP9eBmxv7SzU0ptKUJTZbFqou3DYahUqllG0aPNXTB+r90xq3HuqmpSdg6EYlbtPqfGqzLklzeNhiKVRcn+o3v7C+YVY/15dIynb7hD6+sRBwHELOvx1Ull97f/OGMaVOFbHUIPdbQQ2bvL/0mjBvr63M880SxqmTunMdsbVn8+nkXPdajR3sVqy6+v/lDtAkPIJakytbWdsqUwEOH0+vqtKz+pjtL3rPRTwunB65KFz7/lqALg+S++n17rEc6OCxdEqXTN1wuLevLgYFlzMhl7sk88X5hba3Gzs5u5KjevSVu3R7r27dvNzY29uqAwVrMOKLNmD4192SecCOmb264WKXHWrgnJbwOmTmti8s14MOmpu6G0mlEfw8DoA16rIEp5BI4Qi6BI+QSOEIugSPkEjhCLoEj5BI4Qi6BI+QSOEIugSPkEjhCLoEj5BI4Qi6BI+QSOEIugSPkEjhCLoEj5BI4Qi6BI+QSOEIugSMzeg1M2yWpx9UG6LGGLpjXICX0rHJI0j2VrTCY3Gps7LdmM/RYQ2eG29mZncvCwuK8/HMPT/bvrLAPPdbQc+bl8iEvT78J42Y/HpJ7Mu/gF2md/R2jxxp6yIzrcTc35ezHQ5ycFEQ0frxvY2PjtWvlHS6JHmvoIQvPL4X6SesOpSfQYz3IDKpGZ/RYDxo9uq8ul8msNY4eQo/1IGPec/jElmjhzBI91tBLzDiijRzlkJp2VEgkeqyhV6HHGthBjzUwhVwCR8glcIRcAkfIJXCEXAJHyCVwhFwCR8glcIRcAkfIJXCEXAJHyCVwhFwCR8glcIRcAkfIJXCEXAJHyCVwhFwCR8glcIRcAkfIJXBkSVPPDzduXL36/ZSgQOEt+q3B6szOpVBANdZ3jOlE9FuDdZmXy+pq9bmC86NGjuyl0RD6rYGIzMrlbYPh+vXrYQtCj2eeaD+3N/qtVSWXbt7UEVF2zikiEleOfutBz4xcDpVKAwL8mzpq++29fuvsnFMR4fMTXlstVFNfLi3rovgK/daDhhWux3u133r0aC+h9neoVOrmqqyqqu7wH0Zn0G89QFm5ORf91mAVD0SjM/qtB5ZbjY29cl8d/dbQE8Pt7KyQS/Rbg9VZ4ciFfmuwOvRYAzvosQamkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgCLkEjpBL4Ai5BI7M6zXIPZknVFGKLZICoeVHKL3oYQ0VeqyBzMpldbV6xAh5wmurhUZToUWS7q6OFhpQ+7EhDT3Wg4MZx3E3N6VQliI0VootkrW1Gleli7OzgoicnRUPT/bvoqeqO1tZ/twy7CwfcD3tJ2pqaqqqqh4+fLhQ0mdrazt8+PBbt241NTXdU9uHHmvoPktyedtgKFZdnOg3fqhUettg0Okb3N3dxLkjRshv3brV4QfRYw3dZPb1uKrk0vubP5wxbWoX+eislBo91tBNZu8v/SaMG+vrczzzRLGqZO6cx9ovcPOmTi6z/1ce3bvosR6gLEmPra3tlCmBhw6n19VpnZ0Vcpm9cBbIFnqsB5ye3lc3vdAhoqamplu3brm7uzH5O0aP9QBlRi5zT+aJbdC1tRo7Ozuhr9rL0+O780V1dVoiEi4mhANl70GP9aBnxl5txvSpuSfzhBsupjdW3NyUsTHPCtOFG0DosYYeQo81sIMea2AKuQR2euu5UgA9YZ3nSgFYHXIJHCGXwBFyCRwhl8ARcgkcIZfAEXIJHCGXwBFyCRwhl8ARcgnshPw7cgn8ZP8/5BJYQi6BI+QSOEIugSPkEjhCLoEj5BI4Qi6BIwtbhJqamvLyzwUGBgyVSk1bT6nHHafoVweyOJd5+eeqa9SBgQHCW6H+hUOS0K8+OFhyHFeVXBKKpXsD+tWBLNhfVler8/LPTg1+RFt/3XR6YWFxXv45sQK9/QfRrw7dZ14uf7hx4+uMzCfmzdHp9aa5fMjL02/CuNmPh+SezDv4RVpnf8foV4duMuM4fttgyDh+YqzvmHtO3dzclLMfD3FyUhDR+PG+jY2N166Vd7gG9KtDN3V3f9nU1JSVlSuX2Yv9kR0SalGtMTDrQL/6ANXdXNbVaYVTMeG/gtS0owPitAz96gNOd/8m3NyUCa+tFt+qSi4Vqy52Fkq5TGad0fWYWGvd2R5R6Fe/75kr9DErfL+nulottpcLZ5ZC73rvQb/6oGeFI9fIUQ6paUeFRPbNDRf0qw966FcHdtCvDkwhl8ARcgkcIZfAEXIJHCGXwBFyCezguVLAEZ4rBUwhl8ARcgkcIZfAEXIJHCGXwBFyCRwhl8ARcgkcIZfAkc33ldr+HgPAXYZJmm2HDLHF7/cAK/j9HmAKuQSOkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgyIyewT17Py+8UCK8Dpg0IWbpM6Zzi4ov1Wm08+aEVFbV7NpzMDZmkYe7KxGZvhXX4OXlvuK5JRKJxHp/EBhUzOu/DJ03a96cEKPRuOOTfXv2fi5G02g0ZufmEVHIjGAPd9fgKZOzc/KEudk5ecFTJnu4uxYVX9LpG/60fg0RnTlXiFBCFyw5jkskkmVLn6nT1FdW1QhTNNrrdXXa8vKq0ivfE1Fw0GRhbmVVTZ2mPjhoMhHVabRymb1EIpFIJDOnB1vvjwCDjeW9BhLJEKlUotM1CG8vl14NmTk1YNKEC0UlRCST2U/yH59xPDstPSN07iyZzJ6Ixvp6Xy69mpGZba3RA3MGSx9G09NegzqNloj0+oYLRRfH+nqHzJxap6nX6xuIKGRGsMFoJCLfMQ8JC3u4uz6//NfZOXmJ65KKii/1ZLvAn1pd994H2/cfSLPs4z3KpbOTgogqKmukUomTYpSTYpRUKqmorCEiiUQil9n7jhlteh7p4e76x3VrYmOiUg6miecAMPioSi5/sivlt8uipRLJe5u3WbDjtLD3X6O9fvOmXi63J6ILRSXl5VV/2rBJmCWX2ftP7KpD33fMQ87OCp2uwcPdso0Dazm5+WfPFa6Mi3VwkEeEO589V/hfb/99ZVysUunc/ZVYkku9vmH3Zwe9PN083F0rq2rKK6p//+LvTO8KVVbVCG9NVVbVVFRWz5webJppGGQMBsONG7qV8bHS1meSBD0S4Kp0rlHX9WIuj2VkHcvIotYbRkR0ufSqEFBhAQ93Vy9Pt8ulV9vn8nLp1WMZWalpx4goNiaq/QIwCEil0ojw0HsmKpXOZoWS8JwUYAi/RwFMIZfAEXIJHCGXwBFyCRwhl8ARcgkcIZfAEXIJHCGXwBFyCRwhl8ARcgkc2Ux4vrm/xwBwl2//ip8nApaQS+AIuQSOkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgCLkEjizK5ZN0+q3uLrvhLVK9Tyss2Qw8uMzP5ZN0eimh8wp6lZl9bitI9Qhd/RG5hN5lXi5TfcjvD7TjffLuerkVpAppednwo8nk1+n18a3TL9KjfyMiSt1GitbX4jJ+cWaNCwYb847jEeu6sdAKUoVQw0XyiyO/ONIOa5sT7Ul/iyO/OPLLJvvxlLqCiCjlItl7tp2APuZJpDZrUDAIWf96fMcjROq2/V+BScgi/kA7Whaiq0QKRyKiHeepYRg99mTLMophdPqE1QcFA4yFPdZdUAyjhopO56ZuazsHaHmYxVekiiS/yURfEa0g7x8p5SurDwoGGGvn8klSEGnrO551einZq8lvHZFwWtk6Z8U5Uj1CK4i8faihonWfCg8wax/HvyLVj+Tt08GcFZPJnihFOEN9si2UREQ76Oowil5BgUpSnbfyiGDAsfy5Ul1YcY5I2XJNQ0Tu8rvmuj9JRLQjkrRqsjeZVaAm7xDy/pFO4CD+wOvpc6U6toP89pIihFTbSLWN/MTJf6MUNT26lFTbiA5TxAlqUNKO1sud9WVEhIM4tGDze7pP0uml9FUcre/vgUC/Y/R7uhseI3s1QgktrH+fyGzCN4dar9MBiEUud5AfTirhblyO4wCmkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgyOb7Sq2Xu2N/DwOgjVbL5vvjAKaQS+AIuQSOkEvgCLkEjpBL4Ai5BI6QS+AIuQSOkEvgCLkEjizKpXrf8k0F1h5JVzQH4xxdkvL7cpPQr8zPpXrf8sDE1F4YCoDIzFyeTXJ8sywgsnfGAtDKrFwWbPp2Qf1H8V5dLHI2ydElLqW1i1VzMG7TWZOPu/i0vFXvW+7i4yh8vbBPY7KC/E2t08WF76Het9zFZ/lBrTkjhwHGrFwGrlkTeJ9FghaspW8OnxJCo8068s3Gb1vPRM9+uZHiZwW1nAkEpJXV15bV157aSol+rdHM3+QTVpKkqi2rry2rT4vfGN4+mgWbAhMD0sp2LlIQDF5Wvx4PnJVAqdeqiIjUmYdpdkTyZmH3mf/txxFb4oOJ8vckpibsXxMkLK+IfjGeDh/NUhOp932QPHvrn5c4CXOC4rdGUlusiYgof9Piwi2nWj8Lg5b1e2CCH4+n8C/z1wTSnkRaeCp54X8mnNJGL6rKSp4dWaAgKshKJqLFjsmmH5pNRJpTR1Ppm9RAn1Wmcya0vaw4GLcqmdamYU85+PVCP1HQgrW0OOvsAkqOf7lW4aSeT29majzLNkbOVylbFonYcqr9gVhDRBSfXpsY3PF6P151bb9qC/mFJ83qdBkYJHrjvnrgrATaGL54Y8KCYCJSLnl5QqJf+McRC+c4ERG5e0VS6pFMTbuPOXmOIfo4q8NrHSKi+PQ1gU6L/ro18uOwvr17Cn2vV77fExyTFEG09vGWi6Tgx+OJZkdOE3aQwgllYkLrBbXmYFLL9btwQhku3j8v2NRB/hTRf06KSF7c8aU6DBa9831I5ZzIhKTfiFcnQQvWRs6fpRTfJtYXJNFL04SbQX5HyLNlhiL6o7L0hI/DWu4TLabR7u13q6Rc8nICbQxP6pWRAw82NXU3lE6DxMUIAAAAYUlEQVQj+nsYAG3we7rAFHIJHCGXwE6vPFcKoId657lSAD2GXAJHyCVwhFwCR8glcIRcAkfIJXCEXAJHDJ5bCq3u/NTU30Pgwqai+vovv/zS38MAIqIhQ7CbICKytfnp/wPWkEltUFH4LAAAAABJRU5ErkJggg==)

If a user switches to another symbol, that does not support the selected resolution, the library changes the resolution to the first available one for this symbol.

#### Additional resolutionsâ

The library can combine smaller intervals into larger ones to build new resolutions. For instance, it can build 2-minute bars from 1-minute bars. Therefore, you can enable resolutions that your datafeed does not explicitly provide. To do this, add these resolutions to the `supported_resolutions` arrays mentioned above.

If you want to disable resolution rebuilding, use the [`disable_resolution_rebuild`](/charting-library-docs/latest/customization/Featuresets# disable_resolution_rebuild) featureset.

caution

The library **cannot** build the following resolutions:

  * daily, weekly, or monthly resolutions using intraday data
  * resolutions higher than seconds using tick data

### 2\. Enable required resolutionsâ

Follow the instructions below to enable the required resolutions.

#### Resolution in secondsâ

To enable resolution in seconds, additionally configure the following properties:

  * Enable the [`seconds_resolution`](/charting-library-docs/latest/customization/Featuresets# seconds_resolution) featureset. To do this, include `seconds_resolution` to the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) array.
  * Set [`has_seconds`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_seconds) to `true`.
  * Specify [`seconds_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# seconds_multipliers) that contains the resolutions provided by the datafeed.

Additionally, if your datafeed supports tick data for a symbol, you can tell the library to build seconds bars from ticks. To do this, set [`build_seconds_from_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# build_seconds_from_ticks) to `true`. Note that this feature is available in Trading Platform only.

#### Resolution in minutes (intraday)â

To enable intraday resolution (in minutes), additionally configure the following properties:

  * Set [`has_intraday`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_intraday) to `true`.
  * Specify [`intraday_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# intraday_multipliers) that contains the resolutions that the datafeed provides.

#### Resolution in daysâ

To enable resolution in days, additionally configure the following properties:

  * Set [`has_daily`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_daily) to `true`.
  * Specify [`daily_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# daily_multipliers) that contains the resolutions that the datafeed provides.

#### Resolution in weeks / monthsâ

To enable resolution in weeks or months, additionally configure the following properties:

  * Set [`has_weekly_and_monthly`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_weekly_and_monthly) to `true`.
  * Specify [`weekly_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# weekly_multipliers) or [`monthly_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# monthly_multipliers) that contains the resolutions that the datafeed provides.

#### Resolution in ticksâ

To enable resolution in ticks, additionally configure the following properties:

  * Enable the [`tick_resolution`](/charting-library-docs/latest/customization/Featuresets# tick_resolution) featureset. To do this, include `tick_resolution` to the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) array.
  * Set [`has_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_ticks) to `true`.

Additionally, you can tell the library to build seconds bars from ticks. To do this, set [`build_seconds_from_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# build_seconds_from_ticks) to `true`. Note that this feature is available in Trading Platform only.

### 3\. Implement method in datafeedâ

The library requests data from the datafeed based on the current resolution selected on the chart. All resolutions that your datafeed explicitly supports should be listed in the `*_multipliers` properties ([`seconds_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# seconds_multipliers), [`daily_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# daily_multipliers), etc.) and implemented in the [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars) method.

### Exampleâ

Consider the following example. The datafeed has 1-minute and 2-minute bars. Also, you would like to support a 5-minute resolution. In this case, you should configure the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) properties as follows:
    
    
    //...  
    "has_intraday": true,  
    "supported_resolutions": ["1", "2", "5"],  
    "intraday_multipliers": ["1", "2"], // The library can request 1-minute and 2-minute bars, and will build 5-minute bars from 1-minute data  
    //...  
    

The example of the `getBars` implementation is demonstrated below:
    
    
    getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {  
        if (resolution === '1') {  
            const bars = getBarsFor1MinuteResolution(periodParams);  
            onHistoryCallback(bars);  
            â  
            return;  
        }  
        â  
        if (resolution === '2') {  
            const bars = getBarsFor2MinuteResolution(periodParams);  
            onHistoryCallback(bars);  
            â  
            return;  
        }  
      
        //...  
    }  
      
    function getBarsFor1MinuteResolution(periodParams) {  
        // Your custom logic  
    }  
      
    function getBarsFor2MinuteResolution(periodParams) {  
        // Your custom logic  
    }  
    

## Additional settingsâ

You can use [featuresets](/charting-library-docs/latest/customization/Featuresets) to adjust resolution settings.

### Disable resolution rebuildingâ

The library aligns bars to the nearest expected bar position. For example, if [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) is `0915-1530` and the chart shows a 5-minute resolution, the library expects the following bar timestamps: `[09:15, 09:20, 09:25, ...]`. If your datafeed provides a bar with the `09:17` timestamp, the library changes this timestamp to `09:15`. You can use the [`disable_resolution_rebuild`](/charting-library-docs/latest/customization/Featuresets# disable_resolution_rebuild) featureset to display bars exactly as your datafeed provides.

info

If you enable the `disable_resolution_rebuild` featureset, the library cannot build resolutions that your datafeed does not explicitly provide. For example, the library cannot build a 5-minute resolution from 1-minute data.

### Enable custom resolutionsâ

You can use the [`custom_resolutions`](/charting-library-docs/latest/customization/Featuresets# custom_resolutions) featureset to allow users to add custom resolutions. Note that if a user adds a resolution that the symbol does not support, this resolution will be disabled in the UI.

![Add custom resolution](/charting-library-docs/assets/images/add-custom-resolution-d8557c90a073238a4d2c2c1dffd061dc.png)

### Disable resolution changingâ

You can use the [`header_resolutions`](/charting-library-docs/latest/customization/Featuresets# header_resolutions) featureset to remove the _Resolution_ button from the top toolbar.

![Remove resolution button](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcUAAAAwCAYAAABg6WGaAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV8/pFIrDnYQ6RCwOlkQFXGUKhbBQmkrtOpgcukXNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APE1cVJ0UVK/F9SaBHjwXE/3t173L0DvM0qUwz/BKCopp5OxIVcflUIvKIPfgQxgojIDC2ZWczCdXzdw8PXuxjPcj/35+iXCwYDPALxHNN0k3iDeGbT1DjvE4dZWZSJz4nHdbog8SPXJYffOJds9vLMsJ5NzxOHiYVSF0tdzMq6QjxNHJUVlfK9OYdlzluclWqdte/JXxgqqCsZrtOMIIElJJGCAAl1VFCFiRitKikG0rQfd/EP2/4UuSRyVcDIsYAaFIi2H/wPfndrFKcmnaRQHOh5sayPUSCwC7QalvV9bFmtE8D3DFypHX+tCcx+kt7oaNEjYGAbuLjuaNIecLkDDD1poi7ako+mt1gE3s/om/LA4C0QXHN6a+/j9AHIUlfLN8DBITBWoux1l3f3dvf275l2fz9tm3Kl0QPZQQAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+cLBAomAPFuIS4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAARJklEQVR42u2deVyVxf7H3yyKK5qslogsoqKogF4ts8hMKnHLJXMpU1wp68dNbtgr89a9Wi5UZqklZWqXFqlU3DcMdyWU1VRExPKwKIqgLHLm98dhO7G5gHLk+369eHGY+T6zPc+Zz3znmRmMki9kKARBEARBwFQphX0bS2kJQRAEoV5zLiUdY2kGQRAEQdAhoigIgiAIIoqCIAiCIKIoCIIgCCKKgiAIgiCiKAiCIAgiioIgCIIgoigIgiAIIoqCIAiCIKIoGAzJFzKkPoLce0FEURBqkwWLPiUn57o0hCAId4ypNIGQnZ3DiehYYuMSaN68GW6dXenQsT0NGzQwmDoopViwaAmvjH+Jpk2bPJD3aO9v+0k8m4SzkyNeT/ahSZMm8vAKgniKQk2QX1DAf+Ytwr3HE7i49uDfH3xEcvJ5IvYdxHfaTOwdu/Dk0z5s3rJDGus+c+r0Gbp79iXok89JTU1j8cdL6ebRl3PnzkvjCEJd8hSVUsTFJXDg0FH27T9IwwYNcXJqx5jRI7G3t5PWraNEHY/G7/VZWFtb8uXyT3Hv3hVTU5NynsmOXeH4z3qHXzds4qP5c3moZcs6WZ9jkVHk5uYBcPTY71haWtLrH54YGRmVq1PCyVP07OFuUPfr08+W06dPL779ellJ2Jjxk/l06Qo+XvRfeaAFoS54iplXrjBw8Ci8+g9i0eIlaDRpxMYl8NnSL/Hs5cXMN//F9evyfqeu8cXyYIYOH8vkSS/za+h39OzhXk4QAZo1a8qwIQM5vH8nTRo3pvdj/Yn8/Xidq09sbDyDh77EgkVL6NLZleVffcuLY15lT3hEOdsziWd51dfP4O5ZUlIy3gOe1gsbM3oEzZrK9Kkg1DjnUtLV7ZKYmKR6PtpPtXXsorZs3aEXd+PGDTXj9X8qCxtH9fSAIermzZu3nnDuAfVft+FqzdlqzPa9pzq9tFqdqyAu9eeJysLGseTH43kf9ca/V6vfUsvbLD6m6hWHj0QqO4cuKikp+bavXb0mRLn3eELl5OTcdTnu5JmrjKjj0cq1a2+9MK/+Pmrb9l0V2nbu9miNt2tN1qciKqvPnZOm1vk6KovFv99VKrrv0Tx1pDjg2DxlYTNRrfur/nynauveZ2ZmKq1Wa7DtkpNzXeXm5hpcuZPOp6k78hT9Zr7FX39p2Lb5Z5717q8X16hRIz5fsogZ0305fiKGVav/d8vpXt21hqC0KEL3n6nCKosdP60hbfePRCRVn2ZyZDxrv5jLsP6TCLtYfwc/eXl5TJn2Bh/Oe4927dre9vXjx43Gpb0T786dJyNJ4d5w8Ucm2DoRFFm/qp2Wls7RyONcy8422DpoNKkcOfo7eXl5D/706YnoWI4ei2LeB+/SsUP7Su3mvBNAV7fOLFz8GYWFhbeQchYR27cBELFqGzGVmV0OZ+f3APEEb4mvNLXZmxLJ0CTyZ/w2Vs10hrRwgnedqbf9y7vvzcPFxZkxo0dUavPSOF/WrP2+0vilSxayYcMWIvYdNKi6b9+xG0tbJ/p7D0WjScXS1glHl+5kZ+eI8NQknoFkaIIZ3lqa4k5JT8/gREwc7t3cMG/e3GDr4ejYjoceasnhI5EGJ4y3LYpfrlwFwJDBz1dpZ2pqwsDnvcnIuMSBg0eqTzhpPWu/hxkBvrjFfs7G/RU3ZPL21axlPLMD7IhZ/iMR1bS3WStnfLy9dGKbdq1eftHyCwpYtfp/vDlz2l2lY2lpwcgRQ1i24mvDcjgupuI94GkyNLqBUvrFM2RlXauz77yLhbv4JyYmnjHjJ5f87T/rnRrOMYog20mERuo8s+J8ynloF/XjAzaX8W5+mVQUPp+jVVxjOflH0orjIufr1dMyKEr/OvdAwoB5A3XxE35JryC/CsoaOR9L20mEXowiqGz838tSNr86IohRJ2Jw7+aGpaWFwfc7XTp3MkhhvO3Vp2fOJGFra0OLFubV2nbq6ALAueTz9H380SptY7YEs5Px+PkNwXbzSuZsDMevjzct9Kzi2bQyCma8ht8AKzYuCCJsrz99B1RRlpwUdm7SeaA+Dm3qpSiePp0IgId7t7t3Bjy6s237bhnS1yKtLFqx/ufS1w7/99ZsxoweQc8eHgDY2ljXQq7hTB3ozBZNIquKRMd14Hz6agLpWVakAtaR4e8OpBM6uTdhOANgPSyYeCbhOp1ywsayQ2QMswLgaJATayNH4e+ZTuhy2KJJLJP+CCY4HGLVMCtoPYpVUTDBPZCumxLx99QXYNfpsCIqUeeVRs7HcqAT/M1u45yt+GkS0Z05k07o5LLlr1tkZmYSdTwaU1NTziYlczYpuZxN48aNaNHCHGsrSxo1alQnyn3l6lUuX8rkalYWBQU3y8Urpbhx4waHj0TS57FemJiYPHiiaG9vR0xsPFqtFmPjqh3NS5cvA6At1FY7Ut2xPAUmPEpXM1davmAH768nIsAbn1ZlR4DrWRoLkwI8MOtizcguQczZHM7sAYP/Jp660aXe2y9PX/wGWNXLTvbkyVN06uhSI18kT4/uJJ9PIT8/n4YNG4qC1QINGzSgz2O9Sv5u2rQJrp066IXVBj7LfHUCBVj39saHQCIiA+npCUdDAgkbNJ/4EkGxou/zXrCxUr+H0DlF1wwr/d719C8SQawY/lVgqXnrpxg0CKYmXQCsquwr1k4Px2fZodJpWs9AtgSs5LnlPzLuq1FYF4l812nBJfWp65ibm9OyZUtycnJwdLCvUDzy8/O5fl0nMPZt7bC3tyu37eiezT7l55Nw8hS5uXm0bm2DXZtHKizz1axrXLlypdL4B0MU29qRn5/PH6fOlHiClXH8hO7NYM+eHlXa5e1fz8o0mNTvUVoAbk+MxI0g1m5PwWd08X7HPCK2rSGNwTzTyxxwpe8LdvD+aja+MZhxDpUk7uDMuJF+zJg0GJem9bOTTTh5Cg+P7nph2dk5fLF8pV5Y4tkktm7fzUVNakmYrY0NL48fXfJ3u3ZtMTdvTnzCH3Tv5iYKVi9I53wC0Kk9t+6jXiB5I/gse6qKa3Te5tSywtqpmmQvniYa6NpWXzjtHbxgQSLJUJSfF/YPl7WwYvg0X6YOHIHlAl+2FHvAdQQTExM8PbpxLPI4Z5OS8fToVqmIPPywLVFR0eTm5VW5rqO20Gq1HD4SiaWlBV3dOlcqzNnZOSQmJuHS3hkHB3uDedpv+53iyBFDMDU14Z13P0ApValdbGw8ISHr6NTRBddOHapIsWg1KRD8srturr9/EDHAzpUbShfcXN5G6JI8YAOjO+jeCTz1fgoQVeGCm+KFNhkHt/GJ/2BcWtTfLs3U1AQTk5o7vKhx48b3bYQq3A+KBK5GXz9EEWTbm6nMJ16TSIbmECsG1XI1PAPJ0CQSv+wMz/3tHWVdEcYent1BKaKOx6DVVjzDZmZmhrt7V/788yJXs7LueTlPn0mkSZPGdOroUmk/cP36DY4cjcTJsZ1BCeIdiaJLe2f8pk/mt4gDTPPz58rVq+Vs9u0/xLhXppJfUMC8/8ypZuS3lXWVLXiM/YmIWN3HtL3rWVuJWczPeypfrSrQpbMrsbEJemHNmjUl4K039H6cHB14dkA/vbCyXiJARsYl0tMzcO3UURq23uBO3wAI27yndJFMtbTBfhCEJV2oODpyK/PwYsX7xdOdOuGtltbt6QpEn0/X8zgjNofDICdupfu1HhZMxiZfwqa/TWgd26ZlYmKCp2d3jIyocnW0mZkZTk4OJCen3NPyKaU4n/InnV2r/v5rNKk4tLO/o+1fBieKALP++TptHnmY0J838I/e/Zj19hw2hG3hi+XBjHrpVYYOH8uFP/8C4MDBw1Wmlbz3R8KA/p+El6wOzNAk8mfoeKxJYemGg+SRwvafwgF3PjmYWMYunl9mmkEVq1WronhVm2VVK+4eANy6uBIXf7JG0joRHUenji40aGA4Z8kbGxuRmZnJ/gOH2X/g8K2thq5DGFE6Gg/5IZQT0bF6ndRHCz/h2rXa3dPW86X5+GwMJKCMd5WcFF7FFbrpShaM0PPIjgZNKiNE4ST/VRy+FAK8IOF0qfAWCeC8vVF6Aj1umRdh01eWrnKNXMnUjTB72qhbnt5NO193t2fpplK7Y25e9ZaMFubNycq6tyvqc3KuY2xsXO36BEcD9BDvShQbNWrE3t2beH/ubFq1asU3q75jou9rzJk7j917fuNZ7/7s3b2JZ737s3DxZ8x6u3JvcdPKKMAdn176Z6Wa9RmCrzWkLVnDjv0bCN4N9BtCX713h2b09R6PNXkE/bSNqzKkr5Dic2jPJJ6967SiY2Jx6+JqUPVv29YOU9MGzP3gQyb6vsZHCz/lsUd7Vdvp1ClhLJqm0mq1vDByPNExcSilmDL9TTaGbaVQW1i7BWg9ilWadXSd3rtkAPl5glfV13gGkhE1H8pc81yCM22L4uKXeZUMTCOeDMbf/zVmbwxkbWSpAPpv0glr2e0e1sOCS6ZALW2dsBy4ktl/W3lannRCJ5cOfl2nhzN7k2HvqWzSpPE931Z048YNmtSRla+1Rk0cU3Tyj9Pq29Uh6pf1YSo9PaMkvKDgphr3yhRlYeOo3vQPNOhjiwydjxZ+qqZMf7NKm9FjJ6nVa0Iqjb+cmam6eTyuoqPj5Ji3e3jMW79nBuvVZ/WaEOXk4q5eHDNRPfm0j8q8ckUe8AfsmLdbOhUzN1dt3bbznuaZmpqmDhw4/MDez6TzaapG5sA6uDjTwcW5XLipqQnBXy1lwsQZrPnuB0wbmLLww/fFdbsPvOX/Gv29h7L8y2+YNuXVCm1C1q6s9PrCwkJenjCdVyeMxc3NVRq0Fjh8JJIx4335I+5YySHtBQU3OZt0DguL0r1J48a+yA8//crOXeH8GvodLVu0kMarh5iZmZU7KL62sba2wtr6wd7aVuv/T7Fhgwas+voLBj4/gOHDBsmTfL9utLEx3wR/zocLPmZD2Jbbuja/oAD/t95BKS0zX5ta5zqG1NS0cifANDLAKZ4OHZzJzc0j5Id1ZGVd49LlTEK+X0dBwU1c2usGnUop/GbOIjsnh7lz3mbCxBnExSXIAy4IdWn6VDAcIvYdVK5de6tpfv7qypWr1dqfiI5VfZ7wVkOHj1WpqWl1dspJq9UqCxtHpdGkGvQUWsgPocrJxb3kv7y07+ih1oWuL4n/V+BcvSnTb1eHKOcOHir5fIo83PVs+lSonelTo3Mp6cq+jaWMDuoR2dk5vD17Lrv2/Mbyz4N48ok+5Wxu3ixk8cefseKrVcx+2x/fiS/XWP7JFzKo6WdOKYVVa2fiThzEplaOQbt39SksLOTkH6cxNTXF2clBbxN3bGw8bewe0Zsy3bf/EH0e6yV7R+8DtfEsC/fVScRUmqH+0axZU5YuWcj2HbuZMu0NbuTmYWVpgY2NFddv5JKRcYlLly7h6eHOnp0bsW9rJ412DzExMal0H1iXClb+Pt6ntzSaINQQIor1mAHP9CM+5jDnzp0n6VwyCSdPYd68OS4uTji0s8fW1sZg6mJkZETAWzNp1qyZ3FhBEO68L5HpU0EQBEHQTZ8aSzMIgiAIgg4RRUEQBEEQURQEQRAEEUVBEARBEFEUBEEQBBFFQRAEQRBRFARBEAQRRUEQBEEQURQEQRCEO0WOeRMEod6glCr6ZASoMjFGevHGxkZ3kQcUn81eWKjF2NgIrVbppVlqY8StnOOulLonB77rqq/KlLd8+WqiLMX5lG37ivLRhRvdUlvf6b0xMjIqqZNZQ1MRRUEQ6g/6HaxRNfF3mkfpZxMT46LfRpXa3H65a7N9dO3y9/LWThsZ3XWdb78dy9+b4rxuFmrJy7+pE8W/NJkU3CwsM4oSBEEQhPrH/wPhGzLzBW6GYAAAAABJRU5ErkJggg==)

To disable resolution changing in the [_Legend_](/charting-library-docs/latest/ui_elements/Legend), use the [`legend_inplace_edit`](/charting-library-docs/latest/customization/Featuresets# legend_inplace_edit) featureset. If you want to completely remove the _Resolution_ button from the _Legend_ , use the [`hide_resolution_in_legend`](/charting-library-docs/latest/customization/Featuresets# hide_resolution_in_legend) featureset.

![Remove resolution from Legend](/charting-library-docs/assets/images/no-resolution-legend-d2ff263da43b9adaccb9f03d4c14f1a3.png)

To disable the _Resolution_ shortcut, use the [`show_interval_dialog_on_key_press`](/charting-library-docs/latest/customization/Featuresets# show_interval_dialog_on_key_press) featureset.


---

## Required methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/datafeed-api/required-methods*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/)
  * Required methods

On this page

# Required methods

This article describes the required methods in the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/). The library calls these methods to initialize the chart, resolve requested symbols, and load data for them. At the end of the article, you can find diagrams illustrating the sequence in which methods are called.

tip

Refer to the [How to connect data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial that explains how to implement the methods step-by-step .

## onReadyâ

The library calls the [`onReady`](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalDatafeed# onready) method when the chart is initialized. This method supplies the library with the datafeed configuration data such as supported symbol types, exchanges, time intervals (resolution), currency codes and more. Call the [`OnReadyCallback`](/charting-library-docs/latest/api/modules/Datafeed# onreadycallback) and pass a [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) object as a parameter:
    
    
    onReady: (callback) => {  
        console.log('[onReady]: Method call');  
        setTimeout(() => callback(configurationData));  
    }  
    

The following code sample shows the [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) implementation:
    
    
    const configurationData = {  
        supports_search: true,  
        supports_group_request: false,  
        supports_marks: true,  
        supports_timescale_marks: true,  
        supports_time: true,  
        exchanges: [  
            { value: "", name: "All Exchanges", desc: "" },  
            { value: "NasdaqNM", name: "NasdaqNM", desc: "NasdaqNM" },  
            { value: "NYSE", name: "NYSE", desc: "NYSE" }  
        ],  
        symbols_types: [  
            { name: "All types", value: "" },  
            { name: "Stock", value: "stock" },  
            { name: "Index", value: "index" }  
        ],  
        supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"]  
    }  
    

## searchSymbolsâ

The library calls the [`searchSymbols`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# searchsymbols) method to request symbols that match some user input. Pass the resulting array of symbols as a parameter to [`SearchSymbolsCallback`](/charting-library-docs/latest/api/modules/Datafeed# searchsymbolscallback).
    
    
    searchSymbols: async (  
        userInput,  
        exchange,  
        symbolType,  
        onResultReadyCallback,  
    ) => {  
        console.log('[searchSymbols]: Method call');  
        const symbols = await getMatchingSymbolsFromBackend(userInput, exchange, symbolType);  
        onResultReadyCallback(newSymbols);  
    }  
    

As a result, the library gets an array of [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem) objects that have the following format:
    
    
    [  
        {  
            "symbol": "<short symbol name>",  
            "description": "<symbol description>",  
            "exchange": "<symbol exchange name>",  
            "ticker": "<symbol ticker name>",  
            "type": "stock" // "futures"/"crypto"/"forex"/"index"  
        },  
        {  
            //...  
        }  
    ]  
    

If no symbol is found, pass an empty array to [`SearchSymbolsCallback`](/charting-library-docs/latest/api/modules/Datafeed# searchsymbolscallback).

You can adjust the frequency of search requests utilizing the [`symbol_search_request_delay`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol_search_request_delay) property.

## resolveSymbolâ

The library calls the [`resolveSymbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# resolvesymbol) method to get [symbol information](/charting-library-docs/latest/connecting_data/Symbology) such as the exchange, time zone, trading hours, etc. Specify this information in a [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object as demonstrated below:
    
    
    const symbolInfo = {  
        ticker: 'BTCUSD',  
        name: 'BTCUSD',  
        description: 'Bitcoin/USD',  
        type: symbolItem.type,  
        session: '24x7',  
        timezone: 'Etc/UTC',  
        exchange: 'Example Exchange',  
        minmov: 1,  
        pricescale: 100,  
        has_intraday: false,  
        visible_plots_set: 'ohlcv',  
        has_weekly_and_monthly: false,  
        supported_resolutions: ['1', '5', '30', '60', '1D', '1W'],  
        volume_precision: 2,  
        data_status: 'streaming',  
    };  
    

Pass symbol information as a parameter to [`ResolveCallback`](/charting-library-docs/latest/api/modules/Datafeed# resolvecallback). If the symbol cannot be resolved, call [`ErrorCallback`](/charting-library-docs/latest/api/modules/Datafeed# datafeederrorcallback) and specify an error message.
    
    
    resolveSymbol: async (  
        symbolName,  
        onSymbolResolvedCallback,  
        onResolveErrorCallback,  
        extension  
    ) => {  
        try {  
            const symbolInfo = await getSymbolInfoFromBackend(symbolName, extension);  
            onSymbolResolvedCallback(symbolInfo);  
        } catch (err) {  
            onResolveErrorCallback(err.message);  
        }  
    }  
    

### Multiple symbol resolvingâ

In the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object, you can provide both [name](/charting-library-docs/latest/connecting_data/Symbology# name) and [ticker](/charting-library-docs/latest/connecting_data/Symbology# ticker) as the symbol name. The library behaves differently based on whether these values are the same or different:

  * If the name and ticker are the same, the library makes a single `resolveSymbol` call.
  * If the name and ticker differ, the library resolves the symbol twice: once for the entered name (e.g., `KO`) and again for the resolved ticker (e.g., `NYSE:KO`).

Multiple resolving happens because a single symbol name can correspond to multiple tickers. For example, AAPL might return results for NASDAQ and LSE. By resolving the ticker separately, the library ensures accurate and complete information, as the ticker is expected to be unique and is prioritized for data display.

### Display invalid symbol iconâ

You can display the default TradingView icon when error occurs. To do this, specify the `"unknown_symbol"` error message:
    
    
    onResolveErrorCallback("unknown_symbol");  
    

In this case, the chart shows the following icon and message.

![Ghost icon](/charting-library-docs/assets/images/ghost-icon-error-10c3bc63614496de3cf31bca60a8fbc4.png)

tip

If the icon is not displayed, make sure that the [`hide_image_invalid_symbol`](/charting-library-docs/latest/customization/Featuresets# hide_image_invalid_symbol) featureset is not enabled.

## getBarsâ

The library calls [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars) to get historical data in a certain range. To transfer the requested data, pass an array of [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar) objects to [`HistoryCallback`](/charting-library-docs/latest/api/modules/Datafeed# historycallback).

info

The library caches historical data. Therefore, you do not need to implement a client-side cache.

### Bar orderâ

The array of [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar) items should be arranged in **ascending chronological order** , meaning that the timestamps of the bars should be getting bigger for each bar in the array. For example, `[1484179200, 1484265600, 1484611200, ...]`.

Note that for **daily, weekly, and monthly** bars, the [`time`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar# time) value should represent the **beginning of the trading day** at 00:00:00 UTC, not the beginning of the session.

### Correct amount of dataâ

The library calculates the amount of data that is necessary to fill the chart space and requests it in [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars). You cannot change this amount. Return data to [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars) based on the following [`PeriodParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams) properties:

  * [`from`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# from) â Unix timestamp of the leftmost requested bar. The library requires data in the `[from, to)` time range.
  * [`to`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# to) â Unix timestamp of the rightmost requested bar **(not inclusive)**.
  * [`countBack`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# countback) â the required amount of bars to load.

It is more important to pass the required number of bars than to match the `[from, to)` time range for the following reasons:

  * The library might miscalculate the `from` value. It may happen if you provide incorrect [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) or [`session_holidays`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session_holidays) values. In this case, the `[from, to)` range does not represent the required number of bars.
  * The library calculates the correct `from` value, but your backend does not contain enough bars in the `[from, to)` range. It might happen if the market was opened, but the symbol was not traded.

In both cases, the library calls [`getBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getbars) multiple times in order to get the missing data. It might cause potential issues. To avoid them, consider the following recommendations:

  * Your response should always include **all the existing data** for the requested range.
  * If the number of bars in the requested range is less than the `countBack` value, you should include earlier bars until the `countBack` count is reached. For example, the chart requests 300 bars in the range `[2019-06-01T00:00:00..2020-01-01T00:00:00)`, and your backend have only 250 bars in the requested period. Return these 250 bars and 50 bars prior to `2019-06-01T00:00:00`.
  * In the unlikely case that the number of bars in the requested range is larger than the `countBack` value, then you should return all the bars in that range instead of truncating it to the `countBack` length.
  * If there is no data left (in other words the current response to return an empty array, **and** there is no older data on the server), set [`noData`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata# nodata) to `true` to prevent further requests.

The library can request more bars than are visible because some indicators require additional history, for example, Moving Average with the length `10`.

info

Previously, it was necessary to specify [`noData`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata# nodata) and [`nextTime`](/charting-library-docs/latest/api/interfaces/Charting_Library.HistoryMetadata# nexttime) to load data outside the requested range. For now, you can send this data in response to the current request. However, you can still use these properties if your datafeed supports only the `from`/`to` properties and requires another request from the library.

The following piece of code is just a snippet to begin with. You will have to change it to fit your requirements but copying & pasting the code below should render candles on the chart for a given symbol and nothing for all other symbols. It is also to illustrate the `noData: true` result.
    
    
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) {  
        setTimeout(  
            () => {  
                // Return some simple symbol information for the TEST symbol  
                if (symbolName === 'TEST') {  
                    onSymbolResolvedCallback({  
                        "name": "TEST",  
                        "timezone": "America/New_York",  
                        "minmov": 1,  
                        "minmov2": 0,  
                        "pointvalue": 1,  
                        "session": "24x7",  
                        "has_intraday": false,  
                        "visible_plots_set": "c",  
                        "description": "Test Symbol",  
                        "type": "stock",  
                        "supported_resolutions": [  
                            "D"  
                        ],  
                        "pricescale": 100,  
                        "ticker": "TEST",  
                        "exchange": "Test Exchange",  
                        "has_daily": true,  
                        "format": "price"  
                    });  
                } else {  
                    // Ignore all other symbols  
                    onResolveErrorCallback('unknown_symbol');  
                }  
            },  
            50  
        );  
    }  
      
    getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {  
        setTimeout(  
            () => {  
                // For this piece of code only we will only return bars for the TEST symbol  
                if (symbolInfo.ticker === 'TEST' && resolution === '1D') {  
                    // We are constructing an array for `countBack` bars.  
                    const bars = new Array(periodParams.countBack);  
      
                    // For constructing the bars we are starting from the `to` time minus 1 day, and working backwards until we have `countBack` bars.  
                    let time = new Date(periodParams.to * 1000);  
                    time.setUTCHours(0);  
                    time.setUTCMinutes(0);  
                    time.setUTCMilliseconds(0);  
                    time.setUTCDate(time.getUTCDate() - 1);  
      
                    // Fake price.  
                    let price = 100;  
      
                    for (let i = periodParams.countBack - 1; i > -1; i--) {  
                        bars[i] = {  
                            open: price,  
                            high: price,  
                            low: price,  
                            close: price,  
                            time: time.getTime(),  
                        }  
      
                        // Working out a random value for changing the fake price.  
                        const volatility = 0.1;  
                        const x = Math.random() - 0.5;  
                        const changePercent = 2 * volatility * x;  
                        const changeAmount = price * changePercent;  
                        price = price + changeAmount;  
      
                        // Note that this simple "-1 day" logic only works because the TEST symbol has a 24x7 session.  
                        // For a more complex session we would need to, for example, skip weekends.  
                        time.setUTCDate(time.getUTCDate() - 1);  
                    }  
      
                    // Once all the bars (usually countBack is around 300 bars) the array of candles is returned to the library.  
                    onHistoryCallback(bars);  
                } else {  
                    // If no result, return an empty array and specify it to the library by changing the value of `noData` to true.  
                    onHistoryCallback([], {  
                        noData: true  
                    });  
                }  
            },  
            50  
        );  
    }  
    }  
    

## subscribeBarsâ

The library calls [`subscribeBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribebars) to receive real-time updates for a symbol. Call [`SubscribeBarsCallback`](/charting-library-docs/latest/api/modules/Datafeed# subscribebarscallback) every time you want to update the most recent bar or add a new one. For example, if the chart has loaded data up to 14:00, you can only update the last bar (14:00) or add a newer bar (15:00).

danger

You cannot update a historical bar using this method. Otherwise, you get the _putToCacheNewBar: time violation_ [issue](/charting-library-docs/latest/connecting_data/Datafeed-Issues# time-violation). If you need to change historical data, you should call `onResetCacheNeededCallback` and then `chart.resetData()` to redraw the chart.

If you return a bar that has the same [`time`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar# time) value as the most recent bar, the library replaces the most recent bar with the new one.

Consider the following example. The most recent bar (in pseudo-code) is `{time: 1419411578413, open: 10, high: 12, low: 9, close: 11}`. You call `onRealtimeCallback({time: 1419411578413, open: 10, high: 14, low: 9, close: 14})`. As the bar with the time `1419411578413` already exists, and it is the most recent one, the library **replaces the entire bar** making the most recent bar `{time: 1419411578413, open: 10, high: 14, low: 9, close: 14}`.

Refer to the [tutorial][tutorial-subscribe-unsubscribe] to see the example of [`subscribeBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribebars) implementation.

### Multiple subscriptionsâ

The library provides a unique subscriber ID as a parameter when it calls `subscribeBars` and `unsubscribeBars`. This subscriber ID allows you to track and manage subscriptions for symbol updates.

The library can have multiple subscriptions at the same time, for example, when a user switches to another symbol or resolution. You should handle `subscribeBars` and `unsubscribeBars` calls for different resolutions and symbols as independent events. Note that the library can call these methods in any order and with a delay.

When you receive an update from the server, you should send the data via the specific callback for the subscriber which has the correct symbol name and [resolution](/charting-library-docs/latest/core_concepts/Resolution).

danger

If you send a subscriber data that does not match the subscriber's symbol and resolution, the _putToCacheNewBar: time violation_ [issue](/charting-library-docs/latest/connecting_data/Datafeed-Issues# time-violation) can occur.

Note that you should provide updates to all the subscriptions until the library unsubscribes from them. Therefore, you may require multiple connections to your backend server if you have multiple subscriptions.

Consider the following example. The current symbol is `AAPL`, and the resolution is `1D`Â (one day). You switch the resolution to `5`Â (five minutes). The library separately calls `subscribeBars` to subscribe for five-minute updates and `unsubscribeBars` to unsubscribe from one-day updates (after a short delay). During this period, the library has at least two active subscribers: for five-minute and one-day updates. You should send five-minute updates to the five-minute subscriber and continue to send one-day updates to the one-day subscriber until the library unsubscribes from the `1D` resolution.

Assume that the last bar (in pseudo-code) is:

  * `{time: 1684368000000, open: 10, high: 12, low: 9, close: 11}` on the one-day chart
  * `{time: 1684422300000, open: 10.5, high: 11.5, low: 10, close: 11}` on the five-minute chart

If the price jumps to `13`, you should send the following bars to the subscribers:

  * `{time: 1684368000000, open: 10, high: 13, low: 9, close: 13}` to the one-day subscriber
  * `{time: 1684422300000, open: 10.5, high: 13, low: 10, close: 13}` to the five-minute subscriber

## unsubscribeBarsâ

The library calls [`unsubscribeBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# unsubscribebars) to stop receiving updates for the symbol when the user selects another symbol on the chart. The `listenerGuid` argument contains the same object that was passed to [`subscribeBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribebars) before.

Refer to the [tutorial](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Streaming-Implementation# step-1-connect-to-streaming) to see the example of [`unsubscribeBars`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# unsubscribebars) implementation.

## Sequence diagramsâ

In this section, you can find diagrams illustrating the sequence of Datafeed API method calls. Expand the sections below to view the diagrams for the following cases:

A user opens a chart for the first time.

[![Diagram illustrating the sequence of calls when a user opens chart for the first time](/charting-library-docs/img/datafeed-open-chart-first-time-diagram-light.svg)![Diagram illustrating the sequence of calls when a user opens chart for the first time](/charting-library-docs/img/datafeed-open-chart-first-time-diagram-dark.svg)](/img/datafeed-open-chart-first-time-diagram-light.svg)

A user switches to a new symbol or adds a new one to the chart.

[![Diagram illustrating the sequence of calls when a user switches to a new symbol](/charting-library-docs/img/datafeed-switch-to-new-symbol-diagram-light.svg)![Diagram illustrating the sequence of calls when a user switches to a new symbol](/charting-library-docs/img/datafeed-switch-to-new-symbol-diagram-dark.svg)](/img/datafeed-switch-to-new-symbol-diagram-light.svg)


---

## Trading Platform methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/)
  * Trading Platform methods

On this page

# Trading Platform methods

[Trading Platform](/charting-library-docs/latest/trading_terminal/) is a standalone client-side solution that provides trading capabilities. To use Trading Platform, in addition to the [required](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods) Datafeed API methods, you should implement the quote-related methods, including `getQuotes`, `subscribeQuotes`, and `unsubscribeQuotes`. The library calls these methods to request [quotes](/charting-library-docs/latest/trading_terminal/trading-concepts/quotes), which are data sets that show the most recent bid and ask prices, opening and closing prices, price changes, and other market data. Quotes are used in most Trading Platform features including the following:

  * [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket)
  * [Legend](/charting-library-docs/latest/ui_elements/Legend)
  * [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List)
  * [Details](/charting-library-docs/latest/trading_terminal/# details)
  * [News](/charting-library-docs/latest/trading_terminal/news)
  * [Depth of Market (DOM)](/charting-library-docs/latest/trading_terminal/# depth-of-market)

For [DOM](/charting-library-docs/latest/trading_terminal/# depth-of-market), you should also implement the `subscribeDepth` and `unsubscribeDepth` methods.

tip

For Trading Platform, along with implementing the Datafeed API methods, you also need to implement the Broker API. Refer to [Core trading concepts](/charting-library-docs/latest/trading_terminal/trading-concepts/) for more information.

## getQuotesâ

Trading Platform calls [`getQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# getquotes) to request quote data that is used to display the [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List), [Details](/charting-library-docs/latest/trading_terminal/# details), [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket), [DOM](/charting-library-docs/latest/trading_terminal/# depth-of-market) widgets, and the [Legend](/charting-library-docs/latest/ui_elements/Legend). To transfer the requested data, pass an array of [QuoteData](/charting-library-docs/latest/api/modules/Datafeed# quotedata) objects as a parameter to [QuotesCallback](/charting-library-docs/latest/api/modules/Datafeed# quotescallback). The library expects to receive necessary data in a single callback.

caution

Note that if you integrate the library with [mobile applications](/charting-library-docs/latest/mobile_specifics/), `getQuotes` is required to avoid [NaN values](/charting-library-docs/latest/ui_elements/Legend# nan-values-in-legend) appearing in the legend.

The example of [QuoteData](/charting-library-docs/latest/api/modules/Datafeed# quotedata) is demonstrated below:
    
    
    {  
        {  
            "s": "ok",  
            "n": "NasdaqNM:AAPL",  
            "v": {  
                "ch": 0,  
                "chp": 0,  
                "short_name": "AAPL",  
                "exchange": "",  
                "original_name": "NasdaqNM:AAPL",  
                "description": "NasdaqNM:AAPL",  
                "lp": 173.68,  
                "ask": 173.68,  
                "bid": 173.68,  
                "open_price": 173.68,  
                "high_price": 173.68,  
                "low_price": 173.68,  
                "prev_close_price": 172.77,  
                "volume": 173.68  
            }  
        }  
    }  
    

Note that **Percentage change** value, **Ask/Bid buttons** and **lines** also require quote data. They are **not displayed** on the chart if [`getQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# getquotes) is not implemented.

![Datafeed API buttons](/charting-library-docs/assets/images/datafeed_api_buttons-be5493fec764700c98c1651ad24eae53.png)

The following piece of code is just a snippet to begin with. You will have to change it to fit your requirements but copying & pasting the code below should enable displaying values in the Legend when on mobile along with values for `ask` and `bid` buttons (if activated within the Chart settings) when using Trading Platform. [`subscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# subscribequotes) will however update the values on regular basis.
    
    
    // In this example we are returning random values (which probably don't make any sense from a trading purpose)  
    // but it is just to illustrate how to structure the function and returned object.  
    getQuotes(symbols, onDataCallback, onErrorCallback) {  
        const data = [];  
      
        symbols.forEach((symbol)=>{  
            data.push({  
                n: symbol,  
                s: 'ok',  
                v: {  
                    ch: Math.random() * (5 - 1) + 1,  
                    chp: Math.random() * (5 - 1) + 1,  
                    lp: Math.random() * (10 - 1) + 1,  
                    ask: Math.random() * (10 - 1) + 1,  
                    bid: Math.random() * (10 - 1) + 1,  
                    spread: 0.20,  
                    open_price: Math.random() * (5 - 1) + 1,  
                    high_price: Math.random() * (5 - 1) + 1,  
                    low_price: Math.random() * (5 - 1) + 1,  
                    prev_close_price: Math.random() * (5 - 1) + 1,  
                    original_name: symbol,  
                    volume: Math.random() * (5 - 1) + 1,  
                },  
            });  
        });  
      
        // To ensure the callback is only evoked when the library is ready - see Asynchronous callbacks  
        setTimeout(() => onDataCallback(data), 0);  
    }  
    

## subscribeQuotesâ

The library calls [`subscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# subscribequotes) to receive real-time quote updates for certain symbols. Call [QuotesCallback](/charting-library-docs/latest/api/modules/Datafeed# quotescallback) every time you want to update the quotes and pass an array of [QuoteData](/charting-library-docs/latest/api/modules/Datafeed# quotedata) objects as a parameter.

The following piece of code is just a snippet to begin with. You will have to change it to fit your requirements but copying & pasting the code below should render different values in the Legend when on mobile along with values for `ask` and `bid` buttons (if activated within the Chart settings). [`unsubscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# unsubscribequotes) will however update the values on regular basis.
    
    
    subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGUID) {  
        // In this example, `_quotesSubscriptions` is a global variable used to clear the subscription in `unsubscribeQuotes`  
        this._quotesSubscriptions[listenerGUID] = setInterval(() => this.getQuotes(symbols.concat(fastSymbols), onRealtimeCallback, () => undefined), 5000);  
    }  
    

## unsubscribeQuotesâ

The library calls [`unsubscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# unsubscribequotes) to stop receiving updates for the symbol when the user removes it from the [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List) or selects another symbol on the chart. The `listenerGuid` argument contains the same object that was passed to [`subscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# subscribequotes) before.

The following piece of code is just a snippet to begin with. You will have to change it to fit your requirements but copying & pasting the code below should stop updating the values created by [`subscribeQuotes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedQuotesApi# subscribequotes).
    
    
    unsubscribeQuotes(listenerGUID) {  
        clearInterval(this._quotesSubscriptions[listenerGUID]);  
    }  
    

## subscribeDepthâ

The library calls [`subscribeDepth`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribedepth) to receive real-time [Level 2](https://www.investopedia.com/terms/l/level2.asp) (DOM) data for a symbol. Call [DOMCallback](/charting-library-docs/latest/api/modules/Datafeed# domcallback) every time you want to update the quotes and pass a [DOMData](/charting-library-docs/latest/api/interfaces/Charting_Library.DOMData) object as a parameter.

Note that you should specify the [broker_config](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# broker_config) property in the [Widget Constructor](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions) and set [supportLevel2Data](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerConfigFlags# supportlevel2data) to `true`. Otherwise, the library does not call the [`subscribeDepth`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribedepth)/[`unsubscribeDepth`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# unsubscribedepth) methods.

This method should return a unique identifier (`subscriberUID`) that is used to unsubscribe from updates.

## unsubscribeDepthâ

The library calls [`unsubscribeDepth`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# unsubscribedepth) to stop receiving DOM data updates. The `subscriberUID` argument contains the same object that was returned by [`subscribeDepth`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# subscribedepth).


---

## Additional methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/datafeed-api/additional-methods*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/)
  * Additional methods

On this page

# Additional methods

This article describes the additional methods in the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/). With methods, you can enable additional features such as marks and a countdown to the bar close.

## getMarksâ

The library calls [`getMarks`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getmarks) to request [marks](/charting-library-docs/latest/ui_elements/Marks# marks-on-the-chart) for the visible bar range. The library assumes that you call [`GetMarksCallback`](/charting-library-docs/latest/api/modules/Datafeed# getmarkscallback) once per `getMarks` call. Pass an array of [`Mark`](/charting-library-docs/latest/api/interfaces/Charting_Library.Mark) objects as a callback parameter.

Only ten marks can be attached to a bar. The time of each mark must match the time of a bar. For example, if the bar times are `2023-01-01`, `2023-01-08`, and `2023-01-15`, then a mark cannot have the time `2023-01-05`.

caution

This method is called only if your datafeed [supports marks](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supports_marks).

The code sample below demonstrates the example of `getMarks` implementation:
    
    
    getMarks = (symbolInfo, startDate, endDate, onDataCallback, resolution) => {  
        console.log('getMarks');  
      
        onDataCallback(  
            [  
                {  
                    id: 1,  
                    time: endDate,  
                    color: 'red',  
                    text: ['This is the mark pop-up text.'],  
                    label: 'M',  
                    labelFontColor: 'blue',  
                    minSize: 25  
                },  
                {  
                    id: 2,  
                    time: endDate + 5260000, // 2 months  
                    color: 'red',  
                    text: ['Second marker'],  
                    label: 'S',  
                    labelFontColor: 'green',  
                    minSize: 25  
                }  
            ]);  
    };  
    

## getTimescaleMarksâ

The library calls [`getTimescaleMarks`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# gettimescalemarks) to request [timescale marks](/charting-library-docs/latest/ui_elements/Marks# marks-on-the-time-scale) for the visible bar range. The library assumes that you call [`GetMarksCallback`](/charting-library-docs/latest/api/modules/Datafeed# getmarkscallback) once per `getTimescaleMarks` call. Pass an array of [`TimescaleMark`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark) objects as a callback parameter.

caution

These method is called only if your datafeed [supports marks](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supports_marks).

The code sample below demonstrates the example of `getTimescaleMarks` implementation:
    
    
    getTimescaleMarks = (  
        symbolInfo,  
        startDate,  
        endDate,  
        onDataCallback,  
        resolution  
    ) => {  
        // optional  
        console.log('getTimescaleMarks');  
      
        let marks = [];  
      
        if (symbolInfo.name === 'AAPL') {  
            marks = [  
                {  
                    id: 1,  
                    time: startDate,  
                    color: 'red',  
                    label: 'Aa',  
                    minSize: 30,  
                    tooltip: [  
                        'Lorem',  
                        'Ipsum',  
                        'Dolor',  
                        'Sit',  
                    ]  
                },  
                {  
                    id: 2,  
                    time: startDate + 5260000, // 2 months  
                    color: 'blue',  
                    label: 'B',  
                    minSize: 30,  
                    tooltip: [  
                        'Amet',  
                        'Consectetur',  
                        'Adipiscing',  
                        'Elit',  
                    ]  
                }  
            ];  
        } else {  
            marks = [  
                {  
                    id: 'String id',  
                    time: endDate,  
                    color: 'red',  
                    label: 'T',  
                    tooltip: ['Nulla']  
                }  
            ];  
        }  
      
        onDataCallback(marks);  
    };  
    

## getServerTimeâ

By default, the library gets the time from the user's machine. If the machine time is incorrect, the time used in the library is also incorrect. To synchronize the library time with a server's time, enable the [`supports_time`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supports_time) property and implement the [`getServerTime`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getservertime) method. In the implementation, send a request to a time server and return the accurate value to the library using the [`ServerTimeCallback`](/charting-library-docs/latest/api/modules/Datafeed# servertimecallback). The time value should be a Unix timestamp, for example, `1445324591`. Note that the callback should be called only once.

The library allows you to display the countdown to the bar closing on the price scale. If you use this feature, consider implementing `getServerTime` to make sure that the countdown is correct.

info

To display a countdown, set the [`mainSeriesProperties.showCountdown`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesshowcountdown) property to `true`. Note that the countdown can be displayed only for [intraday](/charting-library-docs/latest/core_concepts/Resolution# resolution-in-minutes-intraday) resolutions.

## getVolumeProfileResolutionForPeriodâ

The library calls [`getVolumeProfileResolutionForPeriod`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getvolumeprofileresolutionforperiod) to request the resolution that is used to calculate the _Volume Profile Visible Range_ indicator. Implement this method if you want to calculate the indicator more accurately. The implementation depends on how much data you can transfer to the library and the depth of data in your datafeed.

If this method is not specified, the library uses `currentResolution`.


---

## UDF | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * UDF

On this page

# UDF

## What is UDFâ

It's a predefined Datafeed API adapter that uses an HTTP-based UDF protocol designed to deliver data to the library in a simple and efficient way.

tip

This predefined adapter is an example implementation of the JS API. You are not required to implement your datafeed using UDF.

## How to startâ

You should create a server-side HTTP service that gets the data from your storage and responds to library requests.

## Response-as-a-table conceptâ

Think of data feed responses as tables. For example, a data feed response that includes a symbol list from the exchange may be treated as a table where each symbol represents a row, along with some columns (minimal_price_movement, description, has_intraday e.t.c.). Each column may be an array (it will provide a separate value for each row in a table). Note that there might be a situation when all rows have the same value in the same column. In this case, the column value can be defined as a single value in JSON response.

Example:

Let's assume that we requested a symbol list from the New York Stock Exchange. The response (in pseudo-format) might look like
    
    
    {  
       symbols: ["MSFT", "AAPL", "FB", "GOOG"],  
       min_price_move: 0.1,  
       description: ["Microsoft corp.", "Apple Inc", "Facebook", "Google"]  
    }  
    

Here is how this response will look like in a table format.

Symbol| min_price_move| Description  
---|---|---  
MSFT| 0.1| Microsoft corp.  
AAPL| 0.1| Apple Inc  
FB| 0.1| Facebook  
GOOG| 0.1| Google  
  
## API Callsâ

### Data feed configuration dataâ

Request: `GET /config`

Response: The library expects to receive a JSON response of the same structure as a result of Datafeed API [onReady() call](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalDatafeed# onready).

Also there should be 2 additional properties:

  * `supports_search`: Set it to `true` if your data feed supports symbol search and individual symbol resolve logic.
  * `supports_group_request`: Set it to `true` if your data feed provides full information on symbol group only and is not able to perform symbol search or individual symbol resolve.

Either `supports_search` or `supports_group_request` should be set to `true`.

**Note:** if your data feed doesn't implement this call (doesn't respond or sends 404 error) then the default configuration is being used. Here is the default configuration:
    
    
    {  
        supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],  
        supports_group_request: true,  
        supports_marks: false,  
        supports_search: false,  
        supports_timescale_marks: false,  
    }  
    

### Symbol group requestâ

Request: `GET /symbol_info?group=<group_name>`

  * `group_name`: string

Example: `GET /symbol_info?group=NYSE`

Response: Response is expected to be an object with properties listed below. Each property is treated as table column, as described above (see [response-as-a-table](/charting-library-docs/latest/connecting_data/UDF# response-as-a-table-concept)). The response structure is similar (but **not equal**) to [SymbolInfo](/charting-library-docs/latest/connecting_data/Symbology). Therefore, you should read the description of each field to learn about the details.

  * `symbol`
  * `description`
  * `exchange-listed` / `exchange-traded`
  * `minmovement`
  * `minmovement2`
  * `fractional`
  * `pricescale`
  * `has-intraday`
  * `visible-plots-set`
  * `type`
  * `ticker`
  * `timezone`
  * `session-regular` (mapped to `SymbolInfo.session`)
  * `session-holidays`
  * `corrections`
  * `supported-resolutions`
  * `force-session-rebuild`
  * `has-daily`
  * `intraday-multipliers`
  * `volume_precision`
  * `has-weekly-and-monthly`
  * `has-empty-bars`

Here is an example of data feed response to `GET /symbol_info?group=NYSE` request:
    
    
    {  
       symbol: ["AAPL", "MSFT", "SPX"],  
       description: ["Apple Inc", "Microsoft corp", "S&P 500 index"],  
       exchange-listed: "NYSE",  
       exchange-traded: "NYSE",  
       minmovement: 1,  
       minmovement2: 0,  
       pricescale: [1, 1, 100],  
       has-dwm: true,  
       has-intraday: true,  
       type: ["stock", "stock", "index"],  
       ticker: ["AAPL~0", "MSFT~0", "$SPX500"],  
       timezone: âAmerica/New_Yorkâ,  
       session-regular: â0900-1600â,  
    }  
    

**Notes:**

  1. This call will be used if your data feed sent `supports_group_request: true` in the configuration data or didn't respond to the configuration request at all.

  2. In the event that your data feed does not support the requested symbol group (which should not happen if your response to request # 1 (supported groups) is correct) you may expect a 404 error.

  3. When using this mode of receiving data (getting large amount of symbol data) your browser will keep the data that wasn't even requested by the user. If your symbol list has more than a few items, please consider supporting symbol search / individual symbol resolve instead.

### Symbol resolveâ

Request: `GET /symbols?symbol=<symbol>`

  * `symbol`: string. Symbol name or ticker.

Example: `GET /symbols?symbol=AAL`, `GET /symbols?symbol=NYSE:MSFT`

A JSON response of the same structure as [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo).

**Note:** this call will be requested if your data feed sent `supports_group_request: false` and `supports_search: true` in the configuration data.

### Symbol searchâ

Request: `GET /search?query=<query>&type=<type>&exchange=<exchange>&limit=<limit>`

  * `query`: string. Text typed by the user in the Symbol Search edit box
  * `type`: string. One of the symbol types [supported](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# symbols_types) by your back-end
  * `exchange`: string. One of the exchanges [supported](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# exchanges) by your back-end
  * `limit`: integer. The maximum number of symbols in a response

Example: `GET /search?query=AA&type=stock&exchange=NYSE&limit=15`

A response is expected to be an array of symbol objects as in [respective JS API call](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# searchsymbols)

**Note:** this call will be requested if your data feed sent `supports_group_request: false` and `supports_search: true` in the configuration data.

### Barsâ

Request: `GET /history?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>&countback=<countback>`

  * `symbol`: symbol name or ticker.
  * `from`: unix timestamp (UTC) of leftmost required bar
  * `to`: unix timestamp (UTC) of rightmost required bar (not inclusive)
  * `resolution`: string
  * `countback`: number of bars (higher priority than `from`) starting with `to`. If `countback` is set, `from` should be ignored.

Example: `GET /history?symbol=BEAM~0&resolution=D&from=1386493512&to=1395133512&countback=500`

A response is expected to be an object with some properties listed below. Each property is treated as a table column, as described above.

  * `s`: status code. Expected values: `ok` | `error` | `no_data`
  * `errmsg`: Error message. Should be present only when `s = 'error'`
  * `t`: Bar time. Unix timestamp (UTC)
  * `c`: Closing price
  * `o`: Opening price (optional)
  * `h`: High price (optional)
  * `l`: Low price (optional)
  * `v`: Volume (optional)
  * `nextTime`: Time of the next bar if there is no data (status code is `no_data`) in the requested period (optional)

**Notes:**

  1. Bar time for daily bars should be 00:00 UTC and is expected to be a trading day (not a day when the session starts). The library aligns the time according to the [Session](/charting-library-docs/latest/connecting_data/Symbology# session) from SymbolInfo.

  2.     1. Bar time for monthly bars should be 00:00 UTC and be the first trading day of the month.
  3. Prices should be passed as numbers and not as strings in quotation marks.

Example:
    
        {  
       s: "ok",  
       t: [1386493512, 1386493572, 1386493632, 1386493692],  
       c: [42.1, 43.4, 44.3, 42.8]  
    }  
    
    
        {  
       s: "no_data",  
       nextTime: 1386493512  
    }  
    
    
        {  
       s: "ok",  
       t: [1386493512, 1386493572, 1386493632, 1386493692],  
       c: [42.1, 43.4, 44.3, 42.8],  
       o: [41.0, 42.9, 43.7, 44.5],  
       h: [43.0, 44.1, 44.8, 44.5],  
       l: [40.4, 42.1, 42.8, 42.3],  
       v: [12000, 18500, 24000, 45000]  
    }  
    

  4. If it is possible, it would be better to handle `countback` parameter for performance reasons. Basically, if you handle `countback`, you don't have to worry about passing `nextTime`, because `countBack` helps to avoid empty responses for ranges with no data.

#### How `nextTime` worksâ

Consider the following example. The current symbol is AAPL and the chart resolution is one minute. The library requests data in the `[2015-04-03 16:00 UTC+0, 2015-04-03 19:00 UTC+0]` range. There was no trade on 2015â04â03 due to a public holiday. In this case, the library expects the following response from the datafeed:
    
    
    {  
      s: "no_data",  
      nextTime: 1428001140000 // 2 Apr 2015 18:59:00 GMT+0  
    }  
    

`nextTime` is the time of the closest available bar in the past.

### Marksâ

Request: `GET /marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>`

  * `symbol`: symbol name or ticker.
  * `from`: unix timestamp (UTC) of leftmost visible bar
  * `to`: unix timestamp (UTC) of rightmost visible bar
  * `resolution`: string

A response is expected to be an object with some properties listed below. This object is similar to [respective response](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# getmarks) in Datafeed API, but each property is treated as a table column, as described above.

If the `two_character_bar_marks_labels` feature is enabled then at most the first two characters of the `label` text will be displayed. Otherwise only the first character will be displayed.
    
    
    {  
        id: [array of ids],  
        time: [array of times],  
        color: [array of colors],  
        text: [array of texts],  
        label: [array of labels],  
        labelFontColor: [array of label font colors],  
        minSize: [array of minSizes],  
    }  
    

**Note:** this call will be requested if your data feed sent `supports_marks: true` in the configuration data.

### Timescale marksâ

Request: `GET /timescale_marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>`

  * `symbol`: symbol name or ticker.
  * `from`: unix timestamp (UTC) or leftmost visible bar
  * `to`: unix timestamp (UTC) or rightmost visible bar
  * `resolution`: string

A response is expected to be an array of objects with properties listed below.

  * `id`: unique identifier of a mark
  * `color`: rgba color
  * `label`: a letter to be displayed in a circle
  * `time`: unix time
  * `tooltip`: tooltip text
  * `shape`: optional mark shape. For possible values see the `TimeScaleMarkShape` type in the TypeScript type definitions.

**Note:** this call will be requested if your data feed sent `supports_timescale_marks: true` in the configuration data.

### Server timeâ

Request: `GET /time`

Response: Numeric unix time without milliseconds.

Example: `1445324591`

### Quotesâ

Request: `GET /quotes?symbols=<ticker_name_1>,<ticker_name_2>,...,<ticker_name_n>`

Example: `GET /quotes?symbols=NYSE%3AAA%2CNYSE%3AF%2CNasdaqNM%3AAAPL`

A response is an object with the following keys.

  * `s`: Status code for the request. Expected values are: `ok` or `error`
  * `errmsg`: Error message. Should be present only when `s = 'error'`
  * `d`: symbol data array. Should conform to the [`QuoteData`](/charting-library-docs/latest/api/modules/Datafeed# quotedata) interface.

Example:
    
    
    {  
        "s": "ok",  
        "d": [  
            {  
                "s": "ok",  
                "n": "NYSE:AA",  
                "v": {  
                    "ch": 0.16,  
                    "chp": 0.98,  
                    "short_name": "AA",  
                    "exchange": "NYSE",  
                    "description": "Alcoa Inc. Common",  
                    "lp": 16.57,  
                    "ask": 16.58,  
                    "bid": 16.57,  
                    "open_price": 16.25,  
                    "high_price": 16.60,  
                    "low_price": 16.25,  
                    "prev_close_price": 16.41,  
                    "volume": 4029041  
                }  
            },  
            {  
                "s": "ok",  
                "n": "NYSE:F",  
                "v": {  
                    "ch": 0.15,  
                    "chp": 0.89,  
                    "short_name": "F",  
                    "exchange": "NYSE",  
                    "description": "Ford Motor Company",  
                    "lp": 17.02,  
                    "ask": 17.03,  
                    "bid": 17.02,  
                    "open_price": 16.74,  
                    "high_price": 17.08,  
                    "low_price": 16.74,  
                    "prev_close_price": 16.87,  
                    "volume": 7713782  
                }  
            }  
        ]  
    }  
    

## Constructorâ
    
    
    Datafeeds.UDFCompatibleDatafeed = function(datafeedURL, updateFrequency, limitedServerResponse)  
    

### datafeedURLâ

This is a URL of a data server that will receive requests and return data.

### updateFrequencyâ

This is a frequency of requests that the data feed will send to the server in milliseconds. Default is 10000 (10 sec).

### limitedServerResponseâ

Optional parameter for configuring the datafeed for truncated server responses. Use this if your data server has a maximum response size. The object has two parameters: `maxResponseLength` and `expectedOrder`.

  * `maxResponseLength`: number. Set this value to the maximum number of bars which the data backend server can supply in a single response. This doesn't affect or change the library behavior regarding how many bars it will request. It just allows this Datafeed implementation to correctly handle this situation.
  * `expectedOrder`: Possible values: 'latestFirst' | 'earliestFirst'. If the server can't return all the required bars in a single response then `expectedOrder` specifies whether the server will send the latest (newest) or earliest (older) data first.



---

## Symbology | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/Symbology*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * Symbology

On this page

# Symbology

The library requires information about the symbol to request and process data correctly. This information should be arranged in a specified format and supplied as a [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. This article explains the most challenging concepts of the `LibrarySymbolInfo` implementation. You can find the complete list of interface parameters, and their descriptions, in the [API](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) section.

The library calls the [`resolveSymbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# resolvesymbol) method to request symbol information. To provide this information, create the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object and pass it to [`ResolveCallback`](/charting-library-docs/latest/api/modules/Datafeed# resolvecallback) as a parameter.

tip

Refer to the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) topic for more information on how to supply the chart with data.

## Symbol nameâ

The library addresses a symbol by a unique identifier. You can use [`ticker`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# ticker) or [`name`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# name) to specify such an identifier for a certain symbol.

info

The ticker or name should not contain information other than an identifier for a symbol. Therefore, they should not contain the exchange.

### nameâ

The `name` property is an identifier for a symbol within an exchange, such as `AAPL` or `9988` (on Hong Kong exchange). This identifier is visible to users. Note that the `name` value does not have to be unique and can be duplicated for several symbols.

By default, `name` is used to [resolve symbols](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) in the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/). If you use `ticker`, the library will use the ticker for Datafeed API requests.

### tickerâ

If you need to address a symbol by a custom identifier (for example, numeric), you can use `ticker`. It is not displayed to users. You should avoid using colons (":") in ticker values unless you are following the TradingView format: "NYSE:IBM". Using colons may cause unexpected behavior and display bugs.

If you provide `ticker`, the library will use it for [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) requests. Make sure you provide `ticker` in [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) and [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem).

### Letter caseâ

By default, all symbol names are shown in uppercase in the UI. To display lowercase symbol names, you should disable the [`uppercase_instrument_names`](/charting-library-docs/latest/customization/Featuresets# uppercase_instrument_names) featureset and adjust symbol names in the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) and [`symbolSearch`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# searchsymbols) implementation.

Consider the following CodePen example:

See the Pen [ How to display lowercase symbols](https://codepen.io/tradingview/pen/KwKNdJN) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Resolutionsâ

Refer to the [Resolution](/charting-library-docs/latest/core_concepts/Resolution) article for information on how to specify the following properties:

  * [`supported_resolutions`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# supported_resolutions)
  * [`has_seconds`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_seconds)
  * [`seconds_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# seconds_multipliers)
  * [`has_intraday`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_intraday)
  * [`intraday_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# intraday_multipliers)
  * [`has_daily`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_daily)
  * [`daily_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# daily_multipliers)
  * [`has_weekly_and_monthly`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_weekly_and_monthly)
  * [`weekly_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# weekly_multipliers)
  * [`monthly_multipliers`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# monthly_multipliers)
  * [`has_ticks`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# has_ticks)

## Time zoneâ

The [`timezone`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# timezone) property should contain a time zone of the symbol's exchange. For example, if the symbol's exchange is NASDAQ, the `timezone` value should be `"America/New_York"`.

The `timezone` value affects how the library arranges data on the chart. Make sure you specify this property correctly to avoid potential issues, such as [shifted bars](/charting-library-docs/latest/connecting_data/Datafeed-Issues# library-shifts-bar-time). For more information about supported time zones, refer to the [Time zones](/charting-library-docs/latest/ui_elements/timezones) article.

## Sessionâ

The [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) property contains trading hours for the symbol. The time zone of the trading hours corresponds to the [`timezone`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# timezone) value.

The [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) value affects how the library arranges data on the chart. Make sure you specify this property correctly to avoid potential issues, such as [shifted bars](/charting-library-docs/latest/connecting_data/Datafeed-Issues# library-shifts-bar-time). Refer to the [Trading Sessions](/charting-library-docs/latest/connecting_data/Trading-Sessions) topic for more information on the session format.

### correctionsâ

The [`corrections`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# corrections) property allows you to specify changes in a trading session for a specific day. For example, you can extend or shorten the session or reschedule it for another day. The `corrections` value overrides the default session specified in the `session` property. You can specify corrections for days in the past and future.

The correction is a string that has the `SESSION:YYYYMMDD` format and consists of the following elements:

Element| Description| Example  
---|---|---  
SESSION| Trading hours specified in the same format as the `session` property. Refer to [Session formats](/charting-library-docs/latest/connecting_data/Trading-Sessions# session-formats) for more information.| `10:00â14:00`  
:| A separator between the session and the day when it is applied.|   
  
YYYYMMDD| A day when the session is applied.| `20181114`  
  
If the correction is applied to multiple days, you should list the days starting from the latest one and separate them by comma. For example, `"1000-1400:20180308,20180223,20180101"`. To specify several corrections, list them one by one and use a semicolon as a separator, for example, `"1000-1845:20181113;1000-1400:20181114"`.

You can also specify corrections for holidays. Note that the `corrections` property has higher priority than [`session_holidays`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session_holidays). Therefore, if both properties contain the same date, the library applies hours specified in `corrections` for that date.

## Extended sessionsâ

The library allows you to display extended trading sessions for symbols that support them. To enable an extended session for a certain symbol, you should specify the properties below. For more information on how to handle the sessions, refer to the dedicated [Extended sessions](/charting-library-docs/latest/connecting_data/Extended-Sessions) article.

caution

The `session`, `corrections`, `subsession_id`, and `subsessions` properties affect the [Market status pop-up](/charting-library-docs/latest/ui_elements/Symbol-Status). Make sure you configure these properties to avoid an incorrect status for the symbol.

### subsessionsâ

An extended session includes regular, pre-market, and post-market subsessions. Either a pre-market or post-market subsession can be missed. When the chart displays an extended session, the subsessions are represented as colored areas.

You should provide information on the extended session and its subsessions to the library using the [`subsessions`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# subsessions) property. The property contains an array of [`LibrarySubsessionInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo) objects, where each object describes a certain subsession. For example, the code sample below specifies an extended session that starts at 04:00 and ends at 20:00. It includes a pre-market subsession from 04:00 to 09:30, a regular subsession from 09:30 to 16:00, and a post-market subsession from 16:00 to 20:00.
    
    
    "subsessions": [  
        {  
            "description": "Regular Trading Hours",  
            "id": "regular",  
            "session": "0930-1600"  
        },  
            {  
            "description": "Extended Trading Hours",  
            "id": "extended",  
            "session": "0400-2000"  
        },  
        {  
            "description": "Pre-market",  
            "id": "premarket",  
            "session": "0400-0930"  
        },  
        {  
            "description": "Post-market",  
            "id": "postmarket",  
            "session": "1600-2000"  
        }  
    ]  
    

### subsession_idâ

The [`subsession_id`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# subsession_id) property specifies the session type that the chart should currently display. The `subsession_id` value is either `"regular"` or `"extended"`. You should update the property's value when the session type is changed. Refer to the [Handle session switch](/charting-library-docs/latest/connecting_data/Extended-Sessions# handle-session-switch) section for more information.

### Update session valueâ

Note that the [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) value depends on the chart type currently selected on the chart. The property's value should match the corresponding [`LibrarySubsessionInfo.session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo# session) value specified in `subsessions`. For example, if the chart displays `"extended"` session, and for this session type `LibrarySubsessionInfo.session` is `"0400-2000"`, the `LibrarySymbolInfo.session` value should also be `"0400-2000"`. You should update `session` when the session type is changed. Refer to the [Handle session switch](/charting-library-docs/latest/connecting_data/Extended-Sessions# handle-session-switch) section for more information.

tip

You can use the following expression to make sure that `session` is correct. The expression should always be `true`:
    
    
    symbolInfo.session === symbolInfo.subsessions.find(x => x.id === subsession_id).session  
    

## Supported price valuesâ

The [`visible_plots_set`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# visible_plots_set) property indicates which values the symbol supports, such as open, high, low, close, and volume. If you prefer to only provide close values, set `visible_plots_set` to `"c"`. This makes the chart show the symbol data using only line-based styles.

## Price formatâ

The library supports the decimal and fractional price formats. To configure how the price displays, specify the following properties:

  * [`pricescale`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# pricescale) â a number of decimal places or fractions that the price has.
  * [`minmov`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# minmov) â a number of units that represents the price tick.
  * [`minmove2`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# minmove2) â a fraction of a fraction.
  * [`fractional`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# fractional) â a boolean value that shows whether the format is fractional or decimal.

These properties' values depend on the chosen format and are not visible to users.

### Decimal formatâ

  * `pricescale` should be `10^n`, where `n` is the number of decimal places. For example, if the price is `1.01`, set `pricescale` to `100`.
  * `minmov` depends on the tick size that is calculated as `minmov / pricescale`. For example, if the tick size is `0.25`, set `minmov` to `25`.
  * `minmove2` should be `0` or not specified.
  * `fractional` should be `false` or not specified.

Consider the following examples:

  * The security's tick size is `0.01`. To display this security, set `minmov = 1`, `pricescale = 100`.
  * The security's tick size is `0.0125`. To display this security, set `minmov = 125`, `pricescale = 10000`.
  * The security's tick size is `0.20`. To display this security, set `minmov = 20`, `pricescale = 100`.

#### Variable tick sizeâ

If you need to adjust a tick size depending on a symbol price, you can additionally specify the [`variable_tick_size`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# variable_tick_size) property. This property should be a `string` that contains prices and the corresponding tick sizes. The library overrides the [`pricescale`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# pricescale) and [`minmov`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# minmov) properties to represent the desired tick size.

For example, the `'0.01 10 0.02 25 0.05'` value specifies the following ticks:

  * For prices less than or equal to 10, the tick size is `0.01`. Therefore, `minmov = 1`, `pricescale = 100`.
  * For prices greater than 10 but less than or equal to 25, the tick size is `0.02`. Therefore, `minmov = 2`, `pricescale = 100`.
  * For prices greater than 25, the tick size is `0.05`. Therefore, `minmov = 5`, `pricescale = 100`.

Note that you need to initialize `pricescale` and `minmov` regardless of whether you use `variable_tick_size` or not.

#### How to display pipsâ

You can display pips for symbols that have `forex` or `cfd` type. To do this, set `minmove2` to `10`. In the UI, pips look smaller than the price digits.

![Symbology Pips Example](/charting-library-docs/assets/images/symbology_pips-b40a419c095fefcd3749d89b6c5f0405.png)

If `minmove2` is `0` for `forex`/`cfd` symbols, the spread is displayed in ticks, not pips.

### Fractional formatâ

The fractional price is displayed as `x'y` (for example, `133'21`), where `x` and `y` are the integer and fractional parts, respectively. A single quote is used as a delimiter.

  * `pricescale` should be `2^n`. This value represents the number of fractions.
  * `minmov` depends on the tick size that is calculated as `minmov / pricescale`. For example, if the tick size is `1/4`, set `minmov` to `1`.
  * `minmove2` should be `0` or not specified.
  * `fractional` should be `true`.

Consider the following examples:

  * To display a security that has the `1/32` tick size, set `minmov = 1`, `pricescale = 32`.
  * To display a security that has the `2/8` tick size, set `minmov = 2`, `pricescale = 8`.

#### Fraction of a fraction formatâ

The fraction of a fraction format is a particular case of the fractional format. It is displayed as `x'y'z` (for example, `133'21'5`), where `z` is a fractional part of `y`. In this case, `minmove2` differs from `0` and represents a fraction of a fraction. For example, the `ZBM2023` tick size is 1/4 of a 32nd. To display this security, set `minmov = 1`, `pricescale = 128`, `minmove2 = 4`. The price is displayed in the UI as follows:

  * `119'16'0` represents `119 + 16.0/32`
  * `119'16'2` represents `119 + 16.25/32`
  * `119'16'5` represents `119 + 16.5/32`
  * `119'16'7` represents `119 + 16.75/32`



---

## Trading sessions | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/Trading-Sessions*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * Trading sessions

On this page

# Trading sessions

A trading session defines the hours in a week when a symbol is actively traded on an exchange. A session is passed to the library in the [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) field of the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. Session time should be in the **exchange time zone**.

Note that the last (rightmost) time of any session is **non-inclusive**. For example, if you specify a `0930-1630` session and select the oneâhour resolution, the following bars are displayed on the chart: `[09:30, 10:30, 11:30, 12:30, 13:30, 14:30, 15:30]`. The period of the last bar starts at 15:30 and ends at 16:30 that coincides with the end of the trading session.

caution

The [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) value affects how the library arranges data on the chart. Make sure you specify this property correctly to avoid potential issues, such as [shifted bars](/charting-library-docs/latest/connecting_data/Datafeed-Issues# library-shifts-bar-time).

## Session formatsâ

A trading session is defined by a string. This format allows you to describe a variety of sessions.

tip

You can use the [Session Parser](https://charting-library.tradingview-widget.com/checksession.html) to check your session string.

### 24/7 sessionsâ

A session that runs 24 hours a day, 7 days a week, including Saturday and Sunday. It starts at 00:00 and ends at 00:00 the following day.

  * `24x7`

### Intraday sessionsâ

A session within a day. For example:

  * `0930-1600` starts at 09:30 and ends at 16:00 from Monday to Friday.
  * `0000-0000` starts at 00:00 and ends at 00:00 the following day from Monday to Friday.

### Overnight sessionsâ

In the library, an **overnight** session is a session that starts **before** the trading day. For example, the trading day is Monday, but the session starts on Sunday. A session is considered overnight by default in the following cases:

  * The start time is more than the end time, for example, `1600-0930`. The session starts at 16:00 on the previous day and ends at 09:30 on the current day.
  * The start time is equal to the end time, for example, `1700-1700`. The session starts at 17:00 on the previous day and ends at 17:00 on the current day. Note that the `0000-0000` value is considered to be an intraday session.

In other cases, you can use the `F` character to specify the time for the previous day. For example:

  * `1700F-2200` starts at 17:00 on the previous day and ends at 22:00 on the current day. For example, a Wednesday session starts at 17:00 on Tuesday and ends at 22:00 on Wednesday.
  * `1900F-2350F` starts at 19:00 on the previous day and ends at 23:50 on the previous day. For example, a Monday session starts at 19:00 on Sunday and ends at 23:50 on Sunday.

To specify a session that starts several days before the trading day, use `Fn`, where `n` is the number of days. Note that the number of days cannot be more than 6. For example:

  * `1900F3-1900` starts at 19:00 three days ago and ends at 19:00 on the current day. For example, a Monday session starts at 19:00 on Friday and ends at 19:00 on Monday.
  * `1900F3-2350F3` starts at 19:00 three days ago and ends at 23:50 three days ago. For example, a Friday session starts at 19:00 on Tuesday and ends at 23:50 on Tuesday.

info

To specify a session that spans midnight but is not an overnight session in the library context, use time values larger than `2400`. For example, `0930-2730`. In this case, a Monday session starts at 09:30 on Monday and ends at 03:30 on Tuesday.

### Multiple sessionsâ

There may be several sessions in one trading day. In this case, you should specify all sessions, separated by commas. For example, `0930-1400,1430-1700`. The first session starts at 09:30 and ends at 14:00. The second session starts at 14:30 and ends at 17:00.

### Different sessions for different daysâ

By default, sessions take place from Monday to Friday. There are no sessions on Saturday and Sunday. You can specify a session for a certain day by adding `:n`, where `n` is a day number. Day numbers are `1` for Sunday and `7` for Saturday (`2` â Monday, `3` â Tuesday, etc.). Therefore, you can specify a Saturday/Sunday session. A session can relate to multiple days. For example, `0900-1400:23` means that the session starts at 09:00 and ends at 14:00 on Mondays and Tuesdays.

  * `0900-1400:2|0900-1630` on Mondays the session starts at 09:00 and ends at 14:00. On all other days the session starts at 09:00 and ends at 16:30.
  * `2200-2200:3456|1700F-2200:2` a Monday session starts at 17:00 on Sunday and ends at 22:00 on Monday. On all other days the session starts at 22:00 on the previous day and ends at 22:00 on the current day.
  * `0930-1630:34567` starts at 09:30 and ends at 16:30 on Tuesday, Wednesday, Thursday, Friday, and Saturday.

### First trading dayâ

You can specify the first trading day of the week using semicolon:

  * `1;0900-1630|0900-1400:2` â the first day of the week is Sunday.
  * `0900-1630|0900-1400:2;6` â the first day of the week is Saturday.
  * `0900-1630|0900-1400:2` â the first day of the week is Monday (default value).

### Forex sessionsâ

In Forex trading, sessions typically cover a full 24-hour period, five days a week, and use the time zone "Etc/UTC". For example, you can configure a Forex session as `2200-2200`.

## Note about bar timestampsâ

The first bar timestamp coincides with the session opening time. All the following bar timestamps are calculated from the first one. For example, the session starts at 09:15, and the timestamp of the first bar is 09:15. The selected resolution is 1 hour. In this case, the second bar timestamp is 10:15, the third is 11:15, etc. If you want to display timestamps like `[09:15, 10:00, 11:00,...]`, you should set [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) to `0900-HHMM` and [`session_display`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session_display) to `0915-HHMM`.

## Examplesâ

  * `0900-1630|0900-1400:2`

All weekdays except Mondays have one session that starts at 09:00 and ends at 16:30. A Monday's session starts at 09:00 and ends at 14:00.

Fragment| Meaning  
---|---  
0900â1630| A session 0900-1630. This session will be assigned by default to all non-weekend days because it's not followed by the `:` specifier.  
|| Sessions separator. This character divides different sessions.  
0900â1400| A session 0900-1400. It's the session for a day # 2 (see below).  
:| Day specifier. This character follows the session hours and is followed by the day numbers.  
2| The day number for the session above (Monday).  
  * `1715F-0300,0915-1200,1300-1630:3456|1715F3-0300F2,0915-1200,1300-1630:2`

Tuesday, Wednesday, Thursday, and Friday have three sessions. The first starts at 17:15 on the previous day and ends at 03:00 on the current day, the second starts at 09:15 on the current day and ends at 12:00, and the third starts at 13:00 and ends at 16:30.

Monday also has three sessions. The first starts at 17:15 on Friday and ends at 03:00 on Saturday, the second starts at 09:15 on Monday and ends at 12:00, and the third one starts at 13:00 and ends at 16:30.

Fragment| Meaning  
---|---  
1715Fâ0300| A session starts at 17:15 the day before and ends at 03:00.  
0915â1200| A session starts at 09:15 and ends at 12:00 .  
1300â1630| A session starts at 13:00 and ends at 16:30.  
:| Day specifier. This character follows the session hours and is followed by the day numbers.  
3456| The day numbers for the sessions above (Tuesday, Wednesday, Thursday, and Friday).  
|| Sessions separator. This character divides different sessions.  
1715F3â0300F2| A session starts at 17:15 three days ago and ends at 03:00 two days ago.  
0915â1200| A session starts at 09:15 and ends at 12:00.  
1300â1630| A session starts at 13:00 and ends at 16:30.  
:| Day specifier.  
2| The day number for the session above (Monday).  



---

## Extended sessions | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/Extended-Sessions*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * Extended sessions

On this page

# Extended sessions

An extended session is a period beyond the official trading hours of the exchange when trading still occurs. The library allows you to display extended sessions for symbols that support them. Note that extended sessions are only visible on [intraday resolutions](/charting-library-docs/latest/core_concepts/Resolution# resolution-in-minutes-intraday).

The extended session includes regular, pre-market, and post-market subsessions. Either a pre-market or post-market subsession can be missed. When the chart displays an extended session, the subsessions are represented as colored areas.

![A chart showing subsessions](/charting-library-docs/assets/images/subsessions_example-e052f331ca30ee70e105bb3a3ec2f00c.png)

## Enable extended sessionsâ

To enable extended sessions, do the following:

  * Add the [`pre_post_market_sessions`](/charting-library-docs/latest/customization/Featuresets# pre_post_market_sessions) featureset to the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) array.
  * Specify the [`subsession_id`](/charting-library-docs/latest/connecting_data/Symbology# subsession_id) and [`subsessions`](/charting-library-docs/latest/connecting_data/Symbology# subsessions) properties in [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) for symbols that support extended sessions. Refer to the Configure datafeed section for more information.

### Specify the default session typeâ

The chart can display regular or extended sessions. To specify the default session type, provide the [`mainSeriesProperties.sessionId`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiessessionid) property within [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# overrides).
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "mainSeriesProperties.sessionId": "extended",  
        }  
    });  
    

### Specify subsession colorsâ

Subsessions are represented on the chart as colored areas. You can specify default colors for pre-market and post-market subsessions using the [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# overrides) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "backgrounds.preMarket.color": "rgba(200,0,0,0.08)",  
            "backgrounds.postMarket.color": "rgba(0,0,200,0.08)",  
        }  
    });  
    

To change the colors on the fly, use the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method.
    
    
    widget.applyOverrides({"backgrounds.outOfSession.color": "rgba(0,0,0,0.2)"});  
    widget.applyOverrides({"backgrounds.preMarket.color": "rgba(200,0,0,0.08)"});  
    widget.applyOverrides({"backgrounds.postMarket.color": "rgba(0,0,200,0.08)"});  
    

Users can adjust the subsession colors in the _Chart settings_ dialog in the UI.

![A chart showing subsessions](/charting-library-docs/assets/images/session-color-ui-902a2849084ef8090bc262b12dc3c6b2.png)

## Change the session typeâ

You can switch between the sessions in the UI or using the API.

### In UIâ

Users can change the session type in the following ways:

  * Use the drop-down menu on the bottom toolbar.

![Bottom toolbar extended session button](/charting-library-docs/assets/images/subsessions-bottom-toolbar-d8213b11b0bb0a0aa0bdca70ed5ae4db.png)
  * Use the drop-down menu in the _Chart settings_ dialog.

![Bottom toolbar extended session button](/charting-library-docs/assets/images/subsession-chart-settings-bae4724c8d99d3a00bcf31fdac6bc819.png)

### Using APIâ

You can use the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method to change the session type on the fly.
    
    
    widget.applyOverrides({ "mainSeriesProperties.sessionId": "extended" });  
    

## Configure the datafeedâ

To display extended sessions on the chart, you should provide additional data in [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo).

tip

`LibrarySymbolInfo` is an object that contains information about a certain symbol. You should return this object to the library when it calls the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method. Refer to [Symbology](/charting-library-docs/latest/connecting_data/Symbology) for more information on how to implement `LibrarySymbolInfo`.

Consider the `LibrarySymbolInfo` object for a symbol that supports a regular session only.
    
    
    {  
        "name": "AAPL",  
        "ticker": "AAPL",  
        "exchange": "NasdaqNM",  
        "timezone": "Etc/UTC",  
        "description": "Apple Inc.",  
        "type": "stock",  
        "pricescale": 100,  
        "minmov": 1,  
        "has_intraday": true,  
        "supported_resolutions": ["60"],  
        "has_daily": false,  
        "intraday_multipliers": ["1"],  
        "format": "price",  
        "session": "0930-1600"  
    }  
    

If the symbol supports an extended session, you should additionally specify the [`subsession_id`](/charting-library-docs/latest/connecting_data/Symbology# subsession_id) and [`subsessions`](/charting-library-docs/latest/connecting_data/Symbology# subsessions) properties. The code sample below specifies an extended session that starts at 04:00 and ends at 20:00. It includes a pre-market subsession from 04:00 to 09:30, a regular subsession from 09:30 to 16:00, and a post-market subsession from 16:00 to 20:00.
    
    
    {  
        "name": "AAPL",  
        "ticker": "AAPL",  
        "exchange": "NasdaqNM",  
        "timezone": "Etc/UTC",  
        "description": "Apple Inc.",  
        "type": "stock",  
        "pricescale": 100,  
        "minmov": 1,  
        "has_intraday": true,  
        "supported_resolutions": ["60"],  
        "has_daily": false,  
        "intraday_multipliers": ["1"],  
        "format": "price",  
        "session": "0930-1600",  
        "subsession_id": "regular",  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1600"  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000"  
            },  
            {  
                "description": "Pre-market",  
                "id": "premarket",  
                "session": "0400-0930"  
            },  
            {  
                "description": "Post-market",  
                "id": "postmarket",  
                "session": "1600-2000"  
            }  
        ]  
    }  
    

Note that the `session` and `subsession_id` values depend on the current session type selected on the chart. If the session type is changed either in the UI or using the API, you should **update** the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object.

### Handle session switchâ

When the session type is changed, the library needs to request all data from scratch. To do this, the library calls [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) once again with an additional [`SymbolResolveExtension`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolResolveExtension) parameter. In `SymbolResolveExtension`, the [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolResolveExtension# session) property indicates what session type should be displayed on the chart.

In response, you should return the updated [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object with the following properties changed:

  * `subsession_id`: the property's value should match the [`SymbolResolveExtension.session`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolResolveExtension# session) value. The value is either `"regular"` or `"extended"`.
  * `session`: the property's value should match the corresponding [`LibrarySubsessionInfo.session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo# session) value specified in `subsessions`. For example, if the chart displays `"extended"` session, and for this session type `LibrarySubsessionInfo.session` is `"0400-2000"`, the `LibrarySymbolInfo.session` value should also be `"0400-2000"`.

tip

You can use the following expression to make sure that [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) is correct. The expression should always be `true`:
    
    
    symbolInfo.session === symbolInfo.subsessions.find(x => x.id === subsession_id).session  
    

#### Exampleâ

Consider the example. The current symbol on the chart is `AAPL` and the session type is regular. You should return the following [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object to the library:
    
    
    {  
        "name": "AAPL",  
        "ticker": "AAPL",  
        "exchange": "NasdaqNM",  
        "timezone": "Etc/UTC",  
        "description": "Apple Inc.",  
        "type": "stock",  
        "pricescale": 100,  
        "minmov": 1,  
        "has_intraday": true,  
        "supported_resolutions": ["60"],  
        "has_daily": false,  
        "intraday_multipliers": ["1"],  
        "format": "price",  
        "session": "0930-1600",  
        "subsession_id": "regular",  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1600"  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000"  
            },  
            {  
                "description": "Pre-market",  
                "id": "premarket",  
                "session": "0400-0930"  
            },  
            {  
                "description": "Post-market",  
                "id": "postmarket",  
                "session": "1600-2000"  
            }  
        ]  
    }  
    

Then, the chart is switched to the extended session. The library calls `resolveSymbol` once again. In response, you should update the `subsession_id` and `session` properties, so they match the corresponding values defined for the extended session in `subsessions`:
    
    
    {  
        "name": "AAPL",  
        "ticker": "AAPL",  
        "exchange": "NasdaqNM",  
        "timezone": "Etc/UTC",  
        "description": "Apple Inc.",  
        "type": "stock",  
        "pricescale": 100,  
        "minmov": 1,  
        "has_intraday": true,  
        "supported_resolutions": ["60"],  
        "has_daily": false,  
        "intraday_multipliers": ["1"],  
        "format": "price",  
        "session": "0400-2000",      // The value is changed  
        "subsession_id": "extended", // The value is changed  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1600"  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000"  
            },  
            {  
                "description": "Pre-market",  
                "id": "premarket",  
                "session": "0400-0930"  
            },  
            {  
                "description": "Post-market",  
                "id": "postmarket",  
                "session": "1600-2000"  
            }  
        ]  
    }  
    

### Corrections for extended sessionsâ

Corrections are changes in the default trading session for specific days. For regular sessions, you should only specify the [`corrections`](/charting-library-docs/latest/connecting_data/Symbology# corrections) property in `LibrarySymbolInfo`. However, for extended sessions, you should additionally provide [`session-correction`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySubsessionInfo# session-correction) for each subsession in `subsessions`.

For example, you need to display the following sessions:

  * Regular. The default regular session starts at 09:30 and ends at 17:00. On 2019â07â03, 2019â11â29, and 2019â12â24, the session starts at 09:30 and ends at 13:00.
  * Extended. The default extended session starts at 04:00 and ends at 20:00. On 2019â07â03, 2019â11â29, and 2019â12â24, the session starts at 04:00 and ends at 21:00.
  * Pre-market. This session always starts at 04:00 and ends at 09:30.
  * Post-market. The default post-market session starts at 17:00 and ends at 20:00. However, on 2019â07â03, 2019â11â29, and 2019â12-24, the session time shifts because of the changes in the regular and extended sessions. On these days, the post-market session starts at 13:00 and ends at 21:00.

    
    
    {  
        // ...  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1700",  
                "session-correction": "0930-1300:20190703,20191129,20191224",  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000",  
                "session-correction": "0400-2100:20190703,20191129,20191224",  
            },  
            {  
                "description": "Pre-market",  
                "id": "premarket",  
                "session": "0400-0930",  
            },  
            {  
                "description": "Post-market",  
                "id": "postmarket",  
                "session": "1700-2000",  
                "session-correction": "1300-2100:20190703,20191129,20191224",  
            }  
        ],  
    }  
    

caution

Time changes in one session may cause changes in the related sessions. Make sure you specify corrections for all sessions that require them to avoid visual bugs.

As mentioned earlier, you should update the `session` and `session_id` properties in `LibrarySymbolInfo` when the session type is changed. If you specify corrections, you should also update the `corrections` property. This property should contain one of the `session-correction` values, depending on the currently selected session type in the UI. For example, the current type is `"regular"`, therefore, `corrections` is equal to the `session-correction` value specified for the regular session.
    
    
    {  
        // ...  
        "session": "0930-1700",  
        "subsession_id": "regular",  
        "corrections": "0930-1300:20190703,20191129,20191224",  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1700",  
                "session-correction": "0930-1300:20190703,20191129,20191224",  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000",  
                "session-correction": "0400-2100:20190703,20191129,20191224",  
            },  
            // ...  
        ],  
    }  
    

If the type is changed to `"extended"`, you should update `corrections` to match the `session-correction` value specified for the extended session.
    
    
    {  
        // ...  
        "session": "0400-2000",  
        "subsession_id": "extended",  
        "corrections": "0400-2100:20190703,20191129,20191224",  
        "subsessions": [  
            {  
                "description": "Regular Trading Hours",  
                "id": "regular",  
                "session": "0930-1700",  
                "session-correction": "0930-1300:20190703,20191129,20191224",  
            },  
            {  
                "description": "Extended Trading Hours",  
                "id": "extended",  
                "session": "0400-2000",  
                "session-correction": "0400-2100:20190703,20191129,20191224",  
            },  
            // ...  
        ],  
    }  
    


---

## Datafeed: common issues | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-Issues*

  * [](/charting-library-docs/)
  * [Connecting Data](/charting-library-docs/latest/connecting_data/)
  * Datafeed: common issues

On this page

# Datafeed: common issues

This article describes common issues that users face when they implement the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/).

tip

[Enable debug mode](/charting-library-docs/latest/tutorials/enable-debug-mode# enable-debug-mode-for-data-connection) to identify how the library loads, processes, and resolves data.

## getBars is called multiple timesâ

The library calls [`getBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# getbars) multiple times if the amount of provided data [is less than requested](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# correct-amount-of-data). To debug this issue, [enable console logs](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# debug). Consider the following example:
    
    
    FEED [AAPL|1D]: Next time received: `2018-03-27T00:00:00.000Z`  
    FEED [AAPL|1D]: Processing pending subscribers, count=2  
      
    // The library requests 329 bars from the datafeed  
      
    FEED [AAPL|1D]: Leftmost subscriber requires 329 bars prior 2022-11-09T00:00:00.000Z  
    FEED [AAPL|1D]: Requesting data: [2016-12-22T00:00:00.000Z ... 2021-08-06T00:00:00.000Z, 329 bars]  
      
    // The datafeed responds with 157 bars  
    // 157 is less than requested, so the library will request the remaining bars from the datafeed  
      
    FEED [AAPL|1D]: Receiving bars: total 157 bars in  [2017-08-10T00:00:00.000Z ... 2018-03-27T00:00:00.000Z], requested range: [2016-12-22T00:00:00.000Z ... 2021-08-06T00:00:00.000Z, 329 bars]  
    FEED [AAPL|1D]: Processing pending subscribers, count=2  
      
    // The library requests 172 bars from the datafeed  
    // It requests 172 bars because 329 - 157 = 172  
      
    FEED [AAPL|1D]: Leftmost subscriber requires 172 bars prior 2017-08-10T00:00:00.000Z  
    FEED [AAPL|1D]: Requesting data: [2016-04-26T00:00:00.000Z ... 2016-12-22T00:00:00.000Z, 172 bars]  
      
    // The datafeed responds with 169 bars  
    // 169 is less than requested, so the library will request the remaining bars from the datafeed  
      
    FEED [AAPL|1D]: Receiving bars: total 169 bars in  [2016-04-26T00:00:00.000Z ... 2016-12-22T00:00:00.000Z], requested range: [2016-04-26T00:00:00.000Z ... 2016-12-22T00:00:00.000Z, 172 bars]  
    FEED [AAPL|1D]: Processing pending subscribers, count=2  
      
    // The library requests 3 bars from the datafeed  
    // It requests 3 bars because 172 - 169 = 3  
      
    FEED [AAPL|1D]: Leftmost subscriber requires 3 bars prior 2016-04-26T00:00:00.000Z  
    FEED [AAPL|1D]: Requesting data: [2016-04-23T00:00:00.000Z ... 2016-04-26T00:00:00.000Z, 3 bars]  
      
    // The datafeed responds with 2 bars  
    // 2 is less than requested, so the library will request the remaining bars from the datafeed  
      
    FEED [AAPL|1D]: Receiving bars: total 2 bars in  [2016-04-25T00:00:00.000Z ... 2016-04-26T00:00:00.000Z], requested range: [2016-04-23T00:00:00.000Z ... 2016-04-26T00:00:00.000Z, 3 bars]  
    FEED [AAPL|1D]: Processing pending subscribers, count=2  
      
    // The library requests 2 bars from the datafeed  
    // Here the library actually requests 1 more bar than it requires, but that's OK and datafeed implementations should be able to handle it  
      
    FEED [AAPL|1D]: Leftmost subscriber requires 2 bars prior 2016-04-25T00:00:00.000Z  
    FEED [AAPL|1D]: Requesting data: [2016-04-21T00:00:00.000Z ... 2016-04-23T00:00:00.000Z, 2 bars]  
    FEED [AAPL|1D]: Receiving bars: total 2 bars in  [2016-04-21T00:00:00.000Z ... 2016-04-22T00:00:00.000Z], requested range: [2016-04-21T00:00:00.000Z ... 2016-04-23T00:00:00.000Z, 2 bars]  
    FEED [AAPL|1D]: Processing pending subscribers, count=2  
    

To avoid multiple `getBars` requests, you can return bars **before** the [`from`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# from) date until their number matches the [`countBack`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# countback) value. For example, the chart requests 300 bars in the range `[2019-06-01T00:00:00â¦2020-01-01T00:00:00)`, and your backend has only 250 bars in the requested period. Return these 250 bars and 50 bars prior to `2019-06-01T00:00:00`.

## Bar data is mutableâ

The library may mutate the values of some [`Bar`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar) objects that you provide. You can make a copy of your data to avoid potential issues.

## Requested data is outside visible rangeâ

The `[from, to)` [range](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# correct-amount-of-data) usually matches [`VisibleTimeRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.VisibleTimeRange). However, sometimes the library requests more bars than are visible, because indicators require some additional history.

## Time violationâ

The _putToCacheNewBar: time violation_ issue appears if the library receives a bar which timestamp is less than the timestamp of the last bar on the chart. To debug this issue, check that you follow the rules below:

  * You provide bars in **ascending** time order. Refer to [Bar order](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# bar-order) for more information.
  * You update only the last bar on a chart or add a new one using the `subsÑribeBars` method. Refer to [`subsÑribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# subscribebars) for more information.
  * You use different subscribers to update data on different symbols/resolutions and you send updates to the correct subscriber. Refer to [Multiple subscriptions](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# multiple-subscriptions) for more information.
  * For daily, weekly, and monthly bars, the [`time`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar# time) value represents the **beginning of the trading day** at 00:00:00 UTC, not the beginning of the session.

## Maximum call stack size exceededâ

If the _Uncaught RangeError: Maximum call stack size exceeded_ issue occurs, you should check that you evoke all callbacks asynchronously in your datafeed implementation. Refer to [Asynchronous callbacks](/charting-library-docs/latest/connecting_data/datafeed-api/# asynchronous-callbacks) for more information.

## Data must have unique timesâ

The _Assertion failed: data must have unique times_ issue appears if the library receives a bar whose timestamp matches the timestamp of the bar that was loaded before.

To debug this issue, check that you follow the rules below:

  * When you return data to [`getBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# getbars), you should not include a bar for the [`to`](/charting-library-docs/latest/api/interfaces/Charting_Library.PeriodParams# to) date because this bar was sent in a previous response. For more information on how to send data, refer to the [Correct amount of data](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# correct-amount-of-data) section.
  * Your custom indicator [maps](/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale# mapping-times) the main [series](/charting-library-docs/latest/getting_started/glossary# series) times correctly. If the custom indicator has more times than the main series, you can use the [Extending the time scale feature](/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale# extending-the-time-scale-feature) that allows indicators to define their points on a time scale.

## Library shifts bar timeâ

If the library considers the bar time incorrect, it shifts the time to the nearest expected value. In this case, the bar time displayed on the chart does not coincide with the bar time your datafeed provides. To debug this issue, check that you follow the rules below:

  * You correctly specified the following properties in [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo):
    * [`timezone`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# timezone) contains a time zone of the symbol's **exchange**.
    * [`session`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# session) contains trading hours for the symbol. The time zone of the trading hours corresponds to the **`timezone`** value.
  * The bar time should be inside the trading hours specified in `session`. Otherwise, the library ignores bars with such time values.
  * Time values of any bars should be represented with Unix timestamps in **UTC**.
  * For daily, weekly, and monthly bars, the [`time`](/charting-library-docs/latest/api/interfaces/Charting_Library.Bar# time) value represents the **beginning of the trading day** at 00:00:00 UTC, not the beginning of the session. If you provide real-time updates, the `time` value should represent the beginning of the candle, not the time of the update.
  * The library processes DST. You do not need to adjust time values manually.

### Exampleâ

  * The current symbol is AAPL.
  * `timezone` is `"America/New_York"`.
  * `session` is `"0930-1630"`.
  * The selected resolution is two hours.

The table below shows time values that the library expects based on the resolution, timestamps that a datafeed provides, and time values displayed on the chart.

Expected time value| Received timestamp| Timestamp value in UTC| Timestamp value in UTC-5| Displayed time value  
---|---|---|---|---  
09:30| `1706106600`| Wed Jan 24 2024 14:30:00| Wed Jan 24 2024 09:30:00| Wed Jan 24 2024 09:30:00  
11:30| `1706113800`| Wed Jan 24 2024 16:30:00| Wed Jan 24 2024 11:30:00| Wed Jan 24 2024 11:30:00  
13:30| `1706122800`| Wed Jan 24 2024 19:00:00| Wed Jan 24 2024 **14:00:00**|  Wed Jan 24 2024 **13:30:00**  
The library shifts the recieved value to the nearest expected one â the beginning of the interval.  
15:30| `1706128200`| Wed Jan 24 2024 20:30:00| Wed Jan 24 2024 15:30:00| Wed Jan 24 2024 15:30:00  
  
Therefore, incorrect `timezone`, `session`, and `time` values can lead to bars being hours behind the expected ones.

## Internet connection issuesâ

When users experience internet connection issues, the library may fail to receive data during [`getBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# getbars) calls. The library itself does not restore the connection. Instead, you need to implement the following behavior to ensure reconnection:

  1. Call the `onResetCacheNeededCallback` callback within the [`subscribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# subscribebars) method to reset the `subscribeBars` listeners.
  2. Call [`resetData`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# resetdata). This method makes the library call `getBars`, thereby re-requesting all the data for the deleted symbol. To limit the data request to only the visible range, enable the [`request_only_visible_range_on_reset`](/charting-library-docs/latest/customization/Featuresets# request_only_visible_range_on_reset) featureset.

### For offline applicationsâ

Mobile or browser applications designed to work offline have distinct behavior. If the library attempts to resolve a symbol through [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) while the user is offline, the library fails to load the data. In this case, users may experience an error or no response from the library.

To resolve this issue, you can set a "fake" symbol name. This makes the library request symbol information again. Consider the example below that simulates the network being offline. The example shows how to set a "fake" symbol name while still resolving the desired symbol for the user.

See the Pen [ Handling symbol resolution when the library is offline](https://codepen.io/tradingview/pen/rNRRrra) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Quotes are not displayed or refreshedâ

When using [Trading Platform](/charting-library-docs/latest/trading_terminal/), you may encounter issues where [quotes](/charting-library-docs/latest/trading_terminal/trading-concepts/quotes) do not appear or update correctly in the UI. Follow these steps to troubleshoot:

  1. Ensure [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes) and [`subscribeQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# subscribequotes) are correctly implemented. Some **common mistakes** include:
     * The symbol name returned in the [`n`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData# n) field of the [`QuoteOkData`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData) object does not match the symbol requested by the library. Make sure the symbol names are exactly the same as in the requests.
     * Values in the [`DatafeedQuoteValues`](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedQuoteValues) object do not match the expected data types.
  2. Verify that the data you send makes logical sense. Some **common mistakes** include:
     * Sending zero values for bid/ask prices when they should be positive numbers.   

     * Providing negative or unrealistic values in fields where they are not expected.   

     * Adding fields that do not exist in the expected interface, which can cause the request to fail.

## Delays in Trading Platform UI elementsâ

When using [Trading Platform](/charting-library-docs/latest/trading_terminal/), you may experience delays in loading UI elements such as [Buy/Sell buttons](/charting-library-docs/latest/trading_terminal/# buysell-buttons-and-lines), [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket), [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/), or [context menus](/charting-library-docs/latest/ui_elements/context-menu). These UI elements depend on real-time [quotes](/charting-library-docs/latest/trading_terminal/trading-concepts/quotes) to display accurate pricing. If the library does not receive valid quotes, it still attempts to fetch them before rendering the UI. This leads to delays â often around 10 seconds, which matches the library's timeout behavior.

To fix this issue, ensure [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes) and [`subscribeQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# subscribequotes) are correctly implemented. Some **common mistakes** include:

  * The symbol name returned in the [`n`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData# n) field of the [`QuoteOkData`](/charting-library-docs/latest/api/interfaces/Datafeed.QuoteOkData) object does not match the symbol requested by the library. Make sure the symbol names are exactly the same as in the requests.
  * Values in the [`DatafeedQuoteValues`](/charting-library-docs/latest/api/interfaces/Datafeed.DatafeedQuoteValues) object do not match the expected data types.



---

## Chart | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Chart*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Chart

On this page

# Chart

This article contains general information on how to customize and control the chart. For more information about certain chart elements, refer to the rest of the articles in the **UI Elements** section.

## Default chart settingsâ

You should use the Widget Constructor to set up default chart settings like symbol, [resolution](/charting-library-docs/latest/core_concepts/Resolution), [time zone](/charting-library-docs/latest/ui_elements/timezones), [locale](/charting-library-docs/latest/core_concepts/Localization), [size](/charting-library-docs/latest/core_concepts/Widget-Constructor# chart-size), and others. Refer to the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor# chart-configuration) article for more information.

## Customizationâ

tip

Refer to the [Customization](/charting-library-docs/latest/customization/) section for detailed information on how to customize the chart and its elements.

### Change colorsâ

You can customize the colors of the chart to implement your corporate colors. The articles listed below explain how to change colors in certain cases:

  * [Chart Overrides](/charting-library-docs/latest/customization/overrides/chart-overrides): specify default color of UI elements on the chart like scales and panes.
  * [Custom themes API](/charting-library-docs/latest/customization/styles/custom-themes): specify default color of UI elements outside the chart like dialogs and toolbars.

### Show/hide chart elementsâ

You can show/hide chart elements using [featuresets](/charting-library-docs/latest/customization/Featuresets). If there is no featureset for an element you want to hide, you can do it by adding your custom [CSS file](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_css_url).

## Chart methodsâ

You can use the Chart API to interact with the chart after it is initialized. For example, you can subscribe to chart events, manage drawings and indicators, get information about a current configuration, perform Z-order operations, and more. All methods are listed in [IChartWidgetApi](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi).

### Subscribe to eventsâ

You can subscribe to the chart events using methods like [`onDataLoaded`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# ondataloaded), [`onSymbolChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# onsymbolchanged), [`onChartTypeChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# oncharttypechanged), and others. For example, the code sample below specifies a time frame when an interval is changed using the [`onIntervalChanged`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# onintervalchanged) method.
    
    
    widget.activeChart().onIntervalChanged().subscribe(null, (interval, timeframeObj) =>  
        timeframeObj.timeframe = {  
            value: '12M',  
            type: 'period-back'  
    });  
    

### Manage chartâ

You can manage chart settings using methods like [`setSymbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# setsymbol), [`setResolution`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# setresolution), [`resetData`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# resetdata), [`clearMarks`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# clearmarks), and others. For example, the code sample below specifies a new [range](/charting-library-docs/latest/getting_started/glossary# date-range) using the [`setVisibleRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# setvisiblerange) method.
    
    
    widget.activeChart().setVisibleRange(  
        { from: Date.UTC(2023, 6, 12, 13, 30) / 1000 },  
        { applyDefaultRightMargin: true }  
    )  
    

### Execute action by IDâ

The [`executeActionById`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# executeactionbyid) method allows you to trigger specific actions programmatically through the API. This is useful for customizing UI or replicating built-in functionality with custom components. For example, you can replace built-in [top toolbar](/charting-library-docs/latest/ui_elements/# top-toolbar) buttons with custom ones or trigger actions for hidden UI elements.
    
    
    widget.activeChart().executeActionById("chartReset");  
    

Click to reveal the list of the `ChartActionId` types.

Action ID| Purpose  
---|---  
`"chartProperties"`| Opens the _Chart settings_ dialog.  
`"compareOrAdd"`| Opens or hides the [_Compare symbol_](/charting-library-docs/latest/ui_elements/indicators/# add-and-compare-new-series) dialog.  
`"scalesProperties"`| Opens or hides the _Chart settings_ dialog.  
`"paneObjectTree"`| Opens the Object tree on the [widget bar](/charting-library-docs/latest/ui_elements/# widget-bar).  
`"insertIndicator"`| Opens or hides a dialog for adding [indicators](/charting-library-docs/latest/ui_elements/indicators/).  
`"symbolSearch"`| Opens the [_Symbol Search_](/charting-library-docs/latest/ui_elements/Symbol-Search) dialog.  
`"changeInterval"`| Opens a dialog for changing [resolution](/charting-library-docs/latest/core_concepts/Resolution).  
`"timeScaleReset"`| Resets the [time scale](/charting-library-docs/latest/ui_elements/Time-Scale) to its default state.  
`"chartReset"`| Resets the [chart](/charting-library-docs/latest/ui_elements/Chart) view to its default state.  
`"seriesHide"`| Hides the selected series on the chart.  
`"studyHide"`| Hides the selected [indicator](/charting-library-docs/latest/ui_elements/indicators/) on the chart.  
`"lineToggleLock"`| Enables or disables the _Lock/Unlock_ button in the floating toolbar of the selected [drawing](/charting-library-docs/latest/ui_elements/drawings/).  
`"lineHide"`| Hides the selected [drawing](/charting-library-docs/latest/ui_elements/drawings/) on the chart.  
`"scaleSeriesOnly"`| Enables or disables the _Scale price chart only_ option for the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"drawingToolbarAction"`| Opens or hides the [drawing toolbar](/charting-library-docs/latest/ui_elements/# drawing-toolbar).  
`"stayInDrawingModeAction"`| Enables or disables the _Stay in drawing_ mode.  
`"hideAllMarks"`| Shows or hides all [marks](/charting-library-docs/latest/ui_elements/Marks) on the chart.  
`"showCountdown"`| Enables or disables _Countdown to bar close_ option for the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"showSeriesLastValue"`| Shows or hides the series's last value on the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"showSymbolLabelsAction"`| Shows or hides the symbol's label on the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"showStudyLastValue"`| Shows or hides the indicator's last value on the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"showStudyPlotNamesAction"`| Shows or hides the indicator's label on the [price scale](/charting-library-docs/latest/ui_elements/Price-Scale).  
`"undo"`| Undoes the last applied action.  
`"redo"`| Redoes the last undone action.  
`"paneRemoveAllStudiesDrawingTools"`| Removes all [indicators](/charting-library-docs/latest/ui_elements/indicators/) and [drawings](/charting-library-docs/latest/ui_elements/drawings/) from the chart.  
`"showSymbolInfoDialog"`| Opens the _Security info_ dialog.  
  
### Manage drawings and indicatorsâ

You can create and manage drawings/indicators using methods like [`createStudy`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy), [`getAllShapes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# getallshapes), [`getShapeById`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# getshapebyid), [`removeAllStudies`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# removeallstudies), and others. For example, the code sample below adds the _Vertical line_ drawing on the chart using the [`createShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createshape) method.
    
    
    widget.activeChart().createShape(  
        { time: 1514764800 },  
        { shape: 'vertical_line' }  
    );  
    

### Gettersâ

You can get information about the current chart settings using methods like [`symbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# symbol), [`chartType`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# charttype), [`getVisibleRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# getvisiblerange), and others. For example, the code sample below gets the current resolution using the [`resolution`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# resolution) method.
    
    
    console.log(widget.activeChart().resolution());  
    

You can also use chart methods to get objects that provide API to perform certain operations. For example:

  * [`getSeries`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# getseries) returns [`ISeriesApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi) that allows you to interact with a [series](/charting-library-docs/latest/getting_started/glossary# series).
  * [`selection`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# selection) returns [`ISelectionApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISelectionApi) that allows you to select drawings and indicators.
  * [`getTimezoneApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# gettimezoneapi) returns [`ITimezoneApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimezoneApi) that allows you to manage the chart's time zone.

### Trading primitivesâ

caution

Starting from version 29, the methods for creating trading primitives are only available in [Trading Platform].

You can create an order/position line and trade execution using the corresponding [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline), [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline), [`createExecutionShape`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createexecutionshape) methods. Refer to [Trading Primitives](/charting-library-docs/latest/trading_terminal/Trading-Primitives) for more information.

For example, the code sample below adds a new order line on the chart using the [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline) method.
    
    
    widget.activeChart().createOrderLine()  
        .setTooltip("Additional order information")  
        .setModifyTooltip("Modify order")  
        .setCancelTooltip("Cancel order")  
        .onMove(function() {  
            this.setText("onMove called");  
        })  
        .onModify("onModify called", function(text) {  
            this.setText(text);  
        })  
        .onCancel("onCancel called", function(text) {  
            this.setText(text);  
        })  
        .setText("STOP: 73.5 (5,64%)")  
        .setQuantity("2");  
    


---

## Toolbars | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Toolbars*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Toolbars

On this page

# Toolbars

## Overviewâ

The term **toolbars** relates to several [UI elements](/charting-library-docs/latest/ui_elements/).

  * [Top toolbar](/charting-library-docs/latest/ui_elements/# top-toolbar) isÂ a primary bar at the top of the chart that contains elements such as Symbol Search, Indicators, and Resolutions.
  * [Drawing toolbar](/charting-library-docs/latest/ui_elements/drawings/) is a left-side bar that contains drawings.
  * [Widget bar](/charting-library-docs/latest/ui_elements/# widget-bar) is a right-side bar available in [Trading Platform](/charting-library-docs/latest/trading_terminal/) only. This toolbar displays the Watchlist, Details, and News widgets.
  * [Time frame toolbar](/charting-library-docs/latest/ui_elements/Time-Scale# time-frame-toolbar) is a bottom bar that displays time period buttons.

info

For detailed information on customizing specific toolbar elements, refer to dedicated sections of the [UI elements](/charting-library-docs/latest/ui_elements/) and [Featuresets](/charting-library-docs/latest/customization/Featuresets) articles.

## Custom buttons in top toolbarâ

You can add your own buttons to the top toolbar using the following methods:

  * [`createButton`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createbutton) â creates a customizable button. This method provides maximum flexibility since it returns an HTML element (if `useTradingViewStyle` is `false`), which you can customize in any way you want. For example, you can create a checkbox or a dropdown menu.
  * [`createDropdown`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createdropdown) â creates a dropdown menu. Use this method for a simpler dropdown menu when you don't require custom HTML.

Note that other toolbars do not currently support custom button placement using these methods.

tip

Check out the [How to add custom button to top toolbar](/charting-library-docs/latest/tutorials/add-custom-button-to-top-toolbar) guide for a hands-on understanding.

### Accessible buttonsâ

Custom buttons, created using the [`createButton`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createbutton) overload with `useTradingViewStyle` set to `true`, support [accessible keyboard navigation](/charting-library-docs/latest/getting_started/accessibility# keyboard-navigation).

## Change toolbar styleâ

The library offers two ways to change the toolbar style:

  * [Using custom themes API](/charting-library-docs/latest/customization/styles/custom-themes)
  * [Using CSS color themes](/charting-library-docs/latest/customization/styles/CSS-Color-Themes)



---

## Symbol Search | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Symbol Search

On this page

# Symbol Search

The _Symbol Search_ is a button on the top toolbar that opens a dialog containing a search box. _Symbol Search_ is used to search and display instruments that match the entered full or partial instrument name.

![Symbol Search](/charting-library-docs/assets/images/symbol-search-e79de6b6f6b1aa0f9eaba08da963bdcb.gif)

## Display symbolsâ

The way symbols appear in the _Symbol Search_ depends on how you provide the data.

  * If you use the built-in [UDF adapter](/charting-library-docs/latest/connecting_data/UDF), you can either implement a symbol [group request](/charting-library-docs/latest/connecting_data/UDF# symbol-group-request) or a [single request](/charting-library-docs/latest/connecting_data/UDF# symbol-search). The first method is suitable when you have a short list of symbols.
  * If you implement a custom datafeed via [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/), use the [`searchSymbols`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# searchsymbols) method.

## Hide Symbol Searchâ

If you do not want users to change the displayed instrument, you can hide the _Symbol Search_. To do this, include the `header_symbol_search` [featureset](/charting-library-docs/latest/customization/Featuresets) in the [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array.

## Set request delayâ

If you want to reduce the number of search requests when users enter symbol names in the search box, you can set a request delay in milliseconds. To do this, use the [`symbol_search_request_delay`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol_search_request_delay) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). You can check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=727s) on YouTube for an implementation example.

## Override symbol namesâ

Sometimes symbol names can be too long/short or implicitly reflect the meaning of the symbol name. In these cases, you can use the [`symbol_search_complete`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# symbol_search_complete) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). This property overrides the entered symbol name with whatever human-friendly form you want. The overridden symbol name will then be requested by your server and plotted.

You can check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=3606s) on YouTube for an implementation example.

## Case-insensitive searchâ

By default, all letters that users type are displayed in uppercase. To allow case-insensitive search, disable the [`uppercase_instrument_names`](/charting-library-docs/latest/customization/Featuresets# uppercase_instrument_names) featureset.

## Filtersâ

When users click _Symbol Search_ , the search dialog appears. The widget has predefined optional filters by symbol type and exchange. To use them, pass a [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) object with the [`symbols_types`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# symbols_types) and [`exchanges`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# exchanges) properties as a parameter to the callback of the [`onReady`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# onready) method.

## Symbol groupingâ

The search dialog can display symbols grouped by a root name. For example, to group futures `ABC2023`, `ABC2024`, and `ABC2025` by the root name `ABC`, provide a regular expression to the library. The expression should consist of two capture groups, where the first is the root name and the second is the expiration date.

To enable grouping, provide an object with regular expressions to parse symbol names in the [`symbols_grouping`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# symbols_grouping) property of the [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) interface. Then pass the `DatafeedConfiguration` object as a parameter to the callback of the [`onReady`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# onready) method.

## Display logosâ

If you want to display logos for symbols and exchanges within the search results, follow the steps below:

  1. Enable the corresponding [featuresets](/charting-library-docs/latest/customization/Featuresets): `show_symbol_logos` and `show_exchange_logos`.
  2. Provide URLs for symbols and exchanges in the [`logo_urls`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem# logo_urls) and [`exchange_logo`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem# exchange_logo) properties of the [`SearchSymbolResultItem`](/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem) object. Pass the object as a parameter to the callback of the [`searchSymbols`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# searchsymbols) method.

## Enable spread operatorsâ

**Spread operators** are operators that allow comparison between a financial instrument, such as a stock, and an additional variable, such as another financial instrument or a numerical value.

caution

The library does not handle the spread calculations, you should perform them on your server. For example, when users enter "APPL-TSLA", the [datafeed](/charting-library-docs/latest/connecting_data/datafeed-api/) is called with the `AAPL-TSLA` symbol name. The library expects your datafeed to resolve the symbol information and return the relevant data.

To display spread operators in the _Symbol Search_ , include the [`show_spread_operators`](/charting-library-docs/latest/customization/Featuresets# show_spread_operators) featureset in the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) array.

![Spread operators in the Search Symbol](/charting-library-docs/assets/images/spread-operators-in-symbol-search-3f22b21208e93e762524ef686828ce89.png)


---

## Legend | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Legend

On this page

# Legend

Legend is a list of series and indicators at the top-left corner of any chart. Note that the legend position cannot be changed.

![Legend](/charting-library-docs/assets/images/legend-overview-589e075d0acfbee82e1827ff021a6366.gif)

## Configure legendâ

In the _Chart settings â Status line_ dialog, users can configure the legend.

![Chart settings](/charting-library-docs/assets/images/legend-chart-settings-ba5635efa6a732d07c7112aac491d3f8.png)

### Symbol logosâ

If you want to display logos for symbols within the legend, follow the steps below:

  1. Enable the [`show_symbol_logos`](/charting-library-docs/latest/customization/Featuresets# show_symbol_logos) and [`show_symbol_logo_in_legend`](/charting-library-docs/latest/customization/Featuresets# show_symbol_logo_in_legend) featuresets. The _Logo_ option appears in the settings dialog.
  2. Provide URLs for symbols in the [`logo_urls`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# logo_urls) property of the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. Pass the object as a parameter to the callback of the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method.

### Open market statusâ

By default, the library displays the current [market status](/charting-library-docs/latest/ui_elements/Symbol-Status) as an icon within the legend for the main series of the chart. You can hide the market status by adding the [`display_market_status`](/charting-library-docs/latest/customization/Featuresets# display_market_status) featureset to the [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array.

### Titleâ

In the _Title_ drop-down, users can select what title to display in the legend:

  * Description
  * Ticker
  * Ticker and description

You can also set the title using the [Overrides API](/charting-library-docs/latest/customization/overrides/). For example, the code sample below sets ticker as the legend title.
    
    
    chartApi.applyOverrides({ "mainSeriesProperties.statusViewStyle.symbolTextSource": "ticker" })  
    

### Last day change valuesâ

info

Last day change can be displayed in Trading Platform only as it requires quote data.

Last day change is a parameter represented by two values: daily change and percentage daily change. You should specify these values in the [`ch`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedQuoteValues# ch) and [`chp`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedQuoteValues# chp) properties of `DatafeedQuoteValues` and pass them to the library when it calls [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes).

Last day change is displayed in _Data Window_ on the right toolbar. You can also add this parameter to the chart legend using the [overrides](/charting-library-docs/latest/customization/overrides/):
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "paneProperties.legendProperties.showLastDayChange": true,  
        }  
    });  
    

Users can toggle the _Last day change values_ option in the _Chart settings_ dialog to change the last day change visibility in the legend. This option is hidden by default. To display it, you should enable one of the following featuresets:

  * [`legend_last_day_change`](/charting-library-docs/latest/customization/Featuresets# legend_last_day_change) â adds the extra _Last day change values_ option to the _Chart settings_ dialog.
  * [`show_last_price_and_change_only_in_series_legend`](/charting-library-docs/latest/customization/Featuresets# show_last_price_and_change_only_in_series_legend) â adds the last day change to the legend and hides the OHLC values. Also, the extra _Last day change values_ option appears in the _Chart settings_ dialog.

### Resolutionâ

To disable resolution changing in the Legend, use the [`legend_inplace_edit`](/charting-library-docs/latest/customization/Featuresets# legend_inplace_edit) featureset. If you want to completely remove the _Resolution_ button from the _Legend_ , use the [`hide_resolution_in_legend`](/charting-library-docs/latest/customization/Featuresets# hide_resolution_in_legend) featureset.

![Remove resolution from Legend](/charting-library-docs/assets/images/no-resolution-legend-d2ff263da43b9adaccb9f03d4c14f1a3.png)

## Visibility customizationâ

You can use [featuresets](/charting-library-docs/latest/customization/Featuresets) or [overrides](/charting-library-docs/latest/customization/overrides/) to customize the legend's visibility such as hiding or displaying particular legend elements. The sections below describe customization via featuresets. For more information about override properties that affect the legend, refer to [Legend](/charting-library-docs/latest/customization/overrides/chart-overrides# legend).

### Hide legendâ

You can hide the legend widget from the chart. To do this, include the `legend_widget` [featureset](/charting-library-docs/latest/customization/Featuresets) in the [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array.

![Disable legend](/charting-library-docs/assets/images/legend-hide-widget-3dd01451f395dfc5103ec54c4af6d01e.png)

### Hide legend buttonsâ

You can hide all legend buttons by including the `edit_buttons_in_legend` in [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features). Besides, disabling `show_hide_button_in_legend`, `format_button_in_legend`, or `delete_button_in_legend` allows customizing particular legend buttons. For example, the _Settings_ button is hidden in the image below.

![Hide settings button](/charting-library-docs/assets/images/legend-hide-settings-button-ea0b509607eabb58e03b821aa1f09a22.png)

### Hide context menuâ

When right-clicking the legend, you can access the context menu. To disable this feature, include `legend_context_menu` in [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features).

![Hide context menu](/charting-library-docs/assets/images/legend-context-menu-c540f1b35be76b429f05e5fcf6314aa4.png)

## Price formattingâ

Prices are formatted according to the `pricescale`, `minmov`, `minmove2`, `fractional`, and `variable_tick_size` properties specified in the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. For more information, refer to the [Price format](/charting-library-docs/latest/connecting_data/Symbology# price-format) section.

You can also apply custom formatting using the [`numeric_formatting`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# numeric_formatting) property of [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).
    
    
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),  
        symbol: "AAPL",  
        interval: "1D",  
        numeric_formatting: { decimal_sign: "," },  
    })  
    

In the code sample above, the comma separates the decimal/fractional part of the price.

![Numeric formatting](/charting-library-docs/assets/images/legend-numeric-formatting-89279aeecf4432504fdc3f71267a581f.png)

## NaN values in legendâ

If `NaN` values appear in the legend instead of the expected data, ensure that you have implemented the [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes) and [`subscribeQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# subscribequotes) methods of the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/). This issue appears in [mobile applications](/charting-library-docs/latest/mobile_specifics/) when running outside of tracking mode. Outside this mode, the legend shows only three values: the closing price, price change, and price change percentage. The library retrieves these values from the [`getQuotes`](/charting-library-docs/latest/connecting_data/datafeed-api/trading-platform-methods# getquotes) request, otherwise, it displays `NaN`.

Note that open, high, and low prices and indicator values are displayed in the tracking mode only. To activate this mode, users should long tap on the chart. A single tap on the chart exits this mode.

## Display delayed data informationâ

Follow the steps below to enable the _Data is delayed_ section in the legend:

  1. Add the [`display_data_mode`](/charting-library-docs/latest/customization/Featuresets# display_data_mode) featureset to the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) array of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) object.
  2. Provide the following properties in the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. Pass this object as a parameter to the callback of the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method.
     * [`data_status`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# data_status) â specify `"delayed_streaming"`.
     * [`delay`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# delay) â specify delay in seconds.

The image below shows the _Data is delayed_ section and the _D_ icon in the legend.

![Data is delayed](/charting-library-docs/assets/images/data-is-delayed-741f2420c57908102a90defe6f7294c6.png)


---

## Time zones | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/timezones*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Time zones

On this page

# Time zones

## Supported time zonesâ

We expect to get the name of the time zone in the OlsonDB format. Time zone should be defined within the [`timezone`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# timezone) property for Symbol information.

_Supported time zones are:_

  * `Etc/UTC`
  * `Africa/Cairo`
  * `Africa/Casablanca`
  * `Africa/Johannesburg`
  * `Africa/Lagos`
  * `America/Anchorage`
  * `America/Argentina/Buenos_Aires`
  * `America/Bogota`
  * `America/Caracas`
  * `America/Chicago`
  * `America/El_Salvador`
  * `America/Juneau`
  * `America/Lima`
  * `America/Los_Angeles`
  * `America/Mexico_City`
  * `America/New_York`
  * `America/Phoenix`
  * `America/Santiago`
  * `America/Sao_Paulo`
  * `America/Toronto`
  * `America/Vancouver`
  * `Asia/Astana`
  * `Asia/Ashkhabad`
  * `Asia/Bahrain`
  * `Asia/Bangkok`
  * `Asia/Chongqing`
  * `Asia/Colombo`
  * `Asia/Dhaka`
  * `Asia/Dubai`
  * `Asia/Ho_Chi_Minh`
  * `Asia/Hong_Kong`
  * `Asia/Jakarta`
  * `Asia/Jerusalem`
  * `Asia/Karachi`
  * `Asia/Kathmandu`
  * `Asia/Kolkata`
  * `Asia/Kuala_Lumpur`
  * `Asia/Kuwait`
  * `Asia/Manila`
  * `Asia/Muscat`
  * `Asia/Nicosia`
  * `Asia/Qatar`
  * `Asia/Riyadh`
  * `Asia/Yangon`
  * `Asia/Seoul`
  * `Asia/Shanghai`
  * `Asia/Singapore`
  * `Asia/Taipei`
  * `Asia/Tehran`
  * `Asia/Tokyo`
  * `Atlantic/Azores`
  * `Atlantic/Reykjavik`
  * `Australia/Adelaide`
  * `Australia/Brisbane`
  * `Australia/Perth`
  * `Australia/Sydney`
  * `Europe/Athens`
  * `Europe/Belgrade`
  * `Europe/Berlin`
  * `Europe/Bratislava`
  * `Europe/Brussels`
  * `Europe/Bucharest`
  * `Europe/Budapest`
  * `Europe/Copenhagen`
  * `Europe/Helsinki`
  * `Europe/Istanbul`
  * `Europe/London`
  * `Europe/Luxembourg`
  * `Europe/Madrid`
  * `Europe/Moscow`
  * `Europe/Oslo`
  * `Europe/Paris`
  * `Europe/Prague`
  * `Europe/Riga`
  * `Europe/Rome`
  * `Europe/Stockholm`
  * `Europe/Tallinn`
  * `Europe/Vienna`
  * `Europe/Vilnius`
  * `Europe/Warsaw`
  * `Europe/Zurich`
  * `Pacific/Auckland`
  * `Pacific/Chatham`
  * `Pacific/Fakaofo`
  * `Pacific/Honolulu`
  * `Pacific/Norfolk`
  * `US/Mountain`

If your time zone is not supported, you can request it on [GitHub Issues](https://github.com/tradingview/charting_library/issues "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) or add your custom time zone.

## Adding custom time zonesâ

Additional custom time zones can be specified for use within the library. These time zones can be selected from the time zone menu, chart settings, and can be used by symbols for their time zone.

Custom time zones are required to be either mapped (aliased) to a supported time zone (see list above) or to a GMT based time zone.

warning

You should ensure that the alias time zone correctly matches your desired time zone in all aspects (including daylight saving time dates).

Custom time zones are specified within the widget constructor options with the [`custom_timezones`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_timezones) property.

### GMT based time zonesâ

In addition to the default supported time zones, you can also alias your custom time zone to GMT based time zone. These time zones can only be used for the `alias` property of a custom time zone.

The format of the GMT based time zone ids is as follows:

  * Starts with `Etc/GMT`
  * followed by either a `-` or `+` sign
  * the number of hours offset
  * and (optionally) the minutes after a colon.

**Examples:**

  * `Etc/GMT+0` : same as `Etc/UTC`
  * `Etc/GMT+2` : 2 hours behind GMT
  * `Etc/GMT-4` : 4 hours ahead of GMT
  * `Etc/GMT-3:21` : 3 hours and 21 minutes ahead of GMT

**Note:** In order to conform with theÂ [POSIX](https://en.wikipedia.org/wiki/POSIX)Â style, the zone names have their sign reversed from the standardÂ [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601# Time_offsets_from_UTC)Â convention. In the "Etc/" area, zones west of GMT have a positive sign and those east have a negative sign in their name (e.g "Etc/GMT-14" is 14 hours ahead of GMT).

### Exampleâ

As an example, we are going to:

  * add Cape Town as a custom time zone which will be aliased to the existing time zone of Johannesburg.
  * add Nuuk as a custom time zone which will be aliased to a GMT based time zone.

    
    
    var widget new TradingView.widget({  
     /* ... Other constructor options */  
      
     custom_timezones: [  
        {  
          id: 'Africa/Cape_Town',  
          alias: 'Africa/Johannesburg',  
          title: 'Cape Town',  
        },  
        {  
          id: 'America/Nuuk',  
          alias: 'Etc/GMT+3',  
          title: 'Nuuk',  
        },  
     ],  
    }));  
    


---

## Price scale | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Price scale

On this page

# Price scale

**Price scale** (or price axis) is a vertical scale on the right or left side of the chart that maps prices to coordinates and vice versa.

![Price scale](/charting-library-docs/assets/images/price-scale-2df66cd5c629858b0eff237d4d973796.png)

## UI interactionsâ

This section describes how users can interact with the price scale.

### Adding price scaleâ

Users can add new price scales via the [_Compare symbol_](/charting-library-docs/latest/ui_elements/indicators/# add-and-compare-new-series) dialog by selecting _New price scale_.

![Add new price scale](/charting-library-docs/assets/images/add-new-price-scale-e41df4d21863740fd1986c1c84071b4a.gif)

info

The library allows users to have up to eight price scales on the chart. However, only one price scale can be displayed on [mobile applications](/charting-library-docs/latest/mobile_specifics/).

### Changing positionâ

Users can place the price scale on the left or right side of the chart. To do this, they should select the _Move scale to left/right_ button in the context menu of the price scale.

![Change price scale position](/charting-library-docs/assets/images/move-scale-to-left-5f5a2139dd120390a736f6f02c29a4a7.gif)

You can also programmatically change a price scale position.

### Pinning to scaleâ

Users can select _Pin to scale_ in the symbol/indicator settings to attach symbols/indicators to the price scale.

![Pin to scale](/charting-library-docs/assets/images/pin-to-scale-824f25927e7ad9bb7c8d0b56386d83df.gif)

You can also programmatically add a new indicator and attach it to a new price scale.

### Inverting price scaleâ

Users can invert the scale via _Invert scale_ in the context menu of the price scale. When the option is enabled, the price increase is shown from top to bottom.

![Invert price scale](/charting-library-docs/assets/images/invert-price-scale-ea2f11732ad2e9a5044a83279a294720.gif)

### Resetting price scaleâ

Users can reset the price scale when it is in a non-default state. Note that the _Reset price scale_ option will not appear in the context menu with adjustments such as moving the scale to the left or switching to logarithmic mode.

![Reset price scale](/charting-library-docs/assets/images/reset-price-scale-ffca478582b6c29efe01996e61b6f57a.gif)

### Quick tradingâ

info

This feature is only available in [Trading Platform](/charting-library-docs/latest/trading_terminal/).

By default, the price scale includes a _Plus_ button. When users click this button, a context menu opens, allowing them to quickly access trading options. Note that this menu will be empty unless you implement the [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api).

![Plus button on the price scale](/charting-library-docs/assets/images/plus-button-price-scale-5b8f35a3c2b7372125c0a668b1e12a2f.gif)

To detect when the user clicks the _Plus_ button, you can listen for the [`onPlusClick`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# onplusclick) event.

You can disable this button by adding the [`chart_crosshair_menu`](/charting-library-docs/latest/customization/Featuresets# chart_crosshair_menu) featureset to the [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array.

## Style and default settingsâ

### Customize price scale appearanceâ

You can customize the appearance of the price scale using the [Overrides API](/charting-library-docs/latest/customization/overrides/). For example, the code sample below changes the text color and font size of the price and [time](/charting-library-docs/latest/ui_elements/Time-Scale) scales.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        overrides: {  
            "scalesProperties.textColor": "# FF0000",  
            "scalesProperties.fontSize": 14,  
        }  
    })  
    

Refer to the [Scale colors and fonts](/charting-library-docs/latest/customization/overrides/chart-overrides# scale-colors-and-fonts) section to see the full list of the overrides properties.

### Change price scale positionâ

You can change the position of the price scale attached to the main series. When creating a chart, use the [`priceScaleSelectionStrategyName`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# pricescaleselectionstrategyname) property of the [Overrides API](/charting-library-docs/latest/customization/overrides/). For example, the code sample below changes the price scale position to the left.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        overrides: {  
            "priceScaleSelectionStrategyName": "left",  
        }  
    })  
    

If the chart is already created, use the [`changePriceScale`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi# changepricescale) method of the [`ISeriesApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi) interface. For example, the code sample below also changes the price scale position of the main series to the left.
    
    
    widget.onChartReady(() => {  
        widget.activeChart().getSeries().changePriceScale("new-left");  
    });  
    

### Attach indicators to price scaleâ

You can attach [indicators](/charting-library-docs/latest/ui_elements/indicators/) to the price scale. To do this, specify the [`priceScale`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateStudyOptions# pricescale) property in the `options` parameter of the [`createStudy`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) method. For example, the code sample below creates a _Volume_ indicator and attaches it to a new price scale on the left.
    
    
    widget.onChartReady(() => {  
        widget.activeChart().createStudy('Volume', false, false, undefined, undefined, { "priceScale": "new-left" });  
    });  
    

### Hide price scaleâ

If you want to hide the price scale when all series or indicators attached to it are hidden, enable the [`hide_price_scale_if_all_sources_hidden`](/charting-library-docs/latest/customization/Featuresets# hide_price_scale_if_all_sources_hidden) featureset.

### Hide settings buttonâ

The scale settings button is available directly below the price scale. If users have more than one price scale on the chart, a letter will be displayed in place of the settings button. Users should click the letter that indicates the scale to open the corresponding scale settings. If you want to hide the settings button, disable the [`main_series_scale_menu`](/charting-library-docs/latest/customization/Featuresets# main_series_scale_menu) featureset.

### Add labelsâ

You can add labels to the price scale to display additional information like a symbol name, bid/ask prices, indicators, and more. For example, the code sample below adds a symbol name label on the price scale.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        overrides: {  
            "scalesProperties.showSymbolLabels": true,  
        }  
    })  
    

Refer to the [Labels on the scale](/charting-library-docs/latest/customization/overrides/chart-overrides# labels-on-the-scale) section to see the full list of the overrides properties.

### Enable auto scalingâ

You can enable auto scaling using the [`setAutoScale`](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi# setautoscale) method of the [Price Scale API](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi).
    
    
    widget.onChartReady(() => {  
        const priceScale = widget.activeChart().getPanes()[0].getMainSourcePriceScale();  
        priceScale.setAutoScale(true)  
    });  
    

### Set modeâ

You can set the price scale mode using the [Overrides API](/charting-library-docs/latest/customization/overrides/) or [Price Scale API](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi). However, you cannot change the price scale mode using the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method.

When creating a chart, use [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# overrides) to change the price scale mode. For example, the code sample below enables the percentage mode.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        overrides: {  
            "mainSeriesProperties.priceAxisProperties.percentage": true,  
        }  
    })  
    

Refer to the [Price scale mode](/charting-library-docs/latest/customization/overrides/chart-overrides# price-scale-mode) section to see the full list of the overrides properties.

If the chart is already created, you can change the price scale mode only using the [`setMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi# setmode) method of the [Price Scale API](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi). For example, the code sample below also enables the percentage mode.
    
    
    widget.onChartReady(() => {  
        const priceScale = widget.activeChart().getPanes()[0].getRightPriceScales()[0];  
        priceScale.setMode(2);  
    });  
    

### Set visible price rangeâ

If you want to set a visible price range of the price scale, you can use the [`setVisiblePriceRange`](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi# setvisiblepricerange) method of the [Price Scale API](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi). For example, the code sample below sets the visible price range between 140 and 170.
    
    
    widget.onChartReady(() => {  
        const priceScale = widget.activeChart().getPanes()[0].getRightPriceScales()[0];  
        priceScale.setVisiblePriceRange({ "from": 140, "to": 170 });  
    });  
    

## Price formattingâ

The [`format`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# format) property in the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object determines how prices appear on the scale. Specifying the `volume` format displays prices as decimals in thousands, millions, billions, or trillions.

If you specify the `price` format, the prices will be formatted in decimal or fractional format according to the `minmov`, `pricescale`, `minmove2`, `fractional`, `variablemintick` properties. Refer to the [Price Format](/charting-library-docs/latest/connecting_data/Symbology# price-format) section for more information.

You can also change the decimal sign for the prices or implement your custom logic of the price formatting.

### Change decimal signâ

You can apply custom formatting using the [`numeric_formatting`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# numeric_formatting) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). For example, the code sample below sets a comma to separate the decimal/fractional part of the prices.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        numeric_formatting: { decimal_sign: "," },  
    })  
    

The image below shows that the decimal parts of the prices on the price scale and the legend are separated with a comma.

![Numeric formatting](/charting-library-docs/assets/images/price-scale-numeric-formatting-da8bbd44b24de8cb585575b3cecec1e4.png)

### Use custom formattingâ

You can adjust the display format of price values using the [`custom_formatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_formatters) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). For example, the code sample below defines a custom price formatting function for the `volume` [format type](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# format). This function replaces numerical zeros with letter representations like billions (B), millions (M), and thousands (K).
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        custom_formatters: {  
            priceFormatterFactory: (symbolInfo, minTick) => {  
                if (symbolInfo === null) {  
                    return null;  
                }  
      
                if (symbolInfo.format === 'volume') {  
                    return {  
                        format: (price, signPositive) => {  
                            if (price >= 1000000000) {  
                                return `${(price / 1000000000).toFixed(3)}B`;  
                            }  
      
                            if (price >= 1000000) {  
                                return `${(price / 1000000).toFixed(3)}M`;  
                            }  
      
                            if (price >= 1000) {  
                                return `${(price / 1000).toFixed(3)}K`;  
                            }  
      
                            return price.toFixed(2);  
                        },  
                    };  
                }  
                return null; // The default formatter will be used.  
            },  
        }  
    })  
    

## Symbol currencyâ

### Display symbol currencyâ

To display symbol currency on the price scale, follow the steps below.

  1. Enable the [`pricescale_currency`](/charting-library-docs/latest/customization/Featuresets# pricescale_currency) featureset to show the _Currency_ menu in _Chart Settings â Scales_.
  2. Assign a currency code to the [`currency_code`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# currency_code) property of the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. Note that the currency code must be a three-letter string in the [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) format.

### Enable currency conversionâ

The library provides a drop-down menu for selecting the currency in which the symbol is displayed. To switch between currencies, you should implement the currency conversion. Follow the steps below to enable the currency conversion.

  1. Enable the [`pricescale_currency`](/charting-library-docs/latest/customization/Featuresets# pricescale_currency) featureset to show the _Currency_ menu in _Chart Settings â Scales_.
  2. Add the [`currency_code`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# currency_code) and [`original_currency_code`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# original_currency_code) properties to the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. Note that the currency code must be a three-letter string in the [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) format.
  3. Provide a list of available currencies in the [`currency_codes`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# currency_codes) property of the [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) object.
  4. Pass [`currencyCode`](/charting-library-docs/latest/api/interfaces/Charting_Library.SymbolResolveExtension# currencycode) to the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method.
  5. Implement the conversion algorithm. The conversion algorithms can vary, but you can choose one from the following two:
     * **Constant currency rate algorithm**. With this approach, you retrieve the current currency exchange rate and multiply each bar by this value. However, this approach may yield inaccurate results for historical bars if the exchange rate has fluctuated significantly over time.
     * **Corresponding currency rate algorithm**. With this approach, you request historical currency exchange rates from the server and then multiply each bar by its corresponding currency rate.

info

Implementing either of these algorithms is straightforward when all symbols and Forex rates share the same time zone. However, if time zones differ, you need to find an appropriate way to accurately match the corresponding rate to each bar.

After this, users can view symbol prices in their preferred currency. To switch to a different currency, users can click the currency dropâdown menu and choose another option. When a new currency is selected, the `resolveSymbol` method is called with the same `symbolInfo` but with an added `currency_code` property indicating the chosen currency.

![Hide context menu](/charting-library-docs/assets/images/currency-drop-down-menu-b61960f1893b731987c23c7fae9e2dfb.png)


---

## Time scale | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Time-Scale*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Time scale

On this page

# Time scale

**Time scale** (or time axis) is a horizontal scale at the bottom of the chart that displays the time of bars.

![Time scale](/charting-library-docs/assets/images/time-scale-3196a6556602023a8b3700cf1d833407.png)

## Time scale APIâ

You can manage the time scale using the Time scale API. For example, you can set a specific right margin or detect when the chart has been zoomed in/out. Refer to [`ITimeScaleApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ITimeScaleApi) for more information.

## Customize scale appearanceâ

You can customize the appearance of the time scale using the [Overrides API](/charting-library-docs/latest/customization/overrides/). For example, the code sample below changes the text color and font size of the time and [price](/charting-library-docs/latest/ui_elements/Price-Scale) scales.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        overrides: {  
            "scalesProperties.textColor": "# FF0000",  
            "scalesProperties.fontSize": 14,  
        }  
    })  
    

Refer to the [Scale colors and fonts](/charting-library-docs/latest/customization/overrides/chart-overrides# scale-colors-and-fonts) section to see the full list of the overrides properties.

## Date and time formattingâ

You can adjust the display format of date and time values using the [`custom_formatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_formatters) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). Check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=1466s) on YouTube for an implementation example.

## Time frame toolbarâ

Time frames are time period buttons displayed at the bottom-left corner of the chart. When users switch a time frame, it causes the following changes to satisfy the selected time frame:

  1. The chart [resolution](/charting-library-docs/latest/core_concepts/Resolution) changes.
  2. The bars scale horizontally to cover the entire requested date/time range.

For example, clicking `1Y` makes the chart switch the resolution to `1W` and scale it accordingly to display weekly bars for the entire year. Each time frame has its default chart resolution:

Time frame| Chart resolution  
---|---  
5Y| W  
1Y| W  
6M| 120  
3M| 60  
1M| 30  
5D| 5  
1D| 1  
  
### Time frame customizationâ

You can customize displayed time frames using the [`time_frames`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# time_frames) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). Note that time frames that require resolutions that are unavailable for a particular symbol will be hidden. You can also check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=2328s) on YouTube for an implementation example.

### Programmatic time frame settingâ

If you want to programmatically set the time frame for the active chart, use the [`setTimeFrame`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# settimeframe) method of the [`IChartWidgetApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi). For example, the following code snippet applies the `1Y` time frame, which is the same as when users click `1Y` at the bottom of the chart:
    
    
    const widget = new TradingView.widget(/* Widget properties */);  
      
    widget.onChartReady(() => {  
        const chart = widget.chart();  
        chart.setTimeFrame({val: {type: 'period-back', value: '12M'}, res: '1W'});  
    });  
    

## Extended time scaleâ

You can enable indicators to extend the time scale. This allows you to create custom indicators that show bars at a higher resolution than the main series. Refer to [Extending the time scale](/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale) for more information.

## Extended sessionsâ

If you want to display extended sessions for some symbols, refer to the [Extended sessions](/charting-library-docs/latest/connecting_data/Extended-Sessions) article for more information.


---

## Marks | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Marks*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Marks

On this page

# Marks

Marks allow you to display some extra information like news, bar patterns, splits/dividends, and more on the chart or time scale.

Use the [`subscribe`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# subscribe) method to handle events raised when users interact with marks. You can also [refresh](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# refreshmarks) and [clear](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# clearmarks) marks using the chart methods.

## Marks on the chartâ

Marks on the chart are circles that are attached to bars and contain a character inside. You can customize the circle size and color. If you want to display two characters (like 'ED', 'AB', 'CD', etc.), you should enable the [`two_character_bar_marks_labels`](/charting-library-docs/latest/customization/Featuresets) featureset.

One bar can have several marks. When a user clicks on the mark, the tooltip appears. The tooltip can only contain plain text. HTML code is not supported.

![Marks](/charting-library-docs/assets/images/marks-e3d4efc0469bff734c228ef715f5fd8f.png)

Marks are requested from your datafeed if you set [`supports_marks`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supports_marks) to `true`. The library calls [`getMarks`](/charting-library-docs/latest/connecting_data/datafeed-api/additional-methods# getmarks) or requests [/marks](/charting-library-docs/latest/connecting_data/UDF# marks) to get mark data for the visible data range.

## Marks on the time scaleâ

Marks on the time scale are figures above the time scale. Each mark has a character inside and a pop-up tooltip with information strings. The tooltip does not support HTML code. You can specify a time scale mark shape using the [`shape`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark# shape) property. Images can be displayed within time scale marks by providing an image URL in the [`imageUrl`](/charting-library-docs/latest/api/interfaces/Charting_Library.TimescaleMark# imageurl) property.

![Timescale marks](/charting-library-docs/assets/images/timescale_marks-2591c5f6c3081fd416fe559667eb3efb.png)

Time scale marks are requested from your datafeed if you set [`supports_timescale_marks`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration# supports_timescale_marks) to `true`. The library calls [`getTimescaleMarks`](/charting-library-docs/latest/connecting_data/datafeed-api/additional-methods# gettimescalemarks) or requests [/timescale_marks](/charting-library-docs/latest/connecting_data/UDF# timescale-marks) to get mark data for the visible data range.


---

## Context menu | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/context-menu*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Context menu

On this page

# Context menu

The **context menu** is a dialog that users access through a right-mouse-click or ellipsis menu (â¦).

## Override context menuâ

You can override the default items in the context menu in two ways:

  * using Widget Constructor
  * using API

info

Both approaches override all context menus. If you only want to override specific menus, you should implement your own filtering logic for that particular use case.

### Using Widget Constructorâ

You can register a custom function for overriding default items when the context menu is created. To do this, use the [`context_menu`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# context_menu) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). `context_menu` has two properties:

  * [`items_processor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# items_processor) allows you to modify the items displayed in the context menu. For example, you can provide a function that adds new items and removes or reorders existing ones. The library calls this function each time users want to display the context menu. This function should return an array of items to display.

  * [`renderer_factory`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# renderer_factory) allows you to override the default renderer for the context menu so you can adjust existing menu items.

tip

You can also use the `context_menu` property to retrieve a list of items in the menu. Check out the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=3715s) on YouTube for an implementation example.

#### Examplesâ

The code sample below shows how to add a new item to the context menu using [`items_processor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# items_processor).

See the Pen [ UI. Add new button to context menu](https://codepen.io/tradingview/pen/NWJddbz) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

The code sample below shows how to adjust existing items of the context menu using [`renderer_factory`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# renderer_factory).

See the Pen [ UI. Adjust context menu items](https://codepen.io/tradingview/pen/OJqWgQZ) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

#### Determine evoked menuâ

Both [`items_processor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# items_processor) and [`renderer_factory`](/charting-library-docs/latest/api/interfaces/Charting_Library.ContextMenuOptions# renderer_factory) provide menu names and the associated IDs for items like series, drawings, indicators, orders, and positions. You can determine which menu was triggered using the properties of the [`CreateContextMenuParams`](/charting-library-docs/latest/api/interfaces/Charting_Library.CreateContextMenuParams) interface.

### Using APIâ

If you want to change the menu dynamically, use the [`onContextMenu`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# oncontextmenu) method.
    
    
    widget.onChartReady(function() {  
        widget.onContextMenu(function(unixtime, price) {  
            return [{  
                position: "top",  
                text: "First top menu item, time: " + unixtime + ", price: " + price,  
                click: function() { alert("First item clicked."); }  
            },  
            { text: "-", position: "top" }, // Adds a separator between buttons  
            { text: "-Paste" },             // Removes the existing item from the menu  
            {  
                position: "top",  
                text: "Second top menu item 2",  
                click: function() { alert("Second item clicked."); }  
            }, {  
                position: "bottom",  
                text: "Bottom menu item",  
                click: function() { alert("Third item clicked."); }  
            }];  
        });  
    });  
    


---

## Panes and Scales Behavior | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Panes-And-Scales-Behavior*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Panes and Scales Behavior

On this page

# Panes and Scales Behavior

## Panes and scales behaviorâ

Here is the detailed description of how panes and scales work when creating a study.

First of all, all studies are divided into 2 groups: "price" studies and "non-price" studies. Examples of price studies are "moving average" and "bollinger bands". The result of such studies has the same dimension as their input source. Price studies are placed by default on the same pane as their source and pinned to the same price scale. By contrast, the result of non-price studies has a different dimension. For example, Stochastic always returns values from 0 to 100. Non-price studies are placed by default to a separate pane.

  * You can change the default pane of the study using `forceOverlay`. If it's set to true, the study is placed on the main pane (pane with the main series). This option doesn't affect the default price scale. This flag is applied to non-price studies only. There is no way to place a price study on a separate pane by default at this time.
  * You can change the default price scale using `priceScale`. If it is not set, then the chart behaves as described above. `no-scale` sets "No scale" (full-screen) mode for the study. `new-left` and `new-right` always places the study on a new price scale, even while placing a price study. `as-series` option always places the study on the same price scale that the main series are attached to.

The following table illustrates this

Value| Price Study or Non-Price Study with force_overlay=true| Non-Price Study with force_overlay=false  
---|---|---  
new-left| place on a new left scale of the main pane| place on a new left scale of a new pane  
new-right| place on a new right scale of the main pane| place on a new right scale of a new pane  
no-scale| place as "no scale" on the main pane| place as "no scale" on a new pane  
as-series| place on the same price scale as the main series| place on a separate pane on the right price scale


---

## Snapshots | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Snapshots*

  * [](/charting-library-docs/)  
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Snapshots

On this page

# Snapshots

The library allows users to take chart snapshots. The _Take a snapshot_ button is located on the top toolbar. By clicking the button, users can select one of the available options.

![Take snapshot menu](/charting-library-docs/assets/images/take-snapshot-90b84d9a7be10beed65838b52be1de34.gif)

If you want snapshots to include orders, positions, and executions, enable the [`snapshot_trading_drawings`](/charting-library-docs/latest/customization/Featuresets# snapshot_trading_drawings) featureset.

## Snapshot storageâ

All snapshots are stored on the TradingView servers. The data storage period is not limited in time. If you want to save snapshots on your server, use the [`snapshot_url`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# snapshot_url) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). Your server should have an endpoint that accepts POST requests and returns saved image URLs to the library.

## Hide buttonâ

Disable the [`header_screenshot`](/charting-library-docs/latest/customization/Featuresets# header_screenshot) featureset to hide the snapshot button.

## Remove button optionsâ

When users click _Take a snapshot_ , the menu with several options appears. If you want to hide some options, use custom CSS defined within the [`custom_css_url`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_css_url) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). The example below shows how to keep only two options in the menu: _Download image_ and _Copy image_.

See the Pen [ UI. Remove options from Snapshots menu](https://codepen.io/tradingview/pen/oNVZZrM) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Implement your logicâ

If you want to implement your logic for taking snapshots, use the [`takeClientScreenshot`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# takeclientscreenshot) method. This method creates a snapshot of the chart and returns it as a canvas. You can then take the canvas element and create an image from it. The code sample below saves a snapshot as a PNG.
    
    
    async function saveChartToPNG() {  
      const screenshotCanvas = await widget.takeClientScreenshot();  
      const linkElement = document.createElement('a');  
      linkElement.download = 'screenshot';  
      linkElement.href = screenshotCanvas.toDataURL(); // Alternatively, use `toBlob` which is a better API  
      linkElement.dataset.downloadurl = ['image/png', linkElement.download, linkElement.href].join(':');  
      document.body.appendChild(linkElement);  
      linkElement.click();  
      document.body.removeChild(linkElement);  
    }  
    saveChartToPNG(); // Call the screenshot function  
    

Additionally, you can configure snapshot parameters listed in [`ClientSnapshotOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.ClientSnapshotOptions). To do this, specify the desired parameters and pass them to [`takeClientScreenshot`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# takeclientscreenshot). For example, you can hide indicators from the legend with `hideStudiesFromLegend`:
    
    
    const screenshotCanvas = await widget.takeClientScreenshot({ hideStudiesFromLegend: true });  
    


---

## Market Status | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/market-status*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Market Status

On this page

# Market Status

**Market Status** is a pop-up that contains information on the symbol trading session and current market status. Users should click the icon within the [_Legend_](/charting-library-docs/latest/ui_elements/Legend) to open this pop-up.

![Market Status](/charting-library-docs/assets/images/market-status-example-ef63a72532b30d3e20db32e92ba7e380.png)

## Session timelineâ

The timeline in the pop-up depends on the session configuration for the current symbol. If the Market Status shows incorrect data, make sure you specified session correctly in the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. For more information, refer to the [Session](/charting-library-docs/latest/connecting_data/Symbology# session) and [Extended sessions](/charting-library-docs/latest/connecting_data/Symbology# extended-sessions) sections.

Note that the Market Status displays market hours in the **exchange time zone**.

## Customize the pop-upâ

### Change textâ

You can specify the [`custom_translate_function`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_translate_function) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) to change the default text in the pop-up.
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        custom_translate_function: (key, options, isTranslated) => {  
            console.log('key: ', key);  
            if (key === "Market closed") {  
                return "The market is closed. Check back later.";  
            }  
            return null;  
        },  
    }));  
    

### Add custom sectionâ

You can display additional information, such as warnings, in the Market Status for a certain symbol. To do this, use the methods from [`ICustomSymbolStatusApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomSymbolStatusApi) that allows you to customize an icon, color, tooltip, and content of the pop-up. To retrieve an `ICustomSymbolStatusApi` object, call the [`customSymbolStatus`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# customsymbolstatus) method at any time after the chart is created.

Consider the following code sample that specifies additional section for AAPL.

![Custom Market Status](/charting-library-docs/assets/images/custom-status-example-3fd07217ff275acd89ff43d428744646.png)
    
    
    // Icon from https://heroicons.com  
    const myCustomIconSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">  
    <path fill-rule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z" clip-rule="evenodd" />  
    </svg>`;  
      
    widget  
        .customSymbolStatus()  
        .symbol('NASDAQNM:AAPL') // Select the symbol  
        .setVisible(true) // Make the status visible  
        .setColor('rgb(255, 40, 60)') // Set the color  
        .setIcon(myCustomIconSvgString) // String for an SVG icon, i.e. '<svg> ... </svg>'  
        .setTooltip('Tooltip') // Text to be displayed within the hover tooltip  
        .setDropDownContent([  
            // Content to be displayed within the large pop-up tooltip  
            {  
                title: 'Title', // Title to be displayed within the pop-up  
                color: 'rgb(255, 60, 70)', // Optional, if you want it to be different to above  
                content: ['Explanation of status', '<br/><br/>', 'More details...'],  
                action: {  
                    // Optional action to be displayed  
                    text: 'Read more here',  
                    tooltip: 'opens in a new window',  
                    onClick: () => {  
                        window.open('https://www.tradingview.com/', '_blank');  
                    },  
                },  
            },  
        ]);  
    

caution

Make sure you pass a correct symbol ID to the [`ICustomSymbolStatusApi.symbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomSymbolStatusApi# symbol) method. The ID should be the same as your datafeed provides to the library when the [`resolveSymbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IDatafeedChartApi# resolvesymbol) method is called.

To check the ID of the current symbol, call the [`IChartWidgetApi.symbol`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# symbol) method.

## Disable the pop-upâ

Add the [`display_market_status`](/charting-library-docs/latest/customization/Featuresets# display_market_status) featureset to [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) to hide the Market Status.


---

## Object tree | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/object-tree*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Object tree

On this page

# Object tree

The _Object tree_ is a feature that allows managing (hiding, showing, or removing) drawings, indicators, and symbols on the chart.

The _Object tree_ is enabled by default but you can hide it by disabling the [`show_object_tree`](/charting-library-docs/latest/customization/Featuresets# show_object_tree) featureset. Users can access the _Object tree_ through the left toolbar (in Advanced Charts) or the right toolbar (in Trading Platform).

![Object tree](/charting-library-docs/assets/images/object-tree-c83fd8d2c6ebaeb76da81224b7a3488c.png)

## Fix undefined valuesâ

The `undefined` string appears in the _Object tree_ when the [`exchange`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# exchange) and [`listed_exchange`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# listed_exchange) properties are missing from the [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo) object. You should provide this object via the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) callback.

To resolve this issue, ensure these properties have appropriate values in the `LibrarySymbolInfo` object. Alternatively, you can hide the symbol exchange display by enabling the [`hide_object_tree_and_price_scale_exchange_label`](/charting-library-docs/latest/customization/Featuresets# hide_object_tree_and_price_scale_exchange_label) featureset.


---

## Symbol Status | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Status*

  * [](/charting-library-docs/)
  * [UI elements](/charting-library-docs/latest/ui_elements/)
  * Symbol Status

# Symbol Status

caution

This page has moved here: [Market Status](/charting-library-docs/latest/ui_elements/market-status)


---

## Featuresets | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * Featuresets

On this page

# Featuresets

**Featureset** is a string literal that allows showing or hiding UI elements and changing the chart's behavior.

## How to useâ

To enable or disable a feature, include it in the [`enabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# enabled_features) or [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) object.
    
    
    <script>  
        new TradingView.widget({  
            container: 'chartContainer',  
            locale: 'en',  
            library_path: 'charting_library/',  
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),  
            symbol: 'AAPL',  
            interval: '1D',  
            enabled_features: ["show_spread_operators"],  
            disabled_features: ["items_favoriting", "show_object_tree"]  
        });  
    </script>  
    

This code sample enables the spread operators in the [_Symbol Search_](/charting-library-docs/latest/ui_elements/Symbol-Search) dialog and disables [_Add to favorites_](/charting-library-docs/latest/ui_elements/drawings/# favorite-tools) and _Show Object tree_ buttons in the UI.

## Simple and complex featuresetsâ

Featuresets can be simple and complex where complex consists of the simple ones. Note that disabling complex featureset disables all its simple parts as well.

In the table below, simple featuresets are nested within complex featuresets using indentation.

Featureset| Default state| Description  
---|---|---  
`context_menus`# | On| Shows any context menu when users right-click anywhere in the UI.  
`legend_context_menu`# | On| Shows the context menu when users right-click the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`pane_context_menu`# | On| Shows the context menu when users right-click the chart.  
`scales_context_menu`# | On| Shows the context menu when users right-click either [_Price Scale_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale) or [_Time Scale_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Time-Scale).  
`edit_buttons_in_legend`# | On| Shows buttons on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget. When disabled, hides all buttons except the ellipsis menu.  
`delete_button_in_legend`# | On| Shows the _Remove_ button on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`format_button_in_legend`# | On| Shows the _Settings_ button on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`show_hide_button_in_legend`# | On| Shows the _Hide_ and _Show_ buttons on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`header_widget`# | On| Shows the header panel and [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search/) on the chart.  
`header_chart_type`# | On| Shows the chart type button on the header panel.  
`header_compare`# | On| Shows the _Compare or Add Symbol_ button on the header panel.  
`header_fullscreen_button`# | On| Shows the _Fullscreen mode_ button on the header panel.  
`header_indicators`# | On| Shows the _Indicators_ button on the header panel.  
`header_resolutions`# | On| Shows the _Resolution_ button on the header panel.  
`show_interval_dialog_on_key_press`# | On| Opens the _Change Interval_ dialog when users type digits or press the comma key.  
`header_screenshot`# | On| Shows the _Take a snapshot_ button on the header panel.  
`header_settings`# | On| Shows the _Chart settings_ button on the header panel.  
`header_symbol_search`# | On| Shows the [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search/) button on the header panel.  
`header_undo_redo`# | On| Shows the _Undo/Redo_ buttons on the header panel.  
`header_quick_search`# | On| Shows the _Quick search_ button on the header panel.  
`symbol_search_hot_key`# | On| Allows opening [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search/) using the typing keys.  
`use_localstorage_for_settings`# | On| Allows storing chart properties and [user settings](https://www.tradingview.com/charting-library-docs/latest/saving_loading/user-settings), including favorites, in the browser's [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).   
Refer to the [Customization precedence](https://www.tradingview.com/charting-library-docs/latest/customization/customization-precedence/) article to learn more about the application order of `localStorage` among other approaches.  
`save_chart_properties_to_local_storage`# | On| Can be disabled to forbid storing chart properties in the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) while allowing to save other properties. The other properties include favorites in Advanced Charts, and [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List) symbols and some panel states in Trading Platform.  
  
## Visibility of controls and visual elementsâ

Featureset| Default state| Description  
---|---|---  
`adaptive_logo`# | On| Shows the _Chart by TradingView_ text on small-screen devices.  
`always_show_legend_values_on_mobile`# | Off| Shows legend values when on mobile.   
Available from version 26.  
`border_around_the_chart`# | On| Adds a 2px padding to the chart.  
`chart_style_hilo`# | Off| Adds _High-Low_ option to the chart style controls.  
`chart_style_hilo_last_price`# | Off| Enables last price line and price axis label on the _High-Low_ chart style.   
Available from version 24.  
`chart_property_page_right_margin_editor`# | On| Shows the _Right margin_ field in _Settings â Appearance_  
`chart_property_page_scales`# | On| Allows [Overrides](https://www.tradingview.com/charting-library-docs/latest/customization/overrides/) for the _Price Scale_.  
`clear_price_scale_on_error_or_empty_bars`# | On| Clears the pane price scales when the main series has an error or no bars.   
Available from version 25.  
`compare_symbol_search_spread_operators`# | Off| Shows the [spread operators](https://www.tradingview.com/charting-library-docs/latest/ui_elements/indicators/# enable-spread-operators) in the _Compare symbol_ dialog. Note that you must also enable [`show_spread_operators`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_spread_operators).  
`control_bar`# | On| Shows the _Zoom In/Out_ and _Scroll to the Left/Right_ navigation buttons at the bottom of the chart.  
`countdown`# | On| Shows the _Countdown to bar close_ option on the [_Price Scale_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale).  
`display_data_mode`# | Off| Enables an icon and the [_Data is delayed_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend# display-delayed-data-information) section in the _Legend_.  
`display_legend_on_all_charts`# | Off| Display the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget on all diagrams regardless of the crosshair synchronization.  
`display_market_status`# | On| Shows the market status on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`dont_show_boolean_study_arguments`# | Off| Shows true and false [indicator](https://www.tradingview.com/charting-library-docs/latest/custom_studies/) arguments.  
`go_to_date`# | On| Shows the _Go to_ option that allows jumping to a particular bar.  
`header_saveload`# | On| Shows the _Save layout_ and _Load layout_ buttons (the feature is not part of the `header_widget` featureset).  
`hide_image_invalid_symbol`# | Off| Hides the image that is shown to illustrate an invalid symbol.  
`hide_last_na_study_output`# | Off| Shows last N/A [indicator](https://www.tradingview.com/charting-library-docs/latest/custom_studies/) output data.  
`hide_left_toolbar_by_default`# | Off| Shows left toolbar when a user opens the chart for the first time.  
`hide_main_series_symbol_from_indicator_legend`# | On| Hides the optional symbol input value from the indicator legend if the _Main chart symbol_ option is selected.  
`hide_price_scale_global_last_bar_value`# | Off| Hides the global last price label on the [_Price Scale_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale) if the last bar is outside of the visible range.  
`hide_exponentiation_spread_operator`# | Off| Shows the exponentiation spread operator (^) in the [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search) dialog.  
`hide_reciprocal_spread_operator`# | Off| Shows reciprocal spread operator (1/x) in the [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search) dialog.  
`hide_object_tree_and_price_scale_exchange_label`# | Off| Hides the exchange label from the displayed label.  
`hide_resolution_in_legend`# | Off| Shows the interval (D, 2D, W, M, etc.) in the chart legend and the data window.  
`hide_unresolved_symbols_in_legend`# | Off| Shows unresolved symbols in the chart legend and the data window.  
`items_favoriting`# | On| Shows the _Add to favorites_ icon for chart types, drawings, indicators, and resolutions.  
`left_toolbar`# | On| Shows the [_Drawings_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/drawings/) toolbar on the left panel.  
`legend_widget`# | On| Shows the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend# hide-legend) widget on the top-left corner of any chart.  
`main_series_scale_menu`# | On| Shows the _Settings_ button in the right-bottom corner of the chart.  
`object_tree_legend_mode`# | On| Shows the [_Show Object tree_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/object-tree) button in the legend at a small width.  
`pricescale_currency`# | Off| Shows the _Currency_ context menu in _Chart Settings â Scales_. The menu allows selecting the visibility of the currency in which the instrument is traded on the price scale. Refer to the [Instrument currency](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale# instrument-currency) section for more information.  
`pricescale_unit`# | Off| Shows the _Unit_ context menu in _Chart Settings â Scales_. The menu allows selecting the visibility of the unit in which the instrument is traded on the [_Price Scale_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale).  
`pre_post_market_sessions`# | Off| Enables pre- and post-market session support. For more information, refer to [_Extended sessions_](https://charting-library-docs.xstaging.tv/wrt813/latest/connecting_data/Extended-Sessions).   
Available from version 24.  
`property_pages`# | On| Shows all _Settings_ pages.  
`popup_hints`# | On| Shows pop-up hints about possible mouse/shortcut/UI actions.  
`remove_library_container_border`# | On| Sets the border style to 0px and padding to 1px.  
`scales_date_format`# | On| Shows the _Date format_ selector in _Chart settings_.  
`scales_time_hours_format`# | On| Shows the _Time hours format_ selector in _Chart settings_.   
Available from version 24.  
`show_chart_property_page`# | On| Enables the _Chart settings_ page.  
`show_average_close_price_line_and_label`# | Off| Shows the visibility settings of the label and the average close price line.  
`show_exchange_logos`# | Off| Shows logos for the exchanges within the [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search) dialog.   
Available from version 25.  
`show_right_widgets_panel_by_default`# | On| Opens the right widget toolbar on the first launch.  
`show_symbol_logos`# | Off| Shows logos for the symbols within [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search) and the [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List) widget.   
Available from version 25.  
`show_symbol_logo_for_compare_studies`# | On| Shows the symbol's logo within the legend for compare studies. Note that you must also enable [`show_symbol_logos`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_symbol_logos) and [`show_symbol_logo_in_legend`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_symbol_logo_in_legend).   
Available from version 26.  
`show_symbol_logo_in_legend`# | On| Display the main symbol's logo within the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend). Note that you must also enable [`show_symbol_logos`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_symbol_logos).   
Available from version 26.  
`show_object_tree`# | On| Shows the [_Show Object tree_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/object-tree) button on the left or right toolbar depending on the product and configuration.  
`show_percent_option_for_right_margin`# | Off| Shows the option to specify the default right margin in percentage in the _Appearance â Chart settings_ dialog.  
`show_spread_operators`# | Off| Shows the spread operators in the [_Symbol Search_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search# enable-spread-operators) dialog.  
`show_zoom_and_move_buttons_on_touch`# | Off| On touch devices, shows the zoom and move buttons at the bottom of the chart.  
`snapshot_trading_drawings`# | Off| Includes orders, positions, and executions in the screenshot.  
`source_selection_markers`# | On| Enables selection markers for series and indicators.  
`studies_symbol_search_spread_operators`# | Off| Shows the spread operators for some indicators (for example Volume and Moving Average) in the _Settings â Inputs â Another symbol â Change symbol_ dialog. Note that you should also enable [`show_spread_operators`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_spread_operators).  
`symbol_info`# | On| Shows the _Symbol Info_ option on the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend) widget.  
`symbol_info_long_description`# | Off| Enables long symbol descriptions to be shown in the main series and compare studies legends if provided in the symbol info data.  
`symbol_info_price_source`# | Off| Shows symbol price source in the main series and _Compare_ indicator legends. You should also provide the [`price_source_id`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo/# price_source_id) and [`price_sources`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo/# price_sources) properties in the `LibrarySymbolInfo` object.  
`timeframes_toolbar`# | On| Shows the [_Time frame_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Time-Scale# time-frame-toolbar) toolbar at the bottom of the chart.  
`timezone_menu`# | On| Enables the _Time zone_ dropdown list that allows switching the time zone from the bottom toolbar.  
`use_na_string_for_not_available_values`# | Off| Shows a literal "N/A" for not available values instead of "â ".   
Available from version 24.  
  
## Elements placementâ

Featureset| Default state| Description  
---|---|---  
`move_logo_to_main_pane`# | Off| Places the logo on the main [series](https://www.tradingview.com/charting-library-docs/latest/getting_started/glossary# series/) pane instead of the bottom pane.  
  
## Behaviorâ

Featureset| Default state| Description  
---|---|---  
`accessible_keyboard_shortcuts`# | Off| Changes the keyboard navigation shortcut from `Alt` \+ `Z` to `Tab`. Refer to [Keyboard navigation](https://www.tradingview.com/charting-library-docs/latest/getting_started/accessibility# keyboard-navigation) for more information.   
Available from version 27.  
`allow_arbitrary_symbol_search_input`# | Off| Enables or disables the ability for users to enter arbitrary input in the [Symbol Search](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Symbol-Search) dialog. When this feature is **disabled** (default behavior), pressing the _Enter_ key without selecting a search result will automatically select the top search result as the input value. If no results are available, pressing _Enter_ will have no effect.   
When this feature is **enabled** , the user's direct input will be used as the selected value, regardless of whether it matches any search results. This input will then be passed to the data feed for resolution and loading.  
`aria_crosshair_price_description`# | Off| Announces, via the screen reader, the price when the crosshair is moved on the chart. Currently only supported for the English language.  
Available from version 27.  
`aria_detailed_chart_descriptions`# | Off| Generates a more detailed ARIA description of the chart for screen readers when the active chart is changed by the user. The more detailed description includes a brief description of the price values for the main series.  
ARIA descriptions are currently only provided for the English language. You can use the [custom_chart_description_function](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_chart_description_function) constructor option if you wish to add support for additional languages.  
Available from version 27.  
`auto_enable_symbol_labels`# | On| Shows the symbol name label when comparing symbols.  
`axis_pressed_mouse_move_scale`# | On| Enables axis scaling with the left mouse button pressed.  
`chart_template_storage`# | Off| Enables saving/loading [chart templates](https://www.tradingview.com/charting-library-docs/latest/saving_loading/# chart-templates). To store chart templates, implement the logic for [API handlers](https://www.tradingview.com/charting-library-docs/latest/saving_loading/).   
Available from version 25.  
`chart_scroll`# | On| Enables chart scrolling.  
`chart_zoom`# | On| Enables chart zooming.  
`charting_library_debug_mode`# | Off| Enables logs.  
`confirm_overwrite_if_chart_layout_with_name_exists`# | Off| By default, many chart layouts can be saved with the same name. If this feature is enabled, the library will prompt to confirm overwriting chart layouts with the same name when saving, renaming, or cloning _(Save as)_.  
`create_volume_indicator_by_default`# | On| Adds the [_Volume_ indicator](https://www.tradingview.com/charting-library-docs/latest/ui_elements/indicators/# volume-indicator/) upon the chart initialization.  
`create_volume_indicator_by_default_once`# | On| Prevents the [_Volume_ indicator](https://www.tradingview.com/charting-library-docs/latest/ui_elements/indicators/# volume-indicator/) from being recreated when an instrument or a resolution is switched.  
`constraint_dialogs_movement`# | On| Keeps the dialogs within the chart.  
`cropped_tick_marks`# | On| Shows partially visible price labels on price axis.  
`custom_resolutions`# | Off| Allows adding [custom resolutions](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Resolution/# enable-custom-resolutions) in the UI.  
`datasource_copypaste`# | On| Enables copying of [drawings](https://www.tradingview.com/charting-library-docs/latest/ui_elements/drawings/) and [indicators](https://www.tradingview.com/charting-library-docs/latest/ui_elements/indicators/).  
`determine_first_data_request_size_using_visible_range`# | Off| By default, the chart requests a small, fixed number of bars for the initial data request when the chart is first created. If this feature is enabled, the library will calculate the request size based on the number of bars that will be visible on the chart.  
`disable_pulse_animation`# | Off| Disables the pulse animation when chart type is set to Line.  
`disable_resolution_rebuild`# | Off| Shows bar time exactly as provided by the datafeed, without adjustments. For more information, refer to [Resolution](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Resolution/# disable-resolution-rebuilding).  
`end_of_period_timescale_marks`# | Off| Toggles the timeline marks to display the bar's end time.  
`fix_left_edge`# | Off| Prevents scrolling to the left of the first historical bar.  
`header_in_fullscreen_mode`# | Off| Enables the header widget DOM element in the full screen mode  
`hide_price_scale_if_all_sources_hidden`# | Off| Hides the [price scale](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale/) if all indicators or series attached to the price scale are hidden.   
Available from version 25.  
`horz_touch_drag_scroll`# | On| Enables the chart to handle the horizontal pointer movements on touch screens. In this case, the webpage is not scrolled. If disabled, the webpage is scrolled instead.   
  
Note that if the user starts scrolling the chart vertically or horizontally, scrolling is continued in any direction until the user releases the finger.  
`iframe_loading_compatibility_mode`# | Off| Enables alternative loading mode for the library, which can be used to support older browsers and a few non-standard browsers.  
`iframe_loading_same_origin`# | Off| Enables an alternative loading mode for the library, which can be used when the iframe content must be served from the same origin.   
Available from version 28.  
`insert_indicator_dialog_shortcut`# | On| Enables the _Open indicator_ [shortcut](https://www.tradingview.com/charting-library-docs/latest/getting_started/Shortcuts# chart) (`/`).  
`legend_inplace_edit`# | On| Enables in-place editing of indicators and series in the [_Legend_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend).   
Note that disabling this featureset also hides the Symbol Search within the Legend.   
Available from version 27.  
`library_custom_color_themes`# | On| Enables [_Custom Themes API_](https://www.tradingview.com/charting-library-docs/latest/customization/styles/custom-themes).  
Available from version 28.  
`lock_visible_time_range_on_resize`# | Off| Prevents changing visible time area on chart resizing.  
`lock_visible_time_range_when_adjusting_percentage_right_margin`# | Off| Lock the visible range when adjusting the percentage right margin via the settings dialog. This applies when the chart is already at the current default margin position.  
`low_density_bars`# | Off| Allows zooming in to one bar in the viewport.  
`mouse_wheel_scale`# | On| Enables series scaling with a mouse wheel.  
`mouse_wheel_scroll`# | On| Enables chart scrolling with a horizontal mouse wheel.  
`no_min_chart_width`# | Off| Disables the minimum chart width limit.  
`pinch_scale`# | On| Enables series scaling with pinch/zoom gestures. This feature is supported on touch devices only.  
`pressed_mouse_move_scroll`# | On| Enables chart scrolling with the left mouse button pressed.  
`request_only_visible_range_on_reset`# | Off| When the [chart data is reset](https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-Issues# internet-connection-issues), this featureset enables re-requesting the data for just the visible range, instead of the entire range of the existing loaded data.   
Available from version 25.  
`right_bar_stays_on_scroll`# | On| Determines the behavior of the _Zoom_ feature: the bar under the mouse cursor stays in the same place if this feature is disabled  
`save_shortcut`# | On| Enables the _Save chart layout_ [shortcut](https://www.tradingview.com/charting-library-docs/latest/getting_started/Shortcuts# chart) (`Ctrl` \+ `S`).  
`saveload_separate_drawings_storage`# | Off| Enables an [alternative saving and loading mode](https://www.tradingview.com/charting-library-docs/latest/saving_loading# save-drawings-separately) for the library. This mode saves the state of the drawings separately from the [chart layout](https://www.tradingview.com/charting-library-docs/latest/saving_loading# chart-templates).   
Available from version 27.  
`seconds_resolution`# | Off| Enables the support of [resolutions](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Resolution/) in seconds.  
`secondary_series_extend_time_scale`# | Off| Allows an additional series to [extend the time scale](https://www.tradingview.com/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale/# for-overlay-study).  
`shift_visible_range_on_new_bar`# | On| If disabled, adding a new bar zooms the chart out preserving the first visible point. Otherwise, when a new bar appears, the chart is scrolled one point to the left.  
`side_toolbar_in_fullscreen_mode`# | Off| Enables the [_Drawings_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/drawings/) toolbar in the full screen mode.  
`studies_extend_time_scale`# | Off| Enables custom indicators to [extend the time scale](https://www.tradingview.com/charting-library-docs/latest/custom_studies/Studies-Extending-The-Time-Scale) if `canExtendTimeScale` is set to `true` in the indicator's metainfo.   
Available from version 26.  
`study_templates`# | Off| Enables a button in the header to load/save _Indicator template_.  
`study_symbol_ticker_description`# | Off| Applies the symbol display mode (ticker/description) to the indicator inputs in the status line.  
`study_overlay_compare_legend_option`# | Off| Applies the symbol display mode (ticker/description) to overlay/compare indicators in the status line.  
`tick_resolution`# | Off| Enables the support of [resolutions](https://www.tradingview.com/charting-library-docs/latest/core_concepts/Resolution/) in ticks.  
`two_character_bar_marks_labels`# | Off| Allows displaying up to two characters in bar marks. The default behavior is to only display one character.  
`uppercase_instrument_names`# | On| When disabled, this feature allows a user to enter case-sensitive symbols.  
`use_last_visible_bar_value_in_legend`# | Off| By default, the legend shows the most recent "global" bar value. When this featureset is enabled, the rightmost bar in the visible range is used instead.   
Available from version 25.  
`vert_touch_drag_scroll`# | On| Enables the chart to handle the vertical pointer movements on touch screens. In this case, the webpage is not scrolled. If disabled, the webpage is scrolled instead.   
  
Note that if the user starts scrolling the chart vertically or horizontally, scrolling is continued in any direction until the user releases the finger.  
`volume_force_overlay`# | On| Places the [_Volume_ indicator](https://www.tradingview.com/charting-library-docs/latest/ui_elements/indicators/# volume-indicator/) on the same pane with the main [series](https://www.tradingview.com/charting-library-docs/latest/getting_started/glossary# series/).  
  
## Trading Platformâ

info

These featuresets are only available in [Trading Platform](/charting-library-docs/latest/trading_terminal/).

Featureset| Default state| Description  
---|---|---  
`add_to_watchlist`# | On| Enables the _Add symbol to Watchlist_ option in the menu.  
`always_pass_called_order_to_modify`# | Off| If a bracket order is modified, the terminal passes its parent order to [`modifyOrder`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal?_highlight=modifyorder# modifyorder). The featureset disables this behavior.  
`buy_sell_buttons`# | On| Shows the _Buy/Sell_ buttons in the [Legend](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend).  
`broker_button`# | On| Shows the _Broker_ button () in the [Legend](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Legend).  
`chart_crosshair_menu`# | On| Shows the _Plus_ button on the price scale for [quick trading](https://www.tradingview.com/charting-library-docs/latest/ui_elements/Price-Scale# quick-trading). Note that this menu will be empty unless you implement the [Broker API](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api).  
`chart_hide_close_position_button`# | Off| Hides the close button for positions.  
`chart_hide_close_order_button`# | Off| Hides the close button for orders.  
`chart_property_page_trading`# | On| Shows the _Trading_ section in _Chart settings_.  
`drawing_templates`# | On| Enables [Drawing Templates](https://www.tradingview.com/charting-library-docs/latest/ui_elements/drawings/# templates) on the Drawing toolbar.  
`dom_widget`# | Off| Enables the [Depth of Market](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/depth-of-market) widget visibility.  
`header_layouttoggle`# | On| Shows the _Select Layout_ button on the top toolbar. Using this button, users can select [multiple-chart layouts.](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/# multiple-chart-layout)  
`hide_right_toolbar`# | Off| Hides the right toolbar when initializing the chart to free up space. The toolbar can be shown/hidden later using the [WidgetBar API](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IWidgetbarApi).  
`hide_right_toolbar_tabs`# | Off| Hides the tabs within the right toolbar.  
`keep_object_tree_widget_in_right_toolbar`# | Off| Keeps the [_Object tree_](https://www.tradingview.com/charting-library-docs/latest/ui_elements/object-tree) in the right toolbar. If the [`right_toolbar`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# right_toolbar) featureset is not enabled, this feature will not work.  
`legend_last_day_change`# | Off| Adds the _Last day change values_ option to the _ChartÂ Settings_ dialog in the UI. This option allows users to show/hide the last day change values in the main series legend.   
Available from version 27.  
`multiple_watchlists`# | On| Enables creating multiple [Watchlists](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List).  
`open_account_manager`# | On| Keeps the [Account Manager](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/account-manager) opened by default.  
`order_info`# | On| Shows the order information section in the _Order Ticket_.  
`order_panel`# | On| Shows the [Order Ticket](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/order-ticket). Note that disabling this featureset also hides the _Trade_ button in the [Account Manager](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/account-manager).  
`order_panel_close_button`# | On| Shows the _Close Order Ticket_ button.  
`order_panel_undock`# | On| Shows the _Undock_ button in the _Order Ticket_ settings.  
`prefer_symbol_name_over_fullname`# | On| Displays the symbol name instead of the `exchange:name` combination in the UI.   
Available from version 28.  
`right_toolbar`# | On| Shows the right toolbar with buttons.  
`show_dom_first_time`# | Off| Shows the [Depth of Market](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/depth-of-market) widget when a user opens the chart for the first time.  
`show_last_price_and_change_only_in_series_legend`# | Off| Shows only the last price and change values in the main series legend.  
`show_order_panel_on_start`# | Off| Shows the _Order Ticket_ when the chart opens.  
`show_symbol_logo_in_account_manager`# | On| Displays the symbol's logo within the [Account Manager](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/account-manager). Note that you must also enable [`show_symbol_logos`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# show_symbol_logos).   
Available from version 26.  
`show_trading_notifications_history`# | On| Enables the _Notifications log_ tab on the bottom panel.  
`support_multicharts`# | On| Enables context menu actions (for example _Sync in layout_ for drawings) related to [multiple-chart layout](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/# multiple-chart-layout).  
Note that disabling this featureset does not remove the _Select Layout_ button on the top toolbar. To hide this button, disable the [`header_layouttoggle`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets/# header_layouttoggle) featureset.  
`trading_account_manager`# | On| Shows the [Account Manager](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/account-manager).  
`trading_notifications`# | On| Shows trading notifications on the chart.  
`watchlist_context_menu`# | On| Enables context menu support in the [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List).  
`watchlist_import_export`# | On| Enables [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List) export and import.  
`watchlist_sections`# | On| Display UI (buttons and context menu options) for creating sections within the watchlist.   
Available from version 26.1.  
`prefer_quote_short_name`# | On| Displays the [short_name](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedQuoteValues/# short_name) value as a symbol name in the [Watchlist](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Watch-List) and [Details](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/# details).


---

## Customization precedence | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/customization-precedence*

  * [](/charting-library-docs/)  
  * [Customization](/charting-library-docs/latest/customization/)
  * Customization precedence

On this page

# Customization precedence

The library offers multiple approaches to modify the chart's appearance and behavior. This article lists these approaches and demonstrates an example to clarify their order of precedence.

## Approachesâ

The table below provides an overview of customization methods/properties and their order of application. The methods/properties higher in the table will override any styles applied by the methods/properties lower on the list.

Methods/Properties| Description| Order  
---|---|---  
[`applyOverrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget/# applyoverrides)# | Applies overrides to the chart without reloading. Refer to [Overrides](https://www.tradingview.com/charting-library-docs/latest/customization/overrides/) for more information.| 1  
[`load`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget/# load)# | Loads the chart state from an object when the chart is initialized. Refer to the [Low-level API](https://www.tradingview.com/charting-library-docs/latest/saving_loading/# low-level-api) section for more information.| 2  
[`saved_data`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# saved_data)# | Sets an object that contains saved chart content. Refer to the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=1277s) on YouTube for an implementation example.| 3  
[`settings_overrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# settings_overrides)# | Overrides chart settings loaded from a custom settings adapter or a local storage. Refer to the [Widget Constructor tutorial](https://www.youtube.com/watch?v=bdvmM3FNnSY&t=3805s) on YouTube for an implementation example.| 4  
[`settings_adapter`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# settings_adapter)# | Allows creating your custom settings adapter to save user settings to your preferred storage, including server-side. Refer to the [Save user settings](https://www.tradingview.com/charting-library-docs/latest/saving_loading/user-settings) article for more information.| 5  
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)# | Allows storing chart settings in the browser's local storage via the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) object. You can disable storing properties in the local storage by using the [`use_localstorage_for_settings`](https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets# use_localstorage_for_settings) featureset.| 6  
[`overrides`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# overrides)# | Overrides default values of the widget properties. Refer to [Overrides](https://www.tradingview.com/charting-library-docs/latest/customization/overrides/) for more information.| 7  
[`custom_themes`](https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/# custom_themes)# | Overrides default colors of the light and darks themes. Refer to [Custom themes API](https://www.tradingview.com/charting-library-docs/latest/customization/styles/custom-themes) for more information.| 8  
  
## Exampleâ

You can check out the following example to understand how these approaches override each other. Change the flags' values provided at the beginning of the JavaScript file (lines 1-7) to easily manage the example.

The coloring of the candle bodies will vary based on the approach applied. Below, you will find the colors associated with each method/property.

  * `applyOverrides` â orange
  * `load` â blue
  * `saved_data` â red
  * `settings_overrides` â purple
  * `settings_adapter` â green
  * `localStorage` â black
  * `overrides` â yellow

See the Pen [ Chart customization order](https://codepen.io/tradingview/pen/jOdpQEo) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).


---

## Chart overrides | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/overrides/chart-overrides*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Overrides](/charting-library-docs/latest/customization/overrides/)
  * Chart overrides

On this page

# Chart overrides

This article describes [Overrides API](/charting-library-docs/latest/customization/overrides/) properties that affect elements on the chart. You can find a full list of properties on the [ChartPropertiesOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides) page.

All properties are divided into four groups:

  * `paneProperties` â affect elements on the main chart pane.
  * `scalesProperties` â affect price and time scales.
  * `mainSeriesProperties` â affect series.
  * `tradingProperties` â affect Trading Platform features.

## panePropertiesâ

These properties affect elements located on the chart's pane (inside the highlighted area).

![Main pane](/charting-library-docs/assets/images/overrides-pane-f846dbf253d562030f1e70c935273f58.png)

### Chart background colorâ

You can specify a background color using the following properties:

Property| Description  
---|---  
[`paneProperties.backgroundType`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesbackgroundtype)| Pane background type.  
[`paneProperties.background`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesbackground)| Pane background color.  
[`paneProperties.backgroundGradientStartColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesbackgroundgradientstartcolor)| Pane background gradient start color.  
[`paneProperties.backgroundGradientEndColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesbackgroundgradientendcolor)| Pane background gradient end color.  
  
Background color can be either solid or gradient. Note that the default background type is `gradient` in the **dark theme**. The following code samples demonstrate how to specify background in the dark theme:

Gradient color
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        // ...  
        theme: "dark",  
        overrides: {  
            "paneProperties.backgroundGradientStartColor": "# 020024",  
            "paneProperties.backgroundGradientEndColor": "# 4f485e",  
        },  
    }));  
    

![Gradient color](/charting-library-docs/assets/images/gradient-background-b58b4a1ef3cc523c0cae5b900c086c31.png)

Solid color
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        // ...  
        theme: "dark",  
        overrides: {  
            "paneProperties.background": "# 020024",  
            "paneProperties.backgroundType": "solid"  
        },  
    }));  
    

![Solid color](/charting-library-docs/assets/images/solid-color-259a6df462d13f2b53347c667685be73.png)

### Grid linesâ

You can specify grid lines using the following properties:

Property| Description  
---|---  
[`paneProperties.vertGridProperties.color`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesvertgridpropertiescolor)| Pane vertical grid color.  
[`paneProperties.vertGridProperties.style`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesvertgridpropertiesstyle)| Pane vertical grid line style.  
[`paneProperties.horzGridProperties.color`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieshorzgridpropertiescolor)| Pane horizontal grid color.  
[`paneProperties.horzGridProperties.style`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieshorzgridpropertiesstyle)| Pane horizontal grid line style.  
[`paneProperties.gridLinesMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesgridlinesmode)| Pane grid line mode.  
  
The code sample below specifies a dotted grid line.

Dotted grid line
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "paneProperties.horzGridProperties.style": 1,  
        },  
    }));  
    

### Pane separatorâ

You can change the color of the pane separator using the following property (it's also available in Chart settings but you'll have to at least have a pane in addition to main series to see it):

Property| Description  
---|---  
[`paneProperties.separatorColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesseparatorcolor)| Pane separator color.  
  
Here's a code sample:

Pane separator color
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "paneProperties.separatorColor": "# 9598a1"  
        },  
    }));  
    

### Legendâ

You can specify a legend using the following properties:

Property| Description  
---|---  
[`paneProperties.legendProperties.showLastDayChange`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowlastdaychange)| Ability to show daily changes in the chart legend.  
[`paneProperties.legendProperties.showStudyArguments`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowstudyarguments)| Study legend input values visibility.  
[`paneProperties.legendProperties.showStudyTitles`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowstudytitles)| Studies legend title visibility.  
[`paneProperties.legendProperties.showStudyValues`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowstudyvalues)| Studies legend value visibility.  
[`paneProperties.legendProperties.showSeriesTitle`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowseriestitle)| Series legend title visibility.  
[`paneProperties.legendProperties.showSeriesOHLC`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowseriesohlc)| Study legend OHLC values visibility.  
[`paneProperties.legendProperties.showBarChange`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowbarchange)| Series legend change value visibility.  
[`paneProperties.legendProperties.showVolume`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowvolume)| Series legend volume value visibility.  
[`paneProperties.legendProperties.showBackground`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesshowbackground)| Legend background visibility.  
[`paneProperties.legendProperties.backgroundTransparency`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertieslegendpropertiesbackgroundtransparency)| Legend background transparency percentage.  
  
Some properties that relate to the `mainSeriesProperties` group also affect the chart's legend.

Property| Description  
---|---  
[`mainSeriesProperties.statusViewStyle.showExchange`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesstatusviewstyleshowexchange)| Main series legend exchange visibility.  
[`mainSeriesProperties.statusViewStyle.showInterval`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesstatusviewstyleshowinterval)| Main series legend interval visibility.  
[`mainSeriesProperties.statusViewStyle.symbolTextSource`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesstatusviewstylesymboltextsource)| Main series legend text style.  
  
The code sample below removes OHLCV values and chart resolution from the legend. It also specifies the `"long-description"` text style in the legend.

Legend
    
    
    var widget = (window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "paneProperties.legendProperties.showVolume": false,  
            "paneProperties.legendProperties.showSeriesOHLC": false,  
      
            "mainSeriesProperties.statusViewStyle.showInterval": false,  
            "mainSeriesProperties.statusViewStyle.symbolTextSource": "long-description",  
        },  
    }));  
    

![Overrides legend](/charting-library-docs/assets/images/overrides-legend-e8b22fb4986d3b4856f8d778811b79d4.png)

### Marginâ

Use the following properties to specify a margin applied when users scale the chart:

Property| Description  
---|---  
[`paneProperties.topMargin`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiestopmargin)| Pane auto scaling top margin percentage.  
[`paneProperties.bottomMargin`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# panepropertiesbottommargin)| Pane auto scaling bottom margin percentage.  
  
## scalesPropertiesâ

These properties affect appearance of the [time](/charting-library-docs/latest/ui_elements/Time-Scale) and [price](/charting-library-docs/latest/ui_elements/Price-Scale) scales.

### Price scale positionâ

You can use the [`priceScaleSelectionStrategyName`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# pricescaleselectionstrategyname) property to specify a price scale position. If you want to change the price scale position on the fly, you should use the [`changePriceScale`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi# changepricescale) method.
    
    
    widget.activeChart().getSeries().changePriceScale('new-left');  
    

### Scale colors and fontsâ

You can specify scale colors and fonts using the following properties:

Property| Description  
---|---  
[`scalesProperties.lineColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertieslinecolor)| Scales (axis) border line color.  
[`scalesProperties.textColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiestextcolor)| Scales (axis) text color.  
[`scalesProperties.fontSize`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesfontsize)| Scales (axis) font size.  
[`scalesProperties.axisHighlightColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesaxishighlightcolor)| Sets the highlight color of the scales when adding a drawing.  
  
### Labels on the scaleâ

Advanced Charts and Trading Platform include labels that allow you to display additional information on the price scale like a symbol name, bid/ask prices, indicators, and more. You can use the properties below to enable these labels:

Property| Description  
---|---  
[`scalesProperties.showSeriesLastValue`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowserieslastvalue)| Series last value label visibility.  
[`scalesProperties.showStudyLastValue`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowstudylastvalue)| Study label value label visibility.  
[`scalesProperties.showSymbolLabels`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowsymbollabels)| Symbol name label visibility.  
[`scalesProperties.showStudyPlotLabels`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowstudyplotlabels)| Study plot labels visibility.  
[`scalesProperties.showBidAskLabels`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowbidasklabels)| Bid/ask labels visibility.  
[`scalesProperties.showPrePostMarketPriceLabel`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowprepostmarketpricelabel)| Pre/post market price labels visibility.  
[`mainSeriesProperties.highLowAvgPrice.highLowPriceLabelsVisible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertieshighlowavgpricehighlowpricelinesvisible)| High/low price labels visibility.  
[`mainSeriesProperties.highLowAvgPrice.averageClosePriceLabelVisible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertieshighlowavgpriceaverageclosepricelabelvisible)| Average close price lines label visibility.  
  
You can display values focused in the crosshair in labels on the scales. To do this, specify the following properties:

Property| Description  
---|---  
[`scalesProperties.showPriceScaleCrosshairLabel`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowpricescalecrosshairlabel)| Price scale crosshair label visibility.  
[`scalesProperties.showTimeScaleCrosshairLabel`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesshowtimescalecrosshairlabel)| Time scale crosshair label visibility.  
[`scalesProperties.crosshairLabelBgColorLight`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiescrosshairlabelbgcolorlight)| Crosshair label light theme background color.  
[`scalesProperties.crosshairLabelBgColorDark`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiescrosshairlabelbgcolordark)| Crosshair label dark theme background color.  
  
You can specify label colors and display mode using the properties below:

Property| Description  
---|---  
[`mainSeriesProperties.priceAxisProperties.alignLabels`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespriceaxispropertiesalignlabels)| Main series price axis label alignment behavior.  
[`scalesProperties.axisLineToolLabelBackgroundColorActive`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesaxislinetoollabelbackgroundcoloractive)| Dynamically changes the background color of all labels on the price scale when a drawing is in motion.  
[`scalesProperties.axisLineToolLabelBackgroundColorCommon`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesaxislinetoollabelbackgroundcolorcommon)| Configures the background color of a label shown on an axis scale when a drawing is selected.  
[`scalesProperties.seriesLastValueMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# scalespropertiesserieslastvaluemode)| Series last value label display mode.  
  
### Price scale modeâ

You can specify a price scale mode using the following properties:

Property| Description  
---|---  
[`mainSeriesProperties.priceAxisProperties.percentage`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespriceaxispropertiespercentage)| Main series price axis percentage mode.  
[`mainSeriesProperties.priceAxisProperties.indexedTo100`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespriceaxispropertiesindexedto100)| Main series price axis indexed to 100 mode.  
[`mainSeriesProperties.priceAxisProperties.log`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespriceaxispropertieslog)| Main series price axis log mode.  
[`mainSeriesProperties.priceAxisProperties.isInverted`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespriceaxispropertiesisinverted)| Main series price axis inverted mode.  
  
Note that you cannot change the price scale mode using the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method. If you want to change the mode on the fly, you should use the [Price Scale API](/charting-library-docs/latest/api/interfaces/Charting_Library.IPriceScaleApi). Consider the code sample below that enables [Logarithmic mode](/charting-library-docs/latest/api/enums/Charting_Library.PriceScaleMode# log):
    
    
    const priceScale = widget.activeChart().getPanes()[0].getRightPriceScales()[0];  
    priceScale.setMode(1);  
    

## mainSeriesPropertiesâ

These properties affect the main series and UI elements related to its values. A series is a collection of data points that represents a specific metric over time.

### Series visibilityâ

If you want to hide the main series, set the [`mainSeriesProperties.visible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesvisible) property to `false`. You can also use the [`setVisible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi# setvisible) method to change the visibility of the series on the fly.
    
    
    widget.activeChart().getSeries().setVisible(true);  
    

To check if the series is currently visible or not, use the [`isVisible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi# isvisible) method:
    
    
    widget.activeChart().getSeries().isVisible();  
    

### Chart stylesâ

Advanced Charts and Trading Platform support multiple [chart styles](/charting-library-docs/latest/api/enums/Charting_Library.ChartStyle) including Bars, Candles, Line, Area, and more. You can specify the style using the [`mainSeriesProperties.style`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesstyle) property.

For each style, there is a group of properties that you can specify to adjust the main series. Properties of one group have the same name pattern. You can use these patterns to find properties for a certain style on the [ChartPropertiesOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides) page. The table below contains styles and the corresponding patterns.

Style| Name patterns  
---|---  
Line| `mainSeriesProperties.lineStyle`  
Baseline| `mainSeriesProperties.baselineStyle`  
Stepline| `mainSeriesProperties.steplineStyle`  
Bars| `mainSeriesProperties.barStyle`  
Candles| `mainSeriesProperties.candleStyle`  
Volume candles| `mainSeriesProperties.volCandlesStyle`  
Area| `mainSeriesProperties.areaStyle`  
HLC Area| `mainSeriesProperties.hlcAreaStyle`  
Line With Markers| `mainSeriesProperties.lineWithMarkersStyle`  
Hollow Candles| `mainSeriesProperties.hollowCandleStyle`  
Heikin Ashi| `mainSeriesProperties.haStyle`  
Columns| `mainSeriesProperties.columnStyle`  
High-low| `mainSeriesProperties.hiloStyle`  
Renko| `mainSeriesProperties.renkoStyle`  
Line Break| `mainSeriesProperties.pbStyle`  
Kagi| `mainSeriesProperties.kagiStyle`  
Point-and-Figure| `mainSeriesProperties.pnfStyle`  
  
You can also change the chart style properties on the fly. To do this, use the [`setChartStyleProperties`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISeriesApi# setchartstyleproperties) method. For example, the code sample changes the [properties](/charting-library-docs/latest/api/interfaces/Charting_Library.CandleStylePreferences) of the Candles style.
    
    
    widget.chart().getSeries().setChartStyleProperties(1, {  
        upColor: '# 10F9E0',  
        downColor: '# 1029F9',  
        borderUpColor: '# 10F9E0',  
        borderDownColor: '# 1029F9'  
    });  
    

![Change Candle style on the fly](/charting-library-docs/assets/images/candle-style-faabaf6b762d8ebf09f2f739232bf75a.png)

Properties that can be changed using `setChartStyleProperties` are listed in interfaces like [`BarStylePreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.BarStylePreferences), [`RenkoStylePreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.RenkoStylePreferences), and [`AreaStylePreferences`](/charting-library-docs/latest/api/interfaces/Charting_Library.AreaStylePreferences). Refer to the [SeriesPreferencesMap](/charting-library-docs/latest/api/interfaces/Charting_Library.SeriesPreferencesMap) page to see the list of such interfaces.

### Sessionâ

Advanced Charts and Trading Platform support pre-market and post-market sessions. To enable them, you should set the [`mainSeriesProperties.sessionId`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiessessionid) to `"extended"`. For more information about the sessions, refer to [Trading Sessions](/charting-library-docs/latest/connecting_data/Trading-Sessions) and [Extended Sessions](/charting-library-docs/latest/connecting_data/Extended-Sessions).

### Countdownâ

On the price scale, you can display a countdown to the bar close. To do this, set the [`mainSeriesProperties.showCountdown`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesshowcountdown) property to `true`. Note that you should also implement the [`getServerTime`](/charting-library-docs/latest/connecting_data/datafeed-api/additional-methods# getservertime) method to display the countdown.

### Price lineâ

You can specify a price line using the following properties:

Property| Description  
---|---  
[`mainSeriesProperties.showPriceLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesshowpriceline)| Main series price line visibility.  
[`mainSeriesProperties.priceLineWidth`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespricelinewidth)| Main series price line width.  
[`mainSeriesProperties.priceLineColor`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiespricelinecolor)| Main series price line color.  
  
### Additional linesâ

Advanced Charts and Trading Platform include additional lines that can be displayed on the chart. You can enable them using the toggle properties in the table below. For each line, there is a group of properties that you can specify to adjust this line. Properties of one group have the same name pattern. You can use these patterns to find properties for a certain line on the [ChartPropertiesOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides) page.

Line| Toggle| Name patterns  
---|---|---  
Bid/ask| [`mainSeriesProperties.bidAsk.visible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesbidaskvisible)| `mainSeriesProperties.bidAsk`  
High/low price| [`highLowAvgPrice.highLowPriceLinesVisible`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertieshighlowavgpricehighlowpricelinesvisible)| `mainSeriesProperties.highLowAvgPrice`  
Previous close price| [`mainSeriesProperties.showPrevClosePriceLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesshowprevclosepriceline)| `mainSeriesProperties.prevClosePrice`  
  
### minTickâ

The [`minTick`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesmintick) property allows you to change the [`pricescale`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# pricescale), [`minmov`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# minmov), and [`fractional`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo# fractional) properties for the current symbol at once. For more information about these properties, refer to [Price Format](/charting-library-docs/latest/connecting_data/Symbology# price-format). All `minTick` possible values are represented below as objects for better readability:
    
    
    { priceScale: 1, minMove: 1, frac: false },  
    { priceScale: 10, minMove: 1, frac: false },  
    { priceScale: 100, minMove: 1, frac: false },  
    { priceScale: 1000, minMove: 1, frac: false },  
    { priceScale: 10000, minMove: 1, frac: false },  
    { priceScale: 100000, minMove: 1, frac: false },  
    { priceScale: 1000000, minMove: 1, frac: false },  
    { priceScale: 10000000, minMove: 1, frac: false },  
    { priceScale: 100000000, minMove: 1, frac: false },  
    { priceScale: 2, minMove: 1, frac: true },  
    { priceScale: 4, minMove: 1, frac: true },  
    { priceScale: 8, minMove: 1, frac: true },  
    { priceScale: 16, minMove: 1, frac: true },  
    { priceScale: 32, minMove: 1, frac: true },  
    { priceScale: 64, minMove: 1, frac: true },  
    { priceScale: 128, minMove: 1, frac: true },  
    { priceScale: 320, minMove: 1, frac: true },  
    

If you want to reset the `pricescale`, `minmov`, and `fractional` properties to their values initialized in [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo), set `minTick` to `"default"`.

Specify the [`mainSeriesProperties.minTick`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# mainseriespropertiesmintick) property as demonstrated below:
    
    
    // Set minTick to "default"  
    tvWidget.applyOverrides({ "mainSeriesProperties.minTick": "default" });  
      
    // Set series' minTick to { priceScale: 10000, minMove: 1, frac: false }  
    tvWidget.applyOverrides({ "mainSeriesProperties.minTick": "10000,1,false" });  
      
    // Set minTick for overlay studies to { priceScale: 10000, minMove: 1, frac: false }  
    tvWidget.applyStudiesOverrides({ "overlay.minTick": "10000,1,false" });  
    

## Time zoneâ

If you want to change a time zone that is set in [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor), you should use the [`timezone`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# timezone) property.
    
    
    tvWidget.applyOverrides({ "timezone": "Europe/Belgrade"});  
    

## Trading Platformâ

You can use `tradingProperties` to customize Trading Platform features such as orders and positions. Refer to the [Trading overrides](/charting-library-docs/latest/customization/overrides/trading-overrides# adjust-display-of-trading-features) for more information.


---

## Drawing overrides | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/overrides/Drawings-Overrides*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Overrides](/charting-library-docs/latest/customization/overrides/)
  * Drawing overrides

On this page

# Drawing overrides

The [Overrides API](/charting-library-docs/latest/customization/overrides/) includes properties that can be used to customize [drawing](/charting-library-docs/latest/ui_elements/drawings/) parameters such as colors, width, size, and more. This article describes ways to customize drawings and contains a list of overrides for each drawing.

## Customize drawingsâ

This section describes ways to customize drawings.

### Specify default propertiesâ

You should use the [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# overrides) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) to specify the drawing's default properties. For example, the following code sample specifies that all _Horizontal Lines_ should be green and dashed.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "linetoolhorzline.linecolor": "rgba(48, 164, 22, 0.8)",  
            "linetoolhorzline.linestyle": 2,  
        }  
    });  
    

### Change default properties on the flyâ

To change the drawing's default properties after the chart is initialized, use the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method. All drawings created after the `applyOverrides` call have new properties. For example, the following code sample specifies that all newly created _Horizontal Lines_ should be purple.
    
    
    widget.applyOverrides({ "linetoolhorzline.linecolor": "# 7f11e0" });  
    

### Change the existing drawingâ

If you want to change a drawing that is already on the chart, use the [`setProperties`](/charting-library-docs/latest/api/interfaces/Charting_Library.ILineDataSourceApi# setproperties) method in [`ILineDataSourceApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ILineDataSourceApi). For example, the code sample below specifies new properties for the existing _Icon_.
    
    
    const iconId = widget.activeChart().getAllShapes().find(x => x.name === "icon").id;  
    const icon = widget.activeChart().getShapeById(iconId);  
    icon.setProperties({ size: 60, color: "# 7f11e0" });  
    

### Customize a single drawingâ

If you need to change a style of only one drawing, create the drawing using the [Drawings API](/charting-library-docs/latest/ui_elements/drawings/drawings-api# create-drawings) and pass overrides properties as a parameter. These properties are applied above the default ones that are specified in `overrides`.

For example, the code sample below specifies that the default _Horizontal Line_ color is green and creates one red _Horizontal Line_.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        overrides: {  
            "linetoolhorzline.linecolor": "rgba(48, 164, 22, 0.8)",  
        }  
    });  
      
    widget.onChartReady(() => {  
        widget.chart().createShape(  
            { price: 180 },  
            {  
                shape: "horizontal_line",  
                overrides: { linecolor: "# FF0000" },  
            }  
        )  
    });  
    

### Customize icons, stickers, and emojisâ

Note that you cannot customize icons, stickers, or emojis using [`overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# overrides) in the Widget Constructor or the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applyoverrides) method. To customize such drawings, create a new drawing using the [Drawings API](/charting-library-docs/latest/ui_elements/drawings/drawings-api# create-drawings) and specify the drawing properties in the `overrides` parameter. Consider the examples below.

#### Iconsâ
    
    
    widget.chart().createShape(  
        { time: 1514796562, price: 180 },  
        {  
            shape: "icon",  
            overrides: {  
                color: "# 5eeb34",  
                size: 50,  
            },  
            icon: 0xf004, // Heart  
        }  
    );  
    

Refer to [Drawings list](/charting-library-docs/latest/ui_elements/drawings/Drawings-List# icons) for a list of icons.

#### Stickersâ
    
    
    widget.chart().createShape(  
        { time: 1514796562, price: 160 },  
        {  
            shape: "sticker",  
            overrides: {  
                sticker: "dislike",  
                size: 90,  
            },  
        }  
    );  
    

Refer to [Drawings list](/charting-library-docs/latest/ui_elements/drawings/Drawings-List# stickers) for a list of stickers.

#### Emojisâ
    
    
    widget.activeChart().createMultipointShape(  
        [{ time: 1712158200, price: 170 }],  
        {  
            shape: "emoji",  
            overrides: {  
                size: 30,  
            },  
            emoji: "u/1F602" // Grinning face  
        }  
    );  
    

Note that the emoji code requires `u/` before it.

Refer to [Drawings list](/charting-library-docs/latest/ui_elements/drawings/Drawings-List# emojis) for a list of emojis.

## List of overridesâ

Refer to [DrawingOverrides](/charting-library-docs/latest/api/modules/Charting_Library# drawingoverrides) for a list of overrides.


---

## Indicator overrides | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/overrides/indicator-overrides*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Overrides](/charting-library-docs/latest/customization/overrides/)
  * Indicator overrides

On this page

# Indicator overrides

The [Overrides API](/charting-library-docs/latest/customization/overrides/) includes properties that can be used to customize [indicators'](/charting-library-docs/latest/ui_elements/indicators/) parameters such as colors, line width, plot type, and more.

This article contains the following information:

  * How to customize indicators.
  * How to customize new series.
  * How to get the list of overrides for built-in indicators.
  * How to get the list of overrides for custom indicators based on overrides syntax.

## Customize indicatorsâ

This section describes ways to customize indicators.

tip

Refer to List of overrides to see properties for built-in indicators.

### Specify default propertiesâ

You should use the [`studies_overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# studies_overrides) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor) to specify the indicator's default properties. For example, the following code sample specifies that all _Bollinger Bands_ indicators should be green with the upper line width set to 7.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        studies_overrides: {  
            "bollinger bands.median.color": "# 33FF88",  
            "bollinger bands.upper.linewidth": 7  
        }  
    });  
    

### Change default properties on the flyâ

To change the indicator's default properties after the chart is initialized, use the [`applyStudiesOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applystudiesoverrides) method. All indicators created after the `applyStudiesOverrides` call have new properties. For example, the following code sample specifies that all newly created _Moving Average_ indicators should have the length set to 5.
    
    
    widget.applyStudiesOverrides({  
        "moving average.length": 5  
    })  
    

### Change the existing indicatorâ

If you want to change an indicator that is already on the chart, you should use the [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# applyoverrides) method in [`IStudyApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi). For example, the code sample below specifies new properties for the existing _Volume_ indicator.
    
    
    const volumeStudyId = widget.activeChart().getAllStudies().find(x => x.name === "Volume").id;  
    const volume = widget.activeChart().getStudyById(volumeStudyId);  
    volume.applyOverrides({ "volume.color.0": "pink", "volume.color.1": "purple" });  
    

### Customize a single indicatorâ

If you need to change a style of only one indicator, you can create the indicator using the [`createStudy`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) method and pass overrides properties as a parameter. These properties are applied above the default ones that are specified in `studies_overrides`.

For example, the code sample below specifies that _Moving Average_ indicators should be blue and creates one _Moving Average_ that is purple.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        studies_overrides: {  
            "moving average.plot.color": "rgb(0, 255, 255)"  
        }  
    });  
      
    widget.onChartReady(() => {  
        widget.activeChart().createStudy("Moving Average", false, false, { length: 5 },  
            {  
                "Plot.color": "rgb(150, 95, 196)"  
            },  
        )  
    });  
    

Any property from studies_overrides can be changed using `createStudy`. However, the properties listed below can be specified in `createStudy` but might not work in `studies_overrides` depending on the indicator and property.

  * `showPriceLine`: boolean
  * `showLabelsOnPriceScale`: boolean
  * `showLegendValues`: boolean
  * `transparency`: number
  * `precision`: string

For example, you can specify the default transparency of the _Volume_ indicator via `studies_overrides`, but you can use only `createStudy` to disable labels on the price scale.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        studies_overrides: {  
            "volume.volume.transparency": 99  
        }  
    });  
      
    widget.onChartReady(() => {  
        widget.chart().createStudy("Volume", false, false, undefined, {  
            "showLabelsOnPriceScale": false  
        }  
    });  
    

## Customize new seriesâ

Users can add new [series](/charting-library-docs/latest/getting_started/glossary# series) to the chart in the UI to compare symbols. To add a new series programmatically, you should use the _Overlay_ or _Compare_ indicator. For more information, refer to the [Indicators](/charting-library-docs/latest/ui_elements/indicators/# add-and-compare-new-series) article.

This section describes how to customize the _Overlay_ and _Compare_ indicators.

### Overlayâ

You should use [`studies_overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# studies_overrides) to specify default properties for all _Overlay_ indicators.
    
    
    studies_overrides: {  
        // ...  
        "overlay.style": 1,  // Candle  
        "overlay.candleStyle.upColor": "purple"  
    }  
    

You can also create a singe _Overlay_ indicator with specific parameters as follows:
    
    
    widget.activeChart().createStudy("Overlay", true, false, { symbol: "IBM" }, {  
            "style": 2  // Line  
            "lineStyle.color": "purple",  
        }  
    );  
    

Refer to [StudyOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOverrides# overlayextendtimescale) or [OverlayIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.OverlayIndicatorOverrides) to see a list of _Overlay_ overrides.

### Compareâ

You can customize the _Compare_ indicator as follows:
    
    
    studies_overrides: {  
        // ...  
        "compare.plot.color": "# 000000", // Color of the line  
        "compare.source": "high",        // Price source  
        "compare.minTick": "default"  
    }  
    

You can also create a singe _Compare_ indicator with specific parameters as follows:
    
    
    widget.activeChart().createStudy("Compare", true, false, { symbol: "IBM" }, {  
            "plot.color": "yellow"  
        }  
    );  
    

Refer to [StudyOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOverrides# compareplotcolor) or [CompareIndicatorOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.CompareIndicatorOverrides) to see a list of _Compare_ overrides.

## List of overridesâ

Each indicator has a set of overrides that you can use to change its style. The overrides syntax may or may not include the indicator's name depending on the method used. Refer to the pages below to see lists of overrides associated with the certain methods.

  * Use the properties listed in [`StudyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.StudyOverrides) to customize indicators via [`studies_overrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# studies_overrides) and [`applyStudiesOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# applystudiesoverrides).
  * Use the properties listed in [`SingleIndicatorOverrides`](/charting-library-docs/latest/api/modules/Charting_Library# singleindicatoroverrides) to customize indicators via [`createStudy`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) and [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# applyoverrides).

    
    
    var widget = window.tvWidget = new TradingView.widget({  
        studies_overrides: {  
            // Includes the indicator's name  
            "volume.volume.transparency": 99  
        }  
    });  
      
    widget.onChartReady(() => {  
        widget.chart().createStudy("Volume", false, false, undefined, {  
            // Does not include the indicator's name  
            "volume.transparency": 99  
        })  
    });  
    

Note that the pages above contain overrides for built-in indicators only. Refer to Overrides syntax for information on how to specify overrides for custom indicators.

## Overrides syntaxâ

The overrides syntax is the same for built-in and [custom indicators](/charting-library-docs/latest/custom_studies/). For your convenience, overrides names for built-in indicators are generated, and the links to these overrides are listed above. For custom indicators, you need to figure out the overrides names based on the rules described in this section.

### Overviewâ

Overrides consist of the following parts that should be separated by a dot:

  * An indicator's name. The name should be the same as in the _Indicators_ dialog in the UI. Note that this part should be omitted if you specify overrides using [`createStudy`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudy) and [`applyOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.IStudyApi# applyoverrides).

![Indicators dialog](/charting-library-docs/assets/images/indicators-ui-44fa751c0a630d5e752a22a6fe525b25.png)
  * A path to the certain property. Property names are the same as in the _Settings_ dialog in the UI (in English).

![Indicators settings](/charting-library-docs/assets/images/indicators-settings-ui-fa04f0508c5231880387b2ca7eda2189.png)

Both parts should be written in lower case, for example, `moving average.precision`.

### Property pathâ

A property path depends on a certain property and consists of lowercase identifiers separated by a dot. The properties and the corresponding path formats are described below.

To see all properties of the certain indicator, you can call the [`getStudyStyles`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# getstudystyles) method.
    
    
    widget.getStudyStyles("Moving Average");  
    

The code sample below shows the result of this call. Note that `getStudyStyles` does not return actual property names but the indicator's [metadata](/charting-library-docs/latest/custom_studies/metainfo/). The values in metadata have names like `plot_0`, which are internal IDs for the plots within the indicator. However, you should take the plot's name used in the UI to refer to the plot properties. In the example below, the correct path to the `color` property is `plot.color` not `plot_0.color`.
    
    
    {  
        "defaults": {  
            "styles": {  
                // Plot properties  
                "plot_0": {  
                    "display": 15,  
                    "linestyle": 0,  
                    "linewidth": 1,  
                    "plottype": 0,  
                    "trackPrice": false,  
                    "transparency": 0,  
                    "color": "# 2196F3"  
                },  
                "smoothedMA": {  
                    "display": 0,  
                    "linestyle": 0,  
                    "linewidth": 1,  
                    "plottype": 0,  
                    "trackPrice": false,  
                    "transparency": 0  
                }  
            },  
      
        // ...  
      
        "styles": {  
            "plot_0": {  
                "title": "Plot",  // Plot name in the UI  
                "histogramBase": 0,  
                "joinPoints": false  
            },  
            "smoothedMA": {  
                "title": "Smoothed MA",  
                "histogramBase": 0,  
                "joinPoints": false  
            }  
        }  
    }  
    

#### Input propertyâ

Format: `indicator_name.input_name`

  * **indicator_name** : use the name as you see it in the _Indicators_ dialog.
  * **input_name** : use the name as you see it in the _Settings_ dialog, for example, `show ma`.

Examples: `volume.volume ma.visible`, `bollinger bands.length`

You can call the [`getStudyInputs`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# getstudyinputs) method to see all input properties defined in the indicator's [metadata](/charting-library-docs/latest/custom_studies/metainfo/).
    
    
    widget.getStudyInputs("MACD");  
    

#### Plot propertyâ

info

**Plot** is a line or area that represents the indicator's values on the chart.

Format: `indicator_name.plot_name.property_name`

  * **indicator_name** : use the name as you see it in the _Indicators_ dialog.
  * **plot_name** : use the name as you see it in the _Settings_ dialog, for example, `volume` or `plot`.
  * **property_name** : one of the following:
    * **linewidth**
    * **visible** : boolean
    * **plottype**. Supported plot types are:
      * `line`
      * `histogram`
      * `cross`
      * `area`
      * `columns`
      * `circles`
      * `line_with_breaks`
      * `area_with_breaks`
      * `step_line`
      * `step_line_with_breaks`

Examples: `volume.volume.linewidth`, `bollinger bands.median.linewidth`

#### Plot color propertyâ

Format: `indicator_name.plot_name.color<.color_index>`

  * **indicator_name** : use the name as you see it in the _Indicators_ dialog.
  * **plot_name** : use the name as you see it in the _Settings_ dialog, for example, `volume` or `plot`.
  * **color** : a keyword.
  * **color_index** (optional): color index (if any). It is just an ordinal number of a color for this plot. For example, to replace the color that is green by default for _Volume_ , one should use `color_index = 1`.

**Remark 1** : `color.0` is a synonym of `color`. Paths such as `volume.volume.color.0` and `volume.volume.color` are treated the same.

**Remark 2** : The customization of area fill color and transparency is not supported currently.

**Limitations** :

  * Only `# RRGGBB` format is supported for colors. Do not use a short format `# RGB`.
  * Transparency varies and the range is [0..100]. 100 means plot is fully opaque.
  * Thickness is an integer.

#### Precision propertyâ

You can change the default precision of indicators using the `indicator_name.precision` format.

Example: `"average true range.precision": 8`

### Ambiguous identifiersâ

When the library complains that there is an 'ambiguous identifier', it means that more than one property has that specific property name. This can be possible because there are a few different types (plots, bands, areas, inputs) for the properties and the name only needs to be unique amongst its own type. So there can be cases where the library can not determine which property to change based solely on the name. In these cases, you should use the 'colon type' syntax to specifically tell the library which type the property is within.

The type should be specified at the end of the ambiguous name (just before the period) and can be one of the following types:

  * `:plot`
  * `:band`
  * `:area`
  * `:input`

#### Exampleâ

The _MA Cross_ indicator has both inputs and plots named 'Short' and 'Long'.

The code sample below creates the _MA Cross_ indicator with the following visual changes:

  * Changes the inputs for Short and Long from 9 and 26 to 12 and 24, respectively.
  * Changes the width of the Short line and its type from 'line' to 'histogram'.
  * Hides the Long line from the chart.
  * Changes the type of Crosses from 'Cross' to 'Line'.

    
    
    widget.activeChart().createStudy(  
        "MA Cross",  // Indicator's name  
        false, // forceOverlay  
        false, // lock  
        false, // inputs  
        // overrides  
        {  
            "short:input": 12, // Ambiguous; therefore, added :input  
            "long:input": 24, // Ambiguous; therefore, added :input  
            "short:plot.linewidth": 3, // Ambiguous; therefore, added :plot  
            "short:plot.plottype": "histogram", // Ambiguous; therefore, added :plot  
            "long:plot.display": 0, // Ambiguous; therefore, added :plot  
            "Crosses.plottype": "line"  
        }  
    );  
    


---

## Trading overrides | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/overrides/trading-overrides*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Overrides](/charting-library-docs/latest/customization/overrides/)
  * Trading overrides

On this page

# Trading overrides

info

Trading overrides are only available in [Trading Platform](/charting-library-docs/latest/trading_terminal/).

This article explains how to use the `trading_customization` property and the Overrides API to customize trading elements, including order and position lines, profit and loss information, and visibility settings.

## Customize order and position linesâ

You can override the style of order and position lines using the [`trading_customization`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# trading_customization) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). This property is defined by the [`TradingCustomization`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingCustomization) interface, which offers four customization options:

  * `brokerOrder` and `brokerPosition` for lines created with the Broker API.
  * `order` and `position` for lines created with trading primitives.

### Created with Broker APIâ

The [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api) is a component that enables trading. When the chart is initially loaded, the library requests user's orders and positions from the Broker API implementation through the [`orders`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# orders) and [`positions`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# positions) methods.

Order and position lines are displayed on the chart. You can override their style using the `brokerOrder` and `brokerPosition` properties of the [`trading_customization`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# trading_customization) object. See [`BrokerOrderOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerOrderOverrides) and [`BrokerPositionOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.BrokerPositionOverrides) for full lists of override properties.
    
    
    new TradingView.widget({  
      /* Other Widget Constructor properties */  
      
      trading_customization: {  
        brokerOrder: { /* Override properties for order lines */ },  
        brokerPosition: { /* Override properties for position lines */ },  
      },  
    })  
    

The example below shows how to create order and position lines using the Broker API and customize their colors. Note that "normal" in the property name indicates the line is active and visible in the UI, while "disabled" means the line is inactive, such as when another dialog is open.

See the Pen [ Customize order and position lines created with Broker API. Trading Platform](https://codepen.io/tradingview/pen/jOgZYOZ) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

### Created with trading primitivesâ

caution

Starting from version 29, the methods for creating trading primitives are only available in [Trading Platform](/charting-library-docs/latest/trading_terminal/).

[Trading primitives](/charting-library-docs/latest/trading_terminal/Trading-Primitives) is a low-level mechanism for creating order and position lines using the [`createOrderLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createorderline) and [`createPositionLine`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createpositionline) methods. You can override the style of these lines using the `order` and `position` properties within the [`trading_customization`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# trading_customization) object. See [`OrderLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.OrderLineToolOverrides) and [`PositionLineToolOverrides`](/charting-library-docs/latest/api/interfaces/Charting_Library.PositionLineToolOverrides) for full lists of override properties.
    
    
    new TradingView.widget({  
      /* Other Widget Constructor properties */  
      
      trading_customization: {  
        order: { /* Override properties for order lines */ },  
        position: { /* Override properties for position lines */ },  
      }  
    })  
    

The example below shows how to create order and position lines and customize their quantity text color, line color, style, and width.

See the Pen [ Customize order and position lines](https://codepen.io/tradingview/pen/ExBBNvQ) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Adjust display of trading featuresâ

The [Overrides API](/charting-library-docs/latest/customization/overrides/) offers properties to adjust the display, alignment, and style of profit and loss information, as well as manage the visibility of positions, orders, and execution details. The properties are listed on the [ChartPropertiesOverrides](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartPropertiesOverrides# tradingpropertiesbracketspldisplay) page and their names start with `tradingProperties`.

For example, you can hide profit and loss values for [bracket orders](/charting-library-docs/latest/trading_terminal/trading-concepts/brackets).
    
    
    widget.applyOverrides({  
      "tradingProperties.bracketsPL.visibility": false,  
    });  
    


---

## Custom themes API | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/styles/custom-themes*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Styles](/charting-library-docs/latest/customization/styles/)
  * Custom themes API

On this page

# Custom themes API

## Overviewâ

A theme is a set of colors arranged to create a cohesive visual design of the widget. Themes change the colors of UI elements inside and outside the chart. The library ships with the [light and dark themes](/charting-library-docs/latest/customization/# theme) that use the default color palette.

The Custom themes API allows you to override the default colors in the palette for the light and dark themes. In this way, you can change the colors of the following UI elements:

  * Toolbars
  * Dialogs
  * Context menus
  * Tooltips
  * Buttons
  * Chart background
  * Main series bars
  * Grid
  * Axes

Note that changing a color in the palette might affect multiple elements. To tweak a color of the certain element, for example the [_Price Scale_](/charting-library-docs/latest/ui_elements/Price-Scale), use the [Overrides API](/charting-library-docs/latest/customization/overrides/) that applies above the palette colors. Refer to the [Customization precedence](/charting-library-docs/latest/customization/customization-precedence) article for more information on customization approaches and their priorities.

info

The library supports only the light and dark themes. It is not possible to create an additional theme at the moment.

### Default color paletteâ

In the demo below, you can see the default color palette that contains seven colors besides black and white. Each color comes with 20 shades, ranging from the lightest to the darkest. Shades of one color are assigned to different UI elements. For example, light gray is used for the toolbar separators, while dark gray is applied to the tooltips.

The demo allows you to identify the original colors of the certain UI elements and test your colors on the chart. Click any color in the palette and specify a new one using the color picker. Changes in the palette will be applied to the chart. Therefore, if you change blue, all the elements that originally use it, for example buttons in the dialogs, will adopt the new color.

The currently applied colors are represented in the JSON format. You can use this code later to specify your custom palette with the Custom themes API.

See the Pen [ Interactive Custom Themes](https://codepen.io/tradingview/pen/YzgzQYV) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Specify custom palettesâ

To specify palettes for the light and dark themes, create a [`CustomThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomThemes) object and assign it to the [`custom_themes`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_themes) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). As mentioned in the previous section, a color palette should contain seven colors, each with 20 shades. The palette is configured in the [`CustomThemeColors`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomThemeColors) object that contains the following properties:

Property name| Definition  
---|---  
`color1`| Blue by default  
`color2`| Grey by default  
`color3`| Red by default  
`color4`| Green by default  
`color5`| Orange by default  
`color6`| Purple by default  
`color7`| Yellow by default  
  
To override a default color, create an array of color strings from the lightest to the darkest and assign it to the corresponding property. You can also specify colors used instead of black and white. If any color is not provided, the default one will be used.
    
    
    var widget = window.tvWidget = new TradingView.widget({  
        // ...  
        custom_themes: {  
            // The new palette for the light theme  
            light: {  
                // Color that overrides blue  
                "color1": ["# f5ebff", "# ead6fe", "# e0c2fe", "# d5adfe", "# cb99fd", "# c184fd", "# b670fd", "# ac5bfc", "# a147fc", "# 9732fc", "# 8209fb", "# 7708e6", "# 6c08d1", "# 6207bc", "# 5706a7", "# 4c0592", "# 41057e", "# 360469", "# 2b0354", "# 21023f"],  
                // Color that overrides grey  
                "color2": ["# f2edf7", "# e6dcef", "# d9cae7", "# ccb9df", "# bfa7d7", "# b396d0", "# a684c8", "# 9972c0", "# 8c61b8", "# 804fb0", "# 662ca0", "# 5e2893", "# 552585", "# 4d2178", "# 441d6b", "# 3c1a5d", "# 331650", "# 2b1243", "# 220f35", "# 1a0b28"],  
                // Color that overrides red  
                "color3": ["# fff0f0", "# ffe1e1", "# ffd3d3", "# ffc4c4", "# ffb5b5", "# ffa6a6", "# ff9797", "# ff8888", "# ff7a7a", "# ff6b6b", "# ff4d4d", "# ea4747", "# d54040", "# bf3a3a", "# aa3333", "# 952d2d", "# 802727", "# 6a2020", "# 551a1a", "# 401313"],  
                // Color that overrides green  
                "color4": ["# f2fdf8", "# e5faf0", "# d7f8e9", "# caf5e1", "# bdf3da", "# b0f1d2", "# a2eecb", "# 95ecc3", "# 88e9bc", "# 7be7b4", "# 60e2a5", "# 58cf97", "# 50bc8a", "# 48aa7c", "# 40976e", "# 388460", "# 307153", "# 285e45", "# 204b37", "# 183929"],  
                // Color that overrides orange  
                "color5": ["# fef5ea", "# fdecd5", "# fbe2bf", "# fad9aa", "# f9cf95", "# f8c680", "# f6bc6a", "# f5b255", "# f4a940", "# f39f2b", "# f08c00", "# dc8000", "# c87500", "# b46900", "# a05d00", "# 8c5200", "# 784600", "# 643a00", "# 502f00", "# 3c2300"],  
                // Color that overrides purple  
                "color6": ["# feeafe", "# fcd5fc", "# fbbffb", "# f9aaf9", "# f895f8", "# f780f7", "# f56af5", "# f455f4", "# f240f2", "# f12bf1", "# ee00ee", "# da00da", "# c600c6", "# b300b3", "# 9f009f", "# 8b008b", "# 770077", "# 630063", "# 4f004f", "# 3c003c"],  
                // Color that overrides yellow  
                "color7": ["# fefeea", "# fcfcd5", "# fbfbbf", "# f9f9aa", "# f8f895", "# f7f780", "# f5f56a", "# f4f455", "# f2f240", "# f1f12b", "# eeee00", "# dada00", "# c6c600", "# b3b300", "# 9f9f00", "# 8b8b00", "# 777700", "# 636300", "# 4f4f00", "# 3c3c00"],  
                "white": "# f2e6ff",  
                "black": "# 421b50"  
            },  
            dark: {  
                "color1": ["# fbefea", "# f7dfd5", "# f3cfc0", "# efbfaa", "# ebaf95", "# e89f80", "# e48f6b", "# e07f56", "# dc6f41", "# d85f2b", "# d03f01", "# bf3a01", "# ad3501", "# 9c2f01", "# 8b2a01", "# 792501", "# 682001", "# 571a00", "# 451500", "# 341000"],  
                "color2": ["# f8eeee", "# f1dede", "# eacdcd", "# e2bcbc", "# dbacac", "# d49b9b", "# cd8a8a", "# c67a7a", "# bf6969", "# b75858", "# a93737", "# 9b3232", "# 8d2e2e", "# 7f2929", "# 712525", "# 632020", "# 551c1c", "# 461717", "# 381212", "# 2a0e0e"],  
                "color3": ["# fff0f0", "# ffe1e1", "# ffd3d3", "# ffc4c4", "# ffb5b5", "# ffa6a6", "# ff9797", "# ff8888", "# ff7a7a", "# ff6b6b", "# ff4d4d", "# ea4747", "# d54040", "# bf3a3a", "# aa3333", "# 952d2d", "# 802727", "# 6a2020", "# 551a1a", "# 401313"],  
                "color4": ["# f2fffb", "# e6fff7", "# d9fff2", "# ccffee", "# bfffea", "# b3ffe6", "# a6ffe1", "# 99ffdd", "# 8cffd9", "# 80ffd5", "# 66ffcc", "# 5eeabb", "# 55d5aa", "# 4dbf99", "# 44aa88", "# 3c9577", "# 338066", "# 2b6a55", "# 225544", "# 1a4033"],  
                "color5": ["# fffff0", "# ffffe0", "# feffd1", "# feffc2", "# feffb2", "# feffa3", "# fdff94", "# fdff84", "# fdff75", "# fdff66", "# fcff47", "# e7ea41", "# d2d53b", "# bdbf35", "# a8aa2f", "# 939529", "# 7e8024", "# 696a1e", "# 545518", "# 3f4012"],  
                "color6": ["# fff1ff", "# ffe2ff", "# ffd4ff", "# ffc5ff", "# ffb7ff", "# ffa9ff", "# ff9aff", "# ff8cff", "# ff7dff", "# ff6fff", "# ff52ff", "# ea4bea", "# d544d5", "# bf3ebf", "# aa37aa", "# 953095", "# 802980", "# 6a226a", "# 551b55", "# 401540"],  
                "color7": ["# eff8ff", "# dff1ff", "# cfeaff", "# bee3ff", "# aedcff", "# 9ed5ff", "# 8eceff", "# 7ec7ff", "# 6ec0ff", "# 5db9ff", "# 3dabff", "# 389dea", "# 338fd5", "# 2e80bf", "# 2972aa", "# 246495", "# 1f5680", "# 19476a", "# 143955", "# 0f2b40"],  
                "white": "# ffffff",  
                "black": "# 000000"  
            }  
        }  
    });  
    

## Manage palettesâ

To manage custom palettes after the chart is initialized, you should call the [`customThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# customthemes) method. This method returns an instance of the [`ICustomThemesApi`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomThemesApi) interface that provides an extensive API for controlling the palettes.

### Change palette on the flyâ

Call the [`applyCustomThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomThemesApi# applycustomthemes) method and pass a [`CustomThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.CustomThemes) object as a parameter.
    
    
    let customThemesAPI = (await widget.customThemes());  
    customThemesAPI.applyCustomThemes(customThemes);  
    

### Reset palettesâ

Call the [`resetCustomThemes`](/charting-library-docs/latest/api/interfaces/Charting_Library.ICustomThemesApi# resetcustomthemes) method as follows:
    
    
    let customThemesAPI = (await widget.customThemes());  
    customThemesAPI.resetCustomThemes();  
    

### Disable the APIâ

You can disable the Custom themes API with the [`library_custom_color_themes`](/charting-library-docs/latest/customization/Featuresets# library_custom_color_themes) featureset. If you try to call the API in this case, the following error occurs: _The library_custom_color_themes feature must be enabled to use the Custom themes API_.


---

## CSS Color Themes | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/customization/styles/CSS-Color-Themes*

  * [](/charting-library-docs/)
  * [Customization](/charting-library-docs/latest/customization/)
  * [Styles](/charting-library-docs/latest/customization/styles/)
  * CSS Color Themes

On this page

# CSS Color Themes

caution

This article describes a legacy method for adjusting the colors of UI elements such as toolbars and context menus. We recommend using the [Custom themes API](/charting-library-docs/latest/customization/styles/custom-themes) instead, as it provides greater flexibility and precision.

## Connect the CSS fileâ

You can change the colors of UI elements with the CSS custom properties. To do this, you should specify these properties in a CSS file and connect the file to the library using the [`custom_css_url`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# custom_css_url) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). See customization example in [themed.html](https://github.com/tradingview/charting_library/blob/master/themed.html "The repository is private.") and [themed.css](https://github.com/tradingview/charting_library/blob/master/themed.css "The repository is private.") filesÂ ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")).

Use the following CSS selectors to specify colors depending on the theme:

  * `: root: not (.theme-dark)` â for the light theme
  * `.theme-dark: root` â for the dark theme

Expand to view the code sample that sets up the pink widget for both light and dark theme.
    
    
    :root:not(.theme-dark) {  
        --tv-color-platform-background: # d1c4e9;  
        --tv-color-pane-background: rgb(251, 223, 244);  
        --tv-color-toolbar-button-background-hover: rgb(244, 143, 177);  
        --tv-color-toolbar-button-background-expanded: rgb(244, 143, 177);  
        --tv-color-toolbar-button-background-active: rgb(249, 185, 233);  
        --tv-color-toolbar-button-background-active-hover: rgb(244, 143, 177);  
        --tv-color-toolbar-button-text: rgb(136, 24, 79);  
        --tv-color-toolbar-button-text-hover: rgb(74, 20, 140);  
        --tv-color-toolbar-button-text-active: red;  
        --tv-color-toolbar-button-text-active-hover: red;  
        --tv-color-item-active-text: rgb(6, 6, 255);  
        --tv-color-toolbar-toggle-button-background-active: red;  
        --tv-color-toolbar-toggle-button-background-active-hover: magenta;  
        --tv-color-toolbar-divider-background: rgb(251, 223, 244);  
        --tv-color-toolbar-save-layout-loader: rgb(106, 109, 120);  
      
        --tv-color-popup-background: rgb(241, 188, 225);  
        --tv-color-popup-element-text: rgb(136, 24, 79);  
        --tv-color-popup-element-text-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-background-hover: rgb(244, 143, 177);  
        --tv-color-popup-element-divider-background: rgb(251, 223, 244);  
        --tv-color-popup-element-secondary-text: rgb(74, 20, 140);  
        --tv-color-popup-element-hint-text: rgb(74, 20, 140);  
        --tv-color-popup-element-text-active: rgb(6, 6, 255);  
        --tv-color-popup-element-background-active: red;  
        --tv-color-popup-element-toolbox-text: rgb(136, 24, 79);  
        --tv-color-popup-element-toolbox-text-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-toolbox-text-active-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-toolbox-background-hover: rgb(222, 89, 132);  
        --tv-color-popup-element-toolbox-background-active-hover: magenta;  
    }  
      
    .theme-dark:root {  
        --tv-color-platform-background: # d1c4e9;  
        --tv-color-pane-background: rgb(251, 223, 244);  
        --tv-color-toolbar-button-background-hover: rgb(244, 143, 177);  
        --tv-color-toolbar-button-background-expanded: rgb(244, 143, 177);  
        --tv-color-toolbar-button-background-active: rgb(249, 185, 233);  
        --tv-color-toolbar-button-background-active-hover: rgb(244, 143, 177);  
        --tv-color-toolbar-button-text: rgb(136, 24, 79);  
        --tv-color-toolbar-button-text-hover: rgb(74, 20, 140);  
        --tv-color-toolbar-button-text-active: red;  
        --tv-color-toolbar-button-text-active-hover: red;  
        --tv-color-item-active-text: rgb(6, 255, 6);  
        --tv-color-toolbar-toggle-button-background-active: red;  
        --tv-color-toolbar-toggle-button-background-active-hover: magenta;  
        --tv-color-toolbar-divider-background: rgb(251, 223, 244);  
        --tv-color-toolbar-save-layout-loader: rgb(134, 137, 147);  
      
        --tv-color-popup-background: rgb(241, 188, 225);  
        --tv-color-popup-element-text: rgb(136, 24, 79);  
        --tv-color-popup-element-text-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-background-hover: rgb(244, 143, 177);  
        --tv-color-popup-element-divider-background: rgb(251, 223, 244);  
        --tv-color-popup-element-secondary-text: rgb(74, 20, 140);  
        --tv-color-popup-element-hint-text: rgb(74, 20, 140);  
        --tv-color-popup-element-text-active: rgb(6, 6, 255);  
        --tv-color-popup-element-background-active: red;  
        --tv-color-popup-element-toolbox-text: rgb(136, 24, 79);  
        --tv-color-popup-element-toolbox-text-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-toolbox-text-active-hover: rgb(74, 20, 140);  
        --tv-color-popup-element-toolbox-background-hover: rgb(222, 89, 132);  
        --tv-color-popup-element-toolbox-background-active-hover: magenta;  
    }  
    

## Adjust properties on the flyâ

To change or get the CSS custom properties values at runtime, use the [`setCSSCustomProperty`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# setcsscustomproperty) or [`getCSSCustomPropertyValue`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# getcsscustompropertyvalue) methods, respectively.
    
    
    widget.setCSSCustomProperty('--tv-color-pane-background', 'rgb(251, 223, 244)')  
    

You can also use these methods to adjust your own variables defined in the CSS file.

## List of CSS custom propertiesâ

  * `--tv-color-platform-background` â the main color of the page where all elements are placed on
  * `--tv-color-pane-background` â toolbar background color
  * `--tv-color-toolbar-button-background-hover` â hover effect color for a toolbar button
  * `--tv-color-toolbar-button-background-expanded` â hover effect color for the active button on the right toolbar
  * `--tv-color-toolbar-button-background-active` â background color for the active button on the right toolbar
  * `--tv-color-toolbar-button-background-active-hover` â background color for the active button on the right toolbar when hovering over it
  * `--tv-color-toolbar-button-text` â text and icon color for toolbar buttons
  * `--tv-color-toolbar-button-text-hover` â text and icon color for toolbar buttons when hovering over them
  * `--tv-color-toolbar-button-text-active` â text and icon color for toolbar buttons that are active
  * `--tv-color-toolbar-button-text-active-hover` â text and icon color for toolbar buttons that are active when hovering over them
  * `--tv-color-item-active-text` â text color for toggle toolbar buttons (e.g. Magnet Mode, Lock All Drawings)
  * `--tv-color-toolbar-toggle-button-background-active` â fill color for toggle toolbar buttons (e.g. Magnet Mode, Lock All Drawings)
  * `--tv-color-toolbar-toggle-button-background-active-hover` â fill color for toggle toolbar buttons when hovering over them (e.g. Magnet Mode, Lock All Drawings)
  * `--tv-color-toolbar-divider-background` â toolbar dividers color
  * `--tv-color-toolbar-save-layout-loader` â loader color for toolbar save layout button

### Pop-up menu propertiesâ

Pop-up and pop-over menus appear when the user clicks on a toolbar icon. The pop-over menu typically presents a list of tools, options, or commands that are relevant to the context of the icon or the current user task. These styling options are also applied for context menus.

  * `--tv-color-popup-background`
  * `--tv-color-popup-element-text`
  * `--tv-color-popup-element-text-hover`
  * `--tv-color-popup-element-background-hover`
  * `--tv-color-popup-element-divider-background`
  * `--tv-color-popup-element-secondary-text`
  * `--tv-color-popup-element-hint-text`
  * `--tv-color-popup-element-text-active`
  * `--tv-color-popup-element-background-active`
  * `--tv-color-popup-element-toolbox-text`
  * `--tv-color-popup-element-toolbox-text-hover`
  * `--tv-color-popup-element-toolbox-text-active-hover`
  * `--tv-color-popup-element-toolbox-background-hover`
  * `--tv-color-popup-element-toolbox-background-active-hover`

### Buy/Sell buttons propertiesâ

Use Chrome DevTools to inspect the code and identify CSS variables that allow styling the [Buy/Sell buttons](/charting-library-docs/latest/trading_terminal/# buysell-buttons-and-lines). For example, you can specify the color of the Sell button as follows:
    
    
    :root:not(.theme-dark) {  
        --themed-color-sell-btn-chart: rgb(251, 223, 244);  
    }  
    


---

## Chart layout methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/chart-layout-methods*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * [REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/)
  * Chart layout methods

On this page

# Chart layout methods

## List chartsâ

GET request: `charts_storage_url/charts_storage_api_version/charts?client=client_id&user=user_id`

### Response contentâ

The response is a JSON object containing the following properties:

Property| Description  
---|---  
`status`# | `ok` or `error`  
`data`# | Data object with the following properties: 

  * `timestamp` â UNIX time when the chart was saved (example: `1449084321`)
  * `symbol` â base symbol of the chart (example: `AA`)
  * `resolution` â chart resolution (example: `1D`)
  * `id` â unique integer identifier of the chart (example: `9163`)
  * `name` â chart name (example: `Test`)

  
  
* * *

## Save chartâ

POST request: `charts_storage_url/charts_storage_api_version/charts?client=client_id&user=user_id`

### Request bodyâ

Parameter| Description  
---|---  
`name`| Chart name  
`content`| Chart content  
`symbol`| Chart symbol (example: `AA`)  
`resolution`| Chart resolution (example: `1D`)  
  
### Response contentâ

The response is a JSON object containing the following properties:

Parameter| Description  
---|---  
`status`| `ok` or `error`  
`id`| Unique string identifier of the chart (example: `9163`)  
  
* * *

## Save as chartâ

POST request: `charts_storage_url/charts_storage_api_version/charts?client=client_id&user=user_id&chart=chart_id`

### Request bodyâ

Parameter| Description  
---|---  
`name`| Chart name  
`content`| Chart content  
`symbol`| Chart symbol (example: `AA`)  
`resolution`| Chart resolution (example: `1D`)  
  
### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.

* * *

## Load chartâ

GET request: `charts_storage_url/charts_storage_api_version/charts?client=client_id&user=user_id&chart=chart_id`

### Response contentâ

The response is a JSON object containing the following properties:

Property| Description  
---|---  
`status`# | `ok` or `error`  
`data`# | Data object with the following properties: 

  * `content` â saved content of the chart
  * `timestamp` â UNIX time when the chart was saved (example: `1449084321`)
  * `id` â unique integer identifier of the chart (example: `9163`)
  * `name` â chart name

  
  
* * *

## Delete chartâ

DELETE request: `charts_storage_url/charts_storage_api_version/charts?client=client_id&user=user_id&chart=chart_id`

### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.


---

## Indicator template methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/indicator-template-methods*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * [REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/)
  * Indicator template methods

On this page

# Indicator template methods

## List indicator templatesâ

GET request: `charts_storage_url/charts_storage_api_version/study_templates?client=client_id&user=user_id`

### Response contentâ

The response is a JSON object containing the following properties:

Parameter| Description  
---|---  
`status`| `ok` or `error`  
`data`| Array of objects where each object has a `name` property representing the template name (example: `Test`)  
  
* * *

## Save indicator templateâ

POST request: `charts_storage_url/charts_storage_api_version/study_templates?client=client_id&user=user_id`

### Request bodyâ

Parameter| Description  
---|---  
`name`| Template name  
`content`| Template content  
  
### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.

* * *

## Load indicator templateâ

GET request: `charts_storage_url/charts_storage_api_version/study_templates?client=client_id&user=user_id&chart=chart_id&template=name`, where `name` is a template name.

### Response contentâ

The response is a JSON object containing the following properties:

Property| Description  
---|---  
`status`# | `ok` or `error`  
`data`# | Data object with the following properties: 

  * `name` â template name
  * `content` â saved content of the template

  
  
* * *

## Delete indicator templatesâ

DELETE request: `charts_storage_url/charts_storage_api_version/study_templates?client=client_id&user=user_id&template=name`, where `name` is a template name.

### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.


---

## Drawing methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/drawing-methods*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * [REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/)
  * Drawing methods

On this page

# Drawing methods

info

These endpoints are only required when the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset is enabled. This allows [saving drawings separately](/charting-library-docs/latest/saving_loading/saving_drawings_separately) from the chart layout.

## Save drawingsâ

POST request:Â `charts_storage_url/charts_storage_api_version/drawings?client=client_id&user=user_id&chart=chart_id&layout=layout_id`

### Request bodyâ

The request body contains a JSON with the `state` property, which holds a [`LineToolsAndGroupsState`](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsAndGroupsState) object.

### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.

* * *

## Load drawingsâ

GET request:Â `charts_storage_url/charts_storage_api_version/drawings?client=client_id&user=user_id&chart=chart_id&layout=layout_id&symbol=symbol`

### Response contentâ

The response is a JSON object containing the following properties:

Parameter| Description  
---|---  
`status`| `ok` or `error`  
`data`| An object containing the `state` property, which holds a [`LineToolsAndGroupsState`](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsAndGroupsState) object


---

## Drawing template methods | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/drawing-template-methods*

  * [](/charting-library-docs/)  
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * [REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/)
  * Drawing template methods

On this page

# Drawing template methods

info

These endpoints are only available in [Trading Platform](/charting-library-docs/latest/trading_terminal/).

## List drawing templatesâ

GET request: `charts_storage_url/charts_storage_api_version/drawing_templates?client=client_id&user=user_id&tool=toolName`, where `toolName` is a name of a drawing.

### Response contentâ

The response is a JSON object containing the following properties:

Parameter| Description  
---|---  
`status`| `ok` or `error`  
`data`| An array containing items with the `name` property. This property represents template names (example: `Test`)  
  
* * *

## Save drawing templateâ

POST request:Â `charts_storage_url/charts_storage_api_version/drawing_templates?client=client_id&user=user_id&tool=toolName&name=templateName`, where:

  * `toolName` is a drawing name
  * `templateName` is a custom template name

### Request bodyâ

The request body contains a JSON object with the `content` property. This property represents the saved content of a template.

### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.

* * *

## Load drawing templateâ

GET request: `charts_storage_url/charts_storage_api_version/drawing_templates?client=client_id&user=user_id&chart=chart_id&tool=toolName&name=templateName`, where:

  * `toolName` is a name of a drawing
  * `templateName` is a name of a template to get

### Response contentâ

The response is a JSON object containing the following properties:

Parameter| Description  
---|---  
`status`| `ok` or `error`  
`data`| Data object containing the `content` property. This property represents saved content of the template.  
  
* * *

## Delete drawing templateâ

DELETE request: `charts_storage_url/charts_storage_api_version/drawing_templates?client=client_id&user=user_id&chart=chart_id&tool=toolName&name=templateName`, where:

  * `toolName` is a name of a drawing
  * `templateName` is a name of a template to remove

### Response contentâ

The response is a JSON object containing the `status` property, which may have values of either `ok` or `error`.


---

## API handlers for saving and loading | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-adapter*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * API handlers

On this page

# API handlers for saving and loading

## Overviewâ

You can use the API handlers instead of the [predefined REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/) to store:

  * [chart layouts](/charting-library-docs/latest/saving_loading/# chart-layouts)
  * [chart templates](/charting-library-docs/latest/saving_loading/# chart-templates)
  * [indicator templates](/charting-library-docs/latest/saving_loading/# indicator-templates)
  * [drawing templates](/charting-library-docs/latest/saving_loading/# drawing-templates)

When users click the save or load buttons in the UI, these actions initiate the saving and loading processes. API handlers allow implementing custom logic for save/load actions coming from UI. For example, you can add authorization headers or manage specific errors. Note that you need to have your own backend service to use API handlers.

## How to implementâ

Add the [`save_load_adapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# save_load_adapter) property to the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). `save_load_adapter` is an [`âIExternalSaveLoadAdapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalSaveLoadAdapter) object that contains the save/load functions. The library calls these functions when users click save/load UI elements.

## Examplesâ

### localStorageâ

The TypeScript example below shows how to implement in-memory saving logic, so that the data is saved within the browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

See the Pen [ Saving chart content to browser's localStorage using save_load_adapter](https://codepen.io/tradingview/pen/ExJjxjP) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

### In-memoryâ

The JavaScript example below shows how to implement in-memory saving logic, so that the data is saved only within the memory of the current tab. You can use this example for testing purposes or improve it by replacing the internals of these methods with calls to an external server.

See the Pen [ Saving templates to in-memory storage using save_load_adapter](https://codepen.io/tradingview/pen/QWozYXJ) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).


---

## Low-level API for saving and loading | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/low-level-api*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * Low-level API

On this page

# Low-level API for saving and loading

## Overviewâ

The low-level API is recommended when you want to use save/load UI elements that are not part of the TradingView UI. With the low-level API, you can save and load [chart layouts](/charting-library-docs/latest/saving_loading/# chart-layouts) and [indicator templates](/charting-library-docs/latest/saving_loading/# indicator-templates). Note that the low-level API methods are meant to be called directly by your JavaScript code.

info

This approach does not support saving [chart templates](/charting-library-docs/latest/saving_loading/# chart-templates). Consider implementing the [API handlers](/charting-library-docs/latest/saving_loading/save-load-adapter) instead.

## How to implementâ

To access the chart layout content directly, use the [`save`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# save) and [`load`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# load) methods. These methods are defined in the [`IChartingLibraryWidget`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget) interface and allow controlling the `widget` object.
    
    
    // Function to store the chart layout  
    function storeChartLayout(layout) {  
        // Implement your logic here  
    };  
      
    const widget = new TradingView.widget(/* Widget properties */);  
    widget.save((layout) => { storeChartLayout(layout) }); // Save the layout using the save() method  
      
    widget.load(storedLayout); // Later in your code, you can load the stored layout  
    

To access the indicator templates, use the [`createStudyTemplate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# createstudytemplate) and [`applyStudyTemplate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# applystudytemplate) methods. Note that you can access these methods through the [`chart`](/charting-library-docs/latest/core_concepts/widget-methods# chart) or [`activeChart`](/charting-library-docs/latest/core_concepts/widget-methods# activechart) widget methods.
    
    
    widget.onChartReady(() => {  
        const options = { saveSymbol: true, saveInterval: true };  
        const template = widget.activeChart().createStudyTemplate(options);  
      
        widget.activeChart().applyStudyTemplate(template);  
    });  
    

The content is saved as a JSON object which you can save where you wish. For example, you can embed it in your saved pages or in the user's working area.

## Hide save/load layout buttonsâ

You can disable the [`header_saveload`](/charting-library-docs/latest/customization/Featuresets# header_saveload) featureset to hide the built-in _Save layout_ and _Load layout_ buttons from the header toolbar.


---

## Saving drawings separately | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/saving_drawings_separately*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * Saving drawings separately

On this page

# Saving drawings separately

The library API offers an alternative approach for saving charts where the drawings can be stored separately from the chart layout. This behaviour is activated by the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset found in the library settings.

## Key advantagesâ

Storing drawings independently boasts several benefits:

  * **Per-symbol Drawings** : Drawings can now be associated with individual symbols, enabling reuse and flexibility across different layouts or charts.
  * **Efficient Data Size Management** : Separating drawings and chart layout properties potentially reduces the size of saved objects, optimizing load times and data storage on your server.

## Save load adapterâ

When you enable the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset, two extra methods `saveLineToolsAndGroups` and `loadLineToolsAndGroups` are expected in your implementation of the [`IExternalSaveLoadAdapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.IExternalSaveLoadAdapter) interface.

Consider the following example which implements the new methods:
    
    
    class SaveLoadAdapterWithDrawings extends SaveLoadAdapter {  
        constructor() {  
            super();  
            this.drawings = {};  
        }  
      
        async saveLineToolsAndGroups(layoutId, chartId, state) {  
            const drawings = state.sources;  
      
            if (!this.drawings[this._getDrawingKey(layoutId, chartId)]) {  
                this.drawings[this._getDrawingKey(layoutId, chartId)] = {}  
            }  
      
            for (let [key, state] of drawings) {  
                if (state === null) {  
                    delete this.drawings[this._getDrawingKey(layoutId, chartId)][key];  
                } else {  
                    this.drawings[this._getDrawingKey(layoutId, chartId)][key] = state;  
                }  
            }  
        }  
      
        async loadLineToolsAndGroups(layoutId, chartId) {  
            const rawSources = this.drawings[this._getDrawingKey(layoutId, chartId)];  
            if (!rawSources) return null;  
            const sources = new Map();  
      
            for (let [key, state] of Object.entries(rawSources)) {  
                sources.set(key, state);  
            }  
            return {  
                sources  
            };  
        }  
      
        _getDrawingKey(layoutId, chartId) {  
            return `${layoutId}/${chartId}`  
        }  
    }  
    

### Saving drawings per symbolâ

If you want to save the drawings independently of the chart layout, you can use the following TypeScript example, which extends the [localStorage example](/charting-library-docs/latest/saving_loading/save-load-adapter# localstorage).
    
    
    const drawingSourceStorageKey = 'LocalStorageSaveLoadAdapter_drawingSourceSymbol';  
    export class LocalStorageDrawingsPerSymbolSaveLoadAdapter extends LocalStorageSaveLoadAdapter {  
        private _drawingSourceSymbols: Record<string, string> = {};  
        public constructor() {  
            super();  
            this._drawingSourceSymbols = this._getFromLocalStorage<Record<string, string>>(drawingSourceStorageKey) ?? {};  
        }  
      
        protected override _saveAllToLocalStorage(): void {  
            super._saveAllToLocalStorage();  
            this._saveToLocalStorage(drawingSourceStorageKey, this._drawingSourceSymbols);  
        }  
      
        public override async saveLineToolsAndGroups(layoutId: string,  
            chartId: string | number,  
            state: LineToolsAndGroupsState): Promise<void> {  
            const drawings = state.sources;  
            if (!drawings) return;  
      
            for (let [key, state] of drawings) {  
                const symbolCheckKey = `${layoutId}/${chartId}/${key}`;  
                const symbol = state?.symbol ?? this._drawingSourceSymbols[symbolCheckKey];  
                if (!this._drawings[symbol]) this._drawings[symbol] = {};  
                if (state === null) {  
                    delete this._drawings[symbol][key];  
                    delete this._drawingSourceSymbols[symbolCheckKey];  
                } else {  
                    this._drawings[symbol][key] = state;  
                    this._drawingSourceSymbols[symbolCheckKey] = symbol;  
                }  
            }  
        }  
      
        public override async loadLineToolsAndGroups(  
            _layoutId: string | undefined,  
            _chartId: string | number,  
            _requestType: LineToolsAndGroupsLoadRequestType,  
            requestContext: LineToolsAndGroupsLoadRequestContext  
        ): Promise<Partial<LineToolsAndGroupsState> | null> {  
            // We only care about the symbol of the chart  
            const symbol = requestContext.symbol;  
            if (!symbol) return null;  
            const rawSources = this._drawings[symbol];  
            const sources = new Map();  
      
            for (let [key, state] of Object.entries(rawSources)) {  
                sources.set(key, state);  
            }  
      
            return {  
                sources  
            };  
        }  
    }  
    

### saveLineToolsAndGroupsâ

This method lets you capture and store the current drawings state from your chart.

It accepts three parameters:

  * `layoutId`: Denotes the specific chart layout
  * `chartId`: Identifies a particular chart within the layout
  * `state`: An instance of a `LineToolsAndGroupsState` object encapsulating the present state of the drawings

### loadLineToolsAndGroupsâ

Enables the loading of saved drawings back to the chart.

It takes these parameters:

  * `layoutId`: Represents the current chart layout
  * `chartId`: Specifies a distinct chart within the layout
  * `requestType`: Defines the type of load request ('mainSeriesLineTools', 'lineToolsWithoutSymbol', 'allLineTools', or 'studyLineTools')
  * `requestContext`: Captures contextual details for the request. It can contain specific data useful for certain custom behaviors but isn't always needed for creating the response

## REST APIâ

If you use the [REST API](/charting-library-docs/latest/saving_loading/save-load-rest-api/) for chart storage, you should implement the following endpoints in addition to the endpoints mentioned in the [Develop your own storage](/charting-library-docs/latest/saving_loading/save-load-rest-api/# develop-your-own-storage) section.

### Save drawingsâ

`POST` request:Â `charts_storage_url/charts_storage_api_version/drawings?client=client_id&user=user_id&chart=chart_id&layout=layout_id`

  1. `state`: `LineToolsAndGroupsState` object

RESPONSE: JSON Object

  1. `status`:Â `ok`Â orÂ `error`

### Load drawingsâ

`GET` request:Â `charts_storage_url/charts_storage_api_version/drawings?client=client_id&user=user_id&chart=chart_id&layout=layout_id`

RESPONSE: JSON Object

  1. `status`:Â `ok`Â orÂ `error`
  2. `data`: Object
    1. `state`: `LineToolsAndGroupsState` object

## Low-level API methodsâ

The [low-level API](/charting-library-docs/latest/saving_loading/low-level-api) has additional methods on the chart widget when you enable the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset.

### getLineToolsStateâ

This function captures the current drawings state from the chart. You can benefit from this if you need to programmatically capture and store the drawings state.
    
    
    const state = widget.activeChart().getLineToolsState();  
    // Send or save state as required...  
    

### applyLineToolsStateâ

Enable restoring the drawings on the chart by implementing a previously saved `LineToolsAndGroupsState` object.
    
    
    const state = // previously saved state  
    widget.activeChart().applyLineToolsState(state).then(() => {  
        console.log('Drawings state restored!');  
    });  
    

### reloadLineToolsFromServerâ

Triggers a re-request of drawings from the server (via the Save Load Adapter or REST API depending on your implementation).
    
    
    widget.activeChart().reloadLineToolsFromServer();  
    

## Customizing the chart save methodâ

The `save` method on the [`IChartingLibraryWidget`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget) interface now includes options to adjust its behavior. There is an `includeDrawings` option in `SaveChartOptions` which determines whether to include drawings in the chart layout object returned by the `save` method. This can be useful in conjunction with the low-level API methods described above.
    
    
    widget.save(state => {  
      // Handle saved state...  
    }, { includeDrawings: false });  
    

## Understanding the LineToolsAndGroupsState interfaceâ

The [`LineToolsAndGroupsState`](/charting-library-docs/latest/api/interfaces/Charting_Library.LineToolsAndGroupsState) interface plays a crucial role in maintaining the state of chart drawings, providing a structure for both individual drawings and drawing groups.

The `sources` property is a `Map`, which constructs key-value pairs to represent a distinct drawing. The key, in this case, is an identifier or UUID for a drawing, and the value accompanies a state object exclusive to that drawing. The state object also encapsulates the symbol associated with the drawings, adding another defining layer to the data representation.

Similarly, the `groups` property is a `Map` accounting for groups of drawings. Each key-value pair comprises an identifier key or UUID and an array of UUIDs forming the drawing group.

For both `sources` and `groups`, a UUID associated with a `null` value indicates that the respective drawing or drawing group is to be removed. This signifies when a previously existing drawing has been deleted by the user and is no longer present on the chart.

caution

It's important to note that the state objects (`LineToolState` and `LineToolsGroupState`) which represent the drawings' state should be treated essentially as black boxes. They are managed by the library and are not expected to be directly modified outside of it.

## Migrationâ

The process of migrating chart layouts saved with the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset, after the feature is enabled, can be undertaken following certain steps. The library will still support loading chart layouts with drawings even when the [`saveload_separate_drawings_storage`](/charting-library-docs/latest/customization/Featuresets# saveload_separate_drawings_storage) featureset is enabled. This allows you to load layouts saved using the pre-existing combined approach (when the drawings are saved in the chart layout) and then save them with the new separated approach (when this featureset is enabled).

Along with the saved data, it is recommended that you store a flag that signifies in which mode the layout was saved. Such that when you load the layout you know whether you need to migrate the data or not. Handling the saving and loading of this optional flag falls outside the API's scope and remains a detail to be implemented within your code.

To migrate a layout, listen for the [`chart_load_requested`](/charting-library-docs/latest/api/interfaces/Charting_Library.SubscribeEventsMap# chart_load_requested) event to occur and then evoke the [`saveChartToServer`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# savecharttoserver) method on the widget to trigger the layout to be saved again.

If you use the low-level API methods, saving the chart layout would require storing the following two pieces of data.
    
    
    widget.save(  
      (chartLayoutState) => {  
        const drawings = widget.activeChart().getLineToolsState();  
        // Send or save state as required...  
        //    save drawings  
        //    save chartLayoutState  
      },  
      { includeDrawings: false }  
    );  
    


---

## Save user settings | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/saving_loading/user-settings*

  * [](/charting-library-docs/)
  * [Saving and loading charts](/charting-library-docs/latest/saving_loading/)
  * Save user settings

On this page

# Save user settings

## Overviewâ

User settings are settings that remain regardless of the applied [chart layout](/charting-library-docs/latest/saving_loading/# chart-layouts). They are stored separately from chart layouts to ensure that users have control over their specific preferences. For example, the _Instant orders placement_ setting in [Trading Platform](/charting-library-docs/latest/trading_terminal/) allows users to place orders without confirmation. This setting is a part of user settings and is not saved when users save the chart layouts. Saving this setting within a chart layout could lead to unexpected user experiences and is considered a bad practice.

### Settings listâ

User settings include:

  * [Resolution](/charting-library-docs/latest/core_concepts/Resolution)
  * Order type and quantity in the [Order Ticket](/charting-library-docs/latest/trading_terminal/order-ticket)
  * _Chart settings â Trading_
    * _Buy/Sell buttons_
    * _Instant orders placement_
    * _Play sound for executions_
    * _Notifications_
  * _Summary row_ in the [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/)
  * Right and bottom widget bars view
  * Chart style
  * [Watchlist](/charting-library-docs/latest/trading_terminal/Watch-List)

### How to storeâ

There are two options for storing user settings:

  * Using the browser's [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), which is enabled by default. To disable this option, include the [`use_localstorage_for_settings`](/charting-library-docs/latest/customization/Featuresets# use_localstorage_for_settings) featureset in the [`disabled_features`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# disabled_features) array.
  * Implementing your preferred storage method, including the server-side one. For this, use the `settings_adapter` property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).

## Settings adapterâ

You can save user settings using the [`settings_adapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# settings_adapter) property of the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). This property allows not only storing settings in the preferred storage but also applying them to the chart.

info

The library provides multiple approaches to modify the chart's appearance and behavior, and `settings_adapter` is one of them. These approaches have a specific application order, meaning they may override any styles or settings applied by other approaches lower on the list. Refer to [Customization precedence](/charting-library-docs/latest/customization/customization-precedence) for more information.

The `settings_adapter` property accepts the [`ISettingsAdapter`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISettingsAdapter) object. In the [`initialSettings`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISettingsAdapter# initialsettings) property of `ISettingsAdapter`, specify the settings the chart should be initiated with. You should also implement two methods [`setValue`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISettingsAdapter# setvalue) and [`removeValue`](/charting-library-docs/latest/api/interfaces/Charting_Library.ISettingsAdapter# removevalue), which are triggered upon changes in settings.

Consider the code sample below that does the following:

  * Sets a watermark on the chart when the chart is initialized.
  * Sets settings (10 units of shares and the _limit_ order type) for the Order Ticket when the chart is initialized.
  * Logs actions in the console when settings are set or removed.

    
    
    new TradingView.widget({  
        /* Other properties */  
      
        settings_adapter: {  
            initialSettings: {  
                "symbolWatermark": '{ "visibility": "true", "color": "rgba(244, 67, 54, 0.25)" }',  
                "trading.Broker": '{"qty": {"AAPL": 10, "NasdaqNM:AAPL": 10}, "orderType": {"NasdaqNM:AAPL": 3}}',  
            },  
            setValue: function (key, value) {  
                console.log(`set value: ${key} ${value}`);  
            },  
            removeValue: function (key) {  
                console.log(`remove value: ${key}`);  
            },  
        }  
    })  
    
