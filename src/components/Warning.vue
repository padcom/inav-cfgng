<template>
  <div class="warning">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.warning {
  padding: 8px 12px;
  background-color: #fff7cd;
  border: solid 1px #ffe55f;
  border-radius: 4px;
}
.warning::v-deep p {
  -webkit-font-smoothing: antialiased;
  line-height: 18px;
  font-size: 14px;
  font-weight: 300;
  color: #333;
}
</style>
