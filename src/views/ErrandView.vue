<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getErrands, type ErrandItem } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore, type FavoriteItem } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const tasks = ref<ErrandItem[]>([])
const loading = ref(false)
const errorMessage = ref('')
const keyword = ref('')
const fallbackTaskImage = '/images/errand-package.svg'

const statusText: Record<ErrandItem['status'], string> = {
  open: '待接单',
  closed: '已关闭',
  done: '已完成',
}

const filteredTasks = computed(() => {
  const text = keyword.value.trim().toLowerCase()

  if (!text) {
    return tasks.value
  }

  return tasks.value.filter((task) =>
    [
      task.title,
      task.taskType,
      task.pickupLocation,
      task.deliveryLocation,
      task.description,
      task.publisher,
      statusText[task.status],
    ].some((field) => field.toLowerCase().includes(text)),
  )
})

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

function toFavorite(task: ErrandItem): FavoriteItem {
  return {
    id: task.id,
    type: 'errand',
    title: task.title,
    description: task.description,
    tag: task.taskType,
    location: `${task.pickupLocation} -> ${task.deliveryLocation}`,
  }
}

function toggleFavorite(task: ErrandItem) {
  favoriteStore.toggleFavorite(toFavorite(task))
}

function handleEmptyAction() {
  if (tasks.value.length === 0) {
    loadErrands()
    return
  }

  keyword.value = ''
}

onMounted(loadErrands)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>跑腿委托</h2>
      <p>展示校园跑腿任务和临时委托，让需求与顺路同学快速匹配。</p>
    </div>

    <SearchBar v-model="keyword" placeholder="搜索标题、任务类型、取件地点或送达地点" />

    <el-card class="section-card timeline-card" shadow="never">
      <LoadingState v-if="loading" text="正在加载跑腿委托信息..." />

      <ErrorState
        v-else-if="errorMessage"
        title="跑腿委托数据加载失败"
        :description="errorMessage"
        action-text="重新加载"
        @action="loadErrands"
      />

      <EmptyState
        v-else-if="filteredTasks.length === 0"
        :description="tasks.length === 0 ? '暂无跑腿委托信息' : '没有找到匹配的跑腿委托信息'"
        :action-text="tasks.length === 0 ? '重新加载' : '清空搜索'"
        @action="handleEmptyAction"
      />

      <el-timeline v-else>
        <el-timeline-item
          v-for="task in filteredTasks"
          :key="task.id"
          :timestamp="`${task.pickupLocation} -> ${task.deliveryLocation}`"
          placement="top"
        >
          <div class="task-card">
            <img
              class="task-image"
              :src="task.image || fallbackTaskImage"
              :alt="task.title"
              loading="lazy"
            />
            <div class="task-content">
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
                <el-button size="small" @click="toggleFavorite(task)">
                  {{ favoriteStore.isFavorite('errand', task.id) ? '已收藏' : '收藏' }}
                </el-button>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </section>
</template>

<style scoped>
.timeline-card {
  margin-top: 16px;
  min-height: 280px;
}

.task-card {
  display: grid;
  grid-template-columns: 148px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.task-image {
  width: 148px;
  height: 104px;
  border-radius: 8px;
  object-fit: cover;
  background: #eef2f7;
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

@media (max-width: 640px) {
  .task-card {
    grid-template-columns: 1fr;
  }

  .task-image {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
}
</style>
