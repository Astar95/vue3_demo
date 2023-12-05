<!-- 房间管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import {getRoomList,getRoomState,getRoomTypeList,delRoom} from '../../api/room'
import PublicTables from '../../components/PublicTables.vue'
import PublicPagination from '../../components/PublicPagination.vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import AddorEditDrawer from '../../components/room/AddorEditDrawer.vue'
const roomList=ref<any>([])
// 获取请求传递的参数
const data=ref<any>({
  page:1,
  pageSize:5,
  roomStateId:0,
  roomTypeId:0
})
// 存储房间状态信息列表
const getStateData=ref<any>([])
const stateOption=ref('')
// 存储房间类型信息列表
const getTypeData=ref<any>([])
const typeOption=ref('')
const total=ref(0)
// 获取房间列表
const getRoomData=async (obj?:any)=>{
  await getRoomList(obj.page,obj.pageSize,obj.roomStateId,obj.roomTypeId)
  .then((res)=>{
    roomList.value=res.data
    total.value=res.total
    
  })
}
// 获取房间状态列表
const getRoomStateData=async ()=>{
  const res= await getRoomState()
  getStateData.value=res.data
}
// 获取房间类型列表
const getRoomTypeData=async ()=>{
  const res= await getRoomTypeList()
  getTypeData.value=res.data
}
onMounted(()=>{
  getRoomData(data.value)
  getRoomStateData()
  getRoomTypeData()
})
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
  editForm.id=666
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
      await delRoom(id).then(()=>{
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
    roomStateId:0,
    roomTypeId:0
  }
  getRoomData(data.value)
}
// 根据条件查询
const queryUser=()=>{
  data.value.roomStateId=stateOption.value===''?0:stateOption.value
  data.value.roomTypeId=typeOption.value===''?0:typeOption.value
  getRoomData(data.value)
}
// 重置功能
const resetting=()=>{
  typeOption.value=''
  stateOption.value=''
  data.value.roomStateId=stateOption.value===''?0:stateOption.value
  data.value.roomTypeId=typeOption.value===''?0:typeOption.value
  getRoomData(data.value)
}
</script>

<template>
  <div style="padding: 20px;">
    <!-- 添加按钮 -->
    <div style="display: flex; justify-content: space-between;">
      <el-button type="primary" plain style="margin-bottom: 20px;" @click="addRole">添加</el-button>
      <div>
      <el-select v-model="typeOption" clearable placeholder="请选择房型" style="margin-bottom: 20px; margin-right: 20px;" >
        <el-option
            v-for="item in getTypeData"
            :key="item.roomTypeId"
            :label="item.roomTypeName"
            :value="item.roomTypeId"
          />
      </el-select>
      <el-select v-model="stateOption" clearable placeholder="请选择状态" style="margin-bottom: 20px; margin-right: 20px;" >
        <el-option
            v-for="item in getStateData"
            :key="item.roomStateId"
            :label="item.roomStateName"
            :value="item.roomStateId"
          />
      </el-select>
      <el-button type="success" plain style="margin-bottom: 20px;" @click="queryUser">查询</el-button>
      <el-button type="warning" plain style="margin-bottom: 20px;" @click="resetting">重置</el-button>
    </div>
    </div>
    <!-- 新增编辑抽屉 -->
    <AddorEditDrawer ref="AddorEditRef" :getTypeData="getTypeData" :getStateData="getStateData" @success="onSuccess"></AddorEditDrawer>
    <!-- 表格 -->
    <PublicTables :tableData="roomList">
      <template #tableColumns>
        <el-table-column label="房间号" align="center" prop="roomId"></el-table-column>
        <el-table-column label="房型" align="center" prop="roomType.roomTypeName"></el-table-column>
        <el-table-column label="价格" align="center" prop="roomType.roomTypePrice">
            <template #default="scope">
                <el-tag :type="scope.row.roomType.roomTypePrice>=200?'danger':'warning'">
                    {{ scope.row.roomType.roomTypePrice }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="床位数量" align="center">
            <template #default="scope">
                <el-tag :type="scope.row.roomType.bedNum>1?'':'warning'">
                    {{ scope.row.roomType.bedNum }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="roomState.roomStateName">
          <template #default="scope">
                <el-tag :type="scope.row.roomState.roomStateId===1?'success':scope.row.roomState.roomStateId===2?'danger':''">
                    {{ scope.row.roomState.roomStateName }}
                </el-tag>
            </template>
        </el-table-column>
      </template>
      <!-- 操作区域 -->
      <template #operate>
        <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.roomId)"
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