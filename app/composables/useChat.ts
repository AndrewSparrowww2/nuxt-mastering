import type { IChat, IChatMessage } from '../types'
import { MOCK_CHAT } from './mockData'

export default function useChat () {
  const chat = ref<IChat>(MOCK_CHAT)
  const messages = computed<IChatMessage[]>(
    () => chat.value.messages
  )
  const typing = ref(false)

  function createMessage (
    message: string,
    role: IChatMessage['role']
  ) {
    const id = messages.value.length.toString()

    return {
      id,
      role,
      content: message
    }
  }

  async function sendMessage (message: string) {
    messages.value.push(createMessage(message, 'user'))

    typing.value = true

    try {
      const data = await $fetch<IChatMessage>('/api/ai', {
        method: 'POST',
        body: {
          messages: messages.value
        }
      })
      messages.value.push(data)
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      typing.value = false
    }
  }

  return {
    chat,
    messages,
    typing,
    sendMessage
  }
}
