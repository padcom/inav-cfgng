<template>
  <Switch v-bind="$attrs" :modelValue="checked" @update:modelValue="update" />
</template>

<script>
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import Switch from './Switch.vue'

export default defineComponent({
  components: {
    Switch
  },
  props: {
    modelValue: { type: Number, default: 0 },
    flag: { type: Number, default: 0 }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    id() {
      return uuid()
    },
    checked() {
      return (this.modelValue & this.flag) !== 0
    }
  },
  methods: {
    update(value) {
      if (value) {
        this.$emit('update:modelValue', this.modelValue | this.flag)
      } else {
        this.$emit('update:modelValue', this.modelValue & (~this.flag))
      }
    }
  },
})
</script>
