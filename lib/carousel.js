module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 549);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(192);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _throttle = __webpack_require__(51);

var _throttle2 = _interopRequireDefault(_throttle);

var _resizeEvent = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElCarousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: function validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },

  data: function data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },


  computed: {
    arrowDisplay: function arrowDisplay() {
      return this.arrow !== 'never' && this.direction !== 'vertical';
    },
    hasLabel: function hasLabel() {
      return this.items.some(function (item) {
        return item.label.toString().length > 0;
      });
    },
    carouselClasses: function carouselClasses() {
      var classes = ['el-carousel', 'el-carousel--' + this.direction];
      if (this.type === 'card') {
        classes.push('el-carousel--card');
      }
      return classes;
    },
    indicatorsClasses: function indicatorsClasses() {
      var classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction];
      if (this.hasLabel) {
        classes.push('el-carousel__indicators--labels');
      }
      if (this.indicatorPosition === 'outside' || this.type === 'card') {
        classes.push('el-carousel__indicators--outside');
      }
      return classes;
    }
  },

  watch: {
    items: function items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    activeIndex: function activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit('change', val, oldVal);
      }
    },
    autoplay: function autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },
    loop: function loop() {
      this.setActiveItem(this.activeIndex);
    },
    interval: function interval() {
      this.pauseTimer();
      this.startTimer();
    }
  },

  methods: {
    handleMouseEnter: function handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave: function handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    itemInStage: function itemInStage(item, index) {
      var length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active || item.inStage && this.items[index + 1] && this.items[index + 1].active) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active || item.inStage && this.items[index - 1] && this.items[index - 1].active) {
        return 'right';
      }
      return false;
    },
    handleButtonEnter: function handleButtonEnter(arrow) {
      var _this = this;

      if (this.direction === 'vertical') return;
      this.items.forEach(function (item, index) {
        if (arrow === _this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },
    handleButtonLeave: function handleButtonLeave() {
      if (this.direction === 'vertical') return;
      this.items.forEach(function (item) {
        item.hover = false;
      });
    },
    updateItems: function updateItems() {
      this.items = this.$children.filter(function (child) {
        return child.$options.name === 'ElCarouselItem';
      });
    },
    resetItemPosition: function resetItemPosition(oldIndex) {
      var _this2 = this;

      this.items.forEach(function (item, index) {
        item.translateItem(index, _this2.activeIndex, oldIndex);
      });
    },
    playSlides: function playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    pauseTimer: function pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    startTimer: function startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    resetTimer: function resetTimer() {
      this.pauseTimer();
      this.startTimer();
    },
    setActiveItem: function setActiveItem(index) {
      if (typeof index === 'string') {
        var filteredItems = this.items.filter(function (item) {
          return item.name === index;
        });
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      var length = this.items.length;
      var oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
      this.resetTimer();
    },
    prev: function prev() {
      this.setActiveItem(this.activeIndex - 1);
    },
    next: function next() {
      this.setActiveItem(this.activeIndex + 1);
    },
    handleIndicatorClick: function handleIndicatorClick(index) {
      this.activeIndex = index;
    },
    handleIndicatorHover: function handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },

  created: function created() {
    var _this3 = this;

    this.throttledArrowClick = (0, _throttle2.default)(300, true, function (index) {
      _this3.setActiveItem(index);
    });
    this.throttledIndicatorHover = (0, _throttle2.default)(300, function (index) {
      _this3.handleIndicatorHover(index);
    });
  },
  mounted: function mounted() {
    var _this4 = this;

    this.updateItems();
    this.$nextTick(function () {
      (0, _resizeEvent.addResizeListener)(_this4.$el, _this4.resetItemPosition);
      if (_this4.initialIndex < _this4.items.length && _this4.initialIndex >= 0) {
        _this4.activeIndex = _this4.initialIndex;
      }
      _this4.startTimer();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el) (0, _resizeEvent.removeResizeListener)(this.$el, this.resetItemPosition);
    this.pauseTimer();
  }
};

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce");

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removeResizeListener = exports.addResizeListener = undefined;

var _resizeObserverPolyfill = __webpack_require__(29);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _throttleDebounce = __webpack_require__(27);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var isServer = typeof window === 'undefined';

/* istanbul ignore next */
var resizeHandler = function resizeHandler(entries) {
  for (var _iterator = entries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var entry = _ref;

    var listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(function (fn) {
        fn();
      });
    }
  }
};

/* istanbul ignore next */
var addResizeListener = exports.addResizeListener = function addResizeListener(element, fn) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new _resizeObserverPolyfill2.default((0, _throttleDebounce.debounce)(16, resizeHandler));
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
var removeResizeListener = exports.removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("resize-observer-polyfill");

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/carousel/src/main.vue?vue&type=template&id=763b8d16
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: _vm.carouselClasses,
      on: {
        mouseenter: function ($event) {
          $event.stopPropagation()
          return _vm.handleMouseEnter($event)
        },
        mouseleave: function ($event) {
          $event.stopPropagation()
          return _vm.handleMouseLeave($event)
        },
      },
    },
    [
      _c(
        "div",
        {
          staticClass: "el-carousel__container",
          style: { height: _vm.height },
        },
        [
          _vm.arrowDisplay
            ? _c("transition", { attrs: { name: "carousel-arrow-left" } }, [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          (_vm.arrow === "always" || _vm.hover) &&
                          (_vm.loop || _vm.activeIndex > 0),
                        expression:
                          "(arrow === 'always' || hover) && (loop || activeIndex > 0)",
                      },
                    ],
                    staticClass: "el-carousel__arrow el-carousel__arrow--left",
                    attrs: { type: "button" },
                    on: {
                      mouseenter: function ($event) {
                        _vm.handleButtonEnter("left")
                      },
                      mouseleave: _vm.handleButtonLeave,
                      click: function ($event) {
                        $event.stopPropagation()
                        _vm.throttledArrowClick(_vm.activeIndex - 1)
                      },
                    },
                  },
                  [_c("i", { staticClass: "el-icon-arrow-left" })]
                ),
              ])
            : _vm._e(),
          _vm.arrowDisplay
            ? _c("transition", { attrs: { name: "carousel-arrow-right" } }, [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          (_vm.arrow === "always" || _vm.hover) &&
                          (_vm.loop || _vm.activeIndex < _vm.items.length - 1),
                        expression:
                          "(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)",
                      },
                    ],
                    staticClass: "el-carousel__arrow el-carousel__arrow--right",
                    attrs: { type: "button" },
                    on: {
                      mouseenter: function ($event) {
                        _vm.handleButtonEnter("right")
                      },
                      mouseleave: _vm.handleButtonLeave,
                      click: function ($event) {
                        $event.stopPropagation()
                        _vm.throttledArrowClick(_vm.activeIndex + 1)
                      },
                    },
                  },
                  [_c("i", { staticClass: "el-icon-arrow-right" })]
                ),
              ])
            : _vm._e(),
          _vm._t("default"),
        ],
        2
      ),
      _vm.indicatorPosition !== "none"
        ? _c(
            "ul",
            { class: _vm.indicatorsClasses },
            _vm._l(_vm.items, function (item, index) {
              return _c(
                "li",
                {
                  key: index,
                  class: [
                    "el-carousel__indicator",
                    "el-carousel__indicator--" + _vm.direction,
                    { "is-active": index === _vm.activeIndex },
                  ],
                  on: {
                    mouseenter: function ($event) {
                      _vm.throttledIndicatorHover(index)
                    },
                    click: function ($event) {
                      $event.stopPropagation()
                      _vm.handleIndicatorClick(index)
                    },
                  },
                },
                [
                  _c("button", { staticClass: "el-carousel__button" }, [
                    _vm.hasLabel
                      ? _c("span", [_vm._v(_vm._s(item.label))])
                      : _vm._e(),
                  ]),
                ]
              )
            }),
            0
          )
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/carousel/src/main.vue?vue&type=template&id=763b8d16


/***/ }),

/***/ 51:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/throttle");

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(550);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_vue_vue_type_template_id_763b8d16__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(191);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _main_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _main_vue_vue_type_template_id_763b8d16__WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _main_vue_vue_type_template_id_763b8d16__WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });