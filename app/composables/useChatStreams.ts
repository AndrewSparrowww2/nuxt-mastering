import { useChat } from '@ai-sdk/vue'

export default function useChatStreams (chatId?: string) {
  const { chats, updateChat } = useChatsStore()

  const activeChat = computed(() => {
    return chats.value.find((chat) => chat.id === chatId)
  })

  const { messages, append, status } = useChat({ id: chatId, api: '/api/ai-streams' })
  const typing = computed(() => ['submitted'].includes(status.value))

  function sendMessage (message: string) {
    append({
      role: 'user',
      content: message
    })

    updateChat({ id: chatId, updatedAt: new Date() })
  }

  return {
    chat: activeChat,
    messages,
    status,
    typing,
    sendMessage
  }
}
