import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  install (Vue) {
    moment.locale('zh-cn')
    Vue.prototype.$moment = moment
    Vue.moment = moment
  },
  $moment: moment
}
