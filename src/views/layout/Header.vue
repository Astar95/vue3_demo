<script lang="ts" setup>
import { HomeFilled,Avatar } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import  {userStore}  from '../../store'
import router from '../../router'
const useStore=userStore()
const exit=()=>{
    ElMessageBox.confirm(
    '确定要退出登录吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
      // 退出成功清空缓存
      useStore.removeSessionid()
      useStore.removeUser()
      // 跳转到登录页面
      router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}
</script>

<template>
    <el-menu
        router
        class="el-menu-demo"
        mode="horizontal"
        :default-active="$route.path"
        :ellipsis="false"
        background-color="#142334"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="/index">
            <el-icon><HomeFilled /></el-icon>
            智能客服
        </el-menu-item>
        <el-menu-item index="/index">
            <el-icon><HomeFilled /></el-icon>
            项目管理
        </el-menu-item>
        <el-menu-item index="/index">
            <el-icon><HomeFilled /></el-icon>
            账户管理
        </el-menu-item>
        <el-sub-menu index="admin">
            <template #title>
                <el-icon><Avatar /></el-icon>
                {{ useStore.userData.name }}
            </template>
            <el-menu-item index="/index/mine">个人中心</el-menu-item>
            <el-menu-item index="/index/setPwd">修改密码</el-menu-item>
            <el-menu-item index="" @click="exit">退出系统</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style lang="scss" scoped>
</style>