<script setup lang="ts">
const categories = [
  {
    title: '二手交易',
    path: '/trades',
    description: '教材、数码、宿舍用品等闲置物品流转。',
    image: '/images/market-books.svg',
    tone: 'green',
  },
  {
    title: '失物招领',
    path: '/lostFounds',
    description: '登记丢失物品，也可以发布拾到信息。',
    image: '/images/lost-items.svg',
    tone: 'amber',
  },
  {
    title: '拼单搭子',
    path: '/groupBuys',
    description: '拼外卖、组队学习、活动搭子集中展示。',
    image: '/images/group-campus.svg',
    tone: 'blue',
  },
  {
    title: '跑腿委托',
    path: '/errands',
    description: '取快递、代买、临时帮忙等任务委托。',
    image: '/images/errand-package.svg',
    tone: 'orange',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>首页</h2>
      <p>快速进入校园轻集市的核心服务，查看推荐信息并发布新的校园需求。</p>
    </div>

    <el-row :gutter="16">
      <el-col
        v-for="category in categories"
        :key="category.path"
        :xs="24"
        :sm="12"
        :md="6"
      >
        <el-card class="section-card entrance-card" :class="`entrance-card--${category.tone}`" shadow="hover">
          <img class="entrance-card__image" :src="category.image" :alt="category.title" loading="lazy" />
          <div class="entrance-card__body">
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>
            <router-link :to="category.path">进入查看</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.entrance-card {
  margin-bottom: 16px;
  overflow: hidden;
  border: 0;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.entrance-card :deep(.el-card__body) {
  padding: 0;
}

.entrance-card:hover {
  transform: translateY(-3px);
}

.entrance-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.entrance-card__body {
  min-height: 166px;
  padding: 18px;
}

.entrance-card h3 {
  margin: 0 0 10px;
  color: #172033;
  font-size: 20px;
}

.entrance-card p {
  min-height: 54px;
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
}

.entrance-card a {
  color: #172033;
  font-weight: 700;
}

.entrance-card--green {
  background: linear-gradient(135deg, #ecfdf5, #ffffff);
}

.entrance-card--amber {
  background: linear-gradient(135deg, #fefce8, #ffffff);
}

.entrance-card--blue {
  background: linear-gradient(135deg, #eff6ff, #ffffff);
}

.entrance-card--orange {
  background: linear-gradient(135deg, #fff7ed, #ffffff);
}
</style>
