<template lang="">
    <div class="dashboard p-2 h-full overflow-y-auto">
        <div 
            class="text-sm group flex items-end animate__fadeIn animate__animated" 
            :style="{
                'animation-delay': `${(idx + 1) * 0.2}s`
            }"
            v-for="(item,idx) in alertStore.alerts" 
            :key="idx"
        >
            <span class="mr-2">[{{item.sender}}]：{{item.message}}</span>
            <span class="hidden text-xs group-hover:block text-gray-600">{{dayjs(item.timestamp).format('YYYY/MM/DD HH:mm:ss')}}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/modules/alert'
import dayjs from 'dayjs';
const alertStore = useAlertStore()
</script>
<style lang="scss"></style>