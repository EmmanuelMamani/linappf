import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),

    actions: {
        setUser(user) {
            this.user = user
        },

        clearUser() {
            this.user = null
        },

        async refresh() {
            try {
                const sanctum = useSanctumClient()
                const res = await sanctum('/api/user', {
                    method: 'GET'
                })
                this.setUser(res.user)
            } catch (error) {
                console.error('Error al refrescar el usuario:', error)
            }
        }
    },

    persist: true
})
