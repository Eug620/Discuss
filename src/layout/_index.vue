<template>
  <div class="w-full h-full flex">
    <div class="w-[200px] border-r border-gray-300">
      <div
        v-for="page in initRoutes"
        @click="handleClick(page)"
        :key="page.path"
        class="cursor-pointer"
      >{{ page.meta.title }}</div>
    </div>
    <div class="flex-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import router from "@/router";
import { ref } from "vue";
import serverApi from "@/api";
import { RouterLink } from "vue-router";
import { initRoutes } from "@/router/routes";

function handleClick(page: any) {
  router.push({
    name: page.name,
  });
}

enum TabName {
  rooms = "rooms",
  friends = "friends",
}
const userStore = useUserStore();
const activeTab = ref<TabName>(TabName.rooms);
const tabs = ref([
  {
    name: TabName.rooms,
    label: "rooms",
  },
  {
    name: TabName.friends,
    label: "friends",
  },
]);
// const collapsed = ref(false)
const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
const handleRoomClick = (room: any) => {
  router.push({
    name: "room",
    params: {
      roomId: room.id,
    },
  });
};
const handleFriendClick = (friend: any) => {
  router.push({
    name: "friend",
    params: {
      friendId: friend.friend_info.id,
    },
  });
};

// 搜索
const searchQuery = ref("");
const searchResult = ref<any>({});
const handleSearch = () => {
  if (activeTab.value === TabName.rooms) {
    serverApi.GetRoomInfo(searchQuery.value).then((res: any) => {
      console.log(res.data);
      searchResult.value = res.data;
    });
  } else if (activeTab.value === TabName.friends) {
    serverApi.GetUserInfo(searchQuery.value).then((res: any) => {
      console.log(res.data);
      searchResult.value = res.data;
    });
  }
};
const handleResultClick = (result: any) => {
  if (activeTab.value === TabName.rooms) {
    serverApi
      .apply({
        room_id: result.id,
      })
      .then((res: any) => {
        console.log(res.data);
      });
  } else if (activeTab.value === TabName.friends) {
    serverApi
      .apply({
        apply_user_id: result.id,
      })
      .then((res: any) => {
        console.log(res.data);
      });
  }
};
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
// }
</style>