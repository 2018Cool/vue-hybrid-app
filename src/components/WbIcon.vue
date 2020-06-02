<template>
  <van-icon class-prefix="my-icon" :style="{fontWeight:bold?'bold':'normal'}" :name="name" :size="size" :color="color" @click="$emit('click')" />
</template>

<script>
export default {
  name: 'WbIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: () => 18
    },
    bold: Boolean,
    color: {
      type: String,
      default: () => '#fff'
    }
  }
}
</script>

