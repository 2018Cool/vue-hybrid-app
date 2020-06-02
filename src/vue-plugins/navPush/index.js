import { Dialog } from 'vant'
// 页面出栈入栈操作
const pageStack = [] // 页面栈

// 出栈
function popPage(value) {
  if (!value || !pageStack.includes(value)) {
    return
  }
  let page = pageStack.pop()
  if (page !== value) {
    pageStack.push(page)
    pageStack.splice(pageStack.indexOf(value), 1)
    page = value
  }
  return page
}
function clickBackBtnPopPage() {
  const page = pageStack.pop()
  if (page && page.isDialog) {
    if (page.isCanClose) {
      Dialog.close()
    } else {
      pageStack.push(page)
    }
  } else {
    page && page.$popPage()
  }
}

// 入栈
function pushPage(page) {
  page && pageStack.push(page)
}

// 页面栈深度
function pageDeep() {
  return pageStack.length
}
const install = function(Vue) {
  if (install.installed) return
  const el = document.body
  function navPush(store, router) {
    return function(component, data) {
      const Page = Vue.extend(component)
      const instance = new Page({ store: store, router: router, propsData: data }).$mount()
      el.appendChild(instance.$el)
      const page = instance.$children[0]
      if (page && page.show) {
        instance.$closeCallback = null
        instance.$callbackData = null
        instance.onPageClose = function(callback) { // 对话框关闭回掉函数
          instance.$closeCallback = callback
        }
        instance.$popPage = (data, delay = 0) => {
          if (data) {
            instance.$callbackData = data
          }
          if (delay === 0) {
            popPage(instance)
            page.hide()
          } else {
            setTimeout(() => {
              popPage(instance)
              page.hide()
            }, delay)
          }
        }
        page.$onClosed = function() {
          if (instance.$closeCallback) {
            instance.$closeCallback(instance.$callbackData)
          }
          el.removeChild(instance.$el)
          instance.$destroy()
        }
        page.$popPage = instance.$popPage
        page.show()
        pushPage(instance)
        return instance
      }
    }
  }

  Vue.mixin({
    created() {
      if (!this.$pushPage) {
        this.$pushPage = navPush(this.$store, this.$router)
      }
    }
  })
}

export default {
  install,
  pageDeep,
  clickBackBtnPopPage,
  pushPage
}

