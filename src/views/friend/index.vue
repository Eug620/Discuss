<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 23:36:26
 * @FilePath     : \e-talk\src\views\friend\index.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template lang="">
  <div class="w-full h-full flex bg-[#f6f8fa]">
    <div class="w-full h-full flex flex-col gap-0">
        <!-- 头部 -->
        <div class="w-full bg-white border-b border-[#d0d7de] px-4 py-4 flex items-center justify-between h-16 flex items-center content-center">
            <div class="flex items-center gap-3">
              <div class="text-base font-medium text-[#24292f]">{{ getFriendInfo.username }}</div>
            </div>
        </div>
        
        <!-- 消息区域 -->
        <div class="w-full flex-1 p-4 overflow-y-auto" id="messageContainer">
           <div v-for="message in getHistory" :key="message.id" class="w-full mb-4" :class="[
            message.sender === route.params.id ? 'text-left' : 'text-right',
           ]">
            <div class="inline-block max-w-[70%]">
              <div class="text-xs text-[#6e7781] mb-1 px-1">
                <span v-if="message.type && message.sender !== route.params.id" class="mr-2">
                  {{ formatFileSize(message.size) }}
                </span>
                {{ dayjs(message.timestamp).fromNow() }}
                <span v-if="message.type && message.sender === route.params.id" class="ml-2">
                  {{ formatFileSize(message.size) }}
                </span>
              </div>
              <div class="inline-block px-4 py-2 rounded-md relative" :class="[
                message.sender === route.params.id 
                  ? 'bg-white border border-[#d0d7de] text-[#24292f]' 
                  : 'bg-[#1f6feb] text-white border border-[#1f6feb]'
              ]">
                <img 
                  v-if="message.type === 'image'" 
                  :src="`${VITE_APP_API_BASE_URL}${message.content}`" 
                  alt="图片已失效" 
                  @click="handlePreviewImage(message.content)" 
                  class="h-24 rounded-md cursor-pointer"
                />
                <a 
                  v-else-if="message.type === 'file'" 
                  class="text-[#0969da] no-underline hover:underline flex items-center gap-2" 
                  :href="`${VITE_APP_API_BASE_URL}${message.content}`" 
                  target="_blank"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {{ message.originalname }}
                </a>
                <span v-else class="whitespace-pre-wrap text-sm">
                  {{ message.content }}
                </span>
              </div>
            </div>
           </div>
        </div>
        
        <!-- 输入区域 -->
        <div class="w-full bg-white border-t border-[#d0d7de] p-4">
            <div class="relative">
                <textarea 
                    id="story" 
                    name="story" 
                    placeholder="输入消息..." 
                    v-enter="handleSend" 
                    v-model.trim="story" 
                    rows="5"
                    class="w-full px-4 py-3 text-sm border-0 rounded-md focus:outline-none focus:ring-0 transition-colors resize-none"
                ></textarea>
                <div class="absolute bottom-3 right-3 flex gap-2">
                    <button 
                        @click="handleSendImage" 
                        class="p-2 text-[#6e7781] hover:text-[#24292f] hover:bg-[#eaeef2] rounded-md transition-colors"
                        title="发送图片"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                    <button 
                        @click="handleSendFile" 
                        class="p-2 text-[#6e7781] hover:text-[#24292f] hover:bg-[#eaeef2] rounded-md transition-colors"
                        title="发送文件"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 侧边栏 -->
    <div class="w-[200px] bg-white border-l border-[#d0d7de] ">
        <div class="space-y-3 text-sm flex-1">
          <div class="text-sm font-medium text-[#24292f]  pb-2 border-b border-[#d0d7de] p-4 h-16 flex items-center">群成员</div>
          <div class="p-2 flex flex-col gap-1">
            <div class="flex justify-between">
                <span class="text-[#6e7781]">用户名</span>
                <span class="text-[#24292f]">{{ getFriendInfo.username }}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-[#6e7781]">状态</span>
                <span :class="getFriendStatus ? 'text-[#1a7f37]' : 'text-[#cf222e]'">{{ getFriendStatus ? '在线' : '离线' }}</span>
            </div>
            <div v-if="getFriendInfo.email" class="flex flex-col">
                <span class="text-[#6e7781] mb-1">邮箱</span>
                <span class="text-[#24292f] break-all">{{ getFriendInfo.email }}</span>
            </div>
            <div v-if="getFriendInfo.createdAt" class="flex flex-col">
                <span class="text-[#6e7781] mb-1">注册时间</span>
                <span class="text-[#24292f]">{{ new Date(getFriendInfo.createdAt).toLocaleString() }}</span>
            </div>
          </div>
        </div>
    </div>

    <input class="hidden" id="chooseImage" type="file" accept="image/*">
    <input class="hidden" id="chooseFile" type="file" accept="*">
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/store/modules/socket";
import { useFriendStore } from "@/store/modules/friend";
import { computed, onMounted, ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { Socket } from "socket.io-client";
import dayjs from "@/plugin/dayjs";
import serverApi from "@/api";
import { vEnter } from "@/directives/vEnter";
import { formatFileSize, scrollToBottom } from "@/utils/index";

const VITE_APP_API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const socketStore = useSocketStore();
const friendStore = useFriendStore();

const story = ref("");
const route = useRoute();

const getHistory = computed(() => {
  return socketStore.userMessageMap.get(route.params.id as string) || [];
});

const getFriendInfo = computed(() => {
  return friendStore.getFriendMap[route.params.id as string]?.friend_info || {};
});

const getFriendStatus = computed(() => {
  return friendStore.getFriendMap[route.params.id as string]?.status || false;
});

const handleSend = () => {
  if (!story.value) return;
  (socketStore.socket as Socket).emit("user", {
    sender: route.params.id,
    content: story.value,
  });
  story.value = "";
};
const handleSendImage = () => {
  document.getElementById("chooseImage")?.click();
};
const handleSendFile = () => {
  document.getElementById("chooseFile")?.click();
};
onMounted(() => {
  document.getElementById("chooseImage")?.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file as Blob);
    serverApi.UploadUser(formData).then((res: any) => {
      if (res.code === 200) {
        (socketStore.socket as Socket).emit("user", {
          size: res.data.size,
          sender: route.params.id,
          content: `/${res.data.path}`,
          type: "image",
        });
      }
    });
  });
  document.getElementById("chooseFile")?.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file as Blob);
    serverApi.UploadUser(formData).then((res: any) => {
      if (res.code === 200) {
        (socketStore.socket as Socket).emit("user", {
          size: res.data.size,
          sender: route.params.id,
          originalname: res.data.originalname,
          content: `/${res.data.path}`,
          type: "file",
        });
      }
    });
  });

  scrollToBottom("messageContainer");
});

// 自动滚到最新消息
watch(
  () => getHistory.value,
  () => {
    scrollToBottom("messageContainer");
  },
  { deep: true }
);

const handlePreviewImage = (url: string) => {
  window.open(`${VITE_APP_API_BASE_URL}${url}`);
};
</script>
<style lang="">
</style>