<template>
  <Field :label="label" :description="description">
    <slot />
    <NumericInput class="input" v-bind="$attrs" />
  </Field>
</template>

<script>
import { defineComponent } from 'vue'

import Field from './Field.vue'
import NumericInput from './NumericInput.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Field,
    NumericInput,
  },
  props: {
    label: { type: String, default: '' },
    description: { type: String, default: null },
  }
})
</script>

<style lang="scss" scoped>
.input {
  width: 150px;
  margin-right: 8px;
}
</style>
