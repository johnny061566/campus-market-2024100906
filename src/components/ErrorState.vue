<template>
  <div class="error-state">
    <div>
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
    <el-button v-if="actionText" type="primary" plain @click="$emit('action')">
      {{ actionText }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    actionText?: string
  }>(),
  {
    title: '数据加载失败',
    description: '请确认 Mock 服务已启动后重试。',
    actionText: '重新加载',
  },
)

defineEmits<{
  action: []
}>()
</script>

<style scoped>
.error-state {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 120px;
  padding: 24px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}

.error-state strong {
  display: block;
  margin-bottom: 8px;
  color: #7f1d1d;
  font-size: 16px;
}

.error-state p {
  margin: 0;
  color: #b91c1c;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .error-state {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
