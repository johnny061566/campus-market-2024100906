<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productId = computed(() => route.params.id ?? '未选择')

const detail = computed(() => ({
  id: productId.value,
  title: `校园信息 ${productId.value}`,
  category: '校园闲置',
  price: productId.value === '未选择' ? '暂无' : '面议',
  status: productId.value === '未选择' ? '未选择商品' : '展示中',
}))

function backToList() {
  router.push('/list')
}
</script>

<template>
  <div class="page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <div>
            <h1>详情页</h1>
            <p>当前查看的信息 ID：{{ productId }}</p>
          </div>
          <el-tag type="primary">{{ detail.status }}</el-tag>
        </div>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="信息标题">
          {{ detail.title }}
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          {{ detail.category }}
        </el-descriptions-item>
        <el-descriptions-item label="价格">
          {{ detail.price }}
        </el-descriptions-item>
        <el-descriptions-item label="说明">
          这里是根据路由 ID 展示的详情页占位内容，后续可以接入真实商品数据。
        </el-descriptions-item>
      </el-descriptions>

      <div class="actions">
        <el-button @click="backToList">返回列表页</el-button>
        <el-button type="primary">联系发布者</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.card-header h1 {
  margin: 0;
}

.card-header p {
  margin: 8px 0 0;
  color: #6b7280;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}
</style>
