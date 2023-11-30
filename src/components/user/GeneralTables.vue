<!-- 封装表格多用 -->
<script setup lang="ts">
// 父传子
defineProps({
    tableData:Array
})

</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="200px"  align="center"></el-table-column>
    <slot name="tableColumns"></slot>
    <!-- 操作区域 -->
    <slot name="operate"></slot>

  </el-table>
</template>

<style scoped lang="scss">
</style>