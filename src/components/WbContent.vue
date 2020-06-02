<template>
  <div id="wb-content" class="content-div" :class="getCssClass">
    <slot v-if="!watermarks" />
    <div v-if="watermarks" v-watermasks="this" class="waterMark">
      <slot />
    </div>
  </div>
</template>

<script>
import { KeyboardHandler } from '@/utils/keyboardHandler'
export default {
  name: 'WbContent',
  props: {
    watermarks: {
      type: Boolean,
      default: true
    }, // 默认所有页面都加水印
    keyboardHandler: Boolean // 默认为false，带有输入内容的页面添加
    // hasFooter: Boolean, // 是否底部操作栏
    // hasHeader: { // 是否有顶部操作栏
    //   type: Boolean,
    //   default: function() {
    //     return true
    //   }
    // }
  },
  data() {
    return {
      keyboardEvent: null,
      hasHeader: true,
      hasFooter: false
    }
  },
  computed: {
    getCssClass() {
      let prefix = ''
      if (this.isIphone) {
        prefix = 'i-'
        if (this.isIphoneX) {
          prefix = 'x-'
        }
      }
      const styleObj = {}
      if (this.hasFooter && this.hasHeader) {
        styleObj[`${prefix}has-footer-header`] = true
      } else if (this.hasHeader) {
        styleObj[`${prefix}has-header`] = true
      } else if (this.hasFooter) {
        styleObj[`${prefix}has-footer`] = true
      } else {
        styleObj[`${prefix}content-height`] = true
      }
      return styleObj
    }
  },

  mounted() {
    this.hasHeader = !!this.$el.previousSibling
    this.hasFooter = !!this.$el.nextSibling
    if (this.keyboardHandler) {
      this.$nextTick(() => {
        this.keyboardEvent = new KeyboardHandler(this.$el)
        this.keyboardEvent.addKeyboardListener()
      })
    }
  },
  destroyed() {
    if (this.keyboardEvent) {
      this.keyboardEvent.removeKeyboardListener()
      this.keyboardEvent = null
    }
  }
}
</script>
<style lang="scss">
.content-div{
  position: relative;
  width:100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  .waterMark{
    position: relative;
    top:0;
    left:0;
    height: auto;
    min-height: 100%;
    width:100%;
    .van-collapse-item__content{
       background-color: transparent;
    }
    .van-cell{
      background-color: transparent;
    }
    .van-cell-group{
        background-color: transparent;
    }
    .van-steps{
      background-color: transparent;
    }
  }

}
// #wb-content{
//   position: relative;
//   width:100%;
//   height:100%;
//   overflow-y: auto;
//   overflow-x: hidden;
//   -webkit-overflow-scrolling: touch;
// }
.content-height{
  height:100%;
}
.has-header{
  margin-top:46px;
  height: calc(100% - 46px);
}
.has-footer{
  padding-bottom: 50px;
  height: 100%;
}
.has-footer-header{
  margin-top:46px;
  padding-bottom: 50px;
  height: calc(100% - 46px);
}

.x-content-height{
  height:calc(100% - 78px);
}
.x-has-header{
  padding-bottom:34px;
  margin-top:90px;
  height: calc(100% - 90px);
}
.x-has-footer{
  margin-top:44px;
  padding-bottom: 34px;
  height: calc(100% - 44px);
}
.x-has-footer-header{
  margin-top:90px;
  padding-bottom: 84px;
  height: calc(100% - 90px);
}

.i-content-height{
  height:calc(100% - 20px);
}
.i-has-header{
  margin-top:66px;
  height: calc(100% - 66px);
}
.i-has-footer{
  margin-top:20px;
  padding-bottom: 50px;
  height: calc(100% - 20px);
}
.i-has-footer-header{
  margin-top:66px;
  padding-bottom: 50px;
  height: calc(100% - 66px);
}

</style>
