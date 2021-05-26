var app =new Vue({
	el:'#app',
	data:{
		picked:'',
		one:true,
		two:false,
		three:false,
		checked:[],
		text: ''
	},
	methods: {
		nextshow: function (total) {
			console.log(total);
			if(total===2){
				console.log("ok");
				this.one=false;
				this.two=true;
				this.three=false;
			}
			if(total===3){
				this.one=false;
				this.two=false;
				this.three=true;
			}
		},
		defcha: function(val){
			//判断返回类型
			if(typeof val==="object"){
				this.checked=val;
			}
			else if(typeof val==="string"){
				this.picked=val;
			}	
			else return;
		},
		defchb: function(val){
			this.text=val;
		},
		lastshow:function(val){
			console.log(val);
			if(val==1){
				this.one=true;
				this.two=false
				this.three=false;
			}
			if(val==2){
				this.one=false;
				this.two=true;
				this.three=false;
			}
		}
	}
})
