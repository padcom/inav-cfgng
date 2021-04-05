<template>
  <NumericField
    v-bind="$attrs"
    v-model.number="settings[item].value"
    :min="settings[item].min"
    :max="settings[item].max"
    :title="settings[item].description"
    :description="settings[item].description"
  >
    <slot />
  </NumericField>
</template>

<script>
import { defineComponent } from 'vue'

import NumericField from './NumericField.vue'

import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  inheritAttrs: false,
  components: {
    NumericField,
  },
  props: {
    item: { type: String, required: true },
  },
  setup() {
    const { settings } = useSettings()
    const page = useCurrentPage()
    return { settings, page }
  },
  created() {
    this.page?.data?.settings.push(this.item)
  }
})
</script>
