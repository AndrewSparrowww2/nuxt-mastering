import { createChat } from '~~/server/repository/chatRepository'

export default defineEventHandler(async (_event) => {
  return createChat()
})
