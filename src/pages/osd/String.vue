<template>
  <Char v-for="char in chars" :letter="char" />
</template>

<script>
import { defineComponent } from 'vue'

import Char from './Char.vue'

import { OSD_SYMBOL } from '../../models/font'

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
      const value = this.dot(this.value)

      let i = 0;
      while (i < value.length) {
        if (value[i] === '#') {
          result.push('#' + value[i + 1] + value[i + 2] + value[i + 3])
          i += 4
        } else {
          result.push(value.charAt(i))
          i++
        }
      }

      return result
    }
  },
  methods: {
    dot(str) {
      const zero = '0'.charCodeAt(0);
      const rx = new RegExp(/\d\.\d/, 'g')
      const repl = str.replaceAll(rx, match => {
        const c1 = match.charCodeAt(0) + OSD_SYMBOL.ZERO_HALF_TRAILING_DOT.index - zero
        const c2 = match.charCodeAt(2) + OSD_SYMBOL.ZERO_HALF_LEADING_DOT.index - zero
        return `#${c1.padLeftWith('0', 3)}#${c2.padLeftWith('0', 3)}`
      });
      return repl
    },
  }
})
</script>
