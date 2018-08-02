import { mapState, mapActions } from 'vuex'
export default {
  computed:{
    container_main_height() {
        var refs = this.$parent.$refs
        return refs.main.offsetHeight-refs.header.offsetHeight-44
    },
    container_main_style(){
        return {
            'min-height': this.container_main_height+'px'
        }
    },
  },
  methods: {
    ...mapActions({
        updateAlert: "global/updateAlert",
        delVisitedViews: "global/delVisitedViews"
    }),
    linkTo (url,query) {
      if(!url) return false
      if(/^http/.test(url)){
          this.$router.push({
              path: '/external-link',
              query: {
                  url: url
              }
          })
      }else{
          this.$router.push({
              path: url,
              query
          })
      }
    },
    replaceTo (url,query) {
          if(!url) return false
          if(/^http/.test(url)){
              this.$router.replace({
                    path: '/external-link',
                    query: {
                        url: url
                    }
              })
          }else{
              this.$router.replace({
                  path: url,
                  query
              })
          }
    },
    closeCurTag (openUrl) {
        let view = {
            name:this.$route.name,
            path:this.$route.path,
            title:this.$route.meta.title
        }
        if(openUrl){
            this.delVisitedViews(view).then((views) => {
                this.$router.replace(openUrl)            
            })
        }else{
            this.delVisitedViews(view).then((views) => {
                const latestView = views.slice(-1)[0]
                if (latestView) {
                    this.$router.replace(latestView.path)
                } else {
                    let type = window.localStorage.getItem('userInfo_role')
                    switch (type) {
                        case '小区管理员':
                            this.$router.replace('/dashboard')
                            break;
                        case '物业管理员':
                            this.$router.replace('/dashboardproperty')
                            break;
                        default:
                            this.$router.replace('/dashboardplat')
                            break;
                    }
                }            
            })
        }
        
    },
    alert(title,msg,cb) {
          var alert = {
              show: true,
              title: title,
              content: msg,
              onHide: () => {
                  cb && cb()
              }
          }
          this.updateAlert(alert)
    },
    getSource(obj){
        var category = obj.category, data = obj.data, source = []
        category.forEach((cat,i)=>{
            var item = []
            item.push(cat)
            for(var key in data){
                item.push(data[key][i])
            }
            source.push(item)
        })
        return source
    }
  },
  data () {
    return {

    }
  }
}
