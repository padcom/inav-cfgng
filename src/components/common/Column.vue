<template>
  <div class="column" :style="style">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    fullWidth: { type: Boolean, default: false },
    width: { type: String, default: null }
  },
  computed: {
    style() {
      const result = {}
      if (this.width !== null) {
        result['flex-basis'] = this.width
      } else if (this.fullWidth) {
        result['flex-basis'] = `100%`
      }
      return result;
    }
  }
})
</script>
