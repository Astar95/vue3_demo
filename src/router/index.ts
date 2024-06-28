import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/login',
            redirect:'/'
        },
        {
            path:'/',
            name:'登录',
            meta:{title:'登录'},
            component:()=>import('../views/Login.vue')
        },
        {
            path:'/index',
            name:'首页',
            meta:{title:'首页'},
            component:()=>import('../views/Index.vue'),
            children: [
                {
                  path: '',
                  name: '主页',
                  meta:{title:'主页'},
                  component:()=>import('../views/Home.vue')
                },
                {
                    path: 'mine',
                    name: '个人中心',
                    meta:{title:'个人中心'},
                    component:()=>import('../views/user/Mine.vue')
                },
                {
                    path: 'setPwd',
                    name: '修改密码',
                    meta:{title:'修改密码'},
                    component:()=>import('../views/user/SetPwd.vue')
                },
                {
                  path: 'file',
                  name: '文件上传',
                  meta:{title:'文件上传'},
                  component:()=>import('../views/File.vue')
                },
                {
                  path: 'file',
                  name: '文件列表',
                  meta:{title:'文件列表'},
                  component:()=>import('../views/Filelist.vue')
                }
            ],
        },
    ]
})

router.beforeEach((to,from,next)=>{
    NProgress.start()
    next()
})
router.afterEach((to,from)=>{
    if(to.meta&&to.meta.title){
        document.title=to.meta.title
    }
    NProgress.done()
})
export default router