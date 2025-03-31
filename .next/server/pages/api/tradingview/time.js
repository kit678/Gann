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
exports.id = "pages/api/tradingview/time";
exports.ids = ["pages/api/tradingview/time"];
exports.modules = {

/***/ "(api)/./pages/api/tradingview/time.js":
/*!***************************************!*\
  !*** ./pages/api/tradingview/time.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/**\r\n * TradingView UDF API - Server Time endpoint\r\n * \r\n * Returns the current server time in unix timestamp format (seconds)\r\n * Required by the TradingView UDF protocol.\r\n * \r\n * @see https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/\r\n */\nfunction handler(req, res) {\n  // Return current time in seconds (unix timestamp)\n  res.status(200).json({\n    time: Math.floor(Date.now() / 1000)\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdHJhZGluZ3ZpZXcvdGltZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCQyxHQUF0QixFQUEyQjtFQUN4QztFQUNBQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtJQUNuQkMsSUFBSSxFQUFFQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsSUFBSSxDQUFDQyxHQUFMLEtBQWEsSUFBeEI7RUFEYSxDQUFyQjtBQUdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FubnNxOS8uL3BhZ2VzL2FwaS90cmFkaW5ndmlldy90aW1lLmpzP2YzZjIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRyYWRpbmdWaWV3IFVERiBBUEkgLSBTZXJ2ZXIgVGltZSBlbmRwb2ludFxyXG4gKiBcclxuICogUmV0dXJucyB0aGUgY3VycmVudCBzZXJ2ZXIgdGltZSBpbiB1bml4IHRpbWVzdGFtcCBmb3JtYXQgKHNlY29uZHMpXHJcbiAqIFJlcXVpcmVkIGJ5IHRoZSBUcmFkaW5nVmlldyBVREYgcHJvdG9jb2wuXHJcbiAqIFxyXG4gKiBAc2VlIGh0dHBzOi8vd3d3LnRyYWRpbmd2aWV3LmNvbS9jaGFydGluZy1saWJyYXJ5LWRvY3MvbGF0ZXN0L2Nvbm5lY3RpbmdfZGF0YS9VREYvXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIC8vIFJldHVybiBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcyAodW5peCB0aW1lc3RhbXApXHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgdGltZTogTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMClcclxuICB9KTtcclxufSAiXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJ0aW1lIiwiTWF0aCIsImZsb29yIiwiRGF0ZSIsIm5vdyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/tradingview/time.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/tradingview/time.js"));
module.exports = __webpack_exports__;

})();