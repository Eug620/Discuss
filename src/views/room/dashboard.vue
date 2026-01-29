<template>
    <div class="room-dashboard min-h-full p-6 bg-[#f6f8fa]">
        <div class="max-w-6xl mx-auto">
            <!-- 欢迎区域 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-semibold text-[#24292f] mb-2">
                            房间管理
                        </h1>
                        <p class="text-[#6e7781] text-base">
                            加入或创建聊天房间，与朋友实时交流
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-sm text-[#6e7781]">房间总数</span>
                        <span class="text-2xl font-semibold text-[#24292f]">{{ roomStore.rooms.length }}</span>
                    </div>
                </div>
            </div>

            <!-- 快速操作 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <router-link to="/room/create" class="flex items-center gap-4 p-5 bg-white rounded-md border border-[#d0d7de] hover:shadow-sm hover:border-[#babbbd] transition-all">
                    <div class="w-12 h-12 rounded-md bg-[#dafbe1] flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#1a7f37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-base font-medium text-[#24292f] mb-1">创建房间</h3>
                        <p class="text-sm text-[#6e7781]">创建一个新的聊天房间</p>
                    </div>
                </router-link>

                <router-link to="/room/search" class="flex items-center gap-4 p-5 bg-white rounded-md border border-[#d0d7de] hover:shadow-sm hover:border-[#babbbd] transition-all">
                    <div class="w-12 h-12 rounded-md bg-[#ddf4ff] flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#0969da]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-base font-medium text-[#24292f] mb-1">搜索房间</h3>
                        <p class="text-sm text-[#6e7781]">查找并加入现有房间</p>
                    </div>
                </router-link>
            </div>

            <!-- 房间列表预览 -->
            <div class="bg-white rounded-md border border-[#d0d7de]">
                <div class="px-6 py-4 border-b border-[#d0d7de] flex items-center justify-between">
                    <h2 class="text-base font-medium text-[#24292f]">我的房间</h2>
                    <router-link to="/room" class="text-sm text-[#0969da] hover:underline">查看全部</router-link>
                </div>
                
                <div v-if="roomStore.rooms.length > 0" class="divide-y divide-[#f0f0f0]">
                    <div 
                        v-for="room in roomStore.rooms.slice(0, 5)" 
                        :key="room.id" 
                        class="p-4 hover:bg-[#f6f8fa] transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-md bg-gradient-to-br from-[#8957e5] to-[#6e40c9] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {{ room.room_info?.name?.charAt(0)?.toUpperCase() || 'R' }}
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium text-[#24292f]">
                                    {{ room.room_info?.name || '未知房间' }}
                                </p>
                                <p v-if="room.room_info?.description" class="text-xs text-[#6e7781] mt-0.5 truncate">
                                    {{ room.room_info.description }}
                                </p>
                            </div>
                            <router-link 
                                :to="`/room/${room.room_id}`" 
                                class="px-3 py-1.5 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors flex-shrink-0"
                            >
                                进入
                            </router-link>
                        </div>
                    </div>
                </div>
                
                <div v-else class="p-12 text-center">
                    <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p class="text-[#6e7781] text-base mb-4">还没有加入任何房间</p>
                    <div class="flex items-center justify-center gap-3">
                        <router-link to="/room/create" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors">
                            创建房间
                        </router-link>
                        <router-link to="/room/search" class="inline-flex items-center px-4 py-2 text-sm font-medium text-[#24292f] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] hover:border-[#babbbd] transition-colors">
                            搜索房间
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoomStore } from '@/store/modules/room'

const roomStore = useRoomStore()
</script>