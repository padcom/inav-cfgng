<template>
  <select :value="modelValue" @input="update" v-bind="$attrs">
    <option v-for="baudrate in baudrates" :key="baudrate.value" :value="baudrate.value">
      {{ baudrate.label }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

import { BAUDRATE } from '../../models/Serial'

export default defineComponent({
  props: {
    modelValue: { type: Number, default: null },
    allowedValues: { type: Array, default: BAUDRATE }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    baudrates() {
      return BAUDRATE
        .map((label, value) => ({ value, label }))
        .filter(entry => this.allowedValues.includes(entry.label))
    }
  },
  methods: {
    update(e) {
      this.$emit('update:modelValue', Number.parseInt(e.target.value))
    } 
  }
})
</script>

<style lang="scss" scoped>
select, option {
  font-weight: bold;
  text-align: right;
}
</style>
