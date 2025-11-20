<template lang="">
    <div class="dashboard p-2">
        <h1>
            Welcome !
            <!-- <button @click="handleClick">点击</button>
            <Dialog v-model:value="visible">
                <template #default>
                    <div style="text-align: center;width: 200px; height: 100px;">
                        <h2 @click="handleClose">确认退出吗？</h2>
                    </div>
                </template>
            </Dialog> -->
        </h1>
    </div>
</template>
<script setup lang="ts">
import { useSocketStore } from '@/store/modules/socket'
const socketStore = useSocketStore()
socketStore.socket?.emit('message', 'world')
// import Dialog from '@/components/dialog/index.vue'
// import { ref } from 'vue'

// const visible = ref(false)

// const handleClick = () => {
//     visible.value = true
// }
// const handleClose = () => {
//     visible.value = false
// }
</script>
<style lang="scss">

</style>