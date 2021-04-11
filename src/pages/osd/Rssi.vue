<template>
  <String :value="formatted" />
</template>

<script>
import { defineComponent } from 'vue'

import String from './String.vue'

export default defineComponent({
  components: {
    String
  },
  props: {
    value: { type: Number, default: 99 },
  },
  computed: {
    formatted() {
      return `#001${this.value.padWith(' ', 2)}`
    }
  }
})
</script>
