<template>
  <div class="panel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
  line-height: 2px;
  height: 67px;
  border: 1px solid #272727;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(92, 92, 92, 0.5);
  background: #434343 -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.45));
  color: #4f4f4f;
  text-shadow: 0 1px rgba(0, 0, 0, 1.0);
  text-align: center;
}
</style>