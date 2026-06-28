<script setup lang="ts">
type TagType = 'primary' | 'success' | 'warning' | 'danger'

const stats: Array<{
  label: string
  value: string
  type: TagType
}> = [
  {
    label: '商品总数',
    value: '128',
    type: 'primary',
  },
  {
    label: '今日新增',
    value: '36',
    type: 'success',
  },
  {
    label: '待处理消息',
    value: '18',
    type: 'warning',
  },
  {
    label: '交易完成率',
    value: '92%',
    type: 'danger',
  },
]
</script>

<template>
  <div class="page">
    <div class="page-title">
      <h1>看板页</h1>
      <p>校园轻集市运行概览</p>
    </div>

    <el-row :gutter="16">
      <el-col
        v-for="stat in stats"
        :key="stat.label"
        :xs="24"
        :sm="12"
        :md="6"
      >
        <el-card class="stat-card" shadow="hover">
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
          <el-tag :type="stat.type" effect="light">静态统计</el-tag>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.page-title {
  margin-bottom: 20px;
}

.page-title h1 {
  margin: 0;
  color: #1f2937;
}

.page-title p {
  margin: 8px 0 0;
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
  color: #1f2937;
  font-size: 30px;
}
</style>
