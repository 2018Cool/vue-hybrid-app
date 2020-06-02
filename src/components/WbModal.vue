<template>
  <van-popup
    v-model="isShow"
    :position="position"
    :overlay="overlay"
    :style="{ height: '100%',overflow:'hidden' }"
    @closed="onClosed"
    @open="onOpen"
  >
    <slot />
  </van-popup>
</template>
<script>
export default {
  name: 'WbModal',
  props: {
    overlay: Boolean, // 是否显示蒙层
    position: { // 页面出场位置
      default: 'bottom',
      type: String
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    onOpen() {
      this.$emit('open')
    },
    onClosed() {
      this.$emit('closed')
      this.$onClosed && this.$onClosed()
    }
  }
}
</script>
<style lang="scss">

</style>

