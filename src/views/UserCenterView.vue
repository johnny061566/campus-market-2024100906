<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { getErrands, type ErrandItem } from '@/api/errand'
import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import { getLostFounds, type LostFoundItem } from '@/api/lostFound'
import { getTrades, type TradeItem } from '@/api/trade'
import {
  favoriteRouteMap,
  favoriteTypeText,
  useFavoriteStore,
  type FavoriteItem,
} from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

interface MyPublishItem {
  id: number
  type: keyof typeof favoriteTypeText
  title: string
  description: string
  tag: string
  location: string
  time: string
}

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const user = computed(() => userStore.currentUser)
const myPublishes = ref<MyPublishItem[]>([])
const publishLoading = ref(false)

const stats = computed(() => [
  {
    label: '登录状态',
    value: userStore.isLoggedIn ? '已登录' : '未登录',
  },
  {
    label: '我的发布',
    value: myPublishes.value.length,
  },
  {
    label: '我的收藏',
    value: favoriteStore.count,
  },
])

function removeFavorite(item: FavoriteItem) {
  favoriteStore.removeFavorite(item.type, item.id)
}

function isCurrentPublisher(value: string) {
  return value.trim() === userStore.displayName
}

function fromTrade(item: TradeItem): MyPublishItem {
  return {
    id: item.id,
    type: 'trade',
    title: item.title,
    description: item.description,
    tag: item.category,
    location: item.location,
    time: item.publishedAt,
  }
}

function fromLostFound(item: LostFoundItem): MyPublishItem {
  return {
    id: item.id,
    type: 'lostFound',
    title: item.title,
    description: item.description,
    tag: item.type === 'lost' ? '寻物' : '招领',
    location: item.location,
    time: item.time,
  }
}

function fromGroupBuy(item: GroupBuyItem): MyPublishItem {
  return {
    id: item.id,
    type: 'groupBuy',
    title: item.title,
    description: item.description,
    tag: item.type,
    location: item.location,
    time: item.deadline,
  }
}

function fromErrand(item: ErrandItem): MyPublishItem {
  return {
    id: item.id,
    type: 'errand',
    title: item.title,
    description: item.description,
    tag: item.taskType,
    location: `${item.pickupLocation} -> ${item.deliveryLocation}`,
    time: item.deadline,
  }
}

async function loadMyPublishes() {
  publishLoading.value = true

  try {
    const [trades, lostFounds, groupBuys, errands] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])

    myPublishes.value = [
      ...trades.filter((item) => isCurrentPublisher(item.publisher)).map(fromTrade),
      ...lostFounds.filter((item) => isCurrentPublisher(item.contact)).map(fromLostFound),
      ...groupBuys.filter((item) => isCurrentPublisher(item.publisher)).map(fromGroupBuy),
      ...errands.filter((item) => isCurrentPublisher(item.publisher)).map(fromErrand),
    ]
  } catch {
    ElMessage.error('我的发布加载失败，请确认 Mock 服务已启动')
  } finally {
    publishLoading.value = false
  }
}

onMounted(loadMyPublishes)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>个人中心</h2>
      <p>展示用户资料、我的发布、收藏和消息处理入口。</p>
    </div>

    <el-card class="section-card profile-card" shadow="never">
      <el-avatar :size="64" :src="user.avatar">{{ userStore.displayName.slice(0, 2) }}</el-avatar>
      <div>
        <h3>{{ userStore.displayName }}</h3>
        <p>{{ userStore.userDescription }}</p>
        <p>{{ user.bio }}</p>
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

    <el-row :gutter="16">
      <el-col :xs="24" :md="12">
        <el-card class="section-card list-card" shadow="never">
          <template #header>
            <h3>我的发布</h3>
          </template>

          <div v-loading="publishLoading" class="publish-panel">
            <el-empty v-if="!publishLoading && myPublishes.length === 0" description="暂无发布" />

            <div v-else class="publish-list">
              <article v-for="item in myPublishes" :key="`${item.type}-${item.id}`">
                <div>
                  <el-tag size="small">{{ favoriteTypeText[item.type] }}</el-tag>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                  <span>{{ item.tag }} · {{ item.location }} · {{ item.time }}</span>
                </div>
                <router-link :to="favoriteRouteMap[item.type]">查看</router-link>
              </article>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="12">
        <el-card class="section-card list-card" shadow="never">
          <template #header>
            <h3>我的收藏</h3>
          </template>

          <el-empty v-if="favoriteStore.favorites.length === 0" description="暂无收藏" />

          <div v-else class="favorite-list">
            <article v-for="item in favoriteStore.favorites" :key="`${item.type}-${item.id}`">
              <div>
                <el-tag size="small">{{ favoriteTypeText[item.type] }}</el-tag>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <span>{{ item.tag }} · {{ item.location }}</span>
              </div>
              <div class="favorite-actions">
                <router-link :to="favoriteRouteMap[item.type]">查看</router-link>
                <el-button size="small" text @click="removeFavorite(item)">取消收藏</el-button>
              </div>
            </article>
          </div>
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

h4 {
  margin: 8px 0 6px;
  color: #111827;
  font-size: 16px;
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

.list-card {
  min-height: 320px;
  margin-bottom: 16px;
}

.list-card :deep(.el-card__header) h3 {
  margin: 0;
}

.publish-panel {
  min-height: 220px;
}

.favorite-list,
.publish-list {
  display: grid;
  gap: 12px;
}

.favorite-list article,
.publish-list article {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.favorite-list span,
.publish-list span {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 13px;
}

.publish-list a {
  color: #409eff;
  font-weight: 700;
  line-height: 24px;
}

.favorite-actions {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.favorite-actions a {
  color: #409eff;
  font-weight: 700;
  line-height: 24px;
}

@media (max-width: 640px) {
  .favorite-list article,
  .publish-list article {
    flex-direction: column;
  }
}
</style>
