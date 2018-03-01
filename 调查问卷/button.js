Vue.component('mybutton',{
	template:'\
	<button\
	 :class="Cls()"\
	 @click="next" \
	 >\
	下一步</button>',
	props: {
		picked:{
			type: [String,Array]
			},
		nas:{
			type:String
		}
		},
	data: function(){
		return{
			next_show:this.nas,
			current: this.picked
		}
	},
	methods:{
		next: function(){
		
			if(typeof this.current==="object"){
				if((this.current.length>=2)&&(this.current.length<=3))
					return	this.$emit('next_show',this.next_show);
				else return 
			}
			if(typeof this.current==="string"){
			if(this.current!='')
		return	this.$emit('next_show',this.next_show);
			else return;}
		},
		Cls: function(){
			if(typeof this.current==="string"){
			if(this.current=='')
				return 'clo';
			else return 'clo_ok';
			}
			if(typeof this.current==="object"){
				if((this.current.length<2)||(this.current.length>3))
					return 'clo';
			else return 'clo_ok';
			}

		}
	},
	watch:{
		picked: function(val){
			this.current=val;
		}
	}

});
