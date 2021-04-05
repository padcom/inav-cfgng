<template>
  <div class="field full-width">
    <slot />
    <label class="label">{{ label }}</label>
    <img v-if="description" class="hint" src="./cf_icon_info_green.svg" width="16" :title="description" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    label: { type: String, default: '' },
    description: { type: String, default: null },
  }
})
</script>

<style lang="scss" scoped>
.field {
  flex-basis: 100%;
  display: flex;
  align-items: center;
}

.hint {
  cursor: help;
  margin-left: auto;
}
</style>
