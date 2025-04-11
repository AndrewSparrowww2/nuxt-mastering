import { useChat } from '@ai-sdk/vue'
import type { IChat } from '../types'
import { MOCK_CHAT } from './mockData'

export default function useChatStreaming () {
  const chat = ref<IChat>(MOCK_CHAT)
  const { messages, append, status } = useChat({ api: '/api/ai-streams' })
  const typing = computed(() => ['submitted'].includes(status.value))

  return {
    chat,
    messages,
    status,
    typing,
    sendMessage: (message: string) => {
      append({
        role: 'user',
        content: message
      })
    }
  }
}
