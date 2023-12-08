<!-- 封装公共的分页 -->
<script setup lang="ts">
import {ref} from 'vue'
// 分页
const totalNum= defineProps({
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
// 通过父组件触发该方法--新增
const handleChange=()=>{
  const count:any=totalNum.total
  // 父组件新增数据成功后，将当前页跳转到最后一页
  const lastPage = Math.ceil((count + 1) / pageSize.value)
  page.value = lastPage
  emit('paginAtion',{page:page.value,pageSize:pageSize.value})
}
// 通过父组件触发该方法--编辑
const handleEdit=()=>{
  emit('paginAtion',{page:page.value,pageSize:pageSize.value})
}
defineExpose({
  handleChange,
  handleEdit,
  handleCurrentChange
})
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