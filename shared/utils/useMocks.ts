export function useMocks () {
  function generateProject (project: Partial<TProject> = {}): TProject {
    return {
      id: crypto.randomUUID(),
      userId: '1',
      name: `New project: ${crypto.randomUUID().slice(0, 4)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...project
    }
  }

  function generateChat (chat: Partial<TChat> = {}): TChat {
    return {
      id: crypto.randomUUID(),
      userId: '1',
      title: `New chat: ${crypto.randomUUID().slice(0, 8)}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: null,
      previousResponseId: null,
      ...chat
    }
  }

  function generateChatMessage (message: Partial<TChatMessage> = {}): TChatMessage {
    return {
      id: crypto.randomUUID(),
      role: 'user',
      content: 'Hello',
      createdAt: new Date(),
      updatedAt: new Date(),
      chatId: message.chatId!,
      ...message
    }
  }

  return {
    generateProject,
    generateChat,
    generateChatMessage
  }
}
