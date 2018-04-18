import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

//刷新页面时state数据会丢失。
if(!sessionStorage.getItem('isLogin')){
    sessionStorage.setItem('isLogin','0')
}

const state={
    isLogin:Boolean(Number(sessionStorage.getItem('isLogin'))),  //登录状态
    night:false,    //是否是夜晚模式
    fullScreen:false,   //编辑器是否全屏
}

export default new Vuex.Store({
    state,
	actions,
	mutations
})