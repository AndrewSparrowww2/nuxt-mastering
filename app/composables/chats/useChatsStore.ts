export default function useChatsStore () {
  const chats = useState<TChat[]>('chats', () => [])
  const { data, execute, status } = useFetch<TChat[]>('/api/chats', {
    default: () => [],
    immediate: false
  })

  async function fetchChats () {
    if (status.value !== 'idle') return
    await execute()
    chats.value = data.value
  }

  async function createChat ({ projectId }: { projectId?: string } = {}) {
    const chat = await $fetch<TChat>('/api/chats', {
      method: 'POST',
      body: {
        title: `Chat ${chats.value.length + 1}`,
        ...(projectId && { projectId })
      }
    })

    chats.value.unshift(chat)
    return chat
  }

  async function updateChatMessages (id: string, messages: TChatMessage[]) {
    const index = chats.value.findIndex((c) => c.id === id)
    if (!chats.value[index]) return

    const updatedChat = { ...chats.value[index], messages }

    // Generate new title for chat using AI
    if (messages.length === 1) {
      const newChat = await $fetch<TChat>(`/api/chats/${id}/title/generate`, {
        method: 'POST',
        body: { message: messages[0]?.content }
      })
      updatedChat.title = newChat.title
    }

    chats.value[index] = updatedChat
  }

  async function updateChat (id: string, data: Partial<TChat> = {}) {
    const index = chats.value.findIndex((c) => c.id === id)
    if (!chats.value[index]) return

    chats.value[index] = { ...chats.value[index], ...data }

    await $fetch<TChat>(`/api/chats/${id}`, {
      method: 'PUT',
      body: data
    })
  }

  function getChatsInProject (projectId?: string) {
    return chats.value.filter((c) => projectId ? c.projectId === projectId : c.projectId === null)
  }

  return {
    chats,
    fetchChats,
    createChat,
    updateChat,
    updateChatMessages,
    getChatsInProject
  }
}
