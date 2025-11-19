export const initRoutes = [
    // 首页
    {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
            keepAlive: true,
            title: '首页',
            auth: true,
            affix: true,
            icon: 'IconCommand'
        },
        component: () => import('@/views/dashboard/index.vue')
    },
    // 好友
    {
        path: 'friend/:friendId',
        name: 'friend',
        meta: {
            keepAlive: true,
            title: '好友',
            auth: true,
            affix: true,
            icon: 'IconUser'
        },
        component: () => import('@/views/friend/index.vue')
    },
    // 房间
    {
        path: 'room/:roomId',
        name: 'room',
        meta: {
            keepAlive: true,
            title: '房间',
            auth: true,
            affix: true,
            icon: 'IconMessage'
        },
        component: () => import('@/views/room/index.vue')
    },
]


export const frameLogin = [
    // 首页
    {
        path: '/login',
        name: 'login',
        meta: {
            keepAlive: false,
            title: '登陆',
            auth: true,
            affix: true,
            icon: 'IconHome'
        },
        component: () => import('@/views/login/index.vue')
    },
]
export const frameIn: any[] = [
    {
        path: '/',
        redirect: { name: 'dashboard' },
        component: () => import('@/layout/index.vue'),
        children: [
            ...initRoutes,
        ]
    }
]

export const errorPage = [
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/404/index.vue') }
]
export default [
    ...frameIn,
    // ...frameOut,
    ...frameLogin,
    ...errorPage,
]