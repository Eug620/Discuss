<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 22:52:24
 * @FilePath     : \e-talk\src\views\room\search.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="room-search p-4 bg-[#f6f8fa] min-h-full">
        <div class="max-w-2xl mx-auto">
            <!-- 搜索框 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-4 mb-4">
                <div class="flex gap-2">
                    <div class="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="输入房间名搜索..." 
                            @keyup.enter="handleSearch" 
                            v-model.trim="roomName"
                            class="w-full px-4 py-2 text-sm border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-colors"
                        />
                    </div>
                    <button 
                        @click="handleSearch"
                        class="px-4 py-2 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors"
                    >
                        搜索
                    </button>
                </div>
            </div>

            <!-- 搜索结果 -->
            <div v-if="result.length > 0" class="bg-white rounded-md border border-[#d0d7de] divide-y divide-[#f0f0f0]">
                <div 
                    v-for="item in result" 
                    :key="item.id" 
                    class="p-4 hover:bg-[#f6f8fa] transition-colors"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3 flex-1">
                            <!-- 房间图标 -->
                            <div class="w-10 h-10 rounded-md bg-gradient-to-br from-[#8957e5] to-[#6e40c9] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {{ item.name?.charAt(0)?.toUpperCase() || 'R' }}
                            </div>
                            
                            <!-- 房间信息 -->
                            <div class="flex-1">
                                <p class="text-sm font-medium text-[#24292f]">
                                    {{ item.name }}
                                </p>
                                <p v-if="item.description" class="text-xs text-[#6e7781] mt-0.5 truncate">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>

                        <!-- 操作按钮 -->
                        <div v-if="!roomStore.getRoomMap[item.id]" class="ml-4 flex-shrink-0">
                            <button 
                                @click="handleJoin(item.id)"
                                class="px-3 py-1.5 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors"
                            >
                                加入房间
                            </button>
                        </div>
                        <div v-else class="ml-4 flex-shrink-0">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#dafbe1] text-[#1a7f37]">
                                已加入
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 空状态 -->
            <div v-else-if="roomName" class="bg-white rounded-md border border-[#d0d7de] p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p class="text-[#6e7781] text-base">未找到相关房间</p>
            </div>

            <!-- 初始状态 -->
            <div v-else class="bg-white rounded-md border border-[#d0d7de] p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p class="text-[#6e7781] text-base mb-4">搜索并加入房间</p>
                <p class="text-sm text-[#6e7781]">输入房间名开始搜索</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoomStore } from "@/store/modules/room";
import ServerApi from "@/api";
import { Room } from "@/store/modules/room";
const roomName = ref("");

const result = ref<Room[]>([]);
const roomStore = useRoomStore();

const handleSearch = () => {
  ServerApi.SearchRoom(roomName.value).then((res: any) => {
    if (res.code === 200) {
      result.value = res.data;
    }
  });
};

const handleJoin = (room_id: string) => {
    ServerApi.apply({room_id}).then((res: any) => {
        if (res.code === 200) {
            roomName.value = ''
            result.value = []
        }
    })
};
</script>
<style lang="scss">
</style>