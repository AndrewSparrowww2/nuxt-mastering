import { getChatById } from '~~/server/repository/chat.repository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  return getChatById(id)
})
