export class mycalendar{
	constructor(options){
		let defaults={
			initDate:new Date(),
			callback:function(){

			}
		}
		let opt=Object.assign({},defaults,options);
		let year=opt.initDate.getFullYear();
		let month=opt.initDate.getMonth()+1;
		this.year=year;
		this.month=month;
		this.day=opt.initDate.getDate();
		this.checkInDate=document.querySelector('.check-in-date');
		this.check=document.querySelector('.checkDate');	
		this.calendarWrap=document.querySelector('#calendar-wrap');
		this.calendarTitle=document.querySelector('.calendar_title');
		this.check_InDate=document.querySelector('.check-inDate');
		this.callback=opt.callback;
		this.render(year,month);
		this.updateTitle(year,month);
		this.bindEvent();
	}

	//获取一个月的天数
	getDays(year,month){
		let days31=[1,3,5,7,8,12];
		let days30=[4,6,8,10];
		let days=null;
		if(this.month==2){
			if(this.year%4==0&&this.year%100!=0 || this.year%400==0){
				days=29
			}else{
				days=28
			}
		}else{
			if(days31.indexOf(this.month)>-1){
				days=31;
			}else{
				days=30;
			}
		}
		return days;
	}

	updateTitle(year,month){
		this.calendarTitle.querySelector('h3').innerHTML=year+'年'+month+'月';
	}

	//获取当月的第一天是星期几 (也就是上个月在本月剩了多少天)
	startInOneMonth(year,month){
		let date=new Date(year+'/'+month+'/'+1);
		return date.getDay();
	}

	//渲染上个月(上月在本月剩余的天数=上个月的天数-本月的第一天是星期几)
	renderPrevMonth(year,month){	
		let prevMonth=new Date(year+'/'+(month-1));
		let prevMonthDays=this.getDays(prevMonth.getFullYear(),prevMonth.getMonth()+1)
		let leftDays=this.startInOneMonth(year,month);
		let str='';
		leftDays-=1;
		while(leftDays>=0){
			str+=`<span class='togray calendar-day'>${prevMonthDays-leftDays}</span>`;
			leftDays--
		}
		return str;
	}

	//渲染当前月
	renderCurrentMonth(year,month){
		let str='',start=1;
		let days=this.getDays(year,month);
		while(start<=days){
			if(start==this.day){
				str+=`<span class='calendar-day high'>${start}</span>`;

			}else if(start<this.day){
				str+=`<span class='calendar-day over'>${start}</span>`;
			}else{
				str+=`<span class='calendar-day'>${start}</span>`
			}
			
			start++
		}
		return str;
	}

	render(year,month){
		document.querySelector('.calendar_month').innerHTML=this.renderPrevMonth(year,month)+this.renderCurrentMonth(year,month)
	}

	bindEvent(){
		this.calendarWrap.addEventListener('click',(e)=>{
			let target=e.target;
			if(target.classList.contains('calendar-day')&&!target.classList.contains('togray')&&!target.classList.contains('over') ){
				document.querySelector('.high').classList.remove('high');
				target.classList.add('high');
				this.check_in_ele.innerHTML=this.month+'月'+target.innerHTML+'日';
				this.check.innerHTML=this.month+'月'+document.querySelector('.high').innerHTML+'日';
			}
			if(target.classList.contains('prev')){
				let date=new Date(this.year,(this.month-1-1));
				let prevYear=date.getFullYear();
				let prevMonth=date.getMonth()+1;
				this.render(prevYear,prevMonth);
				this.year=prevYear;
				this.month=prevMonth;
				this.updateTitle(prevYear,prevMonth);
			}
			if(target.classList.contains('next')){
				let date=new Date(this.year,(this.month-1+1));
				let nextYear=date.getFullYear();
				let nextMonth=date.getMonth()+1;
				this.render(nextYear,nextMonth);
				this.year=nextYear;
				this.month=nextMonth;
				this.updateTitle(nextYear,nextMonth);
			}
			if(target.classList.contains('finish')){
				let countNight_value=document.querySelector('.countNight').value*1;
				//this.allNight.innerHTML=document.querySelector('.countNight').value;
				let endDate=new Date(this.year,this.month-1,(document.querySelector('.high').innerHTML*1+(document.querySelector('.countNight').value)*1))
				this.callback(endDate.getFullYear(),endDate.getMonth()+1,endDate.getDate(),countNight_value);
				//this.check_OutDate.innerHTML=(endDate.getMonth()+1)+'月'+endDate.getDate()+'日';
				this.hide();	
			}

			//住几晚
			if(target.classList.contains('del')){
				let value=document.querySelector('.countNight').value*1;
				value-=1;
				if(value<0) return;
				document.querySelector('.countNight').value=value;
			}
			if(target.classList.contains('add')){
				let value=document.querySelector('.countNight').value*1;
				value+=1;
				document.querySelector('.countNight').value=value;
			}

		},false)
		
	}

	show(checkInEle){
		this.check_in_ele=checkInEle;
		//this.calendarWrap.classList.remove('hide');
		this.calendarWrap.classList.add('selectCity-active');
	}
	hide(){
		//this.calendarWrap.classList.add('hide');
		this.calendarWrap.classList.remove('selectCity-active');
	}
	
}
