<template>
  <button class="wb-icon-button" :style="getStyle" :disabled="disabled?'disabled':false" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'WbIconButton',
  props: {
    size: {
      type: [Number, String],
      default: () => 16
    },
    color: {
      type: String,
      default: () => '#1989fa'
    },
    disabled: Boolean,
    bgColor: {
      type: String,
      default: () => '#fff'
    }
  },
  computed: {
    getStyle() {
      return { backgroundColor: this.bgColor, color: this.color, fontSize: this.size + 'px',
        opacity: this.disabled ? 0.6 : 1
      }
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.wb-icon-button{
  max-height: 64px;
  max-width: 64px;
  padding:5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
}
</style>

