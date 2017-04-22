//ajax封装
function ajax(options){
	let defaults={
		type:'get'||options.type,
		url:'',
		params:null,
		callback:function(){

		}
	}
	var obj = Object.assign({},defaults,options);
	var xhr= new XMLHttpRequest();
	if(obj.type=='get' && obj.params){
		let params_str='';
		for(let i=0;i<obj.params.length;i++){
			params_str+=i+'='+obj.params[i];
		}
		xhr.open(obj.type,obj.url+params_str,true);
		xhr.send();
	}else{
		xhr.open(obj.type,obj.url,true);
		xhr.send(obj.params);
	}
	 
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			obj.callback(JSON.parse(xhr.responseText));
		}
	}
}

//封装一个跨域请求的方法
function jsonp(url,callback){
	window.jsonp_callback=function(data){
		callback(data);
	}
	let s=document.createElement('script');
	s.src=url+'&callback=jsonp_callback';
	document.body.appendChild(s);
}

//封装一个获取地址栏参数的方法
function getParams(str){
	console.log(window)	;
	let params=decodeURIComponent(location.search.slice(1));
	let arr=params.split('&');
	let obj={};
	arr.forEach(function(val,index){
		let tmp=val.split('=');
		obj[tmp[0]]=tmp[1];
	})
	if(str){
		return obj[str]
	}else{
		return obj;
	}
}


//封装一个加载动画的方法
function loadingAnimate(){
	let tpl=`<div class='load_wrap'>
				<div class="circle circle-index1"></div>
				<div class="circle circle-index2"></div>
				<div class="circle circle-index3"></div>
				<div class="circle circle-index4"></div>
				<div class="circle circle-index5"></div>
				<div class="circle circle-index6"></div>
				<div class="circle circle-index7"></div>
				<div class="circle circle-index8"></div>
			</div>`;
			
	let load=document.createElement('div');
	load.className='loading';
	load.innerHTML=tpl;
	this.startLoading=function(container){
		let parentDom;
		if(typeof container=='string'){
			parentDom=document.querySelector(container);
		}else if(typeof container =='object'){
			parentDom=container;
		}else{
			parentDom=document.querySelector('container');
		}
		this.parentDom=parentDom;
		parentDom.appendChild(load);
	}
	this.stopLoading=function(){
		this.parentDom.removeChild(load);
	}		
}

let element = function (cls) {
	let ele = document.querySelectorAll(cls);
	if(!Node.prototype.bind){
        Node.prototype.bind = function (event,ele,callback) {
            this.addEventListener('click',(e)=>{
            	if(e.target.tagName.toLowerCase()==ele){
                    callback(e,ele);
				}
            },false);
        };
	}
    if(!NodeList.prototype.bind){
        NodeList.prototype.bind = function (event,ele,callback) {
            this.forEach((ele,index) =>{
                ele.addEventListener('click',()=>{
                    callback(ele,index);
                },false);
            });

        };
    }

    if(ele.length==1){
        return ele[0]
    }else{
        return ele
    }
};

let loading=new loadingAnimate();

export{ajax,jsonp,getParams,loading,element};

