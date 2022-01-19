import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.state.user.userInfo.isLogin) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
        NProgress.done()
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
        NProgress.done()
    }
})

router.afterEach((to, from, next) => {
    NProgress.done()
})

export default router
