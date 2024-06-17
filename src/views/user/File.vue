<!-- 文件管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getFileList,deleteFile } from '../../api/file'
import PublicTables from '../../components/PublicTables.vue'
import AddorEditDrawer from '../../components/file/AddorEditDrawer.vue'
import { ElMessage,ElMessageBox,ElTable } from 'element-plus'
import PublicPagination from '../../components/PublicPagination.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import type { UploadInstance } from 'element-plus'

// 上传文件
const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}
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
const uploadfile=()=>{
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
  <div >
    <div style="display:flex; flex=1 ">
      <!-- 上传文件按钮 -->
    <el-upload
    ref="uploadRef"
    class="upload-demo"
    action=""
    :auto-upload="false">
      <el-button size="small" type="primary">选择文件</el-button>
      <el-button size="small" class="ml-3" type="success" @click="submitUpload">
      上传文件
      </el-button>
    </el-upload>
    <el-button size="small" type="primary">新建文件夹</el-button>
    <el-button size="small" type="primary">转换</el-button>
    </div>
    
    <!-- 新增编辑抽屉 -->
    <AddorEditDrawer ref="AddorEditRef" @success="onSuccess"></AddorEditDrawer>
    <!-- 表格 -->
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="id" label="ID" width="120" />
    <el-table-column property="name" label="文件名" show-overflow-tooltip />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit( scope.row.id)">
          转换
        </el-button>
        <el-dropdown>
    <span class="el-dropdown-link">更多
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>生成离线包</el-dropdown-item>
        <el-dropdown-item>重新转换</el-dropdown-item>
        <el-dropdown-item>上传新版本3</el-dropdown-item>
        <el-dropdown-item disabled>下载</el-dropdown-item>
        <el-dropdown-item divided>复制</el-dropdown-item>
        <el-dropdown-item divided @click="handleDelete( scope.row.id)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </template>
    </el-table-column>
    <el-table-column property="updatedAt" label="更新时间" width="120"/>
  </el-table>
    <!-- 分页 -->
    <PublicPagination ref="pageRef" :total="total" @paginAtion="fetchData"></PublicPagination>
  </div>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>