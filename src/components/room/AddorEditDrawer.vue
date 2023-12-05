<!-- 房间新增编辑抽屉 -->
<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import {addRoom,editRoom} from '../../api/room'
import { ElMessage } from 'element-plus'
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  id:null,
  roomId:null,
  roomStateId:'',
  roomTypeId:'',
  description:''
})
defineProps({
  getTypeData:Array as any,
  getStateData:Array as any,
})


const validRoomId = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validRoomDesc = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('描述不能为空'))
  }else {
    callback()
  }
}
const validRoomType = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('房型不能为空'))
  }else {
    callback()
  }
}
const validRoomState = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('状态不能为空'))
  }else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  roomId: [{ validator: validRoomId, trigger: 'blur' }],
  roomStateId: [{ validator: validRoomState, trigger: 'blur' }],
  roomTypeId: [{ validator: validRoomType, trigger: 'blur' }],
  description: [{ validator: validRoomDesc, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const data={
          roomId:ruleForm.value.roomId,
          roomStateId:ruleForm.value.roomStateId,
          roomTypeId:ruleForm.value.roomTypeId,
          description:ruleForm.value.description
        }
      if(ruleForm.value.id){
        //编辑
        await editRoom(data).then(()=>{
            dialog.value=false
            ElMessage.success('编辑成功')
            eimt('success','edit')
        })
      }else{
        //新增
        await addRoom(data).then(()=>{
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
      roomId:null,
      roomStateId:'',
      roomTypeId:'',
      description:''
    }
}
// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    if(obj.roomId){
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
    :title="ruleForm.roomId?'编辑房间':'新增房间'"
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
      <el-form-item label="房间号" prop="roomId">
        <el-input v-model="ruleForm.roomId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房间描述" prop="description">
        <el-input v-model="ruleForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房间类型" prop="roomTypeId">
          <el-select
          v-model="ruleForm.roomTypeId"
          placeholder="请选择房型"
          clearable
        >
          <el-option v-for="item in getTypeData" :key="item.roomTypeId" :label="item.roomTypeName" :value="item.roomTypeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="房间状态" prop="roomStateId">
          <el-select
          v-model="ruleForm.roomStateId"
          placeholder="请选择状态"
          clearable
        >
          <el-option v-for="item in getStateData" :key="item.roomStateId" :label="item.roomStateName" :value="item.roomStateId" />
        </el-select>
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