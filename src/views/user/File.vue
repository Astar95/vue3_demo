<!-- 文件管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getFileList,deleteFile } from '../../api/file'
import PublicTables from '../../components/PublicTables.vue'
import AddorEditDrawer from '../../components/file/AddorEditDrawer.vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicPagination from '../../components/PublicPagination.vue'

// 获取文件列表
const fileList = ref([])
const getFileListFun = async (page?:any,pageSize?:any) => {
  
  const res = await getFileList(page,pageSize)
  fileList.value = res.data

  total.value=res.total
}
onMounted(()=>{
  getFileListFun()
})
//定义编辑组件ref对象--通过AddorEditRef可以获取组件暴露的实例对象
let AddorEditRef=ref()
// 添加抽屉
const addfile=()=>{
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open({})
}

// 编辑
const handleEdit=(row:any)=>{
  // 打开编辑抽屉时，使用深拷贝克隆表格数据到编辑表单中
  const editForm =JSON.parse(JSON.stringify(row))
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(editForm)
}

// 删除
const handleDelete=(fileId:any)=>{
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await deleteFile(fileId).then(()=>{
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
// 总数
const total=ref(0)
// 接收分页子组件传过来的数据--current-page 改变时触发
const fetchData=(obj:any)=>{
  
  getFileListFun(obj.page,obj.pageSize)
}
</script>

<template>
  <div style="padding: 20px;">
    <!-- 添加按钮 -->
    <div>
      <el-button type="primary" plain style="margin-bottom: 20px;" @click="addfile">添加</el-button>
    </div>
    <!-- 新增编辑抽屉 -->
    <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
    <!-- 表格 -->
    <PublicTables :tableData="fileList">
      <template #tableColumns>
        <el-table-column label="编号" align="center" prop="fileId">
        </el-table-column>
        <el-table-column label="文件名称" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.fileId===1?'danger':''">{{ scope.row.fileName }}</el-tag>
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
            @click="handleDelete(scope.row.fileId)"
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