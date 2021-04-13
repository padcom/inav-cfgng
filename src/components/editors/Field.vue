<template>
  <Row class="field"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <label v-if="labelPosition === 'left'" class="label" :class="{ highlight: highlight }">{{ label }}</label>
    <slot />
    <label v-if="labelPosition === 'right'" class="label" :class="{ highlight: highlight }">{{ label }}</label>
    <img v-if="description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="description" />
  </Row>
</template>

<script>
import { defineComponent } from 'vue'

import Row from '../common/Row.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Row,
  },
  props: {
    label: { type: String, default: '' },
    labelPosition: { type: String, default: 'right' },
    description: { type: String, default: null },
    highlight: { type: Boolean, default: false },
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
}

.hint {
  cursor: help;
  margin-left: auto;
}

.highlight {
  font-weight: bold;
  color: green;
}
</style>
