<script setup lang="ts">
const products = [
  {
    title: '二手高等数学教材',
    price: '18 元',
    tag: '学习资料',
    description: '九成新，含少量课堂笔记，适合期末复习。',
  },
  {
    title: '宿舍护眼台灯',
    price: '35 元',
    tag: '生活用品',
    description: '三档亮度，USB 供电，晚自习和宿舍桌面都能用。',
  },
  {
    title: '校园通勤自行车',
    price: '120 元',
    tag: '出行工具',
    description: '车况正常，适合校内通勤，支持线下看车。',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>二手交易</h2>
      <p>展示校园内发布的二手商品列表，帮助同学低成本流转闲置物品。</p>
    </div>

    <el-row :gutter="16">
      <el-col v-for="product in products" :key="product.title" :xs="24" :md="8">
        <el-card class="section-card product-card" shadow="hover">
          <div class="card-header">
            <h3>{{ product.title }}</h3>
            <el-tag type="success">{{ product.tag }}</el-tag>
          </div>
          <p>{{ product.description }}</p>
          <strong>{{ product.price }}</strong>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.product-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

h3 {
  margin: 0;
  font-size: 18px;
}

p {
  min-height: 54px;
  color: #6b7280;
  line-height: 1.6;
}

strong {
  color: #f56c6c;
  font-size: 22px;
}
</style>
