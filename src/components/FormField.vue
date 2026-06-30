<template>
  <label class="form-field">
    <span class="form-field__label">
      {{ label }}
      <em v-if="required">*</em>
    </span>
    <slot />
    <span v-if="error" class="form-field__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<style scoped>
.form-field {
  display: grid;
  gap: 8px;
}

.form-field__label {
  color: #374151;
  font-size: 14px;
  font-weight: 700;
}

.form-field__label em {
  margin-left: 4px;
  color: #f56c6c;
  font-style: normal;
}

.form-field__error {
  color: #f56c6c;
  font-size: 13px;
}
</style>
