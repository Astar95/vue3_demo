import axios from 'axios'
import router from '../router'
import { ElMessage } from 'element-plus'
import { userStore } from '../store'
import {baseURL_dev} from '../config/baseURL.ts'

//初始化一个axios对象
const instance = axios.create({
    baseURL: baseURL_dev,
    timeout: 3000
});
// TODO 2. 携带sessionid
const useStore = userStore()
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
  instance.interceptors.response.use(
    (res) => {
      if(res.data.code === 401){
        useStore.removeSessionid()
        useStore.removeUser()
        ElMessage.error('登录sessionid过期，请重新登录')
        router.push('/login')
      }
      return res
    },
    (err) => {
      console.log(err);
      
      // TODO 5. 处理401错误
      // 错误的特殊情况 => 401 权限不足 或 sessionid 过期 => 拦截到登录
      if (err.response.status === 401) {
        router.push('/login')
      }
  
      // 错误的默认情况 => 只要给提示
      ElMessage.error(err.response.data.message || '服务异常')
      return Promise.reject(err)
    }
  )

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