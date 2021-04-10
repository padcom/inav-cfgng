<template>
  <div class="drag-item" draggable="false">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    this.$el.component = this
  }
})
</script>

<style lang="scss" scoped>
.drag-item {
  display: inline-block;
}
</style>
