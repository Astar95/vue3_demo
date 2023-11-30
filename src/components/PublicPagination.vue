<!-- 封装公共的分页 -->
<script setup lang="ts">
import {ref} from 'vue'
// 分页
defineProps({
    total:Number
})
// 当前页数
const page=ref(1)
// 每页显示条目个数
const pageSize=ref(5)
// page-size 改变时触发
const handleSizeChange=(val:any)=>{
  console.log(val,'page-size 改变时触发')
}
const emit=defineEmits(['paginAtion'])
// current-page 改变时触发
const handleCurrentChange=(val:any)=>{
  page.value=val
  emit('paginAtion',{page:page.value,pageSize:pageSize.value})
}
</script>

<template>
    <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        background
        layout="total,prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
  </div>
</template>

<style scoped lang="scss">
</style>