<script setup lang="ts">
const route = useRoute()
const projectId = route.params.projectId as string

const { getChatsInProject } = useChatsStore()

const chats = getChatsInProject(projectId)
</script>

<template>
  <div class="pt-4">
    <div
      v-if="chats?.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <ChatCard
        v-for="chat in chats"
        :key="chat.id"
        :chat="chat"
        :project-id="projectId"
      />
    </div>
  </div>
</template>
