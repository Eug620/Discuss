<template>
    <div class="w-full h-full overflow-y-auto" :style="{ backgroundColor: 'var(--bgColor)' }">
        <div class="w-full max-w-xl mx-auto px-4 py-3">
            <!-- 搜索框 -->
            <div class="card p-4">
                <div class="text-center mb-4">
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" :style="{ background: 'var(--primaryGradient)' }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <h2 class="text-base font-semibold" :style="{ color: 'var(--textColor)' }">搜索好友</h2>
                    <p class="text-sm mt-0.5" :style="{ color: 'var(--textSecondary)' }">通过用户名查找并添加好友</p>
                </div>

                <div class="search-wrapper" style="width: 100%;">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="输入用户名搜索..." 
                        @keyup.enter="handleSearch" 
                        v-model.trim="username"
                        class="search-input"
                        style="height: 40px; border-radius: 10px;">
                </div>
            </div>

            <!-- 搜索结果 -->
            <div v-if="result.length > 0" class="mt-3 flex flex-col gap-2">
                <div 
                    v-for="item in result" 
                    :key="item.id" 
                    class="card p-3 flex items-center gap-2 card-hover">
                    <div class="avatar">{{ item.username?.charAt(0)?.toUpperCase() }}</div>
                    <div class="flex-1 min-w-0">
                        <div class="font-medium" :style="{ color: 'var(--textColor)' }">{{ item.username }}</div>
                        <div class="text-sm truncate" :style="{ color: 'var(--textSecondary)' }">{{ item.email }}</div>
                    </div>
                    <button 
                        v-if="(item.id && !friendStore.getFriendMap[item.id]) && item.id !== userStore.userInfo.id" 
                        @click="handleJoin(item.id)" 
                        class="btn" style="padding: 6px 12px; font-size: 13px;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        添加
                    </button>
                    <span v-else-if="item.id === userStore.userInfo.id" class="status-badge">自己</span>
                    <span v-else class="status-badge success">已添加</span>
                </div>
            </div>

            <div v-else-if="hasSearched" class="empty-state" style="padding: 40px 20px;">
                <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span>未找到相关用户</span>
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
const hasSearched = ref(false)

const handleSearch = () => {
    if (!username.value) return
    hasSearched.value = true
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
            hasSearched.value = false
        }
    })
};
</script>
<style lang="scss"></style>