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

/***/ "./src/client/js/video.js":
/*!********************************!*\
  !*** ./src/client/js/video.js ***!
  \********************************/
/***/ (() => {

eval("var video = document.getElementById(\"video\"),\n    view = document.getElementById(\"view\"),\n    videoContainer = document.querySelector(\".main-video\");\nvar id = videoContainer.dataset.id;\nvideo.addEventListener('ended', function () {\n  fetch(\"/api/videos/\".concat(id, \"/view\"), {\n    method: \"POST\"\n  });\n  console.log(\"finish\");\n});\n\n//# sourceURL=webpack://youtube_clonecoding/./src/client/js/video.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/video.js"]();
/******/ 	
/******/ })()
;