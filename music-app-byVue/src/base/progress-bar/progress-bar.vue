<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd"
    >
      <div class="progress-btn"></div>
    </div>
  </div>
</div>
</template>
<script>
import {prefixStyle} from 'common/js/demo'
const PROGRESSBTN=16
const transform=prefixStyle('transform')
  export default{
    props:{
      percent:{
        type: Number,
        default: 0
      }
    },
    watch:{
      percent(val){
        if(val>=0 && !this.touch.initiaded){
          const barWidth=this.$refs.progressBar.clientWidth-PROGRESSBTN
          const offsetWidth=val*barWidth
          this._offset(offsetWidth)

        }
      }
    },
    created(){
      this.touch={

      }
    },
    methods:{
      progressClick(e){
        this._offset(e.offsetX)
        this._triggerPercent()
      },
      progressTouchStart(e){
        this.touch.initiaded=true
        this.touch.startX=e.touches[0].pageX
        this.touch.left=this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if(!this.touch.initiaded){
          return
        }
        const deltaX=e.touches[0].pageX-this.touch.startX
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-PROGRESSBTN,Math.max(0,this.touch.left+deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd(e){
        this.touch.initiaded=false
        this._triggerPercent()
      },
      _offset(offsetWidth){
          this.$refs.progress.style.width=`${offsetWidth}px`
          this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
      },
      _triggerPercent(){
         const barWidth=this.$refs.progressBar.clientWidth-PROGRESSBTN
         const percent=this.$refs.progress.clientWidth/barWidth
         this.$emit('percentChange',percent)
      }
    }
  }

</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>