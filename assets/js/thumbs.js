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

/***/ "./src/client/js/thumbs.js":
/*!*********************************!*\
  !*** ./src/client/js/thumbs.js ***!
  \*********************************/
/***/ (() => {

eval("var thumbsUP = document.querySelector(\".fa-thumbs-up\");\nvar thumbsDown = document.querySelector(\".fa-thumbs-down \");\nvar videoContainer = document.querySelector(\".main-video\");\nvar upValue = document.getElementById('up'),\n    downValue = document.getElementById('down'),\n    content = document.querySelector(\".content\");\nvar span = document.createElement(\"span\");\nspan.classList.add(\"messages\");\nvar status = {\n  flag: \"\",\n  up: 0,\n  down: 0\n};\nvar id = videoContainer.dataset.id;\nthumbsUP.addEventListener(\"click\", function () {\n  status.flag = \"up\";\n\n  if (!status.up) {\n    span.innerText = \"좋아요!\";\n    status.up = 1;\n    upValue.innerText = Number(upValue.innerText) + 1;\n  } else {\n    span.innerText = \"싫어요!\";\n    status.up = 0;\n    upValue.innerText = Number(upValue.innerText) - 1;\n  }\n\n  fetch(\"/api/videos/\".concat(id, \"/thumbs\"), {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      status: status\n    })\n  });\n\n  if (status.down === 1) {\n    status.down = 0;\n    downValue.innerText = Number(downValue.innerText) - 1;\n  }\n\n  content.after(span);\n});\nthumbsDown.addEventListener(\"click\", function () {\n  status.flag = \"down\";\n\n  if (!status.down) {\n    status.down = 1;\n    downValue.innerText = Number(downValue.innerText) + 1;\n  } else {\n    status.down = 0;\n    downValue.innerText = Number(downValue.innerText) - 1;\n  }\n\n  fetch(\"/api/videos/\".concat(id, \"/thumbs\"), {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      status: status\n    })\n  });\n\n  if (status.up === 1) {\n    status.up = 0;\n    upValue.innerText = Number(upValue.innerText) - 1;\n  }\n\n  console.log(status);\n});\n\n//# sourceURL=webpack://youtube_clonecoding/./src/client/js/thumbs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/thumbs.js"]();
/******/ 	
/******/ })()
;