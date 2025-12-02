<template>
    <div class="w-full text-sm">
        <div v-for="(item, k) in userStore.userInfo" :key="k" class="flex gap-6">
            <div class="w-[120px] text-right">{{ k }}:</div>
            <div class="flex-1">{{ item }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

</script>
<style lang="">

</style>