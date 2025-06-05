import { createOpenAIModel, generateTextResponse } from '~~/server/services/ai-service'
import { updateChat } from '~~/server/repository/chat.repository'
import { prompts } from '~~/server/services/prompt-service'
import { CreateTitleRequestSchema } from '~~/server/schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { message } = await readValidatedBody(event, CreateTitleRequestSchema.parse)

  const generatedTitle = await generateTextResponse(createOpenAIModel().model, message, prompts.chatTitle)

  return updateChat(id, { title: generatedTitle })
})
