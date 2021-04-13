<template>
  <div class="field">
    <slot />
    <label v-if="labelPosition === 'left'" class="label">{{ label }}</label>
    <Dropdown class="input" v-bind="$attrs" />
    <label v-if="labelPosition === 'right'" class="label">{{ label }}</label>
    <img v-if="description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Dropdown from './Dropdown.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Dropdown,
  },
  props: {
    label: { type: String, default: '' },
    labelPosition: { type: String, default: 'right' },
    description: { type: String, default: null },
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
}

.input {
  width: 150px;
  margin-right: 8px;
}

.label {
  margin-right: 8px;
}

.hint {
  cursor: help;
  margin-left: auto;
}
</style>
