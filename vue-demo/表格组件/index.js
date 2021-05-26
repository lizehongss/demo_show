var app = new Vue({
	el:'#app',
	data:{
		columns:[
		{
			title:'姓名',
			key:'name',
			sortable: false
		},
		{
			title:'年龄',
			key: 'age',
			sortable: true
		},
		{
			title:'出生日期',
			key:'birthday',
			sortable: true
		},
		{
			title:'地址',
			key:'address',
			sortable: false
		}
		],
		data: [
		{
			name:'王小明',
			age:18,
			birthday:'1999-02-21',
			address:'a市场'
		},
		{
			name:'张小刚',
			age: 25,
			birthday: '1992-01-23',
			address: 'b市场'
		},
		{
			name:'李小红',
			age: 30,
			birthday: '1997-11-2',
			address:'c市场'
		},
		{
			name:'周小伟',
			age: 39,
			birthday: '1991-4-10',
			address:'d市场'
		}
		],
		value: 50
	},
	methods: {
		handleAddData: function(){
			this.data.push({
				name:'刘小天',
				age: 19,
				birthday:'1998-4-4',
				address:'f市场'
			});
		}
	}
});