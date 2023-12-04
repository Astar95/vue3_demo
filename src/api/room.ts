import {get,post} from '../utils/request'
// 客房管理接口

//获取房型列表
export const getRoomType = (page:number=1,pageSize:number=5) => 
get(`/room/getRoomType?page=${page}&pageSize=${pageSize}`)

// 新增房型
export const addRoomType = (data:any) =>
post('/room/addRoomType',data)

// 编辑房型
export const editRoomType = (data:any) =>
post('/room/editRoomType',data)

// 删除房型
export const delRoomType = (id:number) =>
get(`/room/delRoomType?roomTypeId=${id}`)