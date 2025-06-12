// /middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    const user = useState('user')
    const protectedRoutes = ['/dashboard']

    if (protectedRoutes.includes(to.path) && !user.value) {
        return navigateTo('/')
    }

    if (['/'].includes(to.path) && user.value) {
        return navigateTo('/dashboard')
    }
})
