// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^\)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^\/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],6:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
};

module.exports = reloadCSS;

},{"./bundle-url":7}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],5:[function(require,module,exports) {
const Util = (($) => {
  let transition = false;

  const TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle(event) {
        if ($(event.target).is(this)) {
          return event.
            handleObj.
            handler.
            apply(this, arguments);
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    const el = document.createElement('mm');

    for (const name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    let called = false;

    $(this).one(Util.TRANSITION_END, () => {
      called = true;
    });

    setTimeout(() => {
      if (!called) {
        Util.triggerTransitionEnd(this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();
    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  const Util = {
    TRANSITION_END: 'mmTransitionEnd',

    triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd() {
      return Boolean(transition);
    }
  };

  setTransitionEndSupport();

  return Util;

})(jQuery);

const MetisMenu = (($) => {

  const NAME = 'metisMenu';
  const DATA_KEY = 'metisMenu';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const TRANSITION_DURATION = 350;

  const Default = {
    toggle: true,
    preventDefault: true,
    activeClass: 'active',
    collapseClass: 'collapse',
    collapseInClass: 'in',
    collapsingClass: 'collapsing',
    triggerElement: 'a',
    parentTrigger: 'li',
    subMenu: 'ul'
  };

  const Event = {
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  };

  class MetisMenu {
    constructor(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._transitioning = null;

      this.init();
    }
    init() {
      let self = this;
      $(this._element)
        .find(this._config.parentTrigger + '.' + this._config.activeClass)
        .has(this._config.subMenu)
        .children(this._config.subMenu)
        .attr('aria-expanded', true)
        .addClass(this._config.collapseClass + ' ' + this._config.collapseInClass);

      $(this._element)
        .find(this._config.parentTrigger)
        .not('.' + this._config.activeClass)
        .has(this._config.subMenu)
        .children(this._config.subMenu)
        .attr('aria-expanded', false)
        .addClass(this._config.collapseClass);

      $(this._element)
        .find(this._config.parentTrigger)
        .has(this._config.subMenu)
        .children(this._config.triggerElement)
        .on(Event.CLICK_DATA_API, function (e) {
          var _this = $(this);
          var _parent = _this.parent(self._config.parentTrigger);
          var _siblings = _parent.siblings(self._config.parentTrigger).children(self._config.triggerElement);
          var _list = _parent.children(self._config.subMenu);
          if (self._config.preventDefault) {
            e.preventDefault();
          }
          if (_this.attr('aria-disabled') === 'true') {
            return;
          }
          if (_parent.hasClass(self._config.activeClass)) {
            _this.attr('aria-expanded', false);
            self._hide(_list);

          } else {
            self._show(_list);
            _this.attr('aria-expanded', true);
            if (self._config.toggle) {
              _siblings.attr('aria-expanded', false);
            }
          }

          if (self._config.onTransitionStart) {
            self._config.onTransitionStart(e);
          }
        });

    }

    _show(element) {
      if (this._transitioning ||
        $(element).hasClass(this._config.collapsingClass)) {
        return;
      }
      let _this = this;
      let _el = $(element);

      let startEvent = $.Event(Event.SHOW);
      _el.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      _el
        .parent(this._config.parentTrigger)
        .addClass(this._config.activeClass);


      if (this._config.toggle) {
        this.
          _hide(_el
            .parent(this._config.parentTrigger)
            .siblings()
            .children(this._config.subMenu + '.' + this._config.collapseInClass)
            .attr('aria-expanded', false)
          );
      }

      _el
        .removeClass(this._config.collapseClass)
        .addClass(this._config.collapsingClass)
        .height(0);

      this.setTransitioning(true);

      let complete = function () {
        // check if disposed
        if (!_this._config || !_this._element) {
          return;
        }
        _el
          .removeClass(_this._config.collapsingClass)
          .addClass(_this._config.collapseClass + ' ' + _this._config.collapseInClass)
          .height('')
          .attr('aria-expanded', true);

        _this.setTransitioning(false);

        _el.trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      _el
        .height(_el[0].scrollHeight)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(TRANSITION_DURATION);

    }

    _hide(element) {

      if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
        return;
      }
      let _this = this;
      let _el = $(element);

      let startEvent = $.Event(Event.HIDE);
      _el.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      _el.parent(this._config.parentTrigger).removeClass(this._config.activeClass);
      _el.height(_el.height())[0].offsetHeight;

      _el
        .addClass(this._config.collapsingClass)
        .removeClass(this._config.collapseClass)
        .removeClass(this._config.collapseInClass);

      this.setTransitioning(true);

      let complete = function () {
        // check if disposed
        if (!_this._config || !_this._element) {
          return;
        }
        if (_this._transitioning && _this._config.onTransitionEnd) {
          _this._config.onTransitionEnd();
        }

        _this.setTransitioning(false);
        _el.trigger(Event.HIDDEN);

        _el
          .removeClass(_this._config.collapsingClass)
          .addClass(_this._config.collapseClass)
          .attr('aria-expanded', false);

      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      (_el.height() == 0 || _el.css('display') == 'none') ? complete() : _el
        .height(0)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(TRANSITION_DURATION);
    }

    setTransitioning(isTransitioning) {
      this._transitioning = isTransitioning;
    }

    dispose() {
      $.removeData(this._element, DATA_KEY);

      $(this._element)
        .find(this._config.parentTrigger)
        .has(this._config.subMenu)
        .children(this._config.triggerElement)
        .off('click');

      this._transitioning = null;
      this._config = null;
      this._element = null;
    }

    _getConfig(config) {
      config = $.extend({}, Default, config);
      return config;
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        let $this = $(this);
        let data = $this.data(DATA_KEY);
        let _config = $.extend({},
          Default,
          $this.data(),
          typeof config === 'object' && config
        );

        if (!data && /dispose/.test(config)) {
          this.dispose();
        }

        if (!data) {
          data = new MetisMenu(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = MetisMenu._jQueryInterface;
  $.fn[NAME].Constructor = MetisMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return MetisMenu._jQueryInterface;
  };
  return MetisMenu;

})(jQuery);

},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metisMenu = require("metisMenu/src/metisMenu");

var _metisMenu2 = _interopRequireDefault(_metisMenu);

require("metisMenu/src/metisMenu.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _metisMenu2.default;
},{"metisMenu/src/metisMenu.css":4,"metisMenu/src/metisMenu":5}],2:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metisMenu = require("../components/metisMenu");

var _metisMenu2 = _interopRequireDefault(_metisMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initMetisMenu = function initMetisMenu() {
  $('#side-menu').metisMenu();
};

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
var windowLoaded = function windowLoaded() {
  $(window).on('load', function () {
    var topOffset = 50;
    var width = this.window.innerWidth > 0 ? this.window.innerWidth : this.screen.width;
    if (width < 768) {
      $('div.navbar-collapse').addClass('collapse');
      topOffset = 100; // 2-row-menu
    } else {
      $('div.navbar-collapse').removeClass('collapse');
    }

    var height = (this.window.innerHeight > 0 ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
      $('#page-wrapper').css('min-height', height + 'px');
    }
  });
};

var initNav = function initNav() {
  var url = window.location;
  // var element = $('ul.nav a').filter(function() {
  //     return this.href == url;
  // }).addClass('active').parent().parent().addClass('in').parent();
  var element = $('ul.nav a').filter(function () {
    return this.href == url;
  }).addClass('active').parent();

  while (true) {
    if (element.is('li')) {
      element = element.parent().addClass('in').parent();
    } else {
      break;
    }
  }
};

exports.default = function () {
  windowLoaded();
  initMetisMenu();
  initNav();
};
},{"../components/metisMenu":3}],1:[function(require,module,exports) {
"use strict";

var _init = require("./core/init");

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _init2.default)();
},{"./core/init":2}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:58258/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      window.location.reload();
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error(`[parcel] 🚨 ${data.error.message}\n${data.error.stack}`);
    }
  };
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
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,1])