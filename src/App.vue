<template>
    <div id="App">
        <div class="app-wrapper" :class="{hideSidebar:sidebarCollapse}"  v-if="!nolayout">
            <sidebar></sidebar>
            <div class="main-container" ref="main">
                <div ref="header">
                    <navbar></navbar>
                    <tags-view></tags-view>
                </div>
                <div class="app-main">
                    <!--http://element.eleme.io/#/zh-CN/component/transition-->
                    <!--https://cn.vuejs.org/v2/api/#transition-->
                    <transition name="fade" mode="out-in">
                        <!--https://cn.vuejs.org/v2/api/#keep-alive-->
                        <keep-alive :include="cachedViews">
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>
        </div>
        <router-view v-if="nolayout"></router-view>
        <!--http://element.eleme.io/#/zh-CN/component/dialog-->
        <el-dialog
        :title="alert.title"
        :visible.sync="alert.show"
        :show-close="false"
        :close-on-click-modal="false"
        width="30%">
            <span>{{alert.content}}</span> <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="alert.show=false;alert.onHide()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import Config from '@/Config'
    import {Navbar, Sidebar, TagsView} from '@/components'
    import {mapState, mapActions} from "vuex"
    import helper from '@/mixins/helper'
    import tool from '@/utils/tool'

    export default {
        mixins: [helper],
        components: {
            Navbar,
            Sidebar,
            TagsView
        },
        data() {
            return {};
        },
        beforeCreate() {
            // console.log(window.location)d

        },
        created() {
        },
        mounted() {

        },
        beforeDestroy() {
        },
        computed: {
            ...mapState({
                route: state => state.route,
                alert: state => state.global.alert,
                sidebarCollapse: state => state.global.sidebarCollapse,
                cachedViews: state => state.global.cachedViews,
            }),
            title() {
                return this.route.meta.title || this.route.name || "";
            },
            nolayout() {
                return Config.noLayoutPages.indexOf(this.route.name) > -1;
            }
        },
        watch: {
            //监听变量
            title: function (val) {
                document.title = val;
            }
        },
         methods: {
            ...mapActions({
                connectWS:"wbscoket/connectWS",

            })
        },

    }
</script>

<style lang="scss">
    @import "./assets/scss/variables.scss";
    #App{
        height: 100%;
        width: 100%;
        .app-wrapper {
            @include clearfix;
            position: relative;
            height: 100%;
            width: 100%;
        }
        .main-container {
            min-height: 100%;
            transition: margin-left 0.28s;
            margin-left: $menuWidth;
        }
        .app-main{
            min-height: 100%
        }
        .hideSidebar {
            .logo{
                span{
                    display: none;
                }
            }
            .sidebar,.sidebar .el-menu {
                width: 64px!important;
            }
            .main-container {
                margin-left: 64px;
            }
            .submenu-title-noDropdown {
                padding-left: 10px!important;
                position: relative;
                span {
                    height: 0;
                    width: 0;
                    overflow: hidden;
                    visibility: hidden;
                    transition: opacity .3s cubic-bezier(.55, 0, .1, 1);
                    opacity: 0;
                    display: inline-block;
                }
                &:hover {
                    span {
                        display: block;
                        border-radius: 3px;
                        z-index: 1002;
                        width: 140px;
                        height: 56px;
                        visibility: visible;
                        position: absolute;
                        right: -145px;
                        text-align: left;
                        text-indent: 20px;
                        top: 0px;
                        background-color: $subMenuBg!important;
                        opacity: 1;

                    }
                }
            }
            .el-submenu {
                &>.el-submenu__title {
                    &>span {
                        display: none;
                    }
                    .el-submenu__icon-arrow {
                        display: none;
                    }
                }
            }
        }
    }
</style>
