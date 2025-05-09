import { streamChatResponse, createOpenAIModel } from '~~/server/sevices/ai-service'
import type { UIMessage } from 'ai'
import { getMessagesByChatId, createMessageForChat } from '~~/server/repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody(event)
  const { messages }: { messages: UIMessage[] } = body
  const newMessage = messages.at(-1)

  // Create new user message in DB
  if (newMessage) {
    createMessageForChat({ content: newMessage.content, role: newMessage.role, chatId: id })
  }

  const savedMessages = getMessagesByChatId(id)

  return streamChatResponse({
    model: createOpenAIModel(),
    messages: savedMessages,
    onFinish: (event) => {
      // Create new assistant message in DB after streaming from AI
      createMessageForChat({ content: event.text, role: 'assistant', chatId: id })
    }
  })
})
