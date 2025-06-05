import { createChat } from '~~/server/repository/chat.repository'
import { cacheService } from '~~/server/services/cache-service'
import { CreateChatRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readValidatedBody(event, CreateChatRequestSchema.parse)
  await cacheService.changeCacheState(true)

  return createChat({ title, projectId })
})
