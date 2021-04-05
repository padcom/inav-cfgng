<template>
  <StringField
    v-bind="$attrs"
    v-model.number="settings[item].value"
    :title="settings[item].description"
    :description="settings[item].description"
  >
    <slot />
  </StringField>
</template>

<script>
import { defineComponent } from 'vue'

import StringField from './StringField.vue'

import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  inheritAttrs: false,
  components: {
    StringField,
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
