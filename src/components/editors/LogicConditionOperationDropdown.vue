<template>
  <Dropdown v-bind="$attrs" :options="operations" />
</template>

<script>
import { defineComponent } from 'vue'

import Dropdown from './Dropdown.vue'

import { OPERATION } from '../../models/logic-condition'

export default defineComponent({
  components: {
    Dropdown
  },
  computed: {
    operations() {
      return Object
        .entries(OPERATION)
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
