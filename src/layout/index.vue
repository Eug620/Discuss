<template>
  <div class="w-full h-full flex bg-[#f6f8fa]">
    <!-- 侧边栏 -->
    <div class="w-[72px] bg-white border-r border-[#d0d7de] flex flex-col flex-shrink-0">
      <!-- 导航菜单 -->
      <div class="flex-1 py-4">
        <div 
          v-for="page in initRoutes" 
          @click="handleClick(page)" 
          :key="page.path"
          class="cursor-pointer flex flex-col items-center py-3 mx-2 rounded-md transition-colors"
          :class="[
            isActive(page) 
              ? 'bg-[#ddf4ff] text-[#0969da]' 
              : 'text-[#6e7781] hover:bg-[#f3f4f6] hover:text-[#24292f]'
          ]"
          :title="page.meta?.title || page.name"
        >
          <div class="w-6 h-6" v-html="page.meta.icon"></div>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="py-4 border-t border-[#d0d7de]">
        <!-- 设置 -->
        <div 
          class="cursor-pointer flex flex-col items-center py-3 mx-2 rounded-md transition-colors text-[#6e7781] hover:bg-[#f3f4f6] hover:text-[#24292f]"
          @click="handleSetting"
          title="设置"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

        <!-- 登出 -->
        <div 
          class="cursor-pointer flex flex-col items-center py-3 mx-2 rounded-md transition-colors text-[#6e7781] hover:bg-[#ffebe9] hover:text-[#cf222e]"
          @click="handleLogout"
          title="登出"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import { useRoute } from "vue-router";
import router from "@/router";
import { onUnmounted, ref } from "vue";
import serverApi from "@/api";
import { RouterLink } from "vue-router";
import { initRoutes } from "@/router/routes";

const route = useRoute();
const userStore = useUserStore();

function handleClick(page: any) {
  router.push({
    name: page.name,
  });
}

const isActive = (page: any) => {
    return route.name === page.name;
};

enum TabName {
  rooms = "rooms",
  friends = "friends",
}
const activeTab = ref<TabName>(TabName.rooms);
const tabs = ref([
  {
    name: TabName.rooms,
    label: "rooms",
  },
  {
    name: TabName.friends,
    label: "friends",
  },
]);

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};

const handleRoomClick = (room: any) => {
  router.push({
    name: "room",
    params: {
      roomId: room.id,
    },
  });
};

const handleFriendClick = (friend: any) => {
  router.push({
    name: "friend",
    params: {
      friendId: friend.friend_info.id,
    },
  });
};

const handleSetting = () => {
  router.push({
    name: "setting",
  });
};

// 搜索
const searchQuery = ref("");
const searchResult = ref<any>({});
const handleSearch = () => {
  if (activeTab.value === TabName.rooms) {
    serverApi.GetRoomInfo(searchQuery.value).then((res: any) => {
      searchResult.value = res.data;
    });
  } else if (activeTab.value === TabName.friends) {
    serverApi.GetUserInfo(searchQuery.value).then((res: any) => {
      searchResult.value = res.data;
    });
  }
};

const handleResultClick = (result: any) => {
  if (activeTab.value === TabName.rooms) {
    serverApi
      .apply({
        room_id: result.id,
      })
      .then((res: any) => {
      });
  } else if (activeTab.value === TabName.friends) {
    serverApi
      .apply({
        apply_user_id: result.id,
      })
      .then((res: any) => {
      });
  }
};

// 创建 SSE 连接
// const eventSource = serverApi.CreateEventSource();
// onUnmounted(() => {
//   // 关闭连接
//   eventSource.close()
// })
</script>
<style lang="scss"></style>