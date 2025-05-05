import { useMocks } from '~~/shared/utils/useMocks'

export default function useProjectsStore (projectId?: string) {
  const projects = useState<IProject[]>('projects', () => [
    useMocks().generateProject({ id: '1', name: 'Project 1' })
  ])

  const activeProject = computed(() => {
    return projects.value.find((project) => project.id === projectId)
  })

  function createProject () {
    const project = useMocks().generateProject()
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
