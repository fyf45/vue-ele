import tool from '@/utils/tool'
const xitongPlat = [
    {
        "id": 1,
        "icon": "iconfont icon-shouye",
        "title": "首页",
        "url": "/dashboard",
        "menu": []
    },
    {
        "id": 2,
        "icon": "iconfont icon-fangyuanxuanzhong",
        "title": "物业管理",
        "url": "",
        "menu": [
            {
                "id":21,
                "title":"物业管理",
                "icon":"",
                "pid":2,
                "url":"/manageproperty"
            },
            {
                "id":22,
                "title":"小区管理",
                "icon":"",
                "pid":2,
                "url":"/communitylist"
            }
        ]
    },
    {
        "id": 3,
        "icon": "iconfont icon-zu",
        "title": "在租管理",
        "url": "",
        "menu": [
            {
                "id":31,
                "title":"在租房源",
                "icon":"",
                "pid":3,
                "url":"/renthouseplat"
            },
            {
                "id":32,
                "title":"下架房源",
                "icon":"",
                "pid":3,
                "url":"/renthouseoutplat"
            }
        ]
    },
    {
        "id": 4,
        "icon": "iconfont icon-wodedingdan",
        "title": "在售管理",
        "url": "",
        "menu": [
            {
                "id":41,
                "title":"在售房源",
                "icon":"",
                "pid":4,
                "url":"/sellhouseplat"
            },
            {
                "id":42,
                "title":"下架房源",
                "icon":"",
                "pid":4,
                "url":"/sellhouseoutplat"
            }
        ]
    },
    {
        "id": 5,
        "icon": "iconfont icon-zuhuguanli",
        "title": "人员管理",
        "url": "",
        "menu": [
            {
                "id":51,
                "title":"物业人员",
                "icon":"",
                "pid":5,
                "url":"/Personproperty"
            },
            {
                "id":52,
                "title":"平台人员",
                "icon":"",
                "pid":5,
                "url":"/personplat"
            }
        ]
    },
    {
        "id": 6,
        "icon": "iconfont icon-dingdan",
        "title": "订单管理",
        "url": "",
        "menu":[
            {
                "id":61,
                "title":"租房订单",
                "icon":"",
                "pid":6,
                "url":"/Propertyorderrentplat"
            },
            {
                "id":62,
                "title":"售房订单",
                "icon":"",
                "pid":6,
                "url":"/Propertyordersellplat"
            }
        ]
    },
    {
        "id": 7,
        "icon": "iconfont icon-shouyi-",
        "title": "财务管理",
        "url": "",
        "menu": [
            {
                "id":71,
                "title":"租房账单",
                "icon":"",
                "pid":7,
                "url":"/billrentplat"
            },
            {
                "id":72,
                "title":"售房账单",
                "icon":"",
                "pid":7,
                "url":"/billsellplat"
            },
            {
                "id":73,
                "title":"物业收益",
                "icon":"",
                "pid":7,
                "url":"/propertyincomelistplat"
            },
            {
                "id":74,
                "title":"平台收益",
                "icon":"",
                "pid":7,
                "url":"/platincomelist"
            },
            {
                "id":75,
                "title":"物业结算",
                "icon":"",
                "pid":7,
                "url":"/platsettlelist"
            }
        ]
    },
    {
        "id": 8,
        "icon": "iconfont icon-kehu",
        "title": "客户管理",
        "url": "/userlistplat",
        "menu": []
    },
    {
        "id": 9,
        "icon": "iconfont icon-zuhuguanli",
        "title": "后台设置",
        "url": "/settingplat",
        "menu": []
    }
]

const state = {
    items: {
        data: []
    }
}

// getters
const getters = {}

// mutations
const mutations = {
    updateMenu(state, data) {
        state.items = data
    },

}

// actions
const actions = {
    getMenu({commit},platType) {
        console.log(platType)
        commit('updateMenu',{data:xitongPlat})
    },

}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
