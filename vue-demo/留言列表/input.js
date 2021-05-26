Vue.component('vInput',{
	props:{
		value:{
			type:[String, Number],
			default:''
		}
	},
	render: function(h){
		var _this=this;
		return h('div',[h('span','昵称：'),h('input',{
			attrs:{
				type:'text'
			},
			domProps:{
				value:this.value
			},
			on:{
				input:function(event){
					_this.value=event.target.value;
					_this.$emit('input',event.target.value);
				}
			}
		})
		]);
	}
});
Vue.component('vTextarea',{
	props:{
		value:{
			type:String,
			default: ''
		}
	},
	render: function(h){
		var _this=this;
		return h('div',[
			h('span','留言内容：'),h('textarea',{
				attrs:{
					placeholder:'请输入留言内容'
				},
				domProps:{
					value: this.value
				},
				domProps:{
					value: this.value
				},
				ref:'message',
				on:{
					input:function(event){
						_this.value=event.target.value;
						_this.$emit('input',event.target.value);
					}
				}
			})])
	},
	methods:{
		focus:function(){
			this.$refs.message.focus();
		}
	}

});
Vue.component('vInputs',{
	template:'\
	<div>\
	<span>昵称：</span>\
	<input type="text" :value="value" @input="handleInput"></div>',
	props:{
		value:{
			type:[String, Number],
			default:''
		}
	},
	methods:{
		handleInput:function(event){
			this.currentvalue=event.target.value;
			this.$emit('input',event.target.value);
		}
	}

});
Vue.component('vTextareas',{
	props:{
		value:{
			type:String,
			default: ''
		}
	},
	template:'\
	<div><span>留言内容：</span>\
	<textarea placeholder="请输入留言内容" :value="value" ref="message"\
	@input="handleText"\
	></textarea></div>\
	',
	methods:{
		focus:function(){
			this.$refs.message.focus();
		},
		handleText:function(event){
			this.currentvalue=event.target.value;
			this.$emit('input',event.target.value);
		}
	}

});