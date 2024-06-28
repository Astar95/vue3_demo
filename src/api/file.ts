import {get,post,put,deleteRequest} from '../utils/request'
// 文件接口


// 获取文件列表 
export const getFileList = (limit:number=20,offset:number=0) => get(`file?limit=${limit}&offset=${offset}`)

//  创建文件
export const createFile = (data:any) => post('file',data)

// 批量创建文件
export const batchCreateFile = (data:any) => post('file/batchCreate',data)

// 获取文件详情
export const getFileDetail = (id:object) => get(`file/${id}`)


//  更新文件
export const updateFile = (id:object) => put(`file/${id}`)

//  删除文件
export const deleteFile = (id:object) => deleteRequest(`file/${id}`)


//  上传文件
export const uploadFile = (data:any) => post('upload',data)