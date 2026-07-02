<template>
  <div class="app-layout">
    <AppHeader />
    <AppNav />

    <main class="page-container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNav from './AppNav.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: transparent;
}

.page-container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 48px;
}
</style>
