import { generateChatResponse, createOpenAIModel } from '../sevices/ai-service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages } = body

  const id = messages.length.toString()

  const response = await generateChatResponse(createOpenAIModel(), messages)

  return {
    id,
    role: 'assistant',
    content: `(server) ${response}`
  }
})
