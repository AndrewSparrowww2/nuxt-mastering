import { generateText, streamText } from 'ai'
import { createOpenAI, openai } from '@ai-sdk/openai'
import type { Message, LanguageModelV1, StreamTextOnFinishCallback, ToolSet } from 'ai'
import { prompts } from './prompt-service'

export function createOpenAIModel () {
  const provider = createOpenAI({
    apiKey: useRuntimeConfig().openaiApiKey
  })

  return provider.responses('gpt-4o-mini')
}

export async function generateTextResponse (
  model: LanguageModelV1,
  prompt: string,
  system: string = prompts.default
) {
  const response = await generateText({
    model,
    prompt,
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

export async function streamChatResponse ({
  model,
  messages,
  system = prompts.default,
  onFinish = () => {}
}: IStreamChatArguments) {
  const result = streamText({
    model,
    messages,
    system,
    tools: {
      web_search_preview: openai.tools.webSearchPreview()
    },
    onFinish
  })

  return result.toDataStreamResponse()
}

