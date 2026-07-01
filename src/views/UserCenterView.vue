<script setup lang="ts">
import { computed } from 'vue'

import {
  favoriteRouteMap,
  favoriteTypeText,
  useFavoriteStore,
  type FavoriteItem,
} from '@/stores/favorite'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const user = computed(() => userStore.currentUser)

const myPublishTips = computed(() => [
  {
    label: '二手交易',
    content: `发布时会自动记录为 ${userStore.displayName}`,
  },
  {
    label: '拼单搭子',
    content: '可根据 publisher 字段继续扩展查询',
  },
  {
    label: '失物招领',
    content: '联系信息已使用当前用户姓名',
  },
])

const stats = computed(() => [
  {
    label: '登录状态',
    value: userStore.isLoggedIn ? '已登录' : '未登录',
  },
  {
    label: '我的发布',
    value: myPublishTips.value.length,
  },
  {
    label: '我的收藏',
    value: favoriteStore.count,
  },
])

function removeFavorite(item: FavoriteItem) {
  favoriteStore.removeFavorite(item.type, item.id)
}
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

          <el-timeline>
            <el-timeline-item v-for="item in myPublishTips" :key="item.label" :timestamp="item.label">
              <p>{{ item.content }}</p>
            </el-timeline-item>
          </el-timeline>
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

.favorite-list {
  display: grid;
  gap: 12px;
}

.favorite-list article {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.favorite-list span {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 13px;
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
  .favorite-list article {
    flex-direction: column;
  }
}
</style>
