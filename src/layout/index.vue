<template>
    <div class="w-full h-full flex">
        <div class="flex-[200px]">222</div>
        <div class="flex-auto">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'



const userStore = useUserStore()

// const collapsed = ref(false)
const handleLogout = () => {
    userStore.logout()
    router.push('/login')
}
</script>
<style lang="scss">
// .talk-layout {
//     // display: flex;
//     height: 100dvh;
//     // overflow: hidden;
//     // gap: .6vw;

//     &-menu {
//         // width: 16vw;
//         height: 100%;
//         background: #f5f5f5;
//         // padding: .6vw;
//         position: relative;

//         &-item {
//             // padding: .6vw;
//         }

//         &-bottom {
//             // position: absolute;
//             // bottom: 0;
//             // left: 0;
//         }
//     }

//     .talk-layout-content {
//         // flex: 1;
//         height: 100%;
//     }
// }</style>