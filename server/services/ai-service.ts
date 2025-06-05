import { generateText, streamText } from 'ai'
import { createOpenAI, openai } from '@ai-sdk/openai'
import type { LanguageModelV1, StreamTextOnFinishCallback, ToolSet, ProviderMetadata, CreateMessage } from 'ai'
import { prompts } from './prompt-service'

interface IModelProvider {
  model: LanguageModelV1
  name: string
}

export function createOpenAIModel (): IModelProvider {
  const provider = createOpenAI({
    apiKey: useRuntimeConfig().openaiApiKey
  })

  return { model: provider.responses('gpt-4o-mini'), name: 'openai' }
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
  messages: CreateMessage[]
  system?: string
  onFinish?: StreamTextOnFinishCallback<ToolSet>
  providerOptions?: ProviderMetadata
}

export async function streamChatResponse ({
  model,
  messages,
  system = prompts.default,
  onFinish = () => {},
  providerOptions = {}
}: IStreamChatArguments) {
  const result = streamText({
    model,
    messages,
    system,
    providerOptions,
    tools: {
      web_search_preview: openai.tools.webSearchPreview()
    },
    onError: (error) => {
      console.error('Error streaming chat response:', error)
    },
    onFinish
  })

  return result.toDataStreamResponse()
}

