<template>
  <div class="field">
    <Dropdown class="input" v-model.number="settings[item].value" :options="settings[item].values" />
    <label class="label">{{ label }}</label>
    <img v-if="settings[item].description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="settings[item].description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Dropdown from './Dropdown.vue'
import { useSettings } from '../../composables/settings'

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
    return { settings }
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
  // margin: 0px 0;
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
