import { useChat } from '@ai-sdk/vue'

export default function useChatStreams (chatId: string) {
  const { chats, updateChatMessages, updateChat } = useChatsStore()
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

    updateChatMessages(chatId, messages.value.map(m => ({ ...m, createdAt: m.createdAt || new Date() })))
  }

  async function assignToProject (projectId: string) {
    if (!chat.value) return

    const originalProjectId = chat.value.projectId

    try {
      await updateChat(chatId, { projectId })
    } catch (error) {
      console.error('Error assigning chat to project', error)
      // Revert optimistic update
      chat.value.projectId = originalProjectId
    }
  }

  return {
    chat: activeChat,
    fetchChat,
    messages,
    status: chatStatus,
    typing,
    sendMessage,
    assignToProject
  }
}
