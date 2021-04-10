<template>
  <b class="icon" :style="{ background: `url(${file})` }" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    file: { type: String, default: 'cf_icon_armed_active.svg' },
  }
})
</script>

<style lang="scss" scoped>
b.icon {
  display: block;
  background-color: red;
  width: 32px;
  height: 32px;
}
</style>
