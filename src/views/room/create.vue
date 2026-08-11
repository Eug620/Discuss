<template>
    <div class="w-full h-full overflow-y-auto" :style="{ backgroundColor: 'var(--bgColor)' }">
        <div class="w-full max-w-xl mx-auto px-4 py-3">
            <!-- 创建房间卡片 -->
            <div class="card p-4">
                <div class="text-center mb-4">
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" :style="{ background: 'var(--primaryGradient)' }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <h2 class="text-base font-semibold" :style="{ color: 'var(--textColor)' }">创建房间</h2>
                    <p class="text-sm mt-0.5" :style="{ color: 'var(--textSecondary)' }">创建一个新的聊天房间</p>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="form-group">
                        <label class="form-label">房间名称</label>
                        <div class="input-wrapper">
                            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>
                            <input type="text" class="form-input" placeholder="请输入房间名称" v-model.trim="room.name">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">房间描述</label>
                        <div class="input-wrapper" style="display: block;">
                            <textarea 
                                class="form-input" 
                                placeholder="请输入房间描述" 
                                v-model.trim="room.description"
                                rows="4"
                                style="height: auto; padding: 10px 14px 10px 40px; resize: vertical;">
                            </textarea>
                        </div>
                    </div>

                    <button type="button" class="login-btn" @click="handleCreate" :disabled="!room.name || !room.description">
                        <span>创建房间</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
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
<style lang="scss">
</style>