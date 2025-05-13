import { createProject } from '~~/server/repository/projectRepository'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // body can be undefined and needs to be validated via schema
  return createProject({ name: body?.name })
})
