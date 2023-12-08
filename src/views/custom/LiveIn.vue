<!-- 入住用户 -->
<script setup lang="ts">
import { ref } from 'vue'
import {getGuestList,getCheckOutStateList,checkOut,delGuest} from '../../api/guest'
import PublicTables from '../../components/PublicTables.vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicPagination from '../../components/PublicPagination.vue'
import AddorEditDrawer from '../../components/guest/AddorEditDrawer.vue'
import * as ExcelJS from 'exceljs'
import moment from 'moment'

// 入住用户信息列表
const guestList=ref<any>([])
// 结账状态列表
const checkOutStateList=ref<any>([])
const stateOption=ref('')
const name=ref('')
const getCheckOutState=async ()=>{
  await getCheckOutStateList().then((res)=>{
    checkOutStateList.value=res.data
  })
}
// 获取请求传递的参数
const data=ref<any>({
  page:1,
  pageSize:5,
  resideStateId:0,
  guestName:0
})


const total=ref(0)
const getGuestListData=async(obj?:any)=>{
  await getGuestList(obj.page,obj.pageSize,obj.resideStateId,obj.guestName).then((res)=>{
    
    res.data.forEach((item:any)=>{
      item.resideDate=moment(item.resideDate).format('YYYY-MM-DD HH:mm:ss')
      item.leaveDate=item.leaveDate===null?'':moment(item.leaveDate).format('YYYY-MM-DD HH:mm:ss')
    })
    guestList.value=res.data
    total.value=res.total
  })
}
// 获取入住用户信息
getGuestListData(data.value)
// 获取结账状态列表
getCheckOutState()

//定义编辑组件ref对象--通过AddorEditRef可以获取组件暴露的实例对象
let AddorEditRef=ref()
// 添加抽屉
const addRole=()=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open({})
}

// 编辑
const handleEdit=(row:any)=>{
  
  // 打开编辑抽屉时，使用深拷贝克隆表格数据到编辑表单中
  const editForm =JSON.parse(JSON.stringify(row))
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(editForm)
}

// 删除
const handleDelete=(id:any)=>{
  
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await delGuest(id).then(()=>{
        ElMessage.success('删除成功')
        pageRef.value.handleEdit()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    }
  )
}
// 触发分页的ref
const pageRef=ref()
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const onSuccess=(type:string)=>{
  if(type==='add'){
    pageRef.value.handleChange()

  }else{
    pageRef.value.handleEdit()
  }
}
// 分页
// 接收分页子组件传过来的数据--current-page 改变时触发
const fetchData=(obj:any)=>{
  data.value={
    ...obj,
    resideStateId:stateOption.value===''?0:stateOption.value,
    guestName:name.value===''?0:name.value
  }
  getGuestListData(data.value)
}
// 根据条件查询
const queryUser=()=>{
  data.value.resideStateId=stateOption.value===''?0:stateOption.value
  data.value.guestName=name.value===''?0:name.value
  getGuestListData(data.value)
}
// 重置功能
const resetting=()=>{
  name.value=''
  stateOption.value=''
  data.value.page=1
  pageRef.value.handleCurrentChange(data.value.page)
}
// 结账功能
const checkout=(row:any)=>{
  const obj={
    guestId:row.guestId,
    resideDate:row.resideDate,
    roomTypePrice:row.room.roomType.roomTypePrice,
    deposit:row.deposit,
    roomId:row.roomId
  }
  ElMessageBox.confirm(
    '是否确定结账?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () =>{
      await checkOut(obj).then((res)=>{
        if (res.code === 200) {
          pageRef.value.handleEdit()
          ElMessage({
            type: 'success',
            message: '结账成功',
          })
        }
      })
    }
  ).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
  })
}
// 导出Excel
const exportExcel=()=>{
  ElMessageBox.confirm(
    '是否确定导出当前页数据?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      // 获取当前页面表格的数据
      const dataToExport = guestList.value

      // 使用exceljs生成Excel文件
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Sheet1')
      //添加表头
      worksheet.addRow(['姓名','身份证','电话','房型','房间号','状态','入住日期','离开日期','押金','人数','总金额'])
      // 添加数据
      dataToExport.forEach((item:any)=>{
      worksheet.addRow([item.guestName,item.identityId,item.phone,item.room.roomType.roomTypeName,item.roomId,
     item.resideState.resideStateName,item.resideDate,item.leaveDate,item.deposit,item.guestNum,item.totalMoney])
      })
      // 生成文件
      workbook.xlsx.writeBuffer().then((buffer:any)=>{
        const blob = new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = '用户入住信息.xlsx'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    }
  )
}
</script>

<template>
  <div style="padding: 20px;">
    <!-- 添加按钮 -->
    <div style="display: flex; justify-content: space-between;">
        <el-button type="primary" plain style="margin-bottom: 20px;" @click="addRole">添加</el-button>
        <div>
          <el-input placeholder="请输入姓名" v-model="name"  style="margin-bottom: 20px;width: 200px;  margin-right: 20px;"></el-input>
          <el-select v-model="stateOption" clearable placeholder="请选择状态" style="margin-bottom: 20px; margin-right: 20px;" >
            <el-option
                v-for="item in checkOutStateList"
                :key="item.resideStateId"
                :label="item.resideStateName"
                :value="item.resideStateId"
              />
          </el-select>
          <el-button type="primary" plain style="margin-bottom: 20px;" @click="exportExcel">导出Excel</el-button>
          <el-button type="success" plain style="margin-bottom: 20px;" @click="queryUser">查询</el-button>
          <el-button type="warning" plain style="margin-bottom: 20px;" @click="resetting">重置</el-button>
      </div>
    </div>
    <!-- 新增编辑抽屉 -->
    <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
    <!-- 表格 -->
    <PublicTables :tableData="guestList">
      <template #tableColumns>
        <el-table-column label="姓名" align="center" prop="guestName"></el-table-column>
        <el-table-column label="身份证" align="center" prop="identityId"></el-table-column>
        <el-table-column label="电话" align="center" prop="phone"></el-table-column>
        <el-table-column label="房型" align="center" prop="room.roomType.roomTypeName"></el-table-column>
        <el-table-column label="房间号" align="center" prop="roomId"></el-table-column>
        <el-table-column label="状态" align="center" prop="resideState.resideStateName"></el-table-column>
        <el-table-column label="入住日期" align="center" prop="resideDate"></el-table-column>
        <el-table-column label="离开日期" align="center" prop="leaveDate"></el-table-column>
        <el-table-column label="押金" align="center" prop="deposit"></el-table-column>
        <el-table-column label="人数" align="center" prop="guestNum"></el-table-column>
        <el-table-column label="总金额" align="center" prop="totalMoney"></el-table-column>
      </template>
      <!-- 操作区域 -->
      <template #operate>
        <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" type="primary" v-if="scope.row.resideState.resideStateId===1" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="success" v-if="scope.row.resideState.resideStateId===1" @click="checkout(scope.row)">结账</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.guestId)"
            v-if="scope.row.resideState.resideStateId===2"
            >删除</el-button
          >
        </template>
      </el-table-column>
      </template>
    </PublicTables>
    <!-- 分页 -->
    <PublicPagination ref="pageRef" :total="total" @paginAtion="fetchData"></PublicPagination>
  </div>
</template>

<style scoped lang="scss">
</style>