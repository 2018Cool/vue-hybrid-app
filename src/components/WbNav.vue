<template>
  <div class="my-nav-bar">
    <div v-if="isIphone" :style="{height:isIphoneX?'44px':'20px'}" class="padding-div" />
    <van-nav-bar
      :title="title"
      :left-arrow="leftArrow"
      fixed
      :z-index="20"
      :left-text="leftText"
      :right-text="rightText"
      :style="{marginTop:isIphoneX?'44px':(isIphone?'20px':'0')}"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <slot slot="left" name="left" />
      <slot slot="title" name="title" />
      <slot slot="right" name="right" />
    </van-nav-bar>
  </div>
</template>

<script>

export default {
  name: 'WbNav',
  props: {
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    leftArrow: Boolean,
    leftText: {
      type: String,
      default: function() {
        return ''
      }
    },
    rightText: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$emit('click-left')
    },
    onClickRight() {
      this.$emit('click-right')
    }
  }
}
</script>
<style lang="scss">
.my-nav-bar{
  position: relative;
  .padding-div{
    width:100%;
    height:20px;
    position: fixed;
    background: #1989fa;
    z-index:20;
    top:0;
  }
}
</style>

