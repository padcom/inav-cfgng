<template>
  <input type="checkbox" :checked="checked" @input="update" v-bind="$attrs" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Number, default: 0 },
    flag: { type: Number, default: 0 }
  },
  computed: {
    checked() {
      return (this.modelValue & this.flag) !== 0
    }
  },
  methods: {
    update(e) {
      if (e.target.checked) {
        this.$emit('update:modelValue', this.modelValue | this.flag)
      } else {
        this.$emit('update:modelValue', this.modelValue & (~this.flag))
      }
    }
  },
})
</script>
