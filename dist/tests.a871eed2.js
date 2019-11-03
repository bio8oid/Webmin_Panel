// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/uri-js/dist/es5/uri.all.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/** @license URI.js v4.2.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.URI = global.URI || {})));
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number") {
        uriTokens.push(":");
        uriTokens.push(components.port.toString(10));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        //normalize the default port
        if (components.port === (String(components.scheme).toLowerCase() !== "https" ? 80 : 443) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$2 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$3 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$4 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}],"node_modules/uri-js/tests/tests.js":[function(require,module,exports) {
//
//
// Tests
//
//

if (typeof URI === "undefined") {
	var URI = require("../dist/es5/uri.all");
}

test("Acquire URI", function () {
	//URI = require("./uri").URI;
	ok(URI);
});

test("URI Parsing", function () {
	var components;

	//scheme
	components = URI.parse("uri:");
	strictEqual(components.error, undefined, "scheme errors");
	strictEqual(components.scheme, "uri", "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//userinfo
	components = URI.parse("//@");
	strictEqual(components.error, undefined, "userinfo errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, "@", "authority");
	strictEqual(components.userinfo, "", "userinfo");
	strictEqual(components.host, "", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//host
	components = URI.parse("//");
	strictEqual(components.error, undefined, "host errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, "", "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//port
	components = URI.parse("//:");
	strictEqual(components.error, undefined, "port errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, ":", "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "", "host");
	strictEqual(components.port, "", "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//path
	components = URI.parse("");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//query
	components = URI.parse("?");
	strictEqual(components.error, undefined, "query errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, "", "query");
	strictEqual(components.fragment, undefined, "fragment");

	//fragment
	components = URI.parse("#");
	strictEqual(components.error, undefined, "fragment errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "", "fragment");

	//fragment with character tabulation
	components = URI.parse("#\t");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "%09", "fragment");

	//fragment with line feed
	components = URI.parse("#\n");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "%0A", "fragment");

	//fragment with line tabulation
	components = URI.parse("#\v");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "%0B", "fragment");

	//fragment with form feed
	components = URI.parse("#\f");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "%0C", "fragment");

	//fragment with carriage return
	components = URI.parse("#\r");
	strictEqual(components.error, undefined, "path errors");
	strictEqual(components.scheme, undefined, "scheme");
	//strictEqual(components.authority, undefined, "authority");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, undefined, "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, "%0D", "fragment");

	//all
	components = URI.parse("uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body");
	strictEqual(components.error, undefined, "all errors");
	strictEqual(components.scheme, "uri", "scheme");
	//strictEqual(components.authority, "user:pass@example.com:123", "authority");
	strictEqual(components.userinfo, "user:pass", "userinfo");
	strictEqual(components.host, "example.com", "host");
	strictEqual(components.port, 123, "port");
	strictEqual(components.path, "/one/two.three", "path");
	strictEqual(components.query, "q1=a1&q2=a2", "query");
	strictEqual(components.fragment, "body", "fragment");

	//IPv4address
	components = URI.parse("//10.10.10.10");
	strictEqual(components.error, undefined, "IPv4address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "10.10.10.10", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//IPv6address
	components = URI.parse("//[2001:db8::7]");
	strictEqual(components.error, undefined, "IPv4address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "2001:db8::7", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//mixed IPv4address & IPv6address
	components = URI.parse("//[::ffff:129.144.52.38]");
	strictEqual(components.error, undefined, "IPv4address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "::ffff:129.144.52.38", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//mixed IPv4address & reg-name, example from terion-name (https://github.com/garycourt/uri-js/issues/4)
	components = URI.parse("uri://10.10.10.10.example.com/en/process");
	strictEqual(components.error, undefined, "mixed errors");
	strictEqual(components.scheme, "uri", "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "10.10.10.10.example.com", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "/en/process", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//IPv6address, example from bkw (https://github.com/garycourt/uri-js/pull/16)
	components = URI.parse("//[2606:2800:220:1:248:1893:25c8:1946]/test");
	strictEqual(components.error, undefined, "IPv6address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "2606:2800:220:1:248:1893:25c8:1946", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "/test", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");
	
	//IPv6address, example from RFC 5952
	components = URI.parse("//[2001:db8::1]:80");
	strictEqual(components.error, undefined, "IPv6address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "2001:db8::1", "host");
	strictEqual(components.port, 80, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//IPv6address with zone identifier, RFC 6874
	components = URI.parse("//[fe80::a%25en1]");
	strictEqual(components.error, undefined, "IPv4address errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "fe80::a%en1", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");

	//IPv6address with an unescaped interface specifier, example from pekkanikander (https://github.com/garycourt/uri-js/pull/22)
	components = URI.parse("//[2001:db8::7%en0]");
	strictEqual(components.error, undefined, "IPv6address interface errors");
	strictEqual(components.scheme, undefined, "scheme");
	strictEqual(components.userinfo, undefined, "userinfo");
	strictEqual(components.host, "2001:db8::7%en0", "host");
	strictEqual(components.port, undefined, "port");
	strictEqual(components.path, "", "path");
	strictEqual(components.query, undefined, "query");
	strictEqual(components.fragment, undefined, "fragment");
});

test("URI Serialization", function () {
	var components = {
		scheme : undefined,
		userinfo : undefined,
		host : undefined,
		port : undefined,
		path : undefined,
		query : undefined,
		fragment : undefined
	};
	strictEqual(URI.serialize(components), "", "Undefined Components");

	components = {
		scheme : "",
		userinfo : "",
		host : "",
		port : 0,
		path : "",
		query : "",
		fragment : ""
	};
	strictEqual(URI.serialize(components), "//@:0?#", "Empty Components");

	components = {
		scheme : "uri",
		userinfo : "foo:bar",
		host : "example.com",
		port : 1,
		path : "path",
		query : "query",
		fragment : "fragment"
	};
	strictEqual(URI.serialize(components), "uri://foo:bar@example.com:1/path?query#fragment", "All Components");

	strictEqual(URI.serialize({path:"//path"}), "/%2Fpath", "Double slash path");
	strictEqual(URI.serialize({path:"foo:bar"}), "foo%3Abar", "Colon path");
	strictEqual(URI.serialize({path:"?query"}), "%3Fquery", "Query path");

	//mixed IPv4address & reg-name, example from terion-name (https://github.com/garycourt/uri-js/issues/4)
	strictEqual(URI.serialize({host:"10.10.10.10.example.com"}), "//10.10.10.10.example.com", "Mixed IPv4address & reg-name");

	//IPv6address
	strictEqual(URI.serialize({host:"2001:db8::7"}), "//[2001:db8::7]", "IPv6 Host");
	strictEqual(URI.serialize({host:"::ffff:129.144.52.38"}), "//[::ffff:129.144.52.38]", "IPv6 Mixed Host");
	strictEqual(URI.serialize({host:"2606:2800:220:1:248:1893:25c8:1946"}), "//[2606:2800:220:1:248:1893:25c8:1946]", "IPv6 Full Host");

	//IPv6address with zone identifier, RFC 6874
	strictEqual(URI.serialize({host:"fe80::a%en1"}), "//[fe80::a%25en1]", "IPv6 Zone Unescaped Host");
	strictEqual(URI.serialize({host:"fe80::a%25en1"}), "//[fe80::a%25en1]", "IPv6 Zone Escaped Host");
});

test("URI Resolving", function () {
	//normal examples from RFC 3986
	var base = "uri://a/b/c/d;p?q";
	strictEqual(URI.resolve(base, "g:h"), "g:h", "g:h");
	strictEqual(URI.resolve(base, "g:h"), "g:h", "g:h");
	strictEqual(URI.resolve(base, "g"), "uri://a/b/c/g", "g");
	strictEqual(URI.resolve(base, "./g"), "uri://a/b/c/g", "./g");
	strictEqual(URI.resolve(base, "g/"), "uri://a/b/c/g/", "g/");
	strictEqual(URI.resolve(base, "/g"), "uri://a/g", "/g");
	strictEqual(URI.resolve(base, "//g"), "uri://g", "//g");
	strictEqual(URI.resolve(base, "?y"), "uri://a/b/c/d;p?y", "?y");
	strictEqual(URI.resolve(base, "g?y"), "uri://a/b/c/g?y", "g?y");
	strictEqual(URI.resolve(base, "#s"), "uri://a/b/c/d;p?q#s", "#s");
	strictEqual(URI.resolve(base, "g#s"), "uri://a/b/c/g#s", "g#s");
	strictEqual(URI.resolve(base, "g?y#s"), "uri://a/b/c/g?y#s", "g?y#s");
	strictEqual(URI.resolve(base, ";x"), "uri://a/b/c/;x", ";x");
	strictEqual(URI.resolve(base, "g;x"), "uri://a/b/c/g;x", "g;x");
	strictEqual(URI.resolve(base, "g;x?y#s"), "uri://a/b/c/g;x?y#s", "g;x?y#s");
	strictEqual(URI.resolve(base, ""), "uri://a/b/c/d;p?q", "");
	strictEqual(URI.resolve(base, "."), "uri://a/b/c/", ".");
	strictEqual(URI.resolve(base, "./"), "uri://a/b/c/", "./");
	strictEqual(URI.resolve(base, ".."), "uri://a/b/", "..");
	strictEqual(URI.resolve(base, "../"), "uri://a/b/", "../");
	strictEqual(URI.resolve(base, "../g"), "uri://a/b/g", "../g");
	strictEqual(URI.resolve(base, "../.."), "uri://a/", "../..");
	strictEqual(URI.resolve(base, "../../"), "uri://a/", "../../");
	strictEqual(URI.resolve(base, "../../g"), "uri://a/g", "../../g");

	//abnormal examples from RFC 3986
	strictEqual(URI.resolve(base, "../../../g"), "uri://a/g", "../../../g");
	strictEqual(URI.resolve(base, "../../../../g"), "uri://a/g", "../../../../g");

	strictEqual(URI.resolve(base, "/./g"), "uri://a/g", "/./g");
	strictEqual(URI.resolve(base, "/../g"), "uri://a/g", "/../g");
	strictEqual(URI.resolve(base, "g."), "uri://a/b/c/g.", "g.");
	strictEqual(URI.resolve(base, ".g"), "uri://a/b/c/.g", ".g");
	strictEqual(URI.resolve(base, "g.."), "uri://a/b/c/g..", "g..");
	strictEqual(URI.resolve(base, "..g"), "uri://a/b/c/..g", "..g");

	strictEqual(URI.resolve(base, "./../g"), "uri://a/b/g", "./../g");
	strictEqual(URI.resolve(base, "./g/."), "uri://a/b/c/g/", "./g/.");
	strictEqual(URI.resolve(base, "g/./h"), "uri://a/b/c/g/h", "g/./h");
	strictEqual(URI.resolve(base, "g/../h"), "uri://a/b/c/h", "g/../h");
	strictEqual(URI.resolve(base, "g;x=1/./y"), "uri://a/b/c/g;x=1/y", "g;x=1/./y");
	strictEqual(URI.resolve(base, "g;x=1/../y"), "uri://a/b/c/y", "g;x=1/../y");

	strictEqual(URI.resolve(base, "g?y/./x"), "uri://a/b/c/g?y/./x", "g?y/./x");
	strictEqual(URI.resolve(base, "g?y/../x"), "uri://a/b/c/g?y/../x", "g?y/../x");
	strictEqual(URI.resolve(base, "g#s/./x"), "uri://a/b/c/g#s/./x", "g#s/./x");
	strictEqual(URI.resolve(base, "g#s/../x"), "uri://a/b/c/g#s/../x", "g#s/../x");

	strictEqual(URI.resolve(base, "uri:g"), "uri:g", "uri:g");
	strictEqual(URI.resolve(base, "uri:g", {tolerant:true}), "uri://a/b/c/g", "uri:g");

	//examples by PAEz
	strictEqual(URI.resolve("//www.g.com/","/adf\ngf"), "//www.g.com/adf%0Agf", "/adf\\ngf");
	strictEqual(URI.resolve("//www.g.com/error\n/bleh/bleh",".."), "//www.g.com/error%0A/", "//www.g.com/error\\n/bleh/bleh");
});

test("URI Normalizing", function () {
	//test from RFC 3987
	strictEqual(URI.normalize("uri://www.example.org/red%09ros\xE9#red"), "uri://www.example.org/red%09ros%C3%A9#red");

	//IPv4address
	strictEqual(URI.normalize("//192.068.001.000"), "//192.68.1.0");

	//IPv6address, example from RFC 3513
	strictEqual(URI.normalize("http://[1080::8:800:200C:417A]/"), "http://[1080::8:800:200c:417a]/");

	//IPv6address, examples from RFC 5952
	strictEqual(URI.normalize("//[2001:0db8::0001]/"), "//[2001:db8::1]/");
	strictEqual(URI.normalize("//[2001:db8::1:0000:1]/"), "//[2001:db8::1:0:1]/");
	strictEqual(URI.normalize("//[2001:db8:0:0:0:0:2:1]/"), "//[2001:db8::2:1]/");
	strictEqual(URI.normalize("//[2001:db8:0:1:1:1:1:1]/"), "//[2001:db8:0:1:1:1:1:1]/");
	strictEqual(URI.normalize("//[2001:0:0:1:0:0:0:1]/"), "//[2001:0:0:1::1]/");
	strictEqual(URI.normalize("//[2001:db8:0:0:1:0:0:1]/"), "//[2001:db8::1:0:0:1]/");
	strictEqual(URI.normalize("//[2001:DB8::1]/"), "//[2001:db8::1]/");
	strictEqual(URI.normalize("//[0:0:0:0:0:ffff:192.0.2.1]/"), "//[::ffff:192.0.2.1]/");

	//Mixed IPv4 and IPv6 address
	strictEqual(URI.normalize("//[1:2:3:4:5:6:192.0.2.1]/"), "//[1:2:3:4:5:6:192.0.2.1]/");
	strictEqual(URI.normalize("//[1:2:3:4:5:6:192.068.001.000]/"), "//[1:2:3:4:5:6:192.68.1.0]/");
});

test("URI Equals", function () {
	//test from RFC 3986
	strictEqual(URI.equal("example://a/b/c/%7Bfoo%7D", "eXAMPLE://a/./b/../b/%63/%7bfoo%7d"), true);

	//test from RFC 3987
	strictEqual(URI.equal("http://example.org/~user", "http://example.org/%7euser"), true);
});

test("Escape Component", function () {
	var chr;
	for (var d = 0; d <= 129; ++d) {
		chr = String.fromCharCode(d);
		if (!chr.match(/[\$\&\+\,\;\=]/)) {
			strictEqual(URI.escapeComponent(chr), encodeURIComponent(chr));
		} else {
			strictEqual(URI.escapeComponent(chr), chr);
		}
	}
	strictEqual(URI.escapeComponent("\u00c0"), encodeURIComponent("\u00c0"));
	strictEqual(URI.escapeComponent("\u07ff"), encodeURIComponent("\u07ff"));
	strictEqual(URI.escapeComponent("\u0800"), encodeURIComponent("\u0800"));
	strictEqual(URI.escapeComponent("\u30a2"), encodeURIComponent("\u30a2"));
});

test("Unescape Component", function () {
	var chr;
	for (var d = 0; d <= 129; ++d) {
		chr = String.fromCharCode(d);
		strictEqual(URI.unescapeComponent(encodeURIComponent(chr)), chr);
	}
	strictEqual(URI.unescapeComponent(encodeURIComponent("\u00c0")), "\u00c0");
	strictEqual(URI.unescapeComponent(encodeURIComponent("\u07ff")), "\u07ff");
	strictEqual(URI.unescapeComponent(encodeURIComponent("\u0800")), "\u0800");
	strictEqual(URI.unescapeComponent(encodeURIComponent("\u30a2")), "\u30a2");
});

//
// IRI
//



var IRI_OPTION = { iri : true, unicodeSupport : true };

test("IRI Parsing", function () {
	var components = URI.parse("uri://us\xA0er:pa\uD7FFss@example.com:123/o\uF900ne/t\uFDCFwo.t\uFDF0hree?q1=a1\uF8FF\uE000&q2=a2#bo\uFFEFdy", IRI_OPTION);
	strictEqual(components.error, undefined, "all errors");
	strictEqual(components.scheme, "uri", "scheme");
	//strictEqual(components.authority, "us\xA0er:pa\uD7FFss@example.com:123", "authority");
	strictEqual(components.userinfo, "us\xA0er:pa\uD7FFss", "userinfo");
	strictEqual(components.host, "example.com", "host");
	strictEqual(components.port, 123, "port");
	strictEqual(components.path, "/o\uF900ne/t\uFDCFwo.t\uFDF0hree", "path");
	strictEqual(components.query, "q1=a1\uF8FF\uE000&q2=a2", "query");
	strictEqual(components.fragment, "bo\uFFEFdy", "fragment");
});

test("IRI Serialization", function () {
	var components = {
		scheme : "uri",
		userinfo : "us\xA0er:pa\uD7FFss",
		host : "example.com",
		port : 123,
		path : "/o\uF900ne/t\uFDCFwo.t\uFDF0hree",
		query : "q1=a1\uF8FF\uE000&q2=a2",
		fragment : "bo\uFFEFdy\uE001"
	};
	strictEqual(URI.serialize(components, IRI_OPTION), "uri://us\xA0er:pa\uD7FFss@example.com:123/o\uF900ne/t\uFDCFwo.t\uFDF0hree?q1=a1\uF8FF\uE000&q2=a2#bo\uFFEFdy%EE%80%81");
});

test("IRI Normalizing", function () {
	strictEqual(URI.normalize("uri://www.example.org/red%09ros\xE9#red", IRI_OPTION), "uri://www.example.org/red%09ros\xE9#red");
});

test("IRI Equals", function () {
	//example from RFC 3987
	strictEqual(URI.equal("example://a/b/c/%7Bfoo%7D/ros\xE9", "eXAMPLE://a/./b/../b/%63/%7bfoo%7d/ros%C3%A9", IRI_OPTION), true);
});

test("Convert IRI to URI", function () {
	//example from RFC 3987
	strictEqual(URI.serialize(URI.parse("uri://www.example.org/red%09ros\xE9#red", IRI_OPTION)), "uri://www.example.org/red%09ros%C3%A9#red");

	//Internationalized Domain Name conversion via punycode example from RFC 3987
	strictEqual(URI.serialize(URI.parse("uri://r\xE9sum\xE9.example.org", {iri:true, domainHost:true}), {domainHost:true}), "uri://xn--rsum-bpad.example.org");
});

test("Convert URI to IRI", function () {
	//examples from RFC 3987
	strictEqual(URI.serialize(URI.parse("uri://www.example.org/D%C3%BCrst"), IRI_OPTION), "uri://www.example.org/D\xFCrst");
	strictEqual(URI.serialize(URI.parse("uri://www.example.org/D%FCrst"), IRI_OPTION), "uri://www.example.org/D%FCrst");
	strictEqual(URI.serialize(URI.parse("uri://xn--99zt52a.example.org/%e2%80%ae"), IRI_OPTION), "uri://xn--99zt52a.example.org/%E2%80%AE");  //or uri://\u7D0D\u8C46.example.org/%E2%80%AE

	//Internationalized Domain Name conversion via punycode example from RFC 3987
	strictEqual(URI.serialize(URI.parse("uri://xn--rsum-bpad.example.org", {domainHost:true}), {iri:true, domainHost:true}), "uri://r\xE9sum\xE9.example.org");
});

//
// HTTP
//

if (URI.SCHEMES["http"]) {

	//module("HTTP");

	test("HTTP Equals", function () {
		//test from RFC 2616
		strictEqual(URI.equal("http://abc.com:80/~smith/home.html", "http://abc.com/~smith/home.html"), true);
		strictEqual(URI.equal("http://ABC.com/%7Esmith/home.html", "http://abc.com/~smith/home.html"), true);
		strictEqual(URI.equal("http://ABC.com:/%7esmith/home.html", "http://abc.com/~smith/home.html"), true);
		strictEqual(URI.equal("HTTP://ABC.COM", "http://abc.com/"), true);
		//test from RFC 3986
		strictEqual(URI.equal("http://example.com:/", "http://example.com:80/"), true);
	});

}

if (URI.SCHEMES["https"]) {

	//module("HTTPS");

	test("HTTPS Equals", function () {
		strictEqual(URI.equal("https://example.com", "https://example.com:443/"), true);
		strictEqual(URI.equal("https://example.com:/", "https://example.com:443/"), true);
	});

}

//
// URN
//

if (URI.SCHEMES["urn"]) {

	//module("URN");

	test("URN Parsing", function () {
		//example from RFC 2141
		var components = URI.parse("urn:foo:a123,456");
		strictEqual(components.error, undefined, "errors");
		strictEqual(components.scheme, "urn", "scheme");
		//strictEqual(components.authority, undefined, "authority");
		strictEqual(components.userinfo, undefined, "userinfo");
		strictEqual(components.host, undefined, "host");
		strictEqual(components.port, undefined, "port");
		strictEqual(components.path, undefined, "path");
		strictEqual(components.query, undefined, "query");
		strictEqual(components.fragment, undefined, "fragment");
		strictEqual(components.nid, "foo", "nid");
		strictEqual(components.nss, "a123,456", "nss");
	});

	test("URN Serialization", function () {
		//example from RFC 2141
		var components = {
			scheme : "urn",
			nid : "foo",
			nss : "a123,456"
		};
		strictEqual(URI.serialize(components), "urn:foo:a123,456");
	});

	test("URN Equals", function () {
		//test from RFC 2141
		strictEqual(URI.equal("urn:foo:a123,456", "urn:foo:a123,456"), true);
		strictEqual(URI.equal("urn:foo:a123,456", "URN:foo:a123,456"), true);
		strictEqual(URI.equal("urn:foo:a123,456", "urn:FOO:a123,456"), true);
		strictEqual(URI.equal("urn:foo:a123,456", "urn:foo:A123,456"), false);
		strictEqual(URI.equal("urn:foo:a123%2C456", "URN:FOO:a123%2c456"), true);
	});

	test("URN Resolving", function () {
		//example from epoberezkin
		strictEqual(URI.resolve('', 'urn:some:ip:prop'), 'urn:some:ip:prop');
		strictEqual(URI.resolve('#', 'urn:some:ip:prop'), 'urn:some:ip:prop');
		strictEqual(URI.resolve('urn:some:ip:prop', 'urn:some:ip:prop'), 'urn:some:ip:prop');
		strictEqual(URI.resolve('urn:some:other:prop', 'urn:some:ip:prop'), 'urn:some:ip:prop');
	});

	//
	// URN UUID
	//

	test("UUID Parsing", function () {
		//example from RFC 4122
		var components = URI.parse("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
		strictEqual(components.error, undefined, "errors");
		strictEqual(components.scheme, "urn", "scheme");
		//strictEqual(components.authority, undefined, "authority");
		strictEqual(components.userinfo, undefined, "userinfo");
		strictEqual(components.host, undefined, "host");
		strictEqual(components.port, undefined, "port");
		strictEqual(components.path, undefined, "path");
		strictEqual(components.query, undefined, "query");
		strictEqual(components.fragment, undefined, "fragment");
		strictEqual(components.nid, "uuid", "nid");
		strictEqual(components.nss, undefined, "nss");
		strictEqual(components.uuid, "f81d4fae-7dec-11d0-a765-00a0c91e6bf6", "uuid");

		components = URI.parse("urn:uuid:notauuid-7dec-11d0-a765-00a0c91e6bf6");
		notStrictEqual(components.error, undefined, "errors");
	});

	test("UUID Serialization", function () {
		//example from RFC 4122
		var components = {
			scheme : "urn",
			nid : "uuid",
			uuid : "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
		};
		strictEqual(URI.serialize(components), "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");

		components = {
			scheme : "urn",
			nid : "uuid",
			uuid : "notauuid-7dec-11d0-a765-00a0c91e6bf6"
		};
		strictEqual(URI.serialize(components), "urn:uuid:notauuid-7dec-11d0-a765-00a0c91e6bf6");
	});

	test("UUID Equals", function () {
		strictEqual(URI.equal("URN:UUID:F81D4FAE-7DEC-11D0-A765-00A0C91E6BF6", "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6"), true);
	});

	test("URN NID Override", function () {
		var components = URI.parse("urn:foo:f81d4fae-7dec-11d0-a765-00a0c91e6bf6", {nid:"uuid"});
		strictEqual(components.error, undefined, "errors");
		strictEqual(components.scheme, "urn", "scheme");
		strictEqual(components.path, undefined, "path");
		strictEqual(components.nid, "foo", "nid");
		strictEqual(components.nss, undefined, "nss");
		strictEqual(components.uuid, "f81d4fae-7dec-11d0-a765-00a0c91e6bf6", "uuid");

		var components = {
			scheme : "urn",
			nid : "foo",
			uuid : "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
		};
		strictEqual(URI.serialize(components, {nid:"uuid"}), "urn:foo:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
	});
}

//
// Mailto
//

if (URI.SCHEMES["mailto"]) {

	//module("Mailto");

	test("Mailto Parse", function () {
		var components;

		//tests from RFC 6068

		components = URI.parse("mailto:chris@example.com");
		strictEqual(components.error, undefined, "error");
		strictEqual(components.scheme, "mailto", "scheme");
		strictEqual(components.userinfo, undefined, "userinfo");
		strictEqual(components.host, undefined, "host");
		strictEqual(components.port, undefined, "port");
		strictEqual(components.path, undefined, "path");
		strictEqual(components.query, undefined, "query");
		strictEqual(components.fragment, undefined, "fragment");
		deepEqual(components.to, ["chris@example.com"], "to");
		strictEqual(components.subject, undefined, "subject");
		strictEqual(components.body, undefined, "body");
		strictEqual(components.headers, undefined, "headers");

		components = URI.parse("mailto:infobot@example.com?subject=current-issue");
		deepEqual(components.to, ["infobot@example.com"], "to");
		strictEqual(components.subject, "current-issue", "subject");

		components = URI.parse("mailto:infobot@example.com?body=send%20current-issue");
		deepEqual(components.to, ["infobot@example.com"], "to");
		strictEqual(components.body, "send current-issue", "body");

		components = URI.parse("mailto:infobot@example.com?body=send%20current-issue%0D%0Asend%20index");
		deepEqual(components.to, ["infobot@example.com"], "to");
		strictEqual(components.body, "send current-issue\x0D\x0Asend index", "body");

		components = URI.parse("mailto:list@example.org?In-Reply-To=%3C3469A91.D10AF4C@example.com%3E");
		deepEqual(components.to, ["list@example.org"], "to");
		deepEqual(components.headers, {"In-Reply-To":"<3469A91.D10AF4C@example.com>"}, "headers");

		components = URI.parse("mailto:majordomo@example.com?body=subscribe%20bamboo-l");
		deepEqual(components.to, ["majordomo@example.com"], "to");
		strictEqual(components.body, "subscribe bamboo-l", "body");

		components = URI.parse("mailto:joe@example.com?cc=bob@example.com&body=hello");
		deepEqual(components.to, ["joe@example.com"], "to");
		strictEqual(components.body, "hello", "body");
		deepEqual(components.headers, {"cc":"bob@example.com"}, "headers");

		components = URI.parse("mailto:joe@example.com?cc=bob@example.com?body=hello");
		if (URI.VALIDATE_SUPPORT) ok(components.error, "invalid header fields");

		components = URI.parse("mailto:gorby%25kremvax@example.com");
		deepEqual(components.to, ["gorby%kremvax@example.com"], "to gorby%kremvax@example.com");

		components = URI.parse("mailto:unlikely%3Faddress@example.com?blat=foop");
		deepEqual(components.to, ["unlikely?address@example.com"], "to unlikely?address@example.com");
		deepEqual(components.headers, {"blat":"foop"}, "headers");

		components = URI.parse("mailto:Mike%26family@example.org");
		deepEqual(components.to, ["Mike&family@example.org"], "to Mike&family@example.org");

		components = URI.parse("mailto:%22not%40me%22@example.org");
		deepEqual(components.to, ['"not@me"@example.org'], "to " + '"not@me"@example.org');

		components = URI.parse("mailto:%22oh%5C%5Cno%22@example.org");
		deepEqual(components.to, ['"oh\\\\no"@example.org'], "to " + '"oh\\\\no"@example.org');

		components = URI.parse("mailto:%22%5C%5C%5C%22it's%5C%20ugly%5C%5C%5C%22%22@example.org");
		deepEqual(components.to, ['"\\\\\\"it\'s\\ ugly\\\\\\""@example.org'], "to " + '"\\\\\\"it\'s\\ ugly\\\\\\""@example.org');

		components = URI.parse("mailto:user@example.org?subject=caf%C3%A9");
		deepEqual(components.to, ["user@example.org"], "to");
		strictEqual(components.subject, "caf\xE9", "subject");

		components = URI.parse("mailto:user@example.org?subject=%3D%3Futf-8%3FQ%3Fcaf%3DC3%3DA9%3F%3D");
		deepEqual(components.to, ["user@example.org"], "to");
		strictEqual(components.subject, "=?utf-8?Q?caf=C3=A9?=", "subject");  //TODO: Verify this

		components = URI.parse("mailto:user@example.org?subject=%3D%3Fiso-8859-1%3FQ%3Fcaf%3DE9%3F%3D");
		deepEqual(components.to, ["user@example.org"], "to");
		strictEqual(components.subject, "=?iso-8859-1?Q?caf=E9?=", "subject");  //TODO: Verify this

		components = URI.parse("mailto:user@example.org?subject=caf%C3%A9&body=caf%C3%A9");
		deepEqual(components.to, ["user@example.org"], "to");
		strictEqual(components.subject, "caf\xE9", "subject");
		strictEqual(components.body, "caf\xE9", "body");

		if (URI.IRI_SUPPORT) {
			components = URI.parse("mailto:user@%E7%B4%8D%E8%B1%86.example.org?subject=Test&body=NATTO");
			deepEqual(components.to, ["user@xn--99zt52a.example.org"], "to");
			strictEqual(components.subject, "Test", "subject");
			strictEqual(components.body, "NATTO", "body");
		}

	});

	test("Mailto Serialize", function () {
		var components;

		//tests from RFC 6068
		strictEqual(URI.serialize({scheme : "mailto", to : ["chris@example.com"]}), "mailto:chris@example.com");
		strictEqual(URI.serialize({scheme : "mailto", to : ["infobot@example.com"], body : "current-issue"}), "mailto:infobot@example.com?body=current-issue");
		strictEqual(URI.serialize({scheme : "mailto", to : ["infobot@example.com"], body : "send current-issue"}), "mailto:infobot@example.com?body=send%20current-issue");
		strictEqual(URI.serialize({scheme : "mailto", to : ["infobot@example.com"], body : "send current-issue\x0D\x0Asend index"}), "mailto:infobot@example.com?body=send%20current-issue%0D%0Asend%20index");
		strictEqual(URI.serialize({scheme : "mailto", to : ["list@example.org"], headers : {"In-Reply-To" : "<3469A91.D10AF4C@example.com>"}}), "mailto:list@example.org?In-Reply-To=%3C3469A91.D10AF4C@example.com%3E");
		strictEqual(URI.serialize({scheme : "mailto", to : ["majordomo@example.com"], body : "subscribe bamboo-l"}), "mailto:majordomo@example.com?body=subscribe%20bamboo-l");
		strictEqual(URI.serialize({scheme : "mailto", to : ["joe@example.com"], headers : {"cc" : "bob@example.com", "body" : "hello"}}), "mailto:joe@example.com?cc=bob@example.com&body=hello");
		strictEqual(URI.serialize({scheme : "mailto", to : ["gorby%25kremvax@example.com"]}), "mailto:gorby%25kremvax@example.com");
		strictEqual(URI.serialize({scheme : "mailto", to : ["unlikely%3Faddress@example.com"], headers : {"blat" : "foop"}}), "mailto:unlikely%3Faddress@example.com?blat=foop");
		strictEqual(URI.serialize({scheme : "mailto", to : ["Mike&family@example.org"]}), "mailto:Mike%26family@example.org");
		strictEqual(URI.serialize({scheme : "mailto", to : ['"not@me"@example.org']}), "mailto:%22not%40me%22@example.org");
		strictEqual(URI.serialize({scheme : "mailto", to : ['"oh\\\\no"@example.org']}), "mailto:%22oh%5C%5Cno%22@example.org");
		strictEqual(URI.serialize({scheme : "mailto", to : ['"\\\\\\"it\'s\\ ugly\\\\\\""@example.org']}), "mailto:%22%5C%5C%5C%22it's%5C%20ugly%5C%5C%5C%22%22@example.org");
		strictEqual(URI.serialize({scheme : "mailto", to : ["user@example.org"], subject : "caf\xE9"}), "mailto:user@example.org?subject=caf%C3%A9");
		strictEqual(URI.serialize({scheme : "mailto", to : ["user@example.org"], subject : "=?utf-8?Q?caf=C3=A9?="}), "mailto:user@example.org?subject=%3D%3Futf-8%3FQ%3Fcaf%3DC3%3DA9%3F%3D");
		strictEqual(URI.serialize({scheme : "mailto", to : ["user@example.org"], subject : "=?iso-8859-1?Q?caf=E9?="}), "mailto:user@example.org?subject=%3D%3Fiso-8859-1%3FQ%3Fcaf%3DE9%3F%3D");
		strictEqual(URI.serialize({scheme : "mailto", to : ["user@example.org"], subject : "caf\xE9", body : "caf\xE9"}), "mailto:user@example.org?subject=caf%C3%A9&body=caf%C3%A9");
		if (URI.IRI_SUPPORT) {
			strictEqual(URI.serialize({scheme : "mailto", to : ["us\xE9r@\u7d0d\u8c46.example.org"], subject : "Test", body : "NATTO"}), "mailto:us%C3%A9r@xn--99zt52a.example.org?subject=Test&body=NATTO");
		}

	});

	test("Mailto Equals", function () {
		//tests from RFC 6068
		strictEqual(URI.equal("mailto:addr1@an.example,addr2@an.example", "mailto:?to=addr1@an.example,addr2@an.example"), true);
		strictEqual(URI.equal("mailto:?to=addr1@an.example,addr2@an.example", "mailto:addr1@an.example?to=addr2@an.example"), true);
	});

}

},{"../dist/es5/uri.all":"node_modules/uri-js/dist/es5/uri.all.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65204" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/uri-js/tests/tests.js"], null)
//# sourceMappingURL=/tests.a871eed2.js.map