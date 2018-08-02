import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import menu from './modules/menu'
import login from './modules/login'
import dashboard from './modules/dashboard'



Vue.use(Vuex)

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        global,
        menu,
        login,
        dashboard
    },
    strict: false,
    plugins: []
})
