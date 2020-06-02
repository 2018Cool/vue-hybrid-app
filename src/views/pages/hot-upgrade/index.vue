<template>
  <wb-modal class="my-upgrade d-flex align-items-center">
    <!-- <wb-content :has-header="false" :watermarks="false"> -->
    <div class="my-content d-flex flex-column align-items-center p-4">
      <img src="@/assets/logo.png" class="logo-style">
      <p class="text-gray mt-2" style="font-size:13px">
        {{ tip }}
      </p>
      <van-progress :percentage="percentage" class="w-100 my-3" />
    </div>
    <!-- </wb-content> -->
  </wb-modal>
</template>

<script>
import { Progress } from 'vant'
export default {
  name: 'HotUpgrade',
  components: {
    [Progress.name]: Progress
  },
  data() {
    return {
      percentage: 0,
      tip: '正在升级，请稍后...'
    }
  },
  mounted() {
    this.$bus.$emit('forbiddenBackbutton') // 禁用android返回键，防止页面被返回
    window.addEventListener('upgradeProgress', this.onProgress)
    this.$bus.$on('hotUpgradeSuccess', () => {
      this.tip = '升级成功，正在重新加载...'
    })
    this.$bus.$on('hotUpgradeFail', () => {
      this.tip = '升级失败，请稍后重试'
      setTimeout(() => {
        this.$bus.$emit('allowBackbutton') // 启用android返回键
        this.$popPage()
      }, 2000)
    })
  },
  beforeDestroy() {
    // 实例销毁之前去除监听器
    this.$bus.$off('hotUpgradeSuccess')
    this.$bus.$off('hotUpgradeFail')
    window.removeEventListener('upgradeProgress', this.onProgress)
  },
  methods: {
    onProgress(data) {
      const progress = (data.progress || 0) * 100
      this.percentage = +progress.toFixed(0)
      this.tip = '正在升级，请稍后...'
    }
  }

}
</script>

<style lang="scss">
  .my-upgrade {
    background: rgba(0, 0, 0, 0.7);
    .my-content{
      width: 100%;
      background: white;
      margin: 15px;
      border-radius: 10px;
    }

    .logo-style {
      width: 15vw;
      max-width: 80px;
    }
  }
</style>
