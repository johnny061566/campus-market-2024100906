<template>
  <header class="app-header">
    <div class="header-inner">
      <div>
        <p class="eyebrow">Campus Market</p>
        <h1>校园轻集市</h1>
      </div>

      <div class="header-actions">
        <div v-if="userStore.isLoggedIn" class="user-summary">
          <el-avatar :size="36" :src="userStore.currentUser?.avatar">
            {{ userStore.displayName.slice(0, 2) }}
          </el-avatar>
          <div>
            <strong>{{ userStore.displayName }}</strong>
            <span>{{ userStore.userDescription }}</span>
          </div>
          <el-button text @click="handleLogout">退出</el-button>
        </div>

        <div v-else class="auth-actions">
          <el-button @click="goLogin">登录</el-button>
          <el-button type="primary" plain @click="goRegister">注册</el-button>
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

function goLogin() {
  router.push('/login')
}

function goRegister() {
  router.push('/register')
}

function handleLogout() {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-header {
  color: #ffffff;
  background:
    linear-gradient(135deg, rgb(23 32 51 / 96%), rgb(37 99 235 / 86%)),
    linear-gradient(90deg, #10b981, #f97316);
  border-bottom: 1px solid rgb(255 255 255 / 18%);
  box-shadow: 0 18px 40px rgb(23 32 51 / 18%);
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
  color: #fde68a;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 0;
  color: #ffffff;
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
  padding: 8px 10px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 8px;
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(10px);
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.auth-actions :deep(.el-button),
.user-summary :deep(.el-button) {
  color: #ffffff;
}

.auth-actions :deep(.el-button:not(.el-button--primary)) {
  border-color: rgb(255 255 255 / 45%);
  background: rgb(255 255 255 / 12%);
}

.auth-actions :deep(.el-button--primary.is-plain) {
  color: #1f3a2f;
  border-color: #fde68a;
  background: #fde68a;
}

.header-actions > :deep(.el-button--primary) {
  border-color: #f97316;
  background: #f97316;
}

.user-summary div {
  display: grid;
  gap: 2px;
}

.user-summary strong {
  color: #ffffff;
  font-size: 14px;
}

.user-summary span {
  color: rgb(255 255 255 / 75%);
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
