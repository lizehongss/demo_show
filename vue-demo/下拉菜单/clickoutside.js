Vue.directive('clickoutside', {
	bind: function(el,binding,vnode) {
		function documentHandle (e) {
			//判断是否在元素内部
			if(el.contains(e.target)){
				return false;
			}
			if(binding.expression){
				binding.value(e);
			}
		}
		function documentesc(event){
			console.log(event.keyCode);
			if(event.keyCode===27) 
			{
				if(binding.expression) binding.value(event);
			}
			else return;

		}
		el._vueClickOutside_=documentHandle;
		el._vueClickOutsideesc_=documentesc;
		document.addEventListener('click', documentHandle);
		el.torf=binding.modifiers.esc;
		if(binding.modifiers.esc===true)
			document.addEventListener('keydown',documentesc);
	},
	//更新事件
	upate: function(el,binding){
		if(binding.oldValue===binding.Value) return ;//相同不更新
		document.addEventListener('click',el._vueClickOutside_);
		document.addEventListener('keydown',_vueClickOutsideesc_);
	},
	//移除事件
	unbind: function(el,binding){
		document.removeEventListener('click',el._vueClickOutside_);
		delete el._vueClickOutside_;
		if(el.torf===true){
			document.removeEventListener('keydown',el._vueClickOutsideesc_);
			delete el._vueClickOutsideesc_;
		}
	}
});