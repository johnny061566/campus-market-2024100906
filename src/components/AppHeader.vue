<template>
  <header class="app-header">
    <div class="header-inner">
      <div>
        <p class="eyebrow">Campus Market</p>
        <h1>校园轻集市</h1>
      </div>

      <el-button type="primary" @click="goPublish">发布信息</el-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goPublish() {
  router.push('/publish')
}
</script>

<style scoped>
.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1120px, calc(100% - 32px));
  min-height: 88px;
  margin: 0 auto;
  gap: 16px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #409eff;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #1f2937;
  font-size: 28px;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .header-inner {
    align-items: flex-start;
    flex-direction: column;
    padding: 16px 0;
  }
}
</style>
