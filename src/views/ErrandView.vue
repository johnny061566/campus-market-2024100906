<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getErrands, type ErrandItem } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'

const tasks = ref<ErrandItem[]>([])
const loading = ref(false)
const errorMessage = ref('')

const statusText: Record<ErrandItem['status'], string> = {
  open: '待接单',
  closed: '已关闭',
  done: '已完成',
}

async function loadErrands() {
  loading.value = true
  errorMessage.value = ''

  try {
    tasks.value = await getErrands()
  } catch {
    errorMessage.value = '跑腿委托数据加载失败，请确认 Mock 服务已启动。'
  } finally {
    loading.value = false
  }
}

onMounted(loadErrands)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>跑腿委托</h2>
      <p>展示校园跑腿任务和临时委托，让需求与顺路同学快速匹配。</p>
    </div>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />

    <el-card v-loading="loading" class="section-card timeline-card" shadow="never">
      <EmptyState
        v-if="!loading && tasks.length === 0"
        description="暂无跑腿委托信息"
        action-text="重新加载"
        @action="loadErrands"
      />

      <el-timeline v-else>
        <el-timeline-item
          v-for="task in tasks"
          :key="task.id"
          :timestamp="`${task.pickupLocation} -> ${task.deliveryLocation}`"
          placement="top"
        >
          <div class="task-title">
            <h3>{{ task.title }}</h3>
            <el-tag type="warning">{{ task.taskType }}</el-tag>
          </div>
          <p>{{ task.description }}</p>
          <div class="task-meta">
            <strong>酬谢：{{ task.reward }} 元</strong>
            <span>截止：{{ task.deadline }}</span>
            <span>状态：{{ statusText[task.status] }}</span>
            <span>发布人：{{ task.publisher }}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </section>
</template>

<style scoped>
.timeline-card {
  min-height: 280px;
}

.task-title {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

p {
  margin: 0 0 10px;
  color: #6b7280;
  line-height: 1.6;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

strong {
  color: #f56c6c;
  font-weight: 700;
}

span {
  color: #6b7280;
}
</style>
