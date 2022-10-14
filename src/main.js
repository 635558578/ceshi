import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'


import axios from 'axios'
import qs from 'qs'
// import { config } from 'vue/types/umd';
import { Promise } from 'core-js';
// import { from } from 'core-js/core/array';
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://47.108.74.14/'
Vue.use(ElementUI);

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')

const http = axios.create({
        baseURL: '/',
        timeout: 20000
    })
    //请求参数处理
http.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem("token");
        if (token !== null && token.indexOf('Bearer') !== -1) {
            config.headers.token = sessionStorage.getItem('token');
        }
        return config;
    },
    err => Promise.reject(err)
);
