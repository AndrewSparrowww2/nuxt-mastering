import type { TProjectRequest } from '~~/server/schemas'

const dataStorage = useStorage('data')

export async function getProjects () {
  return await dataStorage.getItem<IProject[]>('projects') || []
}

export async function saveProjects (projects: IProject[]) {
  await dataStorage.setItem('projects', projects)
}

export async function getAllProjects (): Promise<IProject[]> {
  const projects = await getProjects()
  return projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getProjectById (id: string): Promise<IProject | null> {
  const projects = await getProjects()
  return projects.find((p) => p.id === id) || null
}

export async function createProject (data: TProjectRequest): Promise<IProject> {
  const projects = await getProjects()
  const newProject = useMocks().generateProject({ name: data.name })
  projects.push(newProject)
  await saveProjects(projects)

  return newProject
}

export async function updateProject (id: string, data: TProjectRequest): Promise<IProject | null> {
  const projects = await getProjects()
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
  await saveProjects(projects)

  return updatedProject
}

export async function deleteProject (id: string): Promise<boolean> {
  const projects = await getProjects()
  const index = projects.findIndex((project) => project.id === id)

  if (index !== -1) {
    projects.splice(index, 1)
    await saveProjects(projects)
    return true
  }

  return false
}
