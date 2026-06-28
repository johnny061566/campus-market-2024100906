<script setup lang="ts">
const tasks = [
  {
    title: '代取东门快递',
    reward: '5 元',
    place: '东门驿站到 6 号宿舍楼',
  },
  {
    title: '帮买晚饭',
    reward: '3 元',
    place: '一食堂到实验楼',
  },
  {
    title: '打印资料顺路带回',
    reward: '4 元',
    place: '打印店到教学楼 A 区',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>跑腿委托</h2>
      <p>展示校园跑腿任务和临时委托，让需求与顺路同学快速匹配。</p>
    </div>

    <el-card class="section-card" shadow="never">
      <el-timeline>
        <el-timeline-item
          v-for="task in tasks"
          :key="task.title"
          :timestamp="task.place"
          placement="top"
        >
          <h3>{{ task.title }}</h3>
          <p>酬谢：{{ task.reward }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </section>
</template>

<style scoped>
h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

p {
  margin: 0;
  color: #f56c6c;
  font-weight: 700;
}
</style>
