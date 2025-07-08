import { updateChat } from '~~/server/repository/chat.repository'
import { cacheService } from '~~/server/services/cache-service'
import { ChatRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { projectId } = await readValidatedBody(event, ChatRequestSchema.parse)

  await cacheService.changeCacheState(true)

  return updateChat(id, { projectId })
})
