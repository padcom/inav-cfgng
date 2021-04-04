<template>
  <input type="number" v-bind="$attrs"
    @input="update"
    :value="value" 
    :min="min / scale"
    :max="max / scale"
    :step="1 / scale"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: [ String, Number ], default: null },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    scale: { type: Number, default: 1 },
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    value() {
      return this.modelValue / this.scale
    }
  },
  methods: {
    update(e) {
      this.$emit('update:modelValue', e.target.value * this.scale)
    } 
  }
})
</script>
