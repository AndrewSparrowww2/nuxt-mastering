interface IChatMessage {
  id: string
  role: 'data' | 'system' | 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface IChat {
  id: string
  title: string
  messages: IChatMessage[]
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

interface IProject {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface IChatWithProject extends IChat {
  project?: IProject | null
}
