import { updateProject, getProjectById } from '~~/server/repository/project.repository'
import { ProjectRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const project = await getProjectById(id)

  if (!project) throw createError({ statusCode: 400, statusMessage: 'Server default error.' })

  const { name } = await readValidatedBody(event, ProjectRequestSchema.parse)
  return updateProject(id, { name })
})
