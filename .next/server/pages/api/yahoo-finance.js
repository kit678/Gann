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
exports.id = "pages/api/yahoo-finance";
exports.ids = ["pages/api/yahoo-finance"];
exports.modules = {

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "(api)/./pages/api/yahoo-finance.js":
/*!************************************!*\
  !*** ./pages/api/yahoo-finance.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);\n// This file creates a Next.js API route to fetch Yahoo Finance data\n// We'll use node-fetch to make requests from our server-side API\n\nasync function handler(req, res) {\n    const { ticker , interval , range  } = req.query;\n    if (!ticker) {\n        return res.status(400).json({\n            error: \"Ticker symbol is required\"\n        });\n    }\n    // Default to 1-day interval and 1-month range if not specified\n    const dataInterval = interval || \"1d\";\n    const dataRange = range || \"1mo\";\n    try {\n        // Use Yahoo Finance API v8 (unofficial)\n        // Note: This is not an official API and could change without notice\n        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${dataInterval}&range=${dataRange}`;\n        const response = await node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url, {\n            headers: {\n                \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\n                \"Accept\": \"application/json\",\n                \"Accept-Language\": \"en-US,en;q=0.9\"\n            }\n        });\n        const data = await response.json();\n        if (data.chart.error) {\n            throw new Error(data.chart.error.description);\n        }\n        // Return the raw data without transformation - our service will handle that\n        return res.status(200).json(data);\n    } catch (error) {\n        console.error(\"Error fetching Yahoo Finance data:\", error);\n        return res.status(500).json({\n            error: error.message || \"Failed to fetch data\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkveWFob28tZmluYW5jZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRUFBb0U7QUFDcEUsaUVBQWlFO0FBRWxDO0FBRWhCLGVBQWVDLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsTUFBTSxFQUFFQyxNQUFNLEdBQUVDLFFBQVEsR0FBRUMsS0FBSyxHQUFFLEdBQUdKLEdBQUcsQ0FBQ0ssS0FBSztJQUU3QyxJQUFJLENBQUNILE1BQU0sRUFBRTtRQUNYLE9BQU9ELEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSyxFQUFFLDJCQUEyQjtTQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsK0RBQStEO0lBQy9ELE1BQU1DLFlBQVksR0FBR04sUUFBUSxJQUFJLElBQUk7SUFDckMsTUFBTU8sU0FBUyxHQUFHTixLQUFLLElBQUksS0FBSztJQUVoQyxJQUFJO1FBQ0Ysd0NBQXdDO1FBQ3hDLG9FQUFvRTtRQUNwRSxNQUFNTyxHQUFHLEdBQUcsQ0FBQyxrREFBa0QsRUFBRVQsTUFBTSxDQUFDLFVBQVUsRUFBRU8sWUFBWSxDQUFDLE9BQU8sRUFBRUMsU0FBUyxDQUFDLENBQUM7UUFFckgsTUFBTUUsUUFBUSxHQUFHLE1BQU1kLGlEQUFLLENBQUNhLEdBQUcsRUFBRTtZQUNoQ0UsT0FBTyxFQUFFO2dCQUNQLFlBQVksRUFBRSxxSEFBcUg7Z0JBQ25JLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGlCQUFpQixFQUFFLGdCQUFnQjthQUNwQztTQUNGLENBQUM7UUFDRixNQUFNQyxJQUFJLEdBQUcsTUFBTUYsUUFBUSxDQUFDTCxJQUFJLEVBQUU7UUFFbEMsSUFBSU8sSUFBSSxDQUFDQyxLQUFLLENBQUNQLEtBQUssRUFBRTtZQUNwQixNQUFNLElBQUlRLEtBQUssQ0FBQ0YsSUFBSSxDQUFDQyxLQUFLLENBQUNQLEtBQUssQ0FBQ1MsV0FBVyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELDRFQUE0RTtRQUM1RSxPQUFPaEIsR0FBRyxDQUFDSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ08sSUFBSSxDQUFDLENBQUM7SUFDcEMsRUFBRSxPQUFPTixLQUFLLEVBQUU7UUFDZFUsT0FBTyxDQUFDVixLQUFLLENBQUMsb0NBQW9DLEVBQUVBLEtBQUssQ0FBQyxDQUFDO1FBQzNELE9BQU9QLEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSyxFQUFFQSxLQUFLLENBQUNXLE9BQU8sSUFBSSxzQkFBc0I7U0FBRSxDQUFDLENBQUM7SUFDbEYsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW5uc3E5Ly4vcGFnZXMvYXBpL3lhaG9vLWZpbmFuY2UuanM/YWM5MiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgY3JlYXRlcyBhIE5leHQuanMgQVBJIHJvdXRlIHRvIGZldGNoIFlhaG9vIEZpbmFuY2UgZGF0YVxyXG4vLyBXZSdsbCB1c2Ugbm9kZS1mZXRjaCB0byBtYWtlIHJlcXVlc3RzIGZyb20gb3VyIHNlcnZlci1zaWRlIEFQSVxyXG5cclxuaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIGNvbnN0IHsgdGlja2VyLCBpbnRlcnZhbCwgcmFuZ2UgfSA9IHJlcS5xdWVyeTtcclxuICBcclxuICBpZiAoIXRpY2tlcikge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6ICdUaWNrZXIgc3ltYm9sIGlzIHJlcXVpcmVkJyB9KTtcclxuICB9XHJcbiAgXHJcbiAgLy8gRGVmYXVsdCB0byAxLWRheSBpbnRlcnZhbCBhbmQgMS1tb250aCByYW5nZSBpZiBub3Qgc3BlY2lmaWVkXHJcbiAgY29uc3QgZGF0YUludGVydmFsID0gaW50ZXJ2YWwgfHwgJzFkJztcclxuICBjb25zdCBkYXRhUmFuZ2UgPSByYW5nZSB8fCAnMW1vJztcclxuICBcclxuICB0cnkge1xyXG4gICAgLy8gVXNlIFlhaG9vIEZpbmFuY2UgQVBJIHY4ICh1bm9mZmljaWFsKVxyXG4gICAgLy8gTm90ZTogVGhpcyBpcyBub3QgYW4gb2ZmaWNpYWwgQVBJIGFuZCBjb3VsZCBjaGFuZ2Ugd2l0aG91dCBub3RpY2VcclxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3F1ZXJ5MS5maW5hbmNlLnlhaG9vLmNvbS92OC9maW5hbmNlL2NoYXJ0LyR7dGlja2VyfT9pbnRlcnZhbD0ke2RhdGFJbnRlcnZhbH0mcmFuZ2U9JHtkYXRhUmFuZ2V9YDtcclxuICAgIFxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MS4wLjQ0NzIuMTI0IFNhZmFyaS81MzcuMzYnLFxyXG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgJ0FjY2VwdC1MYW5ndWFnZSc6ICdlbi1VUyxlbjtxPTAuOSdcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgXHJcbiAgICBpZiAoZGF0YS5jaGFydC5lcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5jaGFydC5lcnJvci5kZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFJldHVybiB0aGUgcmF3IGRhdGEgd2l0aG91dCB0cmFuc2Zvcm1hdGlvbiAtIG91ciBzZXJ2aWNlIHdpbGwgaGFuZGxlIHRoYXRcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgWWFob28gRmluYW5jZSBkYXRhOicsIGVycm9yKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggZGF0YScgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJmZXRjaCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ0aWNrZXIiLCJpbnRlcnZhbCIsInJhbmdlIiwicXVlcnkiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJkYXRhSW50ZXJ2YWwiLCJkYXRhUmFuZ2UiLCJ1cmwiLCJyZXNwb25zZSIsImhlYWRlcnMiLCJkYXRhIiwiY2hhcnQiLCJFcnJvciIsImRlc2NyaXB0aW9uIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/yahoo-finance.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/yahoo-finance.js"));
module.exports = __webpack_exports__;

})();