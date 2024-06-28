import {get,post,put,deleteRequest} from '../utils/request'
// 项目接口


// 获取项目列表 
export const getProjectList = (limit:number=20,offset:number=0) => get(`project?limit=${limit}&offset=${offset}`)

//  创建项目
export const createProject = (data:any) => post('project',data)

// 批量创建项目
export const batchCreateProject = (data:any) => post('project/batchCreate',data)

// 获取项目详情
export const getProjectDetail = (id:object) => get(`project/${id}`)


//  更新项目
export const updateProject = (id:object) => put(`project/${id}`)

//  删除项目
export const deleteProject = (id:object) => deleteRequest(`project/${id}`)

