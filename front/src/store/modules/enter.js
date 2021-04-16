import http from '@/utils/http'

export default {
    namespaced: true,
    actions: {
        // 登录
        login ({ commit, state, dispatch }, params) {
            return http.post(`/user/login`, params).then(response => response.data)
        },
        // 是否重复用户
        isExistsUser ({ commit, state, dispatch }, params) {
            return http.get(`/user/isExistsUser`, { params }).then(response => response.data)
        },
        // 创建用户
        create ({ commit, state, dispatch }, params) {
            return http.post(`/user/create`, params).then(response => response.data)
        }
    }
}
