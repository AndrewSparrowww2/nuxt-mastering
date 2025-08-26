<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <div class="title-container">
          <h1 class="title">Chats</h1>
        </div>
      </div>

      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="handleCreateChat"
      >
        New Chat in Project
      </UButton>
    </div>

    <div
      v-if="chats?.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"
    >
      <ChatCard
        v-for="chat in chats"
        :key="chat.id"
        :chat="chat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getChatsInProject } = useChatsStore()

function handleCreateChat () {
  navigateTo('/new-chat')
}

const chats = computed(() => getChatsInProject())
</script>

<style scoped>
.container {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--ui-border);
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
