import { getAllProjects } from '~~/server/repository/project.repository'

export default defineEventHandler(async (_event) => {
  return getAllProjects()
})
