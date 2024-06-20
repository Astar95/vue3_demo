import {post,get,put,deleteRequest} from '../utils/request.ts'

//  登录接口
export const login =(data: object) => {
    
    return post('login', data)
}

// 注册接口
export const register =(data: object) => {

    return post('register', data)
}

// 获取用户列表
export const getUserList = () => {

    return get('user')
}

// 创建用户
export const createUser = (data: object) => {

    return post('user', data)
}

//批量创建用户
export const batchCreateUser = (data: object) => {

    return post('user/batchCreate', data)
}

// 获取用户详情
export const getUserInfo = (id: number) => {

    return get(`user/${id}`)
}
// 更新用户
export const updateUser = (id: number, data: object) => {

    return put(`user/${id}`, data)
}

// 删除用户
export const deleteUser = (id: number) => {

    return deleteRequest(`user/${id}`)
}