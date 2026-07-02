<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { createUser, getUsers } from '@/api/user'
import FormField from '@/components/FormField.vue'

const router = useRouter()
const submitting = ref(false)

const form = reactive({
  username: '',
  password: '',
  name: '',
  college: '',
  grade: '',
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
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于 6 位'
  }

  if (!form.name) {
    errors.name = '请输入姓名'
  }

  if (!form.college) {
    errors.college = '请输入学院'
  }

  if (!form.grade) {
    errors.grade = '请输入年级'
  }

  return Object.keys(errors).length === 0
}

async function handleRegister() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    const users = await getUsers()
    const exists = users.some((user) => user.username === form.username)

    if (exists) {
      errors.username = '用户名已存在'
      return
    }

    await createUser({
      username: form.username,
      password: form.password,
      name: form.name,
      college: form.college,
      grade: form.grade,
      avatar: '',
      bio: '这个同学还没有填写个人简介。',
    })

    ElMessage.success('注册成功，请登录')
    await router.push('/login')
  } catch {
    ElMessage.error('注册失败，请检查 Mock 服务是否正常运行')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card">
      <h2>注册校园轻集市账号</h2>
      <p class="desc">创建账号后，可以发布信息、收藏内容并进入个人中心。</p>

      <form class="auth-form" @submit.prevent="handleRegister">
        <FormField label="用户名" required :error="errors.username">
          <input v-model.trim="form.username" type="text" placeholder="请输入用户名" />
        </FormField>

        <FormField label="密码" required :error="errors.password">
          <input v-model.trim="form.password" type="password" placeholder="请输入密码" />
        </FormField>

        <FormField label="姓名" required :error="errors.name">
          <input v-model.trim="form.name" type="text" placeholder="请输入显示名称" />
        </FormField>

        <FormField label="学院" required :error="errors.college">
          <input v-model.trim="form.college" type="text" placeholder="例如：计算机学院" />
        </FormField>

        <FormField label="年级" required :error="errors.grade">
          <input v-model.trim="form.grade" type="text" placeholder="例如：2023级" />
        </FormField>

        <button class="primary" type="submit" :disabled="submitting">
          {{ submitting ? '注册中...' : '注册' }}
        </button>
      </form>

      <p class="switch">
        已有账号？
        <RouterLink to="/login">去登录</RouterLink>
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
  width: min(440px, 100%);
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
