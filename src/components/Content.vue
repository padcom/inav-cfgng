<template>
  <div class="content">
    <slot>
      <h1 v-for="index in 20">Content</h1>
    </slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showActions: { type: Boolean, default: false }
  }
})
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
}
</style>
