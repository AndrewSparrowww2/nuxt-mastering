import { getChatsInProject } from '~~/server/repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return getChatsInProject(id)
})
