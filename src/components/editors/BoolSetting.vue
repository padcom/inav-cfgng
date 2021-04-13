<template>
  <BoolField
    v-bind="$attrs"
    v-model="settings[item].value"
    :title="settings[item].description"
    :description="settings[item].description"
    @update:modelValue="save"
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
      if (this.autosave) {
        this.saveSetting(this.item)
      }
    }
  },
})
</script>
