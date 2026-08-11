<template>
    <div class="w-full h-full overflow-y-auto" :style="{ backgroundColor: 'var(--bgColor)' }">
        <div class="w-full max-w-2xl mx-auto px-4 py-3" style="max-width: 672px;">
            <!-- 个人信息卡片 -->
            <div class="card p-4 mb-3">
                <div class="text-center mb-4">
                    <div class="avatar mx-auto mb-2" style="width: 56px; height: 56px; border-radius: 14px; font-size: 22px;">
                        {{ userStore.userInfo.username?.charAt(0)?.toUpperCase() }}
                    </div>
                    <h2 class="text-lg font-semibold" :style="{ color: 'var(--textColor)' }">{{ userStore.userInfo.username }}</h2>
                    <p class="text-sm mt-1" :style="{ color: 'var(--textSecondary)' }">{{ userStore.userInfo.email }}</p>
                </div>

                <div class="flex flex-col gap-1">
                    <div v-for="(item, k) in userStore.userInfo" :key="k" class="info-item">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            </svg>
                        </div>
                        <span class="info-item-value capitalize">{{ k }}:</span>
                        <span class="text-sm" :style="{ color: 'var(--textColor)' }">{{ item }}</span>
                    </div>
                </div>
            </div>

            <!-- 系统信息 -->
            <div class="card p-4 mb-3">
                <h3 class="text-sm font-semibold mb-2" :style="{ color: 'var(--textColor)' }">系统信息</h3>
                <div class="flex flex-col gap-1">
                    <div class="info-item">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <span class="info-item-value">Time:</span>
                        <span class="text-sm" :style="{ color: 'var(--textColor)' }">{{__COMMIT_INFO__.time}}</span>
                    </div>
                    <div class="info-item">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <span class="info-item-value">Author:</span>
                        <span class="text-sm" :style="{ color: 'var(--textColor)' }">{{__COMMIT_INFO__.author}}</span>
                    </div>
                    <div class="info-item">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                        </div>
                        <span class="info-item-value">Commit:</span>
                        <span class="info-item-value wrap" :style="{ color: 'var(--textColor)', fontFamily: 'monospace', wordBreak: 'break-all' }">{{__COMMIT_INFO__.hash}}</span>
                    </div>
                </div>
            </div>

            <!-- 数据管理 -->
            <div class="card p-4">
                <h3 class="text-sm font-semibold mb-2" :style="{ color: 'var(--textColor)' }">数据管理</h3>
                <div class="flex flex-col gap-1">
                    <div class="info-item card-hover" @click="handleExport" style="cursor: pointer;">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <span class="info-item-value">导出聊天记录</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                    <div class="info-item card-hover" @click="handleImport" style="cursor: pointer;">
                        <div class="info-item-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </div>
                        <span class="info-item-value">导入聊天记录</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <input class="hidden" id="chooseHistoryFile" type="file" accept="*.json">
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { useDBStore } from '@/store/modules/database'
import { useSocketStore } from '@/store/modules/socket'
import { downloadJSON } from '@/utils/index'
import { onMounted, reactive } from 'vue'
import { sortBy, uniqWith, isEqual } from 'lodash-es';

const userStore = useUserStore()
const socketStore = useSocketStore()
const dbStore = useDBStore()

const __COMMIT_INFO__ = reactive({
    hash: __COMMIT_HASH__,
    author: __COMMIT_AUTHOR__,
    time: __COMMIT_TIME__
})

const handleExport = () => {
    let _obj: any = {}
    dbStore.database?.iterate(function (value, key, iterationNumber) {
        _obj[key] = Object.fromEntries(value as any)
    }).then(function () {
        downloadJSON(_obj, `${userStore.userInfo.id}.json`)
    }).catch(function (err) {
        console.log(err);
    });
}

const handleImport = () => {
    document.getElementById('chooseHistoryFile')?.click()
}

onMounted(() => {
    document.getElementById('chooseHistoryFile')?.addEventListener('change', async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return;
        if (!file.name.startsWith(userStore.userInfo.id as string)) alert('请导入您自己的聊天记录');

        try {
            const text = await file.text();
            const { Room_Message, User_Message } = JSON.parse(text);
            Object.entries(Room_Message).forEach(([key, value]: any) => {
                let roomMessage = socketStore.roomMessageMap.get(key)
                const unique = uniqWith([...(roomMessage as []), ...value], isEqual)
                socketStore.roomMessageMap.set(key, sortBy(unique, 'timestamp'))
            });
            Object.entries(User_Message).forEach(([key, value]: any) => {
                let userMessage = socketStore.userMessageMap.get(key)
                const unique = uniqWith([...(userMessage as []), ...value], isEqual)
                socketStore.userMessageMap.set(key, sortBy(unique, 'timestamp'))
            });
        } catch (error) {
            console.error('解析失败:', error);
            alert('文件内容不是有效的 JSON 格式');
        }
    })
})
</script>
<style lang="scss">
</style>