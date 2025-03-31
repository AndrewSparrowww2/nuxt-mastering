export interface IChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface IChat {
  id: string
  title: string
  messages: IChatMessage[]
}
