const dataStorage = useStorage('data')

export async function getAllProjects (): Promise<IProject[]> {
  const projects = await dataStorage.getItem<IProject[]>('projects') || []
  return projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getProjectById (id: string): Promise<IProject | null> {
  const projects = await dataStorage.getItem<IProject[]>('projects') || []
  return projects.find((p) => p.id === id) || null
}

export async function createProject (data: { name?: string } = {}): Promise<IProject> {
  const projects = await dataStorage.getItem<IProject[]>('projects') || []
  const newProject = useMocks().generateProject({ ...(data.name && { name: data.name }) })
  projects.push(newProject)
  await dataStorage.setItem('projects', projects)

  return newProject
}

export async function updateProject (id: string, data: { name: string }): Promise<IProject | null> {
  const projects = await dataStorage.getItem<IProject[]>('projects') || []
  const projectIndex = projects.findIndex((p) => p.id === id)
  if (projectIndex === -1) return null

  const project = projects[projectIndex]
  if (!project) return null

  const updatedProject: IProject = {
    ...project,
    name: data.name,
    updatedAt: new Date()
  }
  projects[projectIndex] = updatedProject
  await dataStorage.setItem('projects', projects)

  return updatedProject
}

export async function deleteProject (id: string): Promise<boolean> {
  const projects = await dataStorage.getItem<IProject[]>('projects') || []
  const index = projects.findIndex((project) => project.id === id)

  if (index !== -1) {
    projects.splice(index, 1)
    await dataStorage.setItem('projects', projects)
    return true
  }

  return false
}
