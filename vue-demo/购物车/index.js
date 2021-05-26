
var k=true//判断全选按钮
var app = new Vue({
	el:'#app',
	// 数据 
	data:{

	  list:[
	  [
	  	{	choose:false,
	  		id:1,
	  		name:'iphone7',
	  		price:6188,
	  		count:1,
	  		categor:手机
	  	}
	  ],
	  [
	  	{	
	  		choose:false,
	  		id:2,
	  		name:'ipad pro',
	  		price:5888,
	  		count:1，
	  		categor:平板
	  	}
	  ],
	  [
	  	{
	  		choose:false,
	  		id:3,
	  		name:'MackBook 	Pro',
	  		price:21488,
	  		count:1
	  		categor:电脑
	  	}
	  ]
	  ]


	},
	// 计算属性
	computed:{
		totalPrice: function(){
			var total=0;
			for(var i=0;i<this.list.length;i++){
				var item=this.list[i];
				if(item.choose)//选中的加入总价
					total+=item.price*item.count;
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g,',');//正则表达式
		}
	},
	// 方法
	methods:{
		handleReduce: function (index){
			if(this.list[index].count===1) return;
			this.list[index].count--;
		},
		handleAdd: function(index){
			this.list[index].count++;
		},
		handleRemove:function(index){
			this.list.splice(index,1);
		},
		handleAll: function(){
			//判断是否全选
			if(k){
			for(var j=0;j<this.list.length;j++){
				if(!this.list[j].choose){
					this.list[j].choose=true;
				}
			}
			k=false;
			}
			else{
				for(var i=0;i<this.list.length;i++){
					this.list[i].choose=false;
				}
			k=true;
			}
		},
		chose:function(index){
			//刷新状态
			this.list[index].choose=!this.list[index].choose;

		},
		ischecked(index){
			//返回状态
			return this.list[index].choose;
		},

	}


})