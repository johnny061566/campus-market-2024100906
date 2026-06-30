<script setup lang="ts">
const categories = [
  {
    title: '二手交易',
    path: '/trades',
    description: '教材、数码、宿舍用品等闲置物品流转。',
  },
  {
    title: '失物招领',
    path: '/lostFounds',
    description: '登记丢失物品，也可以发布拾到信息。',
  },
  {
    title: '拼单搭子',
    path: '/groupBuys',
    description: '拼外卖、组队学习、活动搭子集中展示。',
  },
  {
    title: '跑腿委托',
    path: '/errands',
    description: '取快递、代买、临时帮忙等任务委托。',
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
        <el-card class="section-card entrance-card" shadow="hover">
          <h3>{{ category.title }}</h3>
          <p>{{ category.description }}</p>
          <router-link :to="category.path">进入查看</router-link>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.entrance-card {
  min-height: 176px;
  margin-bottom: 16px;
}

.entrance-card h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.entrance-card p {
  min-height: 54px;
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
}

.entrance-card a {
  color: #409eff;
  font-weight: 700;
}
</style>
