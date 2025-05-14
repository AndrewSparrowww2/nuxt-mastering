export default function useChatsStore () {
  const { data: chats, execute, status } = useAsyncData<IChat[]>('chats', () => $fetch('/api/chats'), {
    immediate: false,
    deep: true,
    default: () => []
  })

  async function fetchChats () {
    if (status.value !== 'idle') return
    await execute()
  }

  async function createChat ({ projectId }: { projectId?: string } = {}) {
    const chat = await $fetch<IChat>('/api/chats', {
      method: 'POST',
      body: {
        title: `Chat ${chats.value.length + 1}`,
        ...(projectId && { projectId })
      }
    })

    chats.value.unshift(chat)
    return chat
  }

  async function updateChat (id: string, messages: IChatMessage[]) {
    const index = chats.value.findIndex((c) => c.id === id)
    if (!chats.value[index]) return

    const updatedChat = { ...chats.value[index], messages }

    // Generate new title for chat using AI
    if (messages.length === 1) {
      const newChat = await $fetch<IChat>(`/api/chats/${id}/title/generate`, {
        method: 'POST',
        body: { message: messages[0]?.content }
      })
      updatedChat.title = newChat.title
    }

    chats.value[index] = updatedChat
  }

  function getChatsInProject (projectId?: string) {
    return chats.value.filter((c) => c.projectId === projectId)
  }

  return {
    chats,
    fetchChats,
    createChat,
    updateChat,
    getChatsInProject
  }
}
