import { findOrCreateUser } from '~~/server/repository/user.repository'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess (event, { user }) {
    if (!user.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    const userModel: IGithubUser = {
      id: user.id,
      name: user.name || user.login,
      email: user.email!,
      avatar: user.avatar_url,
      login: user.login
    }

    const dbUser = await findOrCreateUser(userModel)
    await setUserSession(event, {
      user: userModel,
      databaseUserId: dbUser.id,
      loggedInAt: new Date()
    })

    return sendRedirect(event, '/chats')
  },
  onError (event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
