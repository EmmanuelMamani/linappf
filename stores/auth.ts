// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id: number; name: string; email: string; role: string },
        token: '' as string,
    }),
    actions: {
        setUser(user: any) {
            this.user = user
        },
        setToken(token: string) {
            this.token = token
            if (token) localStorage.setItem('auth_token', token)
            else localStorage.removeItem('auth_token')
        },
        loadFromStorage() {
            const token = localStorage.getItem('auth_token')
            if (token) {
                this.token = token
            }
        },
        logout() {
            this.token = ''
            this.user = null
            localStorage.removeItem('auth_token')
        }
    }
})
