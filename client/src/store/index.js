import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state={
    night:false,
    fullScreen:false,
}

export default new Vuex.Store({
    state,
	actions,
	mutations
})