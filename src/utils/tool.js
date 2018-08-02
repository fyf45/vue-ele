import Vue from 'vue'
import { router, store } from '@/main.js'
import Config from '@/Config'
import axios from 'axios'

export default {
    request(api_name, params, method) {
        if (typeof (Config.api[api_name]) == 'undefined') {
            this.alertError('接口' + api_name + '未定义');
            return false;
        }
        var api_url = Config.apiHost + Config.api[api_name]
        params = params || {}
        if (Config.unauthApi.indexOf(api_name) == -1) {
            //sign
            params = this.sign(params)
        }
        if (!method) {
            method = 'get'
        }
        method = method.toLowerCase()
        switch (method) {
            case 'post':
                return new Promise((resolve, reject) => {
                    axios.post(api_url, params)
                        .then(res => {
                            resolve(res.data);
                        })
                        .catch(error => {
                            if(error.response.status == 422){
                                let errorMsg = [];
                                for (const key in error.response.data.errors) {
                                    if (error.response.data.errors.hasOwnProperty(key)) {
                                        let str = error.response.data.errors[key][0];
                                        errorMsg.push(str)
                                    }
                                }
                                this.alertError(errorMsg.join(';'));
                                reject(errorMsg.join(';'));
                            }else{
                                this.alertError(error.response.data.message);
                                reject(error.response.data.message);

                            }

                        })
                })
            default:
                return new Promise((resolve, reject) => {
                    axios.get(api_url, { params })
                    .then(res => {
                        resolve(res.data);
                        // if (res.data.code == 1) {
                        //     resolve(res.data.data);
                        // } else {
                        //     this.alertError(res.data.msg);
                        //     reject(res.data.msg);
                        // }
                    })
                    .catch(error => {
                        this.alertError(error.response.data.message);
                        reject(error.response.data.message);
                    })
                })
        }
    },
    sign(params) {
        params.token = this.getStorage('token', '')
        return params
    },
    upload(id,file) {
        var api_url = Config.apiHost + Config.api['upload']
        var formData = new FormData()
        formData.append('question_id', id);
        formData.append('files', file);
        formData.append('token', this.getStorage('token', ''));
        var config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(api_url, formData, config)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    this.alertError(error.response.data.message);
                    reject(error.response.data.message);
                })
        })
    },
    getStorage(name, val) {
        var v = localStorage.getItem(name), w
        if (v == null) {
            return val
        }
        if (typeof v == 'string') {
            try {
                w = JSON.parse(v)
                if (typeof (w) == 'object') {
                    return w
                } else {
                    return v
                }
            } catch (e) {
                return v
            }
        }
    },
    setStorage(name, data, source) {
        if (typeof (data) == 'object') {
            if (typeof (source) == 'undefined') {
                source = {}
            }
            for (var key in data) {
                source[key] = data[key]
                if (typeof (data[key]) == 'object') {
                    localStorage.setItem(name + "_" + key, JSON.stringify(data[key]))
                } else {
                    localStorage.setItem(name + "_" + key, data[key])
                }
            }
        } else {
            source = data
            localStorage.setItem(name, data)
        }
        return source
    },
    alertError(msg, fb) {
        if (msg == '未登录或登录已过期') {
            if (['', '/login', '/register'].indexOf(store.state.route.path) == -1) {
                this.setStorage('login_jump', store.state.route.path)
            }
            router.replace('/')
            return false
        }
        var alert = {
            show: true,
            title: '错误',
            content: msg,
            onShow: () => {
            },
            onHide: () => {
                if (msg == '未登录或登录已过期') {
                    if (['', '/login', '/register'].indexOf(store.state.route.path) == -1) {
                        this.setStorage('login_jump', store.state.route.path)
                    }
                    router.replace('/')
                    return false
                }
                fb && fb()
            },
        }
        // store.dispatch('global/hideLoading')
        store.commit('global/updateAlert', alert)
    }
}
