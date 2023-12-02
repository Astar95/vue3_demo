<!-- 用户管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import {getUserList,delUser}  from  '../../api/user'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicTables from '../../components/PublicTables.vue';
// 用户信息列表
const userList = ref([])

//获取用户信息列表
const getUserData=async(page?:number,pageSize?:number)=>{
  const  res=await getUserList(page,pageSize)
  userList.value=res.data
}
onMounted(()=>{
  getUserData()
})
//编辑
const handleEdit=(row:any)=>{
  console.log(row);
  
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
</script>

<template>
  <PublicTables :tableData="userList">
    <template #tableColumns>
      <el-table-column label="编号" width="120px" align="center" type="index" />
      <el-table-column label="账号" align="center" prop="username" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="头像" align="center" prop="userPic" />
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
</template>

<style scoped>
</style>