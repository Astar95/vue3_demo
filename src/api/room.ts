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

// 获取房间列表
export const getRoomList = (page:number=1,pageSize:number=5,roomStateId:number=0,roomTypeId:number=0) =>
    get(`/room/getRoomList?page=${page}&pageSize=${pageSize}
&roomStateId=${roomStateId}&roomTypeId=${roomTypeId}`)

// 获取房间状态列表
export const getRoomState = () =>{
    return get('/room/getRoomStatusList')
}

// 获取房间类型列表
export const getRoomTypeList = () =>{
    return get('/room/getRoomTypeList')
}

// 新增房间
export const addRoom = (data:any) =>{
   return post('/room/addRoom',data)
}

// 编辑房间
export const editRoom = (data:any) =>{
    return post('/room/editRoom',data)
}
// 删除房间
export const delRoom = (id:number) =>{
    return get(`/room/delRoom?roomId=${id}`)
}
