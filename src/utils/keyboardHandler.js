/**
 * 处理键盘弹出，输入框高度自动调整
 */
import { Plugins } from '@capacitor/core'
const { Keyboard } = Plugins
export class KeyboardHandler {
  offsetY
  wbContent
  isTouched=false
  isKeyboardShow = false
  timer
  viewportHeight = window.innerHeight
  showEventHandler
  hideEventHandler
  constructor(wbContent) {
    this.wbContent = wbContent
  }

  tapCoordinates = (event) => {
    this.isTouched = false
    // const targetName = event.target.localName
    this.offsetY = Math.floor(event.touches[0].clientY)
    // if (this.offsetY < this.viewportHeight / 3) {
    //   return
    // }
    // if (targetName !== 'input' && targetName !== 'textarea') {
    //   return
    // }
    this.isTouched = true
  }

  keyboardShowHandler = (event) => {
    this.isKeyboardShow = true
    if (!this.wbContent || !this.isTouched) {
      return
    }
    this.setStyle(event.keyboardHeight)
  }

  keyboardHideHandler = () => {
    if (this.isKeyboardShow) {
      this.isTouched = false
      if (this.wbContent) {
        this.wbContent.removeAttribute('style')
      }
      this.isKeyboardShow = false
    }
  }

  setStyle(keyboardHeight) {
    const contentStyle = this.wbContent.style
    const fixHeight = 85
    const offsetTop = this.viewportHeight - keyboardHeight - fixHeight
    const offset = -(this.offsetY - offsetTop)
    contentStyle.paddingBottom = keyboardHeight + 'px'
    if (offset > 0) {
      return
    }
    console.log('offset :' + offset)
    contentStyle.top = offset + 'px'
  }

  addKeyboardListener() {
    console.log('add listener')
    this.showEventHandler = Keyboard.addListener('keyboardWillShow', this.keyboardShowHandler)
    this.hideEventHandler = Keyboard.addListener('keyboardWillHide', this.keyboardHideHandler)

    // window.addEventListener('keyboardDidShow', this.keyboardShowHandler)
    // window.addEventListener('keyboardWillHide', this.keyboardHideHandler)
    this.wbContent.addEventListener('touchstart', this.tapCoordinates)
  }
  removeKeyboardListener() {
    console.log('remove listener')
    this.showEventHandler && typeof this.showEventHandler.remove === 'function' && this.showEventHandler.remove()
    this.hideEventHandler && typeof this.hideEventHandler.remove === 'function' && this.hideEventHandler.remove()
    // window.removeEventListener('keyboardDidShow', this.keyboardShowHandler)
    // window.removeEventListener('keyboardWillHide', this.keyboardHideHandler)
    this.wbContent.removeEventListener('touchstart', this.tapCoordinates)
    if (this.wbContent) {
      this.wbContent = null
    }
  }
}
