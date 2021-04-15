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
  box-shadow: rgba(0, 0, 0, 0.10) 0 -3px 8px;
}

.left {
  margin-right: auto;
}

.right {
  padding-right: 12px;
}
</style>
