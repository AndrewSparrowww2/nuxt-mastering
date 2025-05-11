import { updateProject, getProjectById } from '~~/server/repository/projectRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const project = await getProjectById(id)

  if (!project) throw createError({ statusCode: 400, statusMessage: 'Server default error.' })

  const { name } = await readBody(event)
  return updateProject(id, { name })
})
