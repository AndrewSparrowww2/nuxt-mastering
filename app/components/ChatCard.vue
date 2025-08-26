<template>
  <NuxtLink :to="projectId ? `/projects/${projectId}/chats/${chat.id}` : `/chats/${chat.id}`">
    <UCard class="h-full">
      <template #header>
        <h3 class="text-md font-medium">
          {{ chat.title || 'Untitled Chat' }}
        </h3>
      </template>
      <p class="text-sm line-clamp-2 text-(--ui-text-dimmed)">
        {{ chat.messages.at(-1)?.content || 'No messages, yet' }}
      </p>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  chat: TChat
  projectId?: string
}>()
</script>
