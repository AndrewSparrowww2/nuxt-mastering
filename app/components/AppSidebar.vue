<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  isOpen: boolean
}>()

const route = useRoute()
const { getChatsInProject, createChat } = useChatsStore()
const { projects, createProject } = useProjectsStore()

function formatProjectChat (
  project: TProject,
  chat: TChat
): NavigationMenuItem {
  return {
    label: chat.title || 'Untitled Chat',
    to: `/projects/${project.id}/chats/${chat.id}`,
    active: route.params.id === chat.id
  }
}

const chatsInCurrentProject = computed(() => getChatsInProject(route.params.projectId as string))

function formatProjectItem (
  project: TProject
): NavigationMenuItem {
  const isCurrent = route.params.projectId === project.id

  const baseItem: NavigationMenuItem = {
    label: project.name,
    to: `/projects/${project.id}`,
    active: isCurrent,
    defaultOpen: isCurrent
  }

  if (isCurrent) {
    return {
      ...baseItem,
      children: chatsInCurrentProject.value.map((chat) => formatProjectChat(project, chat))
    }
  }

  return baseItem
}

const projectItems = computed<NavigationMenuItem[]>(() => projects.value?.map(formatProjectItem) || [])

const chatsWIthoutProject = computed(() => getChatsInProject().map((c) => ({
  label: c.title || 'Untitled Chat',
  to: `/chats/${c.id}`,
  active: route.params.id === c.id
})))

async function handleCreateProject () {
  const newProject = await createProject()
  const newChat = await createChat({ projectId: newProject.id })

  navigateTo({ name: 'projects-projectId-chats-id', params: { projectId: newProject.id, id: newChat.id } })
}
</script>

<template>
  <aside
    class="fixed top-16 left-0 bottom-0 w-64 p-4 overflow-y-auto
      transition-transform duration-300 z-40 bg-(--ui-bg-muted) border-r-(--ui-border) border-r"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="mb-4 pb-4 border-b border-(--ui-border)">
      <h2 class="text-sm font-semibold text-(--ui-text-muted) mb-2">
        Projects
      </h2>
      <UNavigationMenu
        orientation="vertical"
        class="w-full mb-2"
        :items="projectItems"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="soft"
        icon="i-heroicons-plus-small"
        class="mt-2 w-full"
        @click="handleCreateProject"
      >
        New Project
      </UButton>
    </div>

    <div v-if="chatsWIthoutProject.length">
      <h2 class="text-sm font-semibold text-(--ui-text-muted) mb-2">
        Generic Chats
      </h2>

      <UNavigationMenu
        orientation="vertical"
        class="w-full"
        :items="chatsWIthoutProject"
      />
    </div>

    <template v-else>
      <UAlert title="No chats" description="Create a new chat" color="neutral" variant="soft" />
      <UButton
        size="sm"
        color="neutral"
        variant="soft"
        icon="i-heroicons-plus-small"
        class="mt-2 w-full"
        to="/chats/new-chat"
      >
        New Chat
      </UButton>
    </template>
  </aside>
</template>

