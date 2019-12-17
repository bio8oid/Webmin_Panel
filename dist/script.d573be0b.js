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
})({"js/chart.js":[function(require,module,exports) {
var url = window.location.href;

if (url.indexOf('pages') > -1 === false || url.indexOf('index') > -1) {
  var ctx = document.getElementById('myChart');
  var chart = new Chart(ctx, {
    // 1
    type: 'bar',
    data: {
      // 2
      labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
      // 3
      datasets: [{
        // 4
        label: "Fuckups",
        // 5
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        // 6
        data: [52, 51, 41, 94, 26, 6, 72, 9, 21, 88]
      }, {
        label: "FTD",
        backgroundColor: '#F29E4E',
        borderColor: '#F29E4E',
        data: [6, 72, 1, 0, 47, 11, 50, 44, 63, 76]
      }, {
        label: "Earned",
        backgroundColor: '#71B374',
        borderColor: '#71B374',
        data: [59, 49, 68, 90, 67, 41, 15, 38, 48, 48],
        // 7
        hidden: false
      }]
    }
  });
}

;
},{}],"js/modalChat.js":[function(require,module,exports) {
///   ADMIN MODAL CHAT   \\\
// Posts counter
var posts = 0; // Post Element Handle Function

var chatElement = function chatElement(e) {
  e.preventDefault(); // Chat Content Element

  var chatContentElement = document.getElementById('chat'); // Chat Element

  var postElement = document.createElement('div');
  postElement.classList.add('your-post'); // Post

  var postParagraph = document.createElement('p');
  var postContent = document.getElementById('chat-input').value;
  var postValue = document.createTextNode(postContent);
  postParagraph.appendChild(postValue);
  postElement.appendChild(postParagraph);
  chatContentElement.appendChild(postElement);
  document.getElementById('chat-input').value = ""; // Admin Answers Handle

  setTimeout(function () {
    if (posts === 1) {
      // Second Admin Post
      postElement = document.createElement('div');
      postElement.classList.add('admin-post');

      var _postParagraph = document.createElement('p');

      var _postValue = document.createTextNode('Can you tell me more about your problem?');

      _postParagraph.appendChild(_postValue);

      postElement.appendChild(_postParagraph);
      chatContentElement.appendChild(postElement);
    }

    if (posts === 2) {
      // Third Admin Post
      postElement = document.createElement('div');
      postElement.classList.add('admin-post');

      var _postParagraph2 = document.createElement('p');

      var _postValue2 = document.createTextNode('Try this solution mate: ');

      var solutionLink = document.createElement('a');
      var linkContent = document.createTextNode('Solution Link');
      solutionLink.setAttribute('href', 'https://www.google.com/');
      solutionLink.setAttribute('target', "_blank");
      solutionLink.appendChild(linkContent);
      solutionLink.style.marginLeft = '20px';

      _postParagraph2.appendChild(_postValue2);

      postElement.appendChild(_postParagraph2);
      postElement.appendChild(solutionLink);
      chatContentElement.appendChild(postElement);
      var label = document.getElementById('label');
      label.style.background = 'red';
      label.innerHTML = "offline";
      var dottie = document.getElementById('dottie');
      dottie.style.background = 'red';
    }

    ;
  }, 1000);
  posts++;
}; // Add New Post


var sendButton = document.getElementById('chat-button');
sendButton.addEventListener('click', chatElement);
},{}],"js/addLink.js":[function(require,module,exports) {
///     ADD NEW LINK HANDLE    \\\
var url = window.location.href;

if (url.indexOf('pages') > -1 === false || url.indexOf('index') > -1 || url.indexOf('links') > -1 || url.indexOf('banners') > -1) {
  var createElement = function createElement() {
    // Links Table Element
    var linkTable = document.getElementById('link-table'); // New Table Row Element

    var newTableRow = document.createElement('div'); // New Name Element

    var newNameParaghraph = document.createElement('p');
    var nameInputValue = document.getElementById('link-name-input').value;
    var nameValue = document.createTextNode(nameInputValue);
    newNameParaghraph.appendChild(nameValue);
    var newName = document.createElement('div');
    newName.appendChild(newNameParaghraph);
    newName.classList.add('name-column');
    newTableRow.appendChild(newName);
    newTableRow.classList.add('table-row'); // New Link Element

    var link = document.createElement('a');
    var linkInputValue = document.getElementById('link-value-input').value;
    var LinkText = document.createTextNode(linkInputValue);
    link.setAttribute('href', linkInputValue);
    link.setAttribute('target', "_blank");
    link.classList.add('copy-link-value');
    link.appendChild(LinkText);
    var newLink = document.createElement('div');
    newLink.appendChild(link);
    newLink.classList.add('link-column');
    newTableRow.appendChild(newLink); // New Icons Element

    var newIcons = document.createElement('div'); // Link Icon

    var linkIcon = document.createElement('i');
    linkIcon.classList.add('icon-links');
    var linkElement = document.createElement('a');
    linkElement.classList.add('copy-link');
    linkElement.addEventListener('click', copyLink);
    linkElement.appendChild(linkIcon);
    newIcons.appendChild(linkElement); // Trash Icon

    var trashIcon = document.createElement('i');
    trashIcon.classList.add('icon-trash');
    var trashElement = document.createElement('a');
    trashElement.appendChild(trashIcon);
    trashElement.classList.add('trash-button');
    trashElement.addEventListener('click', removeElement);
    newIcons.appendChild(trashElement);
    newIcons.classList.add('links-and-bin-column');
    newTableRow.appendChild(newIcons);

    if (linkInputValue.length && nameInputValue.length > 0) {
      linkTable.appendChild(newTableRow);
    } else {
      alert("Enter Name and URL");
    }

    ;
  }; // Remove Link function


  var removeElement = function removeElement(e) {
    var toRemove = e.target;
    toRemove.parentNode.parentNode.parentNode.parentNode.removeChild(toRemove.parentNode.parentNode.parentNode);
  }; // Copy Link to clipboard


  var copyLink = function copyLink(e) {
    var linkContent = e.target.parentNode.parentNode.parentNode.children[1].children[0].innerHTML;
    navigator.clipboard.writeText(linkContent);
    alert("Your Link has been copied to CLIPBOARD!");
  }; // Add New Link Element Handle


  var addLinkButton = document.getElementById('add-link-button');
  addLinkButton.addEventListener('click', createElement); // Remove Link Button

  var removeLinkButtons = document.querySelectorAll('.trash-button');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = removeLinkButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var button = _step.value;
      button.addEventListener('click', removeElement);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ; // Copy Link Button

  var copyLinkButtons = document.querySelectorAll('.copy-link');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = copyLinkButtons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _button = _step2.value;

      _button.addEventListener('click', copyLink);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  ;
}

;
},{}],"js/pagination.js":[function(require,module,exports) {
var url = window.location.href;

if (url.indexOf('details') > -1 || url.indexOf('payout') > -1) {
  var monkeyList = new List('paginated-list', {
    page: 9,
    pagination: true
  });
}

;
},{}],"js/slider.js":[function(require,module,exports) {
if (window.location.href.indexOf('postback') > -1) {
  $(".js-range-slider").ionRangeSlider({
    skin: "modern",
    min: 0,
    max: 168,
    from: 104,
    postfix: ' hours'
  });
}

;
},{}],"js/calendarReset.js":[function(require,module,exports) {
// Reset General Statistic Calendar \\
var url = window.location.href;

if (url.indexOf('pages') > -1 === false || url.indexOf('details') > -1 || url.indexOf('payout') > -1) {
  document.getElementById("general-calendar-reset").addEventListener('click', function () {
    document.getElementById("general-calendar-form").reset();
  });
}

;
},{}],"js/script.js":[function(require,module,exports) {
"use strict";

require("./chart");

require("./modalChat");

require("./addLink");

require("./pagination");

require("./slider");

require("./calendarReset");

window.onload = function () {
  // Hamburger menu function \\
  var toggleMenu = function toggleMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('show', visible);
  };

  document.getElementById('menu-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  }); // Sidebar-burger menu function \\

  var toggleSmallMenu = function toggleSmallMenu(visible) {
    document.getElementById('sidebar-section').classList.toggle('sidebar-small', visible);
    document.body.classList.toggle('widen');
  };

  document.getElementById('sidebar-burger').addEventListener('click', function (e) {
    e.preventDefault();
    toggleSmallMenu();
  }); // Modals \\

  var closeModal = function closeModal() {
    document.getElementById('overlay').classList.remove('show');
  };

  document.querySelectorAll('#overlay .js--close-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });
  document.querySelector('#overlay').addEventListener('click', function (e) {
    if (e.target.id === 'overlay') {
      closeModal();
    }

    ;
  });
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }

    ;
  });

  var openModal = function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function (modal) {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  }; // Message Modal


  document.getElementById('indicator').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('orange-dot').classList.remove('orange-dot');
    openModal('#message');
  }); // Quit Modal

  document.getElementById('exit').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#myModal');
  }); // Login Modal

  document.getElementById('login').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#loginModal');
  }); // Sidebar Quit Modal

  document.getElementById('exit-sidebar').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#myModal');
  }); // Sidebar Login Modal

  document.getElementById('login-sidebar').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#loginModal');
  }); // Sidebar Admin Modal

  document.getElementById('contact-manager').addEventListener('click', function (e) {
    e.preventDefault();
    openModal('#manager');
  }); // Add-Link/Banner Modal

  document.querySelectorAll('.add-link-button').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      openModal('#add-link');
    });
  }); // Create Pixel Modal

  if (window.location.href.indexOf('postback') > -1) {
    document.getElementById('create-pixel').addEventListener('click', function (e) {
      e.preventDefault();
      openModal('#pixel');
    });
  }

  ;
};
},{"./chart":"js/chart.js","./modalChat":"js/modalChat.js","./addLink":"js/addLink.js","./pagination":"js/pagination.js","./slider":"js/slider.js","./calendarReset":"js/calendarReset.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58775" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)