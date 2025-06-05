import { getChatsInProject } from '~~/server/repository/chat.repository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return getChatsInProject(id)
})
