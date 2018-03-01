Vue.component('lastbutton',{
	template:'\
	<button\
	 :class="Cls()"\
	 @click="last" \
	 >\
	上一步</button>',
	props: {
		las:{
			type:String
		}
		},
	data: function(){
		return{
			last_show:this.las
		}
	},
	methods:{
		last: function(){
		return	this.$emit('last_show',this.last_show);
		},
		Cls: function(){
		 return 'clo_ok';
		}
	}
});
