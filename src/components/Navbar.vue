<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="hamburger-container">
      <i class="iconfont icon-bk-list2" :class="{'is-active':sidebarCollapse}" @click="toggleSideBar"></i>
    </div>
    <!--http://element.eleme.io/#/zh-CN/component/breadcrumb-->
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <!--https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1-->
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
          <span v-if='index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <!--http://element.eleme.io/#/zh-CN/component/dropdown-->
    <!-- <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" placement="top">
        <div class="avatar-wrapper">
          <i class="iconfont icon-notification"></i>
          <span class="notice">通知</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div>消息</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
    <div class="right-menu">
      <!-- <div class="community right-menu-item">
        当前小区：
        <el-select v-model="value" placeholder="请选择" @change="changeCommunity">
            <el-option
            v-for="item in communityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div> -->
      <div class="community right-menu-item" v-if="isCommunity">
        当前小区：
        <span>{{community}}</span>
      </div>
      <div class="loginOut right-menu-item" >
        <el-dropdown class="avatar-container right-menu-item">
          <div class="avatar-wrapper">
            <!-- <img class="user-avatar" :src="avatarUrl" v-if="avatarUrl && avatarUrl != ''">
            <img class="user-avatar" src="~static/img/avator.png" v-else> -->
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="linkTo('/ChangePassword')">修改密码</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
    import helper from '@/mixins/helper'
    import tool from '@/utils/tool'
    import {mapState, mapActions} from "vuex";

    export default {
        components: {},
        mixins: [helper],
        data() {
          return {
            community:tool.getStorage('userInfo_community_name'),
            levelList: [],
            value:'',
          }
        },
        computed: {
          ...mapState({
            sidebarCollapse: state => state.global.sidebarCollapse,
            communityOptions: state => state.global.communityOptions
          }),
          isCommunity(){
            if(tool.getStorage('userInfo_role') == '小区管理员'){
              return true
            }else if(tool.getStorage('userInfo_role') == '物业管理员'){
              return false
            }
          },
          avatarUrl(){
            return tool.getStorage('userInfo_img')
          },
          userName(){
            return tool.getStorage('userInfo_name')
          },
        },
        created() {
          this.getBreadcrumb()
        },
        watch: {
          $route() {
            this.getBreadcrumb()
          }
        },
        mounted() {
          this.value = tool.getStorage('userInfo_community_name')
          // this.getCommunityOptions({})
        },
        methods: {
          ...mapActions({
            toggleSideBar: "global/toggleSideBar",
            logout: "global/logout",
            getCommunityOptions:'global/getCommunityOptions'
          }),
          changeCommunity(){
              tool.request('changeCommunity',{
                  'community_id':this.value
              },'post').then((res)=>{
                  tool.setStorage('userInfo_community_id',res.data.id)
                  tool.setStorage('userInfo_community_name',res.data.name)
                  this.$router.go(0)
              })
          },
          getBreadcrumb() {
            let matched = [],route = this.$route
            if(route.name !== 'Dashboard' ){
              matched.push({path: '/dashboard', meta: {title: '首页'}})
            }
            if(route.name == 'ExternalLink'){
              matched.push({path: route.fullPath, meta: {title: route.meta.title + route.query.url}})
            }else{
              matched.push(route)
            }
            this.levelList = matched
          },
          handleLogout() {
            this.logout(() => {
                let type = tool.getStorage('userInfo_role')
                switch (type)
                {
                    case '小区管理员':
                        this.linkTo('/')
                        break;
                    case '物业管理员':
                        this.linkTo('/')
                        break;
                    default:
                        this.linkTo('/loginplat')
                        break;
                }
            })
          }
        }
    }
</script>

<style lang="scss">
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    height: 60px;
    float: left;
    padding: 0 10px;
    .icon-bk-list2 {
      cursor: pointer;
      width: 20px;
      height: 20px;
      font-size:20px;
      &:before{
        display:inline-block;
        transition: .38s;
        transform-origin: 50% 50%;
      }
      &.is-active:before{
        transform: rotate(90deg);
      }
    }
  }
  .app-breadcrumb {
    float: left;
    display: inline-block;
    font-size: 16px;
    line-height: 60px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    .right-menu-item {
      display: inline-block;
      margin: 0 30px 0 8px;
      cursor: pointer;
    }
    .avatar-container {
      height: 60px;
      .avatar-wrapper {
        height:60px;
        vertical-align: middle;
        cursor: pointer;
        position: relative;
        .user-avatar {
          vertical-align: middle;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 5px;
        }
      }
    }
  }
}

.breadcrumb- {
  &enter-active, &leave-active {
    transition: all .5s;
  }
  &enter, &leave-active {
    opacity: 0;
    transform: translateX(20px);
  }
  &move {
    transition: all .5s;
  }
  &leave-active {
    position: absolute;
  }
}
</style>
