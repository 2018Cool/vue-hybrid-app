<template>
  <div id="app">
    <!-- <transition :name="transitionName" :css="!!transitionName"> -->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view class="router-view" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="router-view" />
    <!-- </transition> -->
    <div :style="{height:isIphoneX?'84px':'50px'}" class="tabbar-div">
      <van-tabbar
        v-show="$route.meta.isTabBar"
        v-model="active"
        :style="{bottom:isIphoneX?'34px':'0'}"
      >
        <van-tabbar-item icon="apps-o" @click="changePage('/projects')">
          项目
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" @click="changePage('/setting')">
          设置
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import { Plugins } from '@capacitor/core'

import { mapGetters } from 'vuex'
import HotUpgrade from './views/pages/hot-upgrade/index'
import { Dialog } from 'vant'
const { App, SplashScreen } = Plugins
export default {
  data() {
    return {
      transitionName: '',
      active: 1,
      forbiddenBackbutton: false // 是否禁用返回按钮
    }
  },
  computed: {
    ...mapGetters([
      'updatedProjects',
      'dialogStack',
      'pageStack',
      'token'
    ]),
    hasNewProject() {
      return Object.keys(this.updatedProjects).length !== 0
    }
  },

  beforeCreate() {
    // this.$navigation.cleanRoutes()
    this.transitionName = ''
  },
  created() {
    // 设置水印
    // this.$store.dispatch('SetWatermasks')

    // this.$navigation.on('forward', (to, from) => {
    //   const routers = this.$navigation.getRoutes()
    //   if (routers.length === 1) {
    //     this.transitionName = ''
    //   } else {
    //     this.transitionName = 'slide-left'
    //   }
    // })
    // this.$navigation.on('back', (to, from) => {
    //   this.transitionName = 'slide-right'
    //   // this.$nextTick(this.setScrollPosition)
    // })
    // this.$navigation.on('replace', (to, from) => {
    //   this.transitionName = ''
    // })
    // this.$navigation.on('refresh', (to, from) => {
    //   this.transitionName = ''
    // })
    // this.$navigation.on('reset', () => {
    //   console.log('reset')
    //   this.transitionName = ''
    // })
  },

  mounted() {
    this.initListener()
    let exit = false
    App.addListener('backButton', () => {
      const dialogStack = this.dialogStack
      if (dialogStack && dialogStack.length !== 0) {
        const info = this.dialogStack[0]
        if (info && info.isCanBack) {
          Dialog.close()
        } else {
          return
        }
      }
      if (this.forbiddenBackbutton) {
        return
      }
      const pageStack = this.pageStack || []
      const len = pageStack.length
      if (len === 0) { // 点击返回键两次退出
        if (!exit) {
          this.$toast({
            duration: 1500,
            message: '再次点击返回键退出'
          })
          exit = true
          setTimeout(() => {
            exit = false
          }, 1500)
        } else {
          App.exitApp()
        }
      } else {
        const topPage = pageStack[len - 1]
        topPage.$popPage()
        // this.$bus.$emit('backButtonActive', )
      }
    })
    // keybordHandler.addKeyboardListener()
    setTimeout(() => {
      SplashScreen.hide()
    }, 50)
  },

  methods: {
    /**
     * 转场动画 modal页面是上下切换，普通页面是左右切换
     */
    changePage(path) {
      this.$router.replace({ path: path })
    },
    initListener() {
      // 解决手动退出登录之后，再次登录 tab激活项不是初始状态的问题
      this.$bus.$on('Logout', () => {
        this.active = 1
      })
      this.$bus.$on('forbiddenBackbutton', () => { // 禁止返回键
        this.forbiddenBackbutton = true
      })
      this.$bus.$on('allowBackbutton', () => { // 允许返回键
        this.forbiddenBackbutton = false
      })
      this.$bus.$on('hotUpgradeStarting', () => { // 热升级
        this.$pushPage(HotUpgrade)
      })
    },
    setScrollPosition() {
      if (!this.$route.meta.keepAlive) {
        return
      }
      const { scrollTop } = this.$route.meta
      const $content = document.querySelector('#wb-content')
      if (scrollTop && $content) {
        $content.scrollTop = scrollTop
      }
    }
  }
}
</script>

<style lang="scss">
body{
  width:100vw;
  height:100vh;
  user-select:element;
}
#app{
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .router-view{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: transform .3s cubic-bezier(.55,0,.1,1);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .tabbar-div{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:white;
    z-index:200;
  }
  .slide-left-enter, .slide-right-leave-active {
    // will-change: transform;
   //opacity: 0;
   transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active, .slide-right-enter {
  // will-change: transform;
  // opacity: 0;
   transform: translate3d(-100%, 0, 0);
}

  .slide-enter-active {
    // will-change: transform;
    animation: bounce-in .2s;
  }
   .slide-leave-active {
    animation: bounce-out .2s;
  }
  @keyframes bounce-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }

    100% {
      transform: translate3d(0px, 0, 0);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: translate3d(0px, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
}
body{
  -webkit-font-smoothing: antialiased;
}

</style>
