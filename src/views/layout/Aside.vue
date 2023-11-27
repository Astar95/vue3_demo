<script setup lang="ts">
import {User,DishDot,Service,Setting,GobletSquareFull,GobletFull,
  Watch,QuartzWatch,Basketball,Baseball,Folder,FolderOpened} from '@element-plus/icons-vue'
</script>

<template>
    <el-scrollbar>
        <el-menu
        default-active="1-1"
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
          <el-menu-item index="1-1"><el-icon><GobletSquareFull /></el-icon>角色管理</el-menu-item>
          <el-menu-item index="1-2"><el-icon><GobletFull /></el-icon>用户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><DishDot /></el-icon>
            <span>客房管理</span>
          </template>
          <el-menu-item index="2-1"><el-icon><Watch /></el-icon>房型管理</el-menu-item>
          <el-menu-item index="2-2"><el-icon><QuartzWatch /></el-icon>房间管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>客户管理</span>
          </template>
          <el-menu-item index="3-1"><el-icon><Basketball /></el-icon>入住用户</el-menu-item>
          <el-menu-item index="3-2"><el-icon><Baseball /></el-icon>客户订单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template  #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="4-1"><el-icon><Folder /></el-icon>菜单管理</el-menu-item>
          <el-menu-item index="4-2"><el-icon><FolderOpened /></el-icon>字典管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>