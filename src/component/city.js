export class City{
	constructor(options){
		const defaults={
			data:[],

		};
		const opt=Object.assign({},defaults,options);
		this.opt=opt;
		this.moreList=document.querySelector('.moreList');
		this.citiesFrame=document.querySelector('.citiesFrame');
		this.selectCity=document.querySelector('#selectCity');
		this.render(opt.data);
		this.collectCityHeight();
		this.bindEvent();
	}
	//渲染更多城市列表
	render(cityList){
		let moreList=this.moreList;
		let citiesFrame=this.citiesFrame;
		let moreList_str='',city_str='';
		cityList.forEach((value,index)=>{
			moreList_str+=`<span alpha="${value.alpha}">${value.alpha}</span>`;
			city_str+=`<div>
							<div class='split-line current' alpha='${value.alpha}'>${value.alpha}</div>
							<ul class='list'>
								${
									value.data.map((val,ind)=>{
										return `<li>${val[0]}</li>`
									}).join("")
								}
								
							</ul>
					   </div>`;
			
		})
		moreList.innerHTML=moreList_str;
		citiesFrame.innerHTML=city_str;
	}

	//收集每个字母开头的城市列表的高度(scrollTop)

	collectCityHeight(){
		let alphaDom=document.querySelectorAll('[alpha]');
		let obj={};
		Array.from(alphaDom).forEach((val,ind)=>{
			obj[val.getAttribute('alpha')]=val.offsetTop;
		})
		this.obj=obj;
	}

	//绑定事件
	bindEvent(){
		this.selectCity.addEventListener('click',(e)=>{
			
			let target=e.target;
			if(target.tagName=='SPAN'){
				this.selectCity.scrollTop=this.obj[target.getAttribute('alpha')];
			}
			if(target.tagName=='LI'){
				this.hide();
				let backtop=document.querySelector('.backtop');
				backtop.classList.remove('show')
				this.opt.callback(target.innerHTML);
			}
			//返回首页
			if(target.tagName=='SPAN' && target.classList.contains('back')){
				this.hide();
			}

		},false)

	}

	show(){
		this.selectCity.classList.add('selectCity-active');
		this.selectCity.scrollTop=0;
	}
	hide(){
		this.selectCity.classList.remove('selectCity-active');
	}
}