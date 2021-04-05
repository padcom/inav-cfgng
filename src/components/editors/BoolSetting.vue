<template>
  <BoolField
    v-bind="$attrs"
    v-model="settings[item].value"
    :title="settings[item].description"
    :description="settings[item].description"
  >
    <slot />
  </BoolField>
</template>

<script>
import { defineComponent } from 'vue'

import BoolField from './BoolField.vue'

import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  inheritAttrs: false,
  components: {
    BoolField,
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
  },
})
</script>
