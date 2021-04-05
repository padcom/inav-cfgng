<template>
  <div class="panel full-width">
    <Header v-if="title">{{ title }}</Header>
    <Column class="content">
      <slot />
    </Column>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from './Header.vue'
import Column from './Column.vue'

export default defineComponent({
  name: 'Panel',
  components: {
    Column,
    Header,
  },
  props: {
    title: { type: String }
  }
})
</script>

<style lang="scss" scoped>
.panel {
  margin-bottom: 14px;

  header {
    font-size: 12px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #E4E4E4;
    color: #303030;
    padding: 6px 10px;
    font-weight: bold;
  }

  .content {
    border: solid 1px #E4E4E4;
    border-radius: 5px;
    padding: 10px 10px;
    font-size: 12px;
  }

  header + .content {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
