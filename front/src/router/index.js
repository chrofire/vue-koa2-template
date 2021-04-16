import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)

import baseRoutes from '@/router/baseRoutes'
import commonRoutes from '@/router/commonRoutes'
import adminRoutes from '@/router/adminRoutes'

const router = new VueRouter({
    mode: 'history',
    routes: baseRoutes
})

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

import http from '@/utils/http'
async function getRole () {
    try {
        const data = await http.post('/user/getRole')
        return data
    } catch (e) {
        return e.data
    }
}

router.resetRouter = () => {
    store.commit('clearAddRoutes')
    router.matcher = new VueRouter({
        mode: 'history',
        routes: baseRoutes
    }).matcher
}

router.beforeEach(async (to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        if (to.path === '/login' && localStorage.getItem('token')) {
            next('/main')
        } else {
            next()
        }
    } else {
        if (!store.state.user) {
            const res = await getRole()
            if (res.code === 1) {
                store.commit('setUser', res.data)
                switch (store.state.user.userType) {
                    case 1:
                        if (store.state.addRoutes.length === 0) {
                            store.commit('updateAddRoutes', adminRoutes)
                            router.addRoutes(adminRoutes)
                            next({ ...to, replace: true })
                        } else {
                            next()
                        }
                        break
                    case 2:
                        if (store.state.addRoutes.length === 0) {
                            store.commit('updateAddRoutes', commonRoutes)
                            router.addRoutes(commonRoutes)
                            next({ ...to, replace: true })
                        } else {
                            next()
                        }
                        break
                    default:
                        next()
                        break
                }
            } else {
                next()
            }
        } else {
            switch (store.state.user.userType) {
                case 1:
                    if (store.state.addRoutes.length === 0) {
                        store.commit('updateAddRoutes', adminRoutes)
                        router.addRoutes(adminRoutes)
                        next({ ...to, replace: true })
                    } else {
                        next()
                    }
                    break
                case 2:
                    if (store.state.addRoutes.length === 0) {
                        store.commit('updateAddRoutes', commonRoutes)
                        router.addRoutes(commonRoutes)
                        next({ ...to, replace: true })
                    } else {
                        next()
                    }
                    break
                default:
                    next()
                    break
            }
        }
    }
})

export default router