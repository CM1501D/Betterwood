import { SlideSelector } from '../component/slideSelector.js';
import { getParams } from './tools';

//点击返回按钮弹出是否退出订单填写的蒙版
let parentEle=document.querySelector('.writeOrder_wrap');
let write_mark=document.querySelector('.write_mark');
parentEle.addEventListener('click',(e)=>{
	let target=e.target;
	if(target.classList.contains('write_back')){
		write_mark.classList.add('write_mark-show');
	}
},false)

//点击否时,停留在当前的订单填写页
let deny=document.querySelector('.deny');
deny.onclick=()=>{
	write_mark.classList.remove('write_mark-show');
}
//点击时的时候,返回到酒店详情页
let certain=document.querySelector('.certain');
certain.onclick=()=>{
	window.location.href='./hotel_detail.html';
}

//点击立即预定时,跳转到担保交易的页面
let promise=document.querySelector('.order');
promise.onclick=()=>{
	window.location.href='./promise.html';
}

//点击房间数量或者到店时间时,弹出供用户选择的交互界面
let slideSelector = new SlideSelector();
let rooomCount = document.querySelector('.hotel_count').querySelector('spam');
rooomCount.onclick=function(){
	slideSelector.show({
		list:[1,2,3,4,5,6],
		callback:function(data){
			rooomCount.innerText = data;
			let person_info_wrap=document.querySelector('.person_info_wrap');
			let str=``;
			for(let i=0;i<data*1;i++){
				str+=`<div class='wrap'>
						<div class='person_name'>
							<label>姓名</label>
							<input type="text" placeholder="联系人姓名">
						</div>
						<div class='iphone'>
							<label>手机</label>
							<input type="number" placeholder="用于接收通知短信">
							<span class='close'>X</span>
						</div>
					  </div>`;
			}
			person_info_wrap.innerHTML=str;
		}
	});
}

//到店时间选择
let timeToHotel = document.querySelector('.endTime span');
timeToHotel.onclick=function(){
	slideSelector.show({
		list:["16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
		callback:function(data){
			timeToHotel.innerText = data;
		}
	})
}

//根据详情页的数据信息,渲染订单填写页的部分结构
console.log(getParams('hotel_info'))
console.log(JSON.parse(getParams('hotel_info')));
