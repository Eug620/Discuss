import { defineStore } from 'pinia'
import { User } from './user'
import ServerApi from '@/api/index'
import { useSocketStore } from './socket'

export interface Room {
    createdAt: string
    creator: string
    description: string
    id: string
    name: string
    updatedAt: string
    user_info: User
}
export const useRoomStore = defineStore('room', {
    state: () => ({
        // 我加入的房间
        rooms: [] as Room[],

        // 我创建的房间
        roomsMine: [] as Room[],
    }),
    getters: {
        getRoomMap: (state) => {
            return state.rooms.reduce((prev, cur) => {
                prev[cur.id] = cur
                return prev
            }, {} as Record<string, Room>)
        },

    },
    actions: {
        getRooms() {
            ServerApi.GetRoomMine().then((res:any) => {
                console.log(res)
                this.roomsMine = res.data.list || []

                // this.rooms.forEach(room => {
                //     useSocketStore().socket?.emit('join', room.id)
                // })
            })
            const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

            ServerApi.GetMemberInfo({
                user_id: userinfo.id 
            }).then((res:any) => {
                this.rooms = res.data || []
                this.rooms.forEach(room => {
                    useSocketStore().socket?.emit('join', room.id)
                })
            })
        }
    }
})