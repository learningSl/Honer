import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
})

http.interceptors.response.use((config) => {//响应拦截器
    return config
}, err => {
    if(err.response.data.msg){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.msg
        })
        if(err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})
http.interceptors.request.use((config) => {//请求拦截器
    if(localStorage.getItem('token')){
        config.headers.Authorization = 'Bearer ' + (localStorage.getItem('token') || '')// 将token挂载到请求头上的Authorization字段
    }
    return config                 //'Bearer ' 行业规范
}, err => {
    if(err.response.data.msg){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.msg
        })
    }
    return Promise.reject(err)
})
export default http