<template>
  <div class="field">
    <BoolSwitch class="input" v-bind="$attrs" v-model.number="settings[item].value" />
    <label class="label">{{ label }}</label>
    <img v-if="settings[item].description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="settings[item].description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BoolSwitch from './BoolSwitch.vue'
import { useSettings } from '../../composables/settings'

export default defineComponent({
  components: {
    BoolSwitch,
  },
  props: {
    item: { type: String, required: true },
    label: { type: String, default: '' },
  },
  setup() {
    const { settings } = useSettings()
    return { settings }
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
}

.input {
  margin-right: 122px;
  margin-top: 2px;
}

.hint {
  cursor: help;
  margin-left: auto;
}
</style>
