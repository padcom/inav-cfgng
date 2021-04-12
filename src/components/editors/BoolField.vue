<template>
  <Field
    :label="label"
    :description="description"
    :highlight="highlight"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot />
    <BoolSwitch class="input" v-bind="$attrs" />
  </Field>
</template>

<script>
import { defineComponent } from 'vue'

import Field from './Field.vue'
import BoolSwitch from './BoolSwitch.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Field,
    BoolSwitch,
  },
  props: {
    label: { type: String, default: '' },
    description: { type: String, default: null },
    highlight: { type: Boolean, default: false },
  },
})
</script>

<style lang="scss" scoped>
.input {
  margin-right: 122px;
}
</style>
