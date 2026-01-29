<template lang="">
    <div class="apply min-h-full p-6 bg-[#f6f8fa]">
        <div class="max-w-5xl mx-auto space-y-6">
            <!-- 待处理申请卡片 -->
            <div class="bg-white rounded-md border border-[#d0d7de]">
                <div class="px-6 py-4 border-b border-[#d0d7de]">
                    <h2 class="text-base font-medium text-[#24292f]">
                        待处理申请
                        <span v-if="applyStore.pendingApplies.length > 0" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#ddf4ff] text-[#0969da]">
                            {{ applyStore.pendingApplies.length }}
                        </span>
                    </h2>
                </div>
                
                <div v-if="applyStore.pendingApplies.length > 0" class="divide-y divide-[#f0f0f0]">
                    <div 
                        v-for="item in applyStore.pendingApplies" 
                        :key="item.id" 
                        class="p-4 hover:bg-[#f6f8fa] transition-colors"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3 flex-1">
                                <!-- 头像 -->
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {{ item.user_info.username?.charAt(0)?.toUpperCase() || 'U' }}
                                </div>
                                
                                <!-- 申请信息 -->
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-[#24292f]">
                                        <strong>{{ item.user_info.username }}</strong> 申请加为好友
                                    </p>
                                    <p v-if="item.handle_status" class="text-xs text-[#6e7781] mt-1">
                                        {{ item.status ? '已同意' : '已拒绝' }}
                                    </p>
                                </div>
                            </div>

                            <!-- 操作按钮 -->
                            <div v-if="!item.handle_status" class="flex items-center gap-2 ml-4 flex-shrink-0">
                                <button 
                                    @click="applyStore.handleApply(item.id, false)" 
                                    class="px-3 py-1.5 text-sm font-medium text-[#24292f] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] hover:border-[#babbbd] transition-colors"
                                >
                                    拒绝
                                </button>
                                <button 
                                    @click="applyStore.handleApply(item.id, true)" 
                                    class="px-3 py-1.5 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors"
                                >
                                    同意
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else class="p-12 text-center">
                    <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p class="text-[#6e7781] text-base">暂无待处理申请</p>
                </div>
            </div>

            <!-- 我的申请卡片 -->
            <div class="bg-white rounded-md border border-[#d0d7de]">
                <div class="px-6 py-4 border-b border-[#d0d7de]">
                    <h2 class="text-base font-medium text-[#24292f]">
                        我发起的所有申请
                        <span v-if="applyStore.applies.length > 0" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#ddf4ff] text-[#0969da]">
                            {{ applyStore.applies.length }}
                        </span>
                    </h2>
                </div>
                
                <div v-if="applyStore.applies.length > 0" class="divide-y divide-[#f0f0f0]">
                    <div 
                        v-for="item in applyStore.applies" 
                        :key="item.id" 
                        class="p-4 hover:bg-[#f6f8fa] transition-colors"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3 flex-1">
                                <!-- 头像 -->
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {{ item.apply_user_info?.username?.charAt(0)?.toUpperCase() || 'U' }}
                                </div>
                                
                                <!-- 申请信息 -->
                                <div class="flex-1">
                                    <p v-if="item.room_id" class="text-sm font-medium text-[#24292f]">
                                        申请加入房间 <strong>{{ item.room_info.name }}</strong>
                                    </p>
                                    <p v-else class="text-sm font-medium text-[#24292f]">
                                        申请加 <strong>{{ item.apply_user_info.username }}</strong> 为好友
                                    </p>
                                </div>
                            </div>

                            <!-- 状态标签 -->
                            <div class="ml-4 flex-shrink-0">
                                <span 
                                    v-if="item.handle_status" 
                                    :class="[
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        item.status 
                                            ? 'bg-[#dafbe1] text-[#1a7f37]' 
                                            : 'bg-[#ffebe9] text-[#cf222e]'
                                    ]"
                                >
                                    {{ item.status ? '已同意' : '已拒绝' }}
                                </span>
                                <span 
                                    v-else 
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fff8c5] text-[#9a6700]"
                                >
                                    待处理
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else class="p-12 text-center">
                    <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-[#6e7781] text-base">暂无申请记录</p>
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