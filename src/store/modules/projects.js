/**
 * 商机列表已读未读
 */
import { getKeyValue, setKeyValue } from '@/storage'
import Vue from 'vue'
// import { Plugins } from '@capacitor/core'
const PRO_VERSION_KEY = 'projects_version'
const projects = {
  state: {
    projetcsVersion: JSON.parse(getKeyValue(PRO_VERSION_KEY)) || {},
    updatedProjects: {} // 最新30天内有更新的项目id数组
  },

  mutations: {
    ADD_NEW_PROJECT: (state, value) => {
      if (value) {
        const item = {}
        item[value] = 1
        Vue.set(state.updatedProjects, value, 1)
      }
    },
    RM_OLD_PROJECT: (state, value) => {
      const pros = state.updatedProjects
      if (!value || !pros[value]) {
        return
      }
      Vue.delete(state.updatedProjects, value)
    },
    RESET_PROJECT_VERSION: (state, value) => {
      state.updatedProjects = {}
    },
    SET_PROJECTS_VERSION: (state, value) => {
      if (value) {
        state.projetcsVersion = Object.assign(state.projetcsVersion, value)
        setKeyValue(PRO_VERSION_KEY, JSON.stringify(state.projetcsVersion))
      }
    }
  },

  actions: {
    addNewVersionProject: ({ commit }, value) => {
      commit('ADD_NEW_PROJECT', value)
    },
    rmOldVersionProject: ({ commit }, value) => {
      commit('RM_OLD_PROJECT', value)
    },
    resetProjectsVersion: ({ commit }, value) => {
      commit('RESET_PROJECT_VERSION', value)
    },
    setProjectsVersion: ({ commit }, value) => {
      commit('SET_PROJECTS_VERSION', value)
    }
  }
}

export default projects
