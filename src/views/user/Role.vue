<!-- 角色管理 -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getRoleList,roleDelete } from '../../api/role'
import PublicTables from '../../components/PublicTables.vue'
import AddorEditDrawer from '../../components/user/AddorEditDrawer.vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import PublicPagination from '../../components/PublicPagination.vue'

// 获取角色列表
const roleList = ref([])
const getRoleListFun = async (page?:any,pageSize?:any) => {
  const res = await getRoleList(page,pageSize)
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
// 总数
const total=ref(0)
// 接收分页子组件传过来的数据--current-page 改变时触发
const fetchData=(obj:any)=>{
  getRoleListFun(obj.page,obj.pageSize)
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
  <PublicTables :tableData="roleList">
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
  </PublicTables>
  <!-- 分页 -->
  <PublicPagination :total="total" @paginAtion="fetchData"></PublicPagination>
</template>

<style scoped lang="scss">
</style>