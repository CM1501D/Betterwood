import { ajax } from './tools';
import {loading} from './tools';
import {getParams} from './tools';

//tab切换效果
let nav = document.querySelector('.hc_nav');
let spans=nav.querySelectorAll('span');
let divs=document.querySelector('.hc_wrap').querySelectorAll('div');
let moveCon=document.querySelector('.hc_wrap');
nav.addEventListener('click',(e)=>{
	for(let i=0;i<spans.length;i++){
		spans[i].classList.remove('high');
	}
	let target=e.target;
	if(target.tagName=='SPAN'){
		target.classList.add('high');
		let index=target.getAttribute('index');
		for(let i=0;i<divs.length;i++){
			divs[i].classList.remove('show');
		}
		moveCon.style.transform='translateX(-'+50*index+'%)';
		//divs[index].classList.add('show');
	}
},false)


//点击返回按钮,返回到列表页
document.querySelector('.back').onclick=()=>{
	window.location.href='./list.html';
}


//点击电话
let tel=document.querySelector('.telphone');
let tel_mark=document.querySelector('.tel_mark');
let cancel=document.querySelector('.cancel');
tel.onclick=()=>{
	if(!tel_mark.classList.contains('tel_mark-show')){
		tel_mark.classList.add('tel_mark-show');
	}
	
}

//点击关闭按钮,立即预订页面消失
document.querySelector('.close').onclick=()=>{
	mark.classList.remove('mark-show');
}

//点击立即预定跳转到订单填写页
let imgsrc = document.querySelector('.hotelDetail_view img').getAttribute('src');
let hotelname = document.querySelector('.hotel_name').innerHTML;
let hoteladdr = document.querySelector('.hotel_addr').innerHTML;
let bed_type = document.querySelector('.bigBed').innerText;
let hotel_price = document.querySelector('.price').innerHTML;
let obj={
	"imgsrc":imgsrc,
	"hotel_name":hotelname,
	"hotel_addr":hoteladdr,
	"bed_type":bed_type,
	"hotel_price":hotel_price	
}
document.querySelector('.orderRightNow').onclick=()=>{
	window.location.href='./writeOrder.html?hotel_info='+obj;
}

cancel.onclick=()=>{
	tel_mark.remove('tel_mark-show');
}

//图集轮播效果
let lookUp_pics = document.querySelector('.lookUp_pics');
let img_con = document.querySelector('.img_con');
let img_wrap = document.querySelector('.img_wrap');
lookUp_pics.onclick=()=>{
	img_con.classList.add('img_con-show');
	if(document.querySelector('ul')) return;
	loading.startLoading(img_wrap);
	//ajax请求图片数据
	ajax({
		url:'../../server/banner.json',
		callback:function(data){
			console.log(data)
			loading.stopLoading()
			let str=``;
			data.forEach((val,index)=>{
				str+=`<li class='swiper-slide'><img src="${val.url}"></li>`
			})
			img_wrap.innerHTML=`<ul class='swiper-wrapper'>${str}</ul>`;
			new Swiper(img_wrap,{
				loop:true
			})	
		}

	})
	
	
}
//点击遮罩层消失
img_con.onclick=()=>{
	img_con.classList.remove('img_con-show');
}

//获取地址栏的酒店ID,根据酒店ID,渲染相对应的酒店信息;
let hotel_id = getParams("hotel_id");
let hotelDetail_view_pic = document.querySelector('.hotelDetail_view img');
let hotel_name = document.querySelector('.hotel_name');
let hotel_rank = document.querySelector('.hotel_rank');
let hotel_tel = document.querySelector('.hotel_tel');
let hotel_addr = document.querySelector('.hotel_addr');
ajax({
	'url':'../../server/hotel.json',
	callback:function(data){
		let data_josn = data.data;
		data_josn.forEach(function(val,index){
			if(index+1==hotel_id){
				hotelDetail_view_pic.src=val.image;
				hotel_name.innerHTML=val.name;
				hotel_rank.innerHTML=val.rank+'级酒店';
				hotel_tel.innerHTML=val.tel;
				hotel_addr.innerHTML=val.addr;
			}
		})
	}
})

//点击标准大床房
let ps = document.querySelector('.reserveCon').querySelectorAll('p');
let mark=document.querySelector('.mark');
let orderImg = document.querySelector('.orderImg');
let orderName = document.querySelector('.orderName');
let bedtype = document.querySelector('.bedtype');
let orderPrice = document.querySelector('.orderPrice');
let orderPromise = document.querySelector('.orderPromise');
for(let i=0;i<ps.length;i++){
	ps[i].onclick=function(){
		mark.classList.add('mark-show');
		orderImg.src=hotelDetail_view_pic.getAttribute('src');
		console.log(bedtype);
		bedtype.innerHTML=this.querySelector('.bigBed').innerText;
		orderPrice.innerHTML=this.querySelector('.price').innerHTML;
	}
}

//点击展开全部酒店的效果
let sp_hotel = document.querySelector('.sp_hotel');
let hotel_in_around = document.querySelector('.hotel_in_around');

sp_hotel.onclick=function(){
	if(this.innerHTML=='展开剩余全部'){
		hotel_in_around.style.height='auto';
		this.innerHTML='收起'
	}else{
		hotel_in_around.style.height='250px';
		this.innerHTML='展开剩余全部';
	}
	
	
}

//点击展开全部床型的效果

let sp_bed = document.querySelector('.sp_bed');
let reserveCon = document.querySelector('.reserveCon');
sp_bed.onclick=function(){
	if(this.innerHTML=='展开全部'){
		reserveCon.style.height='auto';
		this.innerHTML='收起'
	}else{
		reserveCon.style.height='250px';
		this.innerHTML='展开全部';
	}
}

