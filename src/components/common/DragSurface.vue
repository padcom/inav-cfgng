<template>
  <div class="drag-surface">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      draggedElement: null,
    }
  },
  mounted() {
    window.document.addEventListener('onmouseup', this.endDrag)
  },
  beforeUnmount() {
    window.document.removeEventListener('onmouseup', this.endDrag)
  },
  methods: {
    drag(e) {
    },
    endDrag() {
    }
  }
})
</script>

<style lang="scss" scoped>
.
</style>
