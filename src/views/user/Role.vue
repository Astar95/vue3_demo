<!-- 角色管理 -->
<script setup lang="ts">
import { ref } from 'vue';
import { getRoleList } from '../../api/role'
import GeneralTables from '../../components/user/GeneralTables.vue'
// 获取角色列表
const roleList = ref([])
const getRoleListFun = async () => {
  const res = await getRoleList()
  
  roleList.value = res.data
  
}
getRoleListFun()

</script>

<template>
  <!-- 添加按钮 -->
  <div>
    <el-button type="primary" plain style="margin-bottom: 20px;">添加</el-button>
  </div>
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
  </GeneralTables>
</template>

<style scoped lang="scss">
</style>