import { streamChatResponse, createOpenAIModel } from '~~/server/services/ai-service'
import type { UIMessage } from 'ai'
import { getMessagesByChatId, createMessageForChat } from '~~/server/repository/chatRepository'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { messages }: { messages: UIMessage[] } = await readBody(event)
  const newMessage = messages.at(-1)

  // Create new user message in DB
  if (newMessage) {
    await createMessageForChat({ content: newMessage.content, role: newMessage.role, chatId: id })
  }

  const savedMessages = await getMessagesByChatId(id)
  console.log('In generatePost', newMessage, savedMessages)

  return streamChatResponse({
    model: createOpenAIModel(),
    messages: savedMessages,
    onFinish: (event) => {
      // Create new assistant message in DB after streaming from AI
      createMessageForChat({ content: event.text, role: 'assistant', chatId: id })
    }
  })
})
