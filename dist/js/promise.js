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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SlideSelector = function SlideSelector() {};

SlideSelector.prototype = {
    tpl: function tpl(title, list) {
        return '<div class="slide-wrapper">\n                <div class="header">\n                    <span class="cancel">\u53D6\u6D88</span>\n                    <span class="title">' + title + '</span>\n                    <span class="done">\u786E\u5B9A</span>\n                </div>\n                <div class="slide-items">\n                    <ul>\n                        ' + list.map(function (value, index) {
            return '<li class="slide-item">' + value + '</li>';
        }).join('') + '\n                    </ul>\n                </div>\n            </div>';
    },
    init: function init() {
        var defaults = {
            container: document.body,
            list: [1, 2, 3],
            title: '选择数据'
        };
        var options = this.options;
        options = Object.assign({}, defaults, options);
        this.container = typeof options.container == 'string' ? document.querySelector(options.container) : options.container;

        this.options = options;

        var slideContainer = this.container.querySelector('.slide-selector');
        if (slideContainer) {
            this.slideContainer = slideContainer;
        } else {
            var _slideContainer = document.createElement('div');
            _slideContainer.className = 'slide-selector none';
            this.container.appendChild(_slideContainer);
            this.slideContainer = _slideContainer;
        }
    },
    render: function render() {
        var opt = this.options;
        this.slideContainer.innerHTML = this.tpl(opt.title, opt.list);
    },
    bindEvent: function bindEvent() {
        var _this = this;

        this.cancel.addEventListener('click', function () {
            _this.hide();
        }, false);
        this.done.addEventListener('click', function () {
            _this.selected_value && _this.options.callback(_this.selected_value);
            _this.hide();
        }, false);
        this.wrap.addEventListener(this.transEnd, function () {
            //animationEnd
            if (_this.onhide) {
                _this.remove();
            }
        }, false);

        var slide_item = this.wrap.querySelectorAll('.slide-item');
        this.wrap.querySelector('.slide-items').addEventListener('click', function (e) {
            var target = e.target;

            if (target.tagName == 'LI') {
                for (var i = 0; i < slide_item.length; i++) {
                    slide_item[i].classList.remove('slide-selected');
                }
                target.classList.add('slide-selected');

                _this.selected_value = target.innerHTML;
            }
        }, false);
    },
    transEnd: function () {
        var bs = document.createElement('bootstrap');
        var transitions = {
            'WebkitTransform': 'webkitTransitionEnd',
            'OTransform': 'oTransitionEnd',
            'MozTransform': 'TransitionEnd',
            'MsTransform': 'msTransitionEnd',
            'transform': 'transitionEnd'
        };
        for (var k in transitions) {
            if (bs.style[k] != undefined) {
                return transitions[k];
            }
        }
    }(),
    show: function show(options) {
        this.options = options;
        //根据show传进来的配置进行后续操作
        this.init();

        this.render();

        this.slideContainer.classList.remove('none');

        this.selected_value = null;

        var wrap = this.slideContainer.querySelector('.slide-wrapper');
        this.cancel = wrap.querySelector('.cancel');
        this.done = wrap.querySelector('.done');

        this.wrap = wrap;
        setTimeout(function () {
            wrap.classList.add('slide-wrapper-show');
        }, 10);

        this.bindEvent();
    },

    hide: function hide() {
        this.onhide = true;
        this.wrap.classList.remove('slide-wrapper-show');
    },
    remove: function remove() {
        this.slideContainer.classList.add('none');
        this.onhide = false;
    }

};

exports.SlideSelector = SlideSelector;

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slideSelector = __webpack_require__(2);

//点击担保交易
var certain = document.querySelector('.order');
certain.onclick = function () {
	window.location.href = './success.html';
};

//选择银行
var selectBank = document.querySelector('.moreBank');
var currentBank = document.querySelector('.currentBank');
var slideSelector = new _slideSelector.SlideSelector();

selectBank.onclick = function () {
	slideSelector.show({
		list: ['中国农业银行', '中国工商银行', '中国邮政储蓄银行', '中国建设银行', '中国民生银行', '中国交通银行', '中国银行'],
		callback: function callback(data) {
			currentBank.value = data;
		}
	});
};

//选择证件

var selectCard = document.querySelector('.moreCard');
var currentCard = document.querySelector('.currentCard');

selectCard.onclick = function () {
	slideSelector.show({
		list: ['结婚证', '护照', '工作证', '军人证', '学生证', '港澳通行证', '身份证'],
		callback: function callback(data) {
			currentCard.value = data;
		}
	});
};

/***/ })

/******/ });