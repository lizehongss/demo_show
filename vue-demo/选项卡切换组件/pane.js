 Vue.component('pane',{
	name:'pane',
	template:'\
	<transition name="slide-fade">\
	<div class="pane" v-show="show">\
	<slot></slot>\
	</div>\
	</transition>',
	props: {
		name: {
			type:String
		},
		label:{
			type:String,
			default:''
		},
		closable:{
			type:Boolean,
			default:false
		}
	},
	data: function(){
		return {
			show:true
		}
	},
	methods:{
		updateNav(){
			this.$parent.updateNav();//调用父组件方法upateNav()
		}
	},
	watch:{
		label(){
			this.updateNav();
		}
	},
	mounted (){
		this.updateNav();
	}

})