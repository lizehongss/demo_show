<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="distList">
      <div>
      <div class="slider-wrapper" v-if="recommends.length" >
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </slider>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">歌单推荐</h1>
      <ul>
        <li v-for="item in distList" class="item">
          <div class="icon">
          <img width="60" height="60" v-lazy="item.imgurl"/>
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="loading-container" v-show="!distList.length">
    <loading ></loading>
  </div>
  </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Loading from 'base/loading/loading'

  export default {
     components: {
      Slider,
      Scroll,
      Loading
    },
    data(){
      return{
        recommends:[],
        distList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods:{
      _getRecommend() {
        getRecommend().then((res)=> {
          if (res.code===ERR_OK) {
            this.recommends=res.data.slider
            console.log(res.data.slider)
          }
        })
      },
      _getDiscList(){
        getDiscList().then((res)=>{
          if(res.code==ERR_OK){
            this.distList=res.data.list
            console.log(res.data.list)
          }
        })
      },
      loadImage(){
        if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded=true
      }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>