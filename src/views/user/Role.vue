<!-- 角色管理 -->
<script setup lang="ts">
import { ref } from 'vue';
import { getRoleList } from '../../api/role'
import GeneralTables from '../../components/user/GeneralTables.vue'
import AddorEditDrawer from '../../components/user/AddorEditDrawer.vue'

// 获取角色列表
const roleList = ref([])
const getRoleListFun = async () => {
  const res = await getRoleList()
  
  roleList.value = res.data
  
}
getRoleListFun()


//定义编辑组件ref对象--通过AddorEditRef可以获取组件暴露的实例对象
let AddorEditRef=ref()
// 添加抽屉
const addRole=()=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open({})
}

// 编辑
const handleEdit=(row:any)=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(row)
}

// 删除
const handleDelete=(id:any)=>{
  console.log(id);
}
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const  onSuccess=()=>{
  getRoleListFun()
}
</script>

<template>
  <!-- 添加按钮 -->
  <div>
    <el-button type="primary" plain style="margin-bottom: 20px;" @click="addRole">添加</el-button>
  </div>
  <!-- 新增编辑抽屉 -->
  <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
  <!-- 表格 -->
  <GeneralTables :tableData="roleList">
    <template #tableColumns>
      <el-table-column label="角色" align="center">
      <template #default="scope">
        <el-tag :type="scope.row.roleId===1?'success':'warning'">{{ scope.row.roleId }}</el-tag>
      </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.roleId===1?'danger':''">{{ scope.row.roleName }}</el-tag>
        </template>
      </el-table-column>
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
  </GeneralTables>
</template>

<style scoped lang="scss">
</style>