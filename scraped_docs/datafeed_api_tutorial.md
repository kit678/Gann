# datafeed api tutorial

*This document contains aggregated content from 9 URLs*

## Table of Contents

1. [How to connect data via datafeed API | Advanced Charts Documentation](#how-to-connect-data-via-datafeed-api-|-advanced-charts-documentation)
2. [Set up the widget | Advanced Charts Documentation](#set-up-the-widget-|-advanced-charts-documentation)
3. [Implement datafeed | Advanced Charts Documentation](#implement-datafeed-|-advanced-charts-documentation)
4. [Implement streaming | Advanced Charts Documentation](#implement-streaming-|-advanced-charts-documentation)
5. [Tutorials | Advanced Charts Documentation](#tutorials-|-advanced-charts-documentation)
6. [How to run the library | Advanced Charts Documentation](#how-to-run-the-library-|-advanced-charts-documentation)
7. [How to enable debug mode | Advanced Charts Documentation](#how-to-enable-debug-mode-|-advanced-charts-documentation)
8. [How to create custom page in Account Manager | Advanced Charts Documentation](#how-to-create-custom-page-in-account-manager-|-advanced-charts-documentation)
9. [How to add custom button to top toolbar | Advanced Charts Documentation](#how-to-add-custom-button-to-top-toolbar-|-advanced-charts-documentation)


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

## Set up the widget | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Widget-Setup*

  * [](/charting-library-docs/)
  * [Connecting data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/)
  * Set up the widget

On this page

# Set up the widget

tip

This article is part of a tutorial about implementing Datafeed API. We recommend that you follow the guide from the [start](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/).

At this stage of the tutorial, you will initialize the basic elements of the integration and create a chart.

## Step 1. Clone the libraryâ

  1. Create a directory for your project:
    
        mkdir chart-project  
    cd chart-project  
    

  2. Clone the [library repository](https://github.com/tradingview/charting_library/ "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")).
    
        git clone https://github.com/tradingview/charting_library charting_library_cloned_data  
    

## Step 2. Add a containerâ

To display the chart, you need to add a DOM container. To do this, create an initial `index.html` file in your project directory (`chartâproject` in this tutorial) and add the following code:

/chartâproject/index.html
    
    
    <!DOCTYPE HTML>  
    <html>  
        <head>  
            <title>TradingView Advanced Charts example</title>  
      
            <!-- The script that loads the library -->  
            <script  
                type="text/javascript"  
                src="charting_library_cloned_data/charting_library/charting_library.js">  
            </script>  
      
            <!-- Custom datafeed module -->  
            <script type="module" src="src/main.js"></script>  
        </head>  
      
        <body style="margin:0px;">  
            <!-- A container for the the library widget -->  
            <div id="tv_chart_container">  
            </div>  
        </body>  
    </html>  
    

At this point, you added a script that is used to load the library and a container that will be used as a placeholder for the chart.

## Step 3. Create Widget Constructorâ

  1. Add the `src` folder to your project directory.

  2. Create a `main.js` file in `src` and add the following code that creates [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). Widget Constructor is the library entry point that allows embedding the library widget into your web page.

/chartâproject/src/main.js
    
        // Datafeed implementation that you will add later  
    import Datafeed from './datafeed.js';  
      
    window.tvWidget = new TradingView.widget({  
        symbol: 'BTC/EUR',                     // Default symbol pair  
        interval: '1D',                        // Default interval  
        fullscreen: true,                      // Displays the chart in the fullscreen mode  
        container: 'tv_chart_container',       // Reference to an attribute of a DOM element  
        datafeed: Datafeed,  
        library_path: '../charting_library_cloned_data/charting_library/',  
    });  
    

tip

This tutorial uses only the required Widget Constructor parameters that will be enabled when the chart is first loaded. However, Widget Constructor has many different parameters to manage. You can find the full list in the [`ChartingLibraryWidgetOptions`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions) interface.

## Next stepsâ

At this stage, you have set up Widget Constructor. Next, you will implement your own datafeed and methods.

## Complete codeâ

Click the following sections to reveal the complete code for the examples at this stage of the tutorial.

`index.html`
    
    
    <!DOCTYPE HTML>  
    <html>  
        <head>  
            <title>TradingView Advanced Charts example</title>  
      
            <!-- The script that loads the library -->  
            <script  
                type="text/javascript"  
                src="charting_library_cloned_data/charting_library/charting_library.js">  
            </script>  
      
            <!-- Custom datafeed module -->  
            <script type="module" src="src/main.js"></script>  
        </head>  
      
        <body style="margin:0px;">  
            <!-- A container for the the library widget -->  
            <div id="tv_chart_container">  
            </div>  
        </body>  
    </html>  
    

`main.js`
    
    
    // Datafeed implementation that you will add later  
    import Datafeed from './datafeed.js';  
      
    window.tvWidget = new TradingView.widget({  
        symbol: 'BTC/EUR',                     // Default symbol pair  
        interval: '1D',                        // Default interval  
        fullscreen: true,                      // Displays the chart in the fullscreen mode  
        container: 'tv_chart_container',       // Reference to the attribute of the DOM element  
        datafeed: Datafeed,  
        library_path: '../charting_library_cloned_data/charting_library/',  
    });  
    


---

## Implement datafeed | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Datafeed-Implementation*

  * [](/charting-library-docs/)
  * [Connecting data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/)
  * Implement datafeed

On this page

# Implement datafeed

tip

This article is part of a tutorial about implementing Datafeed API. We recommend that you follow the guide from the [start](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/).

At this stage, you will know how the Datafeed API works and implement your own datafeed and methods.

## How the datafeed worksâ

Datafeed API is a set of methods that you should implement and assign to the [datafeed object](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# datafeed) in [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). The library calls these methods to access and process data and fill the current chart with it. The datafeed returns results using callback functions. Refer to the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) topic for more information.

## Step 1. Create a datafeed mockâ

Create a `datafeed.js` file in `src` and add the following code:

/chartâproject/src/datafeed.js
    
    
    export default {  
        onReady: (callback) => {  
            console.log('[onReady]: Method call');  
        },  
        searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {  
            console.log('[searchSymbols]: Method call');  
        },  
        resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {  
            console.log('[resolveSymbol]: Method call', symbolName);  
        },  
        getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {  
            console.log('[getBars]: Method call', symbolInfo);  
        },  
        subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {  
            console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);  
        },  
        unsubscribeBars: (subscriberUID) => {  
            console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);  
        },  
    };  
    

This code sample represents a datafeed that writes a message to the console when any method is called. Now this is only a mock implementation, but you will implement all the methods in the next steps.

## Step 2. Implement methodsâ

### onReadyâ

The [`onReady`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# onready) method is the first datafeed method that is called when the chart is initialized. The library uses it to get datafeed configuration such as supported resolutions and exchanges.

  1. Add the following [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) implementation for the datafeed sample:

/chartâproject/src/datafeed.js
    
        const configurationData = {  
        // Represents the resolutions for bars supported by your datafeed  
        supported_resolutions: ['1D', '1W', '1M'],  
        // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange  
        exchanges: [  
            { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},  
            { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},  
        ],  
        // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type  
        symbols_types: [  
            { name: 'crypto', value: 'crypto'}  
        ]  
    };  
    

  2. Call the [`OnReadyCallback`](/charting-library-docs/latest/api/modules/Datafeed# onreadycallback) asynchronously and pass a [`DatafeedConfiguration`](/charting-library-docs/latest/api/interfaces/Charting_Library.DatafeedConfiguration) object as a parameter:

/chartâproject/src/datafeed.js
    
        onReady: (callback) => {  
        console.log('[onReady]: Method call');  
        setTimeout(() => callback(configurationData));  
    },  
    

### resolveSymbolâ

The [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method is called once the datafeed is configured. The library uses it to retrieve [symbol information](/charting-library-docs/latest/connecting_data/Symbology) such as exchange, time zone, price scale, and etc.

As mentioned [before](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/# use-external-data-source), the library does not contain or provide any data. For this reason, this tutorial uses the [CryptoCompare API](https://min-api.cryptocompare.com/).

  1. Create a `helpers.js` file for the CryptoCompare API functions and add the following code:

/chartâproject/src/helpers.js
    
        // Your CryptoCompare API key  
    export const apiKey = "<api-key>";  
      
    // Makes requests to CryptoCompare API  
    export async function makeApiRequest(path) {  
        try {  
            const url = new URL(`https://min-api.cryptocompare.com/${path}`);  
            url.searchParams.append('api_key',apiKey)  
            const response = await fetch(url.toString());  
            return response.json();  
        } catch (error) {  
            throw new Error(`CryptoCompare request error: ${error.status}`);  
        }  
    }  
      
    // Generates a symbol ID from a pair of the coins  
    export function generateSymbol(exchange, fromSymbol, toSymbol) {  
        const short = `${fromSymbol}/${toSymbol}`;  
        return {  
            short,  
        };  
    }  
    

At this step, you need a CryptoCompare API key (line 2). If you have not got this key yet, consider the [CryptoCompare documentation](https://www.cryptocompare.com/coins/guides/how-to-use-our-api/). Also, note that the `makeApiRequest` and `generateSymbol` functions are specific to CryptoCompare API and will be used in `resolveSymbol`. You might not need them when implementing your own datafeed.

  2. Import the functions from `helpers.js` into `datafeed.js`:

/chartâproject/src/datafeed.js
    
        import { makeApiRequest, generateSymbol } from './helpers.js';  
    

  3. Implement the `getAllSymbols` function to [obtain all symbols for all supported exchanges](https://min-api.cryptocompare.com/documentation?key=Other&cat=allExchangesV3Endpoint).

/chartâproject/src/datafeed.js
    
        // DatafeedConfiguration implementation  
    // ...  
    // Obtains all symbols for all exchanges supported by CryptoCompare API  
    async function getAllSymbols() {  
        const data = await makeApiRequest('data/v3/all/exchanges');  
        let allSymbols = [];  
      
        for (const exchange of configurationData.exchanges) {  
            const pairs = data.Data[exchange.value].pairs;  
      
            for (const leftPairPart of Object.keys(pairs)) {  
                const symbols = pairs[leftPairPart].map(rightPairPart => {  
                    const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);  
                    return {  
                        symbol: symbol.short,  
                        ticker: symbol.short,  
                        description: symbol.short,  
                        exchange: exchange.value,  
                        type: 'crypto',  
                    };  
                });  
                allSymbols = [...allSymbols, ...symbols];  
            }  
        }  
        return allSymbols;  
    }  
    

  4. Implement the [`resolveSymbol`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# resolvesymbol) method and specify [symbol information](/charting-library-docs/latest/connecting_data/Symbology) in a `symbolInfo` object according to [`LibrarySymbolInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo).

/chartâproject/src/datafeed.js
    
        resolveSymbol: async (  
        symbolName,  
        onSymbolResolvedCallback,  
        onResolveErrorCallback,  
        extension  
    ) => {  
        console.log('[resolveSymbol]: Method call', symbolName);  
        const symbols = await getAllSymbols();  
        const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);  
        if (!symbolItem) {  
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);  
            onResolveErrorCallback('Cannot resolve symbol');  
            return;  
        }  
        // Symbol information object  
        const symbolInfo = {  
            ticker: symbolItem.ticker,  
            name: symbolItem.symbol,  
            description: symbolItem.description,  
            type: symbolItem.type,  
            session: '24x7',  
            timezone: 'Etc/UTC',  
            exchange: symbolItem.exchange,  
            minmov: 1,  
            pricescale: 100,  
            has_intraday: false,  
            visible_plots_set: 'ohlc',  
            has_weekly_and_monthly: false,  
            supported_resolutions: configurationData.supported_resolutions,  
            volume_precision: 2,  
            data_status: 'streaming',  
        };  
        console.log('[resolveSymbol]: Symbol resolved', symbolName);  
        onSymbolResolvedCallback(symbolInfo);  
    },  
    

info

In this tutorial, you specified `supported_resolutions: ['1D', '1W', '1M']` in the `onReady` method. The library can build weekly and monthly resolutions from the daily ones (`1D`). However, you need to directly specify that the datafeed does not have these resolutions by setting [`has_weekly_and_monthly`](/charting-library-docs/latest/api/interfaces/Datafeed.LibrarySymbolInfo# has_weekly_and_monthly) to `false`.

### getBarsâ

The library uses [`getBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# getbars) to get historical data for a symbol within a certain range. Historical data will be retrieved from the CryptoCompare API.

  1. In `helpers.js`, implement a `parseFullSymbol` function that will parse a crypto pair symbol and return all parts of this symbol. Note that the `full` value is returned from `generateSymbol`.

/chartâproject/src/helpers.js
    
        // makeApiRequest and generateSymbol implementation  
    // ...  
    // Returns all parts of the symbol  
    export function parseFullSymbol(fullSymbol) {  
        const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);  
        if (!match) {  
            return null;  
        }  
        return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };  
    }  
    

  2. Import `parseFullSymbol` into `datafeed.js`.

/chartâproject/src/datafeed.js
    
        import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';  
    

  3. Implement [`getBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# getbars) using `parseFullSymbol` and CryptoCompare's [Daily Pair OHLCV](https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday) to retrieve historic OHLCV data.

caution

The CryptoCompare API does not allow specifying the `from` date, so you have to filter bars on the client side.

/chartâproject/src/datafeed.js
    
        getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {  
        const { from, to, firstDataRequest } = periodParams;  
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);  
        const parsedSymbol = parseFullSymbol(symbolInfo.full_name);  
        const urlParameters = {  
            e: parsedSymbol.exchange,  
            fsym: parsedSymbol.fromSymbol,  
            tsym: parsedSymbol.toSymbol,  
            toTs: to,  
            limit: 2000,  
        };  
        const query = Object.keys(urlParameters)  
            .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)  
                .join('&');  
        try {  
            const data = await makeApiRequest(`data/histoday?${query}`);  
            if (data.Response && data.Response === 'Error' || data.Data.length === 0) {  
                // "noData" should be set if there is no data in the requested period  
                onHistoryCallback([], { noData: true });  
                return;  
            }  
            let bars = [];  
            data.Data.forEach(bar => {  
                if (bar.time >= from && bar.time < to) {  
                    bars = [...bars, {  
                        time: bar.time * 1000,  
                        low: bar.low,  
                        high: bar.high,  
                        open: bar.open,  
                        close: bar.close,  
                    }];  
                }  
            });  
            console.log(`[getBars]: returned ${bars.length} bar(s)`);  
            onHistoryCallback(bars, { noData: false });  
        } catch (error) {  
            console.log('[getBars]: Get error', error);  
            onErrorCallback(error);  
        }  
    },  
    

### searchSymbolsâ

The library uses the [`searchSymbols`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# searchsymbols) method to request symbols that match some user input.

/chartâproject/src/datafeed.js
    
    
    searchSymbols: async (  
        userInput,  
        exchange,  
        symbolType,  
        onResultReadyCallback  
    ) => {  
        console.log('[searchSymbols]: Method call');  
        const symbols = await getAllSymbols();  
        const newSymbols = symbols.filter(symbol => {  
            const isExchangeValid = exchange === '' || symbol.exchange === exchange;  
            const fullName = `${symbol.exchange}:${symbol.ticker}`;  
            const isFullSymbolContainsInput = fullName  
                .toLowerCase()  
                .indexOf(userInput.toLowerCase()) !== -1;  
            return isExchangeValid && isFullSymbolContainsInput;  
        });  
        onResultReadyCallback(newSymbols);  
    },  
    

In this case, you will request all available symbols from the API and filter them in `datafeed.js`. If a user has not selected an exchange, the `exchange` argument will be equal to an empty string.

## Resultâ

At this point, you have implemented datafeed. Save all your changes and run the following command from your project directory (`chartâproject` in this tutorial):
    
    
    npx serve  
    

Open the library locally in your web browser to see the results. You should see a chart plotted and be able to search symbols and display historical data.

## Next stepsâ

In the next stage, you will implement real-time data streaming via WebSocket.

## Complete codeâ

Click the following sections to reveal the complete code for the examples at this stage of the tutorial.

`datafeed.js`
    
    
    import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';  
      
    // DatafeedConfiguration implementation  
    const configurationData = {  
        // Represents the resolutions for bars supported by your datafeed  
        supported_resolutions: ['1D', '1W', '1M'],  
        // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange  
        exchanges: [  
            { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},  
            { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},  
        ],  
        // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type  
        symbols_types: [  
            { name: 'crypto', value: 'crypto'}  
        ]  
    };  
      
    // Obtains all symbols for all exchanges supported by CryptoCompare API  
    async function getAllSymbols() {  
        const data = await makeApiRequest('data/v3/all/exchanges');  
        let allSymbols = [];  
      
        for (const exchange of configurationData.exchanges) {  
            const pairs = data.Data[exchange.value].pairs;  
      
            for (const leftPairPart of Object.keys(pairs)) {  
                const symbols = pairs[leftPairPart].map(rightPairPart => {  
                    const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);  
                    return {  
                        symbol: symbol.short,  
                        ticker: symbol.short,  
                        description: symbol.short,  
                        exchange: exchange.value,  
                        type: 'crypto',  
                    };  
                });  
                allSymbols = [...allSymbols, ...symbols];  
            }  
        }  
        return allSymbols;  
    }  
      
    export default {  
        onReady: (callback) => {  
            console.log('[onReady]: Method call');  
            setTimeout(() => callback(configurationData));  
        },  
      
        searchSymbols: async (  
            userInput,  
            exchange,  
            symbolType,  
            onResultReadyCallback  
        ) => {  
            console.log('[searchSymbols]: Method call');  
            const symbols = await getAllSymbols();  
            const newSymbols = symbols.filter(symbol => {  
                const isExchangeValid = exchange === '' || symbol.exchange === exchange;  
                const fullName = `${symbol.exchange}:${symbol.ticker}`;  
                const isFullSymbolContainsInput = fullName  
                    .toLowerCase()  
                    .indexOf(userInput.toLowerCase()) !== -1;  
                return isExchangeValid && isFullSymbolContainsInput;  
            });  
            onResultReadyCallback(newSymbols);  
        },  
      
        resolveSymbol: async (  
            symbolName,  
            onSymbolResolvedCallback,  
            onResolveErrorCallback,  
            extension  
        ) => {  
            console.log('[resolveSymbol]: Method call', symbolName);  
            const symbols = await getAllSymbols();  
            const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);  
            if (!symbolItem) {  
                console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);  
                onResolveErrorCallback('Cannot resolve symbol');  
                return;  
            }  
            // Symbol information object  
            const symbolInfo = {  
                ticker: symbolItem.ticker,  
                name: symbolItem.symbol,  
                description: symbolItem.description,  
                type: symbolItem.type,  
                session: '24x7',  
                timezone: 'Etc/UTC',  
                exchange: symbolItem.exchange,  
                minmov: 1,  
                pricescale: 100,  
                has_intraday: false,  
                visible_plots_set: 'ohlc',  
                has_weekly_and_monthly: false,  
                supported_resolutions: configurationData.supported_resolutions,  
                volume_precision: 2,  
                data_status: 'streaming',  
            };  
            console.log('[resolveSymbol]: Symbol resolved', symbolName);  
            onSymbolResolvedCallback(symbolInfo);  
        },  
      
        getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {  
            const { from, to, firstDataRequest } = periodParams;  
            console.log('[getBars]: Method call', symbolInfo, resolution, from, to);  
            const parsedSymbol = parseFullSymbol(symbolInfo.full_name);  
            const urlParameters = {  
                e: parsedSymbol.exchange,  
                fsym: parsedSymbol.fromSymbol,  
                tsym: parsedSymbol.toSymbol,  
                toTs: to,  
                limit: 2000,  
            };  
            const query = Object.keys(urlParameters)  
                .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)  
                    .join('&');  
            try {  
                const data = await makeApiRequest(`data/histoday?${query}`);  
                if (data.Response && data.Response === 'Error' || data.Data.length === 0) {  
                    // "noData" should be set if there is no data in the requested period  
                    onHistoryCallback([], { noData: true });  
                    return;  
                }  
                let bars = [];  
                data.Data.forEach(bar => {  
                    if (bar.time >= from && bar.time < to) {  
                        bars = [...bars, {  
                            time: bar.time * 1000,  
                            low: bar.low,  
                            high: bar.high,  
                            open: bar.open,  
                            close: bar.close,  
                        }];  
                    }  
                });  
                console.log(`[getBars]: returned ${bars.length} bar(s)`);  
                onHistoryCallback(bars, { noData: false });  
            } catch (error) {  
                console.log('[getBars]: Get error', error);  
                onErrorCallback(error);  
            }  
        },  
      
        subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {  
            console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);  
        },  
        unsubscribeBars: (subscriberUID) => {  
            console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);  
        },  
    };  
      
    

`helpers.js`
    
    
    // Your CryptoCompare API key  
    export const apiKey = "<api-key>";  
      
    // Makes requests to CryptoCompare API  
    export async function makeApiRequest(path) {  
        try {  
            const url = new URL(`https://min-api.cryptocompare.com/${path}`);  
            url.searchParams.append('api_key',apiKey)  
            const response = await fetch(url.toString());  
            return response.json();  
        } catch (error) {  
            throw new Error(`CryptoCompare request error: ${error.status}`);  
        }  
    }  
      
    // Generates a symbol ID from a pair of the coins  
    export function generateSymbol(exchange, fromSymbol, toSymbol) {  
        const short = `${fromSymbol}/${toSymbol}`;  
        return {  
            short,  
        };  
    }  
      
    // Returns all parts of the symbol  
    export function parseFullSymbol(fullSymbol) {  
        const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);  
        if (!match) {  
            return null;  
        }  
        return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };  
    }  
    


---

## Implement streaming | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Streaming-Implementation*

  * [](/charting-library-docs/)
  * [Connecting data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/)
  * Implement streaming

On this page

# Implement streaming

tip

This article is part of a tutorial about implementing Datafeed API. We recommend that you follow the guide from the [start](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/).

At this stage, you will implement real-time data updates via WebSocket. You will know how to:

  * Connect to streaming and unsubscribe from it.
  * Subscribe for data updates and handle them.

## Step 1. Connect to streamingâ

To connect your datafeed to the streaming API:

  1. Import `apiKey` from [`helpers.js`](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Datafeed-Implementation# resolvesymbol) into `streaming.js`.

/chartâproject/src/streaming.js
    
        import { apiKey } from './helpers.js';  
    

  2. Create a new file called `streaming.js`, where you will implement a connection to WebSocket.

/chartâproject/src/streaming.js
    
        const socket = new WebSocket(  
        'wss://streamer.cryptocompare.com/v2?api_key=' + apiKey  
    );  
      
    const channelToSubscription = new Map();  
      
    socket.addEventListener('open', () => {  
        console.log('[socket] Connected');  
    });  
      
    socket.addEventListener('close', (reason) => {  
        console.log('[socket] Disconnected:', reason);  
    });  
      
    socket.addEventListener('error', (error) => {  
        console.log('[socket] Error:', error);  
    });  
      
    export function subscribeOnStream() {  
        // To Do  
    }  
      
    export function unsubscribeFromStream() {  
        // To Do  
    }  
    

  3. Import the functions from `streaming.js` into `datafeed.js`:

/chartâproject/src/datafeed.js
    
        import { subscribeOnStream, unsubscribeFromStream } from './streaming.js';  
    

  4. To subscribe for real-time data updates for a symbol, implement [`subscribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# subscribebars). the library calls it every time the chart symbol or resolution is changed, or when the chart needs to subscribe to a new symbol.

/chartâproject/src/datafeed.js
    
        // ...  
    // Use it to keep a record of the most recent bar on the chart  
    const lastBarsCache = new Map();  
    // ...  
    export default {  
        // ...  
        subscribeBars: (  
            symbolInfo,  
            resolution,  
            onRealtimeCallback,  
            subscriberUID,  
            onResetCacheNeededCallback  
        ) => {  
            console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);  
            subscribeOnStream(  
                symbolInfo,  
                resolution,  
                onRealtimeCallback,  
                subscriberUID,  
                onResetCacheNeededCallback,  
                lastBarsCache.get(symbolInfo.full_name),  
            );  
        },  
    };  
    

  5. Implement [`unsubscribeBars`](/charting-library-docs/latest/connecting_data/datafeed-api/required-methods# unsubscribebars) to stop receiving updates for the symbol when a user selects another symbol on the chart.

/chartâproject/src/datafeed.js
    
        unsubscribeBars: (subscriberUID) => {  
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);  
        unsubscribeFromStream(subscriberUID);  
    },  
    

## Step 2. Subscribe for updatesâ

On the previous step, you connected your datafeed to WebSocket. Now, you need to subscribe to the channels to receive updates:

  1. Import `parseFullSymbol` from [`helpers.js`](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Datafeed-Implementation# resolvesymbol) into `streaming.js`.

/chartâproject/src/streaming.js
    
        import { parseFullSymbol, apiKey } from './helpers.js';  
    

  2. Implement `subscribeOnStream` to subscribe for updates.

/chartâproject/src/streaming.js
    
        // ...  
    const channelToSubscription = new Map();  
    // ...  
    export function subscribeOnStream(  
        symbolInfo,  
        resolution,  
        onRealtimeCallback,  
        subscriberUID,  
        onResetCacheNeededCallback,  
        lastDailyBar  
    )  
    {  
        const parsedSymbol = parseFullSymbol(symbolInfo.full_name);  
        const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;  
        const handler = {  
            id: subscriberUID,  
            callback: onRealtimeCallback,  
        };  
        let subscriptionItem = channelToSubscription.get(channelString);  
        if (subscriptionItem) {  
            // Already subscribed to the channel, use the existing subscription  
            subscriptionItem.handlers.push(handler);  
            return;  
        }  
        subscriptionItem = {  
            subscriberUID,  
            resolution,  
            lastDailyBar,  
            handlers: [handler],  
        };  
        channelToSubscription.set(channelString, subscriptionItem);  
        console.log(  
            '[subscribeBars]: Subscribe to streaming. Channel:',  
            channelString  
        );  
        const subRequest = {  
            action: 'SubAdd',  
            subs: [channelString],  
        };  
        socket.send(JSON.stringify(subRequest));  
    }  
    

## Step 3. Unsubscribe from streamingâ

Implement `unsubscribeFromStream` to unsubscribe from streaming:

/chartâproject/src/streaming.js
    
    
    export function unsubscribeFromStream(subscriberUID) {  
        // Find a subscription with id === subscriberUID  
        for (const channelString of channelToSubscription.keys()) {  
            const subscriptionItem = channelToSubscription.get(channelString);  
            const handlerIndex = subscriptionItem.handlers.findIndex(  
                (handler) => handler.id === subscriberUID  
            );  
            if (handlerIndex !== -1) {  
                // Remove from handlers  
                subscriptionItem.handlers.splice(handlerIndex, 1);  
                if (subscriptionItem.handlers.length === 0) {  
                    // Unsubscribe from the channel if it was the last handler  
                    console.log(  
                        '[unsubscribeBars]: Unsubscribe from streaming. Channel:',  
                        channelString  
                    );  
                    const subRequest = {  
                        action: 'SubRemove',  
                        subs: [channelString],  
                    };  
                    socket.send(JSON.stringify(subRequest));  
                    channelToSubscription.delete(channelString);  
                    break;  
                }  
            }  
        }  
    }  
    

## Step 4. Handle updatesâ

The responses for requests look like this:
    
    
    0~Bitfinex~BTC~USD~2~335394436~1548837377~0.36~3504.1~1261.4759999999999~1f  
    

To handle updates coming from the WebSocket:

  1. Implement the following function in `streaming.js`:

/chartâproject/src/streaming.js
    
            // ...  
    socket.addEventListener('message', (event) => {  
        const data = JSON.parse(event.data);  
        console.log('[socket] Message:', data);  
        const {  
            TYPE: eventTypeStr,  
            M: exchange,  
            FSYM: fromSymbol,  
            TSYM: toSymbol,  
            TS: tradeTimeStr,  
            P: tradePriceStr,  
        } = data;  
      
        if (parseInt(eventTypeStr) !== 0) {  
            // Skip all non-trading events  
            return;  
        }  
        const tradePrice = parseFloat(tradePriceStr);  
        const tradeTime = parseInt(tradeTimeStr);  
        const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;  
        const subscriptionItem = channelToSubscription.get(channelString);  
        if (subscriptionItem === undefined) {  
            return;  
        }  
        const lastDailyBar = subscriptionItem.lastDailyBar;  
        let bar = {  
            ...lastDailyBar,  
            high: Math.max(lastDailyBar.high, tradePrice),  
            low: Math.min(lastDailyBar.low, tradePrice),  
            close: tradePrice,  
        };  
        console.log('[socket] Update the latest bar by price', tradePrice);  
        subscriptionItem.lastDailyBar = bar;  
      
        // Send data to every subscriber of that symbol  
        subscriptionItem.handlers.forEach((handler) => handler.callback(bar));  
    });  
    

  2. Adjust the [`getBars`](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/Datafeed-Implementation# getbars) method in `datafeed.js` to save the last bar data for the current symbol.

/chartâproject/src/datafeed.js
    
        //...  
    data.Data.forEach( ... );  
    if (firstDataRequest) {  
        lastBarsCache.set(symbolInfo.full_name, {  
            ...bars[bars.length - 1],  
        });  
    }  
    console.log(`[getBars]: returned ${bars.length} bar(s)`);  
    // ...  
    

  3. Add `getNextDailyBarTime` function to `streaming.js`.

/chartâproject/src/streaming.js
    
        function getNextDailyBarTime(barTime) {  
        const date = new Date(barTime * 1000);  
        date.setDate(date.getDate() + 1);  
        return date.getTime() / 1000;  
    }  
    

CryptoCompare API provides a streaming of ticks, not bars. So, you need to check that the new trade is related to the new daily bar.

Note that you might need a more comprehensive check for the production version.

  4. Adjust the `socket.on` listener in `streaming.js`.
    
        socket.on('m', data => {  
        //...  
        const lastDailyBar = subscriptionItem.lastDailyBar;  
        const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);  
      
        let bar;  
        if (tradeTime >= nextDailyBarTime) {  
            bar = {  
                time: nextDailyBarTime,  
                open: tradePrice,  
                high: tradePrice,  
                low: tradePrice,  
                close: tradePrice,  
            };  
            console.log('[socket] Generate new bar', bar);  
        } else {  
            bar = {  
                ...lastDailyBar,  
                high: Math.max(lastDailyBar.high, tradePrice),  
                low: Math.min(lastDailyBar.low, tradePrice),  
                close: tradePrice,  
            };  
            console.log('[socket] Update the latest bar by price', tradePrice);  
        }  
        subscriptionItem.lastDailyBar = bar;  
        //...  
    });  
    

## Resultâ

ð Congrats! At this point, you have implemented a datafeed with searching and resolving symbols, loading historical data, and providing real-time data updates via WebSocket.

Now you can run `npx serve` from the `chart-project` folder (if you have not already done it before) and check how the implementation works.

## Complete codeâ

Click the following sections to reveal the complete code for the examples at this stage of the tutorial.

`index.html`
    
    
    <!DOCTYPE HTML>  
    <html>  
        <head>  
            <title>TradingView Advanced Charts example</title>  
      
            <!-- The script that loads the library -->  
            <script  
                type="text/javascript"  
                src="charting_library_cloned_data/charting_library/charting_library.js">  
            </script>  
      
            <!-- Custom datafeed module -->  
            <script type="module" src="src/main.js"></script>  
        </head>  
      
        <body style="margin:0px;">  
            <!-- A container for the the library widget -->  
            <div id="tv_chart_container">  
            </div>  
        </body>  
    </html>  
    

`datafeed.js`
    
    
    import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';  
    import { subscribeOnStream, unsubscribeFromStream } from './streaming.js';  
      
    const lastBarsCache = new Map();  
      
    // DatafeedConfiguration implementation  
    const configurationData = {  
        // Represents the resolutions for bars supported by your datafeed  
        supported_resolutions: ['1D', '1W', '1M'],  
        // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange  
        exchanges: [{  
            value: 'Bitfinex',  
            name: 'Bitfinex',  
            desc: 'Bitfinex',  
        },  
        {  
            value: 'Kraken',  
            // Filter name  
            name: 'Kraken',  
            // Full exchange name displayed in the filter popup  
            desc: 'Kraken bitcoin exchange',  
        },  
        ],  
        // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type  
        symbols_types: [{  
            name: 'crypto',  
            value: 'crypto',  
        },  
        ],  
    };  
      
    // Obtains all symbols for all exchanges supported by CryptoCompare API  
    async function getAllSymbols() {  
        const data = await makeApiRequest('data/v3/all/exchanges');  
        let allSymbols = [];  
      
        for (const exchange of configurationData.exchanges) {  
            const pairs = data.Data[exchange.value].pairs;  
      
            for (const leftPairPart of Object.keys(pairs)) {  
                const symbols = pairs[leftPairPart].map(rightPairPart => {  
                    const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);  
                    return {  
                        symbol: symbol.short,  
                        full_name: symbol.full,  
                        description: symbol.short,  
                        exchange: exchange.value,  
                        type: 'crypto',  
                    };  
                });  
                allSymbols = [...allSymbols, ...symbols];  
            }  
        }  
        return allSymbols;  
    }  
      
    export default {  
        onReady: (callback) => {  
            console.log('[onReady]: Method call');  
            setTimeout(() => callback(configurationData));  
        },  
      
        searchSymbols: async (  
            userInput,  
            exchange,  
            symbolType,  
            onResultReadyCallback,  
        ) => {  
            console.log('[searchSymbols]: Method call');  
            const symbols = await getAllSymbols();  
            const newSymbols = symbols.filter(symbol => {  
                const isExchangeValid = exchange === '' || symbol.exchange === exchange;  
                const isFullSymbolContainsInput = symbol.full_name  
                    .toLowerCase()  
                    .indexOf(userInput.toLowerCase()) !== -1;  
                return isExchangeValid && isFullSymbolContainsInput;  
            });  
            onResultReadyCallback(newSymbols);  
        },  
      
        resolveSymbol: async (  
            symbolName,  
            onSymbolResolvedCallback,  
            onResolveErrorCallback,  
            extension  
        ) => {  
            console.log('[resolveSymbol]: Method call', symbolName);  
            const symbols = await getAllSymbols();  
            const symbolItem = symbols.find(({  
                full_name,  
            }) => full_name === symbolName);  
            if (!symbolItem) {  
                console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);  
                onResolveErrorCallback('cannot resolve symbol');  
                return;  
            }  
            // Symbol information object  
            const symbolInfo = {  
                ticker: symbolItem.full_name,  
                name: symbolItem.symbol,  
                description: symbolItem.description,  
                type: symbolItem.type,  
                session: '24x7',  
                timezone: 'Etc/UTC',  
                exchange: symbolItem.exchange,  
                minmov: 1,  
                pricescale: 100,  
                has_intraday: false,  
                has_no_volume: true,  
                has_weekly_and_monthly: false,  
                supported_resolutions: configurationData.supported_resolutions,  
                volume_precision: 2,  
                data_status: 'streaming',  
            };  
      
            console.log('[resolveSymbol]: Symbol resolved', symbolName);  
            onSymbolResolvedCallback(symbolInfo);  
        },  
      
        getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {  
            const { from, to, firstDataRequest } = periodParams;  
            console.log('[getBars]: Method call', symbolInfo, resolution, from, to);  
            const parsedSymbol = parseFullSymbol(symbolInfo.full_name);  
            const urlParameters = {  
                e: parsedSymbol.exchange,  
                fsym: parsedSymbol.fromSymbol,  
                tsym: parsedSymbol.toSymbol,  
                toTs: to,  
                limit: 2000,  
            };  
            const query = Object.keys(urlParameters)  
                .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)  
                .join('&');  
            try {  
                const data = await makeApiRequest(`data/histoday?${query}`);  
                if (data.Response && data.Response === 'Error' || data.Data.length === 0) {  
                    // "noData" should be set if there is no data in the requested period  
                    onHistoryCallback([], {  
                        noData: true,  
                    });  
                    return;  
                }  
                let bars = [];  
                data.Data.forEach(bar => {  
                    if (bar.time >= from && bar.time < to) {  
                        bars = [...bars, {  
                            time: bar.time * 1000,  
                            low: bar.low,  
                            high: bar.high,  
                            open: bar.open,  
                            close: bar.close,  
                        }];  
                    }  
                });  
                if (firstDataRequest) {  
                    lastBarsCache.set(symbolInfo.full_name, {  
                        ...bars[bars.length - 1],  
                    });  
                }  
                console.log(`[getBars]: returned ${bars.length} bar(s)`);  
                onHistoryCallback(bars, {  
                    noData: false,  
                });  
            } catch (error) {  
                console.log('[getBars]: Get error', error);  
                onErrorCallback(error);  
            }  
        },  
      
        subscribeBars: (  
            symbolInfo,  
            resolution,  
            onRealtimeCallback,  
            subscriberUID,  
            onResetCacheNeededCallback,  
        ) => {  
            console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);  
            subscribeOnStream(  
                symbolInfo,  
                resolution,  
                onRealtimeCallback,  
                subscriberUID,  
                onResetCacheNeededCallback,  
                lastBarsCache.get(symbolInfo.full_name),  
            );  
        },  
      
        unsubscribeBars: (subscriberUID) => {  
            console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);  
            unsubscribeFromStream(subscriberUID);  
        },  
    };  
    

`streaming.js`
    
    
    import { parseFullSymbol, apiKey } from './helpers.js';  
      
    const socket = new WebSocket(  
        'wss://streamer.cryptocompare.com/v2?api_key=' + apiKey  
    );  
    const channelToSubscription = new Map();  
      
    socket.addEventListener('open', () => {  
        console.log('[socket] Connected');  
    });  
      
    socket.addEventListener('close', (reason) => {  
        console.log('[socket] Disconnected:', reason);  
    });  
      
    socket.addEventListener('error', (error) => {  
        console.log('[socket] Error:', error);  
    });  
      
    socket.addEventListener('message', (event) => {  
        const data = JSON.parse(event.data);  
        console.log('[socket] Message:', data);  
        const {  
            TYPE: eventTypeStr,  
            M: exchange,  
            FSYM: fromSymbol,  
            TSYM: toSymbol,  
            TS: tradeTimeStr,  
            P: tradePriceStr,  
        } = data;  
      
        if (parseInt(eventTypeStr) !== 0) {  
            // Skip all non-trading events  
            return;  
        }  
        const tradePrice = parseFloat(tradePriceStr);  
        const tradeTime = parseInt(tradeTimeStr);  
        const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;  
        const subscriptionItem = channelToSubscription.get(channelString);  
        if (subscriptionItem === undefined) {  
            return;  
        }  
        const lastDailyBar = subscriptionItem.lastDailyBar;  
        const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);  
      
        let bar;  
        if (tradeTime >= nextDailyBarTime) {  
            bar = {  
                time: nextDailyBarTime,  
                open: tradePrice,  
                high: tradePrice,  
                low: tradePrice,  
                close: tradePrice,  
            };  
            console.log('[socket] Generate new bar', bar);  
        } else {  
            bar = {  
                ...lastDailyBar,  
                high: Math.max(lastDailyBar.high, tradePrice),  
                low: Math.min(lastDailyBar.low, tradePrice),  
                close: tradePrice,  
            };  
            console.log('[socket] Update the latest bar by price', tradePrice);  
        }  
        subscriptionItem.lastDailyBar = bar;  
      
        // Send data to every subscriber of that symbol  
        subscriptionItem.handlers.forEach((handler) => handler.callback(bar));  
    });  
      
    function getNextDailyBarTime(barTime) {  
        const date = new Date(barTime * 1000);  
        date.setDate(date.getDate() + 1);  
        return date.getTime() / 1000;  
    }  
      
    export function subscribeOnStream(  
        symbolInfo,  
        resolution,  
        onRealtimeCallback,  
        subscriberUID,  
        onResetCacheNeededCallback,  
        lastDailyBar  
    ) {  
        const parsedSymbol = parseFullSymbol(symbolInfo.full_name);  
        const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;  
        const handler = {  
            id: subscriberUID,  
            callback: onRealtimeCallback,  
        };  
        let subscriptionItem = channelToSubscription.get(channelString);  
        if (subscriptionItem) {  
            // Already subscribed to the channel, use the existing subscription  
            subscriptionItem.handlers.push(handler);  
            return;  
        }  
        subscriptionItem = {  
            subscriberUID,  
            resolution,  
            lastDailyBar,  
            handlers: [handler],  
        };  
        channelToSubscription.set(channelString, subscriptionItem);  
        console.log(  
            '[subscribeBars]: Subscribe to streaming. Channel:',  
            channelString  
        );  
        const subRequest = {  
            action: 'SubAdd',  
            subs: [channelString],  
        };  
        socket.send(JSON.stringify(subRequest));  
    }  
      
    export function unsubscribeFromStream(subscriberUID) {  
        // Find a subscription with id === subscriberUID  
        for (const channelString of channelToSubscription.keys()) {  
            const subscriptionItem = channelToSubscription.get(channelString);  
            const handlerIndex = subscriptionItem.handlers.findIndex(  
                (handler) => handler.id === subscriberUID  
            );  
      
            if (handlerIndex !== -1) {  
                // Remove from handlers  
                subscriptionItem.handlers.splice(handlerIndex, 1);  
      
                if (subscriptionItem.handlers.length === 0) {  
                    // Unsubscribe from the channel if it was the last handler  
                    console.log(  
                        '[unsubscribeBars]: Unsubscribe from streaming. Channel:',  
                        channelString  
                    );  
                    const subRequest = {  
                        action: 'SubRemove',  
                        subs: [channelString],  
                    };  
                    socket.send(JSON.stringify(subRequest));  
                    channelToSubscription.delete(channelString);  
                    break;  
                }  
            }  
        }  
    }  
    

## What's next?â

We hope this tutorial helped you understand the essentials of the [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) and how to work with it. If you want to dive deeper into the details, we recommend checking out the following articles:

  * [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor): get a better understanding of the Widget Constructor's capabilities and settings.
  * [Datafeed Common Issues](/charting-library-docs/latest/connecting_data/Datafeed-Issues): explore common issues that you might face when implementing the Datafeed API.
  * [Customization Overview](/charting-library-docs/latest/customization/): learn how to customize UI elements and chart behavior.



---

## Tutorials | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/*

  * [](/charting-library-docs/)
  * Tutorials

On this page

# Tutorials

## First stepsâ

We prepared several tutorials and guides that will walk you through the basics.

## [ Run the libraryLearn how to start using the library and run it locally](/charting-library-docs/latest/tutorials/First-Run-Tutorial)## [ Enable debug modeLearn how to enable logs when connecting data and implementing trading features](/charting-library-docs/latest/tutorials/enable-debug-mode)## [ Connect dataImplement Datafeed API and connect realâtime data streaming](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/)

## Further stepsâ

Once you've mastered the basics, dive into more advanced topics and explore specific features with these tutorials and guides.

## [ Create custom indicatorImplement an indicator that displays a Simple Moving Average and Smoothing Line](/charting-library-docs/latest/tutorials/create-custom-indicator/)## [ Create custom pageLearn how to create custom page in the Account Manager with dynamic data updates](/charting-library-docs/latest/tutorials/create-custom-page-in-account-manager/)## [ Create custom buttonsLearn how to add a custom button to the top toolbar of the chart](/charting-library-docs/latest/tutorials/add-custom-button-to-top-toolbar/)

## Framework integrationsâ

We have a collection of integration examples for frameworks commonly used with Advanced Charts and Trading Platform. The sections below link to GitHub pages where you can learn more about library integrations.

## [ Android WebView](https://github.com/tradingview/charting-library-examples/tree/master/android)## [ Angular](https://github.com/tradingview/charting-library-examples/tree/master/angular)## [ iOS WKWebViewSwift version](https://github.com/tradingview/charting-library-examples/tree/master/ios-swift)## [ Next.jsUp to version 13](https://github.com/tradingview/charting-library-examples/tree/master/nextjs-javascript)## [ Next.jsStarting from version 13](https://github.com/tradingview/charting-library-examples/tree/master/nextjs)## [ Nuxt.jsUp to version 2.x](https://github.com/tradingview/charting-library-examples/tree/master/nuxtjs)## [ Nuxt.jsStarting from version 3.x](https://github.com/tradingview/charting-library-examples/tree/master/nuxtjs3)## [ React Native](https://github.com/tradingview/charting-library-examples/tree/master/react-native)## [ React and JavaScript](https://github.com/tradingview/charting-library-examples/tree/master/react-javascript)## [ React and TypeScript](https://github.com/tradingview/charting-library-examples/tree/master/react-typescript)## [ Ruby on Rails](https://github.com/tradingview/charting-library-examples/tree/master/ruby-on-rails)## [ SvelteKit](https://github.com/tradingview/charting-library-examples/tree/master/sveltekit)## [ Vue.jsVersion 2](https://github.com/tradingview/charting-library-examples/tree/master/vuejs)## [ Vue.jsVersion 3](https://github.com/tradingview/charting-library-examples/tree/master/vuejs3)## [ Solid.js](https://github.com/tradingview/charting-library-examples/tree/master/solidjs-typescript)

## Interactive examplesâ

Explore our CodePen account that hosts interactive examples to learn and experiment with different features in just a few clicks. The examples can help you elevate your understanding of both Advanced Charts and Trading Platform.

[View examples on CodePen](https://codepen.io/tradingview)


---

## How to run the library | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/First-Run-Tutorial*

  * [](/charting-library-docs/)
  * Running the Library

On this page

# How to run the library

This tutorial describes how to run the library on your machine. You can also watch the video below that demonstrates running the library step-by-step.

## Prepare the projectâ

  1. Download the library ZIP file from the [Advanced Charts](https://github.com/tradingview/charting_library "The repository is private. ")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) / [Trading Platform](https://github.com/tradingview/trading_platform "The repository is private.")Â ðÂ (access is [restricted](/charting-library-docs/latest/getting_started/quick-start# getting-access "Click to open the 'Getting Access' section.")) repository.

  2. Create a new folder (`example` in this tutorial). Copy the `charting_library` and `datafeed` folders from the archive to `example`.

  3. Create the following `index.html` file in the `example` folder:

/example/index.html
    
        <!DOCTYPE HTML>  
    <html lang="en">  
    <head>  
        <meta charset = "UTF-8">  
        <meta http-equiv="X-UA-Compatible" content="IE=edge">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    </head>  
      
    <body>  
      
    </body>  
    </html>  
    

  4. Add two script references into the `<head>` section:
    
        <script src="charting_library/charting_library.standalone.js"></script>  
    <script src="datafeeds/udf/dist/bundle.js"></script>  
    

     * `charting_library/charting_library.standalone.js` contains the code that creates the chart widget.
     * `datafeeds/udf/dist/bundle.js` contains a sample datafeed implementation that loads data to the chart.
  5. Define the container for the chart in the `<body>` section:
    
        <div id="chartContainer"></div>  
    

  6. To create a chart, you should initialize the [Widget Constructor](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetConstructor) in `<body>`. To do this, configure some basic Widget Constructor parameters:
    
        <script>  
        new TradingView.widget({  
            container: 'chartContainer',  
            locale: 'en',  
            library_path: 'charting_library/',  
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),  
            symbol: 'AAPL',  
            interval: '1D',  
            fullscreen: true,  
            debug: true  
        });  
    </script>  
    

     * [`container`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# container) is set to the container ID from the previous step.
     * [`library_path`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# library_path) specifies a path to additional HTML, JavaScript, and CSS files that allow you to render the chart. In this tutorial, the `charting_library` folder stores these files.
     * [`datafeed`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# datafeed) is set to the [`UDFCompatibleDatafeed`](/charting-library-docs/latest/connecting_data/UDF# constructor) sample that TradingView provides.

## Run the libraryâ

  1. Execute the following command in the `example` folder to run the library locally.
    
        # Python 2.x  
    python -m SimpleHTTPServer 9090  
      
    # Python 3.x  
    python -m http.server 9090  
    

In this tutorial, the Python [`http.server`](https://docs.python.org/3/library/http.server.html) module is used. You can use any server/port that you prefer. The tips below explain how to run the most common HTTP servers.

Node.js

    1. Install `http-server`.
        
                npm install http-server -g  
        

    2. Start `http-server` using the following command in the library folder.
        
                http-server -p 9090  
        

NGINX

    1. [Install](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) NGINX.

    2. Open the `nginx.conf` file and insert the following code into the `http` section of the file:
        
                server {  
            listen       9090;  
            server_name  localhost;  
          
            location / {  
                root ABSOLUTE_PATH_TO_THE_TUTORIAL_FOLDER;  
            }  
        }  
        

    3. Replace `ABSOLUTE_PATH_TO_THE_TUTORIAL_FOLDER` with the absolute path to the tutorial folder (`example` in this tutorial).

    4. Run NGINX.

  2. Open `http://localhost:9090/` in your web browser to see the result.

![Running Library](/charting-library-docs/assets/images/first-run-result-03c0665f40d3cbff0a1f91df7c377a21.png)

## Complete codeâ

/example/index.html
    
    
    <!DOCTYPE HTML>  
    <html lang="en">  
        <head>  
            <meta charset = "UTF-8">  
            <meta http-equiv="X-UA-Compatible" content="IE=edge">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <title>TradingView - Advanced Charts</title>  
      
      
            <script src="charting_library/charting_library.standalone.js"></script>  
            <script src="datafeeds/udf/dist/bundle.js"></script>  
        </head>  
        <body>  
      
            <div id="chartContainer"></div>  
      
            <script>  
                new TradingView.widget({  
                    container: 'chartContainer',  
                    locale: 'en',  
                    library_path: 'charting_library/',  
                    datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),  
                    symbol: 'AAPL',  
                    interval: '1D',  
                    fullscreen: true,  
                    debug: true,  
                });  
            </script>  
        </body>  
    </html>  
    

## What's next?â

In this tutorial, you have set up Widget Constructor and a static chart. To further enhance your implementation, consider following the [How to connect data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial to learn more about real-time data streaming. Additionally, check out a guide on [enabling debug modes](/charting-library-docs/latest/tutorials/enable-debug-mode) to help identify potential issues and ensure your application is running smoothly.


---

## How to enable debug mode | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/enable-debug-mode*

  * [](/charting-library-docs/)
  * Enabling debug mode

On this page

# How to enable debug mode

This article will guide you through enabling debug mode in the library. This feature provides detailed logs and error messages in the browser's Developer Tools, helping you identify issues and ensure your application runs smoothly.

The library offers two debug options:

  * Logging messages related to connecting data using the Datafeed API.
  * Logging messages related to trading features in the Trading Platform.

## Enable debug mode for data connectionâ

The [Datafeed API](/charting-library-docs/latest/connecting_data/datafeed-api/) is a set of methods that allow you to connect market data to the library. The debug mode in the Datafeed API is useful for identifying how the library loads, processes, and resolves data. You can also check the number of bars requested versus the number of bars received.

You can enable the debug mode in two ways:

  * Set the [`debug`](/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions# debug) property to `true` in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor).
    
        const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        debug: true,  
    })  
    

  * Call the [`setDebugMode`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# setdebugmode) method after the chart is initialized.
    
        var widget = window.tvWidget = new TradingView.widget({ /* Widget Constructor properties */});  
      
    widget.onChartReady(() => {  
        widget.setDebugMode(true);  
    });  
    

Once the debug mode is enabled and you [run your app](/charting-library-docs/latest/tutorials/First-Run-Tutorial), you can access the console logs in the Developer Tools of your browser. Below is an example of the generated logs.
    
    
    2024-08-20T13:36:56.244Z Symbol resolve requested: `AAPL`  
    2024-08-20T13:36:56.504Z FEED [AAPL|1D]: Processing pending subscribers, count=2  
    2024-08-20T13:36:56.504Z FEED [AAPL|1D]: Leftmost subscriber requires 329 bars prior 2024-08-20T00:00:00.000Z  
    2024-08-20T13:36:56.505Z FEED [AAPL|1D]: Requesting data: [2023-05-18T00:00:00.000Z ... 2024-08-21T00:00:00.000Z, 330 bars]  
    2024-08-20T13:36:56.735Z FEED [AAPL|1D]: Receiving bars: total 330 bars in  [2016-11-30T00:00:00.000Z ... 2018-03-27T00:00:00.000Z], requested range: [2023-05-18T00:00:00.000Z ... 2024-08-21T00:00:00.000Z, 330 bars]  
    

## Enable debug mode for tradingâ

If you are working with [Trading Platform](/charting-library-docs/latest/trading_terminal/), you can also enable the debug mode for the trading part of your implementation. This mode allows you to check which methods are triggered based on user actions, what data the library sends, and what it expects to receive.

Trading is based on two key components: the [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api) and the [Trading Host](/charting-library-docs/latest/trading_terminal/trading-concepts/# trading-host). The Broker API acts as a bridge between the library and your backend trading server, transmitting data between them. The Trading Host provides the library with updates that it did not request, but these updates are necessary to display up-to-date information. Therefore, the debug mode in trading offers several options, allowing you to choose which logs you want to see.

To enable debug mode, use the [`debug_broker`](/charting-library-docs/latest/api/interfaces/Charting_Library.TradingTerminalWidgetOptions# debug_broker) property in the [Widget Constructor](/charting-library-docs/latest/core_concepts/Widget-Constructor). You can set this property to one of the debug levels defined by the [`BrokerDebugMode`](/charting-library-docs/latest/api/modules/Charting_Library# brokerdebugmode) type:

  * `all`: logs all possible debug messages.
  * `broker-only`: logs only messages related to the Broker API.
  * `host-only`: logs only messages related to the Trading Host.
  * `normal`: logs messages for the Broker API and Trading Host but excludes frequently called methods, such as `connectionStatus`.

In the example below, the debug mode enables messages related to the Broker API.
    
    
    const datafeed = new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");  
    new TradingView.widget({  
        container: "chartContainer",  
        locale: "en",  
        library_path: "charting_library/",  
        datafeed: datafeed,  
        symbol: "AAPL",  
        interval: "1D",  
        debug_broker: "broker-only",  
    })  
    

Once the debug mode is enabled and you [run your app](/charting-library-docs/latest/tutorials/First-Run-Tutorial), you can access the console logs in the Developer Tools of your browser. Below is an example of the generated logs.
    
    
    2024-08-22T09:18:12.344Z Broker API   | id: 1 | method: placeOrder | CALLED with arguments: [{"symbol":"AAPL","type":2,"qty":100,"side":1,"seenPrice":173.68,"currentQuotes":{"ask":173.68,"bid":173.68},"stopType":0,"customFields":{}},null]  
    2024-08-22T09:18:12.344Z Broker API   | id: 1 | method: placeOrder |  RETURNED (async): {}  
    

## What's next?â

If you plan to connect data, we recommend reading the following articles:

  * [How to connect data via Datafeed API](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/). Learn how to implement datafeed, display historical data, and stream real-time data via WebSocket.
  * [Datafeed: common issues](/charting-library-docs/latest/connecting_data/Datafeed-Issues). Explore detailed explanations and solutions for the most common issues that you may encounter when implementing the Datafeed API.

If you plan to implement trading features in Trading Platform, we recommend reading the following articles:

  * [Core trading concepts](/charting-library-docs/latest/trading_terminal/trading-concepts/). Learn about the trading components, how they integrate into the chart widget, and how they work together.
  * [Common Broker API issues](/charting-library-docs/latest/trading_terminal/common-issues). Explore detailed explanations and solutions for the most common issues that you may encounter when implementing the Broker API.



---

## How to create custom page in Account Manager | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/create-custom-page-in-account-manager*

  * [](/charting-library-docs/)
  * Creating custom page in Account Manager

On this page

# How to create custom page in Account Manager

The [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/) (AM) is an interactive widget that displays trading information, such as orders, positions, and account balance. This guide describes how to create a custom page in the AM, populate it with data, and provide dynamic updates.

## Before you startâ

  1. This guide assumes that you are familiar with the [core trading concepts](/charting-library-docs/latest/trading_terminal/trading-concepts/) and have implemented the required methods of the [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api).

  2. The example below extends the TradingView's [Broker API implementation](/charting-library-docs/latest/trading_terminal/trading-concepts/# implementation-example) and overrides the default AM implementation. We recommend reviewing the implementation as a prerequisite to following this guide.

Since the AM is supported only on larger viewports, it will not be displayed within the iframe below. We recommend clicking the _Edit on CodePen_ button to view the full example, where the AM is visible.

See the Pen [ Untitled](https://codepen.io/tradingview/pen/rNXogjW) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## 1\. Set up a delegate in constructorâ

Delegates are functions that subscribe to specific events and get triggered when these events occur. In this example, delegates allow custom pages to automatically refresh when there are data changes, ensuring that the AM displays real-time information.

Define a delegate in the constructor of the `CustomBroker` class using the [`createDelegate`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterFactory# createdelegate) method of the [Trading Host](/charting-library-docs/latest/trading_terminal/trading-concepts/# trading-host).
    
    
    constructor(host, quotesProvider) {  
        super(host, quotesProvider);  
      
        // Create a delegate  
        this._customPageChangeDelegate = host.factory.createDelegate();  
    }  
    

## 2\. Initialize the first itemâ

In this example, the custom page will have three columns: symbol name and two dynamic text fields. Initialize the first item to be displayed on the page.
    
    
    constructor(host, quotesProvider) {  
      
        this._customPageData = [  
            {  
              id: "1", // Item's unique ID  
              symbol: "AAPL", // First column  
              customTextOne: `1 - Example`, // Second column  
              customTextTwo: Math.round(Math.random() * +100), // Third column  
            },  
          ];  
    }  
    

## 3\. Create a function for data updatesâ

The `triggerCustomPageUpdate` method updates the custom page by adding a new data item every 5 seconds. This function triggers the delegate to notify the UI, allowing users to see changes immediately.
    
    
    triggerCustomPageUpdate() {  
        // Generate a new item with a unique ID  
        const newId = this._customPageData.length + 1;  
        const newItem = {  
            id: newId,  
            symbol: "IBM",  
            customTextOne: `${newId} - Example`,  
            customTextTwo: Math.round(Math.random() * +100),  
        };  
      
        // Add new data to custom page  
        this._customPageData.push(newItem);  
        // Notify any listeners that the data has changed  
        this._customPageChangeDelegate.fire(newItem);  
    }  
    

Then, simulate custom page updates in the constructor of the `CustomBroker` class.
    
    
    constructor(host, quotesProvider) {  
        // ...  
      
        setInterval(() => {  
            this.triggerCustomPageUpdate();  
        }, 5000);  
    }  
    

## 4\. Define custom pageâ

  1. The [`accountManagerInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerTerminal# accountmanagerinfo) method returns an [`AccountManagerInfo`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerInfo) object containing the information that will be displayed in the AM. Since this example overrides the default implementation defined in the [Broker API implementation](/charting-library-docs/latest/trading_terminal/trading-concepts/# implementation-example), we will only add a new page to the existing AM configuration. Define the custom page via the [`pages`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerInfo# pages) property of `AccountManagerInfo`.
    
        pages: [  
        {  
            id: "custom-page",  
            title: "Custom Page",  
            tables: [  
                // Custom table definition  
            ],  
        },  
    ];  
    

  2. Define a custom table within the [`tables`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerPage# tables) property. This table will be displayed on the custom page.
    
        tables: [  
        {  
            // Listen for data updates  
            // When data changes, changeDelegate will signal the UI to update the table  
            changeDelegate: this._customPageChangeDelegate,  
            columns: [  
                // Columns definition  
            ],  
                id: "custom-table",  
                title: "Custom Table",  
                // Request table data  
                getData: () => {  
                    console.log("getData");  
                    return Promise.resolve(this._customPageData);  
                },  
        },  
    ],  
    

  3. Define [columns](/charting-library-docs/latest/trading_terminal/account-manager/# columns) within the table. The order of column display aligns with the sequence of objects added to the [`columns`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerTable# columns) array. The formatter property manages how the values are displayed in the columns. Refer to [Value formatters](/charting-library-docs/latest/trading_terminal/account-manager/value-formatters) for more information.
    
        columns: [  
        // Display symbol name in the first column  
        {  
            id: "symbol",  
            label: "Symbol",  
            formatter: "rowButton", // Custom formatter  
            dataFields: ["symbol"],  
        },  
        // Display custom data in the second column  
        {  
            id: "customTextColumnOne",  
            label: "Column One",  
            formatter: "text",  // StandardFormatterName.Text  
            dataFields: ["customTextOne"],  
        },  
        // Display custom data in the third column  
        {  
            id: "customTextColumnTwo",  
            label: "Column Two",  
            formatter: "text",  
            dataFields: ["customTextTwo"],  
        },  
    ],  
    

## 5\. Implement chart loading on clickâ

To allow users to load a selected symbol onto the chart by clicking its name, you need to make the symbol name clickable. This can be achieved by creating a [custom formatter](/charting-library-docs/latest/trading_terminal/account-manager/value-formatters# custom-formatters) using the [`customFormatters`](/charting-library-docs/latest/api/interfaces/Charting_Library.AccountManagerInfo# customformatters) property.

The `rowButton` formatter transforms the symbol name into a button that, when clicked, updates the chart with the selected symbol.
    
    
    customFormatters: [  
        {  
            name: "rowButton",  
            formatText: () => "",  
            formatElement: ({ values }) => {  
                const [symbol, id] = values;  
                const row = document.createElement("button");  
                row.innerText = symbol;  
                row.style.borderRadius = "6px";  
                row.style.padding = "2px 8px";  
                row.style.border = "none";  
      
                row.addEventListener("mouseenter", () => {  
                    row.style.backgroundColor = "# 2962ff";  
                    row.style.color = "# fff";  
                });  
                row.addEventListener("mouseleave", () => {  
                    row.style.backgroundColor = "# f0f0f0";  
                    row.style.color = "# 000";  
                });  
      
                row.addEventListener("click", (event) => {  
                    event.stopPropagation();  
      
                    window.tvWidget.activeChart().setSymbol(symbol);  
                });  
                return row;  
            },  
        },  
    ],  
    

At this point, the AM includes a custom page with a dynamic table. The table displays three columns: one showing symbols and two displaying custom data that update in real time.

## What's next?â

If you want to dive deeper on how to customize the Account Manager, we recommend checking the following documentation articles:

  * [Account Manager](/charting-library-docs/latest/trading_terminal/account-manager/)
  * [Multiple accounts](/charting-library-docs/latest/trading_terminal/account-manager/multiple-accounts)



---

## How to add custom button to top toolbar | Advanced Charts Documentation

*Source: https://www.tradingview.com/charting-library-docs/latest/tutorials/add-custom-button-to-top-toolbar*

  * [](/charting-library-docs/)
  * Adding custom button to top toolbar

On this page

# How to add custom button to top toolbar

This guide shows how to add buttons to the [top toolbar](/charting-library-docs/latest/ui_elements/# top-toolbar) using the following methods:

  * `createDropdown` âÂ creates a dropdown menu.
  * `createButton` â creates a customizable button.

See the Pen [ [WIP] Add custom button to top toolbar](https://codepen.io/tradingview/pen/mybRJEY) by TradingView ([@tradingview](https://codepen.io/tradingview)) on [CodePen](https://codepen.io).

## Before you startâ

Consider taking the following steps before proceeding with the guide:

  1. Set up the Widget Constructor and run the library. Refer to the [First run](/charting-library-docs/latest/tutorials/First-Run-Tutorial) tutorial for more information.
  2. Connect data to the library. Refer to the [Connecting data](/charting-library-docs/latest/tutorials/implement_datafeed_tutorial/) tutorial for more information.

## Add a dropdown buttonâ

  1. Call the widget's [`headerReady`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# headerready) method that ensures the toolbar is fully loaded before adding custom elements. The method returns a promise that will be resolved once the chartâs top toolbar is available for customization.
    
        widget.headerReady().then(function () {});  
    

  2. Use the widget's [`createDropdown`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createdropdown) method to add a dropdown button to the top toolbar. This button will [set a symbol](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartWidgetApi# setsymbol) with a specific resolution to the chart.
    
        widget.headerReady().then(function () {  
        var dropdown = widget.createDropdown({  
        title: "Select symbol",  
        tooltip: "Select one of the symbols to load the chart with",  
        items: [  
            {  
                title: "MSFT (1M)",  
                onSelect: () => {  
                    widget.setSymbol("MSFT", "1M");  
                }  
            },  
            {  
                title: "IBM (1D)",  
                onSelect: () => {  
                    widget.setSymbol("IBM", "1D");  
                }  
            }  
        ]  
        });  
    });  
    

## Add a custom buttonâ

  1. Call the widget's [`headerReady`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# headerready) method that ensures the toolbar is fully loaded before adding custom elements. The method returns a promise that will be resolved once the chartâs top toolbar is available for customization.
    
        widget.headerReady().then(function () {});  
    

  2. Use the widget's [`createButton`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createbutton) method to add a button that triggers a confirmation dialog when clicked. The widget's [`showConfirmDialog`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# showconfirmdialog) method displays a dialog box with a title, body text, and two buttons: _Yes_ and _No_.
    
        widget.headerReady().then(function () {  
        var button = widget.createButton();  
        button.textContent = "Show dialog";  
        button.addEventListener("click", function () {  
            widget.showConfirmDialog({  
                title: "Accept Terms and Conditions",  
                body: "By selecting Yes, you agree to the terms of use. Otherwise, select No to cancel.",  
                callback(result) {  
                    result ? console.log("The terms are accepted.") : console.log("The terms are not accepted.");  
                }  
            });  
        });  
    });  
    

  3. **(Optional)** If you're a [Trading Platform](/charting-library-docs/latest/trading_terminal/) user, you can alternatively use the [`showConfirmDialog`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost# showconfirmdialog) method within the [`IBrokerConnectionAdapterHost`](/charting-library-docs/latest/api/interfaces/Charting_Library.IBrokerConnectionAdapterHost) interface.

    1. Use the widget's [`createButton`](/charting-library-docs/latest/api/interfaces/Charting_Library.IChartingLibraryWidget# createbutton) method to add a button that triggers a confirmation dialog when clicked.
        
                widget.headerReady().then(function () {  
            var buttonTwo = widget.createButton(); // Create a button  
            buttonTwo.textContent = "Show dialog 2"; // Add the button title  
            buttonTwo.addEventListener("click", function () {  
                window.broker.showDialog(); // Trigger a custom dialog on click  
            });  
        });  
        

    2. Define the `showDialog` method in the constructor of your [Broker API](/charting-library-docs/latest/trading_terminal/trading-concepts/# broker-api) class.
        
                async showDialog() {  
            const actionConfirmed = await this.host.showConfirmDialog(  
                "Confirm action", // Dialog title  
                [  
                "This action cannot be undone. Please confirm to continue.",  
                "Otherwise, you may close this dialog to retain the current settings."  
                ], // Dialog content  
                "Confirm", // Text for the button that returns true  
                "Dismiss"  // Text for the button that returns false  
            );  
            if (actionConfirmed) {  
                console.log("Action was confirmed.");  
            } else {  
                console.log("Action was not confirmed.");  
            }  
        }  
        

## What's next?â

If you want to dive deeper into how to customize the chart, we recommend checking the following documentation articles:

  * [Customization overview](/charting-library-docs/latest/customization/)
  * [UI elements overview](/charting-library-docs/latest/ui_elements/)

