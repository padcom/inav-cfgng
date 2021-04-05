<template>
  <h2 class="page-header full-width">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
.page-header {
  font-size: 20px;
  font-weight: 100;
  border-bottom: solid 1px var(--color-info);
  padding-bottom: 8px;
  margin-bottom: 24px;
}
</style>
