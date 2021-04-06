<template>
  <Slider v-bind="$attrs" :min="900" :max="2100" :step="25" :margin="50" :pips="{
    mode: 'values',
    values: [900, 1000, 1200, 1400, 1500, 1600, 1800, 2000, 2100],
    density: 4,
    stepped: true
  }" />
</template>

<script>
import { defineComponent } from 'vue'

import Slider from './Slider.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    Slider,
  }
})
</script>
