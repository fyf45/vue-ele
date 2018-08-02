import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex'
import * as filters from './utils/filters' // global filters
import ECharts from 'vue-echarts/components/ECharts.vue'
import VueQuillEditor from 'vue-quill-editor'

//全局样式
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import './assets/scss/theme.scss'


//使用高德地图(可选)
// import VueAMap from 'vue-amap'
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//     key: '557e2cea68451d4dd23806c9441d40bd',
//     plugin: ['AMap.CitySearch','AMap.Geocoder'],
//     v: '1.4.4'
// });

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/dataset'

Vue.component('chart', ECharts)

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI, {
    size: 'medium'
})
Vue.use(VueQuillEditor)

FastClick.attach(document.body)


/**
 * -------------------------- 插件 ----------------------
 */

//  省市区联动
// import 'vue-area-linkage/dist/index.css';
// import {AreaSelect} from 'vue-area-linkage';
// Vue.use(AreaSelect)

// import momentPlugin from './plugins/moment'
// Vue.use(momentPlugin)
//简单日期处理
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


/**
 * -------------------------- 路由 ----------------------
 */
// 在build/webpack.base.conf.js, 页面路由会根据 pages.json 的配置自动生成替换
let routes = []
const router = new VueRouter({
    routes
})
sync(store, router)


// 阻止生产环境提示
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

export { router, store }