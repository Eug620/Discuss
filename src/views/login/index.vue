<template lang="">
    <div class="login-page w-full h-full flex items-center justify-center" :style="{ backgroundColor: 'var(--bgColor)' }">
        <!-- 装饰元素 -->
        <div class="login-bg-decoration">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <!-- 登录卡片 -->
        <div class="login-card animate__fadeIn animate__animated">
            <!-- 头部 Logo -->
            <div class="login-header">
                <div class="login-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                </div>
                <h1 class="login-title">Discuss</h1>
                <p class="login-subtitle">{{ activeTab ? '创建新账户' : '欢迎回来' }}</p>
            </div>

            <!-- 表单 -->
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label class="form-label">用户名</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <input type="text" class="form-input" placeholder="请输入用户名" v-model.trim="loginForm.username">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">密码</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <input type="password" class="form-input" placeholder="请输入密码" v-model.trim="loginForm.password">
                    </div>
                </div>

                <div class="form-group" v-if="activeTab">
                    <label class="form-label">邮箱</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <input type="email" class="form-input" placeholder="请输入邮箱" v-model.trim="loginForm.email">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">验证码</label>
                    <div class="captcha-row">
                        <div class="input-wrapper flex-1">
                            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <input type="text" class="form-input" placeholder="请输入验证码" v-model.trim="loginForm.captcha">
                        </div>
                        <div v-html="captchaImg" class="captcha-img" @click="handleGetCaptcha" title="点击刷新验证码"></div>
                    </div>
                </div>

                <button type="submit" class="login-btn" :disabled="isSubmitting">
                    <span>{{ activeTab ? '立即注册' : '登录' }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </form>

            <div class="login-footer">
                <p>{{ activeTab ? '已有账号？' : '还没有账号？' }}</p>
                <a href="#" class="switch-link" @click.prevent="activeTab = !activeTab">
                    {{ activeTab ? '去登录' : '立即注册' }}
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import serverApi from '@/api'

const activeTab = ref(false)
const isSubmitting = ref(false)

const userStore = useUserStore()
const loginForm = reactive({
    captcha: '',
    username: '',
    password: '',
    email: ''
})
const captchaImg = ref('')

const handleLogin = async () => {
    if (isSubmitting.value) return
    
    if (!loginForm.username || !loginForm.password) {
        return
    }
    if (activeTab.value && !loginForm.email) {
        return
    }
    
    isSubmitting.value = true
    try {
        await serverApi[activeTab.value ? 'Register' : 'Login'](loginForm).then(async (res: any) => {
            !activeTab.value && await userStore.login(res.data)
            !activeTab.value && router.push('/')
            if (activeTab.value) {
                activeTab.value = false
            }
        })
    } finally {
        isSubmitting.value = false
    }
}

function handleGetCaptcha() {
    loginForm.captcha = ''
    serverApi.GetCaptcha().then((res: any) => {
        captchaImg.value = res
    })
}
handleGetCaptcha()
</script>
<style lang="scss" scoped>
.login-page {
    position: relative;
    overflow: hidden;
    padding: 16px;
}

/* 背景装饰 */
.login-bg-decoration {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.blob {
    position: absolute;
    border-radius: 50%;
    opacity: 0.06;
    filter: blur(60px);
}

.blob-1 {
    width: 320px;
    height: 320px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    top: -80px;
    right: -80px;
    animation: float 8s ease-in-out infinite;
}

.blob-2 {
    width: 240px;
    height: 240px;
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
    bottom: -40px;
    left: -40px;
    animation: float 10s ease-in-out infinite reverse;
}

.blob-3 {
    width: 160px;
    height: 160px;
    background: linear-gradient(135deg, #06b6d4, #22d3ee);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 12s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.05); }
}

.blob-3 {
    animation-name: float-center;
}

@keyframes float-center {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-45%, -55%) scale(1.05); }
}

/* 登录卡片 */
.login-card {
    position: relative;
    width: 100%;
    max-width: 400px;
    padding: 28px 28px;
    border-radius: 18px;
    background: var(--cardBg);
    border: 1px solid var(--borderColor);
    box-shadow: 
        0 16px 32px -8px var(--shadowColor),
        0 0 0 1px var(--borderColor);
    backdrop-filter: blur(10px);
    z-index: 1;
}

/* 头部 */
.login-header {
    text-align: center;
    margin-bottom: 20px;
}

.login-logo {
    width: 48px;
    height: 48px;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}

.login-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--textColor);
    margin: 0 0 3px;
    letter-spacing: -0.02em;
}

.login-subtitle {
    font-size: 13px;
    color: var(--textSecondary);
    margin: 0;
}

/* 表单 */
.login-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--textSecondary);
    padding-left: 4px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 12px;
    width: 18px;
    height: 18px;
    color: var(--textSecondary);
    pointer-events: none;
}

.form-input {
    width: 100%;
    height: 42px;
    padding: 0 14px 0 40px;
    border: 1px solid var(--inputBorderColor);
    border-radius: 10px;
    background: var(--inputBgColor);
    color: var(--textColor);
    font-size: 14px;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.form-input::placeholder {
    color: var(--textSecondary);
    opacity: 0.7;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input-wrapper:focus-within .input-icon {
    color: #3b82f6;
}

/* 验证码行 */
.captcha-row {
    display: flex;
    gap: 10px;
    align-items: stretch;
}

.captcha-img {
    height: 42px;
    min-width: 110px;
    border-radius: 10px;
    border: 1px solid var(--inputBorderColor);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bgColor);
    transition: all 0.2s ease;
    padding: 4px;
}

.captcha-img:hover {
    border-color: #3b82f6;
}

.captcha-img svg {
    height: 100%;
    width: 100%;
}

/* 登录按钮 */
.login-btn {
    margin-top: 4px;
    width: 100%;
    height: 42px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.login-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.login-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-icon {
    width: 16px;
    height: 16px;
}

/* 底部链接 */
.login-footer {
    text-align: center;
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid var(--borderColor);
}

.login-footer p {
    font-size: 13px;
    color: var(--textSecondary);
    margin: 0;
}

.switch-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    transition: color 0.2s ease;
}

.switch-link:hover {
    color: #2563eb;
}

/* 响应式 */
@media (max-width: 480px) {
    .login-card {
        padding: 24px 20px;
        border-radius: 16px;
    }

    .login-title {
        font-size: 20px;
    }

    .blob-1, .blob-2, .blob-3 {
        opacity: 0.04;
    }
}
</style>
