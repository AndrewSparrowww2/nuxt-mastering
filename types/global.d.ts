import type {
  Project as PrismaProject,
  Message as PrismaMessage,
  MessageRole as PrismaMessageRole,
  Prisma
} from '@prisma/client'

declare global {
  // Re-export Prisma types globally
  type TChatMessage = PrismaMessage
  type TChat = Prisma.ChatGetPayload<{
    include: {
      messages: true
    }
  }>
  type TChatWithProject = Prisma.ChatGetPayload<{
    include: {
      messages: true
      project: true
    }
  }>
  type TProject = PrismaProject
  type TMessageRole = PrismaMessageRole
}

export {}
