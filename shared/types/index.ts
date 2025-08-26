// No imports needed - types are globally available from types/global.d.ts

// Extended chat message interface for UI components
interface IChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

// Chat interface for UI components
interface IChat {
  id: string
  title: string
  messages: IChatMessage[]
  projectId?: string
  previousResponseId?: import('ai').JSONValue
  createdAt: Date
  updatedAt: Date
}

// Project interface for UI components
interface IProject {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

// Chat with project relation
interface IChatWithProject extends IChat {
  project?: IProject | null
}

// JSON value type
type TJSONValue = string | number | boolean | {
  [value: string]: TJSONValue
} | TJSONValue[] | null

// Export types for explicit imports when needed
export type {
  IChatMessage,
  IChat,
  IProject,
  IChatWithProject,
  TJSONValue
}
