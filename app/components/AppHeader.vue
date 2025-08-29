<template>
  <header class="app-header justify-between">
    <div class="header-left">
      <UButton
        icon="i-lucide-menu"
        color="primary"
        variant="soft"
        @click="$emit('toggle-sidebar')"
      />
      <UButton icon="i-lucide-plus" to="/chats/new-chat">
        New Chat
      </UButton>
    </div>

    <NuxtLink :to="{ name: 'index' }" class="text-lg font-semibold">
      {{ appConfig.title }}
    </NuxtLink>

    <div class="flex items-center">
      <NuxtLink :to="{ name: 'chats' }" class="text-lg font-semibold">
        Your Chats
      </NuxtLink>
      <ProfileMenu class="ml-3" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar'])

const appConfig = useAppConfig()
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem; /* 16 * 0.25 = 4rem */
  background-color: var(--ui-bg-muted);
  border-bottom: 1px solid var(--ui-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
