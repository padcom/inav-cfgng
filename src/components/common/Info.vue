<template>
  <Row class="info">
    <slot />
  </Row>
</template>

<script>
import { defineComponent } from 'vue'

import Row from './Row.vue'

export default defineComponent({
  components: {
    Row,
  }
})
</script>

<style lang="scss" scoped>
.info {
  padding: 8px 12px;
  background-color: #008000;
  border: solid 1px #006800;
  border-radius: 4px;
}

.info:deep(p) {
  -webkit-font-smoothing: antialiased;
  line-height: 18px;
  font-size: calc(var(--default-font-size) + 2px);
  font-weight: 300;
  color: white;
}
</style>
