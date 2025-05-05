const projects: IProject[] = [
  useMocks().generateProject({ id: '1', name: 'Project 1' })
]

export function getAllProjects (): IProject[] {
  return [...projects].sort((a, b) => a.name.localeCompare(b.name))
}

export function getProjectById (id: string): IProject | null {
  return projects.find((p) => p.id === id) || null
}

export async function createProject (data: { name?: string } = {}): Promise<IProject> {
  const newProject = useMocks().generateProject({ ...(data.name && { name: data.name }) })
  projects.push(newProject)

  return newProject
}

export async function updateProject (id: string, data: { name?: string } = {}): Promise<IProject | null> {
  const projectIndex = projects.findIndex((p) => p.id === id)
  if (projectIndex === -1) return null

  const project = projects[projectIndex]
  if (!project) return null

  const updatedProject: IProject = {
    ...project,
    ...(data.name && { name: data.name }),
    updatedAt: new Date()
  }
  projects[projectIndex] = updatedProject

  return updatedProject
}

export async function deleteProject (id: string): Promise<boolean> {
  const index = projects.findIndex((project) => project.id === id)

  if (index !== -1) {
    projects.splice(index, 1)
    return true
  }

  return false
}
