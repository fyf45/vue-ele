import tool from '@/utils/tool'

const allTodos_id=[]

const state = {
    user:{
        name:'',
        position:'',
        img:'',
        community_name:'',
        company_name:'',
        login:'',
        manager_no:'',
        mobile:'',
    }
}

const mutations = {
    updateUser (state,data) {
        state.user.name = data.name
        state.user.img = data.img
    }
}
const actions = {
    getData({commit}){

    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
