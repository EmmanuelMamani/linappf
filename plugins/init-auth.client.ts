// /plugins/init-auth.client.ts
export default defineNuxtPlugin(async () => {
    const user = useState('user')

    try {
        const { data } = await useFetch('/api/user', {
            credentials: 'include'
        })
        user.value = data.value
    } catch (error) {
        user.value = null
        document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
        document.cookie = 'laravel_session=; Max-Age=0; path=/'
        navigateTo('/')
    }
})
