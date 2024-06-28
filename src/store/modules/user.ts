import { defineStore } from 'pinia'
import { ref } from 'vue'

// 第一个参数是应用程序中 store 的唯一 id
// 定义 'user' store
export const userStore = defineStore('user', () =>{
     // 定义 session_id 变量，并使用 ref 包装
    const session_id = ref('')
    // 用户登录的数据
    const userData=ref({
        phone:'',
        id:{},
        nick_name:''
    })
    // 记住我--数据
    const userLogin=ref({
        phone:'',
        password:'',
        checked:false
    })
    // 定义设置 session_id 的方法
    const setSession_id = (newSession_id:any) => {
        session_id.value = newSession_id
      }
    const setData=(data:any)=>{
        userData.value=data
    }
    // 定义清除 session_id 的方法
    const removeSession_id = () => {
        session_id.value = ''
    }
    const removeUser=()=>{
        userData.value={
            phone:'',
            id:{},
            nick_name:''
        }
    }
    const setUserLogin=(data:any)=>{
        userLogin.value=data
    }
    const removeUserLogin=()=>{
        userLogin.value={
            phone:'',
            password:'',
            checked:false
        }
    }
    // 返回 store 对象，包含 session_id、setSession_id、removeSession_id
    return  {
        session_id,
        userData,
        userLogin,
        setSession_id,
        setData,
        removeSession_id,
        removeUser,
        setUserLogin,
        removeUserLogin
    }
},
{
    persist: true
})