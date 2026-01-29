<template>
    <div class="w-full h-full  overflow-auto p-8 bg-[#f6f8fa]">
        <div class="max-w-4xl mx-auto">
            <!-- 用户基本信息卡片 -->
            <div class="bg-white rounded-md border border-[#d0d7de] p-6 mb-6">
                <div class="flex items-start gap-6">
                    <!-- 头像区域 -->
                    <div class="flex-shrink-0">
                        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-4xl font-bold shadow-sm">
                            {{ userStore.userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
                        </div>
                    </div>
                    
                    <!-- 基本信息 -->
                    <div class="flex-1">
                        <h1 class="text-2xl font-semibold text-[#24292f] mb-2">
                            {{ userStore.userInfo.username || '未设置用户名' }}
                        </h1>
                        <p class="text-[#6e7781] text-base mb-4">
                            {{ userStore.userInfo.email || '未设置邮箱' }}
                        </p>
                        <div class="flex items-center gap-4">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ddf4ff] text-[#0969da] border border-[#b6e3ff]">
                                {{ userStore.userInfo.role || '用户' }}
                            </span>
                            <button class="text-sm text-[#0969da] hover:underline">
                                编辑资料
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 详细信息卡片 -->
            <div class="bg-white rounded-md border border-[#d0d7de]">
                <!-- 卡片标题 -->
                <div class="px-6 py-4 border-b border-[#d0d7de]">
                    <h2 class="text-base font-medium text-[#24292f]">个人资料</h2>
                </div>

                <!-- 信息列表 -->
                <div class="p-6">
                    <div v-for="(item, k) in userStore.userInfo" :key="k" class="flex items-start py-4 border-b border-[#f0f0f0] last:border-0">
                        <div class="w-[140px] flex-shrink-0">
                            <span class="text-sm font-medium text-[#24292f]">
                                {{ formatKey(k) }}
                            </span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <span class="text-sm text-[#24292f] break-words">
                                {{ item || '-' }}
                            </span>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <button class="text-xs text-[#0969da] hover:underline">
                                编辑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

// 格式化字段名为中文
const formatKey = (key: string): string => {
    const keyMap: Record<string, string> = {
        username: '用户名',
        email: '邮箱',
        password: '密码',
        id: '用户ID',
        role: '角色',
        createdAt: '创建时间',
        updatedAt: '更新时间'
    }
    return keyMap[key] || key
}
</script>