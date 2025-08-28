export const useAuth = () => {
  const { loggedIn, user, session, fetch, clear } = useUserSession()

  const logout = async () => {
    await clear()
    await navigateTo('/login')
  }

  const isAuthenticated = computed(() => loggedIn.value && session.value?.databaseUserId)

  const userName = computed(() => {
    return (user.value as IGithubUser)?.name || (user.value as IGithubUser)?.email
  })

  const userEmail = computed(() => {
    return (user.value as IGithubUser)?.email
  })

  const userAvatar = computed(() => {
    return (user.value as IGithubUser)?.avatar
  })

  return {
    isAuthenticated,
    user: readonly(user),
    session: readonly(session),
    refresh: fetch,
    logout,

    userName,
    userEmail,
    userAvatar
  }
}
