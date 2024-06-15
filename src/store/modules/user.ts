import { defineStore } from 'pinia'
import { ref } from 'vue'

// 第一个参数是应用程序中 store 的唯一 id
// 定义 'user' store
export const userStore = defineStore('user', () =>{
     // 定义 sessionid 变量，并使用 ref 包装
    const sessionid = ref('')
    // 用户登录的数据
    const userData=ref({
        phone:'',
        name:''
    })
    // 记住我--数据
    const userLogin=ref({
        phone:'',
        password:'',
        checked:false
    })
    // 定义设置 sessionid 的方法
    const setSessionid = (newSessionid:any) => {
        sessionid.value = newSessionid
      }
    const setData=(data:any)=>{
        userData.value=data
    }
    // 定义清除 sessionid 的方法
    const removeSessionid = () => {
        sessionid.value = ''
    }
    const removeUser=()=>{
        userData.value={
            phone:'',
            name:''
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
    // 返回 store 对象，包含 sessionid、userData、userLogin、setSessionid、setData、removeSessionid、removeUser、setUserLogin、removeUserLogin 方法
    return  {
        sessionid,
        userData,
        userLogin,
        setSessionid,
        setData,
        removeSessionid,
        removeUser,
        setUserLogin,
        removeUserLogin
    }
},
{
    persist: true
})