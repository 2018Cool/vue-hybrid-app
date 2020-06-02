// 日志插件
import { log } from '@/utils'
export default {
  install(Vue) {
    if (!Vue.$log) {
      Vue.$log = log
    } else {
      Vue.$log = log
    }

    Vue.mixin({
      created() {
        if (!this.$log) {
          this.$log = log
        }
      }
    })
  }
}
