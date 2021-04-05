<template>
  <div class="field">
    <slot />
    <NumericInput class="input"
      v-bind="$attrs"
      v-model.number="settings[item].value"
      :min="settings[item].min"
      :max="settings[item].max"
    />
    <label class="label">{{ label }}</label>
    <img v-if="settings[item].description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="settings[item].description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NumericInput from './NumericInput.vue'
import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  components: {
    NumericInput,
  },
  props: {
    item: { type: String, required: true },
    label: { type: String, default: '' },
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

<style lang="scss" scoped>
.field {
  flex-basis: 100%;
  display: flex;
  align-items: center;
}

.input {
  width: 150px;
  margin-right: 8px;
}

.hint {
  cursor: help;
  margin-left: auto;
}
</style>
