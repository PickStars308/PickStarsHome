import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => {
        const saved = localStorage.getItem('quoteType')
        return {
            typeSource: (saved as 'customer' | 'hitokoto') || 'customer',
            settingDialogShow: false
        }
    },
    actions: {
        setTypeSource(source: 'customer' | 'hitokoto') {
            this.typeSource = source
            localStorage.setItem('quoteType', source)
        },
        showSettingsDialog() {
            this.settingDialogShow = true
        },
        hideSettingsDialog() {
            this.settingDialogShow = false
        }
    }
})
