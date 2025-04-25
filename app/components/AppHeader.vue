<template>
  <header class="app-header">
    <div class="header-left">
      <UButton
        icon="i-lucide-menu"
        color="primary"
        variant="soft"
        @click="$emit('toggle-sidebar')"
      />
      <UButton icon="i-lucide-plus" to="/new-chat">
        New Chat
      </UButton>
    </div>

    <NuxtLink :to="{ name: 'index' }" class="text-lg font-semibold">
      {{ appConfig.title }}
    </NuxtLink>

    <NuxtLink :to="{ name: 'projects-projectId', params: { projectId: 1 } }" class="text-lg font-semibold">
      Projects
    </NuxtLink>
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
