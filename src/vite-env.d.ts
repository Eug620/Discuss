/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'socket.io-client' 
interface Window{
  eventCenterForMicroVue?:any
  returnCitySN?:any
  ActiveXObject?: any
}

// env.d.ts
declare const __COMMIT_HASH__: string
declare const __COMMIT_AUTHOR__: string
declare const __COMMIT_TIME__: string