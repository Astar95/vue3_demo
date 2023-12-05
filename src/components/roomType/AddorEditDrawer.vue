<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import {addRoomType,editRoomType} from '../../api/room'
import { ElMessage } from 'element-plus'
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  roomTypeId:null,
  roomTypeName:'',
  roomTypePrice:'',
  bedNum:'',
  typeDescription:''
})
const validRoomTypeName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('房型名称不能为空'))
  } else {
    callback()
  }
}
const validRoomTypePrice = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('房型价格不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validRoomTypeBedNum = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('床位数量不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  roomTypeName: [{ validator: validRoomTypeName, trigger: 'blur' }],
  roomTypePrice: [{ validator: validRoomTypePrice, trigger: 'blur' }],
  bedNum: [{ validator: validRoomTypeBedNum, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(ruleForm.value.roomTypeId){
        await editRoomType(ruleForm.value).then(()=>{
            dialog.value=false
            ElMessage.success('编辑成功')
            eimt('success','edit')
        })
      }else{
        //新增
        await addRoomType(ruleForm.value).then(()=>{
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
    roomTypeId:null,
    roomTypeName:'',
    roomTypePrice:'',
    bedNum:'',
    typeDescription:''
  }
}
// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    if(obj.roomTypeId){
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
    :title="ruleForm.roomTypeId ? '编辑房型' : '新增房型'"
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
      <el-form-item label="房型名称" prop="roomTypeName">
        <el-input v-model="ruleForm.roomTypeName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房型描述" prop="typeDescription">
        <el-input v-model="ruleForm.typeDescription" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房型价格" prop="roomTypePrice">
        <el-input v-model="ruleForm.roomTypePrice" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="床位数量" prop="bedNum">
        <el-input v-model="ruleForm.bedNum" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >{{ruleForm.roomTypeId ? '编辑' : '添加'}}</el-button
        >
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
</style>