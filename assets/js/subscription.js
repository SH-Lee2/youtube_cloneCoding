/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/subscription.js":
/*!***************************************!*\
  !*** ./src/client/js/subscription.js ***!
  \***************************************/
/***/ (() => {

eval("var subscriptionBtn = document.getElementById(\"subscription\"),\n    subscribers = document.getElementById(\"subscribers\"),\n    videoContainer = document.querySelector(\".main-video\");\nvar id = videoContainer.dataset.id;\nvar status = 0;\nsubscriptionBtn.addEventListener(\"click\", function () {\n  if (status) {\n    status = 0;\n    subscribers.innerText = Number(subscribers.innerText) - 1;\n    subscriptionBtn.innerText = \"구독\";\n  } else {\n    status = 1;\n    subscribers.innerText = Number(subscribers.innerText) + 1;\n    subscriptionBtn.innerText = \"구독중\";\n  }\n\n  fetch(\"/api/videos/\".concat(id, \"/subscription\"), {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      status: status\n    })\n  });\n});\n\n//# sourceURL=webpack://youtube_clonecoding/./src/client/js/subscription.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/subscription.js"]();
/******/ 	
/******/ })()
;