<!-- 封装表格多用 -->
<script setup lang="ts">
// 父传子
defineProps({
    tableData:Array
})

// 编辑
const handleEdit=(row:any)=>{
  console.log(row);
  
}

// 删除
const handleDelete=(id:any)=>{
  console.log(id);
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="200px"  align="center"></el-table-column>
    <slot name="tableColumns"></slot>
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
  </el-table>
</template>

<style scoped lang="scss">
</style>