<script setup lang="ts">
const stats = [
  {
    label: '我的发布',
    value: '8',
  },
  {
    label: '我的收藏',
    value: '12',
  },
  {
    label: '待处理消息',
    value: '3',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>个人中心</h2>
      <p>展示用户资料、我的发布、收藏和消息处理入口。</p>
    </div>

    <el-card class="section-card profile-card" shadow="never">
      <el-avatar :size="64">同学</el-avatar>
      <div>
        <h3>校园用户</h3>
        <p>计算机学院 · 2026 届</p>
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col v-for="stat in stats" :key="stat.label" :xs="24" :sm="8">
        <el-card class="section-card stat-card" shadow="hover">
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.profile-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  gap: 16px;
}

h3 {
  margin: 0 0 6px;
}

p {
  margin: 0;
  color: #6b7280;
}

.stat-card {
  margin-bottom: 16px;
}

.stat-card :deep(.el-card__body) {
  display: grid;
  gap: 10px;
}

.stat-card span {
  color: #6b7280;
}

.stat-card strong {
  font-size: 30px;
}
</style>
