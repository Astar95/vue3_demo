import {post,get,put,deleteRequest} from '../utils/request.ts'

//  登录接口
export const login =(data: object) => {
    
    return post('login', data)
}

// 注册接口
export const register =(data: object) => {

    return post('register', data)
}
// 创建用户
export const createUser =(data: object) => {

    return post('user', data)
}

// 批量创建用户
export const batchCreateUser =(data: object) => {

    return post('user/batchCreate', data)
}

// 获取用户信息
export const getUserInfo =(id:object) => {
    return get(`user/${id}`)
}

// 修改用户信息
export const updateUserInfo =(id:object) => {
    return put(`user/${id}`)
}

// 删除用户
export const deleteUser =(id:object) => {
    return deleteRequest(`user/${id}`)
}