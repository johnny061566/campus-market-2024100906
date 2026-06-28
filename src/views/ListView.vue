<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const products = [
  {
    id: 1,
    title: '二手教材',
    price: '18 元',
    category: '学习资料',
    description: '计算机专业教材，适合低年级课程复习使用。',
  },
  {
    id: 2,
    title: '宿舍小台灯',
    price: '25 元',
    category: '生活用品',
    description: '三档亮度，适合晚自习和宿舍桌面使用。',
  },
  {
    id: 3,
    title: '校园代步自行车',
    price: '120 元',
    category: '出行工具',
    description: '车况正常，适合校内通勤。',
  },
]

function goDetail(id: number) {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="page">
    <div class="page-title">
      <h1>列表页</h1>
      <p>浏览校园内发布的闲置物品和信息</p>
    </div>

    <el-row :gutter="16">
      <el-col
        v-for="product in products"
        :key="product.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <el-card class="product-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ product.title }}</span>
              <el-tag type="success">{{ product.category }}</el-tag>
            </div>
          </template>

          <p class="description">{{ product.description }}</p>
          <div class="card-footer">
            <strong>{{ product.price }}</strong>
            <el-button
              type="primary"
              size="small"
              @click="goDetail(product.id)"
            >
              查看详情
            </el-button>
          </div>
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

.product-card {
  margin-bottom: 16px;
}

.card-header,
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.description {
  min-height: 48px;
  margin: 0 0 20px;
  color: #4b5563;
  line-height: 1.6;
}

.card-footer strong {
  color: #f56c6c;
  font-size: 20px;
}
</style>
