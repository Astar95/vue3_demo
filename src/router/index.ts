import { createRouter, createWebHistory } from 'vue-router'

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
                  name: '首页',
                  meta:{title:'首页'},
                  component:()=>import('../views/user/File.vue')
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
                  name: '全部文件夹',
                  meta:{title:'全部文件夹'},
                  component:()=>import('../views/user/File.vue')
                },
                {
                  path: 'file',
                  name: '默认文件夹',
                  meta:{title:'默认文件夹'},
                  component:()=>import('../views/user/File.vue')
                }
            ],
        },
    ]
})
export default router