// /plugins/auth-error-handler.client.ts
export default defineNuxtPlugin(() => {
    const user = useState('user')

    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason
        if ([401, 403].includes(error?.statusCode || error?.response?.status)) {
            user.value = null
            document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
            document.cookie = 'laravel_session=; Max-Age=0; path=/'
            navigateTo('/')
        }
    })
})
