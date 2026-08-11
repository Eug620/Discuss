<template lang="">
  <div class="w-full h-full flex">
      <div class="w-[240px] flex flex-col sidebar-card" :style="{ borderRadius: '0', borderLeft: 'none', borderTop: 'none', borderBottom: 'none' }">
        <!-- 头部搜索 -->
        <div class="flex items-center gap-2 p-2 border-b" :style="{ borderColor: 'var(--borderColor)' }">
          <div class="search-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" placeholder="搜索好友" v-model="username" class="search-input">
          </div>
          <router-link to="/friend/search" class="icon-btn" title="添加好友">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </router-link>
        </div>

        <!-- 好友列表 -->
        <div class="sidebar-list">
          <div 
            v-for="friend in getFriends" 
            @click="handleFriendClick(friend)" 
            :key="friend.id"
            class="sidebar-item" 
            :class="{ active: paramsID === friend.friend_info.id }">
            <div class="avatar" :class="{ online: friendStore.getFriendMap[friend.friend_info.id]?.status }">
              {{ friend.friend_info.username?.charAt(0)?.toUpperCase() }}
            </div>
            <span class="item-name">{{ friend.friend_info.username }}</span>
            <span v-if="friendStore.getFriendMap[friend.friend_info.id]?.status" class="status-dot online"></span>
          </div>
          
          <div v-if="getFriends.length === 0" class="empty-state">
            <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span>暂无好友</span>
          </div>
        </div>
      </div>
      <div class="w-0 flex-auto">
          <router-view></router-view>
      </div>
  </div>
</template>
<script setup lang="ts">
import { useFriendStore } from "@/store/modules/friend";
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, computed, watchEffect } from "vue";

const friendStore = useFriendStore();
const username = ref('')
const getFriends = computed(() => {
  return friendStore.friends.filter((friend: any) => friend.friend_info.username.includes(username.value))
})

const route = useRoute()
const paramsID = ref<string | undefined>(undefined)

watchEffect(() => {
  paramsID.value = route.params?.id as string
})

const handleFriendClick = (friend: any) => {
  router.push({
    name: "friend-info",
    params: {
      id: friend.friend_info.id,
    },
  });
};
</script>
<style lang="">
</style>