export async function getAllProjects (): Promise<TProject[]> {
  const res = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return res
}

export async function getProjectById (id: string): Promise<TProject | null> {
  return await prisma.project.findFirst({
    where: { id }
  })
}

export async function createProject (data: { name: string }): Promise<TProject> {
  return await prisma.project.create({
    data: {
      name: data.name,
      userId: '1'
    }
  })
}

export async function updateProject (id: string, data: { name: string }): Promise<TProject | null> {
  return await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      updatedAt: new Date()
    }
  })
}

export async function deleteProject (id: string) {
  return await prisma.project.delete({
    where: { id }
  })
}
