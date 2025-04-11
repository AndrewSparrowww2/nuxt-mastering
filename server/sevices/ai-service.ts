import { generateText, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { Message, LanguageModelV1 } from 'ai'
import { prompts } from './prompt-service'

export function createOpenAIModel () {
  const provider = createOpenAI({
    apiKey: useRuntimeConfig().openaiApiKey
  })

  return provider('gpt-4o-mini')
}

export async function generateChatResponse (
  model: LanguageModelV1,
  messages: Message[],
  system: string = prompts.default
) {
  const response = await generateText({
    model,
    messages,
    system
  })

  return response.text.trim()
}

export async function streamChatResponse (
  model: LanguageModelV1,
  messages: Message[],
  system: string = prompts.default
) {
  const result = streamText({
    model,
    messages,
    system
  })

  return result.toDataStreamResponse()
}

