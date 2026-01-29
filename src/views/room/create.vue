<!--
 * @Author       : Eug yyh3531@163.com
 * @Date         : 2025-11-23 20:37:33
 * @LastEditors  : Eug yyh3531@163.com
 * @LastEditTime : 2025-11-23 23:18:46
 * @FilePath     : \e-talk\src\views\room\create.vue
 * @Description  : filename
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="room-create p-6 bg-[#f6f8fa] min-h-full">
        <div class="max-w-lg mx-auto">
            <div class="bg-white rounded-md border border-[#d0d7de] p-6">
                <h1 class="text-xl font-semibold text-[#24292f] mb-2">创建房间</h1>
                <p class="text-[#6e7781] text-sm mb-6">创建一个新的聊天房间，邀请朋友一起交流</p>

                <form @submit.prevent="handleCreate" class="space-y-4">
                    <!-- 房间名 -->
                    <div>
                        <label class="block text-sm font-medium text-[#24292f] mb-2">
                            房间名称 <span class="text-[#cf222e]">*</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="请输入房间名称" 
                            v-model.trim="room.name"
                            class="w-full px-4 py-2 text-sm border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-colors"
                            required
                        />
                    </div>

                    <!-- 房间描述 -->
                    <div>
                        <label class="block text-sm font-medium text-[#24292f] mb-2">
                            房间描述 <span class="text-[#cf222e]">*</span>
                        </label>
                        <textarea 
                            placeholder="请输入房间描述" 
                            v-model.trim="room.description"
                            rows="4"
                            class="w-full px-4 py-2 text-sm border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] transition-colors resize-none"
                            required
                        ></textarea>
                    </div>

                    <!-- 提交按钮 -->
                    <div class="pt-4">
                        <button 
                            type="submit"
                            class="w-full py-2 px-4 text-sm font-medium text-white bg-[#2da44e] border border-transparent rounded-md hover:bg-[#2c974b] transition-colors"
                        >
                            创建房间
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import ServerApi from "@/api";
import { useRoomStore } from "@/store/modules/room";
const roomStore = useRoomStore()
const room = reactive({
    name: '',
    description: ''
})

const handleCreate = () => {
    if (!room.name || !room.description) return
    ServerApi.CreateRoom(room).then((res: any) => {
        if (res.code == 200) {
            room.description = ''
            room.name = ''
            roomStore.getRooms()
        }
    }).catch((err: any) => {
        console.log(err)
    })
}
</script>
<style lang="scss"></style>