<script setup lang="ts"></script>

<template>
  <main class="app">
    <h1>校园轻集市</h1>
    <p>AI 辅助前端工程实践种子项目</p>

    <nav class="nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/list">列表</router-link>
      <router-link to="/publish">发布</router-link>
      <router-link to="/message">消息</router-link>
      <router-link to="/profile">我的</router-link>
    </nav>

    <router-view />
  </main>
</template>

<style scoped>
.app {
  padding: 32px;
}

.nav {
  display: flex;
  gap: 16px;
  margin: 24px 0;
}
</style>
