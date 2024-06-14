import { defineStore } from 'pinia'
import { ref } from 'vue'

// 第一个参数是应用程序中 store 的唯一 id
// 定义 'user' store
export const userStore = defineStore('user', () =>{
     // 定义 token 变量，并使用 ref 包装
    const token = ref('')
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
    // 定义设置 token 的方法
    const setToken = (newToken:any) => {
        token.value = newToken
      }
    const setData=(data:any)=>{
        userData.value=data
    }
    // 定义清除 token 的方法
    const removeToken = () => {
        token.value = ''
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
    // 返回 store 对象，包含 token、setToken、removeToken
    return  {
        token,
        userData,
        userLogin,
        setToken,
        setData,
        removeToken,
        removeUser,
        setUserLogin,
        removeUserLogin
    }
},
{
    persist: true
})