import{mycalendar} from '../component/mycalendar';
import{ajax,getParams,loading} from './tools';
const calendar=new mycalendar({
	callback:function(y,m,d,countNight_value){
		document.querySelector('.checkOutDate').innerHTML=m+'月'+d+'日';
	}
})

let checkInDate=document.querySelector('.checkInDate');
let checkOutDate=document.querySelector('.checkOutDate');

document.querySelector('.modify').onclick=function(){
	calendar.show(checkInDate);
}
document.querySelector('.finish').onclick=function(){
	checkInDate.innerHTML=document.querySelector('.checkDate').innerHTML;
	calendar.hide();
}
document.querySelector('.calendar_back').onclick=function(){
	calendar.hide();
}
let hotelList_Con=document.querySelector('.hotelList_Con');

//加载动画
loading.startLoading('.hotelList_Wrap');

let dlHeight;
ajax({
	url:'../../server/hotel.json',
	callback:function(data){
		let str=``;
		let dataJson=data.data;
		dataJson.forEach(function(val,index){
			str+=`<dl class='hotel_item' data-region="${val.district}" data-rank='${val.rank}' data-price='${val.price}' data-distance='${val.distance}' data-index='${index+1}'>
					<dt><img src="${val.image}"></dt>
					<dd>
						<h2>${val.name}</h2>
						<p>
							<span class='score'>4.7分</span>
							<span class='li'>礼</span>
							<span class='priceStart'><em>￥${val.price}</em>起</span>
						</p>
						<p>
							<span class='ecomic'>${val.rank}</span>
							<span class='iconfont icon-wifi'></span>
							<span class='iconfont icon-p'></span>
						</p>
						<p>
							<span class='address'>${val.addr}</span>
							<span class='distance'>${val.distance/1000}km</span>
						</p>
					</dd>
				  </dl> `;
		})
		//数据加载完成,加载动画移除
		loading.stopLoading();
		hotelList_Con.innerHTML=str;
		dlHeight=document.querySelectorAll('.hotel_item')[1].offsetHeight;

	}

})

checkInDate.innerHTML=getParams('checkIn');
checkOutDate.innerHTML=getParams('checkOut');

//点击返回按钮返回首页
let back=document.querySelector('.back');
back.onclick=function(){
	window.location.href='shouye.html';
}


//点击导航栏的切换效果
let hotelList_nav=document.querySelector('.hotelList_nav');
let filter_area=document.querySelector('.filter-area');
let mark=document.querySelector('.mark');
let spans=hotelList_nav.querySelectorAll('span');

function resetArrow(target){
	for(let i=0;i<spans.length;i++){
		if(target.classList.contains('icon-xiajiantou')) return;
		spans[i].classList.add('icon-shangjiantou');
		spans[i].classList.remove('icon-xiajiantou');
		}
}
//导航栏切换显示筛选按钮功能
hotelList_nav.addEventListener('click',(e)=>{
let target=e.target;

if(target.tagName=='SPAN'){
	for(let i=0;i<spans.length;i++){
		spans[i].classList.remove('high');
	}
	target.classList.add('high')
	
	resetArrow(target);

	if(target.classList.contains('icon-shangjiantou')){
		target.classList.remove('icon-shangjiantou');
		target.classList.add('icon-xiajiantou')
		mark.classList.add('mark-show');
	}else{
		target.classList.remove('icon-xiajiantou');
		target.classList.add('icon-shangjiantou')
		mark.classList.remove('mark-show');

	}
	filter_area.style.transform=`translateX(${-(target.getAttribute('index')*25)}%)`;
}
},false)


mark.addEventListener('click',(e)=>{
	let target=e.target;
	if(target.tagName=='P'){
		if(target.parentNode.classList.contains('arrange')){//此时在排序按钮的区域
			if(target.classList.contains('icon-checkbox')){
				let sibilings=target.parentNode.children;
				for(let i=0;i<sibilings.length;i++){
					sibilings[i].classList.remove('icon-checkbox1');
					sibilings[i].classList.add('icon-checkbox');
					sibilings[i].classList.remove('checked');
				}
				target.className='iconfont icon-checkbox1';
				target.classList.add('checked');

				let arrange=target.getAttribute('arrange');
				let param=target.getAttribute('condition');
				arrangeFn(arrange,param);
			}
		}else{
			if(target.classList.contains('icon-checkbox')){
				target.classList.remove('icon-checkbox');
				target.classList.add('icon-checkbox1')
				target.classList.add('checked');
			}else{
				target.classList.remove('icon-checkbox1');
				target.classList.add('icon-checkbox');
				target.classList.remove('checked');
			}
		}
		
		screen(collector());
		//console.log(collector())
	}
},false)

//收集筛选条件方法
function collector(){
	let region=document.querySelector('.region').querySelectorAll('p.icon-checkbox1');
	let rank=document.querySelector('.rank').querySelectorAll('p.icon-checkbox1');
	let screenItems={
		region:[],
		rank:[]
	};

	for(let i=0;i<region.length;i++){
		screenItems.region.push(region[i].getAttribute('region'));
	}
	for(let i=0;i<rank.length;i++){
		screenItems.rank.push(rank[i].getAttribute('rank'));
	}
	for(let j in screenItems){
		if(screenItems[j].length==0){
			delete screenItems[j];
		}
	}
	return screenItems;
}

//筛选逻辑的实现
function screen(obj){
	let wrap=document.querySelector('.hotelList_Con');
	let dls=wrap.querySelectorAll('dl');
	//默认显示所有的列表项
	for(let i=0;i<dls.length;i++){
		dls[i].classList.remove('none');
	}
	//把不符合条件的项筛选出来;
	for(let i=0;i<dls.length;i++){
		for(let k in obj){
			if(obj[k].indexOf(dls[i].getAttribute('data-'+k))==-1){
				dls[i].classList.add('none');
			}
		}
	}
}

//排序函数
function arrangeFn(direction,param){
	let wrap=document.querySelector('.hotelList_Con');
	let dls=Array.from(wrap.querySelectorAll('dl'));
	dls.sort(function(a,b){
		let attr;
		if(param=='price'){
			attr='price'
		}else{
			attr='distance'
		}
		

		if(direction=='down'){ 
			return a.getAttribute('data-'+attr)-b.getAttribute('data-'+attr);
		}else{
			return b.getAttribute('data-'+attr)-a.getAttribute('data-'+attr);
		}
	})


	dls.forEach((ele,index)=>{
		wrap.appendChild(ele);
	})
}

//滚动加载更多
let viewHeight=document.querySelector('.hotelList_Con').offsetHeight;
let hotel_con=document.querySelector('.hotelList_Con');
hotel_con.onscroll=loadMore;
function loadMore(){
	let totalHeight=dlHeight*document.querySelectorAll('.hotel_item').length;
	if(totalHeight-(viewHeight+this.scrollTop)<200){
		//alert(111)
		hotel_con.onscroll=null;
		ajax({
			url:'../../server/hotel.json',
			callback:function(data){
				let dataJson=data.data;
				dataJson.forEach(function(val,index){
					hotelList_Con.appendChild(tpl('dom',val.district,val.rank,val.price,val.distance,val.image,val.addr,val.name,index));
				})
				dlHeight=document.querySelectorAll('.hotel_item')[1].offsetHeight;
				hotel_con.onscroll=loadMore;
				//arrangeFn()
			}

		})
	}
	//console.log(this.scrollTop)
}

function tpl(type,region,rank,price,distance,img,addr,name,index){
	
	if(type=='string'){
		return `<dl class='hotel_item' data-region="${val.district}" data-rank='${val.rank}' data-price='${val.price}' data-distance='${val.distance}' data-index='${index+1}'>
					<dt><img src="${val.image}"></dt>
					<dd>
						<h2>${val.name}</h2>
						<p>
							<span class='score'>4.7分</span>
							<span class='li'>礼</span>
							<span class='priceStart'><em>￥${val.price}</em>起</span>
						</p>
						<p>
							<span>${val.rank}</span>
							<span class='iconfont icon-wifi'></span>
							<span class='iconfont icon-p'></span>
						</p>
						<p>
							<span class='address'>${val.addr}</span>
							<span class='distance'>${val.distance/1000}km</span>
						</p>
					</dd>
				  </dl> `
	}

	if(type=='dom'){
		let ele=document.createElement('dl');
		ele.className='hotel_item'; 
		ele.setAttribute('data-region',region);
		ele.setAttribute('data-rank',rank);
		ele.setAttribute('data-price',price);
		ele.setAttribute('data-distance',distance);
		ele.innerHTML=`<dt><img src=`+img+`></dt>
						<dd>
							<h2>`+name+`</h2>
							<p>
								<span class='score'>4.7分</span>
								<span class='li'>礼</span>
								<span class='priceStart'><em>￥`+price+`</em>起</span>
							</p>
							<p>
								<span>`+rank+`</span>
								<span class='iconfont icon-wifi'></span>
								<span class='iconfont icon-p'></span>
							</p>
							<p>
								<span class='address'>`+addr+`</span>
								<span class='distance'>`+(distance/1000)+`km</span>
							</p>
						</dd>`;
		return ele;
	}
}

//点击其中一酒店跳转对应的酒店详情页
setTimeout(function(){
	let dls=document.querySelector('.hotelList_Con').querySelectorAll('dl');
	for(let i=0;i<dls.length;i++){
		dls[i].onclick=function(){
			let hotel_index=this.getAttribute('data-index');
			window.location.href='./hotel_detail.html?hotel_id='+hotel_index;
		}
	}
})


