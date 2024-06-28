<!-- 个人中心 -->
<script setup lang="ts">
import {getUserInfo,updateUserInfo} from '../api/user'
import type { FormInstance, FormRules } from 'element-plus'
import {ref,onMounted} from 'vue'
import {userStore} from '../store'
import { ElMessage } from 'element-plus'
import {baseURL_dev} from '../config/baseURL'
import {getRoleList} from '../api/role'
// 头像
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
const useStore=userStore()
const userInfo = ref<any>({
    id:null,
    phone:'',
    password:'',
    nick_nick_name:'',
    created_at:'',
    updated_at:'',
    deleted_at:''
})
// 获取当前登录的个人信息
const getUserData=async ()=>{
  await getUserInfo(useStore.userData.id).then((res:any)=>{
    userInfo.value=JSON.parse(JSON.stringify(res.data))
  })
}
// 获取角色信息列表
const roleList=ref<any>([])
const getRole=async ()=>{
  await getRoleList().then((res)=>{
    roleList.value=res.data
    
  })
}
onMounted(()=>{
  getUserData()
  getRole()
})
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
  const validRolephone = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('电话不能为空'))
  } else {
    callback()
  }
}
const validRolePwd = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
const validRoleNick_name = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('姓名不能为空'))
  } else {
    callback()
  }
}
const validRoleId = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请选择角色'))
  } else {
    callback()
  }
}

//验证对象
const rules = ref<FormRules<typeof userInfo>>({
    phone: [{ validator: validRolephone, trigger: 'blur' }],
    password: [{ validator: validRolePwd, trigger: 'blur' }],
    nick_name: [{ validator: validRoleNick_name, trigger: 'blur' }],
    roleId: [{ validator: validRoleId, trigger: 'blur' }]
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
          nick_nick_name:userInfo.value.nick_nick_name,
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
const session_id=useStore.session_id
// 文件上传成功时的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  if(response.code==200){
    userInfo.value.userPic=baseURL_dev+response.imageUrl
    
  }else{
    return false
  }
}
// 上传文件之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //图片格式
  let imgTypes=['image/jpeg','image/jpg','image/png','image/gif']
  if (!imgTypes.includes(rawFile.type)) {
    ElMessage.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }
  return true
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
        <el-form-item label="昵称" prop="nick_nick_name">
          <el-input v-model="userInfo.nick_name" autocomplete="off" style="width: 40%;"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="baseURL_dev+'upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{Authorization:session_id}"
            nick_name="image"
          >
            <img v-if="userInfo.userPic" :src="userInfo.userPic" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" style="width: 40%;">
            <el-select
            v-model="userInfo.roleId"
            placeholder="请选择角色"
            clearable
          >
            <el-option v-for="item in roleList" :key="item.roleId" :label="item.rolenick_name" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userInfo.phone" autocomplete="off" style="width: 40%;"/>
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