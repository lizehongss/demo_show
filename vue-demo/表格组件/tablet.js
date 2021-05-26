Vue.component('vTablet',{
	template:'\
	<table><colgroup :style="wth()"></colgroup>\
	<thead>\
	<th v-for="(col,index) in this.currentColumns">\
	<span v-if="col.sortable===true">\
	{{col.title}}\
	<a @click="handleSortByAsc(index)">↑</a>\
	<a @click="handleSortByDesc(index)">↓</a>\
	</span>\
	<span v-else>{{col.title}}</span>\
	</th></thead>\
	<tbody>\
	<tr v-for="row in filtercurrentData">\
	<td v-for="value in row">{{value}}</td>\
	</tr>\
	</tbody>\
	</table>',
	props:{
		columns:{
			type:Array,
			default: function(){
				return [];
			}
		},
		data:{
			type:Array,
			default: function(){
				return [];
			}
		},
		val:{
			type: Number,
			default: 50
		}
	},
	data: function(){
		return{
			currentColumns:[],
			currentData:[],
			w: this.val,
		}
	},
	
	mounted(){
		this.makeColums();
		this.makeData();
	},
	methods: {
		makeColums:function(){
			this.currentColumns=this.columns.map(function(col,index){
				col._sortType='normal';
				col._index=index;
				return col;
			});
		},
		makeData: function (){
			this.currentData=this.data.map(function(row,index){
				row._index=index;
				return row;
			});
		},
		handleSortByAsc: function(index){
			var key =this.currentColumns[index].key;
			this.currentColumns.forEach(function(col){
					col._sortType='normal';
				});
				this.currentColumns[index]._sortType='asc';
				this.currentData.sort(function(a,b){
					return a[key]>b[key] ? 1:-1;
				});
		},
		handleSortByDesc:function(index){
			var key =this.currentColumns[index].key;
			this.currentColumns.forEach(function(col){
				col._sortType='normal';
			});
			this.currentColumns[index]._sortType='desc';
			this.currentData.sort(function(a,b){
				return a[key]<b[key]?1:-1;
			});
		},
		wth: function(){
			return {
				width: this.w+'px'
			}
		}

	},
	watch:{
		data: function(){
			this.makeData();
			var sortedColum=this.currentColumns.filter(function(col){
				return col._sortType!=='normal';
			});
			if(sortedColum.length>0){
				if(sortedColum[0]._sortType==='asc'){
					this.handleSortByAsc(sortedColum[0]._index);
				}else{
					this.handleSortByDesc(sortedColum[0]._index);
				}
			}
		},
		val: function(val){
			this.w=val;
		}
	},
	computed:{
		filtercurrentData: function(){
			return this.currentData.map(function(row){
				delete row._index
				return row;
			})
		}
	}
});