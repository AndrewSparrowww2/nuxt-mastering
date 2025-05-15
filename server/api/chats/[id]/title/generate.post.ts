import { createOpenAIModel, generateTextResponse } from '~~/server/services/ai-service'
import { updateChat } from '~~/server/repository/chatRepository'
import { prompts } from '~~/server/services/prompt-service'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { message }: { message: string } = await readBody(event)

  const generatedTitle = await generateTextResponse(createOpenAIModel(), message, prompts.chatTitle)

  return updateChat(id, { title: generatedTitle })
})
