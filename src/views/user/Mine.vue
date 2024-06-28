<!-- 个人中心 -->
<script setup lang="ts">
import {getUserInfo,updateUserInfo} from '../../api/user'
import type { FormInstance, FormRules } from 'element-plus'
import {ref,onMounted} from 'vue'
import {userStore} from '../../store'
import { ElMessage } from 'element-plus'
const useStore=userStore()
const userInfo = ref<any>({
    id:null,
    nick_nick_name:''
})
// 获取当前登录的个人信息
const getUserData=async ()=>{
  await getUserInfo(useStore.userData.id).then((res:any)=>{
    userInfo.value=JSON.parse(JSON.stringify(res.data))
  })
}
onMounted(()=>{
  getUserData()
})
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const validRoleNick_name = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('姓名不能为空'))
  } else {
    callback()
  }
}

//验证对象
const rules = ref<FormRules<typeof userInfo>>({
    nick_name: [{ validator: validRoleNick_name, trigger: 'blur' }]
})
// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data={
          id:userInfo.value.id,
          phone:userInfo.value.phone,
          password:userInfo.value.password,
          nick_nick_name:userInfo.value.nick_name,
        }
      await updateUserInfo(data.id).then(()=>{
        ElMessage.success('保存成功')
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
        <span>个人中心</span>
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
        <el-form-item label="手机号" prop="phone">
          <el-input disabled v-model="userInfo.phone" autocomplete="off" style="width: 40%;"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="userInfo.nick_name" autocomplete="off" style="width: 40%;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
</style>