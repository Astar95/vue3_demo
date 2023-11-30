<!-- 角色管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getRoleList,roleDelete } from '../../api/role'
import GeneralTables from '../../components/user/GeneralTables.vue'
import AddorEditDrawer from '../../components/user/AddorEditDrawer.vue'
import { ElMessage,ElMessageBox } from 'element-plus'

// 获取角色列表
const roleList = ref([])
const getRoleListFun = async () => {
  const res = await getRoleList(page.value,pageSize.value)
  roleList.value = res.data
  total.value=res.total
}
onMounted(()=>{
  getRoleListFun()
})
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
const handleDelete=(roleId:any)=>{
  ElMessageBox.confirm(
    '确定要删除吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await roleDelete(roleId).then(()=>{
        ElMessage.success('删除成功')
        getRoleListFun()
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
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const onSuccess=()=>{
  getRoleListFun()
}
// 分页
// 当前页数
const page=ref(1)
// 每页显示条目个数
const  pageSize=ref(5)
// 总数
const total=ref(0)
// page-size 改变时触发
const handleSizeChange=(val:any)=>{
  console.log(val,'page-size 改变时触发')
}
// current-page 改变时触发
const handleCurrentChange=(val:any)=>{
  page.value=val
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
      <el-table-column label="编号" align="center" prop="roleId">
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
          @click="handleDelete(scope.row.roleId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    </template>
  </GeneralTables>
  <!-- 分页 -->
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