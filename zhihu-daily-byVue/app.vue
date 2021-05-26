<template>
	<div class="daily">
		 <div class="daily-menu">
		 	<div class="daily-menu-item" 
		 		:class="{on: type==='recommend'}"
				@click="handleToRecommend">每日推荐</div>
		 	<div class="daily-menu-item" 
		 		:class="{on: type==='daily'}"
		 		@click="showThemes= !showThemes">主题日报
		 	</div>
		 	<ul v-show="showThemes">
		 		<li v-for="item in themes">
		 			<a :class="{on: item.id==themeId && type==='daily'}"
					@click="handleToTheme(item.id)"
		 			>{{item.name}}</a>
		 		</li>
		 	</ul>
		 </div>
		<div class="daily-list" ref="list">
			<template v-if="type==='recommend'">
				<div v-for="list in recommendList">
					<div class="daily-date">{{formatDay(list.date)}}</div>
					<Item v-for="item in list.stories"
					:data="item"
					@click.native="handleClick(item.id)"
					:key="item.id"></Item>
				</div>
			</template>
			<template v-if="type==='daily'">
				<Item v-for="item in list"
					:data="item"
					:key="item.id"
					@click.native="handleClick(item.id)">
					<!-- 给组件绑定原生事件		 -->
				</Item>
			</template>
	</div>
	<daily-article :id="articleId"></daily-article>
	</div>
</template>
<script>
	import Item from './component/item.vue';
	import $ from './libs/util';
	import dailyArticle from './component/daily-article.vue';
	export default{
		components:{Item,dailyArticle},
		data (){
			return {
				themes:[],
				showThemes:false,
				type: 'recommend',
				themeId: 0,
				list: [],
				dailyTime: $.getTodayTime(),
				isLoading: false,
				recommendList:[],
				articleId: 0
			}
		},
		methods:{
			getThemes(){
				$.ajax.get('themes').then(res=>{
					this.themes=res.others;
				})
			},
			handleToTheme(id){
				//可能通过主题日报切换，所以要清空
				this.type='daily';
				this.themeId =id;
				this.list=[];
				$.ajax.get('theme/'+id).then(res=>{
					this.list=res.stories.filter(item=>item.type !==1);
				})
			},
			handleToRecommend(){
				this.type='recommend';
				this.recommendList=[];
				this.dailyTime=$.getTodayTime();
				this.getRecommendList();
				},
			getRecommendList(){
				//加载时为true,在等待更新
				this.isLoading=true;
				const prevDay=$.prevDay(this.dailyTime+86400000);
				$.ajax.get('news/before/'+prevDay).then(res=>{
				this.recommendList.push(res);
				//更新后为false	
				this.isLoading=false;
			})
			},
			formatDay(date){
				let month =date.substr(4,2);
				let day=date.substr(6,2);
				if(month.substr(0,1)==='0') month=month.substr(1,1);
				if(day.substr(0,1)==='0') day=day.substr(1,1);
				return `${month}月 ${day} 日`;
			},
			handleClick(id){
				this.articleId=id;
			}
		},
		mounted (){
			this.getThemes();
			this.getRecommendList();
			//监听滚动事件
			const $list=this.$refs.list;//获取DOM
			$list.addEventListener('scroll',()=>{
				if(this.type==="daily"||this.isLoading) return;//为主题日报或正在加载时 return
				if(
					$list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
					this.dailyTime-=86400000;
				this.getRecommendList();
				}
			})

		}
	}
</script>
<style scoped>
		
</style>