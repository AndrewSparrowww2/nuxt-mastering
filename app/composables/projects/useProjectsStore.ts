export default function useProjectsStore (projectId?: string) {
  const { data: projects, execute, status } = useAsyncData<IProject[]>('projects', () => $fetch('/api/projects'), {
    immediate: false,
    deep: true,
    default: () => []
  })

  async function fetchProjects () {
    if (status.value !== 'idle') return
    await execute()
  }

  const activeProject = computed(() => {
    return projects.value.find((project) => project.id === projectId)
  })

  async function createProject () {
    const project = await $fetch<IProject>('/api/projects', { method: 'POST' })
    projects.value.unshift(project)

    return project
  }

  function updateProject (updatedProject: Pick<IProject, 'name'>) {
    if (!activeProject.value) return

    const index = projects.value.findIndex(
      (p) => p.id === activeProject.value?.id
    )

    projects.value[index] = {
      ...activeProject.value,
      ...updatedProject
    }

    $fetch<IProject>(`/api/projects/${activeProject.value.id}`, {
      method: 'PUT',
      body: updatedProject
    })
  }

  return { projects, activeProject, fetchProjects, createProject, updateProject }
}
