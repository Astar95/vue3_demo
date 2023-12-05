<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { roleAdd,roleUpdate } from '../../api/role'
import { ElMessage } from 'element-plus'
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
    roleId:null,
    roleName:''
})
const validRoleName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('角色名称不能为空'))
  } else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  roleName: [{ validator: validRoleName, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(ruleForm.value.roleId){
        await roleUpdate(ruleForm.value).then(()=>{
            dialog.value=false
            ElMessage.success('编辑成功')
            eimt('success','edit')
        })
      }else{
        //新增
        await roleAdd(ruleForm.value).then(()=>{
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
      roleId:null,
      roleName:''
  }
}
// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    if(obj.roleId){
        ruleForm.value=obj
        
    }
}
//将状态暴露出去
defineExpose({
    open
})
</script>

<template>
    <el-drawer
    v-model="dialog"
    :title="ruleForm.roleId?'编辑角色':'新增角色'"
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
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName" autocomplete="off" />
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
</style>