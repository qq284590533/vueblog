// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.config'
import './assets/css/mdEdit.css'
import './assets/css/animate.css'
import './assets/css/main.css'
import './assets/font/iconfont/iconfont.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import './assets/css/reset.css'
import MuseUI from 'muse-ui'
import store from './store'
import axios from 'axios'
import moment from 'moment'
moment.locale('zh-cn')

//全局设置baseURL  默认请求路由'/api'
axios.defaults.baseURL = '/api'

// 注册全局过滤器
Vue.filter('getTime', function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('getMoment', function () {
    return moment().format('YYYY年M月D日 HH:mm:ss');
});

// 获取已注册过滤器
let getTime = Vue.filter('getTime');

Vue.use(MuseUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})