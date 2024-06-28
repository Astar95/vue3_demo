import {get,post,put,deleteRequest} from '../utils/request'
// 文件接口


// 获取文件列表 
export const getFileLogList = (limit:number=20,offset:number=0) => get(`fileLog?limit=${limit}&offset=${offset}`)

//  创建文件
export const createFileLog = (data:any) => post('fileLog',data)

// 批量创建文件
export const batchCreateFileLog = (data:any) => post('fileLog/batchCreate',data)

// 获取文件详情
export const getFileLogDetail = (id:object) => get(`fileLog/${id}`)


//  更新文件
export const updateFileLog = (id:object) => put(`fileLog/${id}`)

//  删除文件
export const deleteFileLog = (id:object) => deleteRequest(`fileLog/${id}`)

