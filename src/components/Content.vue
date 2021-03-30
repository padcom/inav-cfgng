<template>
  <div class="content">
    <slot>
      <h1 v-for="index in 20">Content</h1>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.content {
  overflow: auto;
}
</style>
