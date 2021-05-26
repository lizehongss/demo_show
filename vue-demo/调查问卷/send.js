Vue.component('send',{
	template:'\
	<button :class="Cls()" @click="sen">提交</button>',
	props:{
		value: {
			type:String
		}
	},
	data:function(){
		return {
			val: this.value
		}
	},
	methods:{
		Cls: function(){
			if(this.val.length<100)
				return "clo";
			else return "clo_ok"
		},
		sen: function(){
			if(this.val.length<100)
				return 
			else alert("提交成功");
		}
	},
	watch:{
		value: function(vals){
			this.val=vals;
		}
	}
})