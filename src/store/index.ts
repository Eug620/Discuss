import { createPinia } from 'pinia'

export const pinia = createPinia()

pinia.use(({store}) => {
    // console.log(store,'???')
    // store.router = useRouter()
})
