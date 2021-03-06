<template>
  <div ref="slider" style="width: 100%;">
    <div class="ticker" v-if="ticker" :style="{ left: tickerPosition }"></div>
  </div>
</template>

<script>
import 'nouislider/distribute/nouislider.css'
import noUiSlider from 'nouislider'
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [ 25, 75 ] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    margin: { type: Number, default: 0 },
    pips: { type: Object, default: null },
    ticker: { type: Number, default: null },
    disabled: { type: Boolean, default: false }
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
        behaviour: 'snap-drag',
        margin: this.margin,
        disabled: false,
      }
    },
    tickerPosition() {
      const percent = Math.round(((this.ticker - this.min) * 100) / (this.max - this.min))
      return `calc(${percent}% - 3px)`
    }
  },
  mounted() {
    if (this.disabled) {
      this.$refs.slider.setAttribute('disabled', true)
    }
    noUiSlider.create(this.$refs.slider, this.config)
    if (this.pips) {
      this.$refs.slider.noUiSlider.pips(this.pips)  
    }
    this.$refs.slider.noUiSlider.on('update', values => {
      this.$emit('update:modelValue', values.map(Math.round))
    })
  },
  beforeUnmount() {
    this.$refs.slider.noUiSlider.destroy()
  },
  watch: {
    disabled(newValue) {
      if (newValue) {
        this.$refs.slider.setAttribute('disabled', true)
      } else {
        this.$refs.slider.removeAttribute('disabled')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ticker {
  z-index: 1;
  position: absolute;
  top: 26px;
  width: 6px;
  height: 18px;
  background-color: var(--color-info);
  border-radius: 2px;
  opacity: 0.6;
}
</style>

<style lang="scss">
.noUi-value {
  margin-top: 12px;
}
.noUi-connect {
  background-color: var(--color-info);
}
.noUi-handle {
  outline: none;
}
</style>
