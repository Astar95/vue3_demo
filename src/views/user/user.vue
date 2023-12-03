<!-- 用户管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import {getUserList,delUser}  from  '../../api/user'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicTables from '../../components/PublicTables.vue'
import PublicPagination from '../../components/PublicPagination.vue'
import AddorEditDrawer from '../../components/user/AddorEditDrawer.vue'
// 用户信息列表
const userList = ref([])

//获取用户信息列表
const getUserData=async(page?:number,pageSize?:number)=>{
  const res=await getUserList(page,pageSize)
  userList.value=res.data
  total.value=res.total
  
}
onMounted(()=>{
  getUserData()
})
//  分页总数
const total=ref(0)
// 接收分页子组件传过来的数据--current-page 改变时触发
const fetchData=(obj:any)=>{
  getUserData(obj.page,obj.pageSize)
}
//定义编辑组件ref对象--通过AddorEditRef可以获取组件暴露的实例对象
let AddorEditRef=ref()
// 新增
const addUser=()=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open({})
}
//编辑
const handleEdit=(row:any)=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(row)
}
//删除
const handleDelete=async (id:any)=>{
  
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await delUser(id).then(()=>{
        ElMessage.success('删除成功')
        getUserData()
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
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const onSuccess=()=>{
  getUserData()
}

</script>

<template>
  <!-- 添加按钮 -->
  <div>
    <el-button type="primary" plain style="margin-bottom: 20px;" @click="addUser">添加</el-button>
  </div>
  <!-- 抽屉 -->
  <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
  <!-- 表格 -->
  <PublicTables :tableData="userList">
    <template #tableColumns>
      <el-table-column label="编号" width="120px" align="center" type="index" />
      <el-table-column label="账号" align="center" prop="username" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="头像" align="center">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.userPic "
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="角色" align="center" prop="role.roleName" />
    </template>
    <!-- 操作区域 -->
    <template #operate>
      <el-table-column label="编辑" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    </template>
  </PublicTables>
  <!-- 分页 -->
  <PublicPagination :total="total" @paginAtion="fetchData"></PublicPagination>
</template>

<style scoped lang="scss">
</style>