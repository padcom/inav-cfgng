<template>
  <Row class="actions" >
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot />
    </div>
  </Row>
</template>

<script>
import { defineComponent } from 'vue'

import Row from './common/Row.vue'

export default defineComponent({
  components: {
    Row,
  }
})
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  padding: 8px 0;
  margin-top: auto;
  background-color: #EFEFEF;
  border-top: solid 1px lightgray;
}

.left {
  margin-right: auto;
}

.right {
  padding-right: 12px;
}
</style>
