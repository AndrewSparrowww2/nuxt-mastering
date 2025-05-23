import { useChat } from '@ai-sdk/vue'

export default function useChatStreams (chatId: string) {
  const { chats, updateChat } = useChatsStore()
  const { data: chat, execute, status: fetchStatus } = useFetch<IChat>(`/api/chats/${chatId}`, {
    immediate: false
  })

  const activeChat = computed(() => chats.value.find(c => c.id === chatId))

  async function fetchChat () {
    if (fetchStatus.value !== 'idle') return
    await execute()
    setMessages(chat.value?.messages || [])
  }

  const { messages, append, status: chatStatus, setMessages } = useChat(
    {
      id: chatId,
      api: `/api/chats/${chatId}/messages/generate`,
      initialMessages: chat.value?.messages || []
    }
  )
  const typing = computed(() => ['submitted'].includes(chatStatus.value))

  async function sendMessage (message: string) {
    append({ role: 'user', content: message })
    await nextTick()

    updateChat(chatId, messages.value.map(m => ({ ...m, createdAt: m.createdAt || new Date() })))
  }

  return {
    chat: activeChat,
    fetchChat,
    messages,
    status: chatStatus,
    typing,
    sendMessage
  }
}
