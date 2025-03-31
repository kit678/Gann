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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/**\r\n * TradingView UDF API - Configuration endpoint\r\n * \r\n * Returns the datafeed configuration for the TradingView chart.\r\n * Required by the TradingView UDF protocol.\r\n * \r\n * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/\r\n */\nfunction handler(req, res) {\n  res.status(200).json({\n    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],\n    supports_search: true,\n    supports_group_request: false,\n    supports_marks: true,\n    supports_timescale_marks: true,\n    supports_time: true,\n    exchanges: [{\n      value: 'BINANCE',\n      name: 'Binance',\n      desc: 'Binance Crypto Exchange'\n    }, {\n      value: 'NYSE',\n      name: 'NYSE',\n      desc: 'New York Stock Exchange'\n    }, {\n      value: 'NASDAQ',\n      name: 'NASDAQ',\n      desc: 'NASDAQ Stock Exchange'\n    }],\n    symbol_types: [{\n      name: 'stock',\n      value: 'stock'\n    }, {\n      name: 'crypto',\n      value: 'crypto'\n    }, {\n      name: 'forex',\n      value: 'forex'\n    }]\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdHJhZGluZ3ZpZXcvY29uZmlnLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRWUsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0JDLEdBQXRCLEVBQTJCO0VBQ3hDQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtJQUNuQkMscUJBQXFCLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUMsSUFBbkMsRUFBeUMsSUFBekMsQ0FESjtJQUVuQkMsZUFBZSxFQUFFLElBRkU7SUFHbkJDLHNCQUFzQixFQUFFLEtBSEw7SUFJbkJDLGNBQWMsRUFBRSxJQUpHO0lBS25CQyx3QkFBd0IsRUFBRSxJQUxQO0lBTW5CQyxhQUFhLEVBQUUsSUFOSTtJQU9uQkMsU0FBUyxFQUFFLENBQ1Q7TUFBRUMsS0FBSyxFQUFFLFNBQVQ7TUFBb0JDLElBQUksRUFBRSxTQUExQjtNQUFxQ0MsSUFBSSxFQUFFO0lBQTNDLENBRFMsRUFFVDtNQUFFRixLQUFLLEVBQUUsTUFBVDtNQUFpQkMsSUFBSSxFQUFFLE1BQXZCO01BQStCQyxJQUFJLEVBQUU7SUFBckMsQ0FGUyxFQUdUO01BQUVGLEtBQUssRUFBRSxRQUFUO01BQW1CQyxJQUFJLEVBQUUsUUFBekI7TUFBbUNDLElBQUksRUFBRTtJQUF6QyxDQUhTLENBUFE7SUFZbkJDLFlBQVksRUFBRSxDQUNaO01BQUVGLElBQUksRUFBRSxPQUFSO01BQWlCRCxLQUFLLEVBQUU7SUFBeEIsQ0FEWSxFQUVaO01BQUVDLElBQUksRUFBRSxRQUFSO01BQWtCRCxLQUFLLEVBQUU7SUFBekIsQ0FGWSxFQUdaO01BQUVDLElBQUksRUFBRSxPQUFSO01BQWlCRCxLQUFLLEVBQUU7SUFBeEIsQ0FIWTtFQVpLLENBQXJCO0FBa0JEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FubnNxOS8uL3BhZ2VzL2FwaS90cmFkaW5ndmlldy9jb25maWcuanM/YTlhNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVHJhZGluZ1ZpZXcgVURGIEFQSSAtIENvbmZpZ3VyYXRpb24gZW5kcG9pbnRcclxuICogXHJcbiAqIFJldHVybnMgdGhlIGRhdGFmZWVkIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBUcmFkaW5nVmlldyBjaGFydC5cclxuICogUmVxdWlyZWQgYnkgdGhlIFRyYWRpbmdWaWV3IFVERiBwcm90b2NvbC5cclxuICogXHJcbiAqIEBzZWUgaHR0cHM6Ly93d3cudHJhZGluZ3ZpZXcuY29tL2NoYXJ0aW5nLWxpYnJhcnktZG9jcy9sYXRlc3QvY29ubmVjdGluZ19kYXRhL1VERi9cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgc3VwcG9ydGVkX3Jlc29sdXRpb25zOiBbJzEnLCAnNScsICcxNScsICczMCcsICc2MCcsICcxRCcsICcxVycsICcxTSddLFxyXG4gICAgc3VwcG9ydHNfc2VhcmNoOiB0cnVlLFxyXG4gICAgc3VwcG9ydHNfZ3JvdXBfcmVxdWVzdDogZmFsc2UsXHJcbiAgICBzdXBwb3J0c19tYXJrczogdHJ1ZSxcclxuICAgIHN1cHBvcnRzX3RpbWVzY2FsZV9tYXJrczogdHJ1ZSxcclxuICAgIHN1cHBvcnRzX3RpbWU6IHRydWUsXHJcbiAgICBleGNoYW5nZXM6IFtcclxuICAgICAgeyB2YWx1ZTogJ0JJTkFOQ0UnLCBuYW1lOiAnQmluYW5jZScsIGRlc2M6ICdCaW5hbmNlIENyeXB0byBFeGNoYW5nZScgfSxcclxuICAgICAgeyB2YWx1ZTogJ05ZU0UnLCBuYW1lOiAnTllTRScsIGRlc2M6ICdOZXcgWW9yayBTdG9jayBFeGNoYW5nZScgfSxcclxuICAgICAgeyB2YWx1ZTogJ05BU0RBUScsIG5hbWU6ICdOQVNEQVEnLCBkZXNjOiAnTkFTREFRIFN0b2NrIEV4Y2hhbmdlJyB9LFxyXG4gICAgXSxcclxuICAgIHN5bWJvbF90eXBlczogW1xyXG4gICAgICB7IG5hbWU6ICdzdG9jaycsIHZhbHVlOiAnc3RvY2snIH0sXHJcbiAgICAgIHsgbmFtZTogJ2NyeXB0bycsIHZhbHVlOiAnY3J5cHRvJyB9LFxyXG4gICAgICB7IG5hbWU6ICdmb3JleCcsIHZhbHVlOiAnZm9yZXgnIH0sXHJcbiAgICBdLFxyXG4gIH0pO1xyXG59ICJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxIiwicmVzIiwic3RhdHVzIiwianNvbiIsInN1cHBvcnRlZF9yZXNvbHV0aW9ucyIsInN1cHBvcnRzX3NlYXJjaCIsInN1cHBvcnRzX2dyb3VwX3JlcXVlc3QiLCJzdXBwb3J0c19tYXJrcyIsInN1cHBvcnRzX3RpbWVzY2FsZV9tYXJrcyIsInN1cHBvcnRzX3RpbWUiLCJleGNoYW5nZXMiLCJ2YWx1ZSIsIm5hbWUiLCJkZXNjIiwic3ltYm9sX3R5cGVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/tradingview/config.js\n");

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