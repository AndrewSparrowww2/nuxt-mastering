import { getAllChats } from '~~/server/repository/chatRepository'
import { cacheService } from '~~/server/services/cache-service'

export default defineCachedEventHandler(async () => {
  await cacheService.changeCacheState(false)

  return getAllChats()
}, {
  name: 'getAllChats',
  maxAge: 0,
  swr: false,
  shouldInvalidateCache: () => cacheService.shouldInvalidateCache()
})
