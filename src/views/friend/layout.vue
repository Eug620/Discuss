<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 21:15:50
 * @FilePath     : \e-talk\src\views\friend\layout.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
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
                          placeholder="搜索好友..." 
                          v-model="username" 
                          class="w-full  px-3 py-2 text-sm border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-colors"
                      />
                  </div>
                  <router-link 
                      to="/friend/search"
                      class="p-2  line-height-10 text-[#6e7781] hover:text-[#24292f] hover:bg-[#f3f4f6] rounded-md transition-colors"
                      title="搜索好友"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                  </router-link>
              </div>
          </div>

          <!-- 好友列表 -->
          <div class="flex-1 overflow-y-auto">
              <div 
                  v-for="friend in getFriends" 
                  @click="handleFriendClick(friend)" 
                  :key="friend.id"
                  class="cursor-pointer p-3 hover:bg-[#f6f8fa] transition-colors border-b border-[#f0f0f0] last:border-0"
                  :class="{
                      'bg-[#ddf4ff] border-l-2 border-l-[#0969da]': isActive(friend.friend_info.id)
                  }"
              >
                  <div class="flex items-center gap-3">
                      <!-- 头像 -->
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#1a88e8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {{ friend.friend_info.username?.charAt(0)?.toUpperCase() || 'U' }}
                      </div>
                      
                      <!-- 用户信息 -->
                      <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-[#24292f] truncate">
                              {{ friend.friend_info.username }}
                          </p>
                          <p v-if="friend.friend_info.email" class="text-xs text-[#6e7781] truncate">
                              {{ friend.friend_info.email }}
                          </p>
                      </div>

                      <!-- 在线状态 -->
                      <div class="flex-shrink-0">
                          <div 
                              class="w-2.5 h-2.5 rounded-full"
                              :class="friend.status ? 'bg-[#1a7f37]' : 'bg-[#6e7781]'"
                          ></div>
                      </div>
                  </div>
              </div>

              <!-- 空状态 -->
              <div v-if="getFriends.length === 0" class="p-8 text-center">
                  <svg class="w-12 h-12 mx-auto text-[#6e7781] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p class="text-sm text-[#6e7781]">暂无好友</p>
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
import { useFriendStore } from "@/store/modules/friend";
import router from "@/router";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const friendStore = useFriendStore();
const route = useRoute();
const username = ref('')

const getFriends = computed(() => {
    return friendStore.friends.filter((friend: any) => friend.friend_info.username.includes(username.value))
})

const handleFriendClick = (friend: any) => {
  router.push({
    name: "friend-info",
    params: {
      id: friend.friend_info.id,
    },
  });
};

const isActive = (friendId: string) => {
    return route.params.id === friendId;
};
</script>
<style lang="">
</style>