<template>
  <div v-show="settings[item].value == value" class="condition">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Panel from './common/Panel.vue'
import { useSettings } from '../composables/settings'

export default defineComponent({
  components: {
    Panel
  },
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

<style lang="scss" scoped>
.condition {
  flex-basis: 100%;
  display: flex;
  // flex: 1 1 0px;
  flex-direction: column;
  // flex-wrap: wrap;
}
</style>
