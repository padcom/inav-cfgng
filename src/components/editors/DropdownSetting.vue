<template>
  <DropdownField
    v-bind="$attrs"
    v-model.number="settings[item].value"
    :options="options || settings[item].values"
    :description="settings[item].description"
  >
    <slot />
  </DropdownField>
</template>

<script>
import { defineComponent } from 'vue'

import DropdownField from './DropdownField.vue'

import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  components: {
    DropdownField,
  },
  props: {
    item: { type: String, required: true },
    options: { type: Array, default: null },
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
