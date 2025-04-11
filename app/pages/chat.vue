<script setup lang="ts">
const { chat, messages, sendMessage, typing } = useChatStreams()

useHead({
  title: chat.value.title
})
</script>

<template>
  <ChatWindow :chat :messages :typing @send-message="sendMessage" />
</template>
