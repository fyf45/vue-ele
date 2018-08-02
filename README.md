# vue-backstage #
基于Vue.js 2.x系列 + Element UI 的后台管理系统
参考项目：
[vue-manage-system](https://github.com/lin-xin/vue-manage-system)
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 图表
- [x] 富文本编辑器
- [x] 图片拖拽/裁剪上传
- [x] 列表拖拽排序
- [x] 支持修改主题配色


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 公共组件
	|	|-- pages                 	     // 主要路由页面
	|       |-- Chart.vue                // 基础图表
	|       |-- Form.vue                 // 基础表单
	|       |-- Table.vue                // 基础表格
	|       |-- Login.vue          	     // 登录
	|       |-- Upload.vue               // 图片上传
	|       |-- VueEditor.vue            // 富文本编辑器
	|       |-- VueTable.vue             // vue表格组件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|   |-- Config.js                    // 全局配置文件
	|   |-- pages.json                   // 页面路由配置文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##

	git clone git@codehub-cn-east-2.devcloud.huaweicloud.com:09c3071a7b67470db4f3301c5efa8c86/backstage-D.git      // 把模板下载到本地
	cd backstage-D      // 进入模板目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明 ##

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io)

### vue-echarts ###

vue.js封装ECharts的图表组件。访问地址：[vue-echarts](https://github.com/ecomfe/vue-echarts)

### vue-datasource ###
一个用于动态创建表格的vue.js服务端组件。访问地址：[vue-datasource](https://github.com/coderdiaz/vue-datasource)

### Vue-Quill-Editor ###
基于Quill、适用于Vue2的富文本编辑器。访问地址：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

### Vue-Core-Image-Upload ###
一款轻量级的vue上传插件，支持裁剪。访问地址：[Vue-Core-Image-Upload](https://github.com/Vanthink-UED/vue-core-image-upload)

## 其他 ##

### 如何修改主题配色？ ###

打开 src/assets/scss/variables.scss 文件，修改相关变量。

### 查看各组件build大小 ###
npm run build --report