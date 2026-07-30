<template lang="">
    <div class="dashboard p-2 h-full overflow-y-auto">
        <div 
            class="text-sm group gap-2 flex items-end animate__fadeIn animate__animated" 
            v-for="(item, idx) in alertStore.alerts" 
            :key="idx"
        >
            <span>{{ dayjs(item.timestamp).format('YYYY/MM/DD HH:mm:ss') }} [{{item.sender}}]：{{item.message}}</span>
            <svg @click="alertStore.alerts.splice(idx, 1)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 cursor-pointer hidden group-hover:block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/modules/alert'
import dayjs from 'dayjs';
const alertStore = useAlertStore()
</script>
<style lang="scss"></style>