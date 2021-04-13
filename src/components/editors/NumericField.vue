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
  },
  methods: {
    update() {
      console.log('NumericField.update', ...arguments)
      this.$emit('update:modelValue', ...arguments)
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  width: 150px;
  margin-right: 8px;
}
</style>
