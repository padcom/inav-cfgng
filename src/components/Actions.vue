<template>
  <div class="actions">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  height: 48px;
  background-color: #EFEFEF;
  border-top: solid 1px white;
  margin-left: -24px;
  margin-right: -24px;
  margin-top: auto;
}

.left {
  margin-right: auto;
}

.right {
  padding-right: 24px;
}
</style>
