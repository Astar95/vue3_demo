<script setup lang="ts">
import {Files,Folder,FolderOpened,Cpu,DocumentCopy,
  CreditCard,FirstAidKit,Share} from '@element-plus/icons-vue'
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
            <el-icon><Files /></el-icon>
              文件管理
          </template>
          <el-menu-item index="/index/file"><el-icon><Folder /></el-icon>全部文件夹</el-menu-item>
          <el-menu-item index="/index/file"><el-icon><FolderOpened /></el-icon>默认文件夹</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Cpu /></el-icon>
            <span>模型集成</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template  #title>
            <el-icon><DocumentCopy /></el-icon>
            <span>图模对比</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template  #title>
            <el-icon><CreditCard /></el-icon>
            <span>场景发布</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template  #title>
            <el-icon><FirstAidKit /></el-icon>
            <span>离线数据包</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template  #title>
            <el-icon><Share /></el-icon>
            <span>我的分享</span>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>