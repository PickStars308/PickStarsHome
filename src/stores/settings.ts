import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        typeSource: 'customer' as 'customer' | 'hitokoto',
        settingDialogShow: false
    }),
    actions: {
        setTypeSource(source: 'customer' | 'hitokoto') {
            this.typeSource = source
        },
        showSettingsDialog() {
            this.settingDialogShow = true
        },
        hideSettingsDialog() {
            this.settingDialogShow = false
        }
    }
})
