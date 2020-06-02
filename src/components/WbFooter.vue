<template>
  <div class="wb-footer" :style="{height:isIphoneX?'85px':'51px'}">
    <div class="wb-footer-content" :style="{bottom:isIphoneX?'34px':'0'}">
      <slot class="w-100" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WbFooter'
}
</script>
<style lang="scss" scoped>
.wb-footer{
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  background:white;
.wb-footer-content{
  width:100%;
  max-height:50px;
  z-index:30;
  position: fixed;
  bottom:0;
}
}

</style>

