<template lang="">
    <div class="w-full h-full flex flex-col gap-4 ">
        <div class="w-full h-full p-4">
                <div v-for="message in getHistory" :key="message.id" class="w-full h-auto p-2 border-b border-gray-300" :style="{
            textAlign: message.sender === userStore.userInfo.id ? 'right' : 'left',
           }">
            <div class="flex">
                <div class="px-2" v-if="message.sender !== userStore.userInfo.id" >
                  [{{getUserInfo(message.sender)}}]
                </div>
                <div class=flex-1> {{ message.content }} </div>
                <div class="px-2" v-if="message.sender === userStore.userInfo.id" >
                  [{{ userStore.userInfo.username}}]
                </div>
            </div>
            <div style="font-size: 12px; color: #999;">
                {{ new Date(message.timestamp).toLocaleString() }}
            </div>
           </div>
        </div>
        <div class="w-full h-100 border-t border-gray-300 p-4 relative">
            <textarea id="story" name="story" placeholder="Type your message..." v-model.trim="story" rows="5" cols="33" class="w-full h-full textarea ">
            </textarea>
            <button class="absolute bottom-12 right-12 " @click="handleSend">Send</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Socket } from "socket.io-client";
import { computed } from "vue";

const socketStore = useSocketStore();
const userStore = useUserStore();
const story = ref("");
const route = useRoute();

// 获取房间消息历史
const getHistory = computed(() => {
  return socketStore.roomMessageMap.get(route.params.id as string) || [];
});
// 获取房间成员
const getMember = computed(() => {
  return socketStore.roomMemberMap.get(route.params.id as string) || [];
});
// 获取用户信息
const getUserInfo = (user_id: string) => {
  return getMember.value.find((item: any) => item.user_id === user_id)?.user_info?.username;
}

// 发送消息
const handleSend = () => {
  (socketStore.socket as Socket).emit("room", {
    room: route.params.id,
    content: story.value,
  });
  story.value = "";
};
</script>
<style lang="">
</style>