<template>
  <Char v-for="char in chars" :letter="char" />
</template>

<script>
import { defineComponent } from 'vue'

import Char from './Char.vue'

export default defineComponent({
  components: {
    Char,
  },
  props: {
    value: { type: String, default: '' },
  },
  computed: {
    chars() {
      const result = []
      let i = 0;
      while (i < this.value.length) {
        if (this.value[i] === '#') {
          result.push('#' + this.value[i + 1] + this.value[i + 2] + this.value[i + 3])
          i += 4
        } else {
          result.push(this.value.charAt(i))
          i++
        }
      }

      return result
    }
  }
})
</script>
