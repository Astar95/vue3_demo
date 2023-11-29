<!-- 角色管理 -->
<script setup lang="ts">
import { ref } from 'vue';
import { getRoleList } from '../../api/role'
// 获取角色列表
const roleList = ref<any>([])
const getRoleListFun = async () => {
  const res = await getRoleList()
  
  roleList.value = res.data
  
}
getRoleListFun()

// 编辑
const handleEdit=(index:any,row:any)=>{
  console.log(index,row);
  
}

// 删除
const handleDelete=(index:any,row:any)=>{
  console.log(index,row);
}
</script>

<template>
  <el-table :data="roleList" style="width: 100%">
    <el-table-column prop="roleId" label="角色" width="180"></el-table-column>
    <el-table-column label="角色名称" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #reference>
            <el-tag>{{ scope.row.roleName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="编辑">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
</style>