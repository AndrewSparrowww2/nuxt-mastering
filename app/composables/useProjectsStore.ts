import type { IProject } from '../types'

export default function useProjectsStore (projectId?: string) {
  const projects = useState<IProject[]>('projects', () => [
    {
      id: '1',
      name: 'Project 1'
    }
  ])

  const activeProject = computed(() => {
    return projects.value.find((project) => project.id === projectId)
  })

  function createProject () {
    const id = crypto.randomUUID()

    const project = {
      id,
      name: `New project: ${id.slice(0, 8)}`
    }

    projects.value.push(project)

    return project
  }

  function updateProject (updatedProject: Partial<IProject>) {
    if (!activeProject.value) return

    const index = projects.value.findIndex(
      (p) => p.id === activeProject.value?.id
    )

    if (index === -1) return

    projects.value[index] = {
      ...activeProject.value,
      ...updatedProject
    }
  }

  return { projects, activeProject, createProject, updateProject }
}
