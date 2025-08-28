import { getAllChats } from '~~/server/repository/chat.repository'
import { cacheService } from '~~/server/services/cache-service'

export default defineCachedEventHandler(async () => {
  console.log('Hurra, not from cache')

  await cacheService.changeCacheState(false)

  return getAllChats()
}, {
  name: 'getAllChats',
  maxAge: 60,
  swr: false,
  shouldInvalidateCache: () => cacheService.shouldInvalidateCache()
})
