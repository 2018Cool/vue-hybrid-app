import Vue from 'vue'
import App from './App'
import router from './router'
import Components from './components'
import Directives from './directives'
import VuePlugins from './vue-plugins'
import Mixins from './mixins'
import 'vant/lib/icon/local.css'
import 'v-charts/lib/style.css'
import './styles/index.scss'
import 'font-awesome/scss/font-awesome.scss'
import store from '@/store'
import { Plugins } from '@capacitor/core'
import { setDeviceInfo } from '@/storage'
if (process.env.NODE_ENV === 'mock') {
  require('@/mock')
}
Vue.use(Directives)
Vue.use(Components) // 注册自定义组件和vant组件
Vue.use(VuePlugins)
Vue.use(Mixins)
Vue.config.productionTip = false
// Vue.use(Mixins)
// user有调用request,request依赖store，因此需要确保store已经初始化
const startTimer = setTimeout(() => {
  // console.log('start timeout')
  onDeviceReady()
}, 400)
let isStart = false

function onDeviceReady() {
  if (isStart) {
    return
  }
  isStart = true
  if (startTimer) {
    clearTimeout(startTimer)
  }
  Plugins.Device.getInfo().then((info) => {
    if (window.device) {
      info.model = window.device.model
    } else {
      Vue.mixin({
        data() {
          return {
            isIphoneX: false,
            isIphone: false
          }
        }
      })
    }

    setDeviceInfo(JSON.stringify(info))
    // const store = require('@/store/index').default
    store.dispatch('SetDeviceInfo', info)
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')

    if (info.platform === 'web') { // Web端调试不初始化热升级和APP全量升级
      return
    }

    // if (process.env.NODE_ENV === 'production') {
    //  setTimeout(() => {
    //     initUpgrader().then(() => {
    //       checkUpdate() // 检查升级
    //     }) // 初始化热升级
    //   }, 500)
    // } else if (process.env.NODE_ENV === 'development') {
    //   setTimeout(() => {
    //     checkAPPUpdate()
    //   }, 500)
    // }
  })

  window.device && document.removeEventListener('deviceready', onDeviceReady, false)
}

document.addEventListener('deviceready', onDeviceReady, false)

