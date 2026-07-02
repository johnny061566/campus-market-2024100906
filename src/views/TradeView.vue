<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { getTrades, type TradeItem } from '@/api/trade'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore, type FavoriteItem } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
const products = ref<TradeItem[]>([])
const loading = ref(false)
const errorMessage = ref('')
const keyword = ref('')
const fallbackProductImage = '/images/market-books.svg'

const statusText: Record<TradeItem['status'], string> = {
  open: '可交易',
  closed: '已关闭',
  done: '已完成',
}

const filteredProducts = computed(() => {
  const text = keyword.value.trim().toLowerCase()

  if (!text) {
    return products.value
  }

  return products.value.filter((product) =>
    [
      product.title,
      product.category,
      product.location,
      product.description,
      product.condition,
      product.publisher,
    ].some((field) => field.toLowerCase().includes(text)),
  )
})

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

function handleEmptyAction() {
  if (products.value.length === 0) {
    loadTrades()
    return
  }

  keyword.value = ''
}

onMounted(loadTrades)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>二手交易</h2>
      <p>展示校园内发布的二手商品列表，帮助同学低成本流转闲置物品。</p>
    </div>

    <SearchBar v-model="keyword" placeholder="搜索商品标题、分类、地点或描述" />

    <div class="list-area">
      <LoadingState v-if="loading" text="正在加载二手交易信息..." />

      <ErrorState
        v-else-if="errorMessage"
        title="二手交易数据加载失败"
        :description="errorMessage"
        action-text="重新加载"
        @action="loadTrades"
      />

      <EmptyState
        v-else-if="filteredProducts.length === 0"
        :description="products.length === 0 ? '暂无二手交易信息' : '没有找到匹配的二手交易信息'"
        :action-text="products.length === 0 ? '重新加载' : '清空搜索'"
        @action="handleEmptyAction"
      />

      <el-row v-else :gutter="16">
        <el-col v-for="product in filteredProducts" :key="product.id" :xs="24" :md="8">
          <ItemCard
            class="product-card"
            :title="product.title"
            :description="product.description"
            :image="product.image || fallbackProductImage"
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
  margin-top: 16px;
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
