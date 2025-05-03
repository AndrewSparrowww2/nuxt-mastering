interface IChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
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
}
