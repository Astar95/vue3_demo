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
                  path: 'role',
                  name: '角色管理',
                  meta:{title:'角色管理'},
                  component:()=>import('../views/user/Role.vue')
                },
                {
                  path: 'user',
                  name: '用户管理',
                  meta:{title:'用户管理'},
                  component:()=>import('../views/user/user.vue')
                },
                {
                  path: 'roomType',
                  name: '房型管理',
                  meta:{title:'房型管理'},
                  component:()=>import('../views/room/RoomType.vue')
                },
                {
                  path: 'room',
                  name: '房间管理',
                  meta:{title:'房间管理'},
                  component:()=>import('../views/room/Room.vue')
                },
                {
                  path: 'liveIn',
                  name: '入住用户',
                  meta:{title:'入住用户'},
                  component:()=>import('../views/custom/LiveIn.vue')
                }
            ],
        },
    ]
})
export default router