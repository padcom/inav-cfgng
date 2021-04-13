<template>
  <div class="drag-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.drag-container {
  position: relative;
  user-select: none;
  overflow:hidden;
}
</style>
