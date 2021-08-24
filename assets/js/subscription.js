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

eval("var subscriptionBtn = document.getElementById(\"subscription\"),\n    subscribers = document.getElementById(\"subscribers\"),\n    videoContainer = document.querySelector(\".main-video\"),\n    content = document.querySelector(\".content\");\nspan = document.createElement(\"span\");\nspan.classList.add(\"messages\");\nvar id = videoContainer.dataset.id;\nsubscriptionBtn.addEventListener(\"click\", function () {\n  var innerText = subscriptionBtn.innerText;\n\n  if (innerText === \"구독중\") {\n    span.innerText = \"구독 취소 하였습니다.\";\n    subscribers.innerText = Number(subscribers.innerText) - 1;\n    subscriptionBtn.innerText = \"구독\";\n  } else if (innerText === \"구독\") {\n    span.innerText = \"구독 하였습니다.\";\n    subscribers.innerText = Number(subscribers.innerText) + 1;\n    subscriptionBtn.innerText = \"구독중\";\n  }\n\n  fetch(\"/api/videos/\".concat(id, \"/subscription\"), {\n    method: \"POST\"\n  });\n  content.after(span);\n});\n\n//# sourceURL=webpack://youtube_clonecoding/./src/client/js/subscription.js?");

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