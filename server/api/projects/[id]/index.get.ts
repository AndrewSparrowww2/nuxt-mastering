import { getProjectById } from '~~/server/repository/projectRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return getProjectById(id)
})
