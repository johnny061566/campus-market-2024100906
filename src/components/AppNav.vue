<template>
  <nav class="app-nav">
    <el-menu :default-active="activePath" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/trades">二手交易</el-menu-item>
      <el-menu-item index="/lostFounds">失物招领</el-menu-item>
      <el-menu-item index="/groupBuys">拼单搭子</el-menu-item>
      <el-menu-item index="/errands">跑腿委托</el-menu-item>
      <el-menu-item index="/message">消息</el-menu-item>
      <el-menu-item index="/user">个人中心</el-menu-item>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activePath = computed(() => route.path)
</script>

<style scoped>
.app-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.app-nav :deep(.el-menu) {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  border-bottom: 0;
  overflow-x: auto;
}

.app-nav :deep(.el-menu-item) {
  white-space: nowrap;
}
</style>
