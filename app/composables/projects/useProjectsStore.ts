export default function useProjectsStore (projectId?: string) {
  const projects = useState<TProject[]>('projects', () => [])
  const { data, execute, status } = useFetch<TProject[]>('/api/projects', {
    immediate: false,
    default: () => []
  })

  async function fetchProjects () {
    if (status.value !== 'idle') return
    await execute()
    projects.value = data.value
  }

  const activeProject = computed(() => {
    return projects.value.find((project) => project.id === projectId)
  })

  async function createProject () {
    const project = await $fetch<TProject>('/api/projects', {
      method: 'POST',
      body: { name: `New project: ${crypto.randomUUID().slice(0, 2)}` }
    })
    projects.value.unshift(project)

    return project
  }

  function updateProject (updatedProject: Pick<TProject, 'name'>) {
    if (!activeProject.value) return

    const index = projects.value.findIndex(
      (p) => p.id === activeProject.value?.id
    )

    projects.value[index] = {
      ...activeProject.value,
      ...updatedProject
    }

    $fetch<TProject>(`/api/projects/${activeProject.value.id}`, {
      method: 'PUT',
      body: updatedProject
    })
  }

  return { projects, activeProject, fetchProjects, createProject, updateProject }
}
