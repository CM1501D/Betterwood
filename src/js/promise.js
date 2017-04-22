import { SlideSelector } from '../component/slideSelector';

//点击担保交易
let certain = document.querySelector('.order');
certain.onclick=()=>{
	window.location.href='./success.html';
}

//选择银行
let selectBank = document.querySelector('.moreBank');
let currentBank = document.querySelector('.currentBank');
let slideSelector = new SlideSelector();

selectBank.onclick=function(){
	slideSelector.show({
		list:['中国农业银行','中国工商银行','中国邮政储蓄银行','中国建设银行','中国民生银行','中国交通银行','中国银行'],
		callback:function(data){
			currentBank.value = data;
		}
	})
}

//选择证件

let selectCard = document.querySelector('.moreCard');
let currentCard = document.querySelector('.currentCard');

selectCard.onclick=function(){
	slideSelector.show({
		list:['结婚证','护照','工作证','军人证','学生证','港澳通行证','身份证'],
		callback:function(data){
			currentCard.value = data;
		}
	})
}