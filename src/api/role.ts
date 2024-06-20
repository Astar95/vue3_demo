import {get,post,put,deleteRequest} from '../utils/request'
// 角色接口

// 获取角色列表
export const getRoleList = (page:number=1,pageSize:number=5) => get(`/role?page=${page}&pageSize=${pageSize}`)

// 创建角色
export const roleCreate = (data: any) => post('/role', data)

// 批量创建角色
export const roleBatchCreate = (data: any) => post('/role/batchCreate', data)

// 获取角色详情
export const getRoleDetail = (id: number) => get(`/role/:id`, { id })

// 更新角色信息
export const roleUpdate = (data: any) => put('role/:id', data)

// 删除角色信息
export const roleDelete = (data: any) => deleteRequest(`/role/:id`, data)
