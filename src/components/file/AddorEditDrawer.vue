<!-- 用户新增编辑抽屉 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import {getRoleList } from '../../api/role'
import {addUser,editUser} from '../../api/user'
import { ElMessage } from 'element-plus'
import {baseURL_dev} from '../../config/baseURL'
import { userStore } from '../../store'
// token
const useStore=userStore()
const token=useStore.token
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
    id:null,
    username:'',
    password:'',
    name:'',
    userPic:'',
    phone:'',
    roleId:''
})
const validRoleUserName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空'))
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
const validRoleName = (_: any, value: any, callback: any) => {
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
const validRolePhone = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('电话不能为空'))
  } else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
    username: [{ validator: validRoleUserName, trigger: 'blur' }],
    password: [{ validator: validRolePwd, trigger: 'blur' }],
    name: [{ validator: validRoleName, trigger: 'blur' }],
    roleId: [{ validator: validRoleId, trigger: 'blur' }],
    phone: [{ validator: validRolePhone, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(ruleForm.value.id){
        const data={
          id:ruleForm.value.id,
          username:ruleForm.value.username,
          password:ruleForm.value.password,
          name:ruleForm.value.name,
          roleId:ruleForm.value.roleId,
          userPic:ruleForm.value.userPic,
          phone:ruleForm.value.phone
        }
        await editUser(data).then(()=>{
            dialog.value=false
            ElMessage.success('编辑成功')
            eimt('success','edit')
        })
      }else{
        //新增
        await addUser(ruleForm.value).then(()=>{
            dialog.value=false
            ElMessage.success('新增成功')
            eimt('success','add')
        })
      }
    } else {
      return false
    }
  })
}
//  取消
const resetForm = () => {
  dialog.value=false
}
//  抽屉关闭时的回调
const closeDr=() =>{
  dialog.value=false
    ruleForm.value={
        id:null,
        username:'',
        password:'',
        name:'',
        userPic:'',
        phone:'',
        roleId:''
    }
}
// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    if(obj.id){
        ruleForm.value=obj
    }
}
//将状态暴露出去
defineExpose({
    open
})
// 获取角色信息
const getRoleInfo =async (page?:number,pageSize?:number) => {
  await getRoleList(page,pageSize).then((res)=>{
      roleList.value=res.data
      
  })
}
// 角色列表
const roleList=ref<any>([])
onMounted(()=>{
  getRoleInfo()
})
// 头像
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'


// 文件上传成功时的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  if(response.code==200){
    ruleForm.value.userPic=baseURL_dev+response.imageUrl
    
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
    <el-drawer
    v-model="dialog"
    :title="ruleForm.id?'编辑用户':'新增用户'"
    direction="rtl"
    size="30%"
    @close="closeDr()"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="baseURL_dev+'/my/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="{Authorization:token}"
          name="image"
        >
          <img v-if="ruleForm.userPic" :src="ruleForm.userPic" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
          <el-select
          v-model="ruleForm.roleId"
          placeholder="请选择角色"
          clearable
        >
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
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