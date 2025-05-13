<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// await in setup creates root level suspense
const { fetchChats } = useChatsStore()
const { fetchProjects } = useProjectsStore()
await Promise.all([fetchChats(), fetchProjects()])
</script>
