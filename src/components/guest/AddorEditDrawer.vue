<!-- 用户入住新增编辑抽屉 -->
<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import {getRoomTypeList,getRoomList} from '../../api/room'
import {addGuest,getGuestRoomList,editGuest} from '../../api/guest'
import { ElMessage } from 'element-plus'
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  guestId:null,
  guestName:'',
  identityId:'',
  phone:'',
  deposit:'',
  guestNum:'',
  resideDate:'',
  roomTypeId:'',
  resideStateId:1,
  roomId:''
})

// 房型列表
const roomTypeList=ref<any>([])
const getRoomTypeData=async()=>{
  await getRoomTypeList().then((res)=>{
    roomTypeList.value=res.data
  })
}
// 获取房型列表
getRoomTypeData()

// 获取房间列表
const roomList=ref<any>([])
const getRoomData=async(obj?:any)=>{
  await getRoomList(obj.page,obj.pageSize,obj.roomStateId,obj.roomTypeId).then((res)=>{
    roomList.value=res.data
    
  })
}
// 根据顾客id获取顾客已经开好的房间
const guestRoomData=ref<any>({})
const getGuestRoomFun=async (guestId:any,roomTypeId:any)=>{
  await getGuestRoomList(guestId,roomTypeId).then((res)=>{
    guestRoomData.value=res.data
    roomList.value.push(guestRoomData.value)
  })

  
}
// 监听房型列表选中
const changeRoomType=(e:any)=>{
  ruleForm.value.roomId=''
  const data={
    page:1,
    pageSize:100,
    roomStateId:1,
    roomTypeId:e
  }
  getRoomData(data)
}
const validGuestName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('顾客姓名不能为空'))
  }else {
    callback()
  }
}
const validIdentityId = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('身份证不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validRoomType = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('房间类型不能为空'))
  }else {
    callback()
  }
}
const validPhone = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('电话不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validRoomId = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('房间不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validResideDate = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('入住时间不能为空'))
  }else {
    callback()
  }
}
const validDeposit = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('押金不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
const validGuestNum = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('入住人数不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('只能输入数字且不能是负数'))
  } else {
    callback()
  }
}
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  guestName:[{ validator: validGuestName, trigger: 'blur' }],
  roomTypeId:[{ validator: validRoomType, trigger: 'blur' }],
  identityId:[{ validator: validIdentityId, trigger: 'blur' }],
  phone:[{ validator: validPhone, trigger: 'blur' }],
  deposit:[{ validator: validDeposit, trigger: 'blur' }],
  guestNum:[{ validator: validGuestNum, trigger: 'blur' }],
  resideDate:[{ validator: validResideDate, trigger: 'blur' }],
  roomId: [{ validator: validRoomId, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const data={
        guestId:ruleForm.value.guestId,
        guestName:ruleForm.value.guestName,
        identityId:ruleForm.value.identityId,
        phone:ruleForm.value.phone,
        deposit:ruleForm.value.deposit,
        guestNum:ruleForm.value.guestNum,
        resideDate:ruleForm.value.resideDate,
        resideStateId:1,
        roomId:ruleForm.value.roomId
      }
      
      if(ruleForm.value.guestId){
        //编辑
        await editGuest(data).then((res)=>{
          if(res.code==200){
              dialog.value=false
              ElMessage.success('编辑成功')
              eimt('success','edit')
            }else{
              dialog.value=false
              ElMessage.error('编辑失败')
            }
        })
        console.log('编辑',data);
        
      }else{
        //新增
        await addGuest(data).then((res)=>{
            if(res.code==200){
              dialog.value=false
              ElMessage.success('新增成功')
              eimt('success','add')
            }else{
              dialog.value=false
              ElMessage.error('新增失败')
            }

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
      guestId:null,
      guestName:'',
      identityId:'',
      phone:'',
      deposit:'',
      guestNum:'',
      resideDate:'',
      resideStateId:1,
      roomTypeId:'',
      roomId:''
    }
}
// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    
    //有guestId的就是编辑
    if(obj.guestId){
        ruleForm.value={
          guestId:obj.guestId,
          guestName:obj.guestName,
          identityId:obj.identityId,
          phone:obj.phone,
          deposit:obj.deposit,
          guestNum:obj.guestNum,
          resideDate:obj.resideDate,
          resideStateId:1,
          roomTypeId:obj.room.roomTypeId,
          roomId:obj.roomId
        }
        const data={
          page:1,
          pageSize:100,
          roomStateId:1,
          roomTypeId:obj.room.roomTypeId
        }
        getRoomData(data)
        getGuestRoomFun(obj.guestId,obj.room.roomTypeId)
    }else{
      roomList.value=[]
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
    :title="ruleForm.guestId?'编辑顾客':'新增顾客'"
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
      <el-form-item label="身份证号" prop="identityId">
        <el-input v-model="ruleForm.identityId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="顾客姓名" prop="guestName">
        <el-input v-model="ruleForm.guestName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="顾客电话" prop="phone">
        <el-input v-model="ruleForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房间类型" prop="roomTypeId">
        <el-select v-model="ruleForm.roomTypeId" @change="changeRoomType" placeholder="请选择房间类型">
          <el-option 
            v-for="item in roomTypeList"
            :key="item.roomTypeId"
            :label="item.roomTypeName"
            :value="item.roomTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="房间" prop="roomId">
        <el-select v-model="ruleForm.roomId" placeholder="请选择房间">
          <el-option 
            v-for="item in roomList"
            :key="item.roomId"
            :label="item.roomId+'号房间'"
            :value="item.roomId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入住日期" prop="resideDate">
        <el-date-picker
        v-model="ruleForm.resideDate"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择入住日期"
        />
      </el-form-item>
      <el-form-item label="押金" prop="deposit">
        <el-input v-model="ruleForm.deposit" autocomplete="off" />
      </el-form-item>
      <el-form-item label="入住人数" prop="guestNum">
        <el-input v-model="ruleForm.guestNum" autocomplete="off" />
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