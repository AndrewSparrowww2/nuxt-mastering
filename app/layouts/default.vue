<template>
  <div class="layout-container">
    <AppHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen"/>
    <AppSidebar :is-open="isSidebarOpen" />

    <div
      class="main-content transition-all duration-300 ease-in-out"
      :class="{
        'ml-64': isSidebarOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(true)
</script>

<style scoped>
.layout-container {
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  background-color: var(--ui-bg);
}

.main-content {
  height: 100%;
}
</style>
