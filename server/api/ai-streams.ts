import { streamChatResponse, createOpenAIModel } from '../sevices/ai-service'
import type { UIMessage } from 'ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages }: { messages: UIMessage[] } = body

  return streamChatResponse(createOpenAIModel(), messages)
})
