<template lang="">
    <div class="w-full h-full overflow-y-auto" :style="{ backgroundColor: 'var(--bgColor)' }">
        <div class="w-full max-w-2xl mx-auto px-4 py-3" style="max-width: 672px;">
            <div class="card p-4">
                <div class="text-center mb-4">
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" :style="{ background: 'var(--primaryGradient)' }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </div>
                    <h2 class="text-base font-semibold" :style="{ color: 'var(--textColor)' }">消息通知</h2>
                    <p class="text-sm mt-0.5" :style="{ color: 'var(--textSecondary)' }">系统消息与提醒</p>
                </div>

                <div v-if="alertStore.alerts.length > 0" class="flex flex-col gap-2">
                    <div 
                        v-for="(item, idx) in alertStore.alerts" 
                        :key="idx"
                        class="info-item card-hover group">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm" :style="{ color: 'var(--textColor)' }">
                                <span class="font-medium">[{{ item.sender }}]</span> {{ item.message }}
                            </div>
                            <div class="text-xs mt-0.5" :style="{ color: 'var(--textSecondary)' }">
                                {{ dayjs(item.timestamp).format('YYYY/MM/DD HH:mm:ss') }}
                            </div>
                        </div>
                        <div class="icon-btn opacity-0 group-hover:opacity-100 transition-opacity" @click="alertStore.alerts.splice(idx, 1)" title="删除">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state" style="padding: 40px 20px;">
                    <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <span>暂无消息</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/modules/alert'
import dayjs from 'dayjs';

const alertStore = useAlertStore()
</script>
<style lang="scss"></style>