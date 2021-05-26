Vue.component('list',{
	props:{
		list:{
			type:Array,
			default:function(){
				return [];
			}
		}
	},
	render: function(h){
		var _this=this;
		var list=[];
		this.list.forEach(function(msg,index){
			var node=h('div',{
				attrs:{
				class: 'list-item'
			}
			},
			[
			h('span',msg.name+':'),
			h('div',{
				attrs:{
					class:'list-msg'
					}},
		[h('p',msg.message),
			h('a',{
				attrs:{
					class:'list-reply'
				},
				on:{
					click:function(){
						_this.handleReply(index);
					}
				}
			},'回复'),
				h('a',{
				attrs:{
					class:'list-reply'
				},
				on:{
					click:function(){
						_this.deletelist(index);
					}
				}
			},'删除')
			])
			])
			list.push(node);
		});
		if(this.list.length){
			return h('div',{
				attrs:{
					class:'list'
				},
			},list);
		}else{
			return h('div',{
				attrs:{
					class:'list-nothing'
				}
			},'留言列表为空');
		}
	},
	methods:{
		handleReply: function(index){
			this.$emit('reply',index);
		},
		deletelist: function(index){
			this.list.splice(index,1);
		}
	}
})
Vue.component('lists',{
	template:'<div v-if="this.list.length">\ 
	<div  v-for="(msg,index) in this.list">\
	<div class="list-item">\
	<span>{{msg.name+\':\'}}</span>\
	<div class="list-msg"><p>{{msg.message}}</p>\
	<a @click="handleReply(index)" class="list-reply">回复</a>\
	<a @click="deletelist(index)" class="list-reply">删除</a>\
	</div>\
	</div>\
	</div>\
	</div>\
	<div v-else class="list-nothing" v-else>留言列表为空</div>',
	props:{
		list:{
			type:Array,
			default:function(){
				return [];
			}
		}
	},
	data:function(){
		return{
			copylist: this.list
		}
	},
	methods:{
		handleReply: function(index){
			this.$emit('reply',index);
		},
		deletelist: function(index){
			this.copylist.splice(index,1);
		}
	}
})