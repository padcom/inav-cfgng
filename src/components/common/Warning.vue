<template>
  <Row class="warning">
    <slot />
  </Row>
</template>

<script>
import { defineComponent } from 'vue'

import Row from './Row.vue'

export default defineComponent({
  components: {
    Row
  }
})
</script>


<style lang="scss" scoped>
.warning {
  padding: 8px 12px;
  background-color: #fff7cd;
  border: solid 1px #ffe55f;
  border-radius: 4px;
  margin-bottom: 8px;
}
.warning:deep(p) {
  -webkit-font-smoothing: antialiased;
  line-height: 18px;
  font-size: calc(var(--default-font-size) + 2px);
  font-weight: 300;
  color: #333;
}
</style>
