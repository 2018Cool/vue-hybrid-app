import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo,
  getOrgCode, setOrgCode, getIsTopOrg, setIsTopOrg, getIsTobyTeam, setIsTobyTeam } from '@/storage'
import { getSvgBase64Img } from '../../utils'
// import { Plugins } from '@capacitor/core'
const user = {
  state: {
    token: getToken(),
    userInfo: getUserInfo(),
    watermasksImg: '',
    orgCode: getOrgCode(),
    isTopOrg: Boolean(getIsTopOrg()),
    isTobyTeam: Boolean(getIsTobyTeam())
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_INFO: (state, info) => {
      state.userInfo = info
      setUserInfo(info)
    },
    SET_ORG: (state, code) => {
      state.orgCode = code
      setOrgCode(code)
    },
    SET_TOP_ORG: (state, flag) => {
      state.isTopOrg = Boolean(flag)
      setIsTopOrg(flag)
    },
    SET_IS_TOBY_TEAM: (state, flag) => {
      state.isTobyTeam = Boolean(flag)
      setIsTobyTeam(flag)
    },
    SET_WATERMASKS: (state) => {
      const info = state.userInfo
      state.watermasksImg = getSvgBase64Img(`${info.id}(${info.name})`)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const token = data.token

          const userInfo = { id: data.userName, name: data.nickName }
          commit('SET_TOKEN', token)
          commit('SET_INFO', userInfo)
          commit('SET_WATERMASKS') // 解决用户首次登录水印异常问题
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      })
    },

    // 设置水印
    SetWatermasks({ commit }) {
      commit('SET_WATERMASKS')
    },
    // 登录时或个人设置选择组织
    SetOrgCode({ commit }, code) {
      commit('SET_ORG', code)
    },

    // 设置是否为顶层组织
    SetTopOrg({ commit }, isTopOrg) {
      commit('SET_TOP_ORG', isTopOrg)
    },

    // 设置是否为顶层组织
    SetIsTobyTeam({ commit }, isTobyTeam) {
      commit('SET_IS_TOBY_TEAM', isTobyTeam)
    }
  }
}

export default user
