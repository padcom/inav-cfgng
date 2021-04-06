<template>
  <Row class="field">
    <slot />
    <label class="label">{{ label }}</label>
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
    description: { type: String, default: null },
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
</style>
