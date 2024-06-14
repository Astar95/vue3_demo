import {post,get} from '../utils/request.ts'

//  登录接口
export const login =(data: object) => {
    
    return post('login', data)
}

// 注册接口
export const register =(data: object) => {

    return post('register', data)
}

// 获取登录信息
export const getLoginInfo =(data:string) => {
    return get(`/my/getUserInfo?phone=${data}`)
}

// 获取用户列表信息
export const getUserList =(page:number=1,pageSize:number=5,roleId:number=0) => {
    return get(`/my/userList?page=${page}&pageSize=${pageSize}&roleId=${roleId}`)
}

// 删除用户信息
export const delUser=(id:number)=>{
    return get(`/my/deleteUser?id=${id}`)
}

// 新增用户信息
export const addUser=(data:object)=>{
    return post('/my/addUser',data)
}

// 编辑用户信息
export const editUser=(data:object)=>{
    return post('/my/editUser',data)
}