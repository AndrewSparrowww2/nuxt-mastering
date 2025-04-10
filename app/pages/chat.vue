<script setup lang="ts">
const { chat, messages, sendMessage, typing } = useChat()

useHead({
  title: chat.value.title
})
</script>

<template>
  <ChatWindow :chat :messages :typing @send-message="sendMessage" />
</template>
