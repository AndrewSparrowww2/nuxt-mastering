export function useMocks () {
  function generateProject (project: Partial<IProject> = {}): IProject {
    return {
      id: crypto.randomUUID(),
      name: `New project: ${crypto.randomUUID().slice(0, 4)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...project
    }
  }

  function generateChat (chat: Partial<IChat> = {}): IChat {
    return {
      id: crypto.randomUUID(),
      title: `New chat: ${crypto.randomUUID().slice(0, 8)}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...chat
    }
  }

  function generateChatMessage (message: Partial<IChatMessage> = {}): IChatMessage {
    return {
      id: crypto.randomUUID(),
      role: 'user',
      content: 'Hello',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...message
    }
  }

  return {
    generateProject,
    generateChat,
    generateChatMessage
  }
}
