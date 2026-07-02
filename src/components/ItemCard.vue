<template>
  <el-card class="item-card" shadow="hover">
    <img v-if="image" class="item-card__image" :src="image" :alt="imageAlt || title" loading="lazy" />

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
    image?: string
    imageAlt?: string
    tag?: string
    tagType?: TagProps['type']
    meta?: MetaItem[]
  }>(),
  {
    image: '',
    imageAlt: '',
    tag: '',
    tagType: undefined,
    meta: () => [],
  },
)
</script>

<style scoped>
.item-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid rgb(223 230 239 / 90%);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.item-card:hover {
  border-color: rgb(16 185 129 / 38%);
  box-shadow: var(--shadow-soft);
  transform: translateY(-2px);
}

.item-card :deep(.el-card__header) {
  background: linear-gradient(90deg, rgb(16 185 129 / 10%), rgb(250 204 21 / 12%));
}

.item-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #eef2f7;
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
  color: var(--color-ink);
  font-size: 18px;
  line-height: 1.4;
}

.item-card__description {
  min-height: 50px;
  margin: 0;
  color: var(--color-muted);
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
