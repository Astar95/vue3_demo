<script setup lang="ts">
import {User,DishDot,Service,GobletSquareFull,GobletFull,
  Watch,QuartzWatch,Basketball} from '@element-plus/icons-vue'
</script>

<template>
    <el-scrollbar>
        <el-menu
        router
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#142334"
        class="el-menu-vertical-demo"
        text-color="#fff"
        style="border-right: none;"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
              账户管理
          </template>
          <el-menu-item index="/index/role"><el-icon><GobletSquareFull /></el-icon>角色管理</el-menu-item>
          <el-menu-item index="/index/user"><el-icon><GobletFull /></el-icon>用户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><DishDot /></el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="/index/roomType"><el-icon><Watch /></el-icon>房型管理</el-menu-item>
          <el-menu-item index="/index/room"><el-icon><QuartzWatch /></el-icon>房间管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>客户管理</span>
          </template>
          <el-menu-item index="/index/liveIn"><el-icon><Basketball /></el-icon>入住用户</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>