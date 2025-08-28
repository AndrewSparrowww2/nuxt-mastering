import type { H3Event } from 'h3'

export const getAuthenticatedUserId = async (event: H3Event): Promise<string> => {
  const session = await requireUserSession(event)

  return session.databaseUserId as string
}
