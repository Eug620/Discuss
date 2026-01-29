<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 22:54:25
 * @FilePath     : \e-talk\src\views\friend\search.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="friend-search p-4 bg-[#f6f8fa] min-h-full">
        <div class="max-w-2xl mx-auto">
            <!-- 搜索框 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-4 mb-4">
                <div class="flex gap-2">
                    <div class="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="输入用户名搜索..." 
                            @keyup.enter="handleSearch" 
                            v-model.trim="username"
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
                            <!-- 头像 -->
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                {{ item.username?.charAt(0)?.toUpperCase() || 'U' }}
                            </div>
                            
                            <!-- 用户信息 -->
                            <div class="flex-1">
                                <p class="text-sm font-medium text-[#24292f]">
                                    {{ item.username }}
                                </p>
                                <p v-if="item.email" class="text-xs text-[#6e7781] mt-0.5">
                                    {{ item.email }}
                                </p>
                            </div>
                        </div>

                        <!-- 操作按钮 -->
                        <div v-if="(item.id && !friendStore.getFriendMap[item.id]) && item.id !== userStore.userInfo.id" class="ml-4 flex-shrink-0">
                            <button 
                                @click="handleJoin(item.id)"
                                class="px-3 py-1.5 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors"
                            >
                                添加好友
                            </button>
                        </div>
                        <div v-else class="ml-4 flex-shrink-0">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eaeef2] text-[#57606a]">
                                {{ item.id === userStore.userInfo.id ? '你自己' : '已是好友' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 空状态 -->
            <div v-else-if="username" class="bg-white rounded-md border border-[#d0d7de] p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p class="text-[#6e7781] text-base">未找到相关用户</p>
            </div>

            <!-- 初始状态 -->
            <div v-else class="bg-white rounded-md border border-[#d0d7de] p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-[#6e7781] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p class="text-[#6e7781] text-base mb-4">搜索用户并添加为好友</p>
                <p class="text-sm text-[#6e7781]">输入用户名开始搜索</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ServerApi from "@/api";
import { User } from "@/store/modules/user";
import { useFriendStore } from "@/store/modules/friend";
import { useUserStore } from "@/store/modules/user";


const username = ref('')
const result = ref<User[]>([]);
const friendStore = useFriendStore()
const userStore = useUserStore()

const handleSearch = () => {
    ServerApi.SearchUser(username.value).then((res: any) => {
        if (res.code === 200) {
            result.value = res.data;
        }
    });
};

const handleJoin = (apply_user_id?: string) => {
    ServerApi.apply({ apply_user_id }).then((res: any) => {
        if (res.code === 200) {
            username.value = ''
            result.value = []
        }
    })
};
</script>
<style lang="scss"></style>