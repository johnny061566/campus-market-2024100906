<script setup lang="ts">
const groups = [
  {
    title: '今晚火锅拼单',
    current: 3,
    target: 5,
    description: '校门口自取，满 5 人免配送费。',
  },
  {
    title: '四级听力晨练搭子',
    current: 2,
    target: 4,
    description: '工作日早上 7:30，图书馆大厅集合。',
  },
  {
    title: '周末羽毛球组队',
    current: 6,
    target: 8,
    description: '体育馆 2 号场，费用 AA。',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>拼单搭子</h2>
      <p>展示拼单、搭子和组队信息，让同学快速找到一起行动的人。</p>
    </div>

    <el-row :gutter="16">
      <el-col v-for="group in groups" :key="group.title" :xs="24" :md="8">
        <el-card class="section-card group-card" shadow="hover">
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
          <el-progress
            :percentage="Math.round((group.current / group.target) * 100)"
          />
          <span>{{ group.current }}/{{ group.target }} 人已加入</span>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.group-card {
  margin-bottom: 16px;
}

h3 {
  margin: 0 0 10px;
}

p {
  min-height: 52px;
  color: #6b7280;
  line-height: 1.6;
}

span {
  display: inline-block;
  margin-top: 10px;
  color: #6b7280;
}
</style>
