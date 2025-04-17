export interface IChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface IChat {
  id: string
  title: string
  messages: IChatMessage[]
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

export interface IProject {
  id: string
  name: string
}
