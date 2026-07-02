<template>
  <div class="search-bar">
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
    />

    <button v-if="modelValue" type="button" @click="$emit('update:modelValue', '')">
      清空
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: '请输入关键词搜索',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgb(16 185 129 / 18%);
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #f0fdf4);
  box-shadow: var(--shadow-card);
}

.search-bar input {
  flex: 1;
  min-width: 0;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  color: #111827;
  font-size: 14px;
}

.search-bar input:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 0 0 2px rgb(16 185 129 / 14%);
}

.search-bar button {
  min-width: 64px;
  border: none;
  border-radius: 8px;
  padding: 0 14px;
  cursor: pointer;
  background: #fff7ed;
  color: #c2410c;
  font-weight: 700;
}

@media (max-width: 520px) {
  .search-bar {
    flex-direction: column;
  }

  .search-bar button {
    min-height: 38px;
  }
}
</style>
