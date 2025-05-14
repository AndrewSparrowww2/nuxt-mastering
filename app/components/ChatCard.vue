<template>
  <NuxtLink :to="`/projects/${projectId}/chats/${chat.id}`">
    <UCard class="h-full">
      <template #header>
        <h3 class="text-md font-medium">
          {{ chat.title || 'Untitled Chat' }}
        </h3>
      </template>
      <p
        v-if="chat.messages.length"
        class="text-sm line-clamp-2 text-(--ui-text-dimmed)"
      >
        {{ chat.messages.at(-1)?.content }}
      </p>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  chat: IChat
  projectId: string
}>()
</script>
