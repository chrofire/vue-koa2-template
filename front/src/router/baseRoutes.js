export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register')
    }
]