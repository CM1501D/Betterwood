export class hotCity{
	constructor(options){
		const defaults={
			data:[]
		};

		const opt=Object.assign({},defaults,options);
		this.hotList=document.querySelector('.hotList');
		this.render(opt.data);
	}
	
	render(hotCityList){
		//console.log(hotCityList)
		let hotList=this.hotList;
		let hotList_str='';
		for(let t in hotCityList){
			hotList_str+=`<li>${hotCityList[t]}</li>`;
			
		}
		hotList.innerHTML=hotList_str;
	}
}