<template>
  <div class="panel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: flex;
  margin-top: 16px;
  margin-right: 20px;
  height: 67px;
  border: 1px solid #272727;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(92, 92, 92, 0.5);
  background: #434343 -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.55));
  color: #4f4f4f;
  text-shadow: 0 1px rgba(0, 0, 0, 1.0);
  text-align: center;
  line-height: 2px;
}
</style>