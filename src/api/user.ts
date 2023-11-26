import {post} from '../utils/request.ts'

//  登录接口
export const login =(data: object) => {
    
    return post('/api/login', data)
}