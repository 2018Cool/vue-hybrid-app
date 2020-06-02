const app = {
  state: {
    deviceInfo: {}, // 设备信息
    allSelectOptions: {}, // 下拉选信息
    refreshFlags: { projects: false, contacts: false, customers: false, data: false } // 切换组织后需要刷新数据开关
  },
  mutations: {
    UPDATE_DEVICE_INFO: (state, value) => {
      state.deviceInfo = value
    },

    UPDATE_SELECTION_OPTIONS: (state, value) => {
      state.allSelectOptions = value
    },
    UPDATE_REFRESH_FLAGS: (state, value) => {
      state.refreshFlags = value
    },
    CLEAR_POP: (state) => {
      state.pageStack = []
    }
  },
  actions: {
    SetDeviceInfo: ({ commit }, value) => {
      commit('UPDATE_DEVICE_INFO', value)
    },
    setSelectionOptions: ({ commit }, value) => {
      commit('UPDATE_SELECTION_OPTIONS', value)
    },
    setRefreshFlags: ({ commit }, value) => {
      commit('UPDATE_REFRESH_FLAGS', value)
    }

  }
}

export default app
