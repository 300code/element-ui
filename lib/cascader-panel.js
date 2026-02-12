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
/******/ 	return __webpack_require__(__webpack_require__.s = 604);
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = {
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择',
      noData: '暂无数据'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    },
    image: {
      error: '加载失败'
    },
    pageHeader: {
      title: '返回'
    },
    popconfirm: {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    },
    empty: {
      description: '暂无数据'
    }
  }
};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("deepmerge");

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.default = function (Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = (0, _util.hasOwn)(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
};

var _util = __webpack_require__(2);

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _locale = __webpack_require__(7);

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.isMac = exports.isEmpty = exports.isEqual = exports.arrayEquals = exports.looseEqual = exports.capitalize = exports.kebabCase = exports.autoprefixer = exports.isFirefox = exports.isEdge = exports.isIE = exports.coerceTruthyValueToArray = exports.arrayFind = exports.arrayFindIndex = exports.escapeRegexpString = exports.valueEquals = exports.generateId = exports.getValueByPath = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.noop = noop;
exports.hasOwn = hasOwn;
exports.toObject = toObject;
exports.getPropByPath = getPropByPath;
exports.rafThrottle = rafThrottle;
exports.objToArray = objToArray;

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _types = __webpack_require__(4);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {};

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

function getPropByPath(obj, path, strict) {
  var tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  var keyArr = path.split('.');
  var i = 0;
  for (var len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    var key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

var generateId = exports.generateId = function generateId() {
  return Math.floor(Math.random() * 10000);
};

var valueEquals = exports.valueEquals = function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

var escapeRegexpString = exports.escapeRegexpString = function escapeRegexpString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

// TODO: use native Array.find, Array.findIndex when IE support is dropped
var arrayFindIndex = exports.arrayFindIndex = function arrayFindIndex(arr, pred) {
  for (var i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

var arrayFind = exports.arrayFind = function arrayFind(arr, pred) {
  var idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

// coerce truthy value to array
var coerceTruthyValueToArray = exports.coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

var isIE = exports.isIE = function isIE() {
  return !_vue2.default.prototype.$isServer && !isNaN(Number(document.documentMode));
};

var isEdge = exports.isEdge = function isEdge() {
  return !_vue2.default.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

var isFirefox = exports.isFirefox = function isFirefox() {
  return !_vue2.default.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};

var autoprefixer = exports.autoprefixer = function autoprefixer(style) {
  if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') return style;
  var rules = ['transform', 'transition', 'animation'];
  var prefixes = ['ms-', 'webkit-'];
  rules.forEach(function (rule) {
    var value = style[rule];
    if (rule && value) {
      prefixes.forEach(function (prefix) {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

var kebabCase = exports.kebabCase = function kebabCase(str) {
  var hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};

var capitalize = exports.capitalize = function capitalize(str) {
  if (!(0, _types.isString)(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var looseEqual = exports.looseEqual = function looseEqual(a, b) {
  var isObjectA = (0, _types.isObject)(a);
  var isObjectB = (0, _types.isObject)(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};

var arrayEquals = exports.arrayEquals = function arrayEquals(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (var i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

var isEqual = exports.isEqual = function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};

var isEmpty = exports.isEmpty = function isEmpty(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]':
      {
        return !val.size;
      }
    // Plain Object
    case '[object Object]':
      {
        return !Object.keys(val).length;
      }
  }

  return false;
};

function rafThrottle(fn) {
  var locked = false;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (locked) return;
    locked = true;
    window.requestAnimationFrame(function (_) {
      fn.apply(_this, args);
      locked = false;
    });
  };
}

function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return isEmpty(obj) ? [] : [obj];
}

var isMac = exports.isMac = function isMac() {
  return !_vue2.default.prototype.$isServer && /macintosh|mac os x/i.test(navigator.userAgent);
};

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/scrollbar");

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(248);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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

var _cascaderMenu = __webpack_require__(606);

var _cascaderMenu2 = _interopRequireDefault(_cascaderMenu);

var _store = __webpack_require__(609);

var _store2 = _interopRequireDefault(_store);

var _merge = __webpack_require__(6);

var _merge2 = _interopRequireDefault(_merge);

var _ariaUtils = __webpack_require__(39);

var _ariaUtils2 = _interopRequireDefault(_ariaUtils);

var _scrollIntoView2 = __webpack_require__(48);

var _scrollIntoView3 = _interopRequireDefault(_scrollIntoView2);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyCode = _ariaUtils2.default.keys;

var DefaultProps = {
  expandTrigger: 'click', // or hover
  multiple: false,
  checkStrictly: false, // whether all nodes can be selected
  emitPath: true, // wether to emit an array of all levels value in which node is located
  lazy: false,
  lazyLoad: _util.noop,
  value: 'value',
  label: 'label',
  children: 'children',
  leaf: 'leaf',
  disabled: 'disabled',
  hoverThreshold: 500
};

var isLeaf = function isLeaf(el) {
  return !el.getAttribute('aria-owns');
};

var getSibling = function getSibling(el, distance) {
  var parentNode = el.parentNode;

  if (parentNode) {
    var siblings = parentNode.querySelectorAll('.el-cascader-node[tabindex="-1"]');
    var index = Array.prototype.indexOf.call(siblings, el);
    return siblings[index + distance] || null;
  }
  return null;
};

var getMenuIndex = function getMenuIndex(el, distance) {
  if (!el) return;
  var pieces = el.id.split('-');
  return Number(pieces[pieces.length - 2]);
};

var focusNode = function focusNode(el) {
  if (!el) return;
  el.focus();
  !isLeaf(el) && el.click();
};

var checkNode = function checkNode(el) {
  if (!el) return;

  var input = el.querySelector('input');
  if (input) {
    input.click();
  } else if (isLeaf(el)) {
    el.click();
  }
};

exports.default = {
  name: 'ElCascaderPanel',

  components: {
    CascaderMenu: _cascaderMenu2.default
  },

  props: {
    value: {},
    options: Array,
    props: Object,
    border: {
      type: Boolean,
      default: true
    },
    renderLabel: Function
  },

  provide: function provide() {
    return {
      panel: this
    };
  },
  data: function data() {
    return {
      checkedValue: null,
      checkedNodePaths: [],
      store: [],
      menus: [],
      activePath: [],
      loadCount: 0
    };
  },


  computed: {
    config: function config() {
      return (0, _merge2.default)(_extends({}, DefaultProps), this.props || {});
    },
    multiple: function multiple() {
      return this.config.multiple;
    },
    checkStrictly: function checkStrictly() {
      return this.config.checkStrictly;
    },
    leafOnly: function leafOnly() {
      return !this.checkStrictly;
    },
    isHoverMenu: function isHoverMenu() {
      return this.config.expandTrigger === 'hover';
    },
    renderLabelFn: function renderLabelFn() {
      return this.renderLabel || this.$scopedSlots.default;
    }
  },

  watch: {
    value: function value() {
      this.syncCheckedValue();
      this.checkStrictly && this.calculateCheckedNodePaths();
    },

    options: {
      handler: function handler() {
        this.initStore();
      },
      immediate: true,
      deep: true
    },
    checkedValue: function checkedValue(val) {
      if (!(0, _util.isEqual)(val, this.value)) {
        this.checkStrictly && this.calculateCheckedNodePaths();
        this.$emit('input', val);
        this.$emit('change', val);
      }
    }
  },

  mounted: function mounted() {
    if (!this.isEmptyValue(this.value)) {
      this.syncCheckedValue();
    }
  },


  methods: {
    initStore: function initStore() {
      var config = this.config,
          options = this.options;

      if (config.lazy && (0, _util.isEmpty)(options)) {
        this.lazyLoad();
      } else {
        this.store = new _store2.default(options, config);
        this.menus = [this.store.getNodes()];
        this.syncMenuState();
      }
    },
    syncCheckedValue: function syncCheckedValue() {
      var value = this.value,
          checkedValue = this.checkedValue;

      if (!(0, _util.isEqual)(value, checkedValue)) {
        this.activePath = [];
        this.checkedValue = value;
        this.syncMenuState();
      }
    },
    syncMenuState: function syncMenuState() {
      var multiple = this.multiple,
          checkStrictly = this.checkStrictly;

      this.syncActivePath();
      multiple && this.syncMultiCheckState();
      checkStrictly && this.calculateCheckedNodePaths();
      this.$nextTick(this.scrollIntoView);
    },
    syncMultiCheckState: function syncMultiCheckState() {
      var _this = this;

      var nodes = this.getFlattedNodes(this.leafOnly);

      nodes.forEach(function (node) {
        node.syncCheckState(_this.checkedValue);
      });
    },
    isEmptyValue: function isEmptyValue(val) {
      var multiple = this.multiple,
          config = this.config;
      var emitPath = config.emitPath;

      if (multiple || emitPath) {
        return (0, _util.isEmpty)(val);
      }
      return false;
    },
    syncActivePath: function syncActivePath() {
      var _this2 = this;

      var store = this.store,
          multiple = this.multiple,
          activePath = this.activePath,
          checkedValue = this.checkedValue;


      if (!(0, _util.isEmpty)(activePath)) {
        var nodes = activePath.map(function (node) {
          return _this2.getNodeByValue(node.getValue());
        });
        this.expandNodes(nodes);
      } else if (!this.isEmptyValue(checkedValue)) {
        var value = multiple ? checkedValue[0] : checkedValue;
        var checkedNode = this.getNodeByValue(value) || {};
        var _nodes = (checkedNode.pathNodes || []).slice(0, -1);
        this.expandNodes(_nodes);
      } else {
        this.activePath = [];
        this.menus = [store.getNodes()];
      }
    },
    expandNodes: function expandNodes(nodes) {
      var _this3 = this;

      nodes.forEach(function (node) {
        return _this3.handleExpand(node, true /* silent */);
      });
    },
    calculateCheckedNodePaths: function calculateCheckedNodePaths() {
      var _this4 = this;

      var checkedValue = this.checkedValue,
          multiple = this.multiple;

      var checkedValues = multiple ? (0, _util.coerceTruthyValueToArray)(checkedValue) : [checkedValue];
      this.checkedNodePaths = checkedValues.map(function (v) {
        var checkedNode = _this4.getNodeByValue(v);
        return checkedNode ? checkedNode.pathNodes : [];
      });
    },
    handleKeyDown: function handleKeyDown(e) {
      var target = e.target,
          keyCode = e.keyCode;


      switch (keyCode) {
        case KeyCode.up:
          var prev = getSibling(target, -1);
          focusNode(prev);
          break;
        case KeyCode.down:
          var next = getSibling(target, 1);
          focusNode(next);
          break;
        case KeyCode.left:
          var preMenu = this.$refs.menu[getMenuIndex(target) - 1];
          if (preMenu) {
            var expandedNode = preMenu.$el.querySelector('.el-cascader-node[aria-expanded="true"]');
            focusNode(expandedNode);
          }
          break;
        case KeyCode.right:
          var nextMenu = this.$refs.menu[getMenuIndex(target) + 1];
          if (nextMenu) {
            var firstNode = nextMenu.$el.querySelector('.el-cascader-node[tabindex="-1"]');
            focusNode(firstNode);
          }
          break;
        case KeyCode.enter:
          checkNode(target);
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.$emit('close');
          break;
        default:
          return;
      }
    },
    handleExpand: function handleExpand(node, silent) {
      var activePath = this.activePath;
      var level = node.level;

      var path = activePath.slice(0, level - 1);
      var menus = this.menus.slice(0, level);

      if (!node.isLeaf) {
        path.push(node);
        menus.push(node.children);
      }

      this.activePath = path;
      this.menus = menus;

      if (!silent) {
        var pathValues = path.map(function (node) {
          return node.getValue();
        });
        var activePathValues = activePath.map(function (node) {
          return node.getValue();
        });
        if (!(0, _util.valueEquals)(pathValues, activePathValues)) {
          this.$emit('active-item-change', pathValues); // Deprecated
          this.$emit('expand-change', pathValues);
        }
      }
    },
    handleCheckChange: function handleCheckChange(value) {
      this.checkedValue = value;
    },
    lazyLoad: function lazyLoad(node, onFullfiled) {
      var _this5 = this;

      var config = this.config;

      if (!node) {
        node = node || { root: true, level: 0 };
        this.store = new _store2.default([], config);
        this.menus = [this.store.getNodes()];
      }
      node.loading = true;
      var resolve = function resolve(dataList) {
        var parent = node.root ? null : node;
        dataList && dataList.length && _this5.store.appendNodes(dataList, parent);
        node.loading = false;
        node.loaded = true;

        // dispose default value on lazy load mode
        if (Array.isArray(_this5.checkedValue)) {
          var nodeValue = _this5.checkedValue[_this5.loadCount++];
          var valueKey = _this5.config.value;
          var leafKey = _this5.config.leaf;

          if (Array.isArray(dataList) && dataList.filter(function (item) {
            return item[valueKey] === nodeValue;
          }).length > 0) {
            var checkedNode = _this5.store.getNodeByValue(nodeValue);

            if (!checkedNode.data[leafKey]) {
              _this5.lazyLoad(checkedNode, function () {
                _this5.handleExpand(checkedNode);
              });
            }

            if (_this5.loadCount === _this5.checkedValue.length) {
              _this5.$parent.computePresentText();
            }
          }
        }

        onFullfiled && onFullfiled(dataList);
      };
      config.lazyLoad(node, resolve);
    },


    /**
     * public methods
    */
    calculateMultiCheckedValue: function calculateMultiCheckedValue() {
      this.checkedValue = this.getCheckedNodes(this.leafOnly).map(function (node) {
        return node.getValueByOption();
      });
    },
    scrollIntoView: function scrollIntoView() {
      if (this.$isServer) return;

      var menus = this.$refs.menu || [];
      menus.forEach(function (menu) {
        var menuElement = menu.$el;
        if (menuElement) {
          var container = menuElement.querySelector('.el-scrollbar__wrap');
          var activeNode = menuElement.querySelector('.el-cascader-node.is-active') || menuElement.querySelector('.el-cascader-node.in-active-path');
          (0, _scrollIntoView3.default)(container, activeNode);
        }
      });
    },
    getNodeByValue: function getNodeByValue(val) {
      return this.store.getNodeByValue(val);
    },
    getFlattedNodes: function getFlattedNodes(leafOnly) {
      var cached = !this.config.lazy;
      return this.store.getFlattedNodes(leafOnly, cached);
    },
    getCheckedNodes: function getCheckedNodes(leafOnly) {
      var checkedValue = this.checkedValue,
          multiple = this.multiple;

      if (multiple) {
        var nodes = this.getFlattedNodes(leafOnly);
        return nodes.filter(function (node) {
          return node.checked;
        });
      } else {
        return this.isEmptyValue(checkedValue) ? [] : [this.getNodeByValue(checkedValue)];
      }
    },
    clearCheckedNodes: function clearCheckedNodes() {
      var config = this.config,
          leafOnly = this.leafOnly;
      var multiple = config.multiple,
          emitPath = config.emitPath;

      if (multiple) {
        this.getCheckedNodes(leafOnly).filter(function (node) {
          return !node.isDisabled;
        }).forEach(function (node) {
          return node.doCheck(false);
        });
        this.calculateMultiCheckedValue();
      } else {
        this.checkedValue = emitPath ? [] : null;
      }
    }
  }
};

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/checkbox");

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _babelHelperVueJsxMergeProps = __webpack_require__(56);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _scrollbar = __webpack_require__(21);

var _scrollbar2 = _interopRequireDefault(_scrollbar);

var _cascaderNode = __webpack_require__(607);

var _cascaderNode2 = _interopRequireDefault(_cascaderNode);

var _locale = __webpack_require__(14);

var _locale2 = _interopRequireDefault(_locale);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElCascaderMenu',

  mixins: [_locale2.default],

  inject: ['panel'],

  components: {
    ElScrollbar: _scrollbar2.default,
    CascaderNode: _cascaderNode2.default
  },

  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },

  data: function data() {
    return {
      activeNode: null,
      hoverTimer: null,
      id: (0, _util.generateId)()
    };
  },


  computed: {
    isEmpty: function isEmpty() {
      return !this.nodes.length;
    },
    menuId: function menuId() {
      return 'cascader-menu-' + this.id + '-' + this.index;
    }
  },

  methods: {
    handleExpand: function handleExpand(e) {
      this.activeNode = e.target;
    },
    handleMouseMove: function handleMouseMove(e) {
      var activeNode = this.activeNode,
          hoverTimer = this.hoverTimer;
      var hoverZone = this.$refs.hoverZone;


      if (!activeNode || !hoverZone) return;

      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);

        var _$el$getBoundingClien = this.$el.getBoundingClientRect(),
            left = _$el$getBoundingClien.left;

        var startX = e.clientX - left;
        var _$el = this.$el,
            offsetWidth = _$el.offsetWidth,
            offsetHeight = _$el.offsetHeight;

        var top = activeNode.offsetTop;
        var bottom = top + activeNode.offsetHeight;

        hoverZone.innerHTML = '\n          <path style="pointer-events: auto;" fill="transparent" d="M' + startX + ' ' + top + ' L' + offsetWidth + ' 0 V' + top + ' Z" />\n          <path style="pointer-events: auto;" fill="transparent" d="M' + startX + ' ' + bottom + ' L' + offsetWidth + ' ' + offsetHeight + ' V' + bottom + ' Z" />\n        ';
      } else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, this.panel.config.hoverThreshold);
      }
    },
    clearHoverZone: function clearHoverZone() {
      var hoverZone = this.$refs.hoverZone;

      if (!hoverZone) return;
      hoverZone.innerHTML = '';
    },
    renderEmptyText: function renderEmptyText(h) {
      return h(
        'div',
        { 'class': 'el-cascader-menu__empty-text' },
        [this.t('el.cascader.noData')]
      );
    },
    renderNodeList: function renderNodeList(h) {
      var menuId = this.menuId;
      var isHoverMenu = this.panel.isHoverMenu;

      var events = { on: {} };

      if (isHoverMenu) {
        events.on.expand = this.handleExpand;
      }

      var nodes = this.nodes.map(function (node, index) {
        var hasChildren = node.hasChildren;

        return h('cascader-node', (0, _babelHelperVueJsxMergeProps2.default)([{
          key: node.uid,
          attrs: { node: node,
            'node-id': menuId + '-' + index,
            'aria-haspopup': hasChildren,
            'aria-owns': hasChildren ? menuId : null
          }
        }, events]));
      });

      return [].concat(nodes, [isHoverMenu ? h('svg', { ref: 'hoverZone', 'class': 'el-cascader-menu__hover-zone' }) : null]);
    }
  },

  render: function render(h) {
    var isEmpty = this.isEmpty,
        menuId = this.menuId;

    var events = { nativeOn: {} };

    // optimize hover to expand experience (#8010)
    if (this.panel.isHoverMenu) {
      events.nativeOn.mousemove = this.handleMouseMove;
      // events.nativeOn.mouseleave = this.clearHoverZone;
    }

    return h(
      'el-scrollbar',
      (0, _babelHelperVueJsxMergeProps2.default)([{
        attrs: {
          tag: 'ul',
          role: 'menu',
          id: menuId,

          'wrap-class': 'el-cascader-menu__wrap',
          'view-class': {
            'el-cascader-menu__list': true,
            'is-empty': isEmpty
          }
        },
        'class': 'el-cascader-menu' }, events]),
      [isEmpty ? this.renderEmptyText(h) : this.renderNodeList(h)]
    );
  }
};

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(252);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _babelHelperVueJsxMergeProps = __webpack_require__(56);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _checkbox = __webpack_require__(25);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = __webpack_require__(608);

var _radio2 = _interopRequireDefault(_radio);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

exports.default = {
  inject: ['panel'],

  components: {
    ElCheckbox: _checkbox2.default,
    ElRadio: _radio2.default
  },

  props: {
    node: {
      required: true
    },
    nodeId: String
  },

  computed: {
    config: function config() {
      return this.panel.config;
    },
    isLeaf: function isLeaf() {
      return this.node.isLeaf;
    },
    isDisabled: function isDisabled() {
      return this.node.isDisabled;
    },
    checkedValue: function checkedValue() {
      return this.panel.checkedValue;
    },
    isChecked: function isChecked() {
      return this.node.isSameNode(this.checkedValue);
    },
    inActivePath: function inActivePath() {
      return this.isInPath(this.panel.activePath);
    },
    inCheckedPath: function inCheckedPath() {
      var _this = this;

      if (!this.config.checkStrictly) return false;

      return this.panel.checkedNodePaths.some(function (checkedPath) {
        return _this.isInPath(checkedPath);
      });
    },
    value: function value() {
      return this.node.getValueByOption();
    }
  },

  methods: {
    handleExpand: function handleExpand() {
      var _this2 = this;

      var panel = this.panel,
          node = this.node,
          isDisabled = this.isDisabled,
          config = this.config;
      var multiple = config.multiple,
          checkStrictly = config.checkStrictly;


      if (!checkStrictly && isDisabled || node.loading) return;

      if (config.lazy && !node.loaded) {
        panel.lazyLoad(node, function () {
          // do not use cached leaf value here, invoke this.isLeaf to get new value.
          var isLeaf = _this2.isLeaf;


          if (!isLeaf) _this2.handleExpand();
          if (multiple) {
            // if leaf sync checked state, else clear checked state
            var checked = isLeaf ? node.checked : false;
            _this2.handleMultiCheckChange(checked);
          }
        });
      } else {
        panel.handleExpand(node);
      }
    },
    handleCheckChange: function handleCheckChange() {
      var panel = this.panel,
          value = this.value,
          node = this.node;

      panel.handleCheckChange(value);
      panel.handleExpand(node);
    },
    handleMultiCheckChange: function handleMultiCheckChange(checked) {
      this.node.doCheck(checked);
      this.panel.calculateMultiCheckedValue();
    },
    isInPath: function isInPath(pathNodes) {
      var node = this.node;

      var selectedPathNode = pathNodes[node.level - 1] || {};
      return selectedPathNode.uid === node.uid;
    },
    renderPrefix: function renderPrefix(h) {
      var isLeaf = this.isLeaf,
          isChecked = this.isChecked,
          config = this.config;
      var checkStrictly = config.checkStrictly,
          multiple = config.multiple;


      if (multiple) {
        return this.renderCheckbox(h);
      } else if (checkStrictly) {
        return this.renderRadio(h);
      } else if (isLeaf && isChecked) {
        return this.renderCheckIcon(h);
      }

      return null;
    },
    renderPostfix: function renderPostfix(h) {
      var node = this.node,
          isLeaf = this.isLeaf;


      if (node.loading) {
        return this.renderLoadingIcon(h);
      } else if (!isLeaf) {
        return this.renderExpandIcon(h);
      }

      return null;
    },
    renderCheckbox: function renderCheckbox(h) {
      var node = this.node,
          config = this.config,
          isDisabled = this.isDisabled;

      var events = {
        on: { change: this.handleMultiCheckChange },
        nativeOn: {}
      };

      if (config.checkStrictly) {
        // when every node is selectable, click event should not trigger expand event.
        events.nativeOn.click = stopPropagation;
      }

      return h('el-checkbox', (0, _babelHelperVueJsxMergeProps2.default)([{
        attrs: {
          value: node.checked,
          indeterminate: node.indeterminate,
          disabled: isDisabled
        }
      }, events]));
    },
    renderRadio: function renderRadio(h) {
      var checkedValue = this.checkedValue,
          value = this.value,
          isDisabled = this.isDisabled;

      // to keep same reference if value cause radio's checked state is calculated by reference comparision;

      if ((0, _util.isEqual)(value, checkedValue)) {
        value = checkedValue;
      }

      return h(
        'el-radio',
        {
          attrs: {
            value: checkedValue,
            label: value,
            disabled: isDisabled
          },
          on: {
            'change': this.handleCheckChange
          },
          nativeOn: {
            'click': stopPropagation
          }
        },
        [h('span')]
      );
    },
    renderCheckIcon: function renderCheckIcon(h) {
      return h('i', { 'class': 'el-icon-check el-cascader-node__prefix' });
    },
    renderLoadingIcon: function renderLoadingIcon(h) {
      return h('i', { 'class': 'el-icon-loading el-cascader-node__postfix' });
    },
    renderExpandIcon: function renderExpandIcon(h) {
      return h('i', { 'class': 'el-icon-arrow-right el-cascader-node__postfix' });
    },
    renderContent: function renderContent(h) {
      var panel = this.panel,
          node = this.node;

      var render = panel.renderLabelFn;
      var vnode = render ? render({ node: node, data: node.data }) : null;

      return h(
        'span',
        { 'class': 'el-cascader-node__label' },
        [vnode || node.label]
      );
    }
  },

  render: function render(h) {
    var _this3 = this;

    var inActivePath = this.inActivePath,
        inCheckedPath = this.inCheckedPath,
        isChecked = this.isChecked,
        isLeaf = this.isLeaf,
        isDisabled = this.isDisabled,
        config = this.config,
        nodeId = this.nodeId;
    var expandTrigger = config.expandTrigger,
        checkStrictly = config.checkStrictly,
        multiple = config.multiple;

    var disabled = !checkStrictly && isDisabled;
    var events = { on: {} };

    if (expandTrigger === 'click') {
      events.on.click = this.handleExpand;
    } else {
      events.on.mouseenter = function (e) {
        _this3.handleExpand();
        _this3.$emit('expand', e);
      };
      events.on.focus = function (e) {
        _this3.handleExpand();
        _this3.$emit('expand', e);
      };
    }
    if (isLeaf && !isDisabled && !checkStrictly && !multiple) {
      events.on.click = this.handleCheckChange;
    }

    return h(
      'li',
      (0, _babelHelperVueJsxMergeProps2.default)([{
        attrs: {
          role: 'menuitem',
          id: nodeId,
          'aria-expanded': inActivePath,
          tabindex: disabled ? null : -1
        },
        'class': {
          'el-cascader-node': true,
          'is-selectable': checkStrictly,
          'in-active-path': inActivePath,
          'in-checked-path': inCheckedPath,
          'is-active': isChecked,
          'is-disabled': disabled
        }
      }, events]),
      [this.renderPrefix(h), this.renderContent(h), this.renderPostfix(h)]
    );
  }
};

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/cascader-panel/src/cascader-panel.vue?vue&type=template&id=1bbaebbc
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: ["el-cascader-panel", _vm.border && "is-bordered"],
      on: { keydown: _vm.handleKeyDown },
    },
    _vm._l(_vm.menus, function (menu, index) {
      return _c("cascader-menu", {
        key: index,
        ref: "menu",
        refInFor: true,
        attrs: { index: index, nodes: menu },
      })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/cascader-panel/src/cascader-panel.vue?vue&type=template&id=1bbaebbc


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var aria = aria || {};

aria.Utils = aria.Utils || {};

/**
 * @desc Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */
aria.Utils.focusFirstDescendant = function (element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Find the last descendant node that is focusable.
 * @param element
 *          DOM node for which to find the last focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */

aria.Utils.focusLastDescendant = function (element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns
 *  true if element is focused.
 */
aria.Utils.attemptFocus = function (element) {
  if (!aria.Utils.isFocusable(element)) {
    return false;
  }
  aria.Utils.IgnoreUtilFocusChanges = true;
  try {
    element.focus();
  } catch (e) {}
  aria.Utils.IgnoreUtilFocusChanges = false;
  return document.activeElement === element;
};

aria.Utils.isFocusable = function (element) {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute('tabIndex') !== null) {
    return true;
  }

  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
      return element.type !== 'hidden' && element.type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
aria.Utils.triggerEvent = function (elm, name) {
  var eventName = void 0;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  var evt = document.createEvent(eventName);

  for (var _len = arguments.length, opts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    opts[_key - 2] = arguments[_key];
  }

  evt.initEvent.apply(evt, [name].concat(opts));
  elm.dispatchEvent ? elm.dispatchEvent(evt) : elm.fireEvent('on' + name, evt);

  return elm;
};

aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27
};

exports.default = aria.Utils;

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.isDefined = exports.isUndefined = exports.isFunction = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.isString = isString;
exports.isObject = isObject;
exports.isHtmlElement = isHtmlElement;

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

/**
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
var isFunction = function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

if ( true && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) !== 'object' && (_vue2.default.prototype.$isServer || typeof document.childNodes !== 'function')) {
  exports.isFunction = isFunction = function isFunction(obj) {
    return typeof obj === 'function' || false;
  };
}

exports.isFunction = isFunction;
var isUndefined = exports.isUndefined = function isUndefined(val) {
  return val === void 0;
};

var isDefined = exports.isDefined = function isDefined(val) {
  return val !== undefined && val !== null;
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDef = isDef;
exports.isKorean = isKorean;
function isDef(val) {
  return val !== undefined && val !== null;
}
function isKorean(text) {
  var reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = scrollIntoView;

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function scrollIntoView(container, selected) {
  if (_vue2.default.prototype.$isServer) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  var offsetParents = [];
  var pointer = selected.offsetParent;
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  var top = selected.offsetTop + offsetParents.reduce(function (prev, curr) {
    return prev + curr.offsetTop;
  }, 0);
  var bottom = top + selected.offsetHeight;
  var viewRectTop = container.scrollTop;
  var viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

;

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _cascaderPanel = __webpack_require__(605);

var _cascaderPanel2 = _interopRequireDefault(_cascaderPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_cascaderPanel2.default.install = function (Vue) {
  Vue.component(_cascaderPanel2.default.name, _cascaderPanel2.default);
};

exports.default = _cascaderPanel2.default;

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cascader_panel_vue_vue_type_template_id_1bbaebbc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(340);
/* harmony import */ var _cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(247);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _cascader_panel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _cascader_panel_vue_vue_type_template_id_1bbaebbc__WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _cascader_panel_vue_vue_type_template_id_1bbaebbc__WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _cascader_menu_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(251);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _cascader_node_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 608:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/radio");

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _node = __webpack_require__(610);

var _node2 = _interopRequireDefault(_node);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flatNodes = function flatNodes(data, leafOnly) {
  return data.reduce(function (res, node) {
    if (node.isLeaf) {
      res.push(node);
    } else {
      !leafOnly && res.push(node);
      res = res.concat(flatNodes(node.children, leafOnly));
    }
    return res;
  }, []);
};

var Store = function () {
  function Store(data, config) {
    _classCallCheck(this, Store);

    this.config = config;
    this.initNodes(data);
  }

  Store.prototype.initNodes = function initNodes(data) {
    var _this = this;

    data = (0, _util.coerceTruthyValueToArray)(data);
    this.nodes = data.map(function (nodeData) {
      return new _node2.default(nodeData, _this.config);
    });
    this.flattedNodes = this.getFlattedNodes(false, false);
    this.leafNodes = this.getFlattedNodes(true, false);
  };

  Store.prototype.appendNode = function appendNode(nodeData, parentNode) {
    var node = new _node2.default(nodeData, this.config, parentNode);
    var children = parentNode ? parentNode.children : this.nodes;

    children.push(node);
  };

  Store.prototype.appendNodes = function appendNodes(nodeDataList, parentNode) {
    var _this2 = this;

    nodeDataList = (0, _util.coerceTruthyValueToArray)(nodeDataList);
    nodeDataList.forEach(function (nodeData) {
      return _this2.appendNode(nodeData, parentNode);
    });
  };

  Store.prototype.getNodes = function getNodes() {
    return this.nodes;
  };

  Store.prototype.getFlattedNodes = function getFlattedNodes(leafOnly) {
    var cached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var cachedNodes = leafOnly ? this.leafNodes : this.flattedNodes;
    return cached ? cachedNodes : flatNodes(this.nodes, leafOnly);
  };

  Store.prototype.getNodeByValue = function getNodeByValue(value) {
    var nodes = this.getFlattedNodes(false, !this.config.lazy).filter(function (node) {
      return (0, _util.valueEquals)(node.path, value) || node.value === value;
    });
    return nodes && nodes.length ? nodes[0] : null;
  };

  return Store;
}();

exports.default = Store;

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _shared = __webpack_require__(41);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var Node = function () {
  function Node(data, config, parentNode) {
    _classCallCheck(this, Node);

    this.data = data;
    this.config = config;
    this.parent = parentNode || null;
    this.level = !this.parent ? 1 : this.parent.level + 1;
    this.uid = uid++;

    this.initState();
    this.initChildren();
  }

  Node.prototype.initState = function initState() {
    var _config = this.config,
        valueKey = _config.value,
        labelKey = _config.label;


    this.value = this.data[valueKey];
    this.label = this.data[labelKey];
    this.pathNodes = this.calculatePathNodes();
    this.path = this.pathNodes.map(function (node) {
      return node.value;
    });
    this.pathLabels = this.pathNodes.map(function (node) {
      return node.label;
    });

    // lazy load
    this.loading = false;
    this.loaded = false;
  };

  Node.prototype.initChildren = function initChildren() {
    var _this = this;

    var config = this.config;

    var childrenKey = config.children;
    var childrenData = this.data[childrenKey];
    this.hasChildren = Array.isArray(childrenData);
    this.children = (childrenData || []).map(function (child) {
      return new Node(child, config, _this);
    });
  };

  Node.prototype.calculatePathNodes = function calculatePathNodes() {
    var nodes = [this];
    var parent = this.parent;

    while (parent) {
      nodes.unshift(parent);
      parent = parent.parent;
    }

    return nodes;
  };

  Node.prototype.getPath = function getPath() {
    return this.path;
  };

  Node.prototype.getValue = function getValue() {
    return this.value;
  };

  Node.prototype.getValueByOption = function getValueByOption() {
    return this.config.emitPath ? this.getPath() : this.getValue();
  };

  Node.prototype.getText = function getText(allLevels, separator) {
    return allLevels ? this.pathLabels.join(separator) : this.label;
  };

  Node.prototype.isSameNode = function isSameNode(checkedValue) {
    var value = this.getValueByOption();
    return this.config.multiple && Array.isArray(checkedValue) ? checkedValue.some(function (val) {
      return (0, _util.isEqual)(val, value);
    }) : (0, _util.isEqual)(checkedValue, value);
  };

  Node.prototype.broadcast = function broadcast(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var handlerName = 'onParent' + (0, _util.capitalize)(event);

    this.children.forEach(function (child) {
      if (child) {
        // bottom up
        child.broadcast.apply(child, [event].concat(args));
        child[handlerName] && child[handlerName].apply(child, args);
      }
    });
  };

  Node.prototype.emit = function emit(event) {
    var parent = this.parent;

    var handlerName = 'onChild' + (0, _util.capitalize)(event);
    if (parent) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      parent[handlerName] && parent[handlerName].apply(parent, args);
      parent.emit.apply(parent, [event].concat(args));
    }
  };

  Node.prototype.onParentCheck = function onParentCheck(checked) {
    if (!this.isDisabled) {
      this.setCheckState(checked);
    }
  };

  Node.prototype.onChildCheck = function onChildCheck() {
    var children = this.children;

    var validChildren = children.filter(function (child) {
      return !child.isDisabled;
    });
    var checked = validChildren.length ? validChildren.every(function (child) {
      return child.checked;
    }) : false;

    this.setCheckState(checked);
  };

  Node.prototype.setCheckState = function setCheckState(checked) {
    var totalNum = this.children.length;
    var checkedNum = this.children.reduce(function (c, p) {
      var num = p.checked ? 1 : p.indeterminate ? 0.5 : 0;
      return c + num;
    }, 0);

    this.checked = checked;
    this.indeterminate = checkedNum !== totalNum && checkedNum > 0;
  };

  Node.prototype.syncCheckState = function syncCheckState(checkedValue) {
    var value = this.getValueByOption();
    var checked = this.isSameNode(checkedValue, value);

    this.doCheck(checked);
  };

  Node.prototype.doCheck = function doCheck(checked) {
    if (this.checked !== checked) {
      if (this.config.checkStrictly) {
        this.checked = checked;
      } else {
        // bottom up to unify the calculation of the indeterminate state
        this.broadcast('check', checked);
        this.setCheckState(checked);
        this.emit('check');
      }
    }
  };

  _createClass(Node, [{
    key: 'isDisabled',
    get: function get() {
      var data = this.data,
          parent = this.parent,
          config = this.config;

      var disabledKey = config.disabled;
      var checkStrictly = config.checkStrictly;

      return data[disabledKey] || !checkStrictly && parent && parent.isDisabled;
    }
  }, {
    key: 'isLeaf',
    get: function get() {
      var data = this.data,
          loaded = this.loaded,
          hasChildren = this.hasChildren,
          children = this.children;
      var _config2 = this.config,
          lazy = _config2.lazy,
          leafKey = _config2.leaf;

      if (lazy) {
        var isLeaf = (0, _shared.isDef)(data[leafKey]) ? data[leafKey] : loaded ? !children.length : false;
        this.hasChildren = !isLeaf;
        return isLeaf;
      }
      return !hasChildren;
    }
  }]);

  return Node;
}();

exports.default = Node;

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.i18n = exports.use = exports.t = undefined;

var _zhCN = __webpack_require__(11);

var _zhCN2 = _interopRequireDefault(_zhCN);

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _deepmerge = __webpack_require__(12);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _format = __webpack_require__(13);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var format = (0, _format2.default)(_vue2.default);
var lang = _zhCN2.default;
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || _vue2.default).$t;
  if (typeof vuei18n === 'function' && !!_vue2.default.locale) {
    if (!merged) {
      merged = true;
      _vue2.default.locale(_vue2.default.config.lang, (0, _deepmerge2.default)(lang, _vue2.default.locale(_vue2.default.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = exports.t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = exports.use = function use(l) {
  lang = l || lang;
};

var i18n = exports.i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

exports.default = { use: use, t: t, i18n: i18n };

/***/ })

/******/ });