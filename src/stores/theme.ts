import { defineStore } from 'pinia'

type Theme = 'light' | 'dark' | 'system'

const isValidTheme = (value: string | null): value is Theme => {
    return value === 'light' || value === 'dark' || value === 'system'
}

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: 'system' as Theme,
    }),
    actions: {
        setTheme(theme: Theme) {
            this.theme = theme
            localStorage.setItem('theme', theme)
            this.applyTheme()
        },
        applyTheme() {
            const html = document.documentElement
            html.classList.remove('light', 'dark')

            let appliedTheme: 'light' | 'dark'

            if (this.theme === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                appliedTheme = systemPrefersDark ? 'dark' : 'light'
            } else {
                appliedTheme = this.theme
            }

            html.classList.add(appliedTheme)
        },
        initTheme() {
            const savedTheme = localStorage.getItem('theme')
            if (isValidTheme(savedTheme)) {
                this.theme = savedTheme
            } else {
                this.theme = 'system'
                localStorage.removeItem('theme')
            }
            this.applyTheme()
        },
    },
})
