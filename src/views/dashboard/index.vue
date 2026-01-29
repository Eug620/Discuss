<template lang="">
    <div class="dashboard min-h-full p-6 bg-[#f6f8fa]">
        <div class="max-w-6xl mx-auto">
            <!-- 欢迎区域 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-6 mb-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {{ userStore.userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
                    </div>
                    <div class="flex-1">
                        <h1 class="text-2xl font-semibold text-[#24292f] mb-1">
                            欢迎回来，{{ userStore.userInfo.username || '用户' }}！
                        </h1>
                        <p class="text-[#6e7781] text-base">
                            {{ getGreeting() }}，这里是您的个人仪表盘
                        </p>
                    </div>
                </div>
            </div>

            <!-- 统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- 好友数 -->
                <div class="bg-white rounded-md border border-[#d0d7de] p-5 hover:shadow-sm transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-[#6e7781] mb-1">好友数量</p>
                            <p class="text-2xl font-semibold text-[#24292f]">{{ friendStore.friends.length }}</p>
                        </div>
                        <div class="w-12 h-12 rounded-md bg-[#ddf4ff] flex items-center justify-center">
                            <svg class="w-6 h-6 text-[#0969da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 房间数 -->
                <div class="bg-white rounded-md border border-[#d0d7de] p-5 hover:shadow-sm transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-[#6e7781] mb-1">房间数量</p>
                            <p class="text-2xl font-semibold text-[#24292f]">{{ roomStore.rooms.length }}</p>
                        </div>
                        <div class="w-12 h-12 rounded-md bg-[#dafbe1] flex items-center justify-center">
                            <svg class="w-6 h-6 text-[#1a7f37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 待处理申请 -->
                <div class="bg-white rounded-md border border-[#d0d7de] p-5 hover:shadow-sm transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-[#6e7781] mb-1">待处理申请</p>
                            <p class="text-2xl font-semibold text-[#24292f]">{{ applyStore.pendingApplies.length }}</p>
                        </div>
                        <div class="w-12 h-12 rounded-md bg-[#fff8c5] flex items-center justify-center">
                            <svg class="w-6 h-6 text-[#9a6700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 在线状态 -->
                <div class="bg-white rounded-md border border-[#d0d7de] p-5 hover:shadow-sm transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-[#6e7781] mb-1">连接状态</p>
                            <p class="text-2xl font-semibold" :class="socketStore.socket?.connected ? 'text-[#1a7f37]' : 'text-[#cf222e]'">
                                {{ socketStore.socket?.connected ? '在线' : '离线' }}
                            </p>
                        </div>
                        <div class="w-12 h-12 rounded-md flex items-center justify-center" :class="socketStore.socket?.connected ? 'bg-[#dafbe1]' : 'bg-[#ffebe9]'">
                            <div class="w-3 h-3 rounded-full" :class="socketStore.socket?.connected ? 'bg-[#1a7f37]' : 'bg-[#cf222e]'"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 快速操作 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-6 mb-6">
                <h2 class="text-base font-medium text-[#24292f] mb-4">快速操作</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <router-link to="/friend" class="flex items-center gap-3 p-4 rounded-md border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#babbbd] transition-colors">
                        <svg class="w-5 h-5 text-[#6e7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span class="text-sm text-[#24292f]">添加好友</span>
                    </router-link>
                    <router-link to="/room/create" class="flex items-center gap-3 p-4 rounded-md border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#babbbd] transition-colors">
                        <svg class="w-5 h-5 text-[#6e7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="text-sm text-[#24292f]">创建房间</span>
                    </router-link>
                    <router-link to="/apply" class="flex items-center gap-3 p-4 rounded-md border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#babbbd] transition-colors">
                        <svg class="w-5 h-5 text-[#6e7781]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span class="text-sm text-[#24292f]">查看申请</span>
                    </router-link>
                </div>
            </div>

            <!-- 装饰图片 -->
            <div class="flex justify-center">
                <img src="/Tiananmen.svg" alt="Welcome Image" class="h-[200px] w-auto opacity-50"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { useFriendStore } from '@/store/modules/friend'
import { useRoomStore } from '@/store/modules/room'
import { useApplyStore } from '@/store/modules/apply'
import { useSocketStore } from '@/store/modules/socket'

const userStore = useUserStore()
const friendStore = useFriendStore()
const roomStore = useRoomStore()
const applyStore = useApplyStore()
const socketStore = useSocketStore()

// 获取问候语
const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
}
</script>
<style lang="scss">

</style>