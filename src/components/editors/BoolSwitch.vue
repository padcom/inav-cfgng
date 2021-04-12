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
    modelValue: { type: [Number, Boolean], default: 0 }
  },
  emits: [
    'update:modelValue'
  ],
  computed: {
    id() {
      return uuid()
    },
    checked() {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.modelValue === 1
    }
  },
  methods: {
    update(value) {
      if (typeof this.modelValue === 'boolean') {
        this.$emit('update:modelValue', value)
      } else {
        if (value) {
          this.$emit('update:modelValue', 1)
        } else {
          this.$emit('update:modelValue', 0)
        }
      }
    }
  },
})
</script>
