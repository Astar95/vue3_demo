<script lang="ts" setup>
import { HomeFilled,ChatLineRound,Message,Avatar } from '@element-plus/icons-vue'
</script>

<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        background-color="#142334"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            首页
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><Message /></el-icon>
            邮箱
            </el-menu-item>
        <el-menu-item index="3">
            <el-icon><ChatLineRound /></el-icon>
            消息
        </el-menu-item>
        <el-sub-menu index="4">
            <template #title>
                <el-icon><Avatar /></el-icon>
                管理员
            </template>
            <el-menu-item index="2-1">个人中心</el-menu-item>
            <el-menu-item index="2-2">修改密码</el-menu-item>
            <el-menu-item index="2-3">退出系统</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style lang="scss" scoped>
</style>