export default function useChatsStore () {
  const { data: chats, execute, status } = useAsyncData<IChat[]>('chats', () => $fetch('/api/chats'), {
    immediate: false,
    default: () => []
  })

  async function fetchChats () {
    if (status.value !== 'idle') return
    await execute()
  }

  function createChat ({ projectId }: { projectId?: string } = {}) {
    const chat = useMocks().generateChat({
      title: `Chat ${chats.value.length + 1}`,
      ...(projectId && { projectId })
    })
    chats.value.unshift(chat)

    return chat
  }

  function updateChat (updatedChat: Partial<IChat>) {
    const index = chats.value.findIndex((c) => c.id === updatedChat.id)

    if (chats.value[index]) {
      chats.value[index] = {
        ...chats.value[index],
        ...updatedChat
      }
    }
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
