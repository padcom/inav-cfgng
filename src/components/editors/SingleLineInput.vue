<template>
  <input type="text" v-bind="$attrs" @input="update" :value="modelValue" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: { type: [ String ], default: null },
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
