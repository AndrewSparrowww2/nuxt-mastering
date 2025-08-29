const PROTECTED_ROUTES = [
  '/api/chats',
  '/api/projects'
]

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname

  // Skip non-API routes
  if (!url.startsWith('/api/')) {
    return
  }

  // Skip non-protected routes
  if (!PROTECTED_ROUTES.some(route => url.startsWith(route))) {
    return
  }

  // Middleware to get userId from session if session still exist / validate it and add to event context
  const userId = await getAuthenticatedUserId(event)

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Authentication required'
    })
  }

  event.context.userId = userId
})
