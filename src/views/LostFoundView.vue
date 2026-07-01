<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore, type FavoriteItem } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const notices = ref<LostFoundItem[]>([])
const loading = ref(false)
const errorMessage = ref('')

const typeText: Record<LostFoundItem['type'], string> = {
  lost: '寻物',
  found: '招领',
}

const statusText: Record<LostFoundItem['status'], string> = {
  open: '处理中',
  closed: '已关闭',
  done: '已找回',
}

async function loadLostFounds() {
  loading.value = true
  errorMessage.value = ''

  try {
    notices.value = await getLostFounds()
  } catch {
    errorMessage.value = '失物招领数据加载失败，请确认 Mock 服务已启动。'
  } finally {
    loading.value = false
  }
}

function toFavorite(notice: LostFoundItem): FavoriteItem {
  return {
    id: notice.id,
    type: 'lostFound',
    title: notice.title,
    description: notice.description,
    tag: typeText[notice.type],
    location: notice.location,
  }
}

function toggleFavorite(notice: LostFoundItem) {
  favoriteStore.toggleFavorite(toFavorite(notice))
}

onMounted(loadLostFounds)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>失物招领</h2>
      <p>集中展示校园失物和招领信息，帮助物品尽快回到主人手里。</p>
    </div>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />

    <el-card v-loading="loading" class="section-card table-card" shadow="never">
      <EmptyState
        v-if="!loading && notices.length === 0"
        description="暂无失物招领信息"
        action-text="重新加载"
        @action="loadLostFounds"
      />

      <el-table v-else :data="notices" style="width: 100%">
        <el-table-column label="类型" width="90">
          <template #default="{ row }: { row: LostFoundItem }">
            <el-tag :type="row.type === 'lost' ? 'warning' : 'success'">
              {{ typeText[row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="180" />
        <el-table-column prop="itemName" label="物品" width="120" />
        <el-table-column prop="location" label="地点" min-width="160" />
        <el-table-column prop="time" label="时间" width="160" />
        <el-table-column prop="contact" label="联系人" min-width="150" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }: { row: LostFoundItem }">
            {{ statusText[row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="收藏" width="100" fixed="right">
          <template #default="{ row }: { row: LostFoundItem }">
            <el-button size="small" @click="toggleFavorite(row)">
              {{ favoriteStore.isFavorite('lostFound', row.id) ? '已收藏' : '收藏' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<style scoped>
.table-card {
  min-height: 280px;
}
</style>
