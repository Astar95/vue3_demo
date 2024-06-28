import {get,post,put,deleteRequest} from '../utils/request'
// 角色接口

// 获取角色列表 
export const getUserRoleList = (limit:number=20,offset:number=0) => get(`userRole?limit=${limit}&offset=${offset}`)

//  创建角色
export const createUserRole = (data:any) => post('userRole',data)

// 批量创建角色
export const batchCreateUserRole = (data:any) => post('userRole/batchCreate',data)

// 获取角色详情
export const getUserRoleDetail = (id:object) => get(`userRole/${id}`)


//  更新角色
export const updateUserRole = (id:object) => put(`userRole/${id}`)

//  删除角色
export const deleteUserRole = (id:object) => deleteRequest(`userRole/${id}`)
