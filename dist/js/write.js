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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//ajax封装
function ajax(options) {
	var defaults = {
		type: 'get' || options.type,
		url: '',
		params: null,
		callback: function callback() {}
	};
	var obj = Object.assign({}, defaults, options);
	var xhr = new XMLHttpRequest();
	if (obj.type == 'get' && obj.params) {
		var params_str = '';
		for (var i = 0; i < obj.params.length; i++) {
			params_str += i + '=' + obj.params[i];
		}
		xhr.open(obj.type, obj.url + params_str, true);
		xhr.send();
	} else {
		xhr.open(obj.type, obj.url, true);
		xhr.send(obj.params);
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			obj.callback(JSON.parse(xhr.responseText));
		}
	};
}

//封装一个跨域请求的方法
function jsonp(url, callback) {
	window.jsonp_callback = function (data) {
		callback(data);
	};
	var s = document.createElement('script');
	s.src = url + '&callback=jsonp_callback';
	document.body.appendChild(s);
}

//封装一个获取地址栏参数的方法
function getParams(str) {
	console.log(window);
	var params = decodeURIComponent(location.search.slice(1));
	var arr = params.split('&');
	var obj = {};
	arr.forEach(function (val, index) {
		var tmp = val.split('=');
		obj[tmp[0]] = tmp[1];
	});
	if (str) {
		return obj[str];
	} else {
		return obj;
	}
}

//封装一个加载动画的方法
function loadingAnimate() {
	var tpl = '<div class=\'load_wrap\'>\n\t\t\t\t<div class="circle circle-index1"></div>\n\t\t\t\t<div class="circle circle-index2"></div>\n\t\t\t\t<div class="circle circle-index3"></div>\n\t\t\t\t<div class="circle circle-index4"></div>\n\t\t\t\t<div class="circle circle-index5"></div>\n\t\t\t\t<div class="circle circle-index6"></div>\n\t\t\t\t<div class="circle circle-index7"></div>\n\t\t\t\t<div class="circle circle-index8"></div>\n\t\t\t</div>';

	var load = document.createElement('div');
	load.className = 'loading';
	load.innerHTML = tpl;
	this.startLoading = function (container) {
		var parentDom = void 0;
		if (typeof container == 'string') {
			parentDom = document.querySelector(container);
		} else if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) == 'object') {
			parentDom = container;
		} else {
			parentDom = document.querySelector('container');
		}
		this.parentDom = parentDom;
		parentDom.appendChild(load);
	};
	this.stopLoading = function () {
		this.parentDom.removeChild(load);
	};
}

var element = function element(cls) {
	var ele = document.querySelectorAll(cls);
	if (!Node.prototype.bind) {
		Node.prototype.bind = function (event, ele, callback) {
			this.addEventListener('click', function (e) {
				if (e.target.tagName.toLowerCase() == ele) {
					callback(e, ele);
				}
			}, false);
		};
	}
	if (!NodeList.prototype.bind) {
		NodeList.prototype.bind = function (event, ele, callback) {
			this.forEach(function (ele, index) {
				ele.addEventListener('click', function () {
					callback(ele, index);
				}, false);
			});
		};
	}

	if (ele.length == 1) {
		return ele[0];
	} else {
		return ele;
	}
};

var loading = new loadingAnimate();

exports.ajax = ajax;
exports.jsonp = jsonp;
exports.getParams = getParams;
exports.loading = loading;
exports.element = element;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slideSelector = __webpack_require__(2);

var _tools = __webpack_require__(0);

//点击返回按钮弹出是否退出订单填写的蒙版
var parentEle = document.querySelector('.writeOrder_wrap');
var write_mark = document.querySelector('.write_mark');
parentEle.addEventListener('click', function (e) {
	var target = e.target;
	if (target.classList.contains('write_back')) {
		write_mark.classList.add('write_mark-show');
	}
}, false);

//点击否时,停留在当前的订单填写页
var deny = document.querySelector('.deny');
deny.onclick = function () {
	write_mark.classList.remove('write_mark-show');
};
//点击时的时候,返回到酒店详情页
var certain = document.querySelector('.certain');
certain.onclick = function () {
	window.location.href = './hotel_detail.html';
};

//点击立即预定时,跳转到担保交易的页面
var promise = document.querySelector('.order');
promise.onclick = function () {
	window.location.href = './promise.html';
};

//点击房间数量或者到店时间时,弹出供用户选择的交互界面
var slideSelector = new _slideSelector.SlideSelector();
var rooomCount = document.querySelector('.hotel_count').querySelector('spam');
rooomCount.onclick = function () {
	slideSelector.show({
		list: [1, 2, 3, 4, 5, 6],
		callback: function callback(data) {
			rooomCount.innerText = data;
			var person_info_wrap = document.querySelector('.person_info_wrap');
			var str = '';
			for (var i = 0; i < data * 1; i++) {
				str += '<div class=\'wrap\'>\n\t\t\t\t\t\t<div class=\'person_name\'>\n\t\t\t\t\t\t\t<label>\u59D3\u540D</label>\n\t\t\t\t\t\t\t<input type="text" placeholder="\u8054\u7CFB\u4EBA\u59D3\u540D">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\'iphone\'>\n\t\t\t\t\t\t\t<label>\u624B\u673A</label>\n\t\t\t\t\t\t\t<input type="number" placeholder="\u7528\u4E8E\u63A5\u6536\u901A\u77E5\u77ED\u4FE1">\n\t\t\t\t\t\t\t<span class=\'close\'>X</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t  </div>';
			}
			person_info_wrap.innerHTML = str;
		}
	});
};

//到店时间选择
var timeToHotel = document.querySelector('.endTime span');
timeToHotel.onclick = function () {
	slideSelector.show({
		list: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
		callback: function callback(data) {
			timeToHotel.innerText = data;
		}
	});
};

//根据详情页的数据信息,渲染订单填写页的部分结构
console.log((0, _tools.getParams)('hotel_info'));
console.log(JSON.parse((0, _tools.getParams)('hotel_info')));

/***/ }),

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

/***/ })

/******/ });