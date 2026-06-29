<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getGroupBuys, type GroupBuyItem } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'
import ItemCard from '@/components/ItemCard.vue'

const groups = ref<GroupBuyItem[]>([])
const loading = ref(false)
const errorMessage = ref('')

function progress(group: GroupBuyItem) {
  return Math.min(100, Math.round((group.currentCount / group.targetCount) * 100))
}

async function loadGroupBuys() {
  loading.value = true
  errorMessage.value = ''

  try {
    groups.value = await getGroupBuys()
  } catch {
    errorMessage.value = '拼单搭子数据加载失败，请确认 Mock 服务已启动。'
  } finally {
    loading.value = false
  }
}

onMounted(loadGroupBuys)
</script>

<template>
  <section class="page">
    <div class="page-title">
      <h2>拼单搭子</h2>
      <p>展示拼单、搭子和组队信息，让同学快速找到一起行动的人。</p>
    </div>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />

    <div v-loading="loading" class="list-area">
      <EmptyState
        v-if="!loading && groups.length === 0"
        description="暂无拼单搭子信息"
        action-text="重新加载"
        @action="loadGroupBuys"
      />

      <el-row v-else :gutter="16">
        <el-col v-for="group in groups" :key="group.id" :xs="24" :md="8">
          <ItemCard
            class="group-card"
            :title="group.title"
            :description="group.description"
            :tag="group.type"
            tag-type="primary"
            :meta="[
              { label: '地点', value: group.location },
              { label: '截止', value: group.deadline },
              { label: '发布人', value: group.publisher },
            ]"
          >
            <template #footer>
              <div class="progress-line">
                <el-progress :percentage="progress(group)" />
                <span>{{ group.currentCount }}/{{ group.targetCount }} 人已加入</span>
              </div>
            </template>
          </ItemCard>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<style scoped>
.list-area {
  min-height: 260px;
}

.group-card {
  margin-bottom: 16px;
}

.progress-line {
  width: 100%;
}

.progress-line span {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}
</style>
