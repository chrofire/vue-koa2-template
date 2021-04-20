const importData = {
    NotFound: () => import ('@/views/NotFound'),

    BasePage: () => import ('@/views/BasePage/index.vue'),

    Dashboard: () => import ('@/views/Dashboard/index.vue'),
    
    TestPage: () => import ('@/views/TestPage/index.vue'),

    System: () => import ('@/views/System/index.vue'),
    Account: () => import ('@/views/System/Account/index.vue')
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
            },
            {
                path: 'testpage',
                name: 'TestPage',
                component: 'TestPage',
                meta: {
                    title: 'TestPage',
                    icon: 'el-icon-s-grid',
                    fullPath: '/main/testpage'
                }
            },
            {
                path: 'system',
                component: 'System',
                meta: {
                    title: '系统管理',
                    icon: 'el-icon-s-tools',
                    fullPath: '/main/system'
                },
                children: [
                    {
                        path: 'account',
                        component: 'Account',
                        meta: {
                            title: '帐号管理',
                            fullPath: '/main/system/account'
                        }
                    }
                ]
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