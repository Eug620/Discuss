<template lang="">
    <div class="dashboard p-2 h-full overflow-y-auto">
        <div class="text-sm" v-for="(item,idx) in alertStore.alerts" :key="idx">[{{item.sender}}]:{{item.message}}</div>
    </div>
</template>
<script setup lang="ts">
import { useAlertStore } from '@/store/modules/alert'

const alertStore = useAlertStore()
</script>
<style lang="scss">

</style>