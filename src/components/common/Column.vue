<template>
  <div class="column">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.column {
  flex: 1 0 0px;
}

.column + .column {
  margin-left: 12px;
}
</style>
