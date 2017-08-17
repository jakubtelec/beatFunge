/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

$(document).ready(function() {

    __webpack_require__(1);
    var menuProto = __webpack_require__(6);
    var menu = new menuProto();

    menu.init_menu();

})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0 0;\n  padding: 0 0;\n  font-family: 'Arimo', sans-serif;\n  font-size: 14px;\n  color: white;\n  cursor: default;\n  user-select: none; }\n\nhtml {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n*,\n*:before,\n*:after {\n  -webkit-box-sizing: inherit;\n  -moz-box-sizing: inherit;\n  box-sizing: inherit; }\n\nbody {\n  background-color: #003333; }\n\n.tooltip, .tooltip-left {\n  position: relative; }\n\n.tooltip:hover:after {\n  font-size: 14px;\n  width: 150px;\n  text-align: left;\n  line-height: 16px;\n  background: green;\n  border-radius: 10px;\n  position: absolute;\n  top: 25px;\n  left: 15px;\n  color: #fff;\n  content: attr(data-title);\n  display: inline-block;\n  padding: 5px 10px;\n  text-shadow: 0 1px 0 #000;\n  z-index: 10;\n  animation: zoomin 0.3s linear; }\n\n.tooltip-left:hover:after {\n  font-size: 14px;\n  width: 150px;\n  text-align: left;\n  line-height: 16px;\n  background: green;\n  border-radius: 10px;\n  position: absolute;\n  top: 25px;\n  right: 15px;\n  color: #fff;\n  content: attr(data-title);\n  display: inline-block;\n  padding: 5px 10px;\n  text-shadow: 0 1px 0 #000;\n  z-index: 10;\n  animation: zoomin 0.3s linear; }\n\n@keyframes zoomin {\n  0% {\n    transform: scale(0.95); }\n  20% {\n    transform: scale(1.2); }\n  100% {\n    transform: scale(0.95); } }\n\n#help {\n  transition: background-color 0.5s ease; }\n\n.help-off {\n  background-color: transparent; }\n\n.help-on {\n  background-color: green; }\n\n#menu {\n  width: 600px; }\n\n.menu-row {\n  margin: 10px 15px;\n  width: 600px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  text-align: center; }\n\nh1 {\n  font-size: 30px;\n  font-weight: 400;\n  display: block;\n  height: 34px; }\n\n.wrapper {\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n\n#top-panel {\n  height: 34px;\n  margin: 10px 10px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n#controls {\n  width: 320px;\n  height: 34px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end; }\n\n.select {\n  border-radius: 50%;\n  animation: border-zoom 0.2s linear; }\n\n@keyframes border-zoom {\n  0% {\n    transform: scale(0.95); }\n  50% {\n    transform: scale(1.2); }\n  100% {\n    transform: scale(0.95); } }\n\n#bar-counter {\n  border-radius: 50%;\n  margin: 2px 2px;\n  flex-basis: 30px;\n  height: 30px;\n  color: #e6ffff;\n  border: 4px solid #009999;\n  border-top: 4px solid #ccffff;\n  transition: transform 0.1s;\n  transform: rotate(45deg); }\n\n#grid {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n  align-self: center; }\n\n.cell {\n  background-color: transparent;\n  border: 1px solid #33ffff;\n  border-radius: 17px;\n  margin: 2px 2px;\n  flex-basis: 30px;\n  text-align: center;\n  height: 30px;\n  line-height: 28px;\n  color: white; }\n\n.cursor {\n  border: 1px solid #ccffff; }\n\n.bouncer {\n  border: 1px solid #99ffff; }\n\n.trigger {\n  background-color: #009999;\n  border: 1px solid #99ffff; }\n\n@keyframes triggerGlow {\n  0% {\n    box-shadow: 0px 0px 0px 0px transparent; }\n  50% {\n    box-shadow: 0px 0px 5px 3px #99ffff; }\n  100% {\n    box-shadow: 0px 0px 0px 0px transparent; } }\n\n.trigGlow {\n  animation: triggerGlow 0.1s ease-in-out; }\n\n#right-panel {\n  width: 35px;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start; }\n\n.button {\n  border-radius: 20px;\n  margin: 2px 2px;\n  height: 30px;\n  line-height: 28px;\n  text-align: center;\n  font-weight: 400;\n  color: #e6ffff; }\n\n.size-30 {\n  flex-basis: 30px; }\n\n.size-60 {\n  flex-basis: 64px; }\n\n.size-90 {\n  flex-basis: 98px; }\n\n.size-140 {\n  flex-basis: 140px; }\n\n.size-180 {\n  flex-basis: 180px; }\n\n@keyframes glowingBorder {\n  0% {\n    box-shadow: 0px 0px 0px 0px transparent; }\n  50% {\n    box-shadow: 0px 0px 5px 2px #99ffff; }\n  100% {\n    box-shadow: 0px 0px 0px 0px transparent; } }\n\n.glow {\n  animation: glowingBorder 1s infinite; }\n\n#bottom-panel {\n  margin: 10px 0px;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start; }\n\n.sample-bank {\n  flex-basis: 306px;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start; }\n\n.sample {\n  color: #ccffff;\n  border: 1px solid #ccffff; }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

    var soundbankProto = __webpack_require__(7);
    var matrixProto = __webpack_require__(8);

    var menuProto = function() {

        this.app = $("#app");
        this.menu = $("#menu");
        this.kits = $(".kits");
        this.bpm_counter = $("#bpm-counter");
        this.soundbank = 0;
        this.bpm = 120;

        this.bank = {};
        this.matrix = {};

        this.init_menu = function() {

            this.app.hide();
            this.menu.hide();
            this.menu.fadeIn(200);

            let self = this;

            $(".menu-row div").on("click", function() {

                let target = $(this);

                if (target.is("#demo")) {
                    self.soundbank = 0;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#roland-808")) {
                    self.soundbank = 1;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#plucked")) {
                    self.soundbank = 2;
                    self.kits.children().removeClass("glow");
                    target.addClass("glow");
                }

                if (target.is("#bpm-down")) {
                    self.bpm -= 5;
                    self.bpm_counter.text(self.bpm)
                }

                if (target.is("#bpm-up")) {
                    self.bpm += 5;
                    self.bpm_counter.text(self.bpm)
                }

                // STARTING APP

                if (target.is("#start-app")) {

                    self.bank = new soundbankProto();

                    if (self.soundbank == 0) {self.bank.load_sounds("./audio/X_DEMO/", ["00kick", "01bass kick", "02snare 1", "03snare 2", "04claps", "05open hh", "06closed hh 1", "07closed hh 2", "08rim 1", "09rim 2", "10knocker", "11stab"]) }

                    if (self.soundbank == 1) {self.bank.load_sounds("./audio/A_808/", ["00kick", "01bass", "02clap", "03clap 2", "04snare", "05cymbal", "06closed hh", "07open hh", "08tom", "09tom 2"]) }

                    if (self.soundbank == 2) {self.bank.load_sounds("./audio/B_SYNTH_F_MINOR/", ["00synth F", "01synth G", "02synth Ab", "03synth Bb", "04synth C", "05synth Db", "06synth Eb", "07synth F 2"]) }

                    self.matrix = new matrixProto(17, 17);

                    self.matrix.init_map();
                    self.matrix.prepare_DOM(self.bank);


                    // DEMO CONTENT 
                    // (cuntent must be prepared after soundbank init) 

                    if (self.soundbank == 0) {

                    	self.matrix.set_cursor(0,0,"right",0);
                    	self.matrix.set_trigger(0,0);
                    	self.matrix.set_trigger(4,0);
                    	self.matrix.set_trigger(8,0);
                    	self.matrix.set_trigger(12,0);
                    	self.matrix.set_trigger(16,0);


                    }

                    self.matrix.render_DOM();
                    

                    self.menu.fadeOut(200, "swing", () => self.app.fadeIn(200));


                    mainLoop = setInterval(function() {
                        if (self.matrix.state != "pause") {
                            self.matrix.animate_cursors();
                            self.bank.trigger_sounds(self.matrix.soundBuffer);
                        }
                        self.matrix.render_DOM();
                    }, Math.round(60000 / self.bpm / self.matrix.bars));

                }


                target.addClass("select")
                setTimeout(function() {
                    target.removeClass("select");
                }, 300);
            })


        }

    }

    module.exports = menuProto;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var soundbankProto = function() {

    // table for howler soundbank

    this.sounds = [];

    // sound loader - table of filenames as argument

    this.load_sounds = function(path, filenames) {

        filenames.forEach((element) => {
            this.sounds.push(new Howl({
                src: [path + element + ".wav"]
            }))
        });
    }

    this.trigger_sounds = function(soundBuffer) {

        for (let i = 0; i < soundBuffer.length; i++) {
            this.sounds[soundBuffer[i]].play();
        }
    }
}

module.exports = soundbankProto;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

 var cursorProto = function(x, y, direction, sound) {
     this.type = "normal";
     this.x = x;
     this.y = y;
     this.history_x = 0;
     this.history_y = 0;
     this.direction = direction;
     this.sound = sound;
     this.speed = 1;

 }

 var cellProto = function() {
     display: "";
     solid: false;
     type: "empty";
     subtype: "";
     direction: "none";
 }

 var matrixProto = function(x_size, y_size) {

     // globals 

     this.bpm = 100; // beats per minute
     this.bars = 4; // bars per beat
     this.bar = 0; // bar counter
     this.action = { // action for click
         type: "object",
         index: 0,
         direction: ""
     }; // type of interacton - for events
     this.state = "pause" // state of app

     // grid size

     this.x_size = x_size;
     this.y_size = y_size;

     // tables 

     this.map = []; // empty map of cells
     this.cursors = []; // empty map of cursors

     //buffers

     this.soundBuffer = []; // map of sounds to play at one step
     this.triggerBuffer = []; //map of triggers to light up
     this.bouncerBuffer = []; //map of bouncers to light up

     // DOM 

     this.grid = {};
     this.topPanel = {};
     this.barCounter = {};
     this.rightPanel = {};
     this.bottomPanel = {};


     // METHODS

     this.pos = function(x_coord, y_coord) {
         return (y_coord * this.y_size) + x_coord;
     }

     // inits

     this.init_map = function() {
         for (i = 0; i < this.x_size * this.y_size; i++) {
             this.map.push(new cellProto())
             this.map[i].type = "empty";
         }
     }

     // methods for setting up cells and cursors

     this.set_cursor = function(x, y, direction = "right", sound) {
         this.cursors.push(new cursorProto(x, y, direction, sound));
     }

     this.set_bouncer = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].type = "bouncer";
         this.map[addr].solid = true;
         this.grid.children().eq(addr).removeClass();
         this.grid.children().eq(addr).addClass("cell")
         this.grid.children().eq(addr).addClass("bouncer");
         this.grid.children().eq(addr).text("#")
     }

     this.set_arrow = function(x, y, direction = "right") {
         let addr = this.pos(x, y);
         this.map[addr].type = "arrow";
         this.map[addr].direction = direction;
         this.map[addr].solid = false;
                          // target.removeClass();
                 // target.addClass("cell");
     }

     this.set_trigger = function(x, y) {
         let addr = this.pos(x, y);
         this.map[addr].subtype = "trigger";
         this.map[addr].solid = false;
         // this.grid.children().eq(addr).removeClass();
         this.grid.children().eq(addr).addClass("cell")
         this.grid.children().eq(addr).addClass("trigger");
     }

     // let's move things atround! 

     this.animate_cursors = function() {

         // moving cursors and detecting interactions with obiejcts on map

         (this.state != "pause") && (this.bar++);
         this.soundBuffer = [];

         for (let i = 0; i < this.cursors.length; i++) {

             let cursor_field = this.pos(this.cursors[i].x, this.cursors[i].y);
             let right_field = this.pos(this.cursors[i].x + 1, this.cursors[i].y);
             let left_field = this.pos(this.cursors[i].x - 1, this.cursors[i].y);
             let up_field = this.pos(this.cursors[i].x, this.cursors[i].y - 1);
             let down_field = this.pos(this.cursors[i].x, this.cursors[i].y + 1);
             this.cursors[i].history_x = this.cursors[i].x;
             this.cursors[i].history_y = this.cursors[i].y;

             if (this.map[cursor_field].type === "arrow") {
                 this.cursors[i].direction = this.map[cursor_field].direction;
             }

             // move stuff around

             switch (this.cursors[i].direction) {
                 case "right":
                     if (this.cursors[i].x == this.x_size - 1 || this.map[right_field].type == "bouncer") { // bounce cursor to the left
                         this.cursors[i].x--;
                         this.cursors[i].direction = "left";
                     } else {
                         this.cursors[i].x++;
                     }
                     break;
                 case "left":
                     if (this.map[left_field] === undefined || this.cursors[i].x == 0 || this.map[left_field].type == "bouncer") { // bounce cursor to the right
                         this.cursors[i].x++;
                         this.cursors[i].direction = "right";
                     } else {
                         this.cursors[i].x--;
                     }
                     break;
                 case "down":
                     if (this.map[down_field] === undefined || this.cursors[i].y == this.y_size - 1 || this.map[down_field].type == "bouncer") { // bounce cursor up
                         this.cursors[i].y--;
                         this.cursors[i].direction = "up";
                     } else {
                         this.cursors[i].y++;
                     }
                     break;
                 case "up":
                     if (this.map[up_field] === undefined || this.cursors[i].y == 0 || this.map[up_field].type == "bouncer" || this.cursors[i].y == 0) { // bounce cursor down
                         this.cursors[i].y++;
                         this.cursors[i].direction = "down";
                     } else {
                         this.cursors[i].y--;
                     }
                     break;
             }

             // detect triggers and store sounds and triggers into buffers

             cursor_field = this.pos(this.cursors[i].x, this.cursors[i].y);

             if (this.map[cursor_field].subtype === "trigger") {
                 this.soundBuffer.push(this.cursors[i].sound);
                 this.triggerBuffer.push(cursor_field);
             }

         }
     }

     this.prepare_DOM = function(soundbank) {

         // --- INITS ---

         this.topPanel = $("#top-panel");
         this.barCounter = $("#bar-counter");
         this.grid = $("#grid");
         this.rightPanel = $("#right-panel");
         this.bottomPanel = $("#bottom-panel");
         let sampleBank = $(".sample-bank");
         let app = $("#app");
         let play = $("#play");
         let step = $("#step");
         let pause = $("#pause");
         let help = $("#help");
         let tooltips = $(".tooltip-off");
         let tooltipsLeft = $(".tooltip-left-off");

         // pinpointing and catching that damn scope :)  

         let self = this;

         // --- TOP PANEL --- 
         // creating events for controls

         play.on("click", function() {
             self.state = "play";
             let target = $(this);
             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);
         })

         pause.on("click", function() {
             self.state = "pause";
             let target = $(this);
             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);
         })

         step.on("click", function() {
             if (self.state != "play") {
                 self.state = "step";
                 let target = $(this);
                 target.addClass("select");
                 setTimeout(function() {
                     target.removeClass("select");
                 }, 300);
             }
         })

         //  --- GRID --- 
         // calculate screen and grid size

         app.css("width", 34 * this.x_size + 45 + "px"); // app window
         this.topPanel.css("width", 34 * this.x_size - 10 + "px"); // top panel
         this.grid.css("width", 34 * this.x_size + 10 + "px");

         for (let i = 0; i < this.x_size * this.y_size; i++) {
             let cell = $("<div>");
             cell.addClass("cell");
             cell.attr("pos", i);
             cell.text("")
             cell.appendTo("#grid").fadeIn();
         }

         // create grid events for each cell - single clicks

         this.grid.children().on("click", function() {

             // vars 

             let target = $(this);
             let addr = target.attr("pos");

             // adding trigger 

             if (self.action.type == "object" && self.action.index == 0) {
                 self.set_trigger(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             // adding bouncer 

             if (self.action.type == "object" && self.action.index == 1) {
                 self.set_bouncer(addr % self.x_size, Math.floor(addr / self.x_size));
             }

             // removing object OR CURSOR 

             if (self.action.type == "object" && self.action.index == 2) {

                 // removing object - trigger, bouncer or arrow, then...

                 self.map[addr].type = "empty";
                 self.map[addr].subtype = "";
                 target.removeClass();
                 target.text("")
                 target.addClass("cell");

                 // ...checking for cursors and removing them - in case 

                 let cursor_field = 0;
                 let cursors_temp = [];
                 for (let i = 0; i < self.cursors.length; i++) {
                     cursor_field = self.pos(self.cursors[i].x, self.cursors[i].y);
                     (cursor_field != target.attr("pos")) && (cursors_temp.push(self.cursors[i]))
                 }

                 // writing down new table of cursors 

                 self.cursors = cursors_temp;
             }

             if (self.action.type == "object" && self.action.index > 2 && self.action.index < 7) {
                 self.set_arrow(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction);
             }

             if (self.action.type == "cursor") {
                 self.set_cursor(addr % self.x_size, Math.floor(addr / self.x_size), self.action.direction, self.action.index);
             }

             target.addClass("select")
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);

         })

         // --- RIGHT PANEL --- 

         // create events

         this.rightPanel.children().on("click", function() {
             self.action.type == "cursor" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
             let target = $(this);
             self.action.type = "object";
             self.rightPanel.children().eq(self.action.index).removeClass("glow");
             self.action.index = target.index();
             (target.index() == 3) && (self.action.direction = "right");
             (target.index() == 4) && (self.action.direction = "left");
             (target.index() == 5) && (self.action.direction = "down");
             (target.index() == 6) && (self.action.direction = "up");
             target.addClass("glow");
         })

         // --- BOTTOM PANEL --- 

         // create sample list

         this.bottomPanel.css("width", 34 * x_size + 50 + "px");

         soundbank.sounds.forEach((element, index) => {

             (index > 0 ? sampleBank.clone().appendTo(self.bottomPanel) : null)

             let cutStart = element._src.lastIndexOf("/") + 1;
             let name = element._src.substring(cutStart + 2, element._src.length - 4);


             let lastBank = self.bottomPanel.children().last()
             lastBank.attr("pos", index)
             lastBank.children().eq(0).text(index);
             lastBank.children().eq(1).text(name);

             lastBank.children().on("click", function() {

                 self.action.type == "cursor" ? self.bottomPanel.children().children().removeClass("glow") : self.rightPanel.children().removeClass("glow");
                 let target = $(this);
                 clickIndex = target.index();
                 target.parent().children().eq(0).addClass("glow");
                 target.parent().children().eq(1).addClass("glow");
                 (clickIndex > 2 ? target.parent().children().eq(clickIndex).addClass("glow") : target.parent().children().eq(2).addClass("glow"));

                 self.action.type = "cursor";
                 self.action.index = target.parent().attr("pos");

                 (clickIndex > -1 && clickIndex < 3) && (self.action.direction = "right");
                 (clickIndex == 3) && (self.action.direction = "left");
                 (clickIndex == 4) && (self.action.direction = "down");
                 (clickIndex == 5) && (self.action.direction = "up");

             })
         });

         help.on("click", function() {
             tooltips.toggleClass("tooltip tooltip-off");
             tooltipsLeft.toggleClass("tooltip-left tooltip-left-off");

             let target = $(this);
             target.toggleClass("help-off help-on");

             target.addClass("select");
             setTimeout(function() {
                 target.removeClass("select");
             }, 300);
         })

     };



     this.render_DOM = function() {

         // bar counter

         (this.state != "pause") && (this.barCounter.css("transform", "rotate(" + (45 + (this.bar % 4) * 90) + "deg)"));
         (this.state == "step") && (this.state = "pause");

         // rewriting standard elements into DOM

         for (let i = 0; i < this.x_size * this.y_size - 1; i++) {

             // triggers 

             if (this.map[i].subtype === "trigger") {
                 if (this.triggerBuffer.indexOf(i) != -1) {
                     this.grid.children().eq(i).addClass("cell");
                     this.grid.children().eq(i).addClass("trigGlow");
                     setTimeout(() => {
                         this.grid.children().eq(i).removeClass("trigGlow");
                     }, 100);
                 }
             }

             // arrows

             if (this.map[i].type === "arrow") {

                 (this.map[i].direction === "right") && (this.grid.children().eq(i).text("→"));
                 (this.map[i].direction === "left") && (this.grid.children().eq(i).text("←"));
                 (this.map[i].direction === "up") && (this.grid.children().eq(i).text("↑"));
                 (this.map[i].direction === "down") && (this.grid.children().eq(i).text("↓"));
             }

         }


         for (let i = 0; i < this.cursors.length; i++) { // lighting up cursors
             this.grid.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).addClass("cursor");
             this.grid.children().eq(this.pos(this.cursors[i].x, this.cursors[i].y)).text(this.cursors[i].sound);
             this.grid.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).removeClass("cursor");
             (this.bar > 0) && (this.grid.children().eq(this.pos(this.cursors[i].history_x, this.cursors[i].history_y)).text(""));
         }


         // cleaning buffers

         this.triggerBuffer = [];
         this.bouncerBuffer = [];
     }
 }

 module.exports = matrixProto;

/***/ })
/******/ ]);