<script setup lang="ts">

definePageMeta({
  middleware: [
    function (_to, _from) {
      const projectId = _to.query.projectId as string | undefined
      const { createChat } = useChatsStore()

      const chat = createChat({ projectId })

      return projectId
        ? navigateTo({ name: 'projects-projectId-chats-id', params: { projectId, id: chat.id } })
        : navigateTo({ name: 'chats-id', params: { id: chat.id } })
    }
  ]
})
</script>
