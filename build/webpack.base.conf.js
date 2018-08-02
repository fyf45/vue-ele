const path = require('path')
const fs = require('fs')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const pagesConfig = path.resolve(__dirname, '../src/pages.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function toDash(str) {
    return str.replace(/([A-Z])/g, function (m, w) {
        return '-' + w.toLowerCase();
    }).replace('-', '')
}

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let webpackConfig = {
    entry: {
        app: ["babel-polyfill", "./src/main.js"]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    plugins: [],
    resolve: {
        extensions: [
            '.js', '.vue', '.json'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'static': path.resolve(__dirname, '../static')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/vue-echarts'),
                    resolve('node_modules/resize-detector')
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}

module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [
        {
            // 自动替换页面路由
            name: 'js-parser',
            test: /main\.js/,
            fn: function (source) {
                let list = fs.readFileSync(pagesConfig, 'utf-8')
                list = JSON.parse(list)
                let str = []
                for (var page in list) {
                    let filename = page
                    let path = `/${toDash(page)}`
                    if (/#/.test(page)) {
                        filename = page.split('#')[0]
                        path = page.split('#')[1]
                    }
                    str.push(`{
                        name: '${filename}',
                        path: '${path}',
                        meta: {title: '${list[page]}'},
                        component: function (resolve) {
                        require(['./pages/${filename}.vue'], resolve)
                        }
                    }`)
                }
                // 404 page
                str.push(`{
                    name: 'NotFound',
                    path: '*',
                    meta: {title: '页面找不到'},
                    component: function (resolve) {
                    require(['./pages/NotFound.vue'], resolve)
                    }
                }`)
                str = `[${str.join(',\n')}]`
                source = source.replace('let routes = []', 'let routes = ' + str)
                return source
            }
        },
        'inline-manifest',
        'progress-bar'
    ]
})
