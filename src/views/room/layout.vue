<template lang="">
  <div class="w-full h-full flex">
      <div class="w-[240px] flex flex-col sidebar-card" :style="{ borderRadius: '0', borderLeft: 'none', borderTop: 'none', borderBottom: 'none' }">
        <!-- 头部搜索 -->
        <div class="flex items-center gap-2 p-2 border-b" :style="{ borderColor: 'var(--borderColor)' }">
          <div class="search-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" placeholder="搜索房间" v-model="roomName" class="search-input">
          </div>
          <router-link to="/room/search" class="icon-btn" title="搜索房间">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </router-link>
          <router-link to="/room/create" class="icon-btn" title="创建房间">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </router-link>
        </div>

        <!-- 房间列表 -->
        <div class="sidebar-list">
          <div v-for="room in getRooms" @click="handleRoomClick(room)" :key="room.id"
              class="sidebar-item" :class="{ active: paramsID === room.room_id }">
              <div class="avatar purple">{{ room.room_info.name?.charAt(0)?.toUpperCase() }}</div>
              <div class="flex-1 min-w-0">
                <div class="item-name">{{ room.room_info.name }}</div>
              </div>
              <span class="text-xs" :style="{ color: 'var(--textSecondary)' }">
                {{ socketStore.roomMemberOnlineMap.get(room.room_id)?.size || 0 }}/{{ socketStore.roomMemberMap.get(room.room_id)?.length || 0 }}
              </span>
          </div>
          
          <div v-if="getRooms.length === 0" class="empty-state">
            <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span>暂无房间</span>
          </div>
        </div>
      </div>
      <div class="w-0 flex-auto">
          <router-view></router-view>
      </div>
  </div>
</template>
<script setup lang="ts">
import { useRoomStore } from "@/store/modules/room";
import { useSocketStore } from "@/store/modules/socket";

import router from "@/router";
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const roomStore = useRoomStore();
const socketStore = useSocketStore();

const roomName = ref('')
const getRooms = computed(() => {
  return roomStore.rooms.filter((room: any) => room.room_info.name.includes(roomName.value))
})

const route = useRoute()
const paramsID = ref<string | undefined>(undefined)

watchEffect(() => {
  paramsID.value = route.params?.id as string
})

const handleRoomClick = (room: any) => {
  router.push({
    name: "room-message",
    params: {
      id: room.room_id,
    },
  });
};
</script>
<style lang="">
</style>