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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tools = __webpack_require__(0);

//tab切换效果
var nav = document.querySelector('.hc_nav');
var spans = nav.querySelectorAll('span');
var divs = document.querySelector('.hc_wrap').querySelectorAll('div');
var moveCon = document.querySelector('.hc_wrap');
nav.addEventListener('click', function (e) {
	for (var i = 0; i < spans.length; i++) {
		spans[i].classList.remove('high');
	}
	var target = e.target;
	if (target.tagName == 'SPAN') {
		target.classList.add('high');
		var index = target.getAttribute('index');
		for (var _i = 0; _i < divs.length; _i++) {
			divs[_i].classList.remove('show');
		}
		moveCon.style.transform = 'translateX(-' + 50 * index + '%)';
		//divs[index].classList.add('show');
	}
}, false);

//点击返回按钮,返回到列表页
document.querySelector('.back').onclick = function () {
	window.location.href = './list.html';
};

//点击电话
var tel = document.querySelector('.telphone');
var tel_mark = document.querySelector('.tel_mark');
var cancel = document.querySelector('.cancel');
tel.onclick = function () {
	if (!tel_mark.classList.contains('tel_mark-show')) {
		tel_mark.classList.add('tel_mark-show');
	}
};

//点击关闭按钮,立即预订页面消失
document.querySelector('.close').onclick = function () {
	mark.classList.remove('mark-show');
};

//点击立即预定跳转到订单填写页
var imgsrc = document.querySelector('.hotelDetail_view img').getAttribute('src');
var hotelname = document.querySelector('.hotel_name').innerHTML;
var hoteladdr = document.querySelector('.hotel_addr').innerHTML;
var bed_type = document.querySelector('.bigBed').innerText;
var hotel_price = document.querySelector('.price').innerHTML;
var obj = {
	"imgsrc": imgsrc,
	"hotel_name": hotelname,
	"hotel_addr": hoteladdr,
	"bed_type": bed_type,
	"hotel_price": hotel_price
};
document.querySelector('.orderRightNow').onclick = function () {
	window.location.href = './writeOrder.html?hotel_info=' + obj;
};

cancel.onclick = function () {
	tel_mark.remove('tel_mark-show');
};

//图集轮播效果
var lookUp_pics = document.querySelector('.lookUp_pics');
var img_con = document.querySelector('.img_con');
var img_wrap = document.querySelector('.img_wrap');
lookUp_pics.onclick = function () {
	img_con.classList.add('img_con-show');
	if (document.querySelector('ul')) return;
	_tools.loading.startLoading(img_wrap);
	//ajax请求图片数据
	(0, _tools.ajax)({
		url: '../../server/banner.json',
		callback: function callback(data) {
			console.log(data);
			_tools.loading.stopLoading();
			var str = '';
			data.forEach(function (val, index) {
				str += '<li class=\'swiper-slide\'><img src="' + val.url + '"></li>';
			});
			img_wrap.innerHTML = '<ul class=\'swiper-wrapper\'>' + str + '</ul>';
			new Swiper(img_wrap, {
				loop: true
			});
		}

	});
};
//点击遮罩层消失
img_con.onclick = function () {
	img_con.classList.remove('img_con-show');
};

//获取地址栏的酒店ID,根据酒店ID,渲染相对应的酒店信息;
var hotel_id = (0, _tools.getParams)("hotel_id");
var hotelDetail_view_pic = document.querySelector('.hotelDetail_view img');
var hotel_name = document.querySelector('.hotel_name');
var hotel_rank = document.querySelector('.hotel_rank');
var hotel_tel = document.querySelector('.hotel_tel');
var hotel_addr = document.querySelector('.hotel_addr');
(0, _tools.ajax)({
	'url': '../../server/hotel.json',
	callback: function callback(data) {
		var data_josn = data.data;
		data_josn.forEach(function (val, index) {
			if (index + 1 == hotel_id) {
				hotelDetail_view_pic.src = val.image;
				hotel_name.innerHTML = val.name;
				hotel_rank.innerHTML = val.rank + '级酒店';
				hotel_tel.innerHTML = val.tel;
				hotel_addr.innerHTML = val.addr;
			}
		});
	}
});

//点击标准大床房
var ps = document.querySelector('.reserveCon').querySelectorAll('p');
var mark = document.querySelector('.mark');
var orderImg = document.querySelector('.orderImg');
var orderName = document.querySelector('.orderName');
var bedtype = document.querySelector('.bedtype');
var orderPrice = document.querySelector('.orderPrice');
var orderPromise = document.querySelector('.orderPromise');
for (var i = 0; i < ps.length; i++) {
	ps[i].onclick = function () {
		mark.classList.add('mark-show');
		orderImg.src = hotelDetail_view_pic.getAttribute('src');
		console.log(bedtype);
		bedtype.innerHTML = this.querySelector('.bigBed').innerText;
		orderPrice.innerHTML = this.querySelector('.price').innerHTML;
	};
}

//点击展开全部酒店的效果
var sp_hotel = document.querySelector('.sp_hotel');
var hotel_in_around = document.querySelector('.hotel_in_around');

sp_hotel.onclick = function () {
	if (this.innerHTML == '展开剩余全部') {
		hotel_in_around.style.height = 'auto';
		this.innerHTML = '收起';
	} else {
		hotel_in_around.style.height = '250px';
		this.innerHTML = '展开剩余全部';
	}
};

//点击展开全部床型的效果

var sp_bed = document.querySelector('.sp_bed');
var reserveCon = document.querySelector('.reserveCon');
sp_bed.onclick = function () {
	if (this.innerHTML == '展开全部') {
		reserveCon.style.height = 'auto';
		this.innerHTML = '收起';
	} else {
		reserveCon.style.height = '250px';
		this.innerHTML = '展开全部';
	}
};

/***/ })

/******/ });