<template lang="">
  <div class="w-full h-full flex">
      <div class="w-[200px] border-r border-gray-300">
        <div v-for="room in userStore.rooms" @click="handleRoomClick(room)" :key="room.id"
              class="cursor-pointer">{{ room.name }}</div>
      </div>
      <div class="flex-auto">
          <router-view></router-view>
      </div>
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { ref } from "vue";
import { useRoute } from "vue-router";
import router from '@/router'

import { Socket } from "socket.io-client";
import { computed } from "vue";

const socketStore = useSocketStore();
const userStore = useUserStore();
const story = ref("");
const route = useRoute();

const handleRoomClick = (room: any) => {
    router.push({
        name: 'room-message',
        params: {
            roomId: room.id
        }
    })
}
</script>
<style lang="">
</style>