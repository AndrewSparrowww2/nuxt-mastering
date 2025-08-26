import { getAllProjects } from '~~/server/repository/project.repository'

export default defineEventHandler(async (_event) => {
  console.log('hurra 1')
  return getAllProjects()
})
