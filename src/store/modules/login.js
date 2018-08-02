import tool from '@/utils/tool'

const state = {
    items:{
        data:[],
        sort:{
            field:'id',
            order:"desc"
        },
        page: 1,       // 当前页数
        per_page: 10,     // 每页限制条目数
        total: 0    // 总条目
    }
}

const mutations = {
    updateSort(state,data){
        state.items.sort = data
    },
    updateData(state,data){
        state.items.data = data
    },
    updatePage(state,data){
        state.items.page = data
    },
    updatePerPage(state,data){
        state.items.per_page = data
    },
    updateTotal(state,data){
        state.items.total = data
    },
}

const actions = {
    setPage({commit, dispatch},data){
        commit('updatePage', data)
        dispatch('getList',{})
    },
    setPerPage({commit, dispatch},data){
        commit('updatePerPage', data)
        commit('updatePage', 1)
        dispatch('getList',{})
    },
    setSort({commit, dispatch},data){
        commit('updateSort', data)
        commit('updatePage', 1)
        dispatch('getList',{})
    },
    getList({commit},{params,cb}){
        params = params || {}
        params = Object.assign(params, {
            // filters:state.items.filters,
            sort:state.items.sort,
            page:state.items.page,
            per_page:state.items.per_page
        })
        tool.request('loginList',params).then((res)=>{
            commit('updateData', res.data)
            commit('updateTotal', res.meta.pagination.total)
            cb&&cb()
        })
    },
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}