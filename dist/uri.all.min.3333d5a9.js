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
})({"node_modules/uri-js/dist/es5/uri.all.min.js":[function(require,module,exports) {
var define;
/** @license URI.js v4.2.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(e.URI=e.URI||{})}(this,function(e){"use strict";function r(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];if(r.length>1){r[0]=r[0].slice(0,-1);for(var t=r.length-1,o=1;o<t;++o)r[o]=r[o].slice(1,-1);return r[t]=r[t].slice(1),r.join("")}return r[0]}function n(e){return"(?:"+e+")"}function t(e){return e===undefined?"undefined":null===e?"null":Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase()}function o(e){return e.toUpperCase()}function a(e){return e!==undefined&&null!==e?e instanceof Array?e:"number"!=typeof e.length||e.split||e.setInterval||e.call?[e]:Array.prototype.slice.call(e):[]}function i(e,r){var n=e;if(r)for(var t in r)n[t]=r[t];return n}function u(e){var t=r("[0-9]","[A-Fa-f]"),o=n(n("%[EFef]"+t+"%"+t+t+"%"+t+t)+"|"+n("%[89A-Fa-f]"+t+"%"+t+t)+"|"+n("%"+t+t)),a="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",i=r("[\\:\\/\\?\\#\\[\\]\\@]",a),u=e?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]",s=e?"[\\uE000-\\uF8FF]":"[]",f=r("[A-Za-z]","[0-9]","[\\-\\.\\_\\~]",u),c=n(n("25[0-5]")+"|"+n("2[0-4][0-9]")+"|"+n("1[0-9][0-9]")+"|"+n("0?[1-9][0-9]")+"|0?0?[0-9]"),p=n(c+"\\."+c+"\\."+c+"\\."+c),h=n(t+"{1,4}"),d=n(n(h+"\\:"+h)+"|"+p),l=n(n(h+"\\:")+"{6}"+d),g=n("\\:\\:"+n(h+"\\:")+"{5}"+d),v=n(n(h)+"?\\:\\:"+n(h+"\\:")+"{4}"+d),m=n(n(n(h+"\\:")+"{0,1}"+h)+"?\\:\\:"+n(h+"\\:")+"{3}"+d),E=n(n(n(h+"\\:")+"{0,2}"+h)+"?\\:\\:"+n(h+"\\:")+"{2}"+d),C=n(n(n(h+"\\:")+"{0,3}"+h)+"?\\:\\:"+h+"\\:"+d),y=n(n(n(h+"\\:")+"{0,4}"+h)+"?\\:\\:"+d),S=n(n(n(h+"\\:")+"{0,5}"+h)+"?\\:\\:"+h),A=n(n(n(h+"\\:")+"{0,6}"+h)+"?\\:\\:"),D=n([l,g,v,m,E,C,y,S,A].join("|")),w=n(n(f+"|"+o)+"+");return{NOT_SCHEME:new RegExp(r("[^]","[A-Za-z]","[0-9]","[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(r("[^\\%\\:]",f,a),"g"),NOT_HOST:new RegExp(r("[^\\%\\[\\]\\:]",f,a),"g"),NOT_PATH:new RegExp(r("[^\\%\\/\\:\\@]",f,a),"g"),NOT_PATH_NOSCHEME:new RegExp(r("[^\\%\\/\\@]",f,a),"g"),NOT_QUERY:new RegExp(r("[^\\%]",f,a,"[\\:\\@\\/\\?]",s),"g"),NOT_FRAGMENT:new RegExp(r("[^\\%]",f,a,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(r("[^]",f,a),"g"),UNRESERVED:new RegExp(f,"g"),OTHER_CHARS:new RegExp(r("[^\\%]",f,i),"g"),PCT_ENCODED:new RegExp(o,"g"),IPV4ADDRESS:new RegExp("^("+p+")$"),IPV6ADDRESS:new RegExp("^\\[?("+D+")"+n(n("\\%25|\\%(?!"+t+"{2})")+"("+w+")")+"?\\]?$")}}function s(e){throw new RangeError(q[e])}function f(e,r){for(var n=[],t=e.length;t--;)n[t]=r(e[t]);return n}function c(e,r){var n=e.split("@"),t="";return n.length>1&&(t=n[0]+"@",e=n[1]),e=e.replace(j,"."),t+f(e.split("."),r).join(".")}function p(e){for(var r=[],n=0,t=e.length;n<t;){var o=e.charCodeAt(n++);if(o>=55296&&o<=56319&&n<t){var a=e.charCodeAt(n++);56320==(64512&a)?r.push(((1023&o)<<10)+(1023&a)+65536):(r.push(o),n--)}else r.push(o)}return r}function h(e){var r=e.charCodeAt(0);return r<16?"%0"+r.toString(16).toUpperCase():r<128?"%"+r.toString(16).toUpperCase():r<2048?"%"+(r>>6|192).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase():"%"+(r>>12|224).toString(16).toUpperCase()+"%"+(r>>6&63|128).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase()}function d(e){for(var r="",n=0,t=e.length;n<t;){var o=parseInt(e.substr(n+1,2),16);if(o<128)r+=String.fromCharCode(o),n+=3;else if(o>=194&&o<224){if(t-n>=6){var a=parseInt(e.substr(n+4,2),16);r+=String.fromCharCode((31&o)<<6|63&a)}else r+=e.substr(n,6);n+=6}else if(o>=224){if(t-n>=9){var i=parseInt(e.substr(n+4,2),16),u=parseInt(e.substr(n+7,2),16);r+=String.fromCharCode((15&o)<<12|(63&i)<<6|63&u)}else r+=e.substr(n,9);n+=9}else r+=e.substr(n,3),n+=3}return r}function l(e,r){function n(e){var n=d(e);return n.match(r.UNRESERVED)?n:e}return e.scheme&&(e.scheme=String(e.scheme).replace(r.PCT_ENCODED,n).toLowerCase().replace(r.NOT_SCHEME,"")),e.userinfo!==undefined&&(e.userinfo=String(e.userinfo).replace(r.PCT_ENCODED,n).replace(r.NOT_USERINFO,h).replace(r.PCT_ENCODED,o)),e.host!==undefined&&(e.host=String(e.host).replace(r.PCT_ENCODED,n).toLowerCase().replace(r.NOT_HOST,h).replace(r.PCT_ENCODED,o)),e.path!==undefined&&(e.path=String(e.path).replace(r.PCT_ENCODED,n).replace(e.scheme?r.NOT_PATH:r.NOT_PATH_NOSCHEME,h).replace(r.PCT_ENCODED,o)),e.query!==undefined&&(e.query=String(e.query).replace(r.PCT_ENCODED,n).replace(r.NOT_QUERY,h).replace(r.PCT_ENCODED,o)),e.fragment!==undefined&&(e.fragment=String(e.fragment).replace(r.PCT_ENCODED,n).replace(r.NOT_FRAGMENT,h).replace(r.PCT_ENCODED,o)),e}function g(e){return e.replace(/^0*(.*)/,"$1")||"0"}function v(e,r){var n=e.match(r.IPV4ADDRESS)||[],t=R(n,2),o=t[1];return o?o.split(".").map(g).join("."):e}function m(e,r){var n=e.match(r.IPV6ADDRESS)||[],t=R(n,3),o=t[1],a=t[2];if(o){for(var i=o.toLowerCase().split("::").reverse(),u=R(i,2),s=u[0],f=u[1],c=f?f.split(":").map(g):[],p=s.split(":").map(g),h=r.IPV4ADDRESS.test(p[p.length-1]),d=h?7:8,l=p.length-d,m=Array(d),E=0;E<d;++E)m[E]=c[E]||p[l+E]||"";h&&(m[d-1]=v(m[d-1],r));var C=m.reduce(function(e,r,n){if(!r||"0"===r){var t=e[e.length-1];t&&t.index+t.length===n?t.length++:e.push({index:n,length:1})}return e},[]),y=C.sort(function(e,r){return r.length-e.length})[0],S=void 0;if(y&&y.length>1){var A=m.slice(0,y.index),D=m.slice(y.index+y.length);S=A.join(":")+"::"+D.join(":")}else S=m.join(":");return a&&(S+="%"+a),S}return e}function E(e){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},n={},t=!1!==r.iri?N:F;"suffix"===r.reference&&(e=(r.scheme?r.scheme+":":"")+"//"+e);var o=e.match(J);if(o){K?(n.scheme=o[1],n.userinfo=o[3],n.host=o[4],n.port=parseInt(o[5],10),n.path=o[6]||"",n.query=o[7],n.fragment=o[8],isNaN(n.port)&&(n.port=o[5])):(n.scheme=o[1]||undefined,n.userinfo=-1!==e.indexOf("@")?o[3]:undefined,n.host=-1!==e.indexOf("//")?o[4]:undefined,n.port=parseInt(o[5],10),n.path=o[6]||"",n.query=-1!==e.indexOf("?")?o[7]:undefined,n.fragment=-1!==e.indexOf("#")?o[8]:undefined,isNaN(n.port)&&(n.port=e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?o[4]:undefined)),n.host&&(n.host=m(v(n.host,t),t)),n.scheme!==undefined||n.userinfo!==undefined||n.host!==undefined||n.port!==undefined||n.path||n.query!==undefined?n.scheme===undefined?n.reference="relative":n.fragment===undefined?n.reference="absolute":n.reference="uri":n.reference="same-document",r.reference&&"suffix"!==r.reference&&r.reference!==n.reference&&(n.error=n.error||"URI is not a "+r.reference+" reference.");var a=B[(r.scheme||n.scheme||"").toLowerCase()];if(r.unicodeSupport||a&&a.unicodeSupport)l(n,t);else{if(n.host&&(r.domainHost||a&&a.domainHost))try{n.host=Y.toASCII(n.host.replace(t.PCT_ENCODED,d).toLowerCase())}catch(i){n.error=n.error||"Host's domain name can not be converted to ASCII via punycode: "+i}l(n,F)}a&&a.parse&&a.parse(n,r)}else n.error=n.error||"URI can not be parsed.";return n}function C(e,r){var n=!1!==r.iri?N:F,t=[];return e.userinfo!==undefined&&(t.push(e.userinfo),t.push("@")),e.host!==undefined&&t.push(m(v(String(e.host),n),n).replace(n.IPV6ADDRESS,function(e,r,n){return"["+r+(n?"%25"+n:"")+"]"})),"number"==typeof e.port&&(t.push(":"),t.push(e.port.toString(10))),t.length?t.join(""):undefined}function y(e){for(var r=[];e.length;)if(e.match(W))e=e.replace(W,"");else if(e.match(X))e=e.replace(X,"/");else if(e.match(ee))e=e.replace(ee,"/"),r.pop();else if("."===e||".."===e)e="";else{var n=e.match(re);if(!n)throw new Error("Unexpected dot segment condition");var t=n[0];e=e.slice(t.length),r.push(t)}return r.join("")}function S(e){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},n=r.iri?N:F,t=[],o=B[(r.scheme||e.scheme||"").toLowerCase()];if(o&&o.serialize&&o.serialize(e,r),e.host)if(n.IPV6ADDRESS.test(e.host));else if(r.domainHost||o&&o.domainHost)try{e.host=r.iri?Y.toUnicode(e.host):Y.toASCII(e.host.replace(n.PCT_ENCODED,d).toLowerCase())}catch(u){e.error=e.error||"Host's domain name can not be converted to "+(r.iri?"Unicode":"ASCII")+" via punycode: "+u}l(e,n),"suffix"!==r.reference&&e.scheme&&(t.push(e.scheme),t.push(":"));var a=C(e,r);if(a!==undefined&&("suffix"!==r.reference&&t.push("//"),t.push(a),e.path&&"/"!==e.path.charAt(0)&&t.push("/")),e.path!==undefined){var i=e.path;r.absolutePath||o&&o.absolutePath||(i=y(i)),a===undefined&&(i=i.replace(/^\/\//,"/%2F")),t.push(i)}return e.query!==undefined&&(t.push("?"),t.push(e.query)),e.fragment!==undefined&&(t.push("#"),t.push(e.fragment)),t.join("")}function A(e,r){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},t=arguments[3],o={};return t||(e=E(S(e,n),n),r=E(S(r,n),n)),n=n||{},!n.tolerant&&r.scheme?(o.scheme=r.scheme,o.userinfo=r.userinfo,o.host=r.host,o.port=r.port,o.path=y(r.path||""),o.query=r.query):(r.userinfo!==undefined||r.host!==undefined||r.port!==undefined?(o.userinfo=r.userinfo,o.host=r.host,o.port=r.port,o.path=y(r.path||""),o.query=r.query):(r.path?("/"===r.path.charAt(0)?o.path=y(r.path):(e.userinfo===undefined&&e.host===undefined&&e.port===undefined||e.path?e.path?o.path=e.path.slice(0,e.path.lastIndexOf("/")+1)+r.path:o.path=r.path:o.path="/"+r.path,o.path=y(o.path)),o.query=r.query):(o.path=e.path,r.query!==undefined?o.query=r.query:o.query=e.query),o.userinfo=e.userinfo,o.host=e.host,o.port=e.port),o.scheme=e.scheme),o.fragment=r.fragment,o}function D(e,r,n){var t=i({scheme:"null"},n);return S(A(E(e,t),E(r,t),t,!0),t)}function w(e,r){return"string"==typeof e?e=S(E(e,r),r):"object"===t(e)&&(e=E(S(e,r),r)),e}function b(e,r,n){return"string"==typeof e?e=S(E(e,n),n):"object"===t(e)&&(e=S(e,n)),"string"==typeof r?r=S(E(r,n),n):"object"===t(r)&&(r=S(r,n)),e===r}function x(e,r){return e&&e.toString().replace(r&&r.iri?N.ESCAPE:F.ESCAPE,h)}function O(e,r){return e&&e.toString().replace(r&&r.iri?N.PCT_ENCODED:F.PCT_ENCODED,d)}function I(e){var r=d(e);return r.match(fe)?r:e}var F=u(!1),N=u(!0),R=function(){function e(e,r){var n=[],t=!0,o=!1,a=undefined;try{for(var i,u=e[Symbol.iterator]();!(t=(i=u.next()).done)&&(n.push(i.value),!r||n.length!==r);t=!0);}catch(s){o=!0,a=s}finally{try{!t&&u["return"]&&u["return"]()}finally{if(o)throw a}}return n}return function(r,n){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),T=function(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)},_=2147483647,P=/^xn--/,U=/[^\0-\x7E]/,j=/[\x2E\u3002\uFF0E\uFF61]/g,q={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},H=Math.floor,z=String.fromCharCode,L=function(e){return String.fromCodePoint.apply(String,T(e))},$=function(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:36},M=function(e,r){return e+22+75*(e<26)-((0!=r)<<5)},V=function(e,r,n){var t=0;for(e=n?H(e/700):e>>1,e+=H(e/r);e>455;t+=36)e=H(e/35);return H(t+36*e/(e+38))},k=function(e){var r=[],n=e.length,t=0,o=128,a=72,i=e.lastIndexOf("-");i<0&&(i=0);for(var u=0;u<i;++u)e.charCodeAt(u)>=128&&s("not-basic"),r.push(e.charCodeAt(u));for(var f=i>0?i+1:0;f<n;){for(var c=t,p=1,h=36;;h+=36){f>=n&&s("invalid-input");var d=$(e.charCodeAt(f++));(d>=36||d>H((_-t)/p))&&s("overflow"),t+=d*p;var l=h<=a?1:h>=a+26?26:h-a;if(d<l)break;var g=36-l;p>H(_/g)&&s("overflow"),p*=g}var v=r.length+1;a=V(t-c,v,0==c),H(t/v)>_-o&&s("overflow"),o+=H(t/v),t%=v,r.splice(t++,0,o)}return String.fromCodePoint.apply(String,r)},Z=function(e){var r=[];e=p(e);var n=e.length,t=128,o=0,a=72,i=!0,u=!1,f=undefined;try{for(var c,h=e[Symbol.iterator]();!(i=(c=h.next()).done);i=!0){var d=c.value;d<128&&r.push(z(d))}}catch(j){u=!0,f=j}finally{try{!i&&h["return"]&&h["return"]()}finally{if(u)throw f}}var l=r.length,g=l;for(l&&r.push("-");g<n;){var v=_,m=!0,E=!1,C=undefined;try{for(var y,S=e[Symbol.iterator]();!(m=(y=S.next()).done);m=!0){var A=y.value;A>=t&&A<v&&(v=A)}}catch(j){E=!0,C=j}finally{try{!m&&S["return"]&&S["return"]()}finally{if(E)throw C}}var D=g+1;v-t>H((_-o)/D)&&s("overflow"),o+=(v-t)*D,t=v;var w=!0,b=!1,x=undefined;try{for(var O,I=e[Symbol.iterator]();!(w=(O=I.next()).done);w=!0){var F=O.value;if(F<t&&++o>_&&s("overflow"),F==t){for(var N=o,R=36;;R+=36){var T=R<=a?1:R>=a+26?26:R-a;if(N<T)break;var P=N-T,U=36-T;r.push(z(M(T+P%U,0))),N=H(P/U)}r.push(z(M(N,0))),a=V(o,D,g==l),o=0,++g}}}catch(j){b=!0,x=j}finally{try{!w&&I["return"]&&I["return"]()}finally{if(b)throw x}}++o,++t}return r.join("")},G=function(e){return c(e,function(e){return P.test(e)?k(e.slice(4).toLowerCase()):e})},Q=function(e){return c(e,function(e){return U.test(e)?"xn--"+Z(e):e})},Y={version:"2.1.0",ucs2:{decode:p,encode:L},decode:k,encode:Z,toASCII:Q,toUnicode:G},B={},J=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,K="".match(/(){0}/)[1]===undefined,W=/^\.\.?\//,X=/^\/\.(\/|$)/,ee=/^\/\.\.(\/|$)/,re=/^\/?(?:.|\n)*?(?=\/|$)/,ne={scheme:"http",domainHost:!0,parse:function(e,r){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,r){return e.port!==("https"!==String(e.scheme).toLowerCase()?80:443)&&""!==e.port||(e.port=undefined),e.path||(e.path="/"),e}},te={scheme:"https",domainHost:ne.domainHost,parse:ne.parse,serialize:ne.serialize},oe={},ae="[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]",ie="[0-9A-Fa-f]",ue=n(n("%[EFef][0-9A-Fa-f]%"+ie+ie+"%"+ie+ie)+"|"+n("%[89A-Fa-f][0-9A-Fa-f]%"+ie+ie)+"|"+n("%"+ie+ie)),se=r("[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",'[\\"\\\\]'),fe=new RegExp(ae,"g"),ce=new RegExp(ue,"g"),pe=new RegExp(r("[^]","[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]","[\\.]",'[\\"]',se),"g"),he=new RegExp(r("[^]",ae,"[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"),"g"),de=he,le={scheme:"mailto",parse:function(e,r){var n=e,t=n.to=n.path?n.path.split(","):[];if(n.path=undefined,n.query){for(var o=!1,a={},i=n.query.split("&"),u=0,s=i.length;u<s;++u){var f=i[u].split("=");switch(f[0]){case"to":for(var c=f[1].split(","),p=0,h=c.length;p<h;++p)t.push(c[p]);break;case"subject":n.subject=O(f[1],r);break;case"body":n.body=O(f[1],r);break;default:o=!0,a[O(f[0],r)]=O(f[1],r)}}o&&(n.headers=a)}n.query=undefined;for(var d=0,l=t.length;d<l;++d){var g=t[d].split("@");if(g[0]=O(g[0]),r.unicodeSupport)g[1]=O(g[1],r).toLowerCase();else try{g[1]=Y.toASCII(O(g[1],r).toLowerCase())}catch(v){n.error=n.error||"Email address's domain name can not be converted to ASCII via punycode: "+v}t[d]=g.join("@")}return n},serialize:function(e,r){var n=e,t=a(e.to);if(t){for(var i=0,u=t.length;i<u;++i){var s=String(t[i]),f=s.lastIndexOf("@"),c=s.slice(0,f).replace(ce,I).replace(ce,o).replace(pe,h),p=s.slice(f+1);try{p=r.iri?Y.toUnicode(p):Y.toASCII(O(p,r).toLowerCase())}catch(v){n.error=n.error||"Email address's domain name can not be converted to "+(r.iri?"Unicode":"ASCII")+" via punycode: "+v}t[i]=c+"@"+p}n.path=t.join(",")}var d=e.headers=e.headers||{};e.subject&&(d.subject=e.subject),e.body&&(d.body=e.body);var l=[];for(var g in d)d[g]!==oe[g]&&l.push(g.replace(ce,I).replace(ce,o).replace(he,h)+"="+d[g].replace(ce,I).replace(ce,o).replace(de,h));return l.length&&(n.query=l.join("&")),n}},ge=/^([^\:]+)\:(.*)/,ve={scheme:"urn",parse:function(e,r){var n=e.path&&e.path.match(ge),t=e;if(n){var o=r.scheme||t.scheme||"urn",a=n[1].toLowerCase(),i=n[2],u=o+":"+(r.nid||a),s=B[u];t.nid=a,t.nss=i,t.path=undefined,s&&(t=s.parse(t,r))}else t.error=t.error||"URN can not be parsed.";return t},serialize:function(e,r){var n=r.scheme||e.scheme||"urn",t=e.nid,o=n+":"+(r.nid||t),a=B[o];a&&(e=a.serialize(e,r));var i=e,u=e.nss;return i.path=(t||r.nid)+":"+u,i}},me=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,Ee={scheme:"urn:uuid",parse:function(e,r){var n=e;return n.uuid=n.nss,n.nss=undefined,r.tolerant||n.uuid&&n.uuid.match(me)||(n.error=n.error||"UUID is not valid."),n},serialize:function(e,r){var n=e;return n.nss=(e.uuid||"").toLowerCase(),n}};B[ne.scheme]=ne,B[te.scheme]=te,B[le.scheme]=le,B[ve.scheme]=ve,B[Ee.scheme]=Ee,e.SCHEMES=B,e.pctEncChar=h,e.pctDecChars=d,e.parse=E,e.removeDotSegments=y,e.serialize=S,e.resolveComponents=A,e.resolve=D,e.normalize=w,e.equal=b,e.escapeComponent=x,e.unescapeComponent=O,Object.defineProperty(e,"__esModule",{value:!0})});

},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/uri-js/dist/es5/uri.all.min.js"], null)
//# sourceMappingURL=/uri.all.min.3333d5a9.js.map