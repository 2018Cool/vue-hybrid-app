// iphonex 检测
export default {
  install(Vue) {
    document.addEventListener('deviceready', onDeviceReady, false)
    function onDeviceReady() {
      const model = window.device.model
      const modelNO = +(model.replace('iPhone', '').replace(',', '')) // iphone 设备型号为 iPhone10,3，把后面的数字字符转换为数字
      let isIphoneX = false
      if (modelNO >= 106 || modelNO === 103) {
        isIphoneX = true
      }
      const isIphone = window.device.platform.toLowerCase() === 'ios'
      Vue.mixin({
        data() {
          return {
            isIphoneX,
            isIphone
          }
        }
      })
      document.removeEventListener('deviceready', onDeviceReady)
    }
  }
}

