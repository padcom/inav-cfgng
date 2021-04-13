<template>
  <NumericField
    v-bind="$attrs"
    v-model.number="settings[item].value"
    :min="settings[item].min"
    :max="settings[item].max"
    :title="settings[item].description"
    :description="settings[item].description"
    @update:modelValue="save"
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
    autosave: { type: Boolean, default: false },
  },
  setup() {
    const { settings, saveSetting } = useSettings()
    const page = useCurrentPage()
    return { settings, saveSetting, page }
  },
  created() {
    this.page?.data?.settings.push(this.item)
  },
  methods: {
    save() {
      console.log('NumericSetting.update', ...arguments)
      if (this.autosave) {
        this.saveSetting(this.item)
      }
    }
  },
})
</script>
