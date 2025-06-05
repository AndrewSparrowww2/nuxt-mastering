import { getProjectById } from './projectRepository'
const dataStorage = useStorage('data')

export async function getChats () {
  return await dataStorage.getItem<IChat[]>('chats:all') || []
}

export async function saveChats (chats: IChat[]) {
  await dataStorage.setItem('chats:all', chats)
}

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
  const chats = await getChats()
  return await parseChatsListResponse(chats)
}

export async function getChatsInProject (projectId: string): Promise<IChatWithProject[]> {
  const chats = await getChats()
  return await parseChatsListResponse(chats.filter(chat => chat.projectId === projectId))
}

export async function createChat (data: { title?: string; projectId?: string } = {}): Promise<IChatWithProject | null> {
  const chats = await getChats()

  const newChat: IChat = useMocks().generateChat({
    title: data.title || `Chat ${chats.length + 1}`,
    ...(data.projectId && { projectId: data.projectId })
  })
  chats.unshift(newChat)
  await saveChats(chats)

  // No messages yet, so lastMessage is always []
  const project = data.projectId ? await getProjectById(data.projectId) : null
  return {
    ...newChat,
    messages: [],
    project
  }
}

export async function getChatById (id: string): Promise<IChatWithProject | null> {
  const chats = await getChats()
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
  const chats = await getChats()
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
  await saveChats(chats)

  const project = updatedChat.projectId ? await getProjectById(updatedChat.projectId) : null
  return {
    ...updatedChat,
    messages: await getMessagesByChatId(id),
    project
  }
}

export async function deleteChat (id: string): Promise<boolean> {
  const chats = await getChats()
  const index = chats.findIndex((chat) => chat.id === id)

  if (index !== -1) {
    chats.splice(index, 1)
    await deleteMessagesForChat(id)
    await saveChats(chats)

    return true
  }
  return false
}

export async function getMessagesByChatId (chatId: string): Promise<IChatMessage[]> {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === chatId)
  if (!chat) return []

  return chat.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

export async function createMessageForChat (data: {
  content: string
  role: IChatMessage['role']
  chatId: string
  previousResponseId?: TJSONValue
}): Promise<{ message: IChatMessage; previousResponseId?: TJSONValue } | null> {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === data.chatId)
  if (!chat) return null

  const message: IChatMessage = useMocks().generateChatMessage({
    content: data.content,
    role: data.role
  })

  chat.messages.push(message)
  chat.updatedAt = new Date()
  if (data.role === 'assistant') chat.previousResponseId = data.previousResponseId

  await saveChats(chats)
  return { message, previousResponseId: chat.previousResponseId }
}

export async function deleteMessagesForChat (chatId: string) {
  const chats = await getChats()
  const chat = chats.find((c) => c.id === chatId)

  if (chat) {
    chat.messages = []
    chat.updatedAt = new Date()
    await saveChats(chats)
  }
}

export function getLastMessageForChat (chat: IChat): IChatMessage | null {
  if (!chat || chat.messages.length === 0) return null
  return chat.messages.at(-1)!
}
