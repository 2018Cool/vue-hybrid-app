import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import app from './modules/app'
import user from './modules/user'
import projects from './modules/projects'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { app, user, projects },
  getters
})
export default store
