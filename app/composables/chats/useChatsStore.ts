export default function useChatsStore () {
  const chats = useState<IChat[]>('chats', () => [
    useMocks().generateChat({
      title: 'Default chat',
      messages: [{ id: '1', role: 'user', content: 'Hello', createdAt: new Date(), updatedAt: new Date() }],
      projectId: '1'
    })
  ])

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
    createChat,
    updateChat,
    getChatsInProject
  }
}
