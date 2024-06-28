<!-- 个人中心 -->
<script setup lang="ts">
import {getFileList,deleteFile,uploadFile} from '../api/file'
import {ref,onMounted} from 'vue'
import { baseURL_dev } from '../config/baseURL';
import type {  UploadFile } from 'element-plus'

// 文件列表
const fileList = ref<UploadFile[]>([])

// 加载文件列表
const loadFileList = async ()=>{
  fileList.value = await getFileList()
  console.log(fileList.value)
}
// 下载方法
const handleDownload = (id:object)=>{
  console.log(id)
}
// 删除方法
const handleDelete = (id:object)=>{
  deleteFile(id).then(()=>{
    loadFileList()
  })
}

// 上传前方法
const beforeUpload = ()=>{
  return true
}
// 上传方法
const uploadRequest = async(options:any) => {
  let file = options.file
  // 提交数据
  let submitData = new FormData()
  // 附加数据
  submitData.append('file', file)
  // 上传数据
  await uploadFile( submitData).then((res:any)=>{
    console.log(res)
  })
}
onMounted(()=>{
  loadFileList()
})
</script>

<template>
  <div class="fileList">
    <div>
      <el-upload 
      :file-list="fileList"
      class="upload-demo"
      :show-file-list="false"
      :action="baseURL_dev+'upload'" 
      :before-upload="beforeUpload"
      :http-request="uploadRequest"
      multiple
      >
        <el-button size="small" type="primary">上传文件</el-button>
      </el-upload>
    </div>
    <el-table :data="fileList" style="width: 100%" size="small">
      <el-table-column prop="id" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="文件名" width="200"></el-table-column>
      <el-table-column prop="createAt" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="200"></el-table-column>
      <el-table-column prop="comment" label="备注" width="200"></el-table-column>
      <el-table-column prop="size" label="大小" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button size="small" @click="handleDownload(scope.row.id)">下载</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style scoped lang="scss">
.fileList {
  margin-top: 20px;
}
</style>