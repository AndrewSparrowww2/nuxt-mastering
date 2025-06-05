import type { CreateMessage } from 'ai'
import { streamChatResponse, createOpenAIModel } from '~~/server/services/ai-service'
import { createMessageForChat } from '~~/server/repository/chat.repository'
import { CreateMessageRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { messages } = await readValidatedBody(event, CreateMessageRequestSchema.parse)
  const newMessage = messages.at(-1) as CreateMessage

  let previousResponseId

  // Create new user message in DB
  if (newMessage) {
    const result = await createMessageForChat({ content: newMessage.content, role: newMessage.role, chatId: id })
    previousResponseId = result?.previousResponseId
  }

  const provider = createOpenAIModel()
  return streamChatResponse({
    model: provider.model,
    messages: [newMessage],
    providerOptions: { [provider.name]: { ...(previousResponseId && { previousResponseId }) } },
    onFinish: async (event) => {
      // Create new assistant message in DB after streaming from AI
      await createMessageForChat({
        content: event.text,
        role: 'assistant',
        chatId: id,
        previousResponseId: event.providerMetadata?.openai?.responseId
      })
    }
  })
})
