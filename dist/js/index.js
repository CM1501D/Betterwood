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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mycalendar = exports.mycalendar = function () {
	function mycalendar(options) {
		_classCallCheck(this, mycalendar);

		var defaults = {
			initDate: new Date(),
			callback: function callback() {}
		};
		var opt = Object.assign({}, defaults, options);
		var year = opt.initDate.getFullYear();
		var month = opt.initDate.getMonth() + 1;
		this.year = year;
		this.month = month;
		this.day = opt.initDate.getDate();
		this.checkInDate = document.querySelector('.check-in-date');
		this.check = document.querySelector('.checkDate');
		this.calendarWrap = document.querySelector('#calendar-wrap');
		this.calendarTitle = document.querySelector('.calendar_title');
		this.check_InDate = document.querySelector('.check-inDate');
		this.callback = opt.callback;
		this.render(year, month);
		this.updateTitle(year, month);
		this.bindEvent();
	}

	//获取一个月的天数


	_createClass(mycalendar, [{
		key: 'getDays',
		value: function getDays(year, month) {
			var days31 = [1, 3, 5, 7, 8, 12];
			var days30 = [4, 6, 8, 10];
			var days = null;
			if (this.month == 2) {
				if (this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0) {
					days = 29;
				} else {
					days = 28;
				}
			} else {
				if (days31.indexOf(this.month) > -1) {
					days = 31;
				} else {
					days = 30;
				}
			}
			return days;
		}
	}, {
		key: 'updateTitle',
		value: function updateTitle(year, month) {
			this.calendarTitle.querySelector('h3').innerHTML = year + '年' + month + '月';
		}

		//获取当月的第一天是星期几 (也就是上个月在本月剩了多少天)

	}, {
		key: 'startInOneMonth',
		value: function startInOneMonth(year, month) {
			var date = new Date(year + '/' + month + '/' + 1);
			return date.getDay();
		}

		//渲染上个月(上月在本月剩余的天数=上个月的天数-本月的第一天是星期几)

	}, {
		key: 'renderPrevMonth',
		value: function renderPrevMonth(year, month) {
			var prevMonth = new Date(year + '/' + (month - 1));
			var prevMonthDays = this.getDays(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
			var leftDays = this.startInOneMonth(year, month);
			var str = '';
			leftDays -= 1;
			while (leftDays >= 0) {
				str += '<span class=\'togray calendar-day\'>' + (prevMonthDays - leftDays) + '</span>';
				leftDays--;
			}
			return str;
		}

		//渲染当前月

	}, {
		key: 'renderCurrentMonth',
		value: function renderCurrentMonth(year, month) {
			var str = '',
			    start = 1;
			var days = this.getDays(year, month);
			while (start <= days) {
				if (start == this.day) {
					str += '<span class=\'calendar-day high\'>' + start + '</span>';
				} else if (start < this.day) {
					str += '<span class=\'calendar-day over\'>' + start + '</span>';
				} else {
					str += '<span class=\'calendar-day\'>' + start + '</span>';
				}

				start++;
			}
			return str;
		}
	}, {
		key: 'render',
		value: function render(year, month) {
			document.querySelector('.calendar_month').innerHTML = this.renderPrevMonth(year, month) + this.renderCurrentMonth(year, month);
		}
	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this = this;

			this.calendarWrap.addEventListener('click', function (e) {
				var target = e.target;
				if (target.classList.contains('calendar-day') && !target.classList.contains('togray') && !target.classList.contains('over')) {
					document.querySelector('.high').classList.remove('high');
					target.classList.add('high');
					_this.check_in_ele.innerHTML = _this.month + '月' + target.innerHTML + '日';
					_this.check.innerHTML = _this.month + '月' + document.querySelector('.high').innerHTML + '日';
				}
				if (target.classList.contains('prev')) {
					var date = new Date(_this.year, _this.month - 1 - 1);
					var prevYear = date.getFullYear();
					var prevMonth = date.getMonth() + 1;
					_this.render(prevYear, prevMonth);
					_this.year = prevYear;
					_this.month = prevMonth;
					_this.updateTitle(prevYear, prevMonth);
				}
				if (target.classList.contains('next')) {
					var _date = new Date(_this.year, _this.month - 1 + 1);
					var nextYear = _date.getFullYear();
					var nextMonth = _date.getMonth() + 1;
					_this.render(nextYear, nextMonth);
					_this.year = nextYear;
					_this.month = nextMonth;
					_this.updateTitle(nextYear, nextMonth);
				}
				if (target.classList.contains('finish')) {
					var countNight_value = document.querySelector('.countNight').value * 1;
					//this.allNight.innerHTML=document.querySelector('.countNight').value;
					var endDate = new Date(_this.year, _this.month - 1, document.querySelector('.high').innerHTML * 1 + document.querySelector('.countNight').value * 1);
					_this.callback(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), countNight_value);
					//this.check_OutDate.innerHTML=(endDate.getMonth()+1)+'月'+endDate.getDate()+'日';
					_this.hide();
				}

				//住几晚
				if (target.classList.contains('del')) {
					var value = document.querySelector('.countNight').value * 1;
					value -= 1;
					if (value < 0) return;
					document.querySelector('.countNight').value = value;
				}
				if (target.classList.contains('add')) {
					var _value = document.querySelector('.countNight').value * 1;
					_value += 1;
					document.querySelector('.countNight').value = _value;
				}
			}, false);
		}
	}, {
		key: 'show',
		value: function show(checkInEle) {
			this.check_in_ele = checkInEle;
			//this.calendarWrap.classList.remove('hide');
			this.calendarWrap.classList.add('selectCity-active');
		}
	}, {
		key: 'hide',
		value: function hide() {
			//this.calendarWrap.classList.add('hide');
			this.calendarWrap.classList.remove('selectCity-active');
		}
	}]);

	return mycalendar;
}();

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var City = exports.City = function () {
	function City(options) {
		_classCallCheck(this, City);

		var defaults = {
			data: []

		};
		var opt = Object.assign({}, defaults, options);
		this.opt = opt;
		this.moreList = document.querySelector('.moreList');
		this.citiesFrame = document.querySelector('.citiesFrame');
		this.selectCity = document.querySelector('#selectCity');
		this.render(opt.data);
		this.collectCityHeight();
		this.bindEvent();
	}
	//渲染更多城市列表


	_createClass(City, [{
		key: 'render',
		value: function render(cityList) {
			var moreList = this.moreList;
			var citiesFrame = this.citiesFrame;
			var moreList_str = '',
			    city_str = '';
			cityList.forEach(function (value, index) {
				moreList_str += '<span alpha="' + value.alpha + '">' + value.alpha + '</span>';
				city_str += '<div>\n\t\t\t\t\t\t\t<div class=\'split-line current\' alpha=\'' + value.alpha + '\'>' + value.alpha + '</div>\n\t\t\t\t\t\t\t<ul class=\'list\'>\n\t\t\t\t\t\t\t\t' + value.data.map(function (val, ind) {
					return '<li>' + val[0] + '</li>';
				}).join("") + '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t   </div>';
			});
			moreList.innerHTML = moreList_str;
			citiesFrame.innerHTML = city_str;
		}

		//收集每个字母开头的城市列表的高度(scrollTop)

	}, {
		key: 'collectCityHeight',
		value: function collectCityHeight() {
			var alphaDom = document.querySelectorAll('[alpha]');
			var obj = {};
			Array.from(alphaDom).forEach(function (val, ind) {
				obj[val.getAttribute('alpha')] = val.offsetTop;
			});
			this.obj = obj;
		}

		//绑定事件

	}, {
		key: 'bindEvent',
		value: function bindEvent() {
			var _this = this;

			this.selectCity.addEventListener('click', function (e) {

				var target = e.target;
				if (target.tagName == 'SPAN') {
					_this.selectCity.scrollTop = _this.obj[target.getAttribute('alpha')];
				}
				if (target.tagName == 'LI') {
					_this.hide();
					var backtop = document.querySelector('.backtop');
					backtop.classList.remove('show');
					_this.opt.callback(target.innerHTML);
				}
				//返回首页
				if (target.tagName == 'SPAN' && target.classList.contains('back')) {
					_this.hide();
				}
			}, false);
		}
	}, {
		key: 'show',
		value: function show() {
			this.selectCity.classList.add('selectCity-active');
			this.selectCity.scrollTop = 0;
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.selectCity.classList.remove('selectCity-active');
		}
	}]);

	return City;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hotCity = exports.hotCity = function () {
	function hotCity(options) {
		_classCallCheck(this, hotCity);

		var defaults = {
			data: []
		};

		var opt = Object.assign({}, defaults, options);
		this.hotList = document.querySelector('.hotList');
		this.render(opt.data);
	}

	_createClass(hotCity, [{
		key: 'render',
		value: function render(hotCityList) {
			//console.log(hotCityList)
			var hotList = this.hotList;
			var hotList_str = '';
			for (var t in hotCityList) {
				hotList_str += '<li>' + hotCityList[t] + '</li>';
			}
			hotList.innerHTML = hotList_str;
		}
	}]);

	return hotCity;
}();

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tools = __webpack_require__(0);

var _city = __webpack_require__(3);

var _hotcity = __webpack_require__(4);

var _mycalendar = __webpack_require__(1);

var _ref = [document.querySelector('.banner ul'), ''],
    banner = _ref[0],
    str = _ref[1];

(0, _tools.ajax)({
	url: '../../server/banner.json',
	callback: function callback(data) {
		//console.log(data)
		data.forEach(function (item, index) {
			str += '<li class=\'swiper-slide\' style="background:url(' + item.url + ');background-size:100% 100%;" ><a href="#" title="' + item.title + '"></a></li>';
			banner.innerHTML = str;
		});

		new Swiper('.banner', {
			autoplay: 1500,
			loop: true
		});
	}
});

//ajax渲染城市列表
(0, _tools.ajax)({
	url: '../../server/cities.json',
	callback: function callback(data) {
		var city_module = new _city.City({
			data: data,
			callback: function callback(city) {
				document.querySelector('.stayPlace').innerHTML = city + '<em class="iconfont icon-jiantouyou"></em>';
			}
		});
		var checkIn = document.querySelector('.check-in-hotel');
		checkIn.addEventListener('click', function () {
			city_module.show();
		}, false);
	}
});

//渲染热门城市列表
(0, _tools.ajax)({
	url: '../../server/hotcity.json',
	callback: function callback(data) {
		new _hotcity.hotCity({
			data: data
		});
	}
});

//返回顶部动能
var _ref2 = [document.querySelector('#selectCity'), document.querySelector('.backtop')],
    selectCity = _ref2[0],
    backtop = _ref2[1];

selectCity.onscroll = function () {
	var bodyH = document.body.clientHeight;
	var scrollTop = selectCity.scrollTop;
	if (scrollTop >= bodyH) {
		backtop.classList.add('show');
	} else {
		backtop.classList.remove('show');
	}
};
backtop.onclick = function () {
	selectCity.scrollTop = 0;
};

//初始化入住时间和离店日期
var checkInDate = document.querySelector('.check-inDate');
var check_Date = document.querySelector('.checkInDate');
var checkOutDate = document.querySelector('.abc');
var current_date = new Date();
var cYear = current_date.getFullYear();
var cMonth = current_date.getMonth() + 1;
var cDate = current_date.getDate();
var cTime = current_date.getHours();

if (cTime > 16) {
	current_date = new Date(cYear + '-' + cMonth + '-' + cDate);
	cYear = current_date.getFullYear();
	cMonth = current_date.getMonth() + 1;
	cDate = current_date.getDate();
}
//入住日期
//checkInDate.innerHTML=cYear+'年'+cMonth+'月'+cDate+'日';
checkInDate.innerHTML = cMonth + '月' + cDate + '日';
//离店日期
// let check_OutDate=document.querySelector('.check-outDate');
var check_out_date = new Date(cYear + '/' + cMonth + '/' + (cDate + 1));
var oYear = check_out_date.getFullYear();
var oMonth = check_out_date.getMonth() + 1;
var oDay = check_out_date.getDate();
checkOutDate.innerHTML = oMonth + '月' + oDay + '日';

//实例化日历组件  首页和日历页的切换
var check_inDate = document.querySelector('.check-in-date');
var check_outDate = document.querySelector('.check-out-date');
var calendarBack = document.querySelector('.calendar_back');
var calendar = new _mycalendar.mycalendar({
	initDate: new Date(),
	callback: function callback(y, m, d, countNight_value) {
		//console.log(y,m,d)
		document.querySelector('.abc').innerHTML = m + '月' + d + '日';
		document.querySelector('.allNight').innerHTML = countNight_value;
	}
});
check_inDate.addEventListener('click', function () {
	document.querySelector('.countNight').value = '1';
	calendar.show(checkInDate);
}, false);
check_outDate.addEventListener('click', function () {
	document.querySelector('.countNight').value = '1';
	calendar.show(checkOutDate);
});
calendarBack.addEventListener('click', function () {
	calendar.hide();
}, false);

//位置定位
var position = document.querySelector('.position');
position.onclick = function (e) {
	e.stopPropagation();
	// jsonp(
	// 	'http://apis.map.qq.com/ws/geocoder/v1/?location='+26+','+112+'&key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp',
	// 	function(data){
	// 		console.log(data);
	// 	}
	// )

	var glt = navigator.geolocation;
	if (glt) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var coords = position.coords;
			console.log(coords);
			(0, _tools.jsonp)('http://apis.map.qq.com/ws/geocoder/v1/?location=' + coords.latitude + ',' + coords.longitude + 'key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp', function (data) {
				console.log(data['result']);
			});
		}, function (error) {
			switch (error.code) {
				case error.TIMEOUT:
					console.log("A timeout occured! Please try again!");
					break;
				case error.POSITION_UNAVAILABLE:
					console.log('We can\'t detect your location. Sorry!');
					break;
				case error.PERMISSION_DENIED:
					console.log('Please allow geolocation access for this to work.');
					break;
				case error.UNKNOWN_ERROR:
					console.log('An unknown error occured!');
					break;
			}
			(0, _tools.jsonp)('http://apis.map.qq.com/ws/location/v1/ip?key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp', function (data) {
				console.log(data);
			});
		}, {
			// 指示浏览器获取高精度的位置，默认为false
			enableHighAccuracy: true,
			// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
			timeout: 5000,
			// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
			maximumAge: 3000
		});
	} else {
		alert("Your browser does not support Geolocation!");
	}
};

//搜索酒店功能
var searchHotel = document.querySelector('.search');
var hotelList_Wrap = document.querySelector('.hotelList_Wrap');
var hotelList_Con = document.querySelector('.hotelList_Con');
var hotelList_back = document.querySelector('.hotelList_back');
searchHotel.onclick = function () {
	var city_name = document.querySelector('.stayPlace').innerText;
	var checkIn = checkInDate.innerHTML;
	var checkOut = check_outDate.querySelector('.abc').innerHTML;
	var hotel_name = document.querySelector('.inputName').value;
	var str = 'list.html?city_name=' + city_name + '&checkIn=' + checkIn + '&checkOut=' + checkOut;
	if (hotel_name) {
		str += '&hotel_name' + hotel_name;
	}
	window.location.href = str;

	//渲染酒店信息
	(0, _tools.ajax)({
		url: '../../server/hotel.json',
		callback: function callback(data) {
			var str = '';
			var dataJson = data.result.hotel_list;
			dataJson.forEach(function (val, index) {
				str += '<dl>\n\t\t\t\t\t\t<dt><img src="' + val.image + '"></dt>\n\t\t\t\t\t\t<dd>\n\t\t\t\t\t\t\t<h2>' + val.name + '</h2>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span class=\'score\'>4.7\u5206</span>\n\t\t\t\t\t\t\t\t<span class=\'li\'>\u793C</span>\n\t\t\t\t\t\t\t\t<span class=\'priceStart\'><em>\uFFE5' + val.low_price + '</em>\u8D77</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span>' + val.stars + '</span>\n\t\t\t\t\t\t\t\t<span class=\'iconfont icon-wifi\'></span>\n\t\t\t\t\t\t\t\t<span class=\'iconfont icon-p\'></span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<span class=\'address\'>' + val.addr + '</span>\n\t\t\t\t\t\t\t\t<span>' + val.distance + 'km</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</dd>\n\t\t\t\t\t  </dl> ';
			});
			hotelList_Con.innerHTML = str;
		}
	});
};

/***/ })
/******/ ]);