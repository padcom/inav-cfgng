<template>
  <div class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 24px 0 24px;
}
</style>
