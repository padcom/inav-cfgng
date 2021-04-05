<template>
  <Field :label="label" :description="description">
    <slot />
    <input type="text" class="input" v-bind="$attrs" readonly />
  </Field>
</template>

<script>
import { defineComponent } from 'vue'

import Field from './Field.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Field
  },
  props: {
    label: { type: [ String, Number ], default: '' },
    description: { type: String, default: '' },
  }
})
</script>

<style lang="scss" scoped>
.input {
  width: 150px;
  margin-right: 8px;
}
</style>
