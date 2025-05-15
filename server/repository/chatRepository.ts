import { getProjectById } from './projectRepository'
const dataStorage = useStorage('data')

async function parseChatsListResponse (chats: IChat[]): Promise<IChatWithProject[]> {
  const chatsWithProject = await Promise.all(chats.map(async (chat) => {
    const lastMessage = getLastMessageForChat(chat)
    const project = chat.projectId ? await getProjectById(chat.projectId) : null
    return {
      ...chat,
      messages: lastMessage ? [lastMessage] : [],
      project
    }
  }))

  return chatsWithProject.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAllChats (): Promise<IChatWithProject[]> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  return await parseChatsListResponse(chats)
}

export async function getChatsInProject (projectId: string): Promise<IChatWithProject[]> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  return await parseChatsListResponse(chats.filter(chat => chat.projectId === projectId))
}

export async function createChat (data: { title?: string; projectId?: string } = {}): Promise<IChatWithProject | null> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []

  const newChat: IChat = useMocks().generateChat({
    title: data.title || `Chat ${chats.length + 1}`,
    ...(data.projectId && { projectId: data.projectId })
  })
  chats.unshift(newChat)
  await dataStorage.setItem('chats', chats)

  // No messages yet, so lastMessage is always []
  const project = data.projectId ? await getProjectById(data.projectId) : null
  return {
    ...newChat,
    messages: [],
    project
  }
}

export async function getChatById (id: string): Promise<IChatWithProject | null> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const chat = chats.find((c) => c.id === id)
  if (!chat) return null

  const project = chat.projectId ? await getProjectById(chat.projectId) : null
  return {
    ...chat,
    messages: await getMessagesByChatId(id),
    project
  }
}

export async function updateChat (id: string, data: { title: string }): Promise<IChatWithProject | null> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const chatIndex = chats.findIndex((c) => c.id === id)
  if (chatIndex === -1) return null

  const chat = chats[chatIndex]
  if (!chat) return null

  const updatedChat: IChat = {
    ...chat,
    title: data.title,
    updatedAt: new Date()
  }
  chats[chatIndex] = updatedChat
  await dataStorage.setItem('chats', chats)

  const project = updatedChat.projectId ? await getProjectById(updatedChat.projectId) : null
  return {
    ...updatedChat,
    messages: await getMessagesByChatId(id),
    project
  }
}

export async function deleteChat (id: string): Promise<boolean> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const index = chats.findIndex((chat) => chat.id === id)

  if (index !== -1) {
    chats.splice(index, 1)
    await deleteMessagesForChat(id)
    await dataStorage.setItem('chats', chats)

    return true
  }
  return false
}

export async function getMessagesByChatId (chatId: string): Promise<IChatMessage[]> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const chat = chats.find((c) => c.id === chatId)
  if (!chat) return []

  return chat.messages
}

export async function createMessageForChat (data: {
  content: string
  role: IChatMessage['role']
  chatId: string
}): Promise<IChatMessage | null> {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const chat = chats.find((c) => c.id === data.chatId)
  if (!chat) return null

  const newMessage: IChatMessage = useMocks().generateChatMessage({
    content: data.content,
    role: data.role
  })

  chat.messages.push(newMessage)
  chat.updatedAt = new Date()
  await dataStorage.setItem('chats', chats)
  return newMessage
}

export async function deleteMessagesForChat (chatId: string) {
  const chats = await dataStorage.getItem<IChat[]>('chats') || []
  const chat = chats.find((c) => c.id === chatId)

  if (chat) {
    chat.messages = []
    chat.updatedAt = new Date()
    await dataStorage.setItem('chats', chats)
  }
}

export function getLastMessageForChat (chat: IChat): IChatMessage | null {
  if (!chat || chat.messages.length === 0) return null
  return chat.messages.at(-1)!
}
