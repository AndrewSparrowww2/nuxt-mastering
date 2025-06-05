class CacheService {
  storage = useStorage<boolean>('data')
  keys = {
    chatsHasNewChat: 'chats:has-new-chat'
  }

  async shouldInvalidateCache () {
    const hasNewChat = await this.storage.getItem(this.keys.chatsHasNewChat)
    return hasNewChat || false
  }

  async changeCacheState (state: boolean) {
    await this.storage.setItem(this.keys.chatsHasNewChat, state)
  }
}

export const cacheService = new CacheService()
