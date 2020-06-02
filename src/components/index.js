/**
 * 全局注册组件，局部使用的组件请不要添加到全局组件中区
 */
import WbNav from './WbNav.vue'
import WbContent from './WbContent.vue'
import VantCompants from './vant-compontents'
import WbPicker from './WbPicker'
import WbModal from './WbModal'
import WbList from './WbList'
import WbPage from './WbPage'
import WbFooter from './WbFooter'
import WbButtonGroup from './WbButtonGroup'
import WbImageUploader from './WbImageUploader'
import WbIconButton from './WbIconButton'
import WbIcon from './WbIcon'
import FaIcon from './FaIcon'
import WbPopover from './WbPopover'
const components = [
  WbNav,
  WbContent,
  WbPicker,
  WbModal,
  WbList,
  WbPage,
  WbFooter,
  WbIcon,
  FaIcon,
  WbPopover,
  WbIconButton,
  WbButtonGroup,
  WbImageUploader,
  ...VantCompants
]

export default {
  install(Vue) {
    components.forEach((item) => {
      Vue.component(item.name, item)
    })
  }
}

