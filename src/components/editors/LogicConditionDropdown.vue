<template>
  <Dropdown v-bind="$attrs" :options="conditions" />
</template>

<script>
import { defineComponent } from 'vue'

import Dropdown from './Dropdown.vue'

import { LOGIC_CONDITION_COUNT } from '../../models/logic-condition'

export default defineComponent({
  components: {
    Dropdown
  },
  computed: {
    conditions() {
      const result = [ { label: 'Always', value: -1 } ]
      for (let i = 0; i < LOGIC_CONDITION_COUNT; i++) {
        result.push({ label: `Logic condition ${i}`, value: i })
      }

      return result
    }
  },
  methods: {
    update(e) {
      this.$emit('update:modelValue', Number.parseInt(e.target.value))
    } 
  }
})
</script>
