import {ajax,jsonp} from './tools';
import {City} from '../component/city';
import {hotCity} from '../component/hotcity';
import {mycalendar} from '../component/mycalendar';

let [banner,str]= [document.querySelector('.banner ul'),''];
ajax({
	url:'../../server/banner.json',
	callback:function(data){
		//console.log(data)
		data.forEach(function(item,index){
			str+=`<li class='swiper-slide' style="background:url(${item.url});background-size:100% 100%;" ><a href="#" title="${item.title}"></a></li>`;
			banner.innerHTML=str;
		})

		new Swiper('.banner',{
			autoplay:1500,
			loop:true
		})
	}
})

//ajax渲染城市列表
ajax({
	url:'../../server/cities.json',
	callback:function(data){
		let city_module=new City(
			{
				data:data,
				callback:function(city){
					document.querySelector('.stayPlace').innerHTML=city+'<em class="iconfont icon-jiantouyou"></em>';
				}
			}
		);
		let checkIn=document.querySelector('.check-in-hotel');
		checkIn.addEventListener('click',function(){
			city_module.show();
		},false)
	}
})

//渲染热门城市列表
ajax({
	url:'../../server/hotcity.json',
	callback:function(data){
		new hotCity({
			data:data
		})
	}
})


//返回顶部动能
let [selectCity,backtop]=[document.querySelector('#selectCity'),document.querySelector('.backtop')];
selectCity.onscroll=function(){
	let bodyH=document.body.clientHeight;
	let scrollTop=selectCity.scrollTop;
	if(scrollTop>=bodyH){
		backtop.classList.add('show')
	}else{
		backtop.classList.remove('show')
	}
}
backtop.onclick=function(){
	selectCity.scrollTop=0;
}

//初始化入住时间和离店日期
let checkInDate=document.querySelector('.check-inDate');
let check_Date=document.querySelector('.checkInDate');
let checkOutDate=document.querySelector('.abc');
let current_date=new Date();
let cYear=current_date.getFullYear();
let cMonth=current_date.getMonth()+1;
let cDate=current_date.getDate();
let cTime=current_date.getHours();

if(cTime>16){
	current_date=new Date(cYear+'-'+cMonth+'-'+cDate);
	cYear=current_date.getFullYear();
	cMonth=current_date.getMonth()+1;
 	cDate=current_date.getDate();
}
//入住日期
//checkInDate.innerHTML=cYear+'年'+cMonth+'月'+cDate+'日';
checkInDate.innerHTML=cMonth+'月'+cDate+'日';
//离店日期
// let check_OutDate=document.querySelector('.check-outDate');
let check_out_date=new Date(cYear+'/'+cMonth+'/'+(cDate+1));
let oYear=check_out_date.getFullYear();
let oMonth=check_out_date.getMonth()+1;
let oDay=check_out_date.getDate();
checkOutDate.innerHTML=oMonth+'月'+oDay+'日';

//实例化日历组件  首页和日历页的切换
let check_inDate=document.querySelector('.check-in-date');
let check_outDate=document.querySelector('.check-out-date');
let calendarBack=document.querySelector('.calendar_back');
let calendar=new mycalendar({
	initDate:new Date(),
	callback:function(y,m,d,countNight_value){
		//console.log(y,m,d)
		document.querySelector('.abc').innerHTML=m+'月'+d+'日';
		document.querySelector('.allNight').innerHTML=countNight_value;
	}
});
check_inDate.addEventListener('click',()=>{
	document.querySelector('.countNight').value='1';
	 calendar.show(checkInDate);

},false)
check_outDate.addEventListener('click',()=>{
	document.querySelector('.countNight').value='1';
	calendar.show(checkOutDate);
})
calendarBack.addEventListener('click',()=>{
	calendar.hide();
},false)


//位置定位
let position=document.querySelector('.position');
position.onclick=function(e){
	e.stopPropagation();
	// jsonp(
	// 	'http://apis.map.qq.com/ws/geocoder/v1/?location='+26+','+112+'&key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp',
	// 	function(data){
	// 		console.log(data);
	// 	}
	// )

	let glt=navigator.geolocation;
	if (glt) {
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var coords = position.coords;
	    	console.log(coords);
	    	jsonp(
	    		'http://apis.map.qq.com/ws/geocoder/v1/?location='+coords.latitude+','+coords.longitude+'key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp',
	    		function(data){
	    			console.log(data['result']);
	    		}
	    	)
	    }, function(error){
	    	switch(error.code) {
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
	    	jsonp(
	    		'http://apis.map.qq.com/ws/location/v1/ip?key=2YSBZ-LS536-ICUSD-MSZ6B-Q5B23-OVBDN&output=jsonp',
	    		function(data){
	    			console.log(data);
	    		}
		    )

	    },{
	        // 指示浏览器获取高精度的位置，默认为false
	        enableHighAccuracy: true,
	        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
	        timeout: 5000,
	        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
	        maximumAge: 3000
	    });
	}else{
	    alert("Your browser does not support Geolocation!");
	}
}


//搜索酒店功能
let searchHotel=document.querySelector('.search');
let hotelList_Wrap=document.querySelector('.hotelList_Wrap');
let hotelList_Con=document.querySelector('.hotelList_Con');
let hotelList_back=document.querySelector('.hotelList_back');
searchHotel.onclick=function(){
	let city_name=document.querySelector('.stayPlace').innerText;
	let checkIn=checkInDate.innerHTML;
	let checkOut=check_outDate.querySelector('.abc').innerHTML;
	let hotel_name=document.querySelector('.inputName').value;
	let str='list.html?city_name='+city_name+'&checkIn='+checkIn+'&checkOut='+checkOut;
	if(hotel_name){
		str+='&hotel_name'+hotel_name;
	}
	window.location.href=str;

	//渲染酒店信息
	ajax({
		url:'../../server/hotel.json',
		callback:function(data){
			let str=``;
			let dataJson=data.result.hotel_list;
			dataJson.forEach(function(val,index){
				str+=`<dl>
						<dt><img src="${val.image}"></dt>
						<dd>
							<h2>${val.name}</h2>
							<p>
								<span class='score'>4.7分</span>
								<span class='li'>礼</span>
								<span class='priceStart'><em>￥${val.low_price}</em>起</span>
							</p>
							<p>
								<span>${val.stars}</span>
								<span class='iconfont icon-wifi'></span>
								<span class='iconfont icon-p'></span>
							</p>
							<p>
								<span class='address'>${val.addr}</span>
								<span>${val.distance}km</span>
							</p>
						</dd>
					  </dl> `;
			})
			hotelList_Con.innerHTML=str;
		}
	})
}


