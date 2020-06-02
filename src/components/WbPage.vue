<template>
  <div
    class="wb-page"
    @touchstart.stop="onStart"
    @touchmove.stop="onMove"
    @touchend="onEnd"
  >
    <van-popup
      id="wbPage"
      v-model="isShow"
      position="right"
      :overlay="false"
      :style="{ width: '100%', height: '100%', overflow:'hidden' }"
      @closed="onClosed"
      @open="onOpen"
    >
      <slot />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'WbPage',
  props: {
  },
  data() {
    return {
      isShow: false,
      page: null,
      pageWidth: window.innerWidth, // 页面宽度
      startX: 0,
      moveLength: 0, // 手指当前滑动的距离
      isMove: false, // 是否发生左右滑动
      isStart: false,
      startT: 0, // 记录手指按下去的时间
      isTouchEnd: true // 标记当前滑动是否结束(手指已离开屏幕)
    }
  },

  methods: {
    show() {
      this.isShow = true
      this.$nextTick(() => {
        this.page = this.$el.querySelector('#wbPage')
      })
    },

    hide() {
      this.isShow = false
    },
    onOpen() {
      this.$emit('open')
    },
    onClosed() {
      this.$emit('closed')
      this.$onClosed()
    },

    onStart(e) {
      this.page.style.webkitTransition = ''
      this.page.style.transform = ''
      // 单手指触摸或者多手指同时触摸，禁止第二个手指延迟操作事件
      if (e.touches.length === 1 || this.isTouchEnd) {
        const touch = e.touches[0]
        this.startX = touch.pageX
        if (this.startX > 15) {
          return
        }
        this.isStart = true
        // this.page.style.webkitTransition = ''
        this.startT = +new Date() // 记录手指按下的开始时间
        this.isMove = false // 是否产生滑动
        this.isTouchEnd = false // 当前滑动开始
      }
    },

    onMove(e) {
      if (!this.isStart) {
        return
      }
      e.preventDefault() // 防止滑动穿透
      // 如果当前滑动已结束，不管其他手指是否在屏幕上都禁止该事件
      if (this.isTouchEnd) return
      const touch = e.touches[0]
      const deltaX = touch.pageX
      if (deltaX >= 0) {
        this.page.style.willChange = 'transform'
        this.page.style.transform = `translate3d(${deltaX.toFixed(0)}px, -50%, 0)`
        this.page.style.webkitTransform = `translate3d(${deltaX.toFixed(0)}px, -50%, 0)`
        this.isMove = true
        this.moveLength = deltaX
      }
    },

    onEnd(e) {
      // 防止页面蒙层没有消失，页面出现假死
      if (this.page && this.page.style.display === 'none') {
        e.preventDefault() // 防止点击穿透
        const el = document.body
        el.removeChild(this.$el)
        this.$nextTick(() => {
          this.$destroy()
        })
      }
      if (!this.isStart) {
        return
      }
      this.isStart = false
      // 计算手指在屏幕上停留的时间
      const deltaT = +new Date() - this.startT
      // 发生了滑动，并且当前滑动事件未结束
      if (this.isMove && !this.isTouchEnd) {
        this.isTouchEnd = true // 标记当前完整的滑动事件已经结束
        // 使用动画过渡让页面滑动到最终的位置
        this.page.style.webkitTransition = '0.3s ease -webkit-transform'
        if (deltaT < 300) { // 如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
        // 返回上层页面
          this.page.style.transform = `translate3d(${this.pageWidth}px, -50%, 0)`
          this.$popPage()
        } else {
        // 如果滑动距离小于屏幕的50%，则退回到上一页
          if (Math.abs(this.moveLength) / this.pageWidth < 0.5) {
            this.page.style.transform = 'translate3d(0, -50%, 0)'
          } else {
            this.page.style.transform = `translate3d(${this.pageWidth}px, -50%, 0)`
            this.$popPage()
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wb-page{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: transparent;
}

</style>

