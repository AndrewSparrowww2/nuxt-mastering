import type { IChat, IChatMessage } from '../types'

// Mock data for initial messages
const MOCK_MESSAGES: IChatMessage[] = [
  {
    id: '0',
    role: 'user',
    content:
      'Hello, can you help me with my Nuxt.js project?'
  },
  {
    id: '1',
    role: 'assistant',
    content:
      "Of course! I'd be happy to help with your Nuxt.js project. What specific questions or issues do you have?"
  },
  {
    id: '2',
    role: 'user',
    content: 'How do I implement server-side rendering?'
  },
  {
    id: '3',
    role: 'assistant',
    content:
      "Nuxt.js provides server-side rendering out of the box! You don't need to do any special configuration for basic SSR. If you need specific optimizations, we can discuss those in detail."
  }
]

// Mock data for initial chat
const MOCK_CHAT: IChat = {
  id: '1',
  title: 'Nuxt.js project help',
  messages: [...MOCK_MESSAGES]
}

export { MOCK_CHAT, MOCK_MESSAGES }
