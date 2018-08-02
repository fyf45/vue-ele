<template>
    <div id="Login">
        <div class="loginMain">
            <h2 class="loginMain-title">服务平台</h2>
            <div class="loginMain-content">
                <h3 class="loginMain-content-header">账号登录</h3>
                <div class="loginMain-content-form">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                    label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="login">
                            <el-input prefix-icon="el-icon-edit" v-model="ruleForm.login" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" prefix-icon="el-icon-edit" v-model="ruleForm.password" placeholder="密码"
                            @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <div id="captchaBox"></div>
                        </el-form-item>
                        <el-checkbox class="checkBtn" v-model="checked">记住密码</el-checkbox>
                        <div class="login-btn">
                            <el-button class="btn" @click="submitForm('ruleForm')">登 录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import helper from '@/mixins/helper'
    import tool from '@/utils/tool'
    // import { WSASYSNOTREADY } from 'constants';
    // import { clearInterval } from 'timers';
    import {mapState,mapActions} from "vuex"

    export default {
        mixins: [helper],
        data: function(){
            return {
                ruleForm:{
                    login:"",
                    password:"",
                    dxtoken:''
                },
                myCaptcha:{},
                checked:false,
                rules:{
                    login:[
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { min: 5, message: '长度不得小于 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        // { pattern: /^[A-Z](?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]*$/, message: '密码以大写字母开头,且小写字母和数字混合,不得包含特殊字条', trigger: 'blur'},
                        { min: 6, max: 16, message: '密码必需是6-16位', trigger: 'blur'},
                    ],
                    captcha: [
                        { required: false, message: '还未验证', trigger: 'blur' },
                    ]
                }
            }
        },
        computed: {
            ...mapState({

            })
        },
        mounted () {

            this.getCookie();
            this.captchaInit();
        },
        methods: {
            ...mapActions({
                connectWS:"wbscoket/connectWS"
            }),
            // 无感验证
            captchaInit(){
                let that = this;
                var myCaptcha = _dx.Captcha(document.getElementById('captchaBox'), {
                    appId: '901e3af2a7b0cc01877a83414d3b6f44',
                    style: 'embed',
                    success: function(token) {
                        that.ruleForm.dxtoken = token
                    }
                })
            },


            submitForm(formName) {
                const that = this;
                //判断复选框是否被勾选 勾选则调用配置cookie方法
                if (that.checked == true) {
                    that.setCookie(that.ruleForm.login, that.ruleForm.password, 7);
                }else {
                    that.clearCookie();
                }
                //与后端请求代码
                this.login()
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "login" + "=" + c_name + ";path=/;expires=" + exdate.toUTCString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toUTCString();
            },
            //读取cookie
            getCookie: function() {
                let that = this
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'login') {
                            this.ruleForm.login = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.ruleForm.password = arr2[1];
                        }
                    }
                    that.checked = true
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },

            // 请求登录接口
            login(){
                this.replaceTo('/dashboard')
            }
        }

    }
</script>

<style lang="scss">
    @import "../assets/scss/variables.scss";
    #Login{
        // background-color: $mainBg;
        background: url("../../static/img/bg.png") no-repeat;
        background-size:100% 100%;
        position: relative;
        width:100%;
        height:100%;
        .loginMain{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 20%;
            min-width: 360px;
            box-sizing: border-box;
            border-radius: 8px;
            .loginMain-title{
                width: 100%;
                padding-bottom: 10%;
                font-size: 38px;
                color: #fff;
                text-align: center;
            }
            .loginMain-content{
                width: 90%;
                margin: 0 auto;
                padding: 8% 8%;
                background-color: #fff;
                box-sizing: border-box;
                border-radius: 8px;
                .loginMain-content-header{
                    width: 100%;
                    line-height: 24px;
                    padding-bottom: 36px;
                    font-size: 24px;
                    color:#ffb04a;
                }
                .loginMain-content-form{
                    width: 100%;
                    margin-bottom: 30px;
                    .el-input--prefix{
                        .el-input__inner{
                            border: 1px solid #ffb04a;
                            height: 48px;
                            line-height: 48px;
                            padding-left: 50px;
                        }
                        .el-input__prefix{
                            left: 15px;
                            color:#ffb04a;
                        }
                    }
                    .checkBtn{
                        margin-top: 10px;
                    }
                    .el-checkbox__inner{
                        border: 1px solid #ffb04a;
                    }
                    .el-checkbox__input.is-checked .el-checkbox__inner{
                        background-color: #ffb04a;
                    }
                    .el-checkbox__input.is-checked + .el-checkbox__label{
                        color: #ffb04a;
                    }
                    .login-btn{
                        width: 100%;
                        margin-top: 22px;
                        .btn{
                            width: 100%;
                            height: 48px;
                            background-image: linear-gradient(0deg,#ffc732 0%,#ffb04a 100%);
                            border-radius: 4px;
                            font-size: 26px;
                            color:#fff;
                        }
                    }
                }
            }

        }
        #captchaBox{
            width: 100% !important;
        }
    }
</style>
