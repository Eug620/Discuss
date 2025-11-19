<template lang="">
    <div>
        apply{{applyList}}
    </div>
</template>
<script setup lang="ts">
import serverApi from "@/api";
import { ref } from "vue";

const applyList = ref([])
serverApi.GetApplyMine().then((res:any) => {
    console.log(res.data)
    applyList.value = res.data
})
</script>
<style lang="">
    
</style>