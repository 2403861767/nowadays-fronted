import Login from "../pages/LoginPage.vue"
import Register from "../pages/RegisterPage.vue"
import User from "../pages/user/UserPage.vue"
import Index from "../pages/IndexPage.vue"
import UserDetail from "../pages/user/UserDetailPage.vue"
import UserEdit from "../pages/user/UserEditPage.vue"
import BaseLayout from "../layouts/BaseLayout.vue"
import PlanAdd from "../pages/plan/PlanAddPage.vue"
import * as VueRouter from "vue-router";
import {Snackbar} from "@varlet/ui";

const routes = [
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/', component: BaseLayout ,
        children: [
            { path: '/index', component: Index, meta: {requiresAuth:true}},
            { path: '/user', component: User, meta: {requiresAuth:true}},
        ],
        redirect: '/index'
    },
    { path: '/user/detail', component: UserDetail},
    { path: '/user/edit', component: UserEdit},
    { path: '/plan/add', component: PlanAdd, meta: {requiresAuth:true}},

]
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from ,next) => {
    const isAuthenticated = sessionStorage.getItem('user') // 获取用户session
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated){
        Snackbar.error('请先登录!')
        next('/login')
    }else {
        next() // 放行路由
    }
})

export default router
