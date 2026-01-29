<template lang="">
  <div class="w-full h-full flex bg-[#f6f8fa]">
      <!-- 侧边栏 -->
      <div class="w-[280px] bg-white border-r border-[#d0d7de] flex flex-col">
          <!-- 搜索区域 -->
          <div class="p-4 border-b border-[#d0d7de] h-16 flex items-center content-center">
              <div class="flex gap-2">
                  <div class="relative flex-1">
                      <input 
                          type="text" 
                          placeholder="搜索房间..." 
                          v-model="roomName" 
                          class="w-full px-3 py-2 text-sm border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-colors"
                      />
                  </div>
                  <router-link 
                      to="/room/search"
                      class="p-2 text-[#6e7781] hover:text-[#24292f] hover:bg-[#f3f4f6] rounded-md transition-colors"
                      title="搜索房间"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </router-link>
                  <router-link 
                      to="/room/create"
                      class="p-2 text-[#6e7781] hover:text-[#24292f] hover:bg-[#f3f4f6] rounded-md transition-colors"
                      title="创建房间"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </router-link>
              </div>
          </div>

          <!-- 房间列表 -->
          <div class="flex-1 overflow-y-auto">
              <div 
                  v-for="room in getRooms" 
                  @click="handleRoomClick(room)" 
                  :key="room.id"
                  class="cursor-pointer p-3 hover:bg-[#f6f8fa] transition-colors border-b border-[#f0f0f0] last:border-0"
                  :class="{
                      'bg-[#ddf4ff] border-l-2 border-l-[#0969da]': isActive(room.room_id)
                  }"
              >
                  <div class="flex items-center gap-3">
                      <!-- 房间图标 -->
                      <div class="w-10 h-10 rounded-md bg-gradient-to-br from-[#8957e5] to-[#6e40c9] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {{ room.room_info.name?.charAt(0)?.toUpperCase() || 'R' }}
                      </div>
                      
                      <!-- 房间信息 -->
                      <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-[#24292f] truncate">
                              {{ room.room_info.name }}
                          </p>
                          <p v-if="room.room_info.description" class="text-xs text-[#6e7781] truncate">
                              {{ room.room_info.description }}
                          </p>
                      </div>
                  </div>
              </div>

              <!-- 空状态 -->
              <div v-if="getRooms.length === 0" class="p-8 text-center">
                  <svg class="w-12 h-12 mx-auto text-[#6e7781] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p class="text-sm text-[#6e7781]">暂无房间</p>
              </div>
          </div>
      </div>

      <!-- 主内容区域 -->
      <div class="flex-auto">
          <router-view></router-view>
      </div>
  </div>
</template>
<script setup lang="ts">
import { useRoomStore } from "@/store/modules/room";
import router from "@/router";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
// https://heroicons.com/
// 引入 heroicons 图标

const roomStore = useRoomStore();
const route = useRoute();
const roomName = ref('')

const getRooms = computed(() => {
    return roomStore.rooms.filter((room: any) => room.room_info.name.includes(roomName.value))
})

const handleRoomClick = (room: any) => {
  router.push({
    name: "room-message",
    params: {
      id: room.room_id,
    },
  });
};

const isActive = (roomId: string) => {
    return route.params.id === roomId;
};
</script>
<style lang="">
</style>