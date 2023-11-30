import {get,post} from '../utils/request'
// 角色接口

// 获取角色列表
export const getRoleList = () => get('/my/roleList')

// 新增角色
export const roleAdd = (data: any) => post('/my/addRole', data)
