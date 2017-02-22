/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35728/livereload.js";
/******/ 	  document.head.appendChild(el);
/******/ 	}());
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!*********************************!*\
  !*** ./modules/entry-export.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Created by ���� on 2015/12/4.
	 */
	//webpack has a clever parser that can process nearly every 3rd party library. It handles the most common module styles: CommonJs and AMD.
	//CommonJS give you:
	//the require() function, which allows to import a given module into the current scope.
	var themeName = 'default';
	__webpack_require__(/*! ../templates */ 453)("./" + themeName + "/css/style.css");
	// require("../build/jquery.2.1.4.min.js");
	__webpack_require__(/*! ../modules/gridster/jquery.gridster.css */ 11); //jquery.gridster
	__webpack_require__(/*! ../modules/gridster/jquery.gridster */ 13);
	__webpack_require__(/*! ../modules/view.js */ 463);
	__webpack_require__(/*! ../modules/common.js */ 464);

/***/ },

/***/ 3:
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 9:
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 11:
/*!**********************************************!*\
  !*** ./modules/gridster/jquery.gridster.css ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./jquery.gridster.css */ 12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./jquery.gridster.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./jquery.gridster.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 12:
/*!*************************************************************!*\
  !*** ./~/css-loader!./modules/gridster/jquery.gridster.css ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, ".gridster {\n    position:relative;\n}\n\n.gridster > * {\n    -webkit-transition: height .4s, width .4s;\n    -moz-transition: height .4s, width .4s;\n    -o-transition: height .4s, width .4s;\n    -ms-transition: height .4s, width .4s;\n    transition: height .4s, width .4s;\n    margin: 0;\n}\n\n.gridster .gs-w {\n    z-index: 2;\n    position: absolute;\n}\n\n.ready .gs-w:not(.preview-holder) {\n    -webkit-transition: opacity .3s, left .3s, top .3s;\n    -moz-transition: opacity .3s, left .3s, top .3s;\n    -o-transition: opacity .3s, left .3s, top .3s;\n    transition: opacity .3s, left .3s, top .3s;\n}\n\n.ready .gs-w:not(.preview-holder),\n.ready .resize-preview-holder {\n    -webkit-transition: opacity .3s, left .3s, top .3s, width .3s, height .3s;\n    -moz-transition: opacity .3s, left .3s, top .3s, width .3s, height .3s;\n    -o-transition: opacity .3s, left .3s, top .3s, width .3s, height .3s;\n    transition: opacity .3s, left .3s, top .3s, width .3s, height .3s;\n}\n\n.gridster .preview-holder {\n    z-index: 1;\n    position: absolute;\n    background-color: #fff;\n    border-color: #fff;\n    opacity: 0.3;\n}\n\n.gridster .player-revert {\n    z-index: 10!important;\n    -webkit-transition: left .3s, top .3s!important;\n    -moz-transition: left .3s, top .3s!important;\n    -o-transition: left .3s, top .3s!important;\n    transition:  left .3s, top .3s!important;\n}\n\n.gridster .dragging,\n.gridster .resizing {\n    z-index: 10!important;\n    -webkit-transition: all 0s !important;\n    -moz-transition: all 0s !important;\n    -o-transition: all 0s !important;\n    transition: all 0s !important;\n}\n\n\n.gs-resize-handle {\n    position: absolute;\n    z-index: 1;\n}\n\n.gs-resize-handle-both {\n    width: 20px;\n    height: 20px;\n    bottom: -8px;\n    right: -8px;\n    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');\n    background-position: top left;\n    background-repeat: no-repeat;\n    cursor: se-resize;\n    z-index: 20;\n}\n\n.gs-resize-handle-x {\n    top: 0;\n    bottom: 13px;\n    right: -5px;\n    width: 10px;\n    cursor: e-resize;\n}\n\n.gs-resize-handle-y {\n    left: 0;\n    right: 13px;\n    bottom: -5px;\n    height: 10px;\n    cursor: s-resize;\n}\n\n.gs-w:hover .gs-resize-handle,\n.resizing .gs-resize-handle {\n    opacity: 1;\n}\n\n.gs-resize-handle,\n.gs-w.dragging .gs-resize-handle {\n    opacity: 0;\n}\n\n.gs-resize-disabled .gs-resize-handle {\n    display: none!important;\n}\n\n[data-max-sizex=\"1\"] .gs-resize-handle-x,\n[data-max-sizey=\"1\"] .gs-resize-handle-y,\n[data-max-sizey=\"1\"][data-max-sizex=\"1\"] .gs-resize-handle {\n    display: none !important;\n}\n\n.gridster li {\n    list-style: none;\n}\n\n.gridster .gs-w {\n    background: #FFF;\n    cursor: pointer;\n    border: 1px solid #bbb;\n}\n\n.gridster .player {\n    -webkit-box-shadow: 3px 3px 5px rgba(0,0,0,0.3);\n    box-shadow: 3px 3px 5px rgba(0,0,0,0.3);\n}\n\n.gridster .gs-w.try {\n    background-repeat: no-repeat;\n    background-position: 37px -169px;\n\n}\n\n.gridster .preview-holder {\n    border: none!important;\n    border-radius: 0!important;\n    background: rgba(255,255,255,.2)!important;\n}\n", ""]);
	
	// exports


/***/ },

/***/ 13:
/*!*********************************************!*\
  !*** ./modules/gridster/jquery.gridster.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_2__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_1__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_0__;'use strict';
	
	/*! gridster.js - v0.5.6 - 2014-09-25
	* http://gridster.net/
	* Copyright (c) 2014 ducksboard; Licensed MIT */
	;(function (root, factory) {
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_0__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__));
	    } else {
	        root.GridsterCoords = factory(root.$ || root.jQuery);
	    }
	})(undefined, function ($) {
	    /**
	    * Creates objects with coordinates (x1, y1, x2, y2, cx, cy, width, height)
	    * to simulate DOM elements on the screen.
	    * Coords is used by Gridster to create a faux grid with any DOM element can
	    * collide.
	    *
	    * @class Coords
	    * @param {HTMLElement|Object} obj The jQuery HTMLElement or a object with: left,
	    * top, width and height properties.
	    * @return {Object} Coords instance.
	    * @constructor
	    */
	    function Coords(obj) {
	        if (obj[0] && $.isPlainObject(obj[0])) {
	            this.data = obj[0];
	        } else {
	            this.el = obj;
	        }
	
	        this.isCoords = true;
	        this.coords = {};
	        this.init();
	        return this;
	    }
	
	    var fn = Coords.prototype;
	
	    fn.init = function () {
	        this.set();
	        this.original_coords = this.get();
	    };
	
	    fn.set = function (update, not_update_offsets) {
	        var el = this.el;
	
	        if (el && !update) {
	            this.data = el.offset();
	            this.data.width = el.width();
	            this.data.height = el.height();
	        }
	
	        if (el && update && !not_update_offsets) {
	            var offset = el.offset();
	            this.data.top = offset.top;
	            this.data.left = offset.left;
	        }
	
	        var d = this.data;
	
	        typeof d.left === 'undefined' && (d.left = d.x1);
	        typeof d.top === 'undefined' && (d.top = d.y1);
	
	        this.coords.x1 = d.left;
	        this.coords.y1 = d.top;
	        this.coords.x2 = d.left + d.width;
	        this.coords.y2 = d.top + d.height;
	        this.coords.cx = d.left + d.width / 2;
	        this.coords.cy = d.top + d.height / 2;
	        this.coords.width = d.width;
	        this.coords.height = d.height;
	        this.coords.el = el || false;
	
	        return this;
	    };
	
	    fn.update = function (data) {
	        if (!data && !this.el) {
	            return this;
	        }
	
	        if (data) {
	            var new_data = $.extend({}, this.data, data);
	            this.data = new_data;
	            return this.set(true, true);
	        }
	
	        this.set(true);
	        return this;
	    };
	
	    fn.get = function () {
	        return this.coords;
	    };
	
	    fn.destroy = function () {
	        this.el.removeData('coords');
	        delete this.el;
	    };
	
	    //jQuery adapter
	    $.fn.coords = function () {
	        if (this.data('coords')) {
	            return this.data('coords');
	        }
	
	        var ins = new Coords(this, arguments[0]);
	        this.data('coords', ins);
	        return ins;
	    };
	
	    return Coords;
	});
	
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 14), __WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_1__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__));
	    } else {
	        root.GridsterCollision = factory(root.$ || root.jQuery, root.GridsterCoords);
	    }
	})(undefined, function ($, Coords) {
	
	    var defaults = {
	        colliders_context: document.body,
	        overlapping_region: 'C'
	        // ,on_overlap: function(collider_data){},
	        // on_overlap_start : function(collider_data){},
	        // on_overlap_stop : function(collider_data){}
	    };
	
	    /**
	    * Detects collisions between a DOM element against other DOM elements or
	    * Coords objects.
	    *
	    * @class Collision
	    * @uses Coords
	    * @param {HTMLElement} el The jQuery wrapped HTMLElement.
	    * @param {HTMLElement|Array} colliders Can be a jQuery collection
	    *  of HTMLElements or an Array of Coords instances.
	    * @param {Object} [options] An Object with all options you want to
	    *        overwrite:
	    *   @param {String} [options.overlapping_region] Determines when collision
	    *    is valid, depending on the overlapped area. Values can be: 'N', 'S',
	    *    'W', 'E', 'C' or 'all'. Default is 'C'.
	    *   @param {Function} [options.on_overlap_start] Executes a function the first
	    *    time each `collider ` is overlapped.
	    *   @param {Function} [options.on_overlap_stop] Executes a function when a
	    *    `collider` is no longer collided.
	    *   @param {Function} [options.on_overlap] Executes a function when the
	    * mouse is moved during the collision.
	    * @return {Object} Collision instance.
	    * @constructor
	    */
	    function Collision(el, colliders, options) {
	        this.options = $.extend(defaults, options);
	        this.$element = el;
	        this.last_colliders = [];
	        this.last_colliders_coords = [];
	        this.set_colliders(colliders);
	
	        this.init();
	    }
	
	    Collision.defaults = defaults;
	
	    var fn = Collision.prototype;
	
	    fn.init = function () {
	        this.find_collisions();
	    };
	
	    fn.overlaps = function (a, b) {
	        var x = false;
	        var y = false;
	
	        if (b.x1 >= a.x1 && b.x1 <= a.x2 || b.x2 >= a.x1 && b.x2 <= a.x2 || a.x1 >= b.x1 && a.x2 <= b.x2) {
	            x = true;
	        }
	
	        if (b.y1 >= a.y1 && b.y1 <= a.y2 || b.y2 >= a.y1 && b.y2 <= a.y2 || a.y1 >= b.y1 && a.y2 <= b.y2) {
	            y = true;
	        }
	
	        return x && y;
	    };
	
	    fn.detect_overlapping_region = function (a, b) {
	        var regionX = '';
	        var regionY = '';
	
	        if (a.y1 > b.cy && a.y1 < b.y2) {
	            regionX = 'N';
	        }
	        if (a.y2 > b.y1 && a.y2 < b.cy) {
	            regionX = 'S';
	        }
	        if (a.x1 > b.cx && a.x1 < b.x2) {
	            regionY = 'W';
	        }
	        if (a.x2 > b.x1 && a.x2 < b.cx) {
	            regionY = 'E';
	        }
	
	        return regionX + regionY || 'C';
	    };
	
	    fn.calculate_overlapped_area_coords = function (a, b) {
	        var x1 = Math.max(a.x1, b.x1);
	        var y1 = Math.max(a.y1, b.y1);
	        var x2 = Math.min(a.x2, b.x2);
	        var y2 = Math.min(a.y2, b.y2);
	
	        return $({
	            left: x1,
	            top: y1,
	            width: x2 - x1,
	            height: y2 - y1
	        }).coords().get();
	    };
	
	    fn.calculate_overlapped_area = function (coords) {
	        return coords.width * coords.height;
	    };
	
	    fn.manage_colliders_start_stop = function (new_colliders_coords, start_callback, stop_callback) {
	        var last = this.last_colliders_coords;
	
	        for (var i = 0, il = last.length; i < il; i++) {
	            if ($.inArray(last[i], new_colliders_coords) === -1) {
	                start_callback.call(this, last[i]);
	            }
	        }
	
	        for (var j = 0, jl = new_colliders_coords.length; j < jl; j++) {
	            if ($.inArray(new_colliders_coords[j], last) === -1) {
	                stop_callback.call(this, new_colliders_coords[j]);
	            }
	        }
	    };
	
	    fn.find_collisions = function (player_data_coords) {
	        var self = this;
	        var overlapping_region = this.options.overlapping_region;
	        var colliders_coords = [];
	        var colliders_data = [];
	        var $colliders = this.colliders || this.$colliders;
	        var count = $colliders.length;
	        var player_coords = self.$element.coords().update(player_data_coords || false).get();
	
	        while (count--) {
	            var $collider = self.$colliders ? $($colliders[count]) : $colliders[count];
	            var $collider_coords_ins = $collider.isCoords ? $collider : $collider.coords();
	            var collider_coords = $collider_coords_ins.get();
	            var overlaps = self.overlaps(player_coords, collider_coords);
	
	            if (!overlaps) {
	                continue;
	            }
	
	            var region = self.detect_overlapping_region(player_coords, collider_coords);
	
	            //todo: make this an option
	            if (region === overlapping_region || overlapping_region === 'all') {
	
	                var area_coords = self.calculate_overlapped_area_coords(player_coords, collider_coords);
	                var area = self.calculate_overlapped_area(area_coords);
	                var collider_data = {
	                    area: area,
	                    area_coords: area_coords,
	                    region: region,
	                    coords: collider_coords,
	                    player_coords: player_coords,
	                    el: $collider
	                };
	
	                if (self.options.on_overlap) {
	                    self.options.on_overlap.call(this, collider_data);
	                }
	                colliders_coords.push($collider_coords_ins);
	                colliders_data.push(collider_data);
	            }
	        }
	
	        if (self.options.on_overlap_stop || self.options.on_overlap_start) {
	            this.manage_colliders_start_stop(colliders_coords, self.options.on_overlap_start, self.options.on_overlap_stop);
	        }
	
	        this.last_colliders_coords = colliders_coords;
	
	        return colliders_data;
	    };
	
	    fn.get_closest_colliders = function (player_data_coords) {
	        var colliders = this.find_collisions(player_data_coords);
	
	        colliders.sort(function (a, b) {
	            /* if colliders are being overlapped by the "C" (center) region,
	             * we have to set a lower index in the array to which they are placed
	             * above in the grid. */
	            if (a.region === 'C' && b.region === 'C') {
	                if (a.coords.y1 < b.coords.y1 || a.coords.x1 < b.coords.x1) {
	                    return -1;
	                } else {
	                    return 1;
	                }
	            }
	
	            if (a.area < b.area) {
	                return 1;
	            }
	
	            return 1;
	        });
	        return colliders;
	    };
	
	    fn.set_colliders = function (colliders) {
	        if (typeof colliders === 'string' || colliders instanceof $) {
	            this.$colliders = $(colliders, this.options.colliders_context).not(this.$element);
	        } else {
	            this.colliders = $(colliders);
	        }
	    };
	
	    //jQuery adapter
	    $.fn.collision = function (collider, options) {
	        return new Collision(this, collider, options);
	    };
	
	    return Collision;
	});
	
	(function (window, undefined) {
	
	    /* Delay, debounce and throttle functions taken from underscore.js
	     *
	     * Copyright (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and
	     * Investigative Reporters & Editors
	     *
	     * Permission is hereby granted, free of charge, to any person
	     * obtaining a copy of this software and associated documentation
	     * files (the "Software"), to deal in the Software without
	     * restriction, including without limitation the rights to use,
	     * copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the
	     * Software is furnished to do so, subject to the following
	     * conditions:
	     *
	     * The above copyright notice and this permission notice shall be
	     * included in all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	     * OTHER DEALINGS IN THE SOFTWARE.
	     */
	
	    window.delay = function (func, wait) {
	        var args = Array.prototype.slice.call(arguments, 2);
	        return setTimeout(function () {
	            return func.apply(null, args);
	        }, wait);
	    };
	
	    window.debounce = function (func, wait, immediate) {
	        var timeout;
	        return function () {
	            var context = this,
	                args = arguments;
	            var later = function later() {
	                timeout = null;
	                if (!immediate) func.apply(context, args);
	            };
	            if (immediate && !timeout) func.apply(context, args);
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait);
	        };
	    };
	
	    window.throttle = function (func, wait) {
	        var context, args, timeout, throttling, more, result;
	        var whenDone = debounce(function () {
	            more = throttling = false;
	        }, wait);
	        return function () {
	            context = this;args = arguments;
	            var later = function later() {
	                timeout = null;
	                if (more) func.apply(context, args);
	                whenDone();
	            };
	            if (!timeout) timeout = setTimeout(later, wait);
	            if (throttling) {
	                more = true;
	            } else {
	                result = func.apply(context, args);
	            }
	            whenDone();
	            throttling = true;
	            return result;
	        };
	    };
	})(window);
	
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_LOCAL_MODULE_2__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__));
	    } else {
	        root.GridsterDraggable = factory(root.$ || root.jQuery);
	    }
	})(undefined, function ($) {
	
	    var defaults = {
	        items: 'li',
	        distance: 1,
	        limit: true,
	        offset_left: 0,
	        autoscroll: true,
	        ignore_dragging: ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'], // or function
	        handle: null,
	        container_width: 0, // 0 == auto
	        move_element: true,
	        helper: false, // or 'clone'
	        remove_helper: true
	        // drag: function(e) {},
	        // start : function(e, ui) {},
	        // stop : function(e) {}
	    };
	
	    var $window = $(window);
	    var dir_map = { x: 'left', y: 'top' };
	    var isTouch = !!('ontouchstart' in window);
	
	    var capitalize = function capitalize(str) {
	        return str.charAt(0).toUpperCase() + str.slice(1);
	    };
	
	    var idCounter = 0;
	    var uniqId = function uniqId() {
	        return ++idCounter + '';
	    };
	
	    /**
	    * Basic drag implementation for DOM elements inside a container.
	    * Provide start/stop/drag callbacks.
	    *
	    * @class Draggable
	    * @param {HTMLElement} el The HTMLelement that contains all the widgets
	    *  to be dragged.
	    * @param {Object} [options] An Object with all options you want to
	    *        overwrite:
	    *    @param {HTMLElement|String} [options.items] Define who will
	    *     be the draggable items. Can be a CSS Selector String or a
	    *     collection of HTMLElements.
	    *    @param {Number} [options.distance] Distance in pixels after mousedown
	    *     the mouse must move before dragging should start.
	    *    @param {Boolean} [options.limit] Constrains dragging to the width of
	    *     the container
	    *    @param {Object|Function} [options.ignore_dragging] Array of node names
	    *      that sould not trigger dragging, by default is `['INPUT', 'TEXTAREA',
	    *      'SELECT', 'BUTTON']`. If a function is used return true to ignore dragging.
	    *    @param {offset_left} [options.offset_left] Offset added to the item
	    *     that is being dragged.
	    *    @param {Number} [options.drag] Executes a callback when the mouse is
	    *     moved during the dragging.
	    *    @param {Number} [options.start] Executes a callback when the drag
	    *     starts.
	    *    @param {Number} [options.stop] Executes a callback when the drag stops.
	    * @return {Object} Returns `el`.
	    * @constructor
	    */
	    function Draggable(el, options) {
	        this.options = $.extend({}, defaults, options);
	        this.$document = $(document);
	        this.$container = $(el);
	        this.$dragitems = $(this.options.items, this.$container);
	        this.is_dragging = false;
	        this.player_min_left = 0 + this.options.offset_left;
	        this.id = uniqId();
	        this.ns = '.gridster-draggable-' + this.id;
	        this.init();
	    }
	
	    Draggable.defaults = defaults;
	
	    var fn = Draggable.prototype;
	
	    fn.init = function () {
	        var pos = this.$container.css('position');
	        this.calculate_dimensions();
	        this.$container.css('position', pos === 'static' ? 'relative' : pos);
	        this.disabled = false;
	        this.events();
	
	        $(window).bind(this.nsEvent('resize'), throttle($.proxy(this.calculate_dimensions, this), 200));
	    };
	
	    fn.nsEvent = function (ev) {
	        return (ev || '') + this.ns;
	    };
	
	    fn.events = function () {
	        this.pointer_events = {
	            start: this.nsEvent('touchstart') + ' ' + this.nsEvent('mousedown'),
	            move: this.nsEvent('touchmove') + ' ' + this.nsEvent('mousemove'),
	            end: this.nsEvent('touchend') + ' ' + this.nsEvent('mouseup')
	        };
	
	        this.$container.on(this.nsEvent('selectstart'), $.proxy(this.on_select_start, this));
	
	        this.$container.on(this.pointer_events.start, this.options.items, $.proxy(this.drag_handler, this));
	
	        this.$document.on(this.pointer_events.end, $.proxy(function (e) {
	            this.is_dragging = false;
	            if (this.disabled) {
	                return;
	            }
	            this.$document.off(this.pointer_events.move);
	            if (this.drag_start) {
	                this.on_dragstop(e);
	            }
	        }, this));
	    };
	
	    fn.get_actual_pos = function ($el) {
	        var pos = $el.position();
	        return pos;
	    };
	
	    fn.get_mouse_pos = function (e) {
	        if (e.originalEvent && e.originalEvent.touches) {
	            var oe = e.originalEvent;
	            e = oe.touches.length ? oe.touches[0] : oe.changedTouches[0];
	        }
	
	        return {
	            left: e.clientX,
	            top: e.clientY
	        };
	    };
	
	    fn.get_offset = function (e) {
	        e.preventDefault();
	        var mouse_actual_pos = this.get_mouse_pos(e);
	        var diff_x = Math.round(mouse_actual_pos.left - this.mouse_init_pos.left);
	        var diff_y = Math.round(mouse_actual_pos.top - this.mouse_init_pos.top);
	
	        var left = Math.round(this.el_init_offset.left + diff_x - this.baseX + $(window).scrollLeft() - this.win_offset_x);
	        var top = Math.round(this.el_init_offset.top + diff_y - this.baseY + $(window).scrollTop() - this.win_offset_y);
	
	        if (this.options.limit) {
	            if (left > this.player_max_left) {
	                left = this.player_max_left;
	            } else if (left < this.player_min_left) {
	                left = this.player_min_left;
	            }
	        }
	
	        return {
	            position: {
	                left: left,
	                top: top
	            },
	            pointer: {
	                left: mouse_actual_pos.left,
	                top: mouse_actual_pos.top,
	                diff_left: diff_x + ($(window).scrollLeft() - this.win_offset_x),
	                diff_top: diff_y + ($(window).scrollTop() - this.win_offset_y)
	            },
	            targetLeft: this.$player.position().left
	        };
	    };
	
	    fn.get_drag_data = function (e) {
	        var offset = this.get_offset(e);
	        offset.$player = this.$player;
	        offset.$helper = this.helper ? this.$helper : this.$player;
	
	        return offset;
	    };
	
	    fn.set_limits = function (container_width) {
	        container_width || (container_width = this.$container.width());
	        this.player_max_left = container_width - this.player_width + -this.options.offset_left;
	
	        this.options.container_width = container_width;
	
	        return this;
	    };
	
	    fn.scroll_in = function (axis, data) {
	        var dir_prop = dir_map[axis];
	
	        var area_size = 50;
	        var scroll_inc = 30;
	
	        var is_x = axis === 'x';
	        var window_size = is_x ? this.window_width : this.window_height;
	        var doc_size = is_x ? $(document).width() : $(document).height();
	        var player_size = is_x ? this.$player.width() : this.$player.height();
	
	        var next_scroll;
	        var scroll_offset = $window['scroll' + capitalize(dir_prop)]();
	        var min_window_pos = scroll_offset;
	        var max_window_pos = min_window_pos + window_size;
	
	        var mouse_next_zone = max_window_pos - area_size; // down/right
	        var mouse_prev_zone = min_window_pos + area_size; // up/left
	
	        var abs_mouse_pos = min_window_pos + data.pointer[dir_prop];
	
	        var max_player_pos = doc_size - window_size + player_size;
	
	        if (abs_mouse_pos >= mouse_next_zone) {
	            next_scroll = scroll_offset + scroll_inc;
	            if (next_scroll < max_player_pos) {
	                $window['scroll' + capitalize(dir_prop)](next_scroll);
	                this['scroll_offset_' + axis] += scroll_inc;
	            }
	        }
	
	        if (abs_mouse_pos <= mouse_prev_zone) {
	            next_scroll = scroll_offset - scroll_inc;
	            if (next_scroll > 0) {
	                $window['scroll' + capitalize(dir_prop)](next_scroll);
	                this['scroll_offset_' + axis] -= scroll_inc;
	            }
	        }
	
	        return this;
	    };
	
	    fn.manage_scroll = function (data) {
	        this.scroll_in('x', data);
	        this.scroll_in('y', data);
	    };
	
	    fn.calculate_dimensions = function (e) {
	        this.window_height = $window.height();
	        this.window_width = $window.width();
	    };
	
	    fn.drag_handler = function (e) {
	        var node = e.target.nodeName;
	        // skip if drag is disabled, or click was not done with the mouse primary button
	        if (this.disabled || e.which !== 1 && !isTouch) {
	            return;
	        }
	
	        if (this.ignore_drag(e)) {
	            return;
	        }
	
	        var self = this;
	        var first = true;
	        this.$player = $(e.currentTarget);
	
	        this.el_init_pos = this.get_actual_pos(this.$player);
	        this.mouse_init_pos = this.get_mouse_pos(e);
	        this.offsetY = this.mouse_init_pos.top - this.el_init_pos.top;
	
	        this.$document.on(this.pointer_events.move, function (mme) {
	            var mouse_actual_pos = self.get_mouse_pos(mme);
	            var diff_x = Math.abs(mouse_actual_pos.left - self.mouse_init_pos.left);
	            var diff_y = Math.abs(mouse_actual_pos.top - self.mouse_init_pos.top);
	            if (!(diff_x > self.options.distance || diff_y > self.options.distance)) {
	                return false;
	            }
	
	            if (first) {
	                first = false;
	                self.on_dragstart.call(self, mme);
	                return false;
	            }
	
	            if (self.is_dragging === true) {
	                self.on_dragmove.call(self, mme);
	            }
	
	            return false;
	        });
	
	        if (!isTouch) {
	            return false;
	        }
	    };
	
	    fn.on_dragstart = function (e) {
	        e.preventDefault();
	
	        if (this.is_dragging) {
	            return this;
	        }
	
	        this.drag_start = this.is_dragging = true;
	        var offset = this.$container.offset();
	        this.baseX = Math.round(offset.left);
	        this.baseY = Math.round(offset.top);
	        this.initial_container_width = this.options.container_width || this.$container.width();
	
	        if (this.options.helper === 'clone') {
	            this.$helper = this.$player.clone().appendTo(this.$container).addClass('helper');
	            this.helper = true;
	        } else {
	            this.helper = false;
	        }
	
	        this.win_offset_y = $(window).scrollTop();
	        this.win_offset_x = $(window).scrollLeft();
	        this.scroll_offset_y = 0;
	        this.scroll_offset_x = 0;
	        this.el_init_offset = this.$player.offset();
	        this.player_width = this.$player.width();
	        this.player_height = this.$player.height();
	
	        this.set_limits(this.options.container_width);
	
	        if (this.options.start) {
	            this.options.start.call(this.$player, e, this.get_drag_data(e));
	        }
	        return false;
	    };
	
	    fn.on_dragmove = function (e) {
	        var data = this.get_drag_data(e);
	
	        this.options.autoscroll && this.manage_scroll(data);
	
	        if (this.options.move_element) {
	            (this.helper ? this.$helper : this.$player).css({
	                'position': 'absolute',
	                'left': data.position.left,
	                'top': data.position.top
	            });
	        }
	
	        var last_position = this.last_position || data.position;
	        data.prev_position = last_position;
	
	        if (this.options.drag) {
	            this.options.drag.call(this.$player, e, data);
	        }
	
	        this.last_position = data.position;
	        return false;
	    };
	
	    fn.on_dragstop = function (e) {
	        var data = this.get_drag_data(e);
	        this.drag_start = false;
	
	        if (this.options.stop) {
	            this.options.stop.call(this.$player, e, data);
	        }
	
	        if (this.helper && this.options.remove_helper) {
	            this.$helper.remove();
	        }
	
	        return false;
	    };
	
	    fn.on_select_start = function (e) {
	        if (this.disabled) {
	            return;
	        }
	
	        if (this.ignore_drag(e)) {
	            return;
	        }
	
	        return false;
	    };
	
	    fn.enable = function () {
	        this.disabled = false;
	    };
	
	    fn.disable = function () {
	        this.disabled = true;
	    };
	
	    fn.destroy = function () {
	        this.disable();
	
	        this.$container.off(this.ns);
	        this.$document.off(this.ns);
	        $(window).off(this.ns);
	
	        $.removeData(this.$container, 'drag');
	    };
	
	    fn.ignore_drag = function (event) {
	        if (this.options.handle) {
	            return !$(event.target).is(this.options.handle);
	        }
	
	        if ($.isFunction(this.options.ignore_dragging)) {
	            return this.options.ignore_dragging(event);
	        }
	
	        return $(event.target).is(this.options.ignore_dragging.join(', '));
	    };
	
	    //jQuery adapter
	    $.fn.drag = function (options) {
	        return new Draggable(this, options);
	    };
	
	    return Draggable;
	});
	
	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 14), __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_1__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        root.Gridster = factory(root.$ || root.jQuery, root.GridsterDraggable, root.GridsterCollision);
	    }
	})(undefined, function ($, Draggable, Collision) {
	
	    var defaults = {
	        namespace: '',
	        widget_selector: 'li',
	        widget_margins: [10, 10],
	        widget_base_dimensions: [400, 225],
	        extra_rows: 0,
	        extra_cols: 0,
	        min_cols: 1,
	        max_cols: Infinity,
	        min_rows: 15,
	        max_size_x: false,
	        autogrow_cols: false,
	        autogenerate_stylesheet: true,
	        avoid_overlapped_widgets: true,
	        auto_init: true,
	        serialize_params: function serialize_params($w, wgd) {
	            return {
	                col: wgd.col,
	                row: wgd.row,
	                size_x: wgd.size_x,
	                size_y: wgd.size_y
	            };
	        },
	        collision: {},
	        draggable: {
	            items: '.gs-w',
	            distance: 4,
	            ignore_dragging: Draggable.defaults.ignore_dragging.slice(0)
	        },
	        resize: {
	            enabled: false,
	            axes: ['both'],
	            handle_append_to: '',
	            handle_class: 'gs-resize-handle',
	            max_size: [Infinity, Infinity],
	            min_size: [1, 1]
	        }
	    };
	
	    /**
	    * @class Gridster
	    * @uses Draggable
	    * @uses Collision
	    * @param {HTMLElement} el The HTMLelement that contains all the widgets.
	    * @param {Object} [options] An Object with all options you want to
	    *        overwrite:
	    *    @param {HTMLElement|String} [options.widget_selector] Define who will
	    *     be the draggable widgets. Can be a CSS Selector String or a
	    *     collection of HTMLElements
	    *    @param {Array} [options.widget_margins] Margin between widgets.
	    *     The first index for the horizontal margin (left, right) and
	    *     the second for the vertical margin (top, bottom).
	    *    @param {Array} [options.widget_base_dimensions] Base widget dimensions
	    *     in pixels. The first index for the width and the second for the
	    *     height.
	    *    @param {Number} [options.extra_cols] Add more columns in addition to
	    *     those that have been calculated.
	    *    @param {Number} [options.extra_rows] Add more rows in addition to
	    *     those that have been calculated.
	    *    @param {Number} [options.min_cols] The minimum required columns.
	    *    @param {Number} [options.max_cols] The maximum columns possible (set to null
	    *     for no maximum).
	    *    @param {Number} [options.min_rows] The minimum required rows.
	    *    @param {Number} [options.max_size_x] The maximum number of columns
	    *     that a widget can span.
	    *    @param {Boolean} [options.autogenerate_stylesheet] If true, all the
	    *     CSS required to position all widgets in their respective columns
	    *     and rows will be generated automatically and injected to the
	    *     `<head>` of the document. You can set this to false, and write
	    *     your own CSS targeting rows and cols via data-attributes like so:
	    *     `[data-col="1"] { left: 10px; }`
	    *    @param {Boolean} [options.avoid_overlapped_widgets] Avoid that widgets loaded
	    *     from the DOM can be overlapped. It is helpful if the positions were
	    *     bad stored in the database or if there was any conflict.
	    *    @param {Boolean} [options.auto_init] Automatically call gridster init
	    *     method or not when the plugin is instantiated.
	    *    @param {Function} [options.serialize_params] Return the data you want
	    *     for each widget in the serialization. Two arguments are passed:
	    *     `$w`: the jQuery wrapped HTMLElement, and `wgd`: the grid
	    *     coords object (`col`, `row`, `size_x`, `size_y`).
	    *    @param {Object} [options.collision] An Object with all options for
	    *     Collision class you want to overwrite. See Collision docs for
	    *     more info.
	    *    @param {Object} [options.draggable] An Object with all options for
	    *     Draggable class you want to overwrite. See Draggable docs for more
	    *     info.
	    *       @param {Object|Function} [options.draggable.ignore_dragging] Note that
	    *        if you use a Function, and resize is enabled, you should ignore the
	    *        resize handlers manually (options.resize.handle_class).
	    *    @param {Object} [options.resize] An Object with resize config options.
	    *       @param {Boolean} [options.resize.enabled] Set to true to enable
	    *        resizing.
	    *       @param {Array} [options.resize.axes] Axes in which widgets can be
	    *        resized. Possible values: ['x', 'y', 'both'].
	    *       @param {String} [options.resize.handle_append_to] Set a valid CSS
	    *        selector to append resize handles to.
	    *       @param {String} [options.resize.handle_class] CSS class name used
	    *        by resize handles.
	    *       @param {Array} [options.resize.max_size] Limit widget dimensions
	    *        when resizing. Array values should be integers:
	    *        `[max_cols_occupied, max_rows_occupied]`
	    *       @param {Array} [options.resize.min_size] Limit widget dimensions
	    *        when resizing. Array values should be integers:
	    *        `[min_cols_occupied, min_rows_occupied]`
	    *       @param {Function} [options.resize.start] Function executed
	    *        when resizing starts.
	    *       @param {Function} [otions.resize.resize] Function executed
	    *        during the resizing.
	    *       @param {Function} [options.resize.stop] Function executed
	    *        when resizing stops.
	    *
	    * @constructor
	    */
	    function Gridster(el, options) {
	        this.options = $.extend(true, {}, defaults, options);
	        this.$el = $(el);
	        this.$wrapper = this.$el.parent();
	        this.$widgets = this.$el.children(this.options.widget_selector).addClass('gs-w');
	        this.widgets = [];
	        this.$changed = $([]);
	        this.wrapper_width = this.$wrapper.width();
	        this.min_widget_width = this.options.widget_margins[0] * 2 + this.options.widget_base_dimensions[0];
	        this.min_widget_height = this.options.widget_margins[1] * 2 + this.options.widget_base_dimensions[1];
	
	        this.generated_stylesheets = [];
	        this.$style_tags = $([]);
	
	        this.options.auto_init && this.init();
	    }
	
	    Gridster.defaults = defaults;
	    Gridster.generated_stylesheets = [];
	
	    /**
	    * Sorts an Array of grid coords objects (representing the grid coords of
	    * each widget) in ascending way.
	    *
	    * @method sort_by_row_asc
	    * @param {Array} widgets Array of grid coords objects
	    * @return {Array} Returns the array sorted.
	    */
	    Gridster.sort_by_row_asc = function (widgets) {
	        widgets = widgets.sort(function (a, b) {
	            if (!a.row) {
	                a = $(a).coords().grid;
	                b = $(b).coords().grid;
	            }
	
	            if (a.row > b.row) {
	                return 1;
	            }
	            return -1;
	        });
	
	        return widgets;
	    };
	
	    /**
	    * Sorts an Array of grid coords objects (representing the grid coords of
	    * each widget) placing first the empty cells upper left.
	    *
	    * @method sort_by_row_and_col_asc
	    * @param {Array} widgets Array of grid coords objects
	    * @return {Array} Returns the array sorted.
	    */
	    Gridster.sort_by_row_and_col_asc = function (widgets) {
	        widgets = widgets.sort(function (a, b) {
	            if (a.row > b.row || a.row === b.row && a.col > b.col) {
	                return 1;
	            }
	            return -1;
	        });
	
	        return widgets;
	    };
	
	    /**
	    * Sorts an Array of grid coords objects by column (representing the grid
	    * coords of each widget) in ascending way.
	    *
	    * @method sort_by_col_asc
	    * @param {Array} widgets Array of grid coords objects
	    * @return {Array} Returns the array sorted.
	    */
	    Gridster.sort_by_col_asc = function (widgets) {
	        widgets = widgets.sort(function (a, b) {
	            if (a.col > b.col) {
	                return 1;
	            }
	            return -1;
	        });
	
	        return widgets;
	    };
	
	    /**
	    * Sorts an Array of grid coords objects (representing the grid coords of
	    * each widget) in descending way.
	    *
	    * @method sort_by_row_desc
	    * @param {Array} widgets Array of grid coords objects
	    * @return {Array} Returns the array sorted.
	    */
	    Gridster.sort_by_row_desc = function (widgets) {
	        widgets = widgets.sort(function (a, b) {
	            if (a.row + a.size_y < b.row + b.size_y) {
	                return 1;
	            }
	            return -1;
	        });
	        return widgets;
	    };
	
	    /** Instance Methods **/
	
	    var fn = Gridster.prototype;
	
	    fn.init = function () {
	        this.options.resize.enabled && this.setup_resize();
	        this.generate_grid_and_stylesheet();
	        this.get_widgets_from_DOM();
	        this.set_dom_grid_height();
	        this.set_dom_grid_width();
	        this.$wrapper.addClass('ready');
	        this.draggable();
	        this.options.resize.enabled && this.resizable();
	
	        $(window).bind('resize.gridster', throttle($.proxy(this.recalculate_faux_grid, this), 200));
	    };
	
	    /**
	    * Disables dragging.
	    *
	    * @method disable
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.disable = function () {
	        this.$wrapper.find('.player-revert').removeClass('player-revert');
	        this.drag_api.disable();
	        return this;
	    };
	
	    /**
	    * Enables dragging.
	    *
	    * @method enable
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.enable = function () {
	        this.drag_api.enable();
	        return this;
	    };
	
	    /**
	    * Disables drag-and-drop widget resizing.
	    *
	    * @method disable
	    * @return {Class} Returns instance of gridster Class.
	    */
	    fn.disable_resize = function () {
	        this.$el.addClass('gs-resize-disabled');
	        this.resize_api.disable();
	        return this;
	    };
	
	    /**
	    * Enables drag-and-drop widget resizing.
	    *
	    * @method enable
	    * @return {Class} Returns instance of gridster Class.
	    */
	    fn.enable_resize = function () {
	        this.$el.removeClass('gs-resize-disabled');
	        this.resize_api.enable();
	        return this;
	    };
	
	    /**
	    * Add a new widget to the grid.
	    *
	    * @method add_widget
	    * @param {String|HTMLElement} html The string representing the HTML of the widget
	    *  or the HTMLElement.
	    * @param {Number} [size_x] The nº of rows the widget occupies horizontally.
	    * @param {Number} [size_y] The nº of columns the widget occupies vertically.
	    * @param {Number} [col] The column the widget should start in.
	    * @param {Number} [row] The row the widget should start in.
	    * @param {Array} [max_size] max_size Maximun size (in units) for width and height.
	    * @param {Array} [min_size] min_size Minimum size (in units) for width and height.
	    * @return {HTMLElement} Returns the jQuery wrapped HTMLElement representing.
	    *  the widget that was just created.
	    */
	    fn.add_widget = function (html, size_x, size_y, col, row, max_size, min_size) {
	        var pos;
	        size_x || (size_x = 1);
	        size_y || (size_y = 1);
	
	        if (!col & !row) {
	            pos = this.next_position(size_x, size_y);
	        } else {
	            pos = {
	                col: col,
	                row: row,
	                size_x: size_x,
	                size_y: size_y
	            };
	
	            this.empty_cells(col, row, size_x, size_y);
	        }
	
	        var $w = $(html).attr({
	            'data-col': pos.col,
	            'data-row': pos.row,
	            'data-sizex': size_x,
	            'data-sizey': size_y
	        }).addClass('gs-w').appendTo(this.$el).hide();
	
	        this.$widgets = this.$widgets.add($w);
	
	        this.register_widget($w);
	
	        this.add_faux_rows(pos.size_y);
	        //this.add_faux_cols(pos.size_x);
	
	        if (max_size) {
	            this.set_widget_max_size($w, max_size);
	        }
	
	        if (min_size) {
	            this.set_widget_min_size($w, min_size);
	        }
	
	        this.set_dom_grid_width();
	        this.set_dom_grid_height();
	
	        this.drag_api.set_limits(this.cols * this.min_widget_width);
	
	        return $w.fadeIn();
	    };
	
	    /**
	    * Change widget size limits.
	    *
	    * @method set_widget_min_size
	    * @param {HTMLElement|Number} $widget The jQuery wrapped HTMLElement
	    *  representing the widget or an index representing the desired widget.
	    * @param {Array} min_size Minimum size (in units) for width and height.
	    * @return {HTMLElement} Returns instance of gridster Class.
	    */
	    fn.set_widget_min_size = function ($widget, min_size) {
	        $widget = typeof $widget === 'number' ? this.$widgets.eq($widget) : $widget;
	
	        if (!$widget.length) {
	            return this;
	        }
	
	        var wgd = $widget.data('coords').grid;
	        wgd.min_size_x = min_size[0];
	        wgd.min_size_y = min_size[1];
	
	        return this;
	    };
	
	    /**
	    * Change widget size limits.
	    *
	    * @method set_widget_max_size
	    * @param {HTMLElement|Number} $widget The jQuery wrapped HTMLElement
	    *  representing the widget or an index representing the desired widget.
	    * @param {Array} max_size Maximun size (in units) for width and height.
	    * @return {HTMLElement} Returns instance of gridster Class.
	    */
	    fn.set_widget_max_size = function ($widget, max_size) {
	        $widget = typeof $widget === 'number' ? this.$widgets.eq($widget) : $widget;
	
	        if (!$widget.length) {
	            return this;
	        }
	
	        var wgd = $widget.data('coords').grid;
	        wgd.max_size_x = max_size[0];
	        wgd.max_size_y = max_size[1];
	
	        return this;
	    };
	
	    /**
	    * Append the resize handle into a widget.
	    *
	    * @method add_resize_handle
	    * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
	    *  representing the widget.
	    * @return {HTMLElement} Returns instance of gridster Class.
	    */
	    fn.add_resize_handle = function ($w) {
	        var append_to = this.options.resize.handle_append_to;
	        $(this.resize_handle_tpl).appendTo(append_to ? $(append_to, $w) : $w);
	
	        return this;
	    };
	
	    /**
	    * Change the size of a widget. Width is limited to the current grid width.
	    *
	    * @method resize_widget
	    * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
	    *  representing the widget.
	    * @param {Number} size_x The number of columns that will occupy the widget.
	    *  By default <code>size_x</code> is limited to the space available from
	    *  the column where the widget begins, until the last column to the right.
	    * @param {Number} size_y The number of rows that will occupy the widget.
	    * @param {Function} [callback] Function executed when the widget is removed.
	    * @return {HTMLElement} Returns $widget.
	    */
	    fn.resize_widget = function ($widget, size_x, size_y, callback) {
	        var wgd = $widget.coords().grid;
	        var col = wgd.col;
	        var max_cols = this.options.max_cols;
	        var old_size_y = wgd.size_y;
	        var old_col = wgd.col;
	        var new_col = old_col;
	
	        size_x || (size_x = wgd.size_x);
	        size_y || (size_y = wgd.size_y);
	
	        if (max_cols !== Infinity) {
	            size_x = Math.min(size_x, max_cols - col + 1);
	        }
	
	        if (size_y > old_size_y) {
	            this.add_faux_rows(Math.max(size_y - old_size_y, 0));
	        }
	
	        var player_rcol = col + size_x - 1;
	        if (player_rcol > this.cols) {
	            this.add_faux_cols(player_rcol - this.cols);
	        }
	
	        var new_grid_data = {
	            col: new_col,
	            row: wgd.row,
	            size_x: size_x,
	            size_y: size_y
	        };
	
	        this.mutate_widget_in_gridmap($widget, wgd, new_grid_data);
	
	        this.set_dom_grid_height();
	        this.set_dom_grid_width();
	
	        if (callback) {
	            callback.call(this, new_grid_data.size_x, new_grid_data.size_y);
	        }
	
	        return $widget;
	    };
	
	    /**
	    * Mutate widget dimensions and position in the grid map.
	    *
	    * @method mutate_widget_in_gridmap
	    * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
	    *  representing the widget to mutate.
	    * @param {Object} wgd Current widget grid data (col, row, size_x, size_y).
	    * @param {Object} new_wgd New widget grid data.
	    * @return {HTMLElement} Returns instance of gridster Class.
	    */
	    fn.mutate_widget_in_gridmap = function ($widget, wgd, new_wgd) {
	        var old_size_x = wgd.size_x;
	        var old_size_y = wgd.size_y;
	
	        var old_cells_occupied = this.get_cells_occupied(wgd);
	        var new_cells_occupied = this.get_cells_occupied(new_wgd);
	
	        var empty_cols = [];
	        $.each(old_cells_occupied.cols, function (i, col) {
	            if ($.inArray(col, new_cells_occupied.cols) === -1) {
	                empty_cols.push(col);
	            }
	        });
	
	        var occupied_cols = [];
	        $.each(new_cells_occupied.cols, function (i, col) {
	            if ($.inArray(col, old_cells_occupied.cols) === -1) {
	                occupied_cols.push(col);
	            }
	        });
	
	        var empty_rows = [];
	        $.each(old_cells_occupied.rows, function (i, row) {
	            if ($.inArray(row, new_cells_occupied.rows) === -1) {
	                empty_rows.push(row);
	            }
	        });
	
	        var occupied_rows = [];
	        $.each(new_cells_occupied.rows, function (i, row) {
	            if ($.inArray(row, old_cells_occupied.rows) === -1) {
	                occupied_rows.push(row);
	            }
	        });
	
	        this.remove_from_gridmap(wgd);
	
	        if (occupied_cols.length) {
	            var cols_to_empty = [new_wgd.col, new_wgd.row, new_wgd.size_x, Math.min(old_size_y, new_wgd.size_y), $widget];
	            this.empty_cells.apply(this, cols_to_empty);
	        }
	
	        if (occupied_rows.length) {
	            var rows_to_empty = [new_wgd.col, new_wgd.row, new_wgd.size_x, new_wgd.size_y, $widget];
	            this.empty_cells.apply(this, rows_to_empty);
	        }
	
	        // not the same that wgd = new_wgd;
	        wgd.col = new_wgd.col;
	        wgd.row = new_wgd.row;
	        wgd.size_x = new_wgd.size_x;
	        wgd.size_y = new_wgd.size_y;
	
	        this.add_to_gridmap(new_wgd, $widget);
	
	        $widget.removeClass('player-revert');
	
	        //update coords instance attributes
	        $widget.data('coords').update({
	            width: new_wgd.size_x * this.options.widget_base_dimensions[0] + (new_wgd.size_x - 1) * this.options.widget_margins[0] * 2,
	            height: new_wgd.size_y * this.options.widget_base_dimensions[1] + (new_wgd.size_y - 1) * this.options.widget_margins[1] * 2
	        });
	
	        $widget.attr({
	            'data-col': new_wgd.col,
	            'data-row': new_wgd.row,
	            'data-sizex': new_wgd.size_x,
	            'data-sizey': new_wgd.size_y
	        });
	
	        if (empty_cols.length) {
	            var cols_to_remove_holes = [empty_cols[0], new_wgd.row, empty_cols.length, Math.min(old_size_y, new_wgd.size_y), $widget];
	
	            this.remove_empty_cells.apply(this, cols_to_remove_holes);
	        }
	
	        if (empty_rows.length) {
	            var rows_to_remove_holes = [new_wgd.col, new_wgd.row, new_wgd.size_x, new_wgd.size_y, $widget];
	            this.remove_empty_cells.apply(this, rows_to_remove_holes);
	        }
	
	        this.move_widget_up($widget);
	
	        return this;
	    };
	
	    /**
	    * Move down widgets in cells represented by the arguments col, row, size_x,
	    * size_y
	    *
	    * @method empty_cells
	    * @param {Number} col The column where the group of cells begin.
	    * @param {Number} row The row where the group of cells begin.
	    * @param {Number} size_x The number of columns that the group of cells
	    * occupy.
	    * @param {Number} size_y The number of rows that the group of cells
	    * occupy.
	    * @param {HTMLElement} $exclude Exclude widgets from being moved.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.empty_cells = function (col, row, size_x, size_y, $exclude) {
	        var $nexts = this.widgets_below({
	            col: col,
	            row: row - size_y,
	            size_x: size_x,
	            size_y: size_y
	        });
	
	        $nexts.not($exclude).each($.proxy(function (i, w) {
	            var wgd = $(w).coords().grid;
	            if (!(wgd.row <= row + size_y - 1)) {
	                return;
	            }
	            var diff = row + size_y - wgd.row;
	            this.move_widget_down($(w), diff);
	        }, this));
	
	        this.set_dom_grid_height();
	
	        return this;
	    };
	
	    /**
	    * Move up widgets below cells represented by the arguments col, row, size_x,
	    * size_y.
	    *
	    * @method remove_empty_cells
	    * @param {Number} col The column where the group of cells begin.
	    * @param {Number} row The row where the group of cells begin.
	    * @param {Number} size_x The number of columns that the group of cells
	    * occupy.
	    * @param {Number} size_y The number of rows that the group of cells
	    * occupy.
	    * @param {HTMLElement} exclude Exclude widgets from being moved.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.remove_empty_cells = function (col, row, size_x, size_y, exclude) {
	        var $nexts = this.widgets_below({
	            col: col,
	            row: row,
	            size_x: size_x,
	            size_y: size_y
	        });
	
	        $nexts.not(exclude).each($.proxy(function (i, widget) {
	            this.move_widget_up($(widget), size_y);
	        }, this));
	
	        this.set_dom_grid_height();
	
	        return this;
	    };
	
	    /**
	    * Get the most left column below to add a new widget.
	    *
	    * @method next_position
	    * @param {Number} size_x The nº of rows the widget occupies horizontally.
	    * @param {Number} size_y The nº of columns the widget occupies vertically.
	    * @return {Object} Returns a grid coords object representing the future
	    *  widget coords.
	    */
	    fn.next_position = function (size_x, size_y) {
	        size_x || (size_x = 1);
	        size_y || (size_y = 1);
	        var ga = this.gridmap;
	        var cols_l = ga.length;
	        var valid_pos = [];
	        var rows_l;
	
	        for (var c = 1; c < cols_l; c++) {
	            rows_l = ga[c].length;
	            for (var r = 1; r <= rows_l; r++) {
	                var can_move_to = this.can_move_to({
	                    size_x: size_x,
	                    size_y: size_y
	                }, c, r);
	
	                if (can_move_to) {
	                    valid_pos.push({
	                        col: c,
	                        row: r,
	                        size_y: size_y,
	                        size_x: size_x
	                    });
	                }
	            }
	        }
	
	        if (valid_pos.length) {
	            return Gridster.sort_by_row_and_col_asc(valid_pos)[0];
	        }
	        return false;
	    };
	
	    /**
	    * Remove a widget from the grid.
	    *
	    * @method remove_widget
	    * @param {HTMLElement} el The jQuery wrapped HTMLElement you want to remove.
	    * @param {Boolean|Function} silent If true, widgets below the removed one
	    * will not move up. If a Function is passed it will be used as callback.
	    * @param {Function} callback Function executed when the widget is removed.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.remove_widget = function (el, silent, callback) {
	        var $el = el instanceof $ ? el : $(el);
	        var wgd = $el.coords().grid;
	
	        // if silent is a function assume it's a callback
	        if ($.isFunction(silent)) {
	            callback = silent;
	            silent = false;
	        }
	
	        this.cells_occupied_by_placeholder = {};
	        this.$widgets = this.$widgets.not($el);
	
	        var $nexts = this.widgets_below($el);
	
	        this.remove_from_gridmap(wgd);
	
	        //$el.fadeOut(
	        $.proxy(function () {
	            $el.remove();
	
	            if (!silent) {
	                $nexts.each($.proxy(function (i, widget) {
	                    this.move_widget_up($(widget), wgd.size_y);
	                }, this));
	            }
	            this.set_dom_grid_height();
	
	            if (callback) {
	                callback.call(this, el);
	            }
	        }, this)();
	        //);
	        return this;
	    };
	
	    /**
	    * Remove all widgets from the grid.
	    *
	    * @method remove_all_widgets
	    * @param {Function} callback Function executed for each widget removed.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.remove_all_widgets = function (callback) {
	        this.$widgets.each($.proxy(function (i, el) {
	            this.remove_widget(el, true, callback);
	        }, this));
	
	        return this;
	    };
	
	    /**
	    * Returns a serialized array of the widgets in the grid.
	    *
	    * @method serialize
	    * @param {HTMLElement} [$widgets] The collection of jQuery wrapped
	    *  HTMLElements you want to serialize. If no argument is passed all widgets
	    *  will be serialized.
	    * @return {Array} Returns an Array of Objects with the data specified in
	    *  the serialize_params option.
	    */
	    fn.serialize = function ($widgets) {
	        $widgets || ($widgets = this.$widgets);
	
	        return $widgets.map($.proxy(function (i, widget) {
	            var $w = $(widget);
	            return this.options.serialize_params($w, $w.coords().grid);
	        }, this)).get();
	    };
	
	    /**
	    * Returns a serialized array of the widgets that have changed their
	    *  position.
	    *
	    * @method serialize_changed
	    * @return {Array} Returns an Array of Objects with the data specified in
	    *  the serialize_params option.
	    */
	    fn.serialize_changed = function () {
	        return this.serialize(this.$changed);
	    };
	
	    /**
	    * Convert widgets from DOM elements to "widget grid data" Objects.
	    *
	    * @method dom_to_coords
	    * @param {HTMLElement} $widget The widget to be converted.
	    */
	    fn.dom_to_coords = function ($widget) {
	        return {
	            'col': parseInt($widget.attr('data-col'), 10),
	            'row': parseInt($widget.attr('data-row'), 10),
	            'size_x': parseInt($widget.attr('data-sizex'), 10) || 1,
	            'size_y': parseInt($widget.attr('data-sizey'), 10) || 1,
	            'max_size_x': parseInt($widget.attr('data-max-sizex'), 10) || false,
	            'max_size_y': parseInt($widget.attr('data-max-sizey'), 10) || false,
	            'min_size_x': parseInt($widget.attr('data-min-sizex'), 10) || false,
	            'min_size_y': parseInt($widget.attr('data-min-sizey'), 10) || false,
	            'el': $widget
	        };
	    };
	
	    /**
	    * Creates the grid coords object representing the widget an add it to the
	    * mapped array of positions.
	    *
	    * @method register_widget
	    * @param {HTMLElement|Object} $el jQuery wrapped HTMLElement representing
	    *  the widget, or an "widget grid data" Object with (col, row, el ...).
	    * @return {Boolean} Returns true if the widget final position is different
	    *  than the original.
	    */
	    fn.register_widget = function ($el) {
	        var isDOM = $el instanceof jQuery;
	        var wgd = isDOM ? this.dom_to_coords($el) : $el;
	        var posChanged = false;
	        isDOM || ($el = wgd.el);
	
	        var empty_upper_row = this.can_go_widget_up(wgd);
	        if (empty_upper_row) {
	            wgd.row = empty_upper_row;
	            $el.attr('data-row', empty_upper_row);
	            this.$el.trigger('gridster:positionchanged', [wgd]);
	            posChanged = true;
	        }
	
	        if (this.options.avoid_overlapped_widgets && !this.can_move_to({ size_x: wgd.size_x, size_y: wgd.size_y }, wgd.col, wgd.row)) {
	            $.extend(wgd, this.next_position(wgd.size_x, wgd.size_y));
	            $el.attr({
	                'data-col': wgd.col,
	                'data-row': wgd.row,
	                'data-sizex': wgd.size_x,
	                'data-sizey': wgd.size_y
	            });
	            posChanged = true;
	        }
	
	        // attach Coord object to player data-coord attribute
	        $el.data('coords', $el.coords());
	        // Extend Coord object with grid position info
	        $el.data('coords').grid = wgd;
	
	        this.add_to_gridmap(wgd, $el);
	
	        this.options.resize.enabled && this.add_resize_handle($el);
	
	        return posChanged;
	    };
	
	    /**
	    * Update in the mapped array of positions the value of cells represented by
	    * the grid coords object passed in the `grid_data` param.
	    *
	    * @param {Object} grid_data The grid coords object representing the cells
	    *  to update in the mapped array.
	    * @param {HTMLElement|Boolean} value Pass `false` or the jQuery wrapped
	    *  HTMLElement, depends if you want to delete an existing position or add
	    *  a new one.
	    * @method update_widget_position
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.update_widget_position = function (grid_data, value) {
	        this.for_each_cell_occupied(grid_data, function (col, row) {
	            if (!this.gridmap[col]) {
	                return this;
	            }
	            this.gridmap[col][row] = value;
	        });
	        return this;
	    };
	
	    /**
	    * Remove a widget from the mapped array of positions.
	    *
	    * @method remove_from_gridmap
	    * @param {Object} grid_data The grid coords object representing the cells
	    *  to update in the mapped array.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.remove_from_gridmap = function (grid_data) {
	        return this.update_widget_position(grid_data, false);
	    };
	
	    /**
	    * Add a widget to the mapped array of positions.
	    *
	    * @method add_to_gridmap
	    * @param {Object} grid_data The grid coords object representing the cells
	    *  to update in the mapped array.
	    * @param {HTMLElement|Boolean} value The value to set in the specified
	    *  position .
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.add_to_gridmap = function (grid_data, value) {
	        this.update_widget_position(grid_data, value || grid_data.el);
	
	        if (grid_data.el) {
	            var $widgets = this.widgets_below(grid_data.el);
	            $widgets.each($.proxy(function (i, widget) {
	                this.move_widget_up($(widget));
	            }, this));
	        }
	    };
	
	    /**
	    * Make widgets draggable.
	    *
	    * @uses Draggable
	    * @method draggable
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.draggable = function () {
	        var self = this;
	        var draggable_options = $.extend(true, {}, this.options.draggable, {
	            offset_left: this.options.widget_margins[0],
	            offset_top: this.options.widget_margins[1],
	            container_width: this.cols * this.min_widget_width,
	            //TODO  changeed by liuhan:  TO make widget be dragged outside container
	            limit: false,
	            start: function start(event, ui) {
	                self.$widgets.filter('.player-revert').removeClass('player-revert');
	
	                self.$player = $(this);
	                self.$helper = $(ui.$helper);
	
	                self.helper = !self.$helper.is(self.$player);
	
	                self.on_start_drag.call(self, event, ui);
	                self.$el.trigger('gridster:dragstart');
	            },
	            stop: function stop(event, ui) {
	                self.on_stop_drag.call(self, event, ui);
	                self.$el.trigger('gridster:dragstop');
	            },
	            drag: throttle(function (event, ui) {
	                self.on_drag.call(self, event, ui);
	                self.$el.trigger('gridster:drag');
	            }, 60)
	        });
	
	        this.drag_api = this.$el.drag(draggable_options);
	        return this;
	    };
	
	    /**
	    * Bind resize events to get resize working.
	    *
	    * @method resizable
	    * @return {Class} Returns instance of gridster Class.
	    */
	    fn.resizable = function () {
	        this.resize_api = this.$el.drag({
	            items: '.' + this.options.resize.handle_class,
	            offset_left: this.options.widget_margins[0],
	            container_width: this.container_width,
	            move_element: false,
	            resize: true,
	            limit: this.options.autogrow_cols ? false : true,
	            start: $.proxy(this.on_start_resize, this),
	            stop: $.proxy(function (event, ui) {
	                delay($.proxy(function () {
	                    this.on_stop_resize(event, ui);
	                }, this), 120);
	            }, this),
	            drag: throttle($.proxy(this.on_resize, this), 60)
	        });
	
	        return this;
	    };
	
	    /**
	    * Setup things required for resizing. Like build templates for drag handles.
	    *
	    * @method setup_resize
	    * @return {Class} Returns instance of gridster Class.
	    */
	    fn.setup_resize = function () {
	        this.resize_handle_class = this.options.resize.handle_class;
	        var axes = this.options.resize.axes;
	        var handle_tpl = '<span class="' + this.resize_handle_class + ' ' + this.resize_handle_class + '-{type}" />';
	
	        this.resize_handle_tpl = $.map(axes, function (type) {
	            return handle_tpl.replace('{type}', type);
	        }).join('');
	
	        if ($.isArray(this.options.draggable.ignore_dragging)) {
	            this.options.draggable.ignore_dragging.push('.' + this.resize_handle_class);
	        }
	
	        return this;
	    };
	
	    /**
	    * This function is executed when the player begins to be dragged.
	    *
	    * @method on_start_drag
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_start_drag = function (event, ui) {
	        this.$helper.add(this.$player).add(this.$wrapper).addClass('dragging');
	
	        this.highest_col = this.get_highest_occupied_cell().col;
	
	        this.$player.addClass('player');
	        this.player_grid_data = this.$player.coords().grid;
	        this.placeholder_grid_data = $.extend({}, this.player_grid_data);
	
	        this.set_dom_grid_height(this.$el.height() + this.player_grid_data.size_y * this.min_widget_height);
	
	        this.set_dom_grid_width(this.cols);
	
	        var pgd_sizex = this.player_grid_data.size_x;
	        var cols_diff = this.cols - this.highest_col;
	
	        if (this.options.autogrow_cols && cols_diff <= pgd_sizex) {
	            this.add_faux_cols(Math.min(pgd_sizex - cols_diff, 1));
	        }
	
	        var colliders = this.faux_grid;
	        var coords = this.$player.data('coords').coords;
	
	        this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
	        this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data);
	
	        this.last_cols = [];
	        this.last_rows = [];
	
	        // see jquery.collision.js
	        this.collision_api = this.$helper.collision(colliders, this.options.collision);
	
	        this.$preview_holder = $('<' + this.$player.get(0).tagName + ' />', {
	            'class': 'preview-holder',
	            'data-row': this.$player.attr('data-row'),
	            'data-col': this.$player.attr('data-col'),
	            css: {
	                width: coords.width,
	                height: coords.height
	            }
	        }).appendTo(this.$el);
	
	        if (this.options.draggable.start) {
	            this.options.draggable.start.call(this, event, ui);
	        }
	    };
	
	    /**
	    * This function is executed when the player is being dragged.
	    *
	    * @method on_drag
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_drag = function (event, ui) {
	        //break if dragstop has been fired
	        if (this.$player === null) {
	            return false;
	        }
	
	        var abs_offset = {
	            left: ui.position.left + this.baseX,
	            top: ui.position.top + this.baseY
	        };
	
	        // auto grow cols
	        if (this.options.autogrow_cols) {
	            var prcol = this.placeholder_grid_data.col + this.placeholder_grid_data.size_x - 1;
	
	            // "- 1" due to adding at least 1 column in on_start_drag
	            if (prcol >= this.cols - 1 && this.options.max_cols >= this.cols + 1) {
	                this.add_faux_cols(1);
	                this.set_dom_grid_width(this.cols + 1);
	                this.drag_api.set_limits(this.container_width);
	            }
	
	            this.collision_api.set_colliders(this.faux_grid);
	        }
	
	        this.colliders_data = this.collision_api.get_closest_colliders(abs_offset);
	
	        this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column);
	
	        this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row);
	
	        if (this.helper && this.$player) {
	            this.$player.css({
	                'left': ui.position.left,
	                'top': ui.position.top
	            });
	        }
	
	        if (this.options.draggable.drag) {
	            this.options.draggable.drag.call(this, event, ui);
	        }
	    };
	
	    /**
	    * This function is executed when the player stops being dragged.
	    *
	    * @method on_stop_drag
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_stop_drag = function (event, ui) {
	        this.$helper.add(this.$player).add(this.$wrapper).removeClass('dragging');
	
	        ui.position.left = ui.position.left + this.baseX;
	        ui.position.top = ui.position.top + this.baseY;
	        this.colliders_data = this.collision_api.get_closest_colliders(ui.position);
	
	        this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column);
	
	        this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row);
	
	        this.$player.addClass('player-revert').removeClass('player').attr({
	            'data-col': this.placeholder_grid_data.col,
	            'data-row': this.placeholder_grid_data.row
	        }).css({
	            'left': '',
	            'top': ''
	        });
	
	        this.$changed = this.$changed.add(this.$player);
	
	        this.cells_occupied_by_player = this.get_cells_occupied(this.placeholder_grid_data);
	        this.set_cells_player_occupies(this.placeholder_grid_data.col, this.placeholder_grid_data.row);
	
	        this.$player.coords().grid.row = this.placeholder_grid_data.row;
	        this.$player.coords().grid.col = this.placeholder_grid_data.col;
	
	        if (this.options.draggable.stop) {
	            this.options.draggable.stop.call(this, event, ui);
	        }
	
	        this.$preview_holder.remove();
	
	        this.$player = null;
	        this.$helper = null;
	        this.placeholder_grid_data = {};
	        this.player_grid_data = {};
	        this.cells_occupied_by_placeholder = {};
	        this.cells_occupied_by_player = {};
	
	        this.set_dom_grid_height();
	        this.set_dom_grid_width();
	
	        if (this.options.autogrow_cols) {
	            this.drag_api.set_limits(this.cols * this.min_widget_width);
	        }
	    };
	
	    /**
	    * This function is executed every time a widget starts to be resized.
	    *
	    * @method on_start_resize
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_start_resize = function (event, ui) {
	        this.$resized_widget = ui.$player.closest('.gs-w');
	        this.resize_coords = this.$resized_widget.coords();
	        this.resize_wgd = this.resize_coords.grid;
	        this.resize_initial_width = this.resize_coords.coords.width;
	        this.resize_initial_height = this.resize_coords.coords.height;
	        this.resize_initial_sizex = this.resize_coords.grid.size_x;
	        this.resize_initial_sizey = this.resize_coords.grid.size_y;
	        this.resize_initial_col = this.resize_coords.grid.col;
	        this.resize_last_sizex = this.resize_initial_sizex;
	        this.resize_last_sizey = this.resize_initial_sizey;
	
	        this.resize_max_size_x = Math.min(this.resize_wgd.max_size_x || this.options.resize.max_size[0], this.options.max_cols - this.resize_initial_col + 1);
	        this.resize_max_size_y = this.resize_wgd.max_size_y || this.options.resize.max_size[1];
	
	        this.resize_min_size_x = this.resize_wgd.min_size_x || this.options.resize.min_size[0] || 1;
	        this.resize_min_size_y = this.resize_wgd.min_size_y || this.options.resize.min_size[1] || 1;
	
	        this.resize_initial_last_col = this.get_highest_occupied_cell().col;
	
	        this.set_dom_grid_width(this.cols);
	
	        this.resize_dir = {
	            right: ui.$player.is('.' + this.resize_handle_class + '-x'),
	            bottom: ui.$player.is('.' + this.resize_handle_class + '-y')
	        };
	
	        this.$resized_widget.css({
	            'min-width': this.options.widget_base_dimensions[0],
	            'min-height': this.options.widget_base_dimensions[1]
	        });
	
	        var nodeName = this.$resized_widget.get(0).tagName;
	        this.$resize_preview_holder = $('<' + nodeName + ' />', {
	            'class': 'preview-holder resize-preview-holder',
	            'data-row': this.$resized_widget.attr('data-row'),
	            'data-col': this.$resized_widget.attr('data-col'),
	            'css': {
	                'width': this.resize_initial_width,
	                'height': this.resize_initial_height
	            }
	        }).appendTo(this.$el);
	
	        this.$resized_widget.addClass('resizing');
	
	        if (this.options.resize.start) {
	            this.options.resize.start.call(this, event, ui, this.$resized_widget);
	        }
	
	        this.$el.trigger('gridster:resizestart');
	    };
	
	    /**
	    * This function is executed every time a widget stops being resized.
	    *
	    * @method on_stop_resize
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_stop_resize = function (event, ui) {
	        this.$resized_widget.removeClass('resizing').css({
	            'width': '',
	            'height': ''
	        });
	
	        delay($.proxy(function () {
	            this.$resize_preview_holder.remove().css({
	                'min-width': '',
	                'min-height': ''
	            });
	
	            if (this.options.resize.stop) {
	                this.options.resize.stop.call(this, event, ui, this.$resized_widget);
	            }
	
	            this.$el.trigger('gridster:resizestop');
	        }, this), 300);
	
	        this.set_dom_grid_width();
	
	        if (this.options.autogrow_cols) {
	            this.drag_api.set_limits(this.cols * this.min_widget_width);
	        }
	    };
	
	    /**
	    * This function is executed when a widget is being resized.
	    *
	    * @method on_resize
	    * @param {Event} event The original browser event
	    * @param {Object} ui A prepared ui object with useful drag-related data
	    */
	    fn.on_resize = function (event, ui) {
	        var rel_x = ui.pointer.diff_left;
	        var rel_y = ui.pointer.diff_top;
	        var wbd_x = this.options.widget_base_dimensions[0];
	        var wbd_y = this.options.widget_base_dimensions[1];
	        var margin_x = this.options.widget_margins[0];
	        var margin_y = this.options.widget_margins[1];
	        var max_size_x = this.resize_max_size_x;
	        var min_size_x = this.resize_min_size_x;
	        var max_size_y = this.resize_max_size_y;
	        var min_size_y = this.resize_min_size_y;
	        var autogrow = this.options.autogrow_cols;
	        var width;
	        var max_width = Infinity;
	        var max_height = Infinity;
	
	        var inc_units_x = Math.ceil(rel_x / (wbd_x + margin_x * 2) - 0.2);
	        var inc_units_y = Math.ceil(rel_y / (wbd_y + margin_y * 2) - 0.2);
	
	        var size_x = Math.max(1, this.resize_initial_sizex + inc_units_x);
	        var size_y = Math.max(1, this.resize_initial_sizey + inc_units_y);
	
	        var max_cols = this.container_width / this.min_widget_width - this.resize_initial_col + 1;
	        var limit_width = max_cols * this.min_widget_width - margin_x * 2;
	
	        size_x = Math.max(Math.min(size_x, max_size_x), min_size_x);
	        size_x = Math.min(max_cols, size_x);
	        width = max_size_x * wbd_x + (size_x - 1) * margin_x * 2;
	        max_width = Math.min(width, limit_width);
	        min_width = min_size_x * wbd_x + (size_x - 1) * margin_x * 2;
	
	        size_y = Math.max(Math.min(size_y, max_size_y), min_size_y);
	        max_height = max_size_y * wbd_y + (size_y - 1) * margin_y * 2;
	        min_height = min_size_y * wbd_y + (size_y - 1) * margin_y * 2;
	
	        if (this.resize_dir.right) {
	            size_y = this.resize_initial_sizey;
	        } else if (this.resize_dir.bottom) {
	            size_x = this.resize_initial_sizex;
	        }
	
	        if (autogrow) {
	            var last_widget_col = this.resize_initial_col + size_x - 1;
	            if (autogrow && this.resize_initial_last_col <= last_widget_col) {
	                this.set_dom_grid_width(Math.max(last_widget_col + 1, this.cols));
	
	                if (this.cols < last_widget_col) {
	                    this.add_faux_cols(last_widget_col - this.cols);
	                }
	            }
	        }
	
	        var css_props = {};
	        !this.resize_dir.bottom && (css_props.width = Math.max(Math.min(this.resize_initial_width + rel_x, max_width), min_width));
	        !this.resize_dir.right && (css_props.height = Math.max(Math.min(this.resize_initial_height + rel_y, max_height), min_height));
	
	        this.$resized_widget.css(css_props);
	
	        if (size_x !== this.resize_last_sizex || size_y !== this.resize_last_sizey) {
	
	            this.resize_widget(this.$resized_widget, size_x, size_y);
	            this.set_dom_grid_width(this.cols);
	
	            this.$resize_preview_holder.css({
	                'width': '',
	                'height': ''
	            }).attr({
	                'data-row': this.$resized_widget.attr('data-row'),
	                'data-sizex': size_x,
	                'data-sizey': size_y
	            });
	        }
	
	        if (this.options.resize.resize) {
	            this.options.resize.resize.call(this, event, ui, this.$resized_widget);
	        }
	
	        this.$el.trigger('gridster:resize');
	
	        this.resize_last_sizex = size_x;
	        this.resize_last_sizey = size_y;
	    };
	
	    /**
	    * Executes the callbacks passed as arguments when a column begins to be
	    * overlapped or stops being overlapped.
	    *
	    * @param {Function} start_callback Function executed when a new column
	    *  begins to be overlapped. The column is passed as first argument.
	    * @param {Function} stop_callback Function executed when a column stops
	    *  being overlapped. The column is passed as first argument.
	    * @method on_overlapped_column_change
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.on_overlapped_column_change = function (start_callback, stop_callback) {
	        if (!this.colliders_data.length) {
	            return this;
	        }
	        var cols = this.get_targeted_columns(this.colliders_data[0].el.data.col);
	
	        var last_n_cols = this.last_cols.length;
	        var n_cols = cols.length;
	        var i;
	
	        for (i = 0; i < n_cols; i++) {
	            if ($.inArray(cols[i], this.last_cols) === -1) {
	                (start_callback || $.noop).call(this, cols[i]);
	            }
	        }
	
	        for (i = 0; i < last_n_cols; i++) {
	            if ($.inArray(this.last_cols[i], cols) === -1) {
	                (stop_callback || $.noop).call(this, this.last_cols[i]);
	            }
	        }
	
	        this.last_cols = cols;
	
	        return this;
	    };
	
	    /**
	    * Executes the callbacks passed as arguments when a row starts to be
	    * overlapped or stops being overlapped.
	    *
	    * @param {Function} start_callback Function executed when a new row begins
	    *  to be overlapped. The row is passed as first argument.
	    * @param {Function} end_callback Function executed when a row stops being
	    *  overlapped. The row is passed as first argument.
	    * @method on_overlapped_row_change
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.on_overlapped_row_change = function (start_callback, end_callback) {
	        if (!this.colliders_data.length) {
	            return this;
	        }
	        var rows = this.get_targeted_rows(this.colliders_data[0].el.data.row);
	        var last_n_rows = this.last_rows.length;
	        var n_rows = rows.length;
	        var i;
	
	        for (i = 0; i < n_rows; i++) {
	            if ($.inArray(rows[i], this.last_rows) === -1) {
	                (start_callback || $.noop).call(this, rows[i]);
	            }
	        }
	
	        for (i = 0; i < last_n_rows; i++) {
	            if ($.inArray(this.last_rows[i], rows) === -1) {
	                (end_callback || $.noop).call(this, this.last_rows[i]);
	            }
	        }
	
	        this.last_rows = rows;
	    };
	
	    /**
	    * Sets the current position of the player
	    *
	    * @param {Number} col
	    * @param {Number} row
	    * @param {Boolean} no_player
	    * @method set_player
	    * @return {object}
	    */
	    fn.set_player = function (col, row, no_player) {
	        var self = this;
	        if (!no_player) {
	            this.empty_cells_player_occupies();
	        }
	        var cell = !no_player ? self.colliders_data[0].el.data : { col: col };
	        var to_col = cell.col;
	        var to_row = row || cell.row;
	
	        this.player_grid_data = {
	            col: to_col,
	            row: to_row,
	            size_y: this.player_grid_data.size_y,
	            size_x: this.player_grid_data.size_x
	        };
	
	        this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
	
	        var $overlapped_widgets = this.get_widgets_overlapped(this.player_grid_data);
	
	        var constraints = this.widgets_constraints($overlapped_widgets);
	
	        this.manage_movements(constraints.can_go_up, to_col, to_row);
	        this.manage_movements(constraints.can_not_go_up, to_col, to_row);
	
	        /* if there is not widgets overlapping in the new player position,
	         * update the new placeholder position. */
	        if (!$overlapped_widgets.length) {
	            var pp = this.can_go_player_up(this.player_grid_data);
	            if (pp !== false) {
	                to_row = pp;
	            }
	            this.set_placeholder(to_col, to_row);
	        }
	
	        return {
	            col: to_col,
	            row: to_row
	        };
	    };
	
	    /**
	    * See which of the widgets in the $widgets param collection can go to
	    * a upper row and which not.
	    *
	    * @method widgets_contraints
	    * @param {jQuery} $widgets A jQuery wrapped collection of
	    * HTMLElements.
	    * @return {object} Returns a literal Object with two keys: `can_go_up` &
	    * `can_not_go_up`. Each contains a set of HTMLElements.
	    */
	    fn.widgets_constraints = function ($widgets) {
	        var $widgets_can_go_up = $([]);
	        var $widgets_can_not_go_up;
	        var wgd_can_go_up = [];
	        var wgd_can_not_go_up = [];
	
	        $widgets.each($.proxy(function (i, w) {
	            var $w = $(w);
	            var wgd = $w.coords().grid;
	            if (this.can_go_widget_up(wgd)) {
	                $widgets_can_go_up = $widgets_can_go_up.add($w);
	                wgd_can_go_up.push(wgd);
	            } else {
	                wgd_can_not_go_up.push(wgd);
	            }
	        }, this));
	
	        $widgets_can_not_go_up = $widgets.not($widgets_can_go_up);
	
	        return {
	            can_go_up: Gridster.sort_by_row_asc(wgd_can_go_up),
	            can_not_go_up: Gridster.sort_by_row_desc(wgd_can_not_go_up)
	        };
	    };
	
	    /**
	    * Sorts an Array of grid coords objects (representing the grid coords of
	    * each widget) in descending way.
	    *
	    * @method manage_movements
	    * @param {jQuery} $widgets A jQuery collection of HTMLElements
	    *  representing the widgets you want to move.
	    * @param {Number} to_col The column to which we want to move the widgets.
	    * @param {Number} to_row The row to which we want to move the widgets.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.manage_movements = function ($widgets, to_col, to_row) {
	        $.each($widgets, $.proxy(function (i, w) {
	            var wgd = w;
	            var $w = wgd.el;
	
	            var can_go_widget_up = this.can_go_widget_up(wgd);
	
	            if (can_go_widget_up) {
	                //target CAN go up
	                //so move widget up
	                this.move_widget_to($w, can_go_widget_up);
	                this.set_placeholder(to_col, can_go_widget_up + wgd.size_y);
	            } else {
	                //target can't go up
	                var can_go_player_up = this.can_go_player_up(this.player_grid_data);
	
	                if (!can_go_player_up) {
	                    // target can't go up
	                    // player cant't go up
	                    // so we need to move widget down to a position that dont
	                    // overlaps player
	                    var y = to_row + this.player_grid_data.size_y - wgd.row;
	
	                    this.move_widget_down($w, y);
	                    this.set_placeholder(to_col, to_row);
	                }
	            }
	        }, this));
	
	        return this;
	    };
	
	    /**
	    * Determines if there is a widget in the row and col given. Or if the
	    * HTMLElement passed as first argument is the player.
	    *
	    * @method is_player
	    * @param {Number|HTMLElement} col_or_el A jQuery wrapped collection of
	    * HTMLElements.
	    * @param {Number} [row] The column to which we want to move the widgets.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_player = function (col_or_el, row) {
	        if (row && !this.gridmap[col_or_el]) {
	            return false;
	        }
	        var $w = row ? this.gridmap[col_or_el][row] : col_or_el;
	        return $w && ($w.is(this.$player) || $w.is(this.$helper));
	    };
	
	    /**
	    * Determines if the widget that is being dragged is currently over the row
	    * and col given.
	    *
	    * @method is_player_in
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_player_in = function (col, row) {
	        var c = this.cells_occupied_by_player || {};
	        return $.inArray(col, c.cols) >= 0 && $.inArray(row, c.rows) >= 0;
	    };
	
	    /**
	    * Determines if the placeholder is currently over the row and col given.
	    *
	    * @method is_placeholder_in
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_placeholder_in = function (col, row) {
	        var c = this.cells_occupied_by_placeholder || {};
	        return this.is_placeholder_in_col(col) && $.inArray(row, c.rows) >= 0;
	    };
	
	    /**
	    * Determines if the placeholder is currently over the column given.
	    *
	    * @method is_placeholder_in_col
	    * @param {Number} col The column to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_placeholder_in_col = function (col) {
	        var c = this.cells_occupied_by_placeholder || [];
	        return $.inArray(col, c.cols) >= 0;
	    };
	
	    /**
	    * Determines if the cell represented by col and row params is empty.
	    *
	    * @method is_empty
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_empty = function (col, row) {
	        if (typeof this.gridmap[col] !== 'undefined') {
	            if (typeof this.gridmap[col][row] !== 'undefined' && this.gridmap[col][row] === false) {
	                return true;
	            }
	            return false;
	        }
	        return true;
	    };
	
	    /**
	    * Determines if the cell represented by col and row params is occupied.
	    *
	    * @method is_occupied
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_occupied = function (col, row) {
	        if (!this.gridmap[col]) {
	            return false;
	        }
	
	        if (this.gridmap[col][row]) {
	            return true;
	        }
	        return false;
	    };
	
	    /**
	    * Determines if there is a widget in the cell represented by col/row params.
	    *
	    * @method is_widget
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean|HTMLElement} Returns false if there is no widget,
	    * else returns the jQuery HTMLElement
	    */
	    fn.is_widget = function (col, row) {
	        var cell = this.gridmap[col];
	        if (!cell) {
	            return false;
	        }
	
	        cell = cell[row];
	
	        if (cell) {
	            return cell;
	        }
	
	        return false;
	    };
	
	    /**
	    * Determines if there is a widget in the cell represented by col/row
	    * params and if this is under the widget that is being dragged.
	    *
	    * @method is_widget_under_player
	    * @param {Number} col The column to check.
	    * @param {Number} row The row to check.
	    * @return {Boolean} Returns true or false.
	    */
	    fn.is_widget_under_player = function (col, row) {
	        if (this.is_widget(col, row)) {
	            return this.is_player_in(col, row);
	        }
	        return false;
	    };
	
	    /**
	    * Get widgets overlapping with the player or with the object passed
	    * representing the grid cells.
	    *
	    * @method get_widgets_under_player
	    * @return {HTMLElement} Returns a jQuery collection of HTMLElements
	    */
	    fn.get_widgets_under_player = function (cells) {
	        cells || (cells = this.cells_occupied_by_player || { cols: [], rows: [] });
	        var $widgets = $([]);
	
	        $.each(cells.cols, $.proxy(function (i, col) {
	            $.each(cells.rows, $.proxy(function (i, row) {
	                if (this.is_widget(col, row)) {
	                    $widgets = $widgets.add(this.gridmap[col][row]);
	                }
	            }, this));
	        }, this));
	
	        return $widgets;
	    };
	
	    /**
	    * Put placeholder at the row and column specified.
	    *
	    * @method set_placeholder
	    * @param {Number} col The column to which we want to move the
	    *  placeholder.
	    * @param {Number} row The row to which we want to move the
	    *  placeholder.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.set_placeholder = function (col, row) {
	        var phgd = $.extend({}, this.placeholder_grid_data);
	        var $nexts = this.widgets_below({
	            col: phgd.col,
	            row: phgd.row,
	            size_y: phgd.size_y,
	            size_x: phgd.size_x
	        });
	
	        // Prevents widgets go out of the grid
	        var right_col = col + phgd.size_x - 1;
	        if (right_col > this.cols) {
	            col = col - (right_col - col);
	        }
	
	        var moved_down = this.placeholder_grid_data.row < row;
	        var changed_column = this.placeholder_grid_data.col !== col;
	
	        this.placeholder_grid_data.col = col;
	        this.placeholder_grid_data.row = row;
	
	        this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data);
	
	        this.$preview_holder.attr({
	            'data-row': row,
	            'data-col': col
	        });
	
	        if (moved_down || changed_column) {
	            $nexts.each($.proxy(function (i, widget) {
	                this.move_widget_up($(widget), this.placeholder_grid_data.col - col + phgd.size_y);
	            }, this));
	        }
	
	        var $widgets_under_ph = this.get_widgets_under_player(this.cells_occupied_by_placeholder);
	
	        if ($widgets_under_ph.length) {
	            $widgets_under_ph.each($.proxy(function (i, widget) {
	                var $w = $(widget);
	                this.move_widget_down($w, row + phgd.size_y - $w.data('coords').grid.row);
	            }, this));
	        }
	    };
	
	    /**
	    * Determines whether the player can move to a position above.
	    *
	    * @method can_go_player_up
	    * @param {Object} widget_grid_data The actual grid coords object of the
	    *  player.
	    * @return {Number|Boolean} If the player can be moved to an upper row
	    *  returns the row number, else returns false.
	    */
	    fn.can_go_player_up = function (widget_grid_data) {
	        var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
	        var result = true;
	        var upper_rows = [];
	        var min_row = 10000;
	        var $widgets_under_player = this.get_widgets_under_player();
	
	        /* generate an array with columns as index and array with upper rows
	         * empty as value */
	        this.for_each_column_occupied(widget_grid_data, function (tcol) {
	            var grid_col = this.gridmap[tcol];
	            var r = p_bottom_row + 1;
	            upper_rows[tcol] = [];
	
	            while (--r > 0) {
	                if (this.is_empty(tcol, r) || this.is_player(tcol, r) || this.is_widget(tcol, r) && grid_col[r].is($widgets_under_player)) {
	                    upper_rows[tcol].push(r);
	                    min_row = r < min_row ? r : min_row;
	                } else {
	                    break;
	                }
	            }
	
	            if (upper_rows[tcol].length === 0) {
	                result = false;
	                return true; //break
	            }
	
	            upper_rows[tcol].sort(function (a, b) {
	                return a - b;
	            });
	        });
	
	        if (!result) {
	            return false;
	        }
	
	        return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
	    };
	
	    /**
	    * Determines whether a widget can move to a position above.
	    *
	    * @method can_go_widget_up
	    * @param {Object} widget_grid_data The actual grid coords object of the
	    *  widget we want to check.
	    * @return {Number|Boolean} If the widget can be moved to an upper row
	    *  returns the row number, else returns false.
	    */
	    fn.can_go_widget_up = function (widget_grid_data) {
	        var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
	        var result = true;
	        var upper_rows = [];
	        var min_row = 10000;
	
	        /* generate an array with columns as index and array with topmost rows
	         * empty as value */
	        this.for_each_column_occupied(widget_grid_data, function (tcol) {
	            var grid_col = this.gridmap[tcol];
	            upper_rows[tcol] = [];
	
	            var r = p_bottom_row + 1;
	            // iterate over each row
	            while (--r > 0) {
	                if (this.is_widget(tcol, r) && !this.is_player_in(tcol, r)) {
	                    if (!grid_col[r].is(widget_grid_data.el)) {
	                        break;
	                    }
	                }
	
	                if (!this.is_player(tcol, r) && !this.is_placeholder_in(tcol, r) && !this.is_player_in(tcol, r)) {
	                    upper_rows[tcol].push(r);
	                }
	
	                if (r < min_row) {
	                    min_row = r;
	                }
	            }
	
	            if (upper_rows[tcol].length === 0) {
	                result = false;
	                return true; //break
	            }
	
	            upper_rows[tcol].sort(function (a, b) {
	                return a - b;
	            });
	        });
	
	        if (!result) {
	            return false;
	        }
	
	        return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
	    };
	
	    /**
	    * Search a valid row for the widget represented by `widget_grid_data' in
	    * the `upper_rows` array. Iteration starts from row specified in `min_row`.
	    *
	    * @method get_valid_rows
	    * @param {Object} widget_grid_data The actual grid coords object of the
	    *  player.
	    * @param {Array} upper_rows An array with columns as index and arrays
	    *  of valid rows as values.
	    * @param {Number} min_row The upper row from which the iteration will start.
	    * @return {Number|Boolean} Returns the upper row valid from the `upper_rows`
	    *  for the widget in question.
	    */
	    fn.get_valid_rows = function (widget_grid_data, upper_rows, min_row) {
	        var p_top_row = widget_grid_data.row;
	        var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
	        var size_y = widget_grid_data.size_y;
	        var r = min_row - 1;
	        var valid_rows = [];
	
	        while (++r <= p_bottom_row) {
	            var common = true;
	            $.each(upper_rows, function (col, rows) {
	                if ($.isArray(rows) && $.inArray(r, rows) === -1) {
	                    common = false;
	                }
	            });
	
	            if (common === true) {
	                valid_rows.push(r);
	                if (valid_rows.length === size_y) {
	                    break;
	                }
	            }
	        }
	
	        var new_row = false;
	        if (size_y === 1) {
	            if (valid_rows[0] !== p_top_row) {
	                new_row = valid_rows[0] || false;
	            }
	        } else {
	            if (valid_rows[0] !== p_top_row) {
	                new_row = this.get_consecutive_numbers_index(valid_rows, size_y);
	            }
	        }
	
	        return new_row;
	    };
	
	    fn.get_consecutive_numbers_index = function (arr, size_y) {
	        var max = arr.length;
	        var result = [];
	        var first = true;
	        var prev = -1; // or null?
	
	        for (var i = 0; i < max; i++) {
	            if (first || arr[i] === prev + 1) {
	                result.push(i);
	                if (result.length === size_y) {
	                    break;
	                }
	                first = false;
	            } else {
	                result = [];
	                first = true;
	            }
	
	            prev = arr[i];
	        }
	
	        return result.length >= size_y ? arr[result[0]] : false;
	    };
	
	    /**
	    * Get widgets overlapping with the player.
	    *
	    * @method get_widgets_overlapped
	    * @return {jQuery} Returns a jQuery collection of HTMLElements.
	    */
	    fn.get_widgets_overlapped = function () {
	        var $w;
	        var $widgets = $([]);
	        var used = [];
	        var rows_from_bottom = this.cells_occupied_by_player.rows.slice(0);
	        rows_from_bottom.reverse();
	
	        $.each(this.cells_occupied_by_player.cols, $.proxy(function (i, col) {
	            $.each(rows_from_bottom, $.proxy(function (i, row) {
	                // if there is a widget in the player position
	                if (!this.gridmap[col]) {
	                    return true;
	                } //next iteration
	                var $w = this.gridmap[col][row];
	                if (this.is_occupied(col, row) && !this.is_player($w) && $.inArray($w, used) === -1) {
	                    $widgets = $widgets.add($w);
	                    used.push($w);
	                }
	            }, this));
	        }, this));
	
	        return $widgets;
	    };
	
	    /**
	    * This callback is executed when the player begins to collide with a column.
	    *
	    * @method on_start_overlapping_column
	    * @param {Number} col The collided column.
	    * @return {jQuery} Returns a jQuery collection of HTMLElements.
	    */
	    fn.on_start_overlapping_column = function (col) {
	        this.set_player(col, false);
	    };
	
	    /**
	    * A callback executed when the player begins to collide with a row.
	    *
	    * @method on_start_overlapping_row
	    * @param {Number} row The collided row.
	    * @return {jQuery} Returns a jQuery collection of HTMLElements.
	    */
	    fn.on_start_overlapping_row = function (row) {
	        this.set_player(false, row);
	    };
	
	    /**
	    * A callback executed when the the player ends to collide with a column.
	    *
	    * @method on_stop_overlapping_column
	    * @param {Number} col The collided row.
	    * @return {jQuery} Returns a jQuery collection of HTMLElements.
	    */
	    fn.on_stop_overlapping_column = function (col) {
	        this.set_player(col, false);
	
	        var self = this;
	        this.for_each_widget_below(col, this.cells_occupied_by_player.rows[0], function (tcol, trow) {
	            self.move_widget_up(this, self.player_grid_data.size_y);
	        });
	    };
	
	    /**
	    * This callback is executed when the player ends to collide with a row.
	    *
	    * @method on_stop_overlapping_row
	    * @param {Number} row The collided row.
	    * @return {jQuery} Returns a jQuery collection of HTMLElements.
	    */
	    fn.on_stop_overlapping_row = function (row) {
	        this.set_player(false, row);
	
	        var self = this;
	        var cols = this.cells_occupied_by_player.cols;
	        for (var c = 0, cl = cols.length; c < cl; c++) {
	            this.for_each_widget_below(cols[c], row, function (tcol, trow) {
	                self.move_widget_up(this, self.player_grid_data.size_y);
	            });
	        }
	    };
	
	    /**
	    * Move a widget to a specific row. The cell or cells must be empty.
	    * If the widget has widgets below, all of these widgets will be moved also
	    * if they can.
	    *
	    * @method move_widget_to
	    * @param {HTMLElement} $widget The jQuery wrapped HTMLElement of the
	    * widget is going to be moved.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.move_widget_to = function ($widget, row) {
	        var self = this;
	        var widget_grid_data = $widget.coords().grid;
	        var diff = row - widget_grid_data.row;
	        var $next_widgets = this.widgets_below($widget);
	
	        var can_move_to_new_cell = this.can_move_to(widget_grid_data, widget_grid_data.col, row, $widget);
	
	        if (can_move_to_new_cell === false) {
	            return false;
	        }
	
	        this.remove_from_gridmap(widget_grid_data);
	        widget_grid_data.row = row;
	        this.add_to_gridmap(widget_grid_data);
	        $widget.attr('data-row', row);
	        this.$changed = this.$changed.add($widget);
	
	        $next_widgets.each(function (i, widget) {
	            var $w = $(widget);
	            var wgd = $w.coords().grid;
	            var can_go_up = self.can_go_widget_up(wgd);
	            if (can_go_up && can_go_up !== wgd.row) {
	                self.move_widget_to($w, can_go_up);
	            }
	        });
	
	        return this;
	    };
	
	    /**
	    * Move up the specified widget and all below it.
	    *
	    * @method move_widget_up
	    * @param {HTMLElement} $widget The widget you want to move.
	    * @param {Number} [y_units] The number of cells that the widget has to move.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.move_widget_up = function ($widget, y_units) {
	        var el_grid_data = $widget.coords().grid;
	        var actual_row = el_grid_data.row;
	        var moved = [];
	        var can_go_up = true;
	        y_units || (y_units = 1);
	
	        if (!this.can_go_up($widget)) {
	            return false;
	        } //break;
	
	        this.for_each_column_occupied(el_grid_data, function (col) {
	            // can_go_up
	            if ($.inArray($widget, moved) === -1) {
	                var widget_grid_data = $widget.coords().grid;
	                var next_row = actual_row - y_units;
	                next_row = this.can_go_up_to_row(widget_grid_data, col, next_row);
	
	                if (!next_row) {
	                    return true;
	                }
	
	                var $next_widgets = this.widgets_below($widget);
	
	                this.remove_from_gridmap(widget_grid_data);
	                widget_grid_data.row = next_row;
	                this.add_to_gridmap(widget_grid_data);
	                $widget.attr('data-row', widget_grid_data.row);
	                this.$changed = this.$changed.add($widget);
	
	                moved.push($widget);
	
	                $next_widgets.each($.proxy(function (i, widget) {
	                    this.move_widget_up($(widget), y_units);
	                }, this));
	            }
	        });
	    };
	
	    /**
	    * Move down the specified widget and all below it.
	    *
	    * @method move_widget_down
	    * @param {jQuery} $widget The jQuery object representing the widget
	    *  you want to move.
	    * @param {Number} y_units The number of cells that the widget has to move.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.move_widget_down = function ($widget, y_units) {
	        var el_grid_data, actual_row, moved, y_diff;
	
	        if (y_units <= 0) {
	            return false;
	        }
	
	        el_grid_data = $widget.coords().grid;
	        actual_row = el_grid_data.row;
	        moved = [];
	        y_diff = y_units;
	
	        if (!$widget) {
	            return false;
	        }
	
	        if ($.inArray($widget, moved) === -1) {
	
	            var widget_grid_data = $widget.coords().grid;
	            var next_row = actual_row + y_units;
	            var $next_widgets = this.widgets_below($widget);
	
	            this.remove_from_gridmap(widget_grid_data);
	
	            $next_widgets.each($.proxy(function (i, widget) {
	                var $w = $(widget);
	                var wd = $w.coords().grid;
	                var tmp_y = this.displacement_diff(wd, widget_grid_data, y_diff);
	
	                if (tmp_y > 0) {
	                    this.move_widget_down($w, tmp_y);
	                }
	            }, this));
	
	            widget_grid_data.row = next_row;
	            this.update_widget_position(widget_grid_data, $widget);
	            $widget.attr('data-row', widget_grid_data.row);
	            this.$changed = this.$changed.add($widget);
	
	            moved.push($widget);
	        }
	    };
	
	    /**
	    * Check if the widget can move to the specified row, else returns the
	    * upper row possible.
	    *
	    * @method can_go_up_to_row
	    * @param {Number} widget_grid_data The current grid coords object of the
	    *  widget.
	    * @param {Number} col The target column.
	    * @param {Number} row The target row.
	    * @return {Boolean|Number} Returns the row number if the widget can move
	    *  to the target position, else returns false.
	    */
	    fn.can_go_up_to_row = function (widget_grid_data, col, row) {
	        var ga = this.gridmap;
	        var result = true;
	        var urc = []; // upper_rows_in_columns
	        var actual_row = widget_grid_data.row;
	        var r;
	
	        /* generate an array with columns as index and array with
	         * upper rows empty in the column */
	        this.for_each_column_occupied(widget_grid_data, function (tcol) {
	            var grid_col = ga[tcol];
	            urc[tcol] = [];
	
	            r = actual_row;
	            while (r--) {
	                if (this.is_empty(tcol, r) && !this.is_placeholder_in(tcol, r)) {
	                    urc[tcol].push(r);
	                } else {
	                    break;
	                }
	            }
	
	            if (!urc[tcol].length) {
	                result = false;
	                return true;
	            }
	        });
	
	        if (!result) {
	            return false;
	        }
	
	        /* get common rows starting from upper position in all the columns
	         * that widget occupies */
	        r = row;
	        for (r = 1; r < actual_row; r++) {
	            var common = true;
	
	            for (var uc = 0, ucl = urc.length; uc < ucl; uc++) {
	                if (urc[uc] && $.inArray(r, urc[uc]) === -1) {
	                    common = false;
	                }
	            }
	
	            if (common === true) {
	                result = r;
	                break;
	            }
	        }
	
	        return result;
	    };
	
	    fn.displacement_diff = function (widget_grid_data, parent_bgd, y_units) {
	        var actual_row = widget_grid_data.row;
	        var diffs = [];
	        var parent_max_y = parent_bgd.row + parent_bgd.size_y;
	
	        this.for_each_column_occupied(widget_grid_data, function (col) {
	            var temp_y_units = 0;
	
	            for (var r = parent_max_y; r < actual_row; r++) {
	                if (this.is_empty(col, r)) {
	                    temp_y_units = temp_y_units + 1;
	                }
	            }
	
	            diffs.push(temp_y_units);
	        });
	
	        var max_diff = Math.max.apply(Math, diffs);
	        y_units = y_units - max_diff;
	
	        return y_units > 0 ? y_units : 0;
	    };
	
	    /**
	    * Get widgets below a widget.
	    *
	    * @method widgets_below
	    * @param {HTMLElement} $el The jQuery wrapped HTMLElement.
	    * @return {jQuery} A jQuery collection of HTMLElements.
	    */
	    fn.widgets_below = function ($el) {
	        var el_grid_data = $.isPlainObject($el) ? $el : $el.coords().grid;
	        var self = this;
	        var ga = this.gridmap;
	        var next_row = el_grid_data.row + el_grid_data.size_y - 1;
	        var $nexts = $([]);
	
	        this.for_each_column_occupied(el_grid_data, function (col) {
	            self.for_each_widget_below(col, next_row, function (tcol, trow) {
	                if (!self.is_player(this) && $.inArray(this, $nexts) === -1) {
	                    $nexts = $nexts.add(this);
	                    return true; // break
	                }
	            });
	        });
	
	        return Gridster.sort_by_row_asc($nexts);
	    };
	
	    /**
	    * Update the array of mapped positions with the new player position.
	    *
	    * @method set_cells_player_occupies
	    * @param {Number} col The new player col.
	    * @param {Number} col The new player row.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.set_cells_player_occupies = function (col, row) {
	        this.remove_from_gridmap(this.placeholder_grid_data);
	        this.placeholder_grid_data.col = col;
	        this.placeholder_grid_data.row = row;
	        this.add_to_gridmap(this.placeholder_grid_data, this.$player);
	        return this;
	    };
	
	    /**
	    * Remove from the array of mapped positions the reference to the player.
	    *
	    * @method empty_cells_player_occupies
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.empty_cells_player_occupies = function () {
	        this.remove_from_gridmap(this.placeholder_grid_data);
	        return this;
	    };
	
	    fn.can_go_up = function ($el) {
	        var el_grid_data = $el.coords().grid;
	        var initial_row = el_grid_data.row;
	        var prev_row = initial_row - 1;
	        var ga = this.gridmap;
	        var upper_rows_by_column = [];
	
	        var result = true;
	        if (initial_row === 1) {
	            return false;
	        }
	
	        this.for_each_column_occupied(el_grid_data, function (col) {
	            var $w = this.is_widget(col, prev_row);
	
	            if (this.is_occupied(col, prev_row) || this.is_player(col, prev_row) || this.is_placeholder_in(col, prev_row) || this.is_player_in(col, prev_row)) {
	                result = false;
	                return true; //break
	            }
	        });
	
	        return result;
	    };
	
	    /**
	    * Check if it's possible to move a widget to a specific col/row. It takes
	    * into account the dimensions (`size_y` and `size_x` attrs. of the grid
	    *  coords object) the widget occupies.
	    *
	    * @method can_move_to
	    * @param {Object} widget_grid_data The grid coords object that represents
	    *  the widget.
	    * @param {Object} col The col to check.
	    * @param {Object} row The row to check.
	    * @param {Number} [max_row] The max row allowed.
	    * @return {Boolean} Returns true if all cells are empty, else return false.
	    */
	    fn.can_move_to = function (widget_grid_data, col, row, max_row) {
	        var ga = this.gridmap;
	        var $w = widget_grid_data.el;
	        var future_wd = {
	            size_y: widget_grid_data.size_y,
	            size_x: widget_grid_data.size_x,
	            col: col,
	            row: row
	        };
	        var result = true;
	
	        //Prevents widgets go out of the grid
	        var right_col = col + widget_grid_data.size_x - 1;
	        if (right_col > this.cols) {
	            return false;
	        }
	
	        if (max_row && max_row < row + widget_grid_data.size_y - 1) {
	            return false;
	        }
	
	        this.for_each_cell_occupied(future_wd, function (tcol, trow) {
	            var $tw = this.is_widget(tcol, trow);
	            if ($tw && (!widget_grid_data.el || $tw.is($w))) {
	                result = false;
	            }
	        });
	
	        return result;
	    };
	
	    /**
	    * Given the leftmost column returns all columns that are overlapping
	    *  with the player.
	    *
	    * @method get_targeted_columns
	    * @param {Number} [from_col] The leftmost column.
	    * @return {Array} Returns an array with column numbers.
	    */
	    fn.get_targeted_columns = function (from_col) {
	        var max = (from_col || this.player_grid_data.col) + (this.player_grid_data.size_x - 1);
	        var cols = [];
	        for (var col = from_col; col <= max; col++) {
	            cols.push(col);
	        }
	        return cols;
	    };
	
	    /**
	    * Given the upper row returns all rows that are overlapping with the player.
	    *
	    * @method get_targeted_rows
	    * @param {Number} [from_row] The upper row.
	    * @return {Array} Returns an array with row numbers.
	    */
	    fn.get_targeted_rows = function (from_row) {
	        var max = (from_row || this.player_grid_data.row) + (this.player_grid_data.size_y - 1);
	        var rows = [];
	        for (var row = from_row; row <= max; row++) {
	            rows.push(row);
	        }
	        return rows;
	    };
	
	    /**
	    * Get all columns and rows that a widget occupies.
	    *
	    * @method get_cells_occupied
	    * @param {Object} el_grid_data The grid coords object of the widget.
	    * @return {Object} Returns an object like `{ cols: [], rows: []}`.
	    */
	    fn.get_cells_occupied = function (el_grid_data) {
	        var cells = { cols: [], rows: [] };
	        var i;
	        if (arguments[1] instanceof $) {
	            el_grid_data = arguments[1].coords().grid;
	        }
	
	        for (i = 0; i < el_grid_data.size_x; i++) {
	            var col = el_grid_data.col + i;
	            cells.cols.push(col);
	        }
	
	        for (i = 0; i < el_grid_data.size_y; i++) {
	            var row = el_grid_data.row + i;
	            cells.rows.push(row);
	        }
	
	        return cells;
	    };
	
	    /**
	    * Iterate over the cells occupied by a widget executing a function for
	    * each one.
	    *
	    * @method for_each_cell_occupied
	    * @param {Object} el_grid_data The grid coords object that represents the
	    *  widget.
	    * @param {Function} callback The function to execute on each column
	    *  iteration. Column and row are passed as arguments.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.for_each_cell_occupied = function (grid_data, callback) {
	        this.for_each_column_occupied(grid_data, function (col) {
	            this.for_each_row_occupied(grid_data, function (row) {
	                callback.call(this, col, row);
	            });
	        });
	        return this;
	    };
	
	    /**
	    * Iterate over the columns occupied by a widget executing a function for
	    * each one.
	    *
	    * @method for_each_column_occupied
	    * @param {Object} el_grid_data The grid coords object that represents
	    *  the widget.
	    * @param {Function} callback The function to execute on each column
	    *  iteration. The column number is passed as first argument.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.for_each_column_occupied = function (el_grid_data, callback) {
	        for (var i = 0; i < el_grid_data.size_x; i++) {
	            var col = el_grid_data.col + i;
	            callback.call(this, col, el_grid_data);
	        }
	    };
	
	    /**
	    * Iterate over the rows occupied by a widget executing a function for
	    * each one.
	    *
	    * @method for_each_row_occupied
	    * @param {Object} el_grid_data The grid coords object that represents
	    *  the widget.
	    * @param {Function} callback The function to execute on each column
	    *  iteration. The row number is passed as first argument.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.for_each_row_occupied = function (el_grid_data, callback) {
	        for (var i = 0; i < el_grid_data.size_y; i++) {
	            var row = el_grid_data.row + i;
	            callback.call(this, row, el_grid_data);
	        }
	    };
	
	    fn._traversing_widgets = function (type, direction, col, row, callback) {
	        var ga = this.gridmap;
	        if (!ga[col]) {
	            return;
	        }
	
	        var cr, max;
	        var action = type + '/' + direction;
	        if (arguments[2] instanceof $) {
	            var el_grid_data = arguments[2].coords().grid;
	            col = el_grid_data.col;
	            row = el_grid_data.row;
	            callback = arguments[3];
	        }
	        var matched = [];
	        var trow = row;
	
	        var methods = {
	            'for_each/above': function for_eachAbove() {
	                while (trow--) {
	                    if (trow > 0 && this.is_widget(col, trow) && $.inArray(ga[col][trow], matched) === -1) {
	                        cr = callback.call(ga[col][trow], col, trow);
	                        matched.push(ga[col][trow]);
	                        if (cr) {
	                            break;
	                        }
	                    }
	                }
	            },
	            'for_each/below': function for_eachBelow() {
	                for (trow = row + 1, max = ga[col].length; trow < max; trow++) {
	                    if (this.is_widget(col, trow) && $.inArray(ga[col][trow], matched) === -1) {
	                        cr = callback.call(ga[col][trow], col, trow);
	                        matched.push(ga[col][trow]);
	                        if (cr) {
	                            break;
	                        }
	                    }
	                }
	            }
	        };
	
	        if (methods[action]) {
	            methods[action].call(this);
	        }
	    };
	
	    /**
	    * Iterate over each widget above the column and row specified.
	    *
	    * @method for_each_widget_above
	    * @param {Number} col The column to start iterating.
	    * @param {Number} row The row to start iterating.
	    * @param {Function} callback The function to execute on each widget
	    *  iteration. The value of `this` inside the function is the jQuery
	    *  wrapped HTMLElement.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.for_each_widget_above = function (col, row, callback) {
	        this._traversing_widgets('for_each', 'above', col, row, callback);
	        return this;
	    };
	
	    /**
	    * Iterate over each widget below the column and row specified.
	    *
	    * @method for_each_widget_below
	    * @param {Number} col The column to start iterating.
	    * @param {Number} row The row to start iterating.
	    * @param {Function} callback The function to execute on each widget
	    *  iteration. The value of `this` inside the function is the jQuery wrapped
	    *  HTMLElement.
	    * @return {Class} Returns the instance of the Gridster Class.
	    */
	    fn.for_each_widget_below = function (col, row, callback) {
	        this._traversing_widgets('for_each', 'below', col, row, callback);
	        return this;
	    };
	
	    /**
	    * Returns the highest occupied cell in the grid.
	    *
	    * @method get_highest_occupied_cell
	    * @return {Object} Returns an object with `col` and `row` numbers.
	    */
	    fn.get_highest_occupied_cell = function () {
	        var r;
	        var gm = this.gridmap;
	        var rl = gm[1].length;
	        var rows = [],
	            cols = [];
	        var row_in_col = [];
	        for (var c = gm.length - 1; c >= 1; c--) {
	            for (r = rl - 1; r >= 1; r--) {
	                if (this.is_widget(c, r)) {
	                    rows.push(r);
	                    cols.push(c);
	                    break;
	                }
	            }
	        }
	
	        return {
	            col: Math.max.apply(Math, cols),
	            row: Math.max.apply(Math, rows)
	        };
	    };
	
	    fn.get_widgets_from = function (col, row) {
	        var ga = this.gridmap;
	        var $widgets = $();
	
	        if (col) {
	            $widgets = $widgets.add(this.$widgets.filter(function () {
	                var tcol = $(this).attr('data-col');
	                return tcol === col || tcol > col;
	            }));
	        }
	
	        if (row) {
	            $widgets = $widgets.add(this.$widgets.filter(function () {
	                var trow = $(this).attr('data-row');
	                return trow === row || trow > row;
	            }));
	        }
	
	        return $widgets;
	    };
	
	    /**
	    * Set the current height of the parent grid.
	    *
	    * @method set_dom_grid_height
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.set_dom_grid_height = function (height) {
	        if (typeof height === 'undefined') {
	            var r = this.get_highest_occupied_cell().row;
	            height = r * this.min_widget_height;
	        }
	
	        this.container_height = height;
	        this.$el.css('height', this.container_height + 150);
	        return this;
	    };
	
	    /**
	    * Set the current width of the parent grid.
	    *
	    * @method set_dom_grid_width
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.set_dom_grid_width = function (cols) {
	        if (typeof cols === 'undefined') {
	            cols = this.get_highest_occupied_cell().col;
	        }
	
	        var max_cols = this.options.autogrow_cols ? this.options.max_cols : this.cols;
	
	        cols = Math.min(max_cols, Math.max(cols, this.options.min_cols));
	        this.container_width = cols * this.min_widget_width;
	        this.$el.css('width', this.container_width);
	        return this;
	    };
	
	    /**
	    * It generates the neccessary styles to position the widgets.
	    *
	    * @method generate_stylesheet
	    * @param {Number} rows Number of columns.
	    * @param {Number} cols Number of rows.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.generate_stylesheet = function (opts) {
	        var styles = '';
	        var max_size_x = this.options.max_size_x || this.cols;
	        var max_rows = 0;
	        var max_cols = 0;
	        var i;
	        var rules;
	
	        opts || (opts = {});
	        opts.cols || (opts.cols = this.cols);
	        opts.rows || (opts.rows = this.rows);
	        opts.namespace || (opts.namespace = this.options.namespace);
	        opts.widget_base_dimensions || (opts.widget_base_dimensions = this.options.widget_base_dimensions);
	        opts.widget_margins || (opts.widget_margins = this.options.widget_margins);
	        opts.min_widget_width = opts.widget_margins[0] * 2 + opts.widget_base_dimensions[0];
	        opts.min_widget_height = opts.widget_margins[1] * 2 + opts.widget_base_dimensions[1];
	
	        // don't duplicate stylesheets for the same configuration
	        var serialized_opts = $.param(opts);
	        if ($.inArray(serialized_opts, Gridster.generated_stylesheets) >= 0) {
	            return false;
	        }
	
	        this.generated_stylesheets.push(serialized_opts);
	        Gridster.generated_stylesheets.push(serialized_opts);
	
	        /* generate CSS styles for cols */
	        for (i = opts.cols; i >= 0; i--) {
	            styles += opts.namespace + ' [data-col="' + (i + 1) + '"] { left:' + (i * opts.widget_base_dimensions[0] + i * opts.widget_margins[0] + (i + 1) * opts.widget_margins[0]) + 'px; }\n';
	        }
	
	        /* generate CSS styles for rows */
	        for (i = opts.rows; i >= 0; i--) {
	            styles += opts.namespace + ' [data-row="' + (i + 1) + '"] { top:' + (i * opts.widget_base_dimensions[1] + i * opts.widget_margins[1] + (i + 1) * opts.widget_margins[1]) + 'px; }\n';
	        }
	
	        for (var y = 1; y <= opts.rows; y++) {
	            styles += opts.namespace + ' [data-sizey="' + y + '"] { height:' + (y * opts.widget_base_dimensions[1] + (y - 1) * (opts.widget_margins[1] * 2)) + 'px; }\n';
	        }
	
	        for (var x = 1; x <= max_size_x; x++) {
	            styles += opts.namespace + ' [data-sizex="' + x + '"] { width:' + (x * opts.widget_base_dimensions[0] + (x - 1) * (opts.widget_margins[0] * 2)) + 'px; }\n';
	        }
	
	        this.remove_style_tags();
	
	        return this.add_style_tag(styles);
	    };
	
	    /**
	    * Injects the given CSS as string to the head of the document.
	    *
	    * @method add_style_tag
	    * @param {String} css The styles to apply.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.add_style_tag = function (css) {
	        var d = document;
	        var tag = d.createElement('style');
	
	        d.getElementsByTagName('head')[0].appendChild(tag);
	        tag.setAttribute('type', 'text/css');
	
	        if (this.options.namespace) {
	            //debugger;//if invoked, the style- maybe del
	            tag.setAttribute("id", "style-" + this.options.namespace.substring(1));
	        }
	
	        if (tag.styleSheet) {
	            tag.styleSheet.cssText = css;
	        } else {
	            tag.appendChild(document.createTextNode(css));
	        }
	
	        this.$style_tags = this.$style_tags.add(tag);
	
	        return this;
	    };
	
	    /**
	    * Remove the style tag with the associated id from the head of the document
	    *
	    * @method  remove_style_tag
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.remove_style_tags = function () {
	        var all_styles = Gridster.generated_stylesheets;
	        var ins_styles = this.generated_stylesheets;
	
	        this.$style_tags.remove();
	
	        Gridster.generated_stylesheets = $.map(all_styles, function (s) {
	            if ($.inArray(s, ins_styles) === -1) {
	                return s;
	            }
	        });
	    };
	
	    /**
	    * Generates a faux grid to collide with it when a widget is dragged and
	    * detect row or column that we want to go.
	    *
	    * @method generate_faux_grid
	    * @param {Number} rows Number of columns.
	    * @param {Number} cols Number of rows.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.generate_faux_grid = function (rows, cols) {
	        this.faux_grid = [];
	        this.gridmap = [];
	        var col;
	        var row;
	        for (col = cols; col > 0; col--) {
	            this.gridmap[col] = [];
	            for (row = rows; row > 0; row--) {
	                this.add_faux_cell(row, col);
	            }
	        }
	        return this;
	    };
	
	    /**
	    * Add cell to the faux grid.
	    *
	    * @method add_faux_cell
	    * @param {Number} row The row for the new faux cell.
	    * @param {Number} col The col for the new faux cell.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.add_faux_cell = function (row, col) {
	        var coords = $({
	            left: this.baseX + (col - 1) * this.min_widget_width,
	            top: this.baseY + (row - 1) * this.min_widget_height,
	            width: this.min_widget_width,
	            height: this.min_widget_height,
	            col: col,
	            row: row,
	            original_col: col,
	            original_row: row
	        }).coords();
	
	        if (!$.isArray(this.gridmap[col])) {
	            this.gridmap[col] = [];
	        }
	
	        this.gridmap[col][row] = false;
	        this.faux_grid.push(coords);
	
	        return this;
	    };
	
	    /**
	    * Add rows to the faux grid.
	    *
	    * @method add_faux_rows
	    * @param {Number} rows The number of rows you want to add to the faux grid.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.add_faux_rows = function (rows) {
	        var actual_rows = this.rows;
	        var max_rows = actual_rows + (rows || 1);
	
	        for (var r = max_rows; r > actual_rows; r--) {
	            for (var c = this.cols; c >= 1; c--) {
	                this.add_faux_cell(r, c);
	            }
	        }
	
	        this.rows = max_rows;
	
	        if (this.options.autogenerate_stylesheet) {
	            this.generate_stylesheet();
	        }
	
	        return this;
	    };
	
	    /**
	    * Add cols to the faux grid.
	    *
	    * @method add_faux_cols
	    * @param {Number} cols The number of cols you want to add to the faux grid.
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.add_faux_cols = function (cols) {
	        var actual_cols = this.cols;
	        var max_cols = actual_cols + (cols || 1);
	        max_cols = Math.min(max_cols, this.options.max_cols);
	
	        for (var c = actual_cols + 1; c <= max_cols; c++) {
	            for (var r = this.rows; r >= 1; r--) {
	                this.add_faux_cell(r, c);
	            }
	        }
	
	        this.cols = max_cols;
	
	        if (this.options.autogenerate_stylesheet) {
	            this.generate_stylesheet();
	        }
	
	        return this;
	    };
	
	    /**
	    * Recalculates the offsets for the faux grid. You need to use it when
	    * the browser is resized.
	    *
	    * @method recalculate_faux_grid
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.recalculate_faux_grid = function () {
	        var aw = this.$wrapper.width();
	        this.baseX = ($(window).width() - aw) / 2;
	        this.baseY = this.$wrapper.offset().top;
	
	        $.each(this.faux_grid, $.proxy(function (i, coords) {
	            this.faux_grid[i] = coords.update({
	                left: this.baseX + (coords.data.col - 1) * this.min_widget_width,
	                top: this.baseY + (coords.data.row - 1) * this.min_widget_height
	            });
	        }, this));
	
	        return this;
	    };
	
	    /**
	    * Get all widgets in the DOM and register them.
	    *
	    * @method get_widgets_from_DOM
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.get_widgets_from_DOM = function () {
	        var widgets_coords = this.$widgets.map($.proxy(function (i, widget) {
	            var $w = $(widget);
	            return this.dom_to_coords($w);
	        }, this));
	
	        widgets_coords = Gridster.sort_by_row_and_col_asc(widgets_coords);
	
	        var changes = $(widgets_coords).map($.proxy(function (i, wgd) {
	            return this.register_widget(wgd) || null;
	        }, this));
	
	        if (changes.length) {
	            this.$el.trigger('gridster:positionschanged');
	        }
	
	        return this;
	    };
	
	    /**
	    * Calculate columns and rows to be set based on the configuration
	    *  parameters, grid dimensions, etc ...
	    *
	    * @method generate_grid_and_stylesheet
	    * @return {Object} Returns the instance of the Gridster class.
	    */
	    fn.generate_grid_and_stylesheet = function () {
	        var aw = this.$wrapper.width();
	        var max_cols = this.options.max_cols;
	
	        var cols = Math.floor(aw / this.min_widget_width) + this.options.extra_cols;
	
	        var actual_cols = this.$widgets.map(function () {
	            return $(this).attr('data-col');
	        }).get();
	
	        //needed to pass tests with phantomjs
	        actual_cols.length || (actual_cols = [0]);
	
	        var min_cols = Math.max.apply(Math, actual_cols);
	
	        this.cols = Math.max(min_cols, cols, this.options.min_cols);
	
	        if (max_cols !== Infinity && max_cols >= min_cols && max_cols < this.cols) {
	            this.cols = max_cols;
	        }
	
	        // get all rows that could be occupied by the current widgets
	        var max_rows = this.options.extra_rows;
	        this.$widgets.each(function (i, w) {
	            max_rows += +$(w).attr('data-sizey');
	        });
	
	        this.rows = Math.max(max_rows, this.options.min_rows);
	
	        this.baseX = ($(window).width() - aw) / 2;
	        this.baseY = this.$wrapper.offset().top;
	
	        if (this.options.autogenerate_stylesheet) {
	            this.generate_stylesheet();
	        }
	
	        return this.generate_faux_grid(this.rows, this.cols);
	    };
	
	    /**
	     * Destroy this gridster by removing any sign of its presence, making it easy to avoid memory leaks
	     *
	     * @method destroy
	     * @param {Boolean} remove If true, remove gridster from DOM.
	     * @return {Object} Returns the instance of the Gridster class.
	     */
	    fn.destroy = function (remove) {
	        this.$el.removeData('gridster');
	
	        // remove bound callback on window resize
	        $(window).unbind('.gridster');
	
	        if (this.drag_api) {
	            this.drag_api.destroy();
	        }
	
	        this.remove_style_tags();
	
	        remove && this.$el.remove();
	
	        return this;
	    };
	
	    //jQuery adapter
	    $.fn.gridster = function (options) {
	        return this.each(function () {
	            if (!$(this).data('gridster')) {
	                $(this).data('gridster', new Gridster(this, options));
	            }
	        });
	    };
	
	    return Gridster;
	});

/***/ },

/***/ 14:
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 453:
/*!*********************************************!*\
  !*** ./templates ^\.\/.*\/css\/style\.css$ ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./default/css/style.css": 454
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 453;


/***/ },

/***/ 454:
/*!*****************************************!*\
  !*** ./templates/default/css/style.css ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./style.css */ 455);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 455:
/*!********************************************************!*\
  !*** ./~/css-loader!./templates/default/css/style.css ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n\tpadding: 0;\n\tmargin: 0;\n\t-webkit-tap-highlight-color: transparent;\n\tbox-sizing: border-box;\n}\nul, li {\n\tlist-style: none;\n}\n\n/* ==========================================================================\n    Header\n   ========================================================================== */\n.site-header {\n  width: 100%;\n  background:#fff;\n  font-size: 16px;\n  overflow: hidden;\n  min-height:100px;\n  position:relative;\n}\n\n.A-head {color:#333; background:url(" + __webpack_require__(/*! ../images/insets_04.png */ 456) + ") right top no-repeat; padding:15px 0 0px 0px; font-size:20px;}\n.A-head span {display:inline-block;}\n.A-head .A-head-bold {font-size:28px; font-weight:bold; margin-right:10px; padding-left:50px; background:url(" + __webpack_require__(/*! ../images/insets_02.png */ 457) + ") left 3px no-repeat; height:30px; line-height:30px;}\n.site-header .A-head-line {background:url(" + __webpack_require__(/*! ../images/insets_01.png */ 458) + ") left top no-repeat; width:62px; height:3px; display:inline-block; vertical-align:3px;}\n.site-header .A-head-bor {display:inline-block;height:3px;border: 0;border-top:3px solid #236096;width:70%;}\n.B-head {\n\tbackground:url(" + __webpack_require__(/*! ../images/insets_05.jpg */ 459) + ") left top no-repeat;\n\tpadding-left:51px;\n\tmargin-top:5px;\n\tmargin-left:15px;\n}\n.B-head span {\n\tdisplay:inline-block;\n\tposition:relative;\n\tpadding: 0 16px 0 6px;\n\tbackground: #1E63A4;/* ie */\n\tbackground-image: -moz-linear-gradient(left, #6192c0, #3574ae);/* Firefox */\n\tbackground-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #6192c0), color-stop(1, #3574ae)); /* Saf4+, Chrome */\n\tvertical-align: top;\n\theight: 25px;\n\tline-height: 25px;\n\tfont-size: 20px;\n\tcolor: #feffff;\n}\n.B-head em {display:inline-block; background:url(" + __webpack_require__(/*! ../images/insets_06.png */ 460) + ") left top no-repeat; position:absolute; right:0px; bottom:0px; width:10px; height:10px;}\n\n\n\nh1 {\n\tmargin: 10px 0;\n}\n/*.main {margin:20px 0px;}\n.question_title {\n  *zoom: 1;\n  font-size: 18px;\n   clear:both;\n   margin:20px 10px 0px 32px;\n   color:#333;\n}\n.question_title:before,\n.question_title:after {\n  display: table;\n  content: \"\";\n  line-height: 0;\n}\n.question_title:after {\n  clear: both;\n}\n.question_title .number {\n  float: left;\n  display: inline;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  margin-right: 8px;\n  background-color: #78A2C9;\n  text-align: center;\n  display: block;\n  color: #FFF;\n}\n.question_title div {\n  float: left;\n  display: inline;\n  line-height: 25px;\n  margin-top: 3px;\n  width:90%;\n}\n*/\n.site-footer {\n\twidth:100%;\n\tbackground:#6092C0;\n\tcolor: #ffffff;\n\theight:60px;\n\tline-height:60px;\n\ttext-align:center;\n\tword-spacing:2px;\n    z-index:10;\n}\n\n\n@media screen and (width:1024px){\n\t.A-head {font-size:16px;}\n\t.A-head .A-head-bold {font-size:20px;}\n\t.B-head span {font-size:16px;}\n\t.site-footer {font-size:14px;}\n}\n\n@media screen and (width:1280px) {\n\t.A-head {font-size:18px;}\n\t.A-head .A-head-bold {font-size:24px;}\n\t.B-head span {font-size:18px;}\n\t.site-footer {font-size:16px;}\n}\n\n@media screen and (width:1920px) {\n\t.A-head {color:#333; font-size:20px; background:url(" + __webpack_require__(/*! ../images/insets_04.png */ 456) + ") right top no-repeat; padding:15px 0 0px 0px;}\n\t.A-head span {display:inline-block;}\n\t.A-head .A-head-bold {font-size:28px; font-weight:bold; margin-right:10px; padding-left:50px; background:url(" + __webpack_require__(/*! ../images/insets_02.png */ 457) + ") left 3px no-repeat; height:30px; line-height:30px;}\n\t.site-header .A-head-line {background:url(" + __webpack_require__(/*! ../images/insets_01.png */ 458) + ") left top no-repeat; width:62px; height:3px; display:inline-block; vertical-align:3px;}\n\t.site-header .A-head-bor {display:inline-block;height:3px;border: 0;border-top:3px solid #236096;width:70%;}\n\t.B-head {\n\t\tbackground:url(" + __webpack_require__(/*! ../images/insets_05.jpg */ 459) + ") left top no-repeat;\n\t\tpadding-left:51px;\n\t\tmargin-top:5px;\n\t\tmargin-left:15px;\n\t}\n\t.B-head span {\n\t\tdisplay:inline-block;\n\t\tposition:relative;\n\t\tpadding: 0 16px 0 6px;\n\t\tbackground: #1E63A4;/* ie */\n\t\tbackground-image: -moz-linear-gradient(left, #6192c0, #3574ae);/* Firefox */\n\t\tbackground-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #6192c0), color-stop(1, #3574ae)); /* Saf4+, Chrome */\n\t\tvertical-align: top;\n\t\theight: 25px;\n\t\tline-height: 25px;\n\t\tfont-size: 20px;\n\t\tcolor: #feffff;\n\t}\n\t.B-head em {display:inline-block; background:url(" + __webpack_require__(/*! ../images/insets_06.png */ 460) + ") left top no-repeat; position:absolute; right:0px; bottom:0px; width:10px; height:10px;}\n\t.site-footer {font-size:18px;}\n}\n\n\n\n\n\n.questions_list {\n\tfont-size: 17px;\n}\n.questions_list .list {\n\t*zoom: 1;\n}\n.questions_list .list:before,\n.questions_list .list:after {\n\tdisplay: table;\n\tcontent: \"\";\n\tline-height: 0;\n}\n.questions_list .list:after {\n\tclear: both;\n}\n.questions_list .list .bold {\n\tfont-size: 18px;\n\tline-height: 21px;\n}\n.questions_list .list .left_side {\n\tfloat: left;\n\tdisplay: inline;\n\tmargin-right: 12px;\n}\n.questions_list .list .right_side {\n\tfloat: left;\n\tdisplay: inline;\n\tdisplay: inline-block;\n}\n.questions_list .list .right_side .listen {\n\twidth: 28px;\n\theight: 28px;\n\tdisplay: inline-block;\n\tbackground: url(" + __webpack_require__(/*! ../images/icon.png */ 461) + ") -49px 0 no-repeat;\n\tmargin-right: 12px;\n}\n.questions_list .list .right_side .choose {\n\twidth: 24px;\n\theight: 24px;\n\tbackground: url(" + __webpack_require__(/*! ../images/icon.png */ 461) + ") 0 0 no-repeat;\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\tmargin: 0 10px;\n}\n.questions_list .list .right_side .active{\n    background-position-y: -26px;\n}\n.questions_list .list .right_side .choose input {\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: none;\n}\n.questions_list .list .right_side .choose_b {\n\tbackground-position: -52px -31px;\n}\n.questions_list .list .right_side li {\n\tborder: none;\n\tmargin-bottom: 15px;\n\tposition: relative;\n}\n.questions_list .list .right_side span {\n\tvertical-align: middle;\n}\n.questions_list .list .right_side .mar {\n\tdisplay: inline-block;\n\twidth: 10px;\n}\n.questions_list .list .right_side .icon_r,\n.questions_list .list .right_side .icon_e {\n\n\tposition: absolute;\n    left: -19px;\n\n    background-image: url(" + __webpack_require__(/*! ../images/icon.png */ 461) + ");\n}\n.questions_list .list .right_side .icon_r {\n    width: 25px;\n    height: 20px;\n    background-position: -21px -59px;\n}\n.questions_list .list .right_side .icon_e {\n    width: 20px;\n    height: 20px;\n    background-position: 0px -63px;\n}\n\n.rtf img{\n    max-width:584px;\n}", ""]);
	
	// exports


/***/ },

/***/ 456:
/*!************************************************!*\
  !*** ./templates/default/images/insets_04.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgIAAAAqCAYAAADBJTO+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ5OUIxQzMyRTVFMTFFNDk5RTFBQjc2RERFODk2ODkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ5OUIxQzQyRTVFMTFFNDk5RTFBQjc2RERFODk2ODkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNDk5QjFDMTJFNUUxMUU0OTlFMUFCNzZEREU4OTY4OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNDk5QjFDMjJFNUUxMUU0OTlFMUFCNzZEREU4OTY4OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrXfc+0AABxKSURBVHja7F3bkuPG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"

/***/ },

/***/ 457:
/*!************************************************!*\
  !*** ./templates/default/images/insets_02.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEQ3NzRENTcyRTVEMTFFNEFFREFEOTBDRThGM0U3NUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ3NzRENTgyRTVEMTFFNEFFREFEOTBDRThGM0U3NUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRDc3NEQ1NTJFNUQxMUU0QUVEQUQ5MENFOEYzRTc1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRDc3NEQ1NjJFNUQxMUU0QUVEQUQ5MENFOEYzRTc1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhN6EToAAACNSURBVHjaYpFLWfqfgQ6AkYmZ4dfr+3uYGOgE/v/7y8AqouBENwuhtjKxMLFy0tVOli+3Dy9iGAVDGbCIeVWvoauFnPJGwXS18P/vH/QNUlCRQ1cL/3778JieFjIysXNzj+YdqsahoGVcBV3jUCFr/X+6+vDfr290DVL6VsCMzHS0EFjA/Pn88gJAgAEA5AIhn7LEVYoAAAAASUVORK5CYII="

/***/ },

/***/ 458:
/*!************************************************!*\
  !*** ./templates/default/images/insets_01.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAADCAIAAABERytgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACaSURBVHjatI+xDQJBDAR3fMdH9EFKAVAKdVAArdAJKSkZLSAkhJAe/d8S8UKvAxHAZrZ37DW29dRmu6OZNvS2bUthG5BDkpSILrK7rkzU9O11vVoM7P5wbEvcC0TKKUopLqoKRw73/W05nw3N8+nSkap+U9+T9TsBwGtZtwkYT0fsCPhvdAAxhADe3URI/vz2N9EfAAAA//8DAMIAMAPkEDD4AAAAAElFTkSuQmCC"

/***/ },

/***/ 459:
/*!************************************************!*\
  !*** ./templates/default/images/insets_05.jpg ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwMDAwQDAwQFBAMEBQcFBAQFBwgGBgcGBggKCAgICAgICggKCgsKCggNDQ4ODQ0SEhISEhQUFBQUFBQUFBT/2wBDAQUFBQgHCA8KCg8SDwwPEhYVFRUVFhYUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAZADIDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAUHCAP/xAAoEAAAAwYGAgMBAAAAAAAAAAAAAQMEBQY1dLECMzQ2coExszJxc7L/xAAZAQADAQEBAAAAAAAAAAAAAAACBAUDAQD/xAAcEQACAgMBAQAAAAAAAAAAAAAAAQMyAgQxM3H/2gAMAwEAAhEDEQA/ANuDYyO7DqsPdhzMInK2epzO4eVSexjDs6Y+Z2MDLQKK5I33OHjWL+wxTjovghJdh0F7uc1cmMtryZpr3Rpg/IhLhXfRGNjh3YdVh7sBy4eXScq5qvM7h1VEmMYenbF+h/wYzloFFdEkfU5eVYt7DFWKiEJLsOgvdrmrUhlteTD17o0yIJYfRCNzh3YdVh7sBy4eXScq5qvM7h1CTGMOzpj5nYxnLQKK5I33OHjWL+wxViohCS7D4L3a5q1IBs+WQevdGlz8iAis+iMHiFkEMOpwd2HMwicLZ6nM7h5CDGEOTpk5nYwE1Q4ukifc4eVY0ewxQhohGS7D4L3a5atMe2fJhQ3RpLF8j+xEw4h3PrP/2Q=="

/***/ },

/***/ 460:
/*!************************************************!*\
  !*** ./templates/default/images/insets_06.png ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////+0y+GzoElLAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOC8xNHN1aSkAAAApSURBVAiZDcMxDQAACAPBDxsuWPDTBV8s+KWXHFDAQgjS20/EiPT2Gz1ZiQYP//EMhAAAAABJRU5ErkJggg=="

/***/ },

/***/ 461:
/*!*******************************************!*\
  !*** ./templates/default/images/icon.png ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },

/***/ 463:
/*!*************************!*\
  !*** ./modules/view.js ***!
  \*************************/
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Created by ���� on 2016/3/17.
	 */
	
	$(function () {
	    var menuWidth = 120;
	    var w = $(window).width() - menuWidth;
	    var h = $(window).height();
	    $('ul').parent().height(data.height);
	    $(".content").css("width", w).css("padding", 20).addClass("gridster");
	    $(".content").css("min-height", data.height).css('min-width', data.minWidth);
	    $(".content").append("<ul/>");
	    function getOption($ele) {
	        var height = 568;
	        var options = {
	            widget_margins: [1, 1],
	            widget_base_dimensions: [$ele.width() / 12 - 2, height / 10 - 2],
	            min_cols: 12,
	            min_rows: 10,
	            resize: {
	                enabled: true
	            }
	        };
	        return options;
	    }
	
	    var options = getOption($(".content"));
	    var gridster = $(".content>ul").gridster(options).data('gridster');
	    function renderData(gridster, widgets) {
	        for (var i = 0; i < widgets.length; i++) {
	            var widget = widgets[i];
	            gridster.add_widget("<li data-id='" + widget.id + "' data-type='" + widget.type + "'>" + "<a name='" + widget.id + "'></a>" + widget.html + "</li>", widget.size_x, widget.size_y, widget.col, widget.row);
	        }
	        gridster.disable().disable_resize();
	        $('[contenteditable]').attr('contenteditable', false);
	        $('.gridster .gs-w').css("border", "none");
	    }
	
	    renderData(gridster, data.data.singleScreenWidgets);
	    function isDoubleMode() {
	        var doubleSize = [1024, 1280, 1920];
	        var doubleWidth = doubleSize.map(function (currentValue) {
	            return currentValue * 2 - menuWidth;
	        });
	        //doubleWidth: [1928, 2440, 3720]
	        return $.inArray($(window).width(), doubleWidth) != -1;
	    }
	
	    function layoutPage() {
	        var isDouble = isDoubleMode();
	        if (isDouble) {
	            if ($(".content ul").length == 1) {
	                var width = $('ul').width();
	                $(".content").find('ul').hide().end().append("<ul/>").append("<ul/>");
	                //gridster.remove_all_widgets()
	                $('ul:gt(0)').width(width / 2 - 5).css('float', 'left');
	                var options = getOption($('ul:eq(1)'));
	                var gridsterLeft = $(".content>ul:eq(1)").gridster(options).data('gridster');
	                var gridsterRight = $(".content>ul:eq(2)").gridster(options).data('gridster');
	                renderData(gridsterLeft, data.data.doubleScreenLeftWidgets);
	                renderData(gridsterRight, data.data.doubleScreenRightWidgets);
	            } else {
	                $('ul:first').hide().siblings().show();
	            }
	        } else {
	            $('ul:first').show().siblings().hide();
	        }
	    }
	
	    layoutPage();
	    $(window).resize(function () {
	        layoutPage();
	    });
	});

/***/ },

/***/ 464:
/*!***************************!*\
  !*** ./modules/common.js ***!
  \***************************/
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var activityComponents = [];
	var activityOrderNumber = 1;
	//-------------------------静态生成开始-------------------------
	function loadActionByData(data, func) {
	    for (var i = 0; i < data.content.length; i++) {
	        var component = addActionByData(data.content[i], func);
	        if (typeof component.initAction == "function") component.initAction();
	    }
	}
	function addActionByData(data, func) {
	    var component = func(data, activityOrderNumber);
	    activityComponents.push(component);
	    activityOrderNumber++;
	    return component;
	}
	//-------------------------静态生成结束-------------------------
	function loadDataByTemplate(data, func, templateId, container) {
	    var template = Handlebars.templates[templateId];
	    for (var i = 0; i < data.content.length; i++) {
	        var component = addActivityComponent(data.content[i], func, template);
	        $(component.container).addClass("generated");
	        $(container).append(component.container);
	    }
	}
	function addActivityComponent(data, func, template) {
	    var component = func(data, activityOrderNumber, template);
	    activityComponents.push(component);
	    activityOrderNumber++;
	    return component;
	}
	/**
	 * 用jquery 选择器选择特定段的html生成组件。
	 * selector: html代码端
	 * func: 组件函数
	 * data: json数据
	 * */
	function loadComponent(selector, func, data) {
	    var i = 0;
	    $(selector).each(function () {
	        var contentData = null;
	        if (data && data.content.length > i) {
	            contentData = data.content[i];
	        }
	        i++;
	        var component = func(this, contentData, activityOrderNumber);
	        activityComponents.push(component);
	        activityOrderNumber++;
	        return component;
	    });
	}
	/**
	 * 用于检查每小题的答案
	 * 注意，由于填空题等存在一个段落或一个表格对应多个小题，实际建模只能按一个段落一个小题来做
	 * 只有在检查答案的时候需要额外考虑这点。或者打分时考虑这一点
	 */
	function checkFn(param) {
	    //var num = activityComponents.length;
	    var answers;
	    if (typeof param == 'undefined') {
	        answers = JSON.parse(readFn());
	    } else if (param instanceof Array) {
	        answers = param;
	    } else if (typeof param == 'string') {
	        answers = JSON.parse(param);
	    }
	    //var arr = [];
	    //for (var i = 0; i < num; i++) {
	    //    var actComponent = activityComponents[i];
	    //    if(actComponent.checkFn){
	    //        var result=actComponent.checkFn(answers[i]);
	    //        if(result instanceof Array){
	    //            for(var jj=0;jj<result.length;jj++){
	    //                arr.push(result[jj]);
	    //            }
	    //        }else{
	    //            arr.push(result);
	    //        }
	    //    }else{
	    //        arr.push(-1);
	    //    }
	    //}
	    //return JSON.stringify(arr);
	    var checkArr = [];
	    $.each(answers, function (i, n) {
	        var $ul = $('.list ul').eq(i);
	        if (n == $ul.find('.active').parent().index() - 1) {
	            checkArr.push(1);
	        } else {
	            checkArr.push(0);
	        }
	    });
	    return JSON.stringify(checkArr);
	}
	/*
	 *读取当前页面的题目答案
	 */
	function readFn() {
	    //var num = activityComponents.length;
	    //var arr = [];
	    //for (var i = 0; i < num; i++) {
	    //    var actComponent = activityComponents[i];
	    //    arr.push(actComponent.readFn());
	    //}
	    //return JSON.stringify(arr);
	    var arr = [];
	    $.each($('.list ul').find('.active').parent(), function (i, n) {
	        arr.push($(n).index() - 1);
	    });
	    return JSON.stringify(arr.length > 0 ? arr : [-1]);
	}
	/**
	 * 设定当前页面的答案
	 */
	function setFn(str) {
	    var arr = JSON.parse(str);
	    //for (var i = 0, len = arr.length; i < len; i++) {
	    //    var actComponent = activityComponents[i];
	    //    actComponent.setFn(arr[i]);
	    //}
	    $.each(arr, function (i, n) {
	        $('.list ul').eq(i).find('.choose').eq(n).addClass('active');
	    });
	}
	/**
	 *检查答案，壳程序按检查答案按钮，页面为用户提供反馈，看看学生是否做对了。之后不可编辑
	 */
	function checkAnswer() {
	    //activityComponents.forEach(function(actComponent){
	    //    actComponent.checkAnswer();
	    //});
	    $.each(arr, function (i, n) {
	        var $ul = $('ul').eq(i);
	        if ($(n).is($ul.find('.active'))) {
	            $(n).prevAll('i').addClass('icon_r');
	        } else {
	            $(n).prevAll('i').addClass('icon_e');
	        }
	    });
	    //return ($('.active').is(arr))
	}
	var arr = [];
	$(function () {
	    arr = $('.active').removeClass('active');
	    $('.choose').click(function () {
	        $(this).addClass('active').parent('li').siblings().find('a').removeClass('active');
	    });
	});
	/**
	 * 显示答案，壳程序点击显示答案按钮，页面显示正确答案，之后不可编辑。
	 */
	function showAnswer() {
	    //activityComponents.forEach(function(actComponent){
	    //    actComponent.refresh();
	    //    actComponent.showAnswer();
	    //});
	    $('.active').removeClass('active');
	    $(arr).addClass('active');
	    $('.choose').off();
	}
	/**
	 *刷新， 壳程序点击刷新，页面将恢复初始状态，之后可以开始做题。
	 */
	function refresh() {
	    //activityComponents.forEach(function(actComponent){
	    //    actComponent.refresh();
	    //});
	    $('.active').removeClass('active');
	    $('.choose').click(function () {
	        $(this).addClass('active').parent('li').siblings().find('a').removeClass('active');
	    });
	}
	/*
	 *判断是否是数字
	 */
	function isNum(s) {
	    var regu = /^\d+$/;
	    var re = new RegExp(regu);
	    return re.test(s);
	}
	/**
	 * jquery曾经废弃的方法，应用到课件里面，主要问题在于课件refresh时，有可能并
	 * 没有清零，需要注意。也有可能多次绑定。此处做了相应修改。
	 */
	$.fn.toggleClick = function () {
	    var methods = arguments,
	        // store the passed arguments for future reference
	    count = methods.length; // cache the number of methods
	    //use return this to maintain jQuery chainability
	    return this.each(function (i, item) {
	        // for each element you bind to
	        var index = 0; // create a local counter for that element
	        $(item).off("click");
	        $(item).click(function () {
	            // bind a click handler to that element
	            return methods[index++ % count].apply($(item), arguments); // that when called will apply the 'index'th method to that element
	            // the index % count means that we constrain our iterator between 0 and (count-1)
	        });
	    });
	};
	/**
	 * 常用于一道题目内不同选项序号，比如单选题自动标a,b,c,d,下拉题用罗马字符。等等。
	 */
	if (typeof Handlebars != "undefined") {
	    Handlebars.registerHelper('order_items', function (index, type, offset) {
	        if (offset && isNum(offset)) index = index + parseInt(offset);
	        if (type == "alpha") {
	            return String.fromCharCode(97 + index);
	        } else if (type == "ALPHA") {
	            return String.fromCharCode(65 + index);
	        } else if (type == "Number") {
	            return "" + (index + 1);
	        } else if (type == "Rome") {
	            var romeChar = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];
	            return index > 11 ? "" + (index + 1) : romeChar[index];
	        } else if (type == "rome") {
	            var romeChar = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];
	            return index > 11 ? "" + (index + 1) : romeChar[index].toLowerCase();
	        } else if (type == "None") {
	            return "";
	        } else if ((typeof type === "undefined" ? "undefined" : _typeof(type)) == "object") {
	            return type[index];
	        } else {
	            return "" + (index + 1);
	        }
	    });
	}
	/**
	 * 拷贝源列表的一些属性到目标
	 * */
	function copyAttr(src, target) {
	    var i = 0;
	    if (src.length != target.length) {
	        return;
	    }
	    for (var i = 0; i < src.length; i++) {
	        $(target[i]).attr("id", $(src[i]).attr("id"));
	        $(src[i]).removeAttr("id");
	        $(target[i]).data("answer", $(src[i]).data("answer"));
	    }
	}
	/**
	 *  左右两边各一个ul，其对应的li对齐问题
	 */
	function reAlign(left, right) {
	    var aLi_l = left.children();
	    var aLi_r = right.children();
	    if (aLi_l.length != aLi_r.length) {
	        return;
	    }
	    var i = 0;
	    aLi_l.each(function () {
	        if ($(this).height() > $(aLi_r[i]).height()) {
	            $(aLi_r[i]).css("height", $(this).css("height"));
	        } else {
	            $(this).css("height", $(aLi_r[i]).css("height"));
	        }
	        i++;
	    });
	}
	(function ($) {
	    $.fn.randomize = function () {
	        return this.each(function () {
	            var $this = $(this);
	            var elems = $this.children();
	            elems.sort(function () {
	                return Math.round(Math.random()) - 0.5;
	            });
	            elems.detach();
	            for (var i = 0; i < elems.length; i++) {
	                $this.append(elems[i]);
	            }
	        });
	    };
	})(jQuery);
	$(document).ready(function () {
	    $('.listen').toggle(function () {
	        $(this).find("audio")[0].play();
	    }, function () {
	        $(this).find("audio")[0].pause();
	    });
	});

/***/ }

/******/ });
//# sourceMappingURL=bundle-export.js.map