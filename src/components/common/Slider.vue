<template>
  <div ref="slider" style="width: 100%;"></div>
</template>

<script>
import 'nouislider/distribute/nouislider.css'
import noUiSlider from 'nouislider'
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Array, default: () => [ 25, 75] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    pips: { type: Object, default: null },
  },
  emits: [
    'update:modelValue',
  ],
  data() {
    return {
      init: false
    }
  },
  computed: {
    config() {
      return {
        start: this.modelValue,
        range: { min: this.min, max: this.max },
        step: this.step,
        connect: true,
      }
    }
  },
  mounted() {
    noUiSlider.create(this.$refs.slider, this.config)
    if (this.pips) {
      this.$refs.slider.noUiSlider.pips(this.pips)  
    }
    this.$refs.slider.noUiSlider.on('update', values => {
      this.$emit('update:modelValue', values)
    })
  },
  beforeUnmount() {
    this.$refs.slider.noUiSlider.destroy()
  }
})
</script>
