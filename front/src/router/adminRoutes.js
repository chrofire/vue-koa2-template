const importData = {
    NotFound: () => import ('@/views/NotFound'),

    BasePage: () => import ('@/views/BasePage/index.vue'),

    Dashboard: () => import ('@/views/Dashboard/index.vue')
}

export const _adminRoutes = [
    {
        path: '/main',
        fullPath: '/main',
        component: 'BasePage',
        children: [
            {
                path: '',
                redirect: '/main/dashboard'
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: 'Dashboard',
                meta: {
                    title: 'Dashboard',
                    icon: 'el-icon-s-grid',
                    fullPath: '/main/dashboard'
                }
            }
        ]
    },
    {
        path: '*',
        name: 'NotFound',
        component: 'NotFound',
        meta: {
            title: '404',
            fullPath: '*'
        }
    }
]

import bindRoutesComponent from '@/utils/bindRoutesComponent'

export default bindRoutesComponent(_adminRoutes, importData)