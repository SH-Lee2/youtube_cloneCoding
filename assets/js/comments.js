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

/***/ "./src/client/js/comments.js":
/*!***********************************!*\
  !*** ./src/client/js/comments.js ***!
  \***********************************/
/***/ (() => {

eval("var commentInput = document.querySelector(\".comment-input\");\nvar commentForm = document.getElementById(\"comment-form\");\nvar videoContainer = document.querySelector(\".main-video\");\nvar submit = document.getElementById(\"submit\");\nvar id = videoContainer.dataset.id;\n\nvar handleComment = function handleComment() {\n  var text = commentInput.value;\n  commentInput.value = \"\";\n  fetch(\"/api//videos/\".concat(id, \"/comments\"), {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text: text\n    })\n  });\n};\n\nvar handleInput = function handleInput(e) {\n  submit.style.display = \"block\";\n};\n\nvar handleSubmiBtn = function handleSubmiBtn(e) {\n  if (e.target.value !== \"\") {\n    submit.style.backgroundColor = \"#065FD4\";\n    submit.style.color = \"white\";\n  } else {\n    submit.style.backgroundColor = \"#EFEFEF\";\n    submit.style.color = \"black\";\n  }\n};\n\nsubmit.addEventListener(\"click\", handleComment);\ncommentInput.addEventListener(\"click\", handleInput);\ncommentInput.addEventListener(\"input\", handleSubmiBtn);\n\n//# sourceURL=webpack://youtube_clonecoding/./src/client/js/comments.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/comments.js"]();
/******/ 	
/******/ })()
;