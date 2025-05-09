import { getProjectById } from './projectRepository'

const chats: IChat[] = [
  useMocks().generateChat({
    id: '1',
    title: 'Default chat',
    messages: [{ id: '1', role: 'user', content: 'Hello', createdAt: new Date(), updatedAt: new Date() }],
    projectId: '1'
  })
]

export async function getAllChats (): Promise<IChat[]> {
  return chats
    .map((chat) => {
      const lastMessage = getLastMessageForChat(chat.id)

      return {
        ...chat,
        messages: lastMessage ? [lastMessage] : [],
        project: chat.projectId
          ? getProjectById(chat.projectId) || undefined
          : undefined
      }
    })
    .sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    )
}

export async function createChat (data: { title?: string; projectId?: string } = {}): Promise<IChatWithProject | null> {
  const newChat: IChat = useMocks().generateChat({
    title: data.title || `Chat ${chats.length + 1}`,
    ...(data.projectId && { projectId: data.projectId })
  })
  chats.unshift(newChat)
  // No messages yet, so lastMessage is always []
  return {
    ...newChat,
    messages: [],
    project: data.projectId
      ? getProjectById(data.projectId) || null
      : null
  }
}

export async function getChatById (id: string): Promise<IChatWithProject | null> {
  const chat = chats.find((c) => c.id === id)
  if (!chat) return null

  const lastMessage = getLastMessageForChat(id)
  return {
    ...chat,
    messages: lastMessage ? [lastMessage] : [],
    project: chat.projectId
      ? getProjectById(chat.projectId) || null
      : null
  }
}

export async function updateChat (
  id: string, data: { title?: string; projectId?: string }
): Promise<IChatWithProject | null> {
  const chatIndex = chats.findIndex((c) => c.id === id)
  if (chatIndex === -1) return null

  const chat = chats[chatIndex]
  if (!chat) return null

  const updatedChat: IChat = {
    ...chat,
    ...(data.title && { title: data.title }),
    ...(data.projectId && { projectId: data.projectId }),
    updatedAt: new Date()
  }
  chats[chatIndex] = updatedChat

  const lastMessage = getLastMessageForChat(id)
  return {
    ...updatedChat,
    messages: lastMessage ? [lastMessage] : [],
    project: updatedChat.projectId
      ? getProjectById(updatedChat.projectId) || null
      : null
  }
}

export async function deleteChat (id: string): Promise<boolean> {
  const index = chats.findIndex((chat) => chat.id === id)

  if (index !== -1) {
    chats.splice(index, 1)
    deleteMessagesForChat(id)
    return true
  }
  return false
}

export function getMessagesByChatId (chatId: string): IChatMessage[] {
  const chat = chats.find((c) => c.id === chatId)
  if (!chat) return []

  return [...chat.messages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export async function createMessageForChat (data: {
  content: string
  role: IChatMessage['role']
  chatId: string
}): Promise<IChatMessage | null> {
  const chat = chats.find((c) => c.id === data.chatId)
  if (!chat) return null

  const newMessage: IChatMessage = useMocks().generateChatMessage({
    content: data.content,
    role: data.role
  })

  chat.messages.push(newMessage)
  chat.updatedAt = new Date()
  return newMessage
}

export function deleteMessagesForChat (chatId: string) {
  const chat = chats.find((c) => c.id === chatId)

  if (chat) {
    chat.messages = []
    chat.updatedAt = new Date()
  }
}

export function getLastMessageForChat (
  chatId: string
): IChatMessage | null {
  const chat = chats.find((c) => c.id === chatId)

  if (!chat || chat.messages.length === 0) return null
  return chat.messages.reduce((latest, msg) => msg.createdAt > latest.createdAt ? msg : latest)
}
