import type { IChat } from '../types'

export default function useChatsStore () {
  const chats = useState<IChat[]>('chats', () => [])

  function createChat () {
    const chat = {
      id: crypto.randomUUID(),
      title: `Chat ${chats.value.length + 1}`,
      messages: [],
      projectId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }

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

  function getChatsInProject (projectId: string) {
    return chats.value.filter((c) => c.projectId === projectId)
  }

  return {
    chats,
    createChat,
    updateChat,
    getChatsInProject
  }
}
