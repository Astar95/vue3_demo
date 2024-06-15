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
              文件管理
          </template>
          <el-menu-item index="/index/role"><el-icon><GobletSquareFull /></el-icon>全部文件夹</el-menu-item>
          <el-menu-item index="/index/user"><el-icon><GobletFull /></el-icon>默认文件夹</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><DishDot /></el-icon>
            <span>模型集成</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>图模对比</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>场景发布</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>离线数据包</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template  #title>
            <el-icon><Service /></el-icon>
            <span>我的分享</span>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>