import tool from '@/utils/tool'

const state = {
    token: tool.getStorage('token',''),
    scrollTop: 0,
    sidebarCollapse: false,
    visitedViews:[],
    cachedViews: [],
    alert:{
        show:false,
        title:'',
        content:'',
        onShow:function(){},
        onHide:function(){}
    },
    // 小区后台，管理人管理的小区列表
    communityOptions:[],
    // 房源特色
    featureList:[],
    // 物业后台，公司下属的小区列表
    companyCommunityOptions:[],
    // 物业后台，管理员下拉列表
    companyManagerSelect:[],

    // 省市区
    provinceOptions:[],
    cityOptions:[],
    countyOptions:[],

    // 大后台
    couponOptions:[], // 优惠券下拉列表
}

// getters
const getters = {

}

// mutations
const mutations = {
    updatePosition (state, data) {
        state.scrollTop = data
    },
    updateAlert (state, data) {
        state.alert = data
    },
    updateSideBar(state, data) {
        state.sidebarCollapse = data
    },
    addVisitedViews: (state, data) => {
        if (state.visitedViews.some(v => v.path === data.path)) return
        var title = data.meta.title || '未命名'
        if(data.name == 'ExternalLink'){
            var reg=/(http|https)\:\/\/([a-zA-Z0-9\.\/]+)/;
            title += reg.exec(data.query.url)[2] || data.query.url
        }
        state.visitedViews.push({
            name: data.name,
            path: data.path,
            query:data.query,
            title
        })
        state.cachedViews.push(data.name)
    },
    delVisitedViews: (state, data) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === data.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
        for (const i of state.cachedViews) {
            if (i === data.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews.splice(index, 1)
                break
            }
        }
    },
    delOthersViews: (state, data) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === data.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1)
                break
            }
        }
        for (const i of state.cachedViews) {
            if (i === data.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews = state.cachedViews.slice(index, i + 1)
                break
            }
        }
    },
    delAllViews: (state) => {
        state.visitedViews = []
        state.cachedViews = []
    },
    updateToken(state, data) {
        state.token = tool.setStorage('token', data)
    },
    updateOptions(state, data) {
        state.communityOptions = data
    },
    updateFeatureList(state, data) {
        state.featureList = data
    },
    updateCompanyCommunityOptions(state, data){
        state.companyCommunityOptions = data
    },
    updateCompanyManagerSelect(state, data){
        state.companyManagerSelect = data
    },
    updateProvince(state,data){
        state.provinceOptions = data
    },
    updateCity(state,data){
        state.cityOptions = data
    },
    updateCounty(state,data){
        state.countyOptions = data
    },
    updateCoupon(state,data){
        state.couponOptions = data
    }

}

// actions
const actions = {
    updatePosition ({commit}, top) {
        commit('updatePosition', top)
    },
    toggleSideBar ({commit}) {
        commit('updateSideBar', !state.sidebarCollapse)
    },
    addVisitedViews({ commit }, data) {
        if(!data.name){
            return false
        }
        commit('addVisitedViews', data)
    },
    delVisitedViews({ commit, state }, data) {
            return new Promise((resolve) => {
                commit('delVisitedViews', data)
                resolve([...state.visitedViews])
            })
    },
    delOthersViews({ commit, state }, data) {
            return new Promise((resolve) => {
                commit('delOthersViews', data)
                resolve([...state.visitedViews])
            })
    },
    delAllViews({ commit, state }) {
            return new Promise((resolve) => {
                commit('delAllViews')
                resolve([...state.visitedViews])
            })
    },
    updateAlert ({commit}, data) {
        commit('updateAlert', data)
    },
    login({commit},cb){
        commit('updateToken', 'xxxxxxxxxxxxxxxxxxxx')
        cb && cb()
    },
    logout({commit},cb){
        commit('updateToken', '')
        cb && cb()
    },
    getCommunityOptions({commit},{params,cb}){
        params = params || {}
        tool.request('communityOptions',params).then((res)=>{
            commit('updateOptions',res.data)
            cb && cb(res.data)
        })
    },
    getFeature({commit},{params,cb}){
        params = params || {}
        tool.request('getFeature',params).then((res)=>{
            commit('updateFeatureList',res.data)
            cb && cb(res.data)
        })
    },
    getCompanyCommunityOptions({commit},{params,cb}){
        params = params || {}
        tool.request('companyCommunityOption',params).then((res)=>{
            commit('updateCompanyCommunityOptions',res.data)
            cb && cb(res.data)
        })
    },
    getCompanyManagerSelect({commit},{params,cb}){
        params = params || {}
        tool.request('companyManagerSelect',params).then((res)=>{
            commit('updateCompanyManagerSelect',res.data)
            cb && cb(res.data)
        })
    },
    
    // 获取省市区
    getProvince({commit},{params,cb}){
        params = params || {}
        tool.request('getProvince',params).then((res)=>{
            commit('updateProvince',res.data)
            cb && cb(res.data)
        })
    },
    getCity({commit},{params,cb}){
        params = params || {}
        tool.request('getCity',params).then((res)=>{
            commit('updateCity',res.data)
            cb && cb(res.data)
        })
    },
    getCounty({commit},{params,cb}){
        params = params || {}
        tool.request('getCounty',params).then((res)=>{
            commit('updateCounty',res.data)
            cb && cb(res.data)
        })
    },
    getCoupon({commit},{params,cb}){
        params = params || {}
        tool.request('couponList',params).then((res)=>{
            commit('updateCoupon',res.data)
            cb && cb(res.data)
        })
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
