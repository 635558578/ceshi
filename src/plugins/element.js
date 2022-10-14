import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
    // 导入组件
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import login from './components/login.vue'
import router from 'vue-router';
import login from '@/components/login';
import home from '@/components/home';

Vue.use(Element)

export default new Element({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            component: home
        }
    ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/') return next();
    const tokenstr = localStorage.getItem('Authorization')
    if (!tokenstr) return next('/login')
    next()
})

// router.beforeEach((to, from, next) => {
//     //debugger
//     // if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
//     if (to.path === '/login') {
//         next();
//     } else {
//         let token = sessionStorage.getItem('Authorization');
//         if (!token) {
//             next('/login');
//         } else {
//             next();
//         }
//     }
// });
export default router;