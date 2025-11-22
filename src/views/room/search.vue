<template >
  <div>
    <div class="flex justify-center items-center gap-2 p-2 text-xs">
      <input
        type="text"
        placeholder="Enter room name"
        @keyup.enter="handleSearch"
        v-model.trim="roomName"
        class="w-[200px] rounded-md p-2 h-8 border border-gray-300 flex justify-center items-center"
      />
    </div>

    <div class="p-2">
      <div
        v-for="item in result"
        :key="item.id"
        class="cursor-pointer p-2"
      >{{ item.name }}

        <button
          v-if="!roomStore.getRoomMap[item.id]"
          @click="handleJoin(item.id)"
        >Join</button>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoomStore } from "@/store/modules/room";
import ServerApi from "@/api";
import { Room } from "@/store/modules/room";
const roomName = ref("");

const result = ref<Room[]>([]);
const roomStore = useRoomStore();

const handleSearch = () => {
  ServerApi.SearchRoom(roomName.value).then((res: any) => {
    if (res.code === 200) {
      result.value = res.data;
    }
  });
};

const handleJoin = (room_id: string) => {
    ServerApi.apply({room_id}).then((res: any) => {
        if (res.code === 200) {
            handleSearch()
        }
    })
};
</script>
<style lang="scss">
</style>