<template>
  <div class="panel">
    <header>{{ title }}</header>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Panel',
  props: {
    title: { type: String, default: 'Panel title'}
  }
})
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;

  header {
    font-size: 12px;
    background-color: #E4E4E4;
    color: #303030;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 6px 10px;
    font-weight: bold;
  }

  .content {
    border: solid 1px #E4E4E4;
    padding: 10px 10px;
    font-size: 12px;
  }
}
</style>
