<template>
  <Select v-bind="$attrs" :options="baudrates" />
</template>

<script>
import { defineComponent } from 'vue'

import Select from './Select.vue'
import { BAUDRATE } from '../../models/serial-port'

export default defineComponent({
  components: {
    Select
  },
  props: {
    allowedValues: { type: Array, default: BAUDRATE }
  },
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
