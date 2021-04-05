<template>
  <div :style="{ display: settings[item].value == value ? 'block' : 'none' }">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { useSettings } from '../composables/settings'

export default defineComponent({
  setup() {
    const { settings } = useSettings()
    return { settings }
  },
  props: {
    item: { type: String, required: true },
    value: { type: [Number, String], required: true },
  }
})
</script>
