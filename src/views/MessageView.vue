<script setup lang="ts">
const messages = [
  {
    title: '系统通知',
    content: '你的二手教材发布已通过审核。',
  },
  {
    title: '私信消息',
    content: '有同学询问台灯是否还在。',
  },
  {
    title: '互动提醒',
    content: '你关注的羽毛球组队还差 2 人满员。',
  },
]
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>消息页面</h2>
      <p>展示私信、系统通知和互动消息。</p>
    </div>

    <el-card class="section-card" shadow="never">
      <el-empty v-if="messages.length === 0" description="暂无消息" />
      <el-timeline v-else>
        <el-timeline-item v-for="message in messages" :key="message.title">
          <h3>{{ message.title }}</h3>
          <p>{{ message.content }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </section>
</template>

<style scoped>
h3 {
  margin: 0 0 6px;
}

p {
  margin: 0;
  color: #6b7280;
}
</style>
