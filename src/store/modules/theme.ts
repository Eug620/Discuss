import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        mode: (localStorage.getItem('theme') as ThemeMode) || 'light'
    }),
    getters: {
        isDark: (state) => state.mode === 'dark',
        isLight: (state) => state.mode === 'light'
    },
    actions: {
        setTheme(mode: ThemeMode) {
            this.mode = mode
            localStorage.setItem('theme', mode)
            this.applyTheme()
        },
        toggleTheme() {
            const newMode = this.mode === 'light' ? 'dark' : 'light'
            this.setTheme(newMode)
        },
        applyTheme() {
            const html = document.documentElement
            if (this.mode === 'dark') {
                html.classList.add('dark')
                html.classList.remove('light')
            } else {
                html.classList.add('light')
                html.classList.remove('dark')
            }
        },
        initTheme() {
            this.applyTheme()
        }
    }
})
