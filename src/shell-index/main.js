import 'capacitor-utils-plugin'
import { Plugins } from '@capacitor/core'
const { Modals, Network, SplashScreen, UtilsPlugin } = Plugins
let url = ''
const env = process.env.VUE_APP_NATIVE_ENV

async function showConfirm(message) {
  const options = {
    cancelButtonTitle: '重试',
    message,
    okButtonTitle: '退出',
    title: '提示'
  }
  const result = await Modals.confirm(options)
  if (result.value) {
    UtilsPlugin.exitApp()
  } else {
    const status = await Network.getStatus()
    if (!status.connected) {
      showConfirm('暂无网络连接，请检查网络后重试')
      return
    }
    location.replace(url)
  }
}

window.onload = async() => {
  const status = await Network.getStatus()
  if (env === 'production') {
    url = `https://www.baidu.com`
  } else if (env === 'development') {
    url = 'http://10.107.117.19:8080/app/index.html?' + Date.now()
  }
  if (!status.connected) {
    SplashScreen.hide()
    showConfirm('暂无网络连接，请检查网络后重试')
  } else {
    location.replace(url)
  }
}

