<template lang="">
    <div>
        <h1>
            欢迎来到e-talk
        </h1>
    </div>
</template>
<script setup lang="ts">
import { useSocketStore } from '@/store/modules/socket'
const socketStore = useSocketStore()
socketStore.socket?.emit('message', 'world')
</script>
<style lang="">

</style>