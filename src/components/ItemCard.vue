<template>
  <el-card class="item-card" shadow="hover">
    <template #header>
      <div class="item-card__header">
        <h3>{{ title }}</h3>
        <el-tag v-if="tag" :type="tagType" effect="light">{{ tag }}</el-tag>
      </div>
    </template>

    <p class="item-card__description">{{ description }}</p>

    <dl v-if="meta.length > 0" class="item-card__meta">
      <div v-for="item in meta" :key="item.label">
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      </div>
    </dl>

    <div v-if="$slots.footer" class="item-card__footer">
      <slot name="footer" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { TagProps } from 'element-plus'

interface MetaItem {
  label: string
  value: string | number
}

withDefaults(
  defineProps<{
    title: string
    description: string
    tag?: string
    tagType?: TagProps['type']
    meta?: MetaItem[]
  }>(),
  {
    tag: '',
    tagType: undefined,
    meta: () => [],
  },
)
</script>

<style scoped>
.item-card {
  height: 100%;
  border-radius: 8px;
}

.item-card :deep(.el-card__body) {
  display: grid;
  gap: 14px;
}

.item-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.item-card__header h3 {
  margin: 0;
  color: #111827;
  font-size: 18px;
  line-height: 1.4;
}

.item-card__description {
  min-height: 50px;
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.item-card__meta {
  display: grid;
  gap: 8px;
  margin: 0;
}

.item-card__meta div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #4b5563;
  font-size: 14px;
}

.item-card__meta dt {
  color: #6b7280;
}

.item-card__meta dd {
  margin: 0;
  text-align: right;
}

.item-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 2px;
}
</style>
