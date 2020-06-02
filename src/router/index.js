import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes
  // scrollBehavior: (to, from, savedPosition) => new Promise((resolve) => {
  //   // debugger
  //   const position = savedPosition || {}
  //   if (to.hash) {
  //     position.selector = to.hash
  //   }
  //   if (to.meta.keepAlive) {
  //     position.x = 0
  //     position.y = to.meta.scrollTop
  //   }

  //   router.app.$bus.$once('triggerScroll', () => {
  //     router.app.$nextTick(() => {
  //       // const $content = document.querySelector('#wb-content')
  //       // if ($content) {
  //       //   $content.scrollTop = position.y
  //       // }
  //       setTimeout(() => {
  //         resolve(position)
  //       }, 500)
  //     })
  //   })
  // })
})

router.beforeEach((to, from, next) => {
  // const $content = document.querySelector('#wb-content')
  // const scrollTop = $content ? $content.scrollTop : 0
  // from.meta.scrollTop = scrollTop
  // const title = to.meta && to.meta.title
  const fromPath = from.path
  // if (title) {
  //   document.title = title
  // }
  const token = store.getters.token
  if (!token && to.path.indexOf('login') === -1) {
    return next('/login')
  }
  if (token && fromPath === '/' && to.path.indexOf('projects') === -1) {
    next('/projects')
  }
  next()
})

export default router
