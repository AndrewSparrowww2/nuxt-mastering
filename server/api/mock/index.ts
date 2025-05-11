export default defineEventHandler(async (_event) => {
  const dataStorage = useStorage('data')
  const chats = [useMocks().generateChat({
    id: '1',
    title: 'Default chat',
    messages: [{ id: '1', role: 'user', content: 'Hello', createdAt: new Date(), updatedAt: new Date() }],
    projectId: '1'
  })]
  const projects = [useMocks().generateProject({ id: '1', name: 'Project 1' })]

  await dataStorage.setItem('chats', chats)
  await dataStorage.setItem('projects', projects)
  await dataStorage.setItem('test:foo', { hello: 'world' })

  const result = await Promise.all([
    dataStorage.getItem('chats'),
    dataStorage.getItem('projects')
  ])

  return result
})
