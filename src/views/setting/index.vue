<template>
  <div>
    <wb-nav title="个人中心" />
    <wb-content has-footer>
      <div class="w-100 d-flex flex-column align-items-center">
        <div class="setting">
          <img src="@/assets/logo.png" width="70px" class="mt-3" @click="tapIcon">
          <span class="version">V{{ version }}<span v-if="buildTime">-Build{{ buildTime }}</span></span>
          <van-field label="用户名" input-align="right" readonly :value="`${userInfo.id}(${userInfo.name})`" />
          <!--<van-field is-link label="联系人" readonly @click="showContactPage" />-->
          <!-- <van-grid square clickable center :column-num="3" class="w-100 m-2" style="border-left: 1px solid #F9F9FB">
            <van-grid-item
              v-for="(item,index) in apps"
              :key="index"
              icon="photo-o"
              :text="item.text"
              @click="showApp(item)"
            />
          </van-grid> -->
          <div v-show="displayLogoutCount < 5" style="width: 100%">
            <van-button
              block
              :loading="loading"
              loading-type="spinner"
              loading-text="退出登录中..."
              type="info"
              class="mt-4"
              @click="logOut"
            >
              退出登录
            </van-button>
          </div>
        </div>
      </div>
    </wb-content>
  </div>
</template>

<script>

import { showConfirm } from '@/utils'
const buildTime = process.env.VUE_APP_BUILD_TIME
export default {
  data() {
    return {
      loading: false,
      userInfo: {},
      version: '',
      buildTime: buildTime,
      displayLogoutCount: 1
    }
  },
  computed: {
    isTopOrg() {
      return this.$store.getters.isTopOrg
    }
  },
  created() {
    this.userInfo = this.$store.getters.userInfo
    const devInfo = this.$store.getters.deviceInfo
    this.version = devInfo.appVersion || '1.0.0'
  },
  methods: {
    showApp(item) {
      this.$pushPage(item.page)
    },
    tapIcon() {
      // console.log(this.displayLogoutCount)
      ++this.displayLogoutCount
    },
    logOut() {
      showConfirm({ message: '确定退出登录？' }).then(() => {
        this.loading = true
        this.$store.dispatch('LogOut').then(() => {
          this.loading = false
          this.$bus.$emit('Logout') // 触发退出登录事件
          this.$router.replace('/login')
        }).catch(() => {
          this.loading = false
        })
      }, () => {})
    }
  }
}
</script>
<style lang="scss">
.setting {
  width:90vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .version{
    font-size:12px;
     color:#969799;
    padding:5px;
  }
  .van-field__control{
    color:#969799;
  }
  .van-button{
    border-radius: 10px;
  }
}
</style>

