/**
 * 全局插件
 */
import Bus from './bus/index'
import Log from './log'
import IphoneDetector from './iphoneDetector'
import { Lazyload, ImagePreview } from 'vant'
import ErrorHandler from './errorHandler'
import NavPush from './navPush'
// import WbNav from './wb-nav/index'

const plugins = [
  ErrorHandler,
  Bus,
  Log,
  IphoneDetector,
  Lazyload,
  ImagePreview,
  NavPush
]
export default {
  install(Vue) {
    plugins.forEach((item) => {
      Vue.use(item)
    })
  }
}
