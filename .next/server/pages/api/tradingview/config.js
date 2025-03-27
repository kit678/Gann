"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/tradingview/config";
exports.ids = ["pages/api/tradingview/config"];
exports.modules = {

/***/ "(api)/./pages/api/tradingview/config.js":
/*!*****************************************!*\
  !*** ./pages/api/tradingview/config.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/**\n * TradingView UDF API - Configuration endpoint\n * \n * Returns the datafeed configuration for the TradingView chart.\n * Required by the TradingView UDF protocol.\n * \n * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/\n */ function handler(req, res) {\n    res.status(200).json({\n        supported_resolutions: [\n            \"1\",\n            \"5\",\n            \"15\",\n            \"30\",\n            \"60\",\n            \"1D\",\n            \"1W\",\n            \"1M\"\n        ],\n        supports_search: true,\n        supports_group_request: false,\n        supports_marks: true,\n        supports_timescale_marks: true,\n        supports_time: true,\n        exchanges: [\n            {\n                value: \"BINANCE\",\n                name: \"Binance\",\n                desc: \"Binance Crypto Exchange\"\n            },\n            {\n                value: \"NYSE\",\n                name: \"NYSE\",\n                desc: \"New York Stock Exchange\"\n            },\n            {\n                value: \"NASDAQ\",\n                name: \"NASDAQ\",\n                desc: \"NASDAQ Stock Exchange\"\n            }, \n        ],\n        symbol_types: [\n            {\n                name: \"stock\",\n                value: \"stock\"\n            },\n            {\n                name: \"crypto\",\n                value: \"crypto\"\n            },\n            {\n                name: \"forex\",\n                value: \"forex\"\n            }, \n        ]\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdHJhZGluZ3ZpZXcvY29uZmlnLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7OztDQU9DLEdBRWMsU0FBU0EsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUN4Q0EsR0FBRyxDQUFDQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUNuQkMscUJBQXFCLEVBQUU7WUFBQyxHQUFHO1lBQUUsR0FBRztZQUFFLElBQUk7WUFBRSxJQUFJO1lBQUUsSUFBSTtZQUFFLElBQUk7WUFBRSxJQUFJO1lBQUUsSUFBSTtTQUFDO1FBQ3JFQyxlQUFlLEVBQUUsSUFBSTtRQUNyQkMsc0JBQXNCLEVBQUUsS0FBSztRQUM3QkMsY0FBYyxFQUFFLElBQUk7UUFDcEJDLHdCQUF3QixFQUFFLElBQUk7UUFDOUJDLGFBQWEsRUFBRSxJQUFJO1FBQ25CQyxTQUFTLEVBQUU7WUFDVDtnQkFBRUMsS0FBSyxFQUFFLFNBQVM7Z0JBQUVDLElBQUksRUFBRSxTQUFTO2dCQUFFQyxJQUFJLEVBQUUseUJBQXlCO2FBQUU7WUFDdEU7Z0JBQUVGLEtBQUssRUFBRSxNQUFNO2dCQUFFQyxJQUFJLEVBQUUsTUFBTTtnQkFBRUMsSUFBSSxFQUFFLHlCQUF5QjthQUFFO1lBQ2hFO2dCQUFFRixLQUFLLEVBQUUsUUFBUTtnQkFBRUMsSUFBSSxFQUFFLFFBQVE7Z0JBQUVDLElBQUksRUFBRSx1QkFBdUI7YUFBRTtTQUNuRTtRQUNEQyxZQUFZLEVBQUU7WUFDWjtnQkFBRUYsSUFBSSxFQUFFLE9BQU87Z0JBQUVELEtBQUssRUFBRSxPQUFPO2FBQUU7WUFDakM7Z0JBQUVDLElBQUksRUFBRSxRQUFRO2dCQUFFRCxLQUFLLEVBQUUsUUFBUTthQUFFO1lBQ25DO2dCQUFFQyxJQUFJLEVBQUUsT0FBTztnQkFBRUQsS0FBSyxFQUFFLE9BQU87YUFBRTtTQUNsQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW5uc3E5Ly4vcGFnZXMvYXBpL3RyYWRpbmd2aWV3L2NvbmZpZy5qcz9hOWE2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVHJhZGluZ1ZpZXcgVURGIEFQSSAtIENvbmZpZ3VyYXRpb24gZW5kcG9pbnRcbiAqIFxuICogUmV0dXJucyB0aGUgZGF0YWZlZWQgY29uZmlndXJhdGlvbiBmb3IgdGhlIFRyYWRpbmdWaWV3IGNoYXJ0LlxuICogUmVxdWlyZWQgYnkgdGhlIFRyYWRpbmdWaWV3IFVERiBwcm90b2NvbC5cbiAqIFxuICogQHNlZSBodHRwczovL3d3dy50cmFkaW5ndmlldy5jb20vY2hhcnRpbmctbGlicmFyeS1kb2NzL2xhdGVzdC9jb25uZWN0aW5nX2RhdGEvVURGL1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIHN1cHBvcnRlZF9yZXNvbHV0aW9uczogWycxJywgJzUnLCAnMTUnLCAnMzAnLCAnNjAnLCAnMUQnLCAnMVcnLCAnMU0nXSxcbiAgICBzdXBwb3J0c19zZWFyY2g6IHRydWUsXG4gICAgc3VwcG9ydHNfZ3JvdXBfcmVxdWVzdDogZmFsc2UsXG4gICAgc3VwcG9ydHNfbWFya3M6IHRydWUsXG4gICAgc3VwcG9ydHNfdGltZXNjYWxlX21hcmtzOiB0cnVlLFxuICAgIHN1cHBvcnRzX3RpbWU6IHRydWUsXG4gICAgZXhjaGFuZ2VzOiBbXG4gICAgICB7IHZhbHVlOiAnQklOQU5DRScsIG5hbWU6ICdCaW5hbmNlJywgZGVzYzogJ0JpbmFuY2UgQ3J5cHRvIEV4Y2hhbmdlJyB9LFxuICAgICAgeyB2YWx1ZTogJ05ZU0UnLCBuYW1lOiAnTllTRScsIGRlc2M6ICdOZXcgWW9yayBTdG9jayBFeGNoYW5nZScgfSxcbiAgICAgIHsgdmFsdWU6ICdOQVNEQVEnLCBuYW1lOiAnTkFTREFRJywgZGVzYzogJ05BU0RBUSBTdG9jayBFeGNoYW5nZScgfSxcbiAgICBdLFxuICAgIHN5bWJvbF90eXBlczogW1xuICAgICAgeyBuYW1lOiAnc3RvY2snLCB2YWx1ZTogJ3N0b2NrJyB9LFxuICAgICAgeyBuYW1lOiAnY3J5cHRvJywgdmFsdWU6ICdjcnlwdG8nIH0sXG4gICAgICB7IG5hbWU6ICdmb3JleCcsIHZhbHVlOiAnZm9yZXgnIH0sXG4gICAgXSxcbiAgfSk7XG59ICJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwic3RhdHVzIiwianNvbiIsInN1cHBvcnRlZF9yZXNvbHV0aW9ucyIsInN1cHBvcnRzX3NlYXJjaCIsInN1cHBvcnRzX2dyb3VwX3JlcXVlc3QiLCJzdXBwb3J0c19tYXJrcyIsInN1cHBvcnRzX3RpbWVzY2FsZV9tYXJrcyIsInN1cHBvcnRzX3RpbWUiLCJleGNoYW5nZXMiLCJ2YWx1ZSIsIm5hbWUiLCJkZXNjIiwic3ltYm9sX3R5cGVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/tradingview/config.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/tradingview/config.js"));
module.exports = __webpack_exports__;

})();