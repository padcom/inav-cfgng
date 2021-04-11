<template>
  <br v-if="letter === '\n'" />
  <img v-else :src="font[code]" draggable="false" />
</template>

<script>
import { defineComponent } from 'vue'

import { useFont } from '../../composables/font'

export default defineComponent({
  setup() {
    const { font } = useFont()
    return { font }
  },
  props: {
    letter: { type: String, default: 'A' },
  },
  computed: {
    code() {
      return this.letter.startsWith('#') ? parseInt(this.letter.substr(1)) : this.letter.charCodeAt(0)
    }
  }
})
</script>
