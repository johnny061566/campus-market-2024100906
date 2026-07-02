<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import FormField from '@/components/FormField.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const submitting = ref(false)

const form = reactive({
  username: '',
  password: '',
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

function validateForm() {
  clearErrors()

  if (!form.username) {
    errors.username = '请输入用户名'
  }

  if (!form.password) {
    errors.password = '请输入密码'
  }

  return Object.keys(errors).length === 0
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    await userStore.login(form.username, form.password)
    ElMessage.success('登录成功')
    await router.push('/user')
  } catch (error) {
    errors.password = error instanceof Error ? error.message : '登录失败'
    ElMessage.error('登录失败，请检查账号密码或 Mock 服务')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card">
      <h2>登录校园轻集市</h2>
      <p class="desc">登录后可以发布信息、收藏内容并进入个人中心。</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <FormField label="用户名" required :error="errors.username">
          <input v-model.trim="form.username" type="text" placeholder="请输入用户名" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <button class="primary" type="submit" :disabled="submitting">
          {{ submitting ? '登录中...' : '登录' }}
        </button>
      </form>

      <p class="switch">
        还没有账号？
        <RouterLink to="/register">去注册</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 210px);
}

.auth-card {
  width: min(420px, 100%);
  padding: 28px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

h2 {
  margin: 0 0 8px;
  color: #111827;
}

.desc {
  margin: 0 0 20px;
  color: #6b7280;
  line-height: 1.6;
}

.auth-form {
  display: grid;
  gap: 16px;
}

input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  color: #111827;
  font-size: 14px;
}

input:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgb(64 158 255 / 14%);
}

.primary {
  min-height: 42px;
  border: none;
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;
  background: #2563eb;
  color: #fff;
  font: inherit;
  font-weight: 700;
}

.primary:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.switch {
  margin: 18px 0 0;
  text-align: center;
  color: #6b7280;
}

.switch a {
  color: #2563eb;
  font-weight: 700;
}
</style>
