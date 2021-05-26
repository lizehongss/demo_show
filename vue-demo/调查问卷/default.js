Vue.component('debutton',{
	template:'\
	<button :class="cls()" @click="det">重置</button>',
	props: {
		value:{
			type:[String,Array]
		}
	},
	data: function(){
		return{
			current:this.value
		}
	},
	methods: {
		cls: function(){
	 		if(this.current==''){
	 			return "clo";
	 		}
			else return "clo_ok";
	 	},
	 	det: function(){
	 		console.log(this.current);
	 		if(typeof this.current==="object"){
				if(this.current.length!=0){
					this.current=[];
					this.$emit('on_change',this.current);
			}
				}
			if(typeof this.current==="string"){
			if(this.current!=''){
				this.current='';
			this.$emit('on_change',this.current);
				}
			}
		}
	},
	// //更新picked
 	watch: {
		value: function(val){
			this.current=val;
		}
		}


});
