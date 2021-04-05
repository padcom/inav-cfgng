<template>
  <div class="field">
    <slot />
    <Dropdown class="input" v-model.number="settings[item].value" :options="settings[item].values" />
    <label class="label">{{ label }}</label>
    <img v-if="settings[item].description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="settings[item].description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Dropdown from './Dropdown.vue'
import { useSettings } from '../../composables/settings'
import { useCurrentPage } from '../../composables/current-page'

export default defineComponent({
  components: {
    Dropdown,
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
