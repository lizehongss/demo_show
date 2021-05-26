Vue.component('vTable',{
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
			wth: this.val
		}
	},
	
	mounted(){
		this.makeColums();
		this.makeData();
	},
	render:function(h){
		var _this=this;
		var ths=[];
		this.currentColumns.forEach(function(col,index){
			if(col.sortable){
				ths.push(h('th',[
					h('span',col.title),
					h('a',{
						class:{
							on: col._sortType==='asc'
						},
						on:{
							click: function(){
								_this.handleSortByAsc(index)
							}
						}
					},'↑'),
					h('a',{
						class: {
							on:col._sortType==='desc'
						},
						on:{
							click: function(){
								_this.handleSortByDesc(index)
							}
						}
					},'↓')]));
			}
			else{
				ths.push(h('th',col.title));
			}
		});
		var trs=[];
		_this.currentData.forEach(function(row){
			var tds=[];
			_this.currentColumns.forEach(function(cell){
				tds.push(h('td',row[cell.key]));
			});
					trs.push(h('tr',tds));

		});
		return h('table',[
			h('colgroup',{
				style:{
					width:this.wth+'px'
				}
			}),
			h('thead',[h('tr',ths)
				]),
			h('tbody',trs)
			])
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
			this.wth=val;
		}
	}
});