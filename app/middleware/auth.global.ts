const PROTECTED_ROUTES = [
  '/chats',
  '/projects'
]

export default defineNuxtRouteMiddleware((to, _from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value && PROTECTED_ROUTES.some(route => to.path.startsWith(route))) {
    return navigateTo('/login')
  }
})
