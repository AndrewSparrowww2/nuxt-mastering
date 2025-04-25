<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { IChat } from '../types'

defineProps<{
  isOpen: boolean
}>()

const { getChatsInProject } = useChatsStore()

function formatChatItem (chat: IChat): NavigationMenuItem {
  return {
    label: chat.title,
    to: { name: 'chats-id', params: { id: chat.id } },
    active: useRoute().params.id === chat.id
  }
}

const formattedChats = computed(() => {
  return getChatsInProject().map(formatChatItem)
})
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64
      transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="overflow-y-auto p-4">
      <div v-if="formattedChats.length" class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <h2
            class="text-sm font-semibold text-(--ui-text-muted)"
          >
            Generic Chats
          </h2>
        </div>

        <UNavigationMenu
          orientation="vertical"
          class="w-full mb-4"
          :items="formattedChats"
        />
      </div>

      <template v-else>
        <UAlert title="No chats" description="Create a new chat" color="neutral" variant="soft" />
        <UButton
          size="sm"
          color="neutral"
          variant="soft"
          icon="i-heroicons-plus-small"
          to="/new-chat"
          class="mt-2 w-full"
        >
          New Chat
        </UButton>
      </template>
    </div>
  </aside>
</template>
