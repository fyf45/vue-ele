<template>
    <div class="sidebar" ref="scrollContainer" @wheel.prevent="handleScroll" >
        <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
            <div class="logo">
                <img src="~static/img/logo.png">
                <span>小科之家</span>

            </div>
            <!--http://element.eleme.io/#/zh-CN/component/menu-->
            <el-menu mode="vertical"
                     :default-active="activeItem"
                     :collapse="sidebarCollapse">
                <template v-for="item in meunItems">

                    <el-menu-item v-if="item.url!==''" :index="getIndex(item)"
                    @click.native="replaceTo(item.url)">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <span slot="title" v-if="item.title">{{item.title}}</span>
                    </el-menu-item>

                    <el-submenu v-else :index="getIndex(item)">
                        <template  slot="title">
                            <i v-if="item.icon" :class="item.icon"></i>
                            <span v-if="item.title">{{item.title}}</span>
                        </template>
                        <template v-for="child in item.menu">
                            <el-menu-item v-if="child.url!==''" :index="getIndex(child)" @click.native="replaceTo(child.url)">
                                <i v-if="child.icon" :class="child.icon"></i>
                                <span slot="title" v-if="child.title">{{child.title}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>

                </template>
            </el-menu>
        </div>
    </div>
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
                top: 0,
            }
        },
        computed: {
            ...mapState({
                sidebarCollapse: state => state.global.sidebarCollapse,
                meunItems: state => state.menu.items.data,

            }),
            activeItem(){
                return this.$route.path
            },
        },
        created (){
            let type = tool.getStorage('userInfo_role')
            this.getMenu(type)
        },
        methods: {
            ...mapActions({
                getMenu:"menu/getMenu"
            }),
            getIndex(item){
                if(item.url==''){
                    return item.title;
                }else if(/^http/.test(item.url)){
                    return '/external-link?url='+encodeURIComponent(item.url)
                }
                return item.url
            },
            handleScroll(e) {
                const delta = 15
                const eventDelta = e.wheelDelta || -e.deltaY * 3
                const $container = this.$refs.scrollContainer
                const $containerHeight = $container.offsetHeight
                const $wrapper = this.$refs.scrollWrapper
                const $wrapperHeight = $wrapper.offsetHeight
                if (eventDelta > 0) {
                    this.top = Math.min(0, this.top + eventDelta)
                } else {
                    if ($containerHeight - delta < $wrapperHeight) {
                        if (this.top < -($wrapperHeight - $containerHeight + delta)) {
                            this.top = this.top
                        } else {
                            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
                        }
                    } else {
                        this.top = 0
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables.scss";
    .sidebar {
        background-color: $menuBg;
        transition: width 0.28s;
        width: $menuWidth;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        .logo{
            background-image: linear-gradient(0deg,#ffc732 0%,#ffb04a 100%);
            box-sizing: border-box;
            color:$menuFontColor;
            height:60px;
            padding: 10px 10px 0 10px;
            img{
                width:44px;
                height:40px;
                vertical-align: middle;
            }
            span{
                margin-left:10px;
                display: inline-block;
                font-size: 16px;
                color:#fff;
            }
        }
        .scroll-wrapper {
            position: absolute;
            width: 100% !important;
        }
        a {
            display: inline-block;
            width: 100%;
        }
        .el-menu {
            border: none;
            width: 100%;
            background-color: $menuBg;
            overflow: hidden;
            .el-menu-item,.el-submenu__title{
                background-color: $menuBg;
                color: $menuFontColor;
                &:hover{
                    background-color:$menuHover;
                    color:$menuActiveFontColor;
                    .iconfont{
                        color:$menuActiveIconColor;
                    }
                }
                .iconfont{
                    color:$menuFontColor;
                }
            }
            .el-menu-item.is-active{
                position: relative;
                background-color: $menuActiveBg !important;
                color:$menuActiveFontColor;
                .iconfont{
                    color:$menuActiveIconColor;
                }
                &::before{
                    content:'';
                    position:absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left:0;
                    width: 8px;
                    height: 28px;
                    background-color: #fdbc00;
                }
            }
            .el-menu--inline{
                background-color:$subMenuBg;
                .el-menu-item{
                    background-color: $subMenuBg;
                    &:hover{
                        background-color:$menuHover;
                        color:#fdbc00;
                    }
                }
            }
            .el-submenu{
                .el-submenu__title{
                    // color: $menuFontColor;
                    i{
                        color:$menuFontColor;
                    }
                    &:hover{
                        i.el-submenu__icon-arrow{
                            background-color:$menuHover;
                            color:$menuActiveFontColor;
                        }
                    }
                }

            }
        }
    }
    .el-menu--popup{
        .el-menu-item {
            color: $menuFontColor;
            background-color: $subMenuBg!important;
            &:hover {
                background-color: $menuHover!important;
            }
        }
    }
</style>

