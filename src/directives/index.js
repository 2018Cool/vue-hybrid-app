/**
 * 全局注册组件，局部使用的组件请不要添加到全局组件中区
 */
import Watermasks from './Watermasks'
const directives = [
  Watermasks
]

export default {
  install(Vue) {
    directives.forEach((item) => {
      Vue.directive(item.name, item)
    })
  }
}

