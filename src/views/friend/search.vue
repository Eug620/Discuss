<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 22:54:25
 * @FilePath     : \e-talk\src\views\friend\search.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template >
    <div>
        <div class="flex justify-center items-center gap-2 p-2 text-xs">
            <input type="text" placeholder="输入用户名" @keyup.enter="handleSearch" v-model.trim="username"
                class="w-[400px] rounded-md p-2 text-center focus:bg-gray-200 focus:outline-none" />
        </div>

        <div class="p-2 flex flex-col items-center gap-2 text-sm">
            <div v-for="item in result" :key="item.id" class="w-[400px] truncate cursor-pointer p-2 border border-gray-300 rounded-md gap-1 flex flex-col relative">
                <button v-if="(item.id && !friendStore.getFriendMap[item.id]) && item.id !== userStore.userInfo.id" @click="handleJoin(item.id)" class="absolute bottom-2 right-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div>名称：{{ item.username }}</div>
                <div>邮箱：{{ item.email }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ServerApi from "@/api";
import { User } from "@/store/modules/user";
import { useFriendStore } from "@/store/modules/friend";
import { useUserStore } from "@/store/modules/user";


const username = ref('')
const result = ref<User[]>([]);
const friendStore = useFriendStore()
const userStore = useUserStore()

const handleSearch = () => {
    ServerApi.SearchUser(username.value).then((res: any) => {
        if (res.code === 200) {
            result.value = res.data;
        }
    });
};

const handleJoin = (apply_user_id?: string) => {
    ServerApi.apply({ apply_user_id }).then((res: any) => {
        if (res.code === 200) {
            username.value = ''
            result.value = []
        }
    })
};
</script>
<style lang="scss"></style>