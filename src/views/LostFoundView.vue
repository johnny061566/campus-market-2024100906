<script setup lang="ts">
const notices = [
  {
    type: '寻物',
    title: '黑色校园卡套',
    place: '图书馆三楼自习区',
    time: '今天 10:30',
  },
  {
    type: '招领',
    title: '蓝色保温杯',
    place: '第二食堂窗口旁',
    time: '昨天 18:20',
  },
  {
    type: '寻物',
    title: '无线耳机充电盒',
    place: '操场看台',
    time: '周五晚',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>失物招领</h2>
      <p>集中展示校园失物和招领信息，帮助物品尽快回到主人手里。</p>
    </div>

    <el-card class="section-card" shadow="never">
      <el-table :data="notices" style="width: 100%">
        <el-table-column prop="type" label="类型" width="90" />
        <el-table-column prop="title" label="物品" />
        <el-table-column prop="place" label="地点" />
        <el-table-column prop="time" label="时间" width="120" />
      </el-table>
    </el-card>
  </section>
</template>
