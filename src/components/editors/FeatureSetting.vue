<template>
  <div class="field">
    <FlagSwitch class="input"
      v-bind="$attrs"
      v-model.number="features"
    />
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FlagSwitch from './FlagSwitch.vue'
import { useFeatures } from '../../composables/features'

export default defineComponent({
  components: {
    FlagSwitch,
  },
  props: {
    label: { type: String, default: '' },
  },
  setup() {
    const { features } = useFeatures()
    return { features }
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
}

.input {
  margin-right: 122px;
  margin-top: 2px;
}
</style>
