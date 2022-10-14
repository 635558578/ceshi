import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import forget from '../components/forget.vue'
import modify from '../components/modify.vue'
import home from '../components/home.vue'
import information from '../components/information.vue'
import apply from '../components/apply.vue'
import state from '../components/state.vue'
import sign from '../components/sign.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/forget', component: forget },
    { path: '/modify', component: modify },
    {
        path: '/home',
        component: home,
        // redirect: '/form',
        children: [
            { path: '/apply', component: apply },
            { path: '/state', component: state },
            { path: '/information', component: information },
            { path: '/sign', component: sign },
            // {
            //     path: '/login',
            //     meta: {
            //         requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: Index
            // }
        ]
    },

]


// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) { //如果需要跳转 ，往下走（1）
//         if (true) { //判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
//             if (to.path === '/login') { //判断下一个路由是否为要验证的路由（3）
//                 next('/index'); // 如果是直接跳到首页，
//             } else { //如果该路由不需要验证，那么直接往后走
//                 next();
//             }
//         } else {
//             console.log('没有'); //如果没有登陆过，或者token 过期， 那么跳转到登录页
//             next('/login');
//         }
//     } else { //不需要跳转，直接往下走
//         next();
//     }
// });



const router = new VueRouter({
    routes: routes
})


export default router