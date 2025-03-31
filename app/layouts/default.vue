<template>
  <div class="layout-container">
    <slot />
  </div>
</template>

<style scoped>
.layout-container {
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  background-color: var(--ui-bg);
}
</style>
