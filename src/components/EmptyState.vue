<template>
  <div class="empty-state">
    <el-empty :description="description">
      <el-button v-if="actionText" type="primary" @click="$emit('action')">
        {{ actionText }}
      </el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string
    actionText?: string
  }>(),
  {
    description: '暂无数据',
    actionText: '',
  },
)

defineEmits<{
  action: []
}>()
</script>

<style scoped>
.empty-state {
  display: grid;
  place-items: center;
  min-height: 240px;
  padding: 24px;
  background: linear-gradient(135deg, #ffffff, #fefce8);
  border: 1px solid rgb(250 204 21 / 24%);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
}
</style>
