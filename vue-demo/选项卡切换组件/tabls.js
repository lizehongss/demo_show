Vue.component('tabs',{
	//v-show不能在template中使用
	template:'\
	<div class="tabs">\
	<div class="tabs-bar">\
	<div \
		:class="tabCls(item)"\
		v-for="(item,index) in navList"\
		@click="handleChange(index)">\
		{{item.label}}\
		<span v-if="closee(item)" @click.stop="closepane(index)">关闭</span>\
		</div>\
	</div>\
	<div class="tabs-content">\
	<slot></slot>\
	</div>\
	</div>',
	props:{
		value:{
			type:[String,Number]
		}
	},
	data: function(){
		return {
			currentValue:this.value,
			navList:[]
			
		}
	},
	methods:{
		closee: function(item){
			//item中的closable为string类型，要化为bool类型
			var cloo=item.closable=='true'
			return cloo;
		},
		closepane: function(index){
			this.navList.splice(index,1);
			var i=index;
			console.log(this.getTabs()[i].show);
			this.getTabs()[i].show=false;
			
		},
		tabCls: function(item){
			return ['tabs-tab',
				{
					'tabs-tab-active':item.name===this.currentValue
				}
			]
		},
		handleChange:function(index){
			var nav=this.navList[index];
			var name=nav.name;
			this.currentValue=name;
			this.$emit('on-click',name);
		},
		getTabs(){
			return this.$children.filter(function(item){
				return item.$options.name==='pane';
			});
		},
		updateNav(){
		this.navList=[];
		this.clos=[];
		var _this=this;
		this.getTabs().forEach(function(pane,index){
			_this.navList.push({
				label:pane.label,
				name:pane.name||index,
				closable:pane.closable
			});
			if(!pane.name) pane.name=index;
			if(index===0){
				if(!_this.currentValue){
					_this.currentValue=pane.name||index;
				}
			}
		});
		this.upateStatus();
	},
	upateStatus(){
		var tabs= this.getTabs();
		var _this =this;
		tabs.forEach(function(tab){
			return tab.show=tab.name===_this.currentValue;
		})
	}
	},
	watch:{
		value: function(val){
			this.currentValue=val;
		},
		currentValue:function(){
			this.upateStatus();
		}

	}
})