export async function getAllChats (): Promise<TChat[]> {
  const res = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })

  console.log('hurra 4', res)
  return res
}

export async function getChatsInProject (projectId: string): Promise<TChat[]> {
  return await prisma.chat.findMany({
    where: { projectId },
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
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  })
}

export async function getPureChatById (id: string) {
  return await prisma.chat.findFirst({
    where: { id }
  })
}

export async function createChat (data: { title: string; projectId?: string }) {
  return await prisma.chat.create({
    data: {
      ...data,
      userId: '1'
    },
    include: {
      project: true,
      messages: true
    }
  })
}

export async function updateChat (id: string, data: { title?: string; projectId?: string }) {
  return await prisma.chat.update({
    where: { id },
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
    where: { id }
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
      where: { id: data.chatId },
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
