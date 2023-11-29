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