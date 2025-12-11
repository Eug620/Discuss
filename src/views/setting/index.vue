<template>
    <div class="w-full text-sm flex items-center justify-center h-full">
        <div class="w-1/2">
            <div v-for="(item, k) in userStore.userInfo" :key="k" class="flex gap-4">
                <div class="w-[120px] text-right">{{ k }}:</div>
                <div class="flex-1 w-full auto-wrap">{{ item }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()

</script>
<style lang="scss">
.auto-wrap {
  word-wrap: break-word;      /* 长单词换行 */
  word-break: break-word;         /* 单词边界换行 */
  white-space: break-spaces;        /* 空白符正常处理 */
}
</style>