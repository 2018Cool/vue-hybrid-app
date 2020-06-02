<template>
  <div class="wb-popover">
    <van-overlay
      :show="show"
      @click="hideAll"
      @touchmove="hideAll"
    />
    <popper
      ref="popper"
      trigger="click"
      :options="{
        placement: 'bottom'
      }"
      class="d-flex flex-column align-items-center"
      @show="onShow"
      @hide="onHide"
    >
      <div class="popper" :class="tooltip ? 'my-tooltip' : 'my-popover'" @click.capture="closePopover">
        <slot />
      </div>

      <slot slot="reference" name="button" />
    </popper>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'
export default {
  name: 'WbPopover',
  components: {
    'popper': Popper
  },
  props: {
    tooltip: Boolean
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    closePopover() {
      const popper = this.$refs.popper
      popper.doClose()
    },
    hideAll() {
      this.show = false
      this.closePopover()
    },
    onShow() {
      this.show = true
    },
    onHide() {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
.wb-popover{
  .van-overlay{
    background-color: transparent;
  }
  .popper{
    min-width:100px;
    display: flex;
    flex-direction: column;
    align-items:center;
    font-size:14px;
    background-color:rgba(0,0,0,0.9);
    color:white;
    border:none;
  }
  .my-popover{
     padding:2px 5px;
    span{
      display: inline-block;
      line-height: 38px;
      width:100%;
    }
    span:not(:last-of-type)::after{
      display: block;
      content: '';
      height: 1px;
      width:100%;
      background-color: white;
      transform: scaleY(0.4);
      transform-origin: 50% 100%;
    }
  }
  .my-tooltip{
    width:90%;
    font-size:12px;
    line-height: 20px;
    padding:10px;
    align-items: flex-start;
    width:auto;
    span{
    left:0;
    }
  }
  .backlay{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top:0;
    left:0;
    background-color: black;
  }
  .popper__arrow{
    border-bottom-color: rgba(0,0,0,0.9) !important;
  }
}
</style>

