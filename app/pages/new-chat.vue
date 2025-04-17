<script setup lang="ts">
definePageMeta({
  middleware: [
    function (_to, _from) {
      const { createChat } = useChatsStore()

      const chat = createChat()
      return navigateTo({ name: 'chats-id', params: { id: chat.id } })
    }
  ]
})
</script>
