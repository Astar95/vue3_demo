<script lang="ts" setup>
import { HomeFilled,ChatLineRound,Message,Avatar } from '@element-plus/icons-vue'
</script>

<template>
    <el-menu
        router
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        background-color="#142334"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="/index/home">
            <el-icon><HomeFilled /></el-icon>
            首页
        </el-menu-item>
        <el-menu-item index="/index/mail">
            <el-icon><Message /></el-icon>
            邮箱
            </el-menu-item>
        <el-menu-item index="/index/message">
            <el-icon><ChatLineRound /></el-icon>
            消息
        </el-menu-item>
        <el-sub-menu index="admin">
            <template #title>
                <el-icon><Avatar /></el-icon>
                管理员
            </template>
            <el-menu-item index="/index/mine">个人中心</el-menu-item>
            <el-menu-item index="/index/setPwd">修改密码</el-menu-item>
            <el-menu-item index="eitd">退出系统</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style lang="scss" scoped>
</style>