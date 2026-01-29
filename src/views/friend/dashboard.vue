<template>
    <div class="friend-dashboard min-h-full p-6 bg-[#f6f8fa]">
        <div class="max-w-6xl mx-auto">
            <!-- 欢迎区域 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-semibold text-[#24292f] mb-2">
                            好友管理
                        </h1>
                        <p class="text-[#6e7781] text-base">
                            管理您的好友列表，发现新朋友
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-sm text-[#6e7781]">好友总数</span>
                        <span class="text-2xl font-semibold text-[#24292f]">{{ friendStore.friends.length }}</span>
                    </div>
                </div>
            </div>

            <!-- 快速操作 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <router-link to="/friend/search" class="flex items-center gap-4 p-5 bg-white rounded-md border border-[#d0d7de] hover:shadow-sm hover:border-[#babbbd] transition-all">
                    <div class="w-12 h-12 rounded-md bg-[#ddf4ff] flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#0969da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-base font-medium text-[#24292f] mb-1">搜索好友</h3>
                        <p class="text-sm text-[#6e7781]">查找并添加新朋友</p>
                    </div>
                </router-link>

                <router-link to="/apply" class="flex items-center gap-4 p-5 bg-white rounded-md border border-[#d0d7de] hover:shadow-sm hover:border-[#babbbd] transition-all">
                    <div class="w-12 h-12 rounded-md bg-[#fff8c5] flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#9a6700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-base font-medium text-[#24292f] mb-1">好友申请</h3>
                        <p class="text-sm text-[#6e7781]">处理待处理的好友申请</p>
                        <span v-if="applyStore.pendingApplies.length > 0" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#ffebe9] text-[#cf222e] mt-2">
                            {{ applyStore.pendingApplies.length }} 条待处理
                        </span>
                    </div>
                </router-link>
            </div>

            <!-- 好友列表预览 -->
            <div class="bg-white rounded-md border border-[#d0d7de]">
                <div class="px-6 py-4 border-b border-[#d0d7de] flex items-center justify-between">
                    <h2 class="text-base font-medium text-[#24292f]">我的好友</h2>
                    <router-link to="/friend" class="text-sm text-[#0969da] hover:underline">查看全部</router-link>
                </div>
                
                <div v-if="friendStore.friends.length > 0" class="divide-y divide-[#f0f0f0]">
                    <div 
                        v-for="friend in friendStore.friends.slice(0, 5)" 
                        :key="friend.id" 
                        class="p-4 hover:bg-[#f6f8fa] transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {{ friend.friend_info?.username?.charAt(0)?.toUpperCase() || 'U' }}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-[#24292f]">
                                    {{ friend.friend_info?.username || '未知用户' }}
                                </p>
                                <p v-if="friend.friend_info?.email" class="text-xs text-[#6e7781] mt-0.5">
                                    {{ friend.friend_info.email }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else class="p-12 text-center">
                    <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="text-[#6e7781] text-base mb-4">还没有好友</p>
                    <router-link to="/friend/search" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors">
                        添加好友
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFriendStore } from '@/store/modules/friend'
import { useApplyStore } from '@/store/modules/apply'

const friendStore = useFriendStore()
const applyStore = useApplyStore()
</script>