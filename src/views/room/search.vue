<template>
  <div class="w-full h-full overflow-y-auto" :style="{ backgroundColor: 'var(--bgColor)' }">
    <div class="w-full max-w-xl mx-auto px-4 py-3">
      <!-- 搜索框 -->
      <div class="card p-4">
        <div class="text-center mb-4">
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" :style="{ background: 'var(--primaryGradient)' }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </div>
            <h2 class="text-base font-semibold" :style="{ color: 'var(--textColor)' }">搜索房间</h2>
            <p class="text-sm mt-0.5" :style="{ color: 'var(--textSecondary)' }">通过房间名查找并加入房间</p>
        </div>

        <div class="search-wrapper" style="width: 100%;">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
                type="text"
                placeholder="输入房间名搜索..."
                @keyup.enter="handleSearch"
                v-model.trim="roomName"
                class="search-input"
                style="height: 40px; border-radius: 10px;">
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-if="result.length > 0" class="mt-3 flex flex-col gap-2">
        <div
            v-for="item in result"
            :key="item.id"
            class="card p-3 card-hover">
            <div class="flex items-center gap-2">
                <div class="avatar purple">{{ item.name?.charAt(0)?.toUpperCase() }}</div>
                <div class="flex-1 min-w-0">
                    <div class="font-medium" :style="{ color: 'var(--textColor)' }">{{ item.name }}</div>
                    <div class="text-sm truncate" :style="{ color: 'var(--textSecondary)' }">{{ item.description || '暂无描述' }}</div>
                    <div class="text-xs mt-1" :style="{ color: 'var(--textSecondary)' }">创建者：{{ item.user_info.username }}</div>
                </div>
                <button
                    v-if="!roomStore.getRoomMap[item.id]"
                    @click="handleJoin(item.id)"
                    class="btn" style="padding: 6px 12px; font-size: 13px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    加入
                </button>
                <span v-else class="status-badge success">已加入</span>
            </div>
        </div>
      </div>

      <div v-else-if="hasSearched" class="empty-state" style="padding: 40px 20px;">
        <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <span>未找到相关房间</span>
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
const hasSearched = ref(false);

const handleSearch = () => {
  if (!roomName.value) return
  hasSearched.value = true
  ServerApi.SearchRoom(roomName.value).then((res: any) => {
    if (res.code === 200) {
      result.value = res.data;
    }
  });
};

const handleJoin = (room_id: string) => {
    ServerApi.apply({ room_id }).then((res: any) => {
        if (res.code === 200) {
            roomName.value = ''
            result.value = []
            hasSearched.value = false
        }
    })
};
</script>
<style lang="scss">
</style>