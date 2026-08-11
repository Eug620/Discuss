<template lang="">
    <div class="w-full h-full flex gap-3 p-3" :style="{ backgroundColor: 'var(--bgColor)' }">
      <!-- 待处理申请 -->
      <div class="flex-1 flex flex-col card" style="overflow: hidden;">
        <div class="card-header">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662" />
            </svg>
          </div>
          <span class="card-title">待处理申请</span>
          <span class="card-count">{{ applyStore.pendingApplies.length }}</span>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
          <div v-if="applyStore.pendingApplies.length > 0" class="flex flex-col gap-1">
            <div v-for="item in applyStore.pendingApplies" :key="item.id" class="info-item card-hover">
              <div class="info-item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium" :style="{ color: 'var(--textColor)' }">{{ item.user_info.username }}</div>
                <div class="text-xs" :style="{ color: 'var(--textSecondary)' }">
                  {{ item.room_id ? '申请加入房间' : '申请加为好友' }}
                </div>
              </div>
              <div v-if="!item.handle_status" class="flex gap-1">
                <div class="icon-btn" @click="applyStore.handleApply(item.id, true)" title="同意">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" style="color: var(--successColor);">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div class="icon-btn" @click="applyStore.handleApply(item.id, false)" title="拒绝">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" style="color: var(--dangerColor);">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <span v-else class="status-badge" :class="{ success: item.status, danger: !item.status }">
                {{ item.status ? '已同意' : '已拒绝' }}
              </span>
            </div>
          </div>
          <div v-else class="empty-state" style="padding: 40px 20px;">
            <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <span>暂无待处理申请</span>
          </div>
        </div>
      </div>

      <!-- 我发起的申请 -->
      <div class="flex-1 flex flex-col card" style="overflow: hidden;">
        <div class="card-header">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span class="card-title">我发起的申请</span>
          <span class="card-count">{{ applyStore.applies.length }}</span>
        </div>
        <div class="flex-1 overflow-y-auto p-2">
          <div v-if="applyStore.applies.length > 0" class="flex flex-col gap-1">
            <div v-for="item in applyStore.applies" :key="item.id" class="info-item card-hover">
              <div class="info-item-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium" :style="{ color: 'var(--textColor)' }">
                  {{ item.room_id ? '申请加入 ' + item.room_info.name : '申请加 ' + item.apply_user_info.username + ' 为好友' }}
                </div>
              </div>
              <span v-if="item.handle_status" class="status-badge" :class="{ success: item.status, danger: !item.status }">
                {{ item.status ? '已同意' : '已拒绝' }}
              </span>
              <span v-else class="status-badge" style="background: var(--activeBgColor); color: var(--primaryColor);">待处理</span>
            </div>
          </div>
          <div v-else class="empty-state" style="padding: 40px 20px;">
            <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span>暂无申请记录</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useApplyStore } from "@/store/modules/apply";

const applyStore = useApplyStore();
applyStore.getPendingApplies()
applyStore.getApplies()
</script>
<style lang="">
</style>