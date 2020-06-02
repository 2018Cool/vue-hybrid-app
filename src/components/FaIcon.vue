<template>
  <van-icon class-prefix="fa" :style="{fontWeight:bold?'bold':'normal'}" :name="name" :size="size" :color="color" @click="$emit('click')" />
</template>

<script>
export default {
  name: 'FaIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: () => 16
    },
    bold: Boolean,
    color: {
      type: String,
      default: () => ''
    }
  }
}
</script>

