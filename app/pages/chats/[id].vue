<script setup lang="ts">
const route = useRoute()
const { chat, messages, fetchChat, sendMessage, typing } = useChatStreams(route.params.id as string)
await fetchChat()

if (!chat.value) {
  await navigateTo({ name: 'index' }, { replace: true })
}

useHead({
  title: chat.value?.title
})
</script>

<template>
  <ChatWindow v-if="chat" :chat :messages :typing @send-message="sendMessage" />
</template>
