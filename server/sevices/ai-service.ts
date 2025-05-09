import { generateText, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { Message, LanguageModelV1, StreamTextOnFinishCallback, ToolSet } from 'ai'
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

interface IStreamChatArguments {
  model: LanguageModelV1
  messages: Message[]
  system?: string
  onFinish?: StreamTextOnFinishCallback<ToolSet>
}

export async function streamChatResponse (
  {
    model,
    messages,
    system = prompts.default,
    onFinish = () => {}
  }: IStreamChatArguments
) {
  const result = streamText({
    model,
    messages,
    system,
    onFinish
  })

  return result.toDataStreamResponse()
}

