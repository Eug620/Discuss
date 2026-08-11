<template lang="">
  <div class="w-full h-full flex">
    <!-- 聊天主区域 -->
    <div class="flex-1 flex flex-col" :style="{ backgroundColor: 'var(--bgColor)' }">
      <!-- 头部 -->
      <div class="chat-header">
        <div class="header-title">
          <div class="header-avatar purple">{{ getRoomInfo.name?.charAt(0)?.toUpperCase() }}</div>
          <span class="header-name">{{ getRoomInfo.name }}</span>
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
              <span v-if="message.sender !== userStore.userInfo.id">{{ getUserInfo(message.sender) }}</span>
              <span v-else>{{ userStore.userInfo.username }} (我)</span>
              · {{ dayjs(message.timestamp).fromNow() }}
              <span v-if="message.type" class="file-size">· {{ formatFileSize(message.size) }}</span>
            </div>
            <div class="message-bubble" :class="message.sender === userStore.userInfo.id ? 'self' : 'other'">
              <Comment :message="message"/>
            </div>
          </div>
        </div>

        <div v-if="getHistory.length === 0" class="empty-state" style="flex: 1; justify-content: center;">
          <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          <span>开始群聊吧</span>
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
      <div class="info-header">群成员 ({{ getMember.length }})</div>
      <div class="info-body" style="padding: 8px;">
        <div v-for="member in getMember" :key="member.user_id" class="info-item">
          <div class="info-item-icon">
            <svg v-if="getRoomInfo.creator === member.user_id" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <span class="info-item-value" :class="{ 'font-medium': member.user_id === userStore.userInfo.id }">
            {{ member.user_info.username }}
          </span>
          <span v-if="getMemberOnline.has(member.user_id)" class="status-dot online"></span>
          <svg 
            v-if="getRoomInfo.creator !== member.user_id && roomStore.roomsMine.find((item: any) => item.id === route.params.id)" 
            @click="handleRemoveMember(member.id)" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="size-4 cursor-pointer"
            style="color: var(--textSecondary);"
            title="移除成员">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <!-- 群申请 -->
      <template v-if="applyList.length > 0">
        <div class="info-header" style="border-top: 1px solid var(--borderColor);">待处理申请</div>
        <div class="info-body">
          <div v-for="apply in applyList" :key="apply.id" class="info-item">
            <div class="info-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <span class="info-item-value" :style="{ color: 'var(--primaryColor)' }">{{ apply.user_info.username }}</span>
            <template v-if="apply.handle_status">
              <span class="status-badge" :class="{ success: apply.status, danger: !apply.status }">
                {{ apply.status ? '已同意' : '已拒绝' }}
              </span>
            </template>
            <template v-else>
              <div class="flex gap-1">
                <div class="icon-btn" style="width: 28px; height: 28px;" @click="handleHandleApply(apply, true)" title="同意">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div class="icon-btn" style="width: 28px; height: 28px;" @click="handleHandleApply(apply, false)" title="拒绝">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

    <input class="hidden" id="chooseImage" type="file" accept="image/*">
    <input class="hidden" id="chooseFile" type="file" accept="*">
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/store/modules/socket";
import { useUserStore } from "@/store/modules/user";
import { useRoomStore } from "@/store/modules/room";
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Socket } from "socket.io-client";
import ServerApi from "@/api";
import dayjs from "@/plugin/dayjs";
import serverApi from "@/api";
import { vEnter } from "@/directives/vEnter";
import { formatFileSize, scrollToBottom } from "@/utils";
import { usePaste } from '@/hooks/paste'
import { Comment } from '@/components'

const socketStore = useSocketStore();
const userStore = useUserStore();
const roomStore = useRoomStore();
const story = ref("");
const route = useRoute();

const getHistory = computed(() => {
  return socketStore.roomMessageMap.get(route.params.id as string) || [];
});

const getMember = computed(() => {
  return socketStore.roomMemberMap.get(route.params.id as string) || [];
});

const getMemberOnline = computed(() => {
  return socketStore.roomMemberOnlineMap.get(route.params.id as string) || new Set();
});

const getUserInfo = (user_id: string) => {
  return getMember.value.find((item: any) => item.user_id === user_id)
    ?.user_info?.username;
};

const getRoomInfo = computed(() => {
  return roomStore.getRoomMap[route.params.id as string]?.room_info || {};
});

const applyList = ref([]);
watch(
  () => route.params.id,
  () => { handleApplyRoom(); }
);

function handleApplyRoom() {
  if (!roomStore.roomsMine.find((item: any) => item.id === route.params.id)) {
    return (applyList.value = []);
  }
  ServerApi.getApplyRoom(route.params.id as string).then((res: any) => {
    applyList.value = res.data || [];
  });
}
handleApplyRoom();

function handleHandleApply(apply: any, status: boolean) {
  ServerApi.handleApply({ id: apply.id, status }).then((res: any) => {
    if (res.code === 200) {
      handleApplyRoom();
      status && roomStore.getRoomMember(route.params.id as string);
    }
  });
}

const handleSend = () => {
  if (!story.value) return;
  (socketStore.socket as Socket).emit("room", {
    room: route.params.id,
    content: story.value,
  });
  story.value = "";
};

const handleSendImage = () => {
  document.getElementById('chooseImage')?.click();
};
const handleSendFile = () => {
  document.getElementById('chooseFile')?.click();
};

const uploadImage = (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file as Blob);
  serverApi.UploadUser(formData).then((res: any) => {
    if (res.code === 200) {
      (socketStore.socket as Socket).emit("room", {
        size: res.data.size,
        room: route.params.id,
        content: `/${res.data.path}`,
        type: "image",
      });
    }
  });
}

const uploadFile = (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file as Blob);
  serverApi.UploadUser(formData).then((res: any) => {
    if (res.code === 200) {
      (socketStore.socket as Socket).emit("room", {
        size: res.data.size,
        room: route.params.id,
        content: `/${res.data.path}`,
        type: "file",
        originalname: res.data.originalname,
      });
    }
  });
}

onMounted(() => {
  document.getElementById('chooseImage')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    uploadImage(file)
  });
  document.getElementById('chooseFile')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    uploadFile(file)
  });
  scrollToBottom('messageContainer');
});

usePaste(uploadImage, uploadFile)

watch(
  () => getHistory.value,
  () => { scrollToBottom('messageContainer'); },
  { deep: true }
);

const infoVisiable = ref(true)
const handleSwitchInfo = () => {
  infoVisiable.value = !infoVisiable.value
}

function handleRemoveMember(id: string) {
  ServerApi.RemoveMember(id).then((res: any) => {
    if (res.code === 200) {
      roomStore.getRoomMember(route.params.id as string);
    }
  });
}
</script>
<style lang="">
</style>