<template>
  <header class="app-header">
    <div class="header-inner">
      <div>
        <p class="eyebrow">Campus Market</p>
        <h1>校园轻集市</h1>
      </div>

      <div class="header-actions">
        <div class="user-summary">
          <el-avatar :size="36">{{ userStore.displayName.slice(0, 2) }}</el-avatar>
          <div>
            <strong>{{ userStore.displayName }}</strong>
            <span>{{ userStore.userDescription }}</span>
          </div>
        </div>
        <el-button type="primary" @click="goPublish">发布信息</el-button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

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

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-summary {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-summary div {
  display: grid;
  gap: 2px;
}

.user-summary strong {
  color: #111827;
  font-size: 14px;
}

.user-summary span {
  color: #6b7280;
  font-size: 12px;
}

@media (max-width: 640px) {
  .header-inner {
    align-items: flex-start;
    flex-direction: column;
    padding: 16px 0;
  }

  .header-actions {
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
  }
}
</style>
