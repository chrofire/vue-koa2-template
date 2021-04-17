import http from '@/utils/http'

export default {
    namespaced: true,
    actions: {
        // 修改用户
        updateUser ({ commit, state, dispatch }, params) {
            return http.post(`/user/update`, params).then(response => response.data)
        },
        // 修改用户密码
        updateUserPassword ({ commit, state, dispatch }, params) {
            return http.post(`/user/updateUserPassword`, params).then(response => response.data)
        },
        // 分页查询所有用户
        selectUser ({ commit, state, dispatch }, params) {
            return http.get(`/user/select`, { params }).then(response => response.data)
        }
    }
}