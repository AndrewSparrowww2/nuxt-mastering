class CacheService {
  storage = useStorage<boolean>('data')
  keys = {
    chatsHasNewChat: 'chats:has-new-chat:'
  }

  async shouldInvalidateCache () {
    const userId = useEvent().context.userId

    const hasNewChat = await this.storage.getItem(this.keys.chatsHasNewChat + userId)
    return hasNewChat || false
  }

  async changeCacheState (state: boolean) {
    const userId = useEvent().context.userId
    await this.storage.setItem(this.keys.chatsHasNewChat + userId, state)
  }
}

export const cacheService = new CacheService()
