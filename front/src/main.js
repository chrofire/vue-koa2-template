import Vue from 'vue'
import App from '@/App.vue'

import router from '@/router'
import store from '@/store'
import 'normalize.css'

Vue.config.productionTip = false
import './plugins/element.js'

import http from './utils/http'
Vue.prototype.$http = http

import lodash from 'lodash'
Vue.prototype._ = lodash

import filters from './filters'
Vue.use(filters)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')