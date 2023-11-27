import { createRouter, createWebHistory } from 'vue-router'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/index',
            name:'Index',
            component:()=>import('../views/Index.vue')
        },
        {
            path:'/login',
            redirect:'/'
        },
        {
            path:'/',
            name:'Login',
            component:()=>import('../views/Login.vue')
        }
    ]
})
export default router