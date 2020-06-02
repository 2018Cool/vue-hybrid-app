const routes = [
  {
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },

  {
    name: 'projects',
    component: () => import('@/views/projects'),
    meta: {
      title: '商机管理',
      keepAlive: true, // 需要被缓存
      isTabBar: true
    }
  },
  {
    name: 'setting',
    component: () => import('@/views/setting'),
    meta: {
      title: '设置',
      keepAlive: true, // 需要被缓存
      isTabBar: true
    }
  },
  {
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// add route path
routes.forEach((route) => {
  // eslint-disable-next-line no-param-reassign
  route.path = route.path || `/${route.name || ''}`
})

export default routes
