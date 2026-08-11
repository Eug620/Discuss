<template lang="">
    <div class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: 'var(--bgColor)' }">
        <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" :style="{ background: 'var(--primaryGradient)' }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <h1 class="text-3xl font-bold mb-1" :style="{ color: 'var(--textColor)' }">404</h1>
            <p class="text-sm mb-4" :style="{ color: 'var(--textSecondary)' }">抱歉，您访问的页面不存在</p>
            <router-link to="/" class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                返回首页
            </router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const notFound = ref(true)
</script>
<style lang="scss"></style>