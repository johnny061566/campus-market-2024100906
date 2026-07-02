<template>
  <nav class="app-nav">
    <el-menu :default-active="activePath" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/trades">二手交易</el-menu-item>
      <el-menu-item index="/lostFounds">失物招领</el-menu-item>
      <el-menu-item index="/groupBuys">拼单搭子</el-menu-item>
      <el-menu-item index="/errands">跑腿委托</el-menu-item>
      <el-menu-item index="/message">消息</el-menu-item>
      <el-menu-item index="/user">
        个人中心
        <el-badge v-if="favoriteStore.count > 0" :value="favoriteStore.count" class="favorite-badge" />
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useFavoriteStore } from '@/stores/favorite'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const activePath = computed(() => route.path)
</script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 86%);
  border-bottom: 1px solid rgb(223 230 239 / 80%);
  box-shadow: 0 8px 20px rgb(37 55 99 / 6%);
  backdrop-filter: blur(14px);
}

.app-nav :deep(.el-menu) {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  background: transparent;
  border-bottom: 0;
  overflow-x: auto;
}

.app-nav :deep(.el-menu-item) {
  color: #475569;
  font-weight: 700;
  white-space: nowrap;
}

.app-nav :deep(.el-menu-item.is-active) {
  color: #0f766e;
  border-bottom-color: #10b981;
}

.app-nav :deep(.el-menu-item:hover) {
  color: #ea580c;
  background: rgb(249 115 22 / 8%);
}

.favorite-badge {
  margin-left: 6px;
}
</style>
