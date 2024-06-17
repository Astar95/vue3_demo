import {get,post,put,deleteRequest} from '../utils/request'
// 文件接口


// 获取文件列表 
export const getFileList = (page:number=1,pageSize:number=5) => get(`/file?page=${page}&pageSize=${pageSize}`)

//  创建文件
export const createFile = (data:any) => post('/file',data)

// 批量创建文件
export const batchCreateFile = (data:any) => post('/file/batchCreate',data)

// 获取文件详情
export const getFileDetail = (id:number) => get(`/file/${id}`)


//  更新文件
export const updateFile = (id:number,data:any) => put(`/file/${id}`,data)

//  删除文件
export const deleteFile = (id:number) => deleteRequest(`/file/${id}`)


//  上传文件
export const uploadFile = (data:any) => post('/upload',data)