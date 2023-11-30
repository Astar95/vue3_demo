import {get,post} from '../utils/request'
// 角色接口

// 获取角色列表
export const getRoleList = (page:number=1,pageSize:number=5) => get(`/my/roleList?page=${page}&pageSize=${pageSize}`)

// 新增角色
export const roleAdd = (data: any) => post('/my/addRole', data)

// 更新角色信息
export const roleUpdate = (data: any) => post('/my/updateRole', data)

// 删除角色信息
export const roleDelete = (data: any) => get(`/my/deleteRole?roleId=${data}`)
