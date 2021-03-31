<template>
  <select :value="modelValue" @input="update" v-bind="$attrs">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: [ String, Number ], default: null },
    options: { type: Array, default: () => [] }
  },
  emits: [
    'update:modelValue'
  ],
  methods: {
    update(e) {
      this.$emit('update:modelValue', e.target.value)
    } 
  }
})
</script>
