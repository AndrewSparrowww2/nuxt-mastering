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
  previousResponseId?: import('ai').JSONValue
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

type TJSONValue = string | number | boolean | {
  [value: string]: TJSONValue
} | TJSONValue[] | null
