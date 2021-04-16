const importData = {
    NotFound: () => import ('@/views/NotFound'),

    CommonPage: () => import ('@/views/CommonPage/index.vue')
}

export const _commonRoutes = [
    {
        path: '/main',
        redirect: '/common'
    },
    {
        path: '/common',
        fullPath: '/common',
        component: 'CommonPage'
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

export default bindRoutesComponent(_commonRoutes, importData)