import Debounce from './debounce'
const mixins = [
  Debounce
]
export default {
  install(Vue) {
    mixins.forEach((item) => {
      Vue.use(item)
    })
  }
}
