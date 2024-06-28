import {get,post,put,deleteRequest} from '../utils/request'
// 角色接口

// 获取角色列表 
export const getRoleList = (limit:number=20,offset:number=0) => get(`role?limit=${limit}&offset=${offset}`)

//  创建角色
export const createRole = (data:any) => post('role',data)

// 批量创建角色
export const batchCreateRole = (data:any) => post('role/batchCreate',data)

// 获取角色详情
export const getRoleDetail = (id:object) => get(`role/${id}`)


//  更新角色
export const updateRole = (id:object) => put(`role/${id}`)

//  删除角色
export const deleteRole = (id:object) => deleteRequest(`role/${id}`)
