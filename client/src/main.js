// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
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
import dayjs from 'dayjs'
// moment.locale('zh-cn')

//全局设置baseURL  默认请求路由'/api'
axios.defaults.baseURL = '/api'

// 注册全局过滤器
Vue.filter('getTime', function (value) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('getMoment', function () {
    return dayjs().format('YYYY年M月D日 HH:mm:ss');
});

// 获取已注册过滤器
let getTime = Vue.filter('getTime');

Vue.use(MuseUI)


Vue.config.productionTip = false;

//路由校验钩子
router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.requiresAuth)) {
        // 对路由进行验证     
        if (store.state.isLogin) { // 已经登陆 
            next()// 正常跳转到你设置好的页面 
        }else {
            console.log(store.state.isLogin)
            // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
            next({ path: '/login'})
        }
    } else {
        next()
    }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})