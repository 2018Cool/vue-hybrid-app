import { Toast } from 'vant'
import store from '@/store'
import { showConfirm } from '@/utils'
import { Http as WebHttp } from '@capacitor/http'
import { Plugins, registerWebPlugin } from '@capacitor/core'
registerWebPlugin(WebHttp)
const { Http } = Plugins

let BASE_URL = ''
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://www.baidu.com'
} else {
  BASE_URL = 'http://10.107.117.97:8080/front/api/entrance'
}
if (process.env.VUE_APP_DEV_URL) {
  BASE_URL = process.env.VUE_APP_DEV_URL
}

// const deviceInfo = store.getters.deviceInfo || {}
const headers = {
  'Token': store.getters.token || 'xxxx',
  'Organization': store.getters.orgCode || 'xxxx',
  // 'Platform': deviceInfo.platform || '',
  'BuildVersion': process.env.VUE_APP_BUILD_TIME,
  // 'AppVersion': deviceInfo.appVersion || '',
  'content-type': 'application/json'
}
const httpOptions = {
  headers,
  connectTimeout: 5
}
const service = (options) => {
  const { url, method } = options
  options.url = BASE_URL + url
  options.method = method.toUpperCase()
  options = Object.assign(httpOptions, options)
  return Http.request(options).then(response => {
    const res = response.data
    Toast.clear()
    if (res.code !== void 0 && res.code !== 0) {
      // 1002 暂未登录或token已经过期
      if (res.code === 1002) {
        showConfirm({
          title: '提示',
          message: '登录凭证失效！',
          confirmButtonText: '重新登录',
          cancelButtonText: '取消'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 页面重新加载
          })
        })
      } else {
        Toast({
          message: res.message || res.msg,
          type: 'fail',
          duration: 3 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    if (process.env.NODE_ENV === 'production') {
      Toast({
        message: '请求失败，请重试',
        type: 'fail',
        duration: 1 * 1500
      })
    } else {
      Toast({
        message: error.error || '网络请求出错，请检查网络',
        type: 'fail',
        duration: 3 * 1000
      })
    }
    console.log(error)
    return Promise.reject(error)
  })
}
export default service
