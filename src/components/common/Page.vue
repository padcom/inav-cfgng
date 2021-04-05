<template>
  <Column class="page">
    <slot />
  </Column>
</template>

<script>
import { defineComponent } from 'vue'

import Column from './Column.vue'

export default defineComponent({
  components: {
    Column
  }
})
</script>


<style lang="scss" scoped>
.page {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 294px);
  padding: 16px 24px 0 24px;
}
</style>
