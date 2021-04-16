import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
Vue.use(Vuex)
import jwtDecode from 'jwt-decode'

// modules
import enter from '@/store/modules/enter'

export default new Vuex.Store({
    state: {
        a: 1,
        user: null,
        addRoutes: []
    },
    getters: {
        addRoutesList: state => {
            return state.addRoutes
        }
    },
    mutations: {
        setToken (state, value) {
            const token = `Bearer ${value}`
            const user = jwtDecode(value)
            state.user = user
            localStorage.setItem('token', token)
        },
        setUser (state, value) {
            state.user = value
        },
        removeToken (state){
            state.user = null
            localStorage.removeItem('token')
        },
        clearAddRoutes (state) {
            state.addRoutes = []
        },
        updateAddRoutes (state, value) {
            router.resetRouter()
            state.addRoutes = [...state.addRoutes, ...value]
        }
    },
    actions: {

    },
    modules: {
        enter
    }
})