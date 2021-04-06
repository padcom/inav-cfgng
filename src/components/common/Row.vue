<template>
  <div class="column full-width">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Column from './Column.vue'

export default defineComponent({
  components: {
    Column
  }
})
</script>

