<template>
	<scroll class="listview" :data="data" 
	:listenScroll="listenScroll"
	@scroll="scroll"
	:probeType="probeType"
	ref="listview">
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li 
					@click="selectItem(item)"
					v-for="item in group.items" 
					class="list-group-item">
						<img v-lazy="item.avatar" class="avatar" />
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutTouchStart"
		@touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item,index) in shortcutList" class="item"
				:data-index="index"
				:class="{'current': currentIndex==index}"
				>
					{{item}}
				</li>
			</ul>
		</div>
		<div class="list-fixed" v-show="fixedtitle" ref="fixed">
			<h1 class="fixed-title">{{fixedtitle}}</h1>
		</div>
		<div v-show="!data.length" class="loading-container">
			<loading></loading>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/demo'
	import Loading from 'base/loading/loading'

	const　ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30
	export default{
		created(){
			this.touch={}
			this.listenScroll=true
			this.listenHeight=[]
			this.probeType=3
		},
		components:{
			Scroll,
			Loading
		},
		computed:{
			shortcutList(){
				return this.data.map((group)=>{
					return group.title.substr(0,1)
				})
			},
			fixedtitle(){
				if(this.scrollY>0)  return ''
				return this.data[this.currentIndex]? this.data[this.currentIndex].title : ''
			}
		},
		props:{
			data:{
				type: Array,
				default: []
			}
		},
		data(){
			return{
				scrollY: -1,
				currentIndex: 0,
				diff: -1
			}
		},
		methods: {
			onShortcutTouchStart(e){
				let anchorIndex=getData(e.target,'index')
				let firstTouch=e.touches[0]
				this.touch.y1=firstTouch.pageY
				this.touch.anchorIndex=anchorIndex
				this._scrollTo(anchorIndex)

			},
			onShortcutTouchMove(e){
				let firstTouch=e.touches[0]
				this.touch.y2=firstTouch.pageY
				let delta=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT|0
				let anchorIndex=parseInt(this.touch.anchorIndex)+delta
				this._scrollTo(anchorIndex)
			},
			_scrollTo(index){
				if(!index&&index!==0) return
				if(index<0){
					index=0
				}
				else if(index>this.listenHeight.length-2){
					index=this.listenHeight.length-2
				}
				this.scrollY=-this.listenHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
			},
			_calculateHeight(){
				this.listenHeight = []
				const list =this.$refs.listGroup
				let height = 0
				this.listenHeight.push(height)
					for (let i=0;i<list.length;i++){
						let item =list[i]
						height+=item.clientHeight
						this.listenHeight.push(height)
					}
				},
			scroll(pos){
				this.scrollY=pos.y
			},
			selectItem(item){
				this.$emit('select',item)
			}
		},
		watch: {
			data(){
				setTimeout(()=>{
					this._calculateHeight()
				},20)
			},
			scrollY(newY){
				const listHeight=this.listenHeight
				if(newY>0){
					this.currentIndex=0
					return
				}
				for(let i=0;i<listHeight.length-1;i++){
					let height1 =listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY>=height1&&-newY<height2){
						this.currentIndex=i
						this.diff=height2+newY
						return 
					}
				}

				this.currentIndex=listHeight-2
			},
			diff(newVal){
				let fixedTop=(newVal>0&&newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT :0
				if(this.fixedTop===fixedTop){
					return 0
				}
				this.fixedTop=fixedTop
				this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`
			}
		}

	}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
