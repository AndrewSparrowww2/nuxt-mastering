<template>
  <NuxtLink
    :to="`/projects/${projectId}/chats/${chat.id}`"
  >
    <UCard class="h-full">
      <template #header>
        <h3 class="text-md font-medium">
          {{ chat.title || 'Untitled Chat' }}
        </h3>
      </template>
      <p
        v-if="messages?.length"
        class="text-sm line-clamp-2 text-(--ui-text-dimmed)"
      >
        {{ messages.at(-1)?.content }}
      </p>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IChat } from '~/types'

const props = defineProps<{
  chat: IChat
  projectId: string
}>()

const { messages } = useChatStreams(props.chat.id)
</script>
