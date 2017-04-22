//点击查看订单详情页返回订单详情页页面点击返回首页回到酒店首页;

let checkOrder = document.querySelector('.checkOrder');
let returnIndex = document.querySelector('.returnIndex');
let spans=document.querySelector('.nav').querySelectorAll('span');
checkOrder.onclick=()=>{
	for(let i=0;i<spans.length;i++){
		spans[i].classList.remove('active');
	}
	checkOrder.classList.add('active');
	window.location.href='./hotel_detail.html';
	
}
returnIndex.onclick=()=>{

	for(let i=0;i<spans.length;i++){
		spans[i].classList.remove('active');
	}
	returnIndex.classList.add('active');
	window.location.href='./shouye.html'
}
