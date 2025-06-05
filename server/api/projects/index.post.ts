import { createProject } from '~~/server/repository/project.repository'
import { ProjectRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, ProjectRequestSchema.parse)

  return createProject({ name })
})
