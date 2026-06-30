<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { createErrand } from '@/api/errand'
import { createGroupBuy } from '@/api/groupBuy'
import { createLostFound } from '@/api/lostFound'
import { createTrade } from '@/api/trade'
import FormField from '@/components/FormField.vue'

type PublishType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

const router = useRouter()
const publishType = ref<PublishType>('trade')
const submitting = ref(false)

const form = reactive({
  title: '',
  location: '',
  description: '',
  category: '',
  price: 0,
  condition: '',
  lostFoundType: 'lost' as 'lost' | 'found',
  itemName: '',
  eventTime: '',
  groupType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
})

const errors = reactive<Record<string, string>>({})

const typeLabel = computed(() => {
  const labels: Record<PublishType, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }

  return labels[publishType.value]
})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

function validateRequired(field: keyof typeof form, message: string) {
  const value = form[field]

  if (typeof value === 'string' && value.trim() === '') {
    errors[field] = message
  }
}

function validateForm() {
  clearErrors()

  validateRequired('title', '请输入标题')
  validateRequired('location', '请输入地点')
  validateRequired('description', '请输入描述')

  if (publishType.value === 'trade') {
    validateRequired('category', '请输入分类')
    validateRequired('condition', '请输入成色')

    if (form.price <= 0) {
      errors.price = '价格必须大于 0'
    }
  }

  if (publishType.value === 'lostFound') {
    validateRequired('itemName', '请输入物品名称')
    validateRequired('eventTime', '请选择时间')
  }

  if (publishType.value === 'groupBuy') {
    validateRequired('groupType', '请输入类型')
    validateRequired('deadline', '请选择截止时间')

    if (form.targetCount < 2) {
      errors.targetCount = '目标人数至少为 2'
    }
  }

  if (publishType.value === 'errand') {
    validateRequired('taskType', '请输入任务类型')
    validateRequired('from', '请输入取件地点')
    validateRequired('to', '请输入送达地点')
    validateRequired('deadline', '请选择截止时间')

    if (form.reward <= 0) {
      errors.reward = '酬劳必须大于 0'
    }
  }

  return Object.keys(errors).length === 0
}

function formatNow() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, '0')

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours(),
  )}:${pad(now.getMinutes())}`
}

function resetForm() {
  form.title = ''
  form.location = ''
  form.description = ''
  form.category = ''
  form.price = 0
  form.condition = ''
  form.lostFoundType = 'lost'
  form.itemName = ''
  form.eventTime = ''
  form.groupType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = 0
  form.from = ''
  form.to = ''
  clearErrors()
}

async function handleSubmit() {
  if (!validateForm()) {
    ElMessage.warning('请先补全必填信息')
    return
  }

  submitting.value = true

  try {
    const common = {
      title: form.title,
      location: form.location,
      description: form.description,
      status: 'open' as const,
    }

    if (publishType.value === 'trade') {
      await createTrade({
        ...common,
        price: form.price,
        category: form.category,
        condition: form.condition,
        publisher: '我',
        publishedAt: formatNow(),
        image: '',
      })
      await router.push('/trades')
    }

    if (publishType.value === 'lostFound') {
      await createLostFound({
        ...common,
        type: form.lostFoundType,
        itemName: form.itemName,
        time: form.eventTime,
        contact: '我',
      })
      await router.push('/lostFounds')
    }

    if (publishType.value === 'groupBuy') {
      await createGroupBuy({
        ...common,
        type: form.groupType,
        targetCount: form.targetCount,
        currentCount: 1,
        deadline: form.deadline,
        publisher: '我',
      })
      await router.push('/groupBuys')
    }

    if (publishType.value === 'errand') {
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: form.reward,
        pickupLocation: form.from,
        deliveryLocation: form.to,
        deadline: form.deadline,
        publisher: '我',
        status: 'open',
        description: form.description,
      })
      await router.push('/errands')
    }

    ElMessage.success(`${typeLabel.value}发布成功`)
    resetForm()
  } catch {
    ElMessage.error('发布失败，请确认 Mock 服务已启动')
  } finally {
    submitting.value = false
  }
}

watch(publishType, () => {
  clearErrors()
})
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>发布信息</h2>
      <p>选择发布类型，填写必要信息，让校园需求更快被看见。</p>
    </div>

    <form class="publish-form section-card" @submit.prevent="handleSubmit">
      <FormField label="发布类型" required>
        <select v-model="publishType">
          <option value="trade">二手交易</option>
          <option value="lostFound">失物招领</option>
          <option value="groupBuy">拼单搭子</option>
          <option value="errand">跑腿委托</option>
        </select>
      </FormField>

      <div class="field-grid">
        <FormField label="标题" required :error="errors.title">
          <input v-model.trim="form.title" type="text" placeholder="请输入标题" />
        </FormField>

        <FormField label="地点" required :error="errors.location">
          <input v-model.trim="form.location" type="text" placeholder="请输入地点" />
        </FormField>
      </div>

      <FormField label="描述" required :error="errors.description">
        <textarea v-model.trim="form.description" rows="5" placeholder="请简要描述具体情况" />
      </FormField>

      <div v-if="publishType === 'trade'" class="type-fields">
        <div class="field-grid">
          <FormField label="分类" required :error="errors.category">
            <input v-model.trim="form.category" type="text" placeholder="如：学习资料、数码配件" />
          </FormField>

          <FormField label="价格" required :error="errors.price">
            <input v-model.number="form.price" type="number" min="0" step="0.01" />
          </FormField>
        </div>

        <FormField label="成色" required :error="errors.condition">
          <input v-model.trim="form.condition" type="text" placeholder="如：九成新、全新未拆" />
        </FormField>
      </div>

      <div v-if="publishType === 'lostFound'" class="type-fields">
        <div class="field-grid">
          <FormField label="类型" required>
            <select v-model="form.lostFoundType">
              <option value="lost">寻物</option>
              <option value="found">招领</option>
            </select>
          </FormField>

          <FormField label="物品名称" required :error="errors.itemName">
            <input v-model.trim="form.itemName" type="text" placeholder="请输入物品名称" />
          </FormField>
        </div>

        <FormField label="时间" required :error="errors.eventTime">
          <input v-model="form.eventTime" type="datetime-local" />
        </FormField>
      </div>

      <div v-if="publishType === 'groupBuy'" class="type-fields">
        <div class="field-grid">
          <FormField label="类型" required :error="errors.groupType">
            <input v-model.trim="form.groupType" type="text" placeholder="如：外卖拼单、学习搭子" />
          </FormField>

          <FormField label="目标人数" required :error="errors.targetCount">
            <input v-model.number="form.targetCount" type="number" min="2" />
          </FormField>
        </div>

        <FormField label="截止时间" required :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </div>

      <div v-if="publishType === 'errand'" class="type-fields">
        <div class="field-grid">
          <FormField label="任务类型" required :error="errors.taskType">
            <input v-model.trim="form.taskType" type="text" placeholder="如：取快递、代买" />
          </FormField>

          <FormField label="酬劳" required :error="errors.reward">
            <input v-model.number="form.reward" type="number" min="0" step="0.01" />
          </FormField>
        </div>

        <div class="field-grid">
          <FormField label="取件地点" required :error="errors.from">
            <input v-model.trim="form.from" type="text" placeholder="请输入取件地点" />
          </FormField>

          <FormField label="送达地点" required :error="errors.to">
            <input v-model.trim="form.to" type="text" placeholder="请输入送达地点" />
          </FormField>
        </div>

        <FormField label="截止时间" required :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </div>

      <div class="actions">
        <button type="button" class="secondary" @click="resetForm">重置</button>
        <button type="submit" class="primary" :disabled="submitting">
          {{ submitting ? '提交中...' : '发布' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.publish-form {
  display: grid;
  gap: 18px;
  padding: 22px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.type-fields {
  display: grid;
  gap: 16px;
  padding-top: 4px;
}

input,
select,
textarea {
  width: 100%;
  min-height: 40px;
  padding: 9px 11px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  color: #1f2937;
  font: inherit;
  background: #ffffff;
}

textarea {
  resize: vertical;
  line-height: 1.6;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgb(64 158 255 / 14%);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 4px;
}

button {
  min-width: 92px;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 6px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.primary {
  color: #ffffff;
  background: #409eff;
}

.secondary {
  color: #374151;
  border-color: #dcdfe6;
  background: #ffffff;
}

@media (max-width: 720px) {
  .field-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column-reverse;
  }

  button {
    width: 100%;
  }
}
</style>
