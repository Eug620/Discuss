<template lang="">
  <div class="w-full h-full flex">
      <div class="w-[200px] border-r border-gray-300">
        <div v-for="friend in userStore.friends" @click="handleFriendClick(friend)" :key="friend.id"
              class="cursor-pointer p-2">{{ friend.friend_info.username }}</div>
      </div>
      <div class="flex-auto">
          <router-view></router-view>
      </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import router from "@/router";

const userStore = useUserStore();

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