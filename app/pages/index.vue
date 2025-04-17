<template>
  <UContainer class="page-container">
    <span class="text-2xl font-bold mb-4">{{ appConfig.title }}</span>
    <UButton to="/new-chat" class="button">
      Start Chat
    </UButton>
  </UContainer>
</template>

<script setup lang="ts" >
const appConfig = useAppConfig()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
