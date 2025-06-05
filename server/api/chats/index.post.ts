import { createChat } from '~~/server/repository/chatRepository'
import { cacheService } from '~~/server/services/cache-service'

export default defineEventHandler(async (event) => {
  const { title, projectId } = await readBody(event)
  await cacheService.changeCacheState(true)

  return createChat({ title, projectId })
})
