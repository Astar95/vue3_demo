import axios from 'axios'
import {baseURL_dev} from '../config/baseURL.ts'

//初始化一个axios对象
const instance = axios.create({
    baseURL: baseURL_dev,
    timeout: 3000
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
      // TODO 3. 给请求头加上sessionId
        config.headers['session_id'] = sessionStorage.getItem('session_id')
      return config
    },
    (err) => Promise.reject(err)
  )
  
  // 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

//get 请求
export const get=async (url:string,params:object={})=>{
    let  {data} = await  instance.get(url,params)
    return data
}
//post 请求
export const post=async (url:string,params:object={})=>{
    let  {data} = await  instance.post(url,params)
    return data
}

//put 请求
export const put=async (url:string,params:object={})=>{
    let  {data} = await  instance.put(url,params)
    return data
}

//delete 请求
export const deleteRequest=async (url:string,params:object={})=>{
    let  {data} = await  instance.delete(url,params)
    return data
}