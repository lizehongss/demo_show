var Time ={
	getUnix: function(){
		var  date =new Date();
		return date.getTime();
	},
	getTodayUnix: function(){
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	getYearUnix: function(){
		var date=new Date();
		date.setMonth(0);
		date.setDate(1);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	getLastDate: function(time){
		var date= new　Date(time);
		var month =date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
		var day =date.getDate()<10?'0'+date.getDate():date.getDate();
		return date.getFullYear()+'-'+month+"-"+day;
	},
	getymd: function(timeStamp){
			var date= new　Date(timeStamp);
			var now_date = new Date();
			var now_years=now_date.getFullYear();
			var tips="";
			console.log(now_years);
			console.log(date.getFullYear());
			if(now_years-date.getFullYear()>0){
				tips=tips+now_years-date.getFullYear()+"年";
			}
			var month =date.getMonth()+1;
			var day =date.getDate();
			return tips+month+"个月"+day+"天";
		},
	getFormatTime:function(timestamp){
		var now =this.getUnix();
		var today =this.getTodayUnix();
		var year=this.getYearUnix();
		var timer =(now-timestamp)/1000;
		console.log(timer);
		var tip='';
		if(timer<=0){
			tip:'刚刚';
		}else if(Math.floor(timer/60)<=0){
			tip:'刚刚';
		}else if (timer<3600){
			tip=Math.floor(timer/60)+'分钟前';//取小于或者等于指定值的最大整数
		}else if(timer>=3600&&(timestamp-today>=0)){
			tip=Math.floor(timer/3600)+'小时前';
		}else if(timer/86400<=31){
			tip=Math.ceil(timer/86400)+'天前';//取大于或者等于指定值的最小整数
		}

		else{
			tip=this.getLastDate(timestamp);
		
		}
		return tip;
	},
	//出生日期功能
	getBirthday:function(timeStamp){
		var now=this.getUnix();
		var timer=(now-timeStamp)/1000;
		tip=Math.ceil(timer/86400)+'天前';
		return tip;
	},
	//扩展出生日期功能
	getBirthdayymd: function(timeStamp){
		var now=this.getUnix();
		var timer=(now-timeStamp)/1000;
		if(timer/86400<=31){
			tip=Math.ceil(timer/86400)+'天';
		}
		else{
			tip=this.getymd(timeStamp);
		}
		return tip;
	}

};
Vue.directive('time',{
	bind: function(el,binding){
		el.innerHTML=Time.getFormatTime(binding.value);
		el._timeout_=setInterval(function(){
			el.innerHTML=Time.getFormatTime(binding.value);
		},60000);
	},
	unbind:function(el){
		clearInterval(el._timeout_);
		delete el._timeout_;
	}
});
Vue.directive('birthday',{
	bind: function(el,binding){
		el.innerHTML=Time.getBirthday(binding.value);
	
	console.log(binding.modifiers.ymd);
	if(binding.modifiers.ymd===true){
		el.innerHTML=Time.getBirthdayymd(binding.value);
	}
}
})