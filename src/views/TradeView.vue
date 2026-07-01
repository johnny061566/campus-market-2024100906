<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getTrades, type TradeItem } from '@/api/trade'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useFavoriteStore, type FavoriteItem } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const products = ref<TradeItem[]>([])
const loading = ref(false)
const errorMessage = ref('')

const statusText: Record<TradeItem['status'], string> = {
  open: '可交易',
  closed: '已关闭',
  done: '已完成',
}

async function loadTrades() {
  loading.value = true
  errorMessage.value = ''

  try {
    products.value = await getTrades()
  } catch {
    errorMessage.value = '二手交易数据加载失败，请确认 Mock 服务已启动。'
  } finally {
    loading.value = false
  }
}

function toFavorite(product: TradeItem): FavoriteItem {
  return {
    id: product.id,
    type: 'trade',
    title: product.title,
    description: product.description,
    tag: product.category,
    location: product.location,
  }
}

function toggleFavorite(product: TradeItem) {
  favoriteStore.toggleFavorite(toFavorite(product))
}

onMounted(loadTrades)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>二手交易</h2>
      <p>展示校园内发布的二手商品列表，帮助同学低成本流转闲置物品。</p>
    </div>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />

    <div v-loading="loading" class="list-area">
      <EmptyState
        v-if="!loading && products.length === 0"
        description="暂无二手交易信息"
        action-text="重新加载"
        @action="loadTrades"
      />

      <el-row v-else :gutter="16">
        <el-col v-for="product in products" :key="product.id" :xs="24" :md="8">
          <ItemCard
            class="product-card"
            :title="product.title"
            :description="product.description"
            :tag="product.category"
            tag-type="success"
            :meta="[
              { label: '成色', value: product.condition },
              { label: '地点', value: product.location },
              { label: '发布人', value: product.publisher },
              { label: '状态', value: statusText[product.status] },
            ]"
          >
            <template #footer>
              <strong>{{ product.price }} 元</strong>
              <span>{{ product.publishedAt }}</span>
              <el-button size="small" @click="toggleFavorite(product)">
                {{ favoriteStore.isFavorite('trade', product.id) ? '已收藏' : '收藏' }}
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
  min-height: 260px;
}

.product-card {
  margin-bottom: 16px;
}

strong {
  color: #f56c6c;
  font-size: 22px;
}

span {
  color: #6b7280;
  font-size: 13px;
}

.product-card :deep(.item-card__footer) {
  flex-wrap: wrap;
}
</style>
