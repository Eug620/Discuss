<template lang="">
    <div class="login w-full h-full">
        <div class="fixed top-1/2 w-[340px] left-1/2 -translate-x-1/2 flex flex-col -translate-y-1/2 p-8 rounded-md border border-[#d0d7de] bg-white shadow-sm">
            <!-- Logo区域 -->
            <div class="flex justify-center mb-6">
                <img src="/siam.svg" alt="Logo" class="w-12 h-12">
            </div>

            <!-- 标题 -->
            <h1 class="text-2xl font-normal text-[#24292f] text-center mb-6">{{ activeTab ? '创建账户' : '登录 Discuss' }}</h1>

            <!-- 表单 -->
            <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
                <input 
                    type="text" 
                    class="input" 
                    :placeholder="activeTab ? '用户名' : '用户名或邮箱'"
                    v-model.trim="loginForm.username"
                >
                <input 
                    type="password" 
                    class="input" 
                    placeholder="密码" 
                    v-model.trim="loginForm.password"
                    v-if="!activeTab"
                >
                <input 
                    type="password" 
                    class="input" 
                    placeholder="设置密码" 
                    v-model.trim="loginForm.password"
                    v-if="activeTab"
                >
                <input 
                    type="text" 
                    class="input" 
                    placeholder="邮箱" 
                    v-if="activeTab"
                    v-model.trim="loginForm.email"
                >
                
                <!-- 验证码 -->
                <div class="flex items-center gap-2">
                    <input 
                        type="text" 
                        class="input flex-1" 
                        placeholder="验证码" 
                        v-model.trim="loginForm.captcha"
                    >
                    <div 
                        v-html="captchaImg"  
                        class="h-[34px] captchaImg cursor-pointer border border-[#d0d7de] rounded-md" 
                        @click="handleGetCaptcha"
                    ></div>
                </div>

                <!-- 登录按钮 -->
                <button 
                    type="submit" 
                    class="w-full py-2 px-4 mt-2 bg-[#2da44e] hover:bg-[#2c974b] text-white text-base font-medium rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#2da44e] focus:ring-offset-2 transition-colors"
                >
                    {{ activeTab ? '创建账户' : '登录' }}
                </button>
            </form>

            <!-- 切换登录/注册 -->
            <div class="mt-6 text-center">
                <p class="text-sm text-[#24292f]">
                    {{ activeTab ? '已有账户?' : '没有账户?' }}
                    <a 
                        href="javascript:void(0)" 
                        @click="activeTab = !activeTab"
                        class="text-[#0969da] hover:underline ml-1"
                    >
                        {{ activeTab ? '登录' : '创建账户' }}
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import serverApi from '@/api'
// https://uiverse.io/elements?tags=neumorphism&page=2

const activeTab = ref(false)

const userStore = useUserStore()
const loginForm = reactive({
    captcha: '',
    username: '',
    password: '',
    email: ''
})
const captchaImg = ref('')


const handleLogin = () => {
    if (!loginForm.username || !loginForm.password) {
        return
    }
    if (activeTab.value && !loginForm.email) {
        return
    }
    serverApi[activeTab.value ? 'Register' : 'Login'](loginForm).then(async (res: any) => {
        !activeTab.value && await userStore.login(res.data)
        !activeTab.value && router.push('/')
        if (activeTab.value) {
            activeTab.value = false
        }
    })
}

function handleGetCaptcha() {
    loginForm.captcha = ''
    serverApi.GetCaptcha().then((res: any) => {
        captchaImg.value = res
    })
}
handleGetCaptcha()

</script>
<style lang="scss">
.login {
    background-color: #f6f8fa;
}

.input {
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292f;
    background-color: #ffffff;
    border: 1px solid #d0d7de;
    border-radius: 6px;
    transition: border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2);
}

.input:focus {
    border-color: #0969da;
    outline: none;
    box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2), 0 0 0 3px rgba(9, 105, 218, 0.3);
}

.input::placeholder {
    color: #6e7781;
}

.captchaImg {
    svg {
        height: 100%;
        width: auto;
    }
}
</style>