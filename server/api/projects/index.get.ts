import { getAllProjects } from '~~/server/repository/projectRepository'

export default defineEventHandler(async (_event) => {
  return getAllProjects()
})
