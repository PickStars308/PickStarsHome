import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isLoading: true,
        isDataLoaded: true
    }),
    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
        setDataLoaded(loaded: boolean) {
            this.isDataLoaded = loaded
        }
    }
})
