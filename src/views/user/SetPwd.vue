<!-- 修改密码 -->
<script setup lang="ts">
import {getLoginInfo,editUser} from '../../api/user'
import type { FormInstance, FormRules } from 'element-plus'
import {ref,onMounted} from 'vue'
import {userStore} from '../../store'
import { ElMessage } from 'element-plus'
const useStore=userStore()
const userInfo = ref<any>({
    id:null,
    username:'',
    password:'',
    name:'',
    userPic:'',
    phone:'',
    roleId:'',
    confirmPwd:''
})
// 获取当前登录的个人信息
const getUserData=async ()=>{
  await getLoginInfo(useStore.userData.username).then((res)=>{
    userInfo.value=res.data
    userInfo.value.confirmPwd=''
    
  })
}
onMounted(()=>{
  getUserData()
})
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const validRolePwd = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
const validConfirmPwd = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('确认不能为空'))
  } else if(userInfo.value.password!==value){
    callback(new Error('密码不一致'))
  } else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof userInfo>>({
    password: [{ validator: validRolePwd, trigger: 'blur' }],
    confirmPwd: [{ validator: validConfirmPwd, trigger: 'blur' }]
})
// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data={
          id:userInfo.value.id,
          username:userInfo.value.username,
          password:userInfo.value.password,
          name:userInfo.value.name,
          roleId:userInfo.value.roleId,
          userPic:userInfo.value.userPic,
          phone:userInfo.value.phone
        }
      await editUser(data).then(()=>{
        ElMessage.success('保存成功')
        userInfo.value.confirmPwd=''
        useStore.setData(userInfo.value)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div style="padding: 20px;">
    <el-card class="box-card">
    <!-- 头部 -->
    <template #header>
      <div class="card-header">
        <span>修改密码</span>
      </div>
    </template>
      <el-form
        ref="ruleFormRef"
        :model="userInfo"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password" autocomplete="off" style="width: 40%;"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="userInfo.confirmPwd" autocomplete="off" style="width: 40%;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<style scoped lang="scss">
</style>