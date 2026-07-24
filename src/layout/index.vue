<template>
  <div class="w-full h-full flex">
    <div class="w-[60px] py-1 flex flex-col border-r border-gray-300 animate__fadeIn animate__animated ">
      <div class="flex-1 px-1 flex flex-col gap-1">
        <div v-for="page in initRoutes" @click="handleClick(page)" :key="page.path"
          class="cursor-pointer text-center p-2 hover:bg-gray-200 animate__flipInX animate__animated rounded-md" :class="{'bg-gray-200': getPath === page.path}">
          <div class="w-6 py-1 mx-auto " v-html="page.meta.icon"></div>
        </div>
      </div>
      <div class="px-1 flex flex-col gap-1">
        <div class="cursor-pointer text-center p-2 hover:bg-gray-200 animate__flipInX animate__animated rounded-md" @click="handleSetting" :class="{'bg-gray-200': getPath === 'setting'}">
          <div class="w-6 py-1 mx-auto  ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </div>


        <div class="cursor-pointer text-center p-2 hover:bg-gray-200 animate__flipInX animate__animated rounded-md" @click="handleLogout">
          <div class="w-6 py-1 mx-auto  ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-auto animate__fadeIn animate__animated">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import router from "@/router";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { initRoutes } from "@/router/routes";

function handleClick(page: any) {
  router.push({
    name: page.name,
  });
}

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
};

// 关于
const handleSetting = () => {
  router.push({
    name: "setting",
  });
}

const route = useRoute()
const routePath = ref<string|undefined>(undefined)
watchEffect(() =>{ 
  routePath.value = route.path
})
const getPath = computed(() => {
  return routePath.value?.split('/').filter(Boolean)[0]
})


// 创建 SSE 连接
// const eventSource = serverApi.CreateEventSource();
// onUnmounted(() => {
//   // 关闭连接
//   eventSource.close()
// })
</script>
<style lang="scss"></style>