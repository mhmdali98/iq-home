import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: '/log'
    },

    {
        path: '/log',
        name: 'login',
        component: () => import('../views/login')
    },


    {
        path: '',
        name: 'layout',
        component: () => import('../views/Layout'),
        children: [{
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/Dashboard/dashboard')
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('../views/admin/users')
            },
            {
                path: 'city',
                name: 'city',
                component: () => import('../views/admin/city.vue')
            },
            {
                path: 'cases',
                name: 'cases',
                component: () => import('../views/admin/cases')
            },
            {
                path: 'contact',
                name: 'contact',
                component: () => import('../views/admin/contact')
            },
            {
                path: 'tips',
                name: 'tips',
                // props: true,
                component: () => import('../views/admin/tips')
            },
            {
                path: 'source',
                name: 'source',
                component: () => import('../views/admin/source')
            },
            {
                path: 'qna',
                name: 'qna',
                component: () => import('../views/admin/qna')
            },
            {
                path: 'notification',
                name: 'notification',
                component: () => import('../views/admin/notification')
            },
            {
                path: 'media',
                name: 'media',
                component: () => import('../views/admin/media')
            },
            {
                path: 'consept',
                name: 'consept',
                component: () => import('../views/admin/consept')
            },
        ]
    }
]

export default new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})