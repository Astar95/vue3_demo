import {get,post} from '../utils/request'

// 获取入住用户信息列表
export const getGuestList=(page:number=1,pageSize:number=5,resideStateId:any=0,guestName:any=0)=>
get(`/guest/getGuestList?page=${page}&pageSize=${pageSize}&resideStateId=${resideStateId}&guestName=${guestName}`)

// 获取结账状态信息列表
export const getCheckOutStateList=()=>
get('/guest/getCheckOutList')

// 新增顾客（入住用户）
export const addGuest=(data:any)=>
post('/guest/addGuest',data)

// 编辑顾客（入住用户）
export const editGuest=(data:any)=>
post('/guest/editGuest',data)

// 结账功能
export const checkOut=(data:any)=>
post('/guest/checkOut',data)

// 删除顾客功能
export const delGuest=(guestId:any)=>
get(`/guest/delGuest?guestId=${guestId}`)

// 根据顾客id获取顾客已经开好的房间
export const getGuestRoomList=(guestId:any,roomTypeId:any)=>
get(`/guest/getGuestRoom?guestId=${guestId}&roomTypeId=${roomTypeId}`)