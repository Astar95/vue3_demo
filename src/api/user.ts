import {post,get} from '../utils/request.ts'

//  登录接口
export const login =(data: object) => {
    
    return post('/api/login', data)
}

// 注册接口
export const reguser =(data: object) => {

    return post('/api/reguser', data)
}

// 获取登录信息
export const getLoginInfo =(data:string) => {
    return get(`/my/getUserInfo?username=${data}`)
}

// 获取用户列表信息
export const getUserList =(page:number=1,pageSize:number=5) => {
    return get(`/my/userList?page=${page}&pageSize=${pageSize}`)
}

// 删除用户信息
export const delUser=(id:number)=>{
    return get(`/my/deleteUser?id=${id}`)
}