import { z } from 'zod/v4'

export const ChatRequestSchema = z.object({
  title: z.string().min(1).optional(),
  projectId: z.string().optional()
})

export const CreateMessageRequestSchema = z.object({
  messages: z.array(z.object({
    content: z.string().min(1),
    role: z.enum(['user', 'assistant'])
  }))
})

export const CreateTitleRequestSchema = z.object({
  message: z.string().min(1)
})

export const ProjectRequestSchema = z.object({
  name: z.string().min(1)
})

export type TProjectRequest = z.infer<typeof ProjectRequestSchema>
export type TChatRequest = z.infer<typeof ChatRequestSchema>

