<template>
  <Dropdown v-bind="$attrs" :options="operandTypes" />
</template>

<script>
import { defineComponent } from 'vue'

import Dropdown from './Dropdown.vue'

import { OPERAND_TYPE } from '../../models/logic-condition'

export default defineComponent({
  components: {
    Dropdown
  },
  computed: {
    operandTypes() {
      return Object
        .entries(OPERAND_TYPE)
        .map(([ id, operation ]) => ({ value: id, label: operation.name }))
    }
  },
  methods: {
    update(e) {
      this.$emit('update:modelValue', Number.parseInt(e.target.value))
    } 
  }
})
</script>
