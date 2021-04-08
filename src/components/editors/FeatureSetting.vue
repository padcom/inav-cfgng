<template>
  <Field :label="label" :description="description">
    <slot />
    <FlagSwitch class="input" v-bind="$attrs" v-model.number="features" />
  </Field>
</template>

<script>
import { defineComponent } from 'vue'

import Field from './Field.vue'
import FlagSwitch from './FlagSwitch.vue'

import { useFeatures } from '../../composables/features'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Field,
    FlagSwitch,
  },
  props: {
    label: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  setup() {
    const { features } = useFeatures()
    return { features }
  }
})
</script>

<style lang="scss" scoped>
.field {
  // width: 100%;
  display: flex;
  align-items: center;
}

.input {
  margin-right: 122px;
  margin-top: 2px;
}
</style>
