<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore, type FavoriteItem } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const groups = ref<GroupBuyItem[]>([])
const loading = ref(false)
const errorMessage = ref('')
const keyword = ref('')
const fallbackGroupImage = '/images/group-campus.svg'

const filteredGroups = computed(() => {
  const text = keyword.value.trim().toLowerCase()

  if (!text) {
    return groups.value
  }

  return groups.value.filter((group) =>
    [group.title, group.type, group.location, group.description, group.publisher].some((field) =>
      field.toLowerCase().includes(text),
    ),
  )
})

function progress(group: GroupBuyItem) {
  return Math.min(100, Math.round((group.currentCount / group.targetCount) * 100))
}

async function loadGroupBuys() {
  loading.value = true
  errorMessage.value = ''

  try {
    groups.value = await getGroupBuys()
  } catch {
    errorMessage.value = '拼单搭子数据加载失败，请确认 Mock 服务已启动。'
  } finally {
    loading.value = false
  }
}

function toFavorite(group: GroupBuyItem): FavoriteItem {
  return {
    id: group.id,
    type: 'groupBuy',
    title: group.title,
    description: group.description,
    tag: group.type,
    location: group.location,
  }
}

function toggleFavorite(group: GroupBuyItem) {
  favoriteStore.toggleFavorite(toFavorite(group))
}

function handleEmptyAction() {
  if (groups.value.length === 0) {
    loadGroupBuys()
    return
  }

  keyword.value = ''
}

onMounted(loadGroupBuys)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>拼单搭子</h2>
      <p>展示拼单、搭子和组队信息，让同学快速找到一起行动的人。</p>
    </div>

    <SearchBar v-model="keyword" placeholder="搜索标题、类型、地点或描述" />

    <div class="list-area">
      <LoadingState v-if="loading" text="正在加载拼单搭子信息..." />

      <ErrorState
        v-else-if="errorMessage"
        title="拼单搭子数据加载失败"
        :description="errorMessage"
        action-text="重新加载"
        @action="loadGroupBuys"
      />

      <EmptyState
        v-else-if="filteredGroups.length === 0"
        :description="groups.length === 0 ? '暂无拼单搭子信息' : '没有找到匹配的拼单搭子信息'"
        :action-text="groups.length === 0 ? '重新加载' : '清空搜索'"
        @action="handleEmptyAction"
      />

      <el-row v-else :gutter="16">
        <el-col v-for="group in filteredGroups" :key="group.id" :xs="24" :md="8">
          <ItemCard
            class="group-card"
            :title="group.title"
            :description="group.description"
            :image="group.image || fallbackGroupImage"
            :tag="group.type"
            tag-type="primary"
            :meta="[
              { label: '地点', value: group.location },
              { label: '截止', value: group.deadline },
              { label: '发布人', value: group.publisher },
            ]"
          >
            <template #footer>
              <div class="progress-line">
                <el-progress :percentage="progress(group)" />
                <span>{{ group.currentCount }}/{{ group.targetCount }} 人已加入</span>
              </div>
              <el-button size="small" @click="toggleFavorite(group)">
                {{ favoriteStore.isFavorite('groupBuy', group.id) ? '已收藏' : '收藏' }}
              </el-button>
            </template>
          </ItemCard>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<style scoped>
.list-area {
  margin-top: 16px;
  min-height: 260px;
}

.group-card {
  margin-bottom: 16px;
}

.progress-line {
  min-width: 180px;
  flex: 1;
}

.progress-line span {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}
</style>
