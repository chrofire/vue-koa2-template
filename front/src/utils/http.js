import axios from 'axios'
import router from '@/router'
import store from '@/store'

const http = axios.create({
    baseURL: '/api'
})

// 请求拦截器
http.interceptors.request.use(config => {
    // 拦截到请求的数据
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error) {
    // 拦截到请求错误错误
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(response => {
    // 拦截到响应回来的数据
    if (response.data.code === -1) {
        return Promise.reject(response)
    }
    return response.data
}, error => {
    // 拦截到响应错误
    switch (error.response.status) {
        case 401:
            store.commit('removeToken')
            if (router.currentRoute.fullPath !== '/login') {
                router.replace('/login')
            }
            break
        default:
            break
    }
    return Promise.reject(error.response)
})
export default http