<template lang="">
  <div class="w-full h-full flex">
    <!-- 聊天主区域 -->
    <div class="flex-1 flex flex-col" :style="{ backgroundColor: 'var(--bgColor)' }">
      <!-- 头部 -->
      <div class="chat-header">
        <div class="header-title">
          <div class="header-avatar">{{ getFriendInfo.username?.charAt(0)?.toUpperCase() }}</div>
          <span class="header-name">{{ getFriendInfo.username }}</span>
        </div>
        <div class="info-toggle" @click="handleSwitchInfo" title="{{ infoVisiable ? '隐藏详情' : '显示详情' }}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="chat-messages" id="messageContainer">
        <div v-for="message in getHistory" :key="message.id" class="message-row"
          :class="{ self: message.sender === userStore.userInfo.id }">
          <div>
            <div class="message-time">
              {{ dayjs(message.timestamp).fromNow() }}
              <span v-if="message.type" class="file-size">· {{ formatFileSize(message.size) }}</span>
            </div>
            <div class="message-bubble" :class="message.sender === userStore.userInfo.id ? 'self' : 'other'">
              <Comment :message="message"/>
            </div>
          </div>
        </div>

        <div v-if="getHistory.length === 0" class="empty-state" style="flex: 1; justify-content: center;">
          <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span>开始聊天吧</span>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input-area">
        <div class="input-toolbar">
          <div class="toolbar-btn" @click="handleSendImage" title="发送图片">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <div class="toolbar-btn" @click="handleSendFile" title="发送文件">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </div>
        </div>
        <div class="textarea-wrapper">
          <textarea 
            class="textarea flex-1" 
            placeholder="输入消息，Enter 发送，Shift+Enter 换行..." 
            v-enter="handleSend" 
            v-model.trim="story" 
            rows="3"></textarea>
        </div>
      </div>
    </div>

    <!-- 右侧信息面板 -->
    <div class="info-panel" v-show="infoVisiable">
      <div class="info-header">好友信息</div>
      <div class="info-body">
        <div class="info-item">
          <div class="info-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <span class="info-item-value">{{ getFriendInfo.username }}</span>
        </div>
        <div class="info-item">
          <div class="info-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <span class="info-item-value">{{ getFriendInfo.email || '未设置' }}</span>
        </div>
        <div class="info-item">
          <div class="info-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span class="info-item-value">{{ dayjs(getFriendInfo.createdAt).format('YYYY/MM/DD') }}</span>
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
import { useUserStore } from "@/store/modules/user";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { Socket } from "socket.io-client";
import dayjs from "@/plugin/dayjs";
import serverApi from "@/api";
import { vEnter } from "@/directives/vEnter";
import { formatFileSize, scrollToBottom } from "@/utils";
import { usePaste } from '@/hooks/paste'
import { Comment } from '@/components'

const socketStore = useSocketStore();
const friendStore = useFriendStore();
const userStore = useUserStore();

const story = ref("");
const route = useRoute();

const getHistory = computed(() => {
  return socketStore.userMessageMap.get(route.params.id as string) || [];
});

const getFriendInfo = computed(() => {
  return friendStore.getFriendMap[route.params.id as string]?.friend_info || {}
})

const handleSend = () => {
  if (!story.value) return;
  (socketStore.socket as Socket).emit("user", {
    sender: userStore.userInfo.id,
    content: story.value,
  });
  story.value = "";
};

const handleSendImage = () => {
  document.getElementById('chooseImage')?.click()
};
const handleSendFile = () => {
  document.getElementById('chooseFile')?.click()
};

const uploadImage = (file:Blob) => {
  const formData = new FormData()
  formData.append('file', file as Blob)
  serverApi.UploadUser(formData).then((res:any) => {
    if (res.code === 200) {
      (socketStore.socket as Socket).emit('user', {
        size: res.data.size,
        sender: userStore.userInfo.id,
        content: `/${res.data.path}`,
        type: 'image'
      })
    }
  })
}
const uploadFile = (file:Blob)=>{
  const formData = new FormData()
  formData.append('file', file as Blob)
  serverApi.UploadUser(formData).then((res:any) => {
    if (res.code === 200) {
      (socketStore.socket as Socket).emit('user', {
        size: res.data.size,
        sender: userStore.userInfo.id,
        originalname: res.data.originalname,
        content: `/${res.data.path}`,
        type: 'file'
      })
    }
  })
}

onMounted(() => {
  document.getElementById('chooseImage')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return;
    uploadImage(file)
  })
  document.getElementById('chooseFile')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return;
    uploadFile(file)
  })
  scrollToBottom('messageContainer')
})

usePaste(uploadImage,uploadFile)

watch(
  () => getHistory.value,
  () => {scrollToBottom('messageContainer')},
  { deep: true }
)

const infoVisiable = ref(true)
const handleSwitchInfo = () => {
  infoVisiable.value = !infoVisiable.value
}
</script>
<style lang="">
</style>