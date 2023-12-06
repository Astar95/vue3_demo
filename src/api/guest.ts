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