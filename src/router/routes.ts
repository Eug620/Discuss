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
        path: 'friend',
        name: 'friend',
        meta: {
            keepAlive: true,
            title: '好友',
            auth: true,
            affix: true,
            icon: 'IconUser'
        },
        redirect: { name: 'friend-dashboard' },
        component: () => import('@/views/friend/layout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'friend-dashboard',
                meta: {
                    keepAlive: true,
                    title: '欢迎页',
                    auth: true,
                    affix: true,
                    icon: 'IconUser'
                },
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: 'search',
                name: 'friend-search',
                meta: {
                    keepAlive: true,
                    title: '搜索好友',
                    auth: true,
                    affix: true,
                    icon: 'IconSearch'
                },
                component: () => import('@/views/friend/search.vue')
            },
            {
                path: ':id',
                name: 'friend-info',
                meta: {
                    keepAlive: true,
                    title: '消息',
                    auth: true,
                    affix: true,
                    icon: 'IconMessage'
                },
                component: () => import('@/views/friend/index.vue')
            }
        ]
    },
    // 房间
    {
        path: 'room',
        name: 'room',
        meta: {
            keepAlive: true,
            title: '房间',
            auth: true,
            affix: true,
            icon: 'IconMessage'
        },
        redirect: { name: 'room-dashboard' },
        component: () => import('@/views/room/layout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'room-dashboard',
                meta: {
                    keepAlive: true,
                    title: '欢迎页',
                    auth: true,
                    affix: true,
                    icon: 'IconUser'
                },
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: 'search',
                name: 'room-search',
                meta: {
                    keepAlive: true,
                    title: '搜索房间',
                    auth: true,
                    affix: true,
                    icon: 'IconSearch'
                },
                component: () => import('@/views/room/search.vue')
            },
            {
                path: 'create',
                name: 'room-create',
                meta: {
                    keepAlive: true,
                    title: '创建房间',
                    auth: true,
                    affix: true,
                    icon: 'IconAdd'
                },
                component: () => import('@/views/room/create.vue')
            },
            {
                path: ':roomId',
                name: 'room-message',
                meta: {
                    keepAlive: true,
                    title: '房间消息',
                    auth: true,
                    affix: true,
                    icon: 'IconMessage'
                },
                component: () => import('@/views/room/index.vue')
            }
        ]
    },
    {
        path: 'apply',
        name: 'apply',
        meta: {
            keepAlive: true,
            title: '申请',
            auth: true,
            affix: true,
            icon: 'IconCommand'
        },
        component: () => import('@/views/apply/index.vue')
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
        component: () => import('@/layout/_index.vue'),
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