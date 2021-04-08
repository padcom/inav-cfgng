<template>
  <select style="width: 100%; margin-bottom: 8px;" :value="modelValue" @input="update">
    <option v-for="i in numberOfAuxChannels" :key="i" :value="i - 1">
      CH{{ i + firstAuxChannel - 1 }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Number, default: 0 },
    firstAuxChannel: { type: Number, default: 5 },
    numberOfAuxChannels: { type: Number, default: 4 },
  },
  emits: [
    'update:modelValue'
  ],
  methods: {
    update(e) {
      this.$emit('update:modelValue', Number.parseInt(e.target.value))
    }
  }
})
</script>
