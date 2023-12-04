<script lang="ts" setup>
import {ref,watch,onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login,reguser,getLoginInfo} from '../api/user'
import {userStore} from '../store'
import { ElMessage } from 'element-plus'
import router  from '../router'


const ruleFormRef = ref<FormInstance>()
const isRegister = ref(false)


// 表单校验方法
// 验证账号
const validateName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else {
    callback()
  }
}
// 验证密码
const validatePwd = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
// 验证确认密码
const validateRePwd = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认密码不能为空'))
  } else if (value !== ruleForm.value.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const ruleForm = ref({
  username: '',
  password: '',
  repassword:''
})
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePwd, trigger: 'blur' }],
  repassword: [{ validator: validateRePwd, trigger: 'blur' }]
})

const useData=userStore()
// 登录方法
const userLogin =(formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 请求登录接口
      await login(ruleForm.value).then(async (res:any)=>{
        if(res.code===200){
          useData.setToken(res.token)
          const user=await getLoginInfo(ruleForm.value.username)
          console.log(user);
          
          useData.setData(user.data)
          ElMessage.success('登录成功')
          router.push('/index')
        }else{
          ElMessage.error('登录失败')
        }
      })
    } else {
      return false
    }
  })
}
// 注册方法
const userRegister=(formEl: FormInstance | undefined) =>{
  if  (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 请求注册接口
      await reguser(ruleForm.value).then((res:any)=>{
        if(res.code===200){
          ElMessage.success('注册成功')
          isRegister.value=false
        }else{
          ElMessage.error('注册失败')
        }
      })
    }else {
      return false
    }
  })
}
// 切换的时候，重置表单内容
watch(isRegister, () => {
  ruleForm.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
onMounted(()=>{
  if(useData.userData.username){
    router.push('/index')
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="userRegister(ruleFormRef)"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            name="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="userLogin(ruleFormRef)"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background-image: url('../assets/login.jpg');
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
