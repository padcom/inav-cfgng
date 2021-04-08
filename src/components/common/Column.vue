<template>
  <div class="column" :class="{ 'fixed-width': width }" :style="style">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    width: { type: String, default: null }
  },
  computed: {
    style() {
      const result = {}
      if (this.width !== null) {
        result['width'] = this.width
      }
      return result;
    }
  }
})
</script>
