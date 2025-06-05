import { saveChats, getChats } from '~~/server/repository/chatRepository'
import { saveProjects, getProjects } from '~~/server/repository/projectRepository'

export default defineEventHandler(async (_event) => {
  const chats = [useMocks().generateChat({
    id: '1',
    title: 'Default chat',
    messages: [{ id: '1', role: 'user', content: 'Hello', createdAt: new Date() }],
    projectId: '1'
  })]
  const projects = [useMocks().generateProject({ id: '1', name: 'Project 1' })]

  await saveChats(chats)
  await saveProjects(projects)

  const result = await Promise.all([
    getChats(),
    getProjects()
  ])

  return result
})
