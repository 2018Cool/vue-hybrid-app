// 列表请求 混合
const debounce = {
  data() {
    return {
      debouncing: false
    }
  },
  methods: {
    $debounce(func, args, delay = 350) {
      if (typeof func !== 'function') {
        console.error('$debounce的参数不是函数，传参有误请检查')
        return
      }
      if (this.debouncing) {
        return
      }
      this.debouncing = true
      setTimeout(() => {
        this.debouncing = false
      }, delay)
      func.call(this, args)
    }
  }
}

export default {
  install(Vue) {
    Vue.mixin(debounce)
  }
}
