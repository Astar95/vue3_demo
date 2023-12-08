<script setup  lang="ts">
import Header from './layout/Header.vue'
import Aside from './layout/Aside.vue'
import { onMounted } from 'vue'
onMounted(() =>{
  
})
</script>

<template>
  <div class="index">
    <div class="left">
      <h4 style="height: 60px; text-align: center; line-height: 60px;">狗熊岭酒店管理平台</h4>
      <Aside></Aside>
    </div>
    <div class="right">
      <div class="top">
        <Header></Header>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index{
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .left{
    width: 200px;
    height: 100vh;
    background-color: #142334;
    color: white;
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    .top{
      height: 60px;
      color: #fff;
      background-color: #142334;
      display: flex;
      justify-content: flex-end;
      .el-menu{
        border-bottom: none;
      }
    }
    .content{
      flex: 1;
      height: calc(100vh - 60px);
    }
  }
}
</style>