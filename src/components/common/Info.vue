<template>
  <div class="warning">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.warning {
  padding: 8px 12px;
  background-color: #008000;
  border: solid 1px #006800;
  border-radius: 4px;
}
.warning:deep(p) {
  -webkit-font-smoothing: antialiased;
  line-height: 18px;
  font-size: calc(var(--default-font-size) + 2px);
  font-weight: 300;
  color: white;
}
</style>
