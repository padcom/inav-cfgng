<template>
  <div class="warning">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.warning {
  padding: 8px 12px;
  line-height: 16px;
  font-size: 12px;
  background-color: #fff7cd;
  border: solid 1px #ffe55f;
  border-radius: 4px;
}
</style>
