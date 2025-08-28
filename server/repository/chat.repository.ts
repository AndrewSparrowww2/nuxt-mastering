export async function getAllChats (): Promise<TChat[]> {
  const res = await prisma.chat.findMany({
    where: { userId: useEvent().context.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })

  return res
}

export async function getChatsInProject (projectId: string): Promise<TChat[]> {
  return await prisma.chat.findMany({
    where: { projectId, userId: useEvent().context.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })
}

export async function getChatById (id: string): Promise<TChat | null> {
  return await prisma.chat.findFirst({
    where: { id, userId: useEvent().context.userId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })
}

export async function getPureChatById (id: string) {
  return await prisma.chat.findFirst({
    where: { id, userId: useEvent().context.userId }
  })
}

export async function createChat (data: { title: string; projectId?: string }) {
  return await prisma.chat.create({
    data: {
      ...data,
      userId: useEvent().context.userId
    },
    include: {
      project: true,
      messages: true
    }
  })
}

export async function updateChat (id: string, data: { title?: string; projectId?: string }) {
  return await prisma.chat.update({
    where: { id, userId: useEvent().context.userId },
    data,
    include: {
      project: true,
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })
}

export async function deleteChat (id: string) {
  return await prisma.chat.deleteMany({
    where: { id, userId: useEvent().context.userId }
  })
}

export async function createMessageForChat (data: {
  content: string
  role: TChatMessage['role']
  chatId: string
  previousResponseId?: string
}) {
  if (data.previousResponseId) {
    await prisma.chat.update({
      where: { id: data.chatId, userId: useEvent().context.userId },
      data: {
        previousResponseId: data.previousResponseId
      }
    })
  }

  return await prisma.message.create({
    data: {
      content: data.content,
      role: data.role,
      chatId: data.chatId
    }
  })
}
