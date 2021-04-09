<template>
  <Column class="gvar">
    <div class="label">GVAR {{ index }}</div>
    <div class="value">{{ value }}</div>
  </Column>
</template>

<script>
import { defineComponent } from 'vue'

import Column from '../../components/common/Column.vue'

export default defineComponent({
  components: {
    Column,
  },
  props: {
    index: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
  }
})
</script>

<style lang="scss" scoped>
.gvar {
  flex-direction: column;
  background-color: var(--color-info);
  color: white;
  padding: 10px;
}

.label {
  font-size: 12px;
}

.value {
  font-size: 24px;
  font-weight: bold;
}
</style>
